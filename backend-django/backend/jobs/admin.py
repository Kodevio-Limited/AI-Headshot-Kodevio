from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Job

# feat: v11.0.0 - This is the admin interface for the Job model. It is used to view and manage the jobs that are created by the users.
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "payment_status",
        "status",
        "stripe_payment_id",
        "created_at",
    )

    list_filter = ("payment_status", "status")

    search_fields = ("email", "stripe_payment_id")

    readonly_fields = ("created_at", "updated_at")