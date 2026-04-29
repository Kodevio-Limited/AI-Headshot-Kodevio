from django.db import models


class Analytics(models.Model):
    key = models.CharField(max_length=50, unique=True)
    value = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.key}: {self.value}"


class Job(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING"
        PROCESSING = "PROCESSING"
        COMPLETED = "COMPLETED"
        FAILED = "FAILED"

    # feat: v8.0.0 - Adding payment status in jobs table
    class PaymentStatus(models.TextChoices):
        PENDING = "PENDING"
        PAID = "PAID"
        # TODO: For Future Payment Gateways
        # FAILED = "FAILED" 
        # REFUNDED = "REFUNDED"

    # feat: v8.0.0 -Email Field
    email = models.EmailField()
    
    # feat: v8.0.0 - Job Status
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    # feat: v8.0.0 - Payment Status
    payment_status = models.CharField(
        max_length=20,
        choices=PaymentStatus.choices,
        default=PaymentStatus.PENDING
    )

    # feat: v8.0.0 - Stripe Payment ID
    stripe_payment_id = models.CharField(max_length=255,null=True,blank=True)

    # input_image = models.ImageField(upload_to="jobs/input/")
    # output_image = models.ImageField(upload_to="jobs/output/", null=True, blank=True)

    # feat: v8.0.0 - Best Image Selection
    best_image = models.ForeignKey(
        "images.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="selected_for_jobs"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Failure debugging
    error_message = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Job {self.id} - {self.status}"