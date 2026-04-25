from django.shortcuts import render
from services.validation.service import validate_image
# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Job
from images.models import Image


class CreateJobView(APIView):
    def post(self, request):
        job = Job.objects.create()
        return Response({"job_id": job.id})


class UploadImageView(APIView): # Upload Image API Endpoint
    def post(self, request, job_id): 
        job = Job.objects.get(id=job_id)

        files = request.FILES.getlist('images') 

        if not files:
            return Response({"error": "No images provided"}, status=400)

        if len(files) > 5:
            return Response({"error": "Max 5 images allowed"}, status=400)

        # Dummy Upload logic!
        # for f in files:
        #     Image.objects.create(job=job, file=f)

        # Image file Upload logic with validation.
        for f in files:
            image_obj= Image.objects.create(job=job, file=f)

            # Validating after Saving the Image file.
            valid, msg = validate_image(image_obj.file.path)
            
            if not valid:
                image_obj.delete
                
                return Response({
                    "error":msg
                },status=400)

        return Response({"status": "uploaded"})


class JobStatusView(APIView):
    def get(self, request, job_id):
        job = Job.objects.get(id=job_id)

        images = job.images.all()

        return Response({
            "id": job.id,
            "status": job.status,
            "images": [img.file.url for img in images]
        })