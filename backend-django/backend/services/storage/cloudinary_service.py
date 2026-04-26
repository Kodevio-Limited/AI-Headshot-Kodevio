import cloudinary.uploader


def upload_to_cloudinary(image_path: str) -> str:
    """
    Uploads image to Cloudinary and returns public URL
    """

    response = cloudinary.uploader.upload(
        image_path,
        folder="ai-headshots",
        resource_type="image"
    )

    return response["secure_url"]