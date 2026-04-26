import replicate
import os

client = replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))


def generate_headshot(image_path, prompt_data):
    prompt = prompt_data["prompt"]
    negative_prompt = prompt_data["negative_prompt"]

    with open(image_path, "rb") as f:
        output = client.run(
            "stability-ai/sdxl-img2img",
            input={
                "image": f,
                "prompt": prompt,
                "negative_prompt": negative_prompt,

                # 🔥 CRITICAL SETTINGS
                "strength": 0.3,          # identity preservation
                "guidance_scale": 7.5,
                "num_inference_steps": 30,

                "num_outputs": 1
            }
        )

    return output[0]