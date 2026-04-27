import requests
from django.core.files.base import ContentFile

# feat: v9.0.0 - This function is used to download images from the internet and save them to the database as a ContentFile.
def download_image(url):
    response = requests.get(url)
    return ContentFile(response.content)