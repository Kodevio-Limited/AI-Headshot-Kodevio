from django.db import models
from django.db.models import F

class Analytics(models.Model):
    key   = models.CharField(max_length=50, unique=True)
    value = models.IntegerField(default=0)

    def increment(self, amount=1):
        Analytics.objects.filter(pk=self.pk).update(value=F('value') + amount)

    def __str__(self):
        return f"{self.key}: {self.value}"