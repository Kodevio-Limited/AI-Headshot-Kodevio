SKIN_TONE_MAP = {
    "very_light": "fair skin",
    "light":      "light skin",
    "medium":     "medium skin tone",
    "tan":        "olive skin tone",
    "dark":       "dark skin tone",
    "very_dark":  "deep dark skin tone",
    "unknown":    "natural skin tone"
}


def build_prompt(data):
    age_text    = data.get("age_text", "adult")
    gender_text = data.get("gender_text", "person")
    emotion     = data.get("emotion_text", "neutral expression")
    skin_label  = data.get("skin_text", "unknown")

    skin_phrase = SKIN_TONE_MAP.get(skin_label, "natural skin tone")

    # 🔥 POSITIVE PROMPT (identity-first, concise, strong)
    positive = (
        f"Same person, identical face, preserve exact facial identity. "
        f"Ultra-realistic professional headshot of a {age_text} {gender_text}, "
        f"{skin_phrase}, {emotion}. "
        f"Minimal changes to original face, maintain facial structure, eyes, nose, lips, skin texture. "
        f"Studio lighting, soft shadows, rim lighting, 85mm portrait lens, shallow depth of field, bokeh background. "
        f"Corporate LinkedIn profile photo, clean background, sharp focus, photorealistic, high detail."
    )

    # 🔥 NEGATIVE PROMPT (clean + focused)
    negative = (
        "different person, changed identity, altered face, distorted face, deformed eyes, "
        "asymmetric face, cartoon, anime, painting, illustration, low quality, blurry, watermark, text"
    )

    return {
        "prompt": positive,
        "negative_prompt": negative
    }