from django.urls import path
from .views import CreateJobView, UploadImageView, JobStatusView, DeleteAllJobsView

urlpatterns = [
    path('create/', CreateJobView.as_view()),
    path('remove-all/', DeleteAllJobsView.as_view()),
    path('<int:job_id>/upload/', UploadImageView.as_view()),
    path('<int:job_id>/', JobStatusView.as_view()),
]