import stripe
from django.conf import settings
from django.http import HttpResponse
from jobs.models import Job
from jobs.tasks import process_job

stripe.api_key = settings.STRIPE_SECRET_KEY

from django.views.decorators.csrf import csrf_exempt

# feat: v9.0.1 - This is the Stripe Webhook receiver. 
# It must be CSRF exempt because requests come from external services.
@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except Exception:
        return HttpResponse(status=400)

    # ✅ PAYMENT SUCCESS
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]

        job_id = session["metadata"]["job_id"]

        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return HttpResponse(status=404)

        job.payment_status = Job.PaymentStatus.PAID
        job.stripe_payment_id = session["id"]
        job.save()

        # 🔥 TRIGGER PROCESSING
        process_job.delay(job.id)

    return HttpResponse(status=200)