from django.core.mail import send_mail
from django.conf import settings

# feat: v10.0.1 - This function sends an email to the user with the results of the AI headshot generation.
import logging

logger = logging.getLogger(__name__)

def send_results_email(email, urls):
    logger.info(f"Attempting to send results email to {email} with {len(urls)} URLs.")
    message = "Your AI Headshots:\n\n"

    for u in urls:
        message += f"{u}\n"

    try:
        result = send_mail(
            subject="Your Headshots Are Ready",
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False,
        )
        logger.info(f"Email sent successfully to {email}. Return code: {result}")
    except Exception as e:
        logger.error(f"Failed to send email to {email}. Error: {str(e)}")
        raise e