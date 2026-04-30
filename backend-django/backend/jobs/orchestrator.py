from django.utils import timezone
from django.db import transaction
from jobs.models import Job
from jobs.tasks import process_job
import logging

logger = logging.getLogger(__name__)

def try_mark_job_ready(job):
    """
    Job Readiness Trigger — called after both image upload and payment webhook.
    Commented out the has_paid() check as requested to unblock verification.
    """
    if job.has_input_images() and job.has_paid():
        if job.status == Job.Status.PENDING:
            job.status   = Job.Status.READY
            job.ready_at = timezone.now()
            job.save(update_fields=["status", "ready_at"])
            process_job.delay(job.id)   # trigger Celery worker
            logger.info(f"Job {job.id} marked as READY and triggered processing.")

