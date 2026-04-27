
from django.urls import path 
from .view import CreateCheckoutSessionView # This view creates the checkout session  


# feat: v9.0.0 - This is the URL for the checkout session creation endpoint
# This URL is used to create a Stripe checkout session and redirect the user to the payment page
urlpatterns = [
    path("checkout/<int:job_id>/", CreateCheckoutSessionView.as_view()),
]