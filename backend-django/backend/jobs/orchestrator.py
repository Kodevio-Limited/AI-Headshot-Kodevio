from django.db import transaction
from jobs.models import Job
from jobs.tasks import process_job
import logging
# The orchestrator pattern is a standard solution for distributed, event-driven systems where multiple triggers can start the same process.
#feat: v15.0.1 - We added a small layer of complexity to make the system safe, reliable, and production-ready.
logger = logging.getLogger(__name__)

def try_start_processing(job_id):
    """
    Central orchestrator for job processing. Ensures idempotency and correct state transitions.
    Call this from both webhook and upload handlers.
    """
    with transaction.atomic():
        job = Job.objects.select_for_update().get(id=job_id)

        # Strict state machine enforcement
        if job.payment_status != Job.PaymentStatus.PAID:
            logger.info(f"Job {job.id} not paid. Skipping processing.")
            return False
        if not job.best_image:
            logger.info(f"Job {job.id} has no best image. Skipping processing.")
            return False
        if job.status == Job.Status.PROCESSING:
            logger.warning(f"Job {job.id} already processing. Skipping.")
            return False
        if job.status == Job.Status.COMPLETED:
            logger.info(f"Job {job.id} already completed. Skipping.")
            return False
        # feat: v15.1.0 - If a job has previously failed, we do not attempt to reprocess it. This prevents potential infinite retry loops and ensures we only process jobs that are in a valid state.
        if job.status == Job.Status.FAILED:
            logger.info(f"Job {job.id} previously failed. Skipping.")
            return False
        if job.status not in [Job.Status.IMAGES_UPLOADED]:
            logger.info(f"Job {job.id} not ready for processing (status: {job.status}). Skipping.")
            return False
        # Mark as processing and trigger async task
        job.status = Job.Status.PROCESSING
        job.save()
        process_job.delay(job.id)
        logger.info(f"Job {job.id} processing started.")
        return True
