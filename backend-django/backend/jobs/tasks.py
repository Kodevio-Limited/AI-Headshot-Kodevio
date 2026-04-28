# jobs/tasks.py

# Feat: version 5.0.1 - Implemented Celery task for processing jobs asynchronously. This task retrieves a job by its ID, updates its status to "PROCESSING", runs the pipeline (which includes validation, analysis, and generation), and then updates the job status to "COMPLETED" or "FAILED" based on the outcome. This enhancement allows for efficient handling of long-running tasks without blocking the main application thread, improving overall performance and user experience.
from celery import shared_task
from jobs.models import Job
from services.pipeline import run_pipeline
from services.email.email_service import send_results_email


@shared_task
def process_job(job_id):
    job = Job.objects.get(id=job_id)

    job.status = "PROCESSING"
    job.save()

    try:
        run_pipeline(job)
        job.status = "COMPLETED"
        job.save()

        # feat: v11.0.2 - Hook up Email
        output_images = job.images.filter(type="OUTPUT")
        urls = [img.generated_url for img in output_images if img.generated_url]
        send_results_email(job.email, urls)

    except Exception as e:
        job.status = "FAILED"
        job.error_message = str(e)
        job.save()
