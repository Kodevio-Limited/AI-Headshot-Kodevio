from django.db import models

# Create your models here.
from django.db import models

class Job(models.Model):
    STATUS_CHOICES = [ # Define the possible status values for a job
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('done', 'Done'),
        ('failed', 'Failed'),
    ]

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending') # The current status of the job, with a default value of 'pending'
    created_at = models.DateTimeField(auto_now_add=True) # The timestamp when the job was created, automatically set to the current date and time when the job is created
    updated_at = models.DateTimeField(auto_now=True) # The timestamp when the job was last updated, automatically set to the current date and time whenever the job is saved

    def __str__(self):
        return f"Job {self.id} - {self.status}" # A string representation of the job, showing its ID and current status