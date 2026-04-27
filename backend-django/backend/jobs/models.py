from django.db import models


class Job(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING"
        PROCESSING = "PROCESSING"
        COMPLETED = "COMPLETED"
        FAILED = "FAILED"

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    # input_image = models.ImageField(upload_to="jobs/input/")
    # output_image = models.ImageField(upload_to="jobs/output/", null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    error_message = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Job {self.id} - {self.status}"