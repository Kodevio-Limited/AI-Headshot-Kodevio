import stripe
import logging
from django.conf import settings
from django.http import HttpResponse
from jobs.models import Job
from jobs.tasks import process_job
from jobs.orchestrator import try_start_processing
from payments.models import StripeEvent

stripe.api_key = settings.STRIPE_SECRET_KEY

from django.views.decorators.csrf import csrf_exempt

logger = logging.getLogger(__name__)

# feat: v9.0.1 - This is the Stripe Webhook receiver. 
# It must be CSRF exempt because requests come from external services.
@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")

    logger.info("Webhook received. Signature header present: %s", bool(sig_header))

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
        logger.info("Webhook signature verified. Event type: %s", event["type"])
    except Exception as e:
        logger.error("Webhook signature verification FAILED: %s", str(e))
        return HttpResponse(status=400)

    # PAYMENT SUCCESS
    if event["type"] == "checkout.session.completed":
        event_id = event["id"]
        # Stripe idempotency: ignore duplicate events
        if StripeEvent.objects.filter(event_id=event_id).exists():
            logger.info(f"Duplicate Stripe event {event_id} ignored.")
            return HttpResponse(status=200)
        StripeEvent.objects.create(event_id=event_id)

        session = event["data"]["object"]

        # feat: v15.1.0 -  Strick payment status check. We only proceed if payment_status is 'paid'. This ensures we don't accidentally process unpaid sessions.
        job_id = session["metadata"].get("job_id")
        email = session["metadata"].get("email")
        payment_status = session.get("payment_status")
        logger.info("Payment completed for job_id: %s, email: %s, payment_status: %s", job_id, email, payment_status)

        # Strictly require payment_status == 'paid'
        if payment_status != "paid":
            logger.warning(f"Stripe session for job {job_id} is not paid (status: {payment_status}). Ignoring event.")
            return HttpResponse(status=200)

        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            logger.error("Job not found for job_id: %s", job_id)
            return HttpResponse(status=404)

        # Log both emails for traceability, but do not enforce match
        if email and job.email != email:
            logger.info(f"Email mismatch allowed for job {job_id}: job.email={job.email}, session.email={email}")

        # feat: v8.0.0 - Changing the payment status to paid
        job.payment_status = Job.PaymentStatus.PAID
        job.stripe_payment_id = session["id"]
        job.save()
        logger.info("Job %s marked as PAID. Checking if processing can start...", job.id)

        # Use orchestrator to safely trigger processing if possible
        try_start_processing(job.id)
    else:
        logger.info("Unhandled event type: %s - ignoring.", event["type"])

    return HttpResponse(status=200)