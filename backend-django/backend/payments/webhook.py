import stripe
import logging
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from jobs.models import Job
from jobs.orchestrator import try_mark_job_ready
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

    # --- STEP 3: Record event ---
    stripe_event = StripeEvent.objects.create(
        event_id=event_id,
        event_type=event["type"]
    )

    # --- STEP 4: Handle only relevant event ---
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        session_id = session.get("id")

        logger.info("Handling checkout.session.completed for session: %s", session_id)
        
        # 🔍 Debug logs
        logger.info("DEBUG metadata: %s", session.get("metadata"))

        metadata = session.get("metadata", {})
        job_id = metadata.get("job_id")
        email = metadata.get("email")

        if not job_id:
            logger.error("Missing job_id in metadata for session %s", session_id)
            return HttpResponse(status=200)

        # --- STEP 5: Fetch Job ---
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            logger.error("Job %s not found for session %s", job_id, session_id)
            return HttpResponse(status=200)
        except Exception as e:
            logger.exception("DB error fetching job %s for session %s: %s", job_id, session_id, e)
            return HttpResponse(status=500)

        # --- STEP 6: Update Payment (CRITICAL) ---
        try:
            from payments.models import Payment
            
            # Use session_id which we verified earlier
            payment, created = Payment.objects.get_or_create(
                provider="stripe",
                provider_payment_id=session_id,
                defaults={
                    "job": job,
                    "amount": session.get("amount_total", 500),
                    "status": Payment.Status.PENDING
                }
            )
            
            if created:
                logger.warning("Payment record was missing for session %s, created now.", session_id)

            if payment.status == Payment.Status.SUCCESS:
                logger.info("Payment %s already marked SUCCESS, skipping update", payment.id)
            else:
                payment.status = Payment.Status.SUCCESS
                payment.save(update_fields=["status"])
                logger.info("Payment %s (Job %s) marked as SUCCESS", payment.id, job.id)

            # Link the event to the payment
            stripe_event.payment = payment
            stripe_event.save(update_fields=["payment"])

        except Exception as e:
            logger.exception("Failed to update payment for job %s (session %s): %s", job.id, session_id, e)
            return HttpResponse(status=200)

        # --- STEP 7: Trigger processing ---
        try:
            try_mark_job_ready(job)
            # Re-fetch job to check status change
            job.refresh_from_db()
            logger.info("Orchestrator called for job %s. Current status: %s", job.id, job.status)
        except Exception as e:
            logger.exception("Processing trigger failed for job %s: %s", job.id, e)

    else:
        logger.info("Unhandled event type: %s", event["type"])

    return HttpResponse(status=200)

@csrf_exempt
def stripe_webhook(request):
    try:
        return _stripe_webhook_impl(request)
    except Exception as e:
        logger.exception("🔥 GLOBAL WEBHOOK CRASH: %s", e)
        return HttpResponse(status=200)