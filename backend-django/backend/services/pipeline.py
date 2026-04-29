import logging
logger = logging.getLogger(__name__)

from images.models import Image   #feat: 6.0.1- Bug fixed.

from services.analysis.face_analyzer import analyze_face
from services.analysis.face_analyzer import normalize_analysis
from services.generation.prompt_builder import build_prompt
from services.generation.generator import generate_headshot
from services.storage.cloudinary_service import upload_to_cloudinary
from services.download.download import download_image

def process_image(image_path):
    # 1. Analyze
    raw = analyze_face(image_path)
    if "error" in raw:
        return raw

    # 2. Normalize
    normalized = normalize_analysis(raw)

    # 3. Build prompt
    prompts = build_prompt(normalized)
    
    # Debugging line to check generated prompts
    # logging in the terminal here:
    logger.info(f"Generated Prompts: {prompts}")
    
    #4.5. Upload original image to Cloudinary so that Replicate can access it (Phase 5 will fix this storage issue)
    image_url = upload_to_cloudinary(image_path)

    # 4. Generate image (Updated, now takes image URL instead of path)
    output_url = generate_headshot(image_url, prompts)

    return {
        "analysis": normalized,
        "output": output_url
    }
    

# feat: v5.0.1 - Added Run pipeline function to orchestrate the entire process for a given job. This function retrieves all input images associated with the job, processes each image through the existing pipeline (validation, analysis, generation), and saves the generated output back to the database. This modular approach allows for better separation of concerns and makes it easier to manage the processing flow for each job.
def run_pipeline(job):
    if not job.best_image:
        raise Exception("No best image selected for this job")

    image = job.best_image
    
    try:
        result = process_image(image.file.path)

        if "error" in result:
            raise Exception(f"Best image processing failed: {result['error']}")

        output_url = result["output"]

        # 1. Download generated image
        image_file = download_image(output_url)

        # 2. Save to local media folder via Image model
        # We create the empty record in the database marking it as an OUTPUT image for the target job.
        output_image_obj = Image.objects.create(
            job=job,
            type="OUTPUT"
        )
        # This is standard Django logic. We pass the raw memory bytes (image_file).
        output_image_obj.file.save(f"output_{job.id}_{image.id}.png", image_file)

        # 3. Upload to Cloudinary
        # We grab the physical file location on the server using .file.path and send a standard payload request over to the official Cloudinary image server buckets.
        cloudinary_url = upload_to_cloudinary(output_image_obj.file.path)
        output_image_obj.generated_url = cloudinary_url
        output_image_obj.save() # We commit the changes safely back inside your local database schemas.

    except Exception as e:
        raise Exception(f"Pipeline execution failed for best image. Error: {str(e)}")


    