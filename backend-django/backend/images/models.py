from django.db import models

# Create your models here.
from django.db import models
from jobs.models import Job

class Image(models.Model):
    TYPE_CHOICES = [
        ('input', 'Input'),
        ('output', 'Output'),
    ]

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='images')
    file = models.ImageField(upload_to='uploads/')
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='input')

    def __str__(self):
        return f"Image {self.id} - {self.type}"