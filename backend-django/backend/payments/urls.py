from django.urls import path
from .views import CreateCheckoutSessionView
from .webhook import stripe_webhook

urlpatterns = [
    path("checkout/<int:job_id>/", CreateCheckoutSessionView.as_view()),
    path("webhook/", stripe_webhook),
]
