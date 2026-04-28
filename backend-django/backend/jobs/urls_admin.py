from django.urls import path
from .views_admin import AdminJobListView, AdminJobDetailView

urlpatterns = [
    path("jobs/", AdminJobListView.as_view(), name="admin-job-list"),
    path("jobs/<int:job_id>/", AdminJobDetailView.as_view(), name="admin-job-detail"),
]
