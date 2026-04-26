# import replicate
# import os

# client = replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))


# def generate_headshot(image_path, prompt_data):
#     prompt = prompt_data["prompt"]
#     negative_prompt = prompt_data["negative_prompt"]

#     with open(image_path, "rb") as f:
#         output = client.run(
#             "stability-ai/sdxl-img2img",
#             input={
#                 "image": f,
#                   "prompt": prompt,
#                 "negative_prompt": negative_prompt,

#                 # 🔥 CRITICAL SETTINGS
#                 "strength": 0.3,          # identity preservation
#                 "guidance_scale": 7.5,
#                 "num_inference_steps": 30,

#                 "num_outputs": 1
#             }
#         )

#     return output[0]

# import replicate
# import os

# client = replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))


# def generate_headshot(image_url, prompt_data):
#     prompt = prompt_data["prompt"]

#     output = client.run(
#         "black-forest-labs/flux-kontext-pro",
#         input={
#             "input_image": image_url,   # ✅ URL (Cloudinary)
#             "prompt": prompt,
#             "aspect_ratio": "match_input_image",
#             "output_format": "jpg",
#             "safety_tolerance": 2
#         }
#     )

#     return output.url

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
            "prompt": prompt,
            "aspect_ratio": "1:1",
            "background": "neutral",
        }
    )

    # Normalize output
    if isinstance(output, list):
        return output[0]

    if hasattr(output, "url"):
        return output.url

    return str(output)