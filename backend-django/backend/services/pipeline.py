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