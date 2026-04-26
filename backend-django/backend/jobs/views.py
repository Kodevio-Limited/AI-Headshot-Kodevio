from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Job
from images.models import Image

from services.validator_instance import validator
from services.analysis.face_analyzer import analyze_face, normalize_analysis
from services.generation.prompt_builder import build_prompt
from services.generation.generator import generate_headshot


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

        job.status = "PROCESSING"
        job.save()

        for f in files:
            # ----------------------------
            # 1. Save image
            # ----------------------------
            image_obj = Image.objects.create(job=job, file=f, type="INPUT")

            # ----------------------------
            # 2. Validate
            # ----------------------------
            valid, msg, _ = validator.validate(image_obj.file.path)

            if not valid:
                image_obj.delete()
                job.status = "FAILED"
                job.error_message = msg
                job.save()
                return Response({"error": msg}, status=400)

            # ----------------------------
            # 3. Analyze
            # ----------------------------
            raw_analysis = analyze_face(image_obj.file.path)

            if "error" in raw_analysis:
                job.status = "FAILED"
                job.error_message = raw_analysis["error"]
                job.save()
                return Response({"error": raw_analysis["error"]}, status=400)

            # ----------------------------
            # 4. Normalize
            # ----------------------------
            normalized = normalize_analysis(raw_analysis)

            # ----------------------------
            # 5. Build Prompt
            # ----------------------------
            prompt_data = build_prompt(normalized)

            # ----------------------------
            # 6. Generate (InstantID)
            # ----------------------------
            result = generate_headshot(image_obj.file.path, prompt_data)

            if "error" in result:
                job.status = "FAILED"
                job.error_message = result["error"]
                job.save()
                return Response({"error": result["error"]}, status=500)

            output_url = result["url"]

            # ----------------------------
            # 7. Save Output (TEMP: URL)
            # ----------------------------
            Image.objects.create(
                job=job,
                file=output_url,   # ⚠️ URL for now (Phase 5 will fix storage)
                type="OUTPUT"
            )

        job.status = "COMPLETED"
        job.save()

        return Response({"status": "completed"})


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