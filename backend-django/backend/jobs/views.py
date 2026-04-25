from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Job
from images.models import Image

from services.validator_instance import validator


# New view to delete all jobs
from rest_framework import status

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
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=404)

        files = request.FILES.getlist('images')

        if not files:
            return Response({"error": "No images provided"}, status=400)

        if len(files) > 5:
            return Response({"error": "Max 5 images allowed"}, status=400)

        for f in files:
            # 1. Save first (so we get file path)
            image_obj = Image.objects.create(job=job, file=f)

            # 2. Validate using singleton
            valid, msg, data = validator.validate(image_obj.file.path)

            if not valid:
                # 3. DELETE invalid image properly
                image_obj.delete()

                return Response({
                    "error": msg
                }, status=400)

        return Response({"status": "uploaded"})
    
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
            "images": [img.file.url for img in images],
            "error": job.error_message
        })