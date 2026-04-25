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

    file = models.ImageField(upload_to="jobs/")

    type = models.CharField(
        max_length=10,
        choices=Type.choices,
        default=Type.INPUT
    )

    def __str__(self):
        return f"Image {self.id} - {self.type}"