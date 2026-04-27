from deepface import DeepFace


def normalize_age(age: int):
    if age < 13:
        return "child"
    elif age < 18:
        return "teenager"
    elif age < 35:
        return "young adult"
    elif age < 55:
        return "adult"
    else:
        return "mature adult"


def normalize_gender(gender: str, age: int):
    gender = gender.lower()

    if age < 16:
        if "female" in gender:
            return "girl"
        elif "male" in gender:
            return "boy"
        return "child"

    if "female" in gender:
        return "woman"
    elif "male" in gender:
        return "man"

    return "person"


def normalize_emotion(emotion: str):
    emotion = emotion.lower()

    if emotion in ["happy", "surprise"]:
        return "slight smile"
    return "neutral expression"


def normalize_skin_tone(_):
    return "natural skin tone consistent with input image"


def analyze_face(image_path: str):
    try:
        result = DeepFace.analyze(
            img_path=image_path,
            actions=["age", "gender", "emotion", "race"],
            enforce_detection=False,
            detector_backend="opencv"
        )

        data = result[0] if isinstance(result, list) else result

        raw_age = int(data.get("age", 25))
        raw_gender = data.get("dominant_gender", "person")
        raw_emotion = data.get("dominant_emotion", "neutral")
        raw_race = data.get("dominant_race", None)

        return {
            "age": raw_age,
            "age_group": normalize_age(raw_age),
            "gender": normalize_gender(raw_gender, raw_age),
            "emotion": normalize_emotion(raw_emotion),
            "skin_tone": normalize_skin_tone(raw_race),
        }

    except Exception:
        return {
            "age": 30,
            "age_group": "adult",
            "gender": "person",
            "emotion": "neutral expression",
            "skin_tone": "natural skin tone",
        }