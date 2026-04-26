from tkinter import Image

from services.analysis.face_analyzer import analyze_face
from services.analysis.face_analyzer import normalize_analysis
from services.generation.prompt_builder import build_prompt
from services.generation.generator import generate_headshot
from services.storage.cloudinary_service import upload_to_cloudinary

def process_image(image_path):
    # 1. Analyze
    raw = analyze_face(image_path)
    if "error" in raw:
        return raw

    # 2. Normalize
    normalized = normalize_analysis(raw)

    # 3. Build prompt
    prompts = build_prompt(normalized)
    
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
    input_images = job.images.filter(type="INPUT")

    if not input_images.exists():
        raise Exception("No input images found")

    for image in input_images:
        result = process_image(image.file.path)

        if "error" in result:
            raise Exception(result["error"])

        # Save output
        Image.objects.create(
            job=job,
            generated_url=result["output"],
            type="OUTPUT"
        )    
    