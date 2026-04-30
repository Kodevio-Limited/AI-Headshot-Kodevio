from django.utils import timezone
from django.db import transaction
from jobs.models import Job
from jobs.tasks import process_job
import logging

logger = logging.getLogger(__name__)

def try_mark_job_ready(job):
    """
    Job Readiness Trigger — called after both image scoring and payment webhook.
    """
    # ✅ STRICT GATE: Require the scoring task to finish (best_image is set) AND payment to be complete
    has_best = job.best_image is not None
    is_paid = job.has_paid()
    
    logger.info(
        "Checking readiness for Job %s: BestImage=%s, Paid=%s, CurrentStatus=%s",
        job.id, has_best, is_paid, job.status
    )

    if has_best and is_paid:
        if job.status == Job.Status.PENDING:
            job.status   = Job.Status.READY
            job.ready_at = timezone.now()
            job.save(update_fields=["status", "ready_at"])
            
            # Defer the Celery trigger until the DB transaction is fully committed
            transaction.on_commit(lambda: process_job.delay(job.id))
            
            logger.info("✅ Job %s marked as READY and triggered generation processing.", job.id)
        else:
            logger.info("Job %s is already %s, skipping trigger.", job.id, job.status)
    else:
        logger.info("❌ Job %s not ready yet: Missing requirements (BestImage: %s, Paid: %s)", job.id, has_best, is_paid)
