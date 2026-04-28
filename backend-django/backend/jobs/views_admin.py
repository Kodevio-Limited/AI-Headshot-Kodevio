from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Job

# feat: v11.0.0 - Admin API for the Job model (protected — staff only)


class AdminJobListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_staff:
            return Response({"error": "Admin access required."}, status=403)

        jobs = Job.objects.all().order_by("-created_at")
        data = [
            {
                "id": job.id,
                "email": job.email,
                "payment_status": job.payment_status,
                "status": job.status,
                "created_at": job.created_at,
            }
            for job in jobs
        ]
        return Response(data)


class AdminJobDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, job_id):
        if not request.user.is_staff:
            return Response({"error": "Admin access required."}, status=403)

        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response({"error": "Job not found."}, status=404)

        return Response({
            "id": job.id,
            "email": job.email,
            "payment_status": job.payment_status,
            "status": job.status,
            "created_at": job.created_at,
        })