from django.urls import path
from .views_admin import AdminJobListView, AdminJobDetailView, AdminJobRetryView, AdminDashboardStatsView

urlpatterns = [
    path("jobs/", AdminJobListView.as_view(), name="admin-job-list"),
    path("jobs/<int:job_id>/", AdminJobDetailView.as_view(), name="admin-job-detail"),
    path("jobs/<int:job_id>/retry/", AdminJobRetryView.as_view(), name="admin-job-retry"),
    path("stats/", AdminDashboardStatsView.as_view(), name="admin-dashboard-stats"),
]

