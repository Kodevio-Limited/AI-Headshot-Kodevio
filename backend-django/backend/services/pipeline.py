from services.analysis.face_analyzer import analyze_face
from services.analysis.face_analyzer import normalize_analysis
from services.generation.prompt_builder import build_prompt
from services.generation.generator import generate_headshot


def process_image(image_path):
    # 1. Analyze
    raw = analyze_face(image_path)
    if "error" in raw:
        return raw

    # 2. Normalize
    normalized = normalize_analysis(raw)

    # 3. Build prompt
    prompts = build_prompt(normalized)

    # 4. Generate image
    output_url = generate_headshot(image_path, prompts)

    return {
        "analysis": normalized,
        "output": output_url
    }