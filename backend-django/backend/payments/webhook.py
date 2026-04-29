import stripe
import logging
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from jobs.models import Job
from jobs.orchestrator import try_start_processing
from payments.models import StripeEvent

stripe.api_key = settings.STRIPE_SECRET_KEY
logger = logging.getLogger(__name__)

def _stripe_webhook_impl(request):
    payload = request.body
    sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")

    # --- STEP 1: Verify signature (STRICT) ---
    try:
        event = stripe.Webhook.construct_event(
            payload,
            sig_header,
            settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        logger.error("Invalid payload: %s", str(e))
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        logger.error("Invalid signature: %s", str(e))
        return HttpResponse(status=400)

    logger.info("Stripe event received: %s", event["type"])

    # --- STEP 2: Idempotency check ---
    event_id = event["id"]
    if StripeEvent.objects.filter(event_id=event_id).exists():
        logger.info("Duplicate event ignored: %s", event_id)
        return HttpResponse(status=200)

    # --- STEP 3: Handle only relevant event ---
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]

        # 🔍 Debug logs (keep for now)
        logger.info("DEBUG metadata: %s", session.get("metadata"))
        logger.info("DEBUG payment_status: %s", session.get("payment_status"))


        metadata = session.get("metadata", {})
        job_id = metadata.get("job_id")
        email = metadata.get("email")

        if not job_id:
            logger.error("Missing job_id in metadata")
            StripeEvent.objects.create(event_id=event_id)
            return HttpResponse(status=200)

        # --- STEP 4: Fetch Job ---
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            logger.error("Job not found: %s", job_id)
            StripeEvent.objects.create(event_id=event_id)
            return HttpResponse(status=200)
        except Exception as e:
            logger.exception("DB error fetching job %s: %s", job_id, e)
            return HttpResponse(status=500)

        # Optional: log email mismatch (non-blocking)
        if email and job.email != email:
            logger.info(
                "Email mismatch allowed: job.email=%s, stripe.email=%s",
                job.email,
                email
            )

        # 🧠 Prevent duplicate updates
        if job.payment_status == Job.PaymentStatus.PAID:
            logger.info("Job already marked PAID, skipping update")
            StripeEvent.objects.create(event_id=event_id)
            return HttpResponse(status=200)

        # --- STEP 5: Update Job (CRITICAL) ---
        try:
            job.payment_status = Job.PaymentStatus.PAID
            job.stripe_payment_id = session.get("id")
            job.save()
            logger.info("Job %s marked as PAID", job.id)
        except Exception as e:
            logger.exception("Failed to update job %s: %s", job.id, e)
            return HttpResponse(status=200)  # never retry endlessly

        # --- STEP 6: Trigger processing (NON-CRITICAL) ---
        try:
            try_start_processing(job.id)
            logger.info("Processing triggered for job %s", job.id)
        except Exception as e:
            logger.exception("Processing trigger failed for job %s: %s", job.id, e)

    else:
        logger.info("Unhandled event type: %s", event["type"])

    # --- STEP 7: Record event AFTER handling ---
    StripeEvent.objects.create(event_id=event_id)

    return HttpResponse(status=200)

@csrf_exempt
def stripe_webhook(request):
    try:
        return _stripe_webhook_impl(request)
    except Exception as e:
        logger.exception("🔥 GLOBAL WEBHOOK CRASH: %s", e)
        return HttpResponse(status=200)