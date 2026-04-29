from django.db import models
from django.core.exceptions import ValidationError


class Image(models.Model):
    class Type(models.TextChoices):
        INPUT  = "INPUT"
        OUTPUT = "OUTPUT"

    job = models.ForeignKey(
        'jobs.Job',
        on_delete=models.CASCADE,
        related_name="images"
    )

    file          = models.ImageField(upload_to="jobs/", null=True, blank=True)
    generated_url = models.URLField(null=True, blank=True)

    type = models.CharField(
        max_length=10,
        choices=Type.choices,
        default=Type.INPUT
    )

    order      = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes  = [models.Index(fields=["job", "type"])]
        ordering = ["order", "created_at"]

    def clean(self):                                                    # ✅ added
        if self.type == self.Type.INPUT and not self.file:
            raise ValidationError("INPUT images must have a file.")
        if self.type == self.Type.OUTPUT and not self.generated_url:
            raise ValidationError("OUTPUT images must have a generated_url.")
        if self.file and self.generated_url:
            raise ValidationError("Image cannot have both file and generated_url.")

    def is_input(self):
        return self.type == self.Type.INPUT

    def is_output(self):
        return self.type == self.Type.OUTPUT

    def __str__(self):
        return f"Image {self.id} - {self.type}"