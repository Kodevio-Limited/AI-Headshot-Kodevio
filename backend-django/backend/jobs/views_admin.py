from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Job

# feat: v11.0.0 - This is the admin interface for the Job model
# API based dashboard basically.

class AdminJobListView(APIView):
    # permission_classes = [IsAdminUser]  # This protects the route.
    def get(self, request):
        jobs = Job.objects.all().order_by("-created_at")

        data = []
        for job in jobs:
            data.append({
                "id": job.id,
                "email": job.email,
                "payment_status": job.payment_status,
                "status": job.status,
                "created_at": job.created_at,
            })

        return Response(data)