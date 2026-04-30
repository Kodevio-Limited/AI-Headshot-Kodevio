from django.db import models

class StripeEvent(models.Model):
    event_id   = models.CharField(max_length=255, unique=True)
    event_type = models.CharField(max_length=100, null=True, blank=True)  # e.g. checkout.session.completed
    payment    = models.ForeignKey('Payment', null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)

class Payment(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING"
        SUCCESS = "SUCCESS"
        FAILED  = "FAILED"

    job                 = models.ForeignKey('jobs.Job', on_delete=models.CASCADE, related_name="payments")
    provider            = models.CharField(max_length=50, default="stripe")
    provider_payment_id = models.CharField(max_length=255)   # unique enforced via unique_together
    amount              = models.IntegerField()               # in cents / smallest currency unit
    status              = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    created_at          = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("provider", "provider_payment_id")  # safe across multiple payment providers
        indexes = [models.Index(fields=["job", "status"])]     # speeds up has_paid() queries