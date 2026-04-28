from django.core.mail import send_mail
from django.conf import settings

# feat: v10.0.1 - This function sends an email to the user with the results of the AI headshot generation.
def send_results_email(email, urls):
    message = "Your AI Headshots:\n\n"

    for u in urls:
        message += f"{u}\n"

    send_mail(
        subject="Your Headshots Are Ready",
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
        fail_silently=False,
    )