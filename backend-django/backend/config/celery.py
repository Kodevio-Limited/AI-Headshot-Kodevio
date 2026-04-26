

#Feat: version 5.0.1 - Updated Celery configuration to ensure proper task discovery and integration with Django settings. This setup allows for seamless asynchronous task processing within the Django application, enhancing performance and scalability.
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
app = Celery('config')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()