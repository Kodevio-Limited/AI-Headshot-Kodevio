
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from services.score.scoring import score_image #feat: v8.0.0 - Importing Score Image function

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
            job = Job.objects.get(id=job_id) # Retriving the job using job_id
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
        scored_images = []
        for f in files:
            img = Image.objects.create(
                job=job,
                file=f,
                type="INPUT"
            )

            # Socring Images
            score= score_image(img.file.path)

            img.score = score
            img.save()

            scored_images.append(img)

        #feat: v8.0.0 - Selecting the best image based on the score
        scored_images.sort(key=lambda x: x.score, reverse=True)

        job.best_image = scored_images[0] # feat: v8.0.0 - Assigning best image to job
        job.status = "PROCESSING"
        job.save()

        for f in files:
            image_obj = Image.objects.create(job=job, file=f, type="INPUT")

            valid, msg, _ = validator.validate(image_obj.file.path)

            if not valid:
                image_obj.delete()
                job.status = "FAILED"
                job.error_message = msg
                job.save()
                return Response({"error": msg}, status=400)

        # feat: v5.0.1 - Trigger asynchronous processing of the job using Celery. This allows the server to handle the image upload request quickly while offloading the intensive processing tasks to a background worker, improving responsiveness and scalability of the application.
        process_job.delay(job.id)

        return Response({"status": "uploaded, processing started"})
    
    
    
class JobStatusView(APIView):
    def get(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=404)

        images = job.images.all()

        return Response({
            "id": job.id,
            "status": job.status,
            "images": [ 
                        img.file.url if img.type == "INPUT" else img.generated_url
                        for img in images
                      ],
            "error": job.error_message
        })