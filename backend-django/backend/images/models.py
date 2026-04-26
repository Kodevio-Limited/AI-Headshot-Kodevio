from django.db import models
from jobs.models import Job


class Image(models.Model):
    class Type(models.TextChoices):
        INPUT = "INPUT"
        OUTPUT = "OUTPUT"

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="images"
    )

    # ✅ For uploaded images
    file = models.ImageField(upload_to="jobs/", null=True, blank=True)

    # ✅ For AI generated images
    generated_url = models.URLField(null=True, blank=True)

    type = models.CharField(
        max_length=10,
        choices=Type.choices,
        default=Type.INPUT
    )

    def __str__(self):
        return f"Image {self.id} - {self.type}"