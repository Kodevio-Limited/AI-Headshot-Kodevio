from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from services.score.scoring import score_image  # feat: v8.0.0 - Importing Score Image function

from .models import Job
from images.models import Image

from services.validator_instance import validator
from jobs.tasks import process_job


class DeleteAllJobsView(APIView):
    def delete(self, request):
        Job.objects.all().delete()
        return Response({"status": "all jobs deleted"}, status=status.HTTP_204_NO_CONTENT)


class CreateJobView(APIView):
    def post(self, request):

        job = Job.objects.create()
        return Response({"job_id": job.id})


class UploadImageView(APIView):
    def post(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id)  # Retriving the job using job_id
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=404)

        # feat: v8.0.0 - Stripe Payment Status check.
        if job.payment_status != Job.PaymentStatus.PAID:
            return Response({"error": "Payment not completed"}, status=400)

        # Uploading image
        files = request.FILES.getlist('images')

        if not files:
            return Response({"error": "No images provided"}, status=400)

        if len(files) > 5:
            return Response({"error": "Max 5 images allowed"}, status=400)

        # feat: v8.0.0 - Image Scoring System
        valid_images = []
        rejected_images = []

        for f in files:
            img = Image.objects.create(
                job=job,
                file=f,
                type=Image.Type.INPUT
            )

            # feat: v8.1.1 - Validation using MediaPipe
            valid, msg, face_info = validator.validate(img.file.path)

            if not valid:
                rejected_images.append({
                    "file": f.name,
                    "reason": msg
                })
                img.delete()
                continue

            # feat: v8.0.0 - Scoring Images (after validation)
            score = score_image(img.file.path, face_info)

            img.score = score
            img.save()

            valid_images.append(img)

        # feat: v8.1.2 - If no valid images, fail early
        if not valid_images:
            job.status = Job.Status.FAILED
            job.error_message = "All images failed validation"
            job.save()

            return Response({
                "error": "All images invalid",
                "details": rejected_images
            }, status=400)

        # feat: v8.0.0 - Selecting the best image based on the score
        valid_images.sort(key=lambda x: x.score, reverse=True)

        best_image = valid_images[0]

        job.best_image = best_image  # feat: v8.0.0 - Assigning best image to job
        job.status = Job.Status.PROCESSING
        job.save()

        # feat: v5.0.1 - Trigger asynchronous processing of the job using Celery.
        process_job.delay(job.id)

        return Response({
            "status": "uploaded, processing started",
            "uploaded_count": len(valid_images),
            "rejected": rejected_images,
            "best_image_id": best_image.id
        })


class JobStatusView(APIView):
    def get(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=404)

        input_images = job.images.filter(type=Image.Type.INPUT)
        output_images = job.images.filter(type=Image.Type.OUTPUT)

        return Response({
            "id": job.id,
            "status": job.status,
            "input_images": [
                img.file.url for img in input_images if img.file
            ],
            "output_images": [
                img.url for img in output_images if img.url
            ],
            "best_image": job.best_image.file.url if job.best_image else None,
            "error": job.error_message
        })