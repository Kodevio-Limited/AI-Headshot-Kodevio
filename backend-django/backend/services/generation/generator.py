import replicate
import os

client = replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))
import logging
logger = logging.getLogger(__name__)

def generate_headshot(image_url, prompt):
    output = client.run(
        "flux-kontext-apps/professional-headshot",
        input={
            "input_image": image_url,
            "background": "neutral",       # optional
            "aspect_ratio": "1:1",
            "output_format": "png",
            "safety_tolerance": 2,        
            "prompt": prompt,
        }
    )

    # ✅ ALWAYS return URL
    return output.url