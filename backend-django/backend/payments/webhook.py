import stripe
import logging
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction # ✅ Required for safe saving

from jobs.models import Job
from jobs.orchestrator import try_mark_job_ready
from payments.models import StripeEvent, Payment

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
    except (ValueError, stripe.error.SignatureVerificationError) as e:
        logger.error("Invalid payload/signature: %s", str(e))
        return HttpResponse(status=400)

    event_id = event["id"]
    event_type = event["type"]
    logger.info("Stripe event received: %s", event_type)

    # --- STEP 2: Idempotency check ---
    if StripeEvent.objects.filter(event_id=event_id).exists():
        logger.info("Duplicate event ignored: %s", event_id)
        return HttpResponse(status=200)

    # --- STEP 3 & 4: Handle relevant event ---
    if event_type == "checkout.session.completed":
        session = event["data"]["object"]
        session_id = session.get("id")
        
        metadata = session.get("metadata", {})
        job_id = metadata.get("job_id")

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
            logger.exception("DB error fetching job %s: %s", job_id, e)
            return HttpResponse(status=500) # ✅ Tell Stripe to retry

        # --- STEP 6: Update Payment (CRITICAL - ATOMIC) ---
        try:
            with transaction.atomic(): # ✅ All or nothing
                # Secondary check inside lock
                if StripeEvent.objects.filter(event_id=event_id).exists():
                    return HttpResponse(status=200)

                payment, created = Payment.objects.get_or_create(
                    provider="stripe",
                    provider_payment_id=session_id,
                    defaults={
                        "job": job,
                        "amount": session.get("amount_total", 500),
                        "status": Payment.Status.PENDING
                    }
                )

                if payment.status != Payment.Status.SUCCESS:
                    payment.status = Payment.Status.SUCCESS
                    payment.save(update_fields=["status"])
                    logger.info("Payment %s marked as SUCCESS", payment.id)

                # ✅ Only save the event receipt if the payment update actually worked
                StripeEvent.objects.create(
                    event_id=event_id,
                    event_type=event_type,
                    payment=payment
                )

        except Exception as e:
            logger.exception("Failed to update payment for session %s: %s", session_id, e)
            return HttpResponse(status=500) # ✅ Tell Stripe to retry

        # --- STEP 7: Trigger processing ---
        try:
            try_mark_job_ready(job)
            job.refresh_from_db()
            logger.info("Orchestrator called. Job status: %s", job.status)
        except Exception as e:
            logger.exception("Processing trigger failed for job %s: %s", job.id, e)

    else:
        # Save unhandled events so they aren't infinitely retried
        try:
            StripeEvent.objects.create(event_id=event_id, event_type=event_type)
        except Exception:
            pass

    return HttpResponse(status=200)

@csrf_exempt
def stripe_webhook(request):
    try:
        return _stripe_webhook_impl(request)
    except Exception as e:
        logger.exception("🔥 GLOBAL WEBHOOK CRASH: %s", e)
        return HttpResponse(status=500) # ✅ Tell Stripe to retry