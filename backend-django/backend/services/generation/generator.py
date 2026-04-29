import replicate
import os

client = replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))
client.poll_interval = 5.0
import logging
logger = logging.getLogger(__name__)

def generate_headshot(image_url, prompt):
    positive = prompt.get("prompt")
    negative = prompt.get("negative_prompt")
    gender_input = str(prompt.get("gender", "none")).lower()
    if gender_input in ["man", "boy", "male"]:
        gender = "male"
    elif gender_input in ["woman", "girl", "female"]:
        gender = "female"
    else:
        gender = "none"
        
    logger.info(prompt)
    logger.info(positive)
    logger.info(negative)
    logger.info(gender)
    
    output = client.run(
        "flux-kontext-apps/professional-headshot",
        input={
            "input_image": image_url,
            "background": "neutral", 
            "gender" : gender,   # optional
            "aspect_ratio": "1:1",
            "output_format": "png",
            # "safety_tolerance": 2,        
            "prompt": positive,
        }
    )

    # ✅ ALWAYS return URL
    return output.url