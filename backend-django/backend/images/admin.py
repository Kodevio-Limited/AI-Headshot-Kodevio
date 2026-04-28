from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Image

admin.site.register(Image)


# feat: v11.0.0 - This is the admin interface for the Image model.
@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "job",
        "type",
        "score",
        "url",
        "created_at",
    )

    list_filter = ("type",)

    search_fields = ("job__email",)