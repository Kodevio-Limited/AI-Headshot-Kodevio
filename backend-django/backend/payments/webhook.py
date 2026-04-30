import stripe
import logging
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction  # ✅ Added for atomic operations

from jobs.models import Job
from jobs.orchestrator import try_mark_job_ready
from payments.models import StripeEvent, Payment  # ✅ Moved Payment import here

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

    event_id = event["id"]
    event_type = event["type"]
    logger.info("Stripe event received: %s", event_type)

    # --- STEP 2: Initial Idempotency Check ---
    if StripeEvent.objects.filter(event_id=event_id).exists():
        logger.info("Duplicate event ignored: %s", event_id)
        return HttpResponse(status=200)

    # --- STEP 3: Handle relevant events ---
    if event_type == "checkout.session.completed":
        session = event["data"]["object"]
        session_id = session.get("id")

        logger.info("Handling checkout.session.completed for session: %s", session_id)
        
        metadata = session.get("metadata", {})
        job_id = metadata.get("job_id")

        if not job_id:
            logger.error("Missing job_id in metadata for session %s", session_id)
            # Return 200 because a retry won't fix missing metadata
            return HttpResponse(status=200) 

        # --- STEP 4: Fetch Job ---
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            logger.error("Job %s not found for session %s", job_id, session_id)
            return HttpResponse(status=200) 
        except Exception as e:
            logger.exception("DB error fetching job %s for session %s: %s", job_id, session_id, e)
            return HttpResponse(status=500)

        # --- STEP 5: Update Payment (ATOMIC TRANSACTION) ---
        try:
            # ✅ Wrap the payment update and event logging in a transaction
            with transaction.atomic():
                # Secondary check inside the transaction to prevent race conditions
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

                if payment.status == Payment.Status.SUCCESS:
                    logger.info("Payment %s already marked SUCCESS, skipping update", payment.id)
                else:
                    payment.status = Payment.Status.SUCCESS
                    payment.save(update_fields=["status"])
                    logger.info("Payment %s (Job %s) marked as SUCCESS", payment.id, job.id)

                # ✅ Record the event ONLY if the payment update succeeds
                StripeEvent.objects.create(
                    event_id=event_id,
                    event_type=event_type,
                    payment=payment
                )

        except Exception as e:
            logger.exception("Failed to update payment for job %s (session %s): %s", job.id, session_id, e)
            # ✅ CRITICAL: Return 500 so Stripe knows to retry this event later
            return HttpResponse(status=500) 

        # --- STEP 6: Trigger processing ---
        try:
            try_mark_job_ready(job)
            job.refresh_from_db()
            logger.info("Orchestrator called for job %s. Current status: %s", job.id, job.status)
        except Exception as e:
            logger.exception("Processing trigger failed for job %s: %s", job.id, e)

    else:
        logger.info("Unhandled event type: %s", event_type)
        # We still want to record unhandled events so Stripe doesn't keep resending them
        try:
            StripeEvent.objects.get_or_create(event_id=event_id, defaults={'event_type': event_type})
        except Exception:
            pass

    return HttpResponse(status=200)

@csrf_exempt
def stripe_webhook(request):
    try:
        return _stripe_webhook_impl(request)
    except Exception as e:
        logger.exception("🔥 GLOBAL WEBHOOK CRASH: %s", e)
        # ✅ Global crashes should also trigger a Stripe retry
        return HttpResponse(status=500)