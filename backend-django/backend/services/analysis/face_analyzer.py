import cv2
import numpy as np
from deepface import DeepFace

# -----------------------------------------------
# 🔒 Load models ONCE at module level (not per call)
# -----------------------------------------------

def _get_deepface_result(face_img_bgr):
    """
    Run analyze once, cache result.
    detector_backend=skip because face is already cropped.
    """
    return DeepFace.analyze(
        img_path=face_img_bgr,
        actions=["age", "gender", "emotion"],
        detector_backend="skip",
        enforce_detection=False,
        silent=True  # suppress per-call logs
    )


# -----------------------------------------------
# 📸 Blur
# -----------------------------------------------
def get_blur_score(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return cv2.Laplacian(gray, cv2.CV_64F).var()

def assess_blur(score):
    if score < 50:
        return "blurry"
    elif score < 100:
        return "slightly_blurry"
    return "sharp"

# -----------------------------------------------
# 🎯 Age Group
# -----------------------------------------------
def get_age_group(age):
    if age < 13: return "child"
    elif age < 20: return "teen"
    elif age < 30: return "young adult"
    elif age < 50: return "adult"
    return "middle-aged"

# -----------------------------------------------
# 🧭 Pose
# -----------------------------------------------
def estimate_pose(landmarks):
    if not landmarks:
        return "unknown"
    left_eye = landmarks.get("left_eye")
    right_eye = landmarks.get("right_eye")
    nose = landmarks.get("nose")
    if not (left_eye and right_eye and nose):
        return "unknown"
    left_dist = abs(nose[0] - left_eye[0])
    right_dist = abs(right_eye[0] - nose[0])
    ratio = left_dist / (right_dist + 1e-6)
    if 0.8 < ratio < 1.2:
        return "front-facing"
    elif ratio <= 0.8:
        return "looking right"
    return "looking left"

# -----------------------------------------------
# 🎨 Skin Tone
# -----------------------------------------------
def get_skin_tone(face_img_bgr):
    h, w = face_img_bgr.shape[:2]
    cx, cy = w // 2, h // 2
    sample = face_img_bgr[
        int(cy * 0.6):int(cy * 1.2),
        int(cx * 0.6):int(cx * 1.4)
    ]
    if sample.size == 0:
        return {"label": "unknown", "rgb": None}

    avg_bgr = sample.mean(axis=(0, 1))
    r, g, b = avg_bgr[::-1]
    luminance = 0.299 * r + 0.587 * g + 0.114 * b

    if luminance > 200: label = "very_light"
    elif luminance > 160: label = "light"
    elif luminance > 120: label = "medium"
    elif luminance > 80: label = "tan"
    elif luminance > 50: label = "dark"
    else: label = "very_dark"

    return {"label": label, "rgb": [int(r), int(g), int(b)], "luminance": round(float(luminance), 2)}

# -----------------------------------------------
# 🧠 MAIN ANALYZER
# -----------------------------------------------
def analyze_face(image_path, include_embedding=False):
    """
    include_embedding=False by default.
    Only pass True when you actually need it (at generation time).
    """
    image = cv2.imread(image_path)
    if image is None:
        return {"error": "Invalid image"}

    blur_score = get_blur_score(image)
    blur_status = assess_blur(blur_score)
    if blur_status == "blurry":
        return {"error": "Image too blurry"}

    # --- Detection: try light backends first ---
    # opencv is fastest, retinaface most accurate
    # Flip priority for speed: opencv → mtcnn → retinaface
    backends = ["opencv", "mtcnn", "retinaface"]
    faces = []
    used_backend = None

    for backend in backends:
        try:
            faces = DeepFace.extract_faces(
                img_path=image_path,
                detector_backend=backend,
                enforce_detection=True,
                align=True
            )
            if faces:
                used_backend = backend
                break
        except ValueError:
            continue

    if not faces:
        return {"error": "No face detected"}
    if len(faces) > 1:
        return {"error": "Multiple faces detected"}

    face_obj = faces[0]
    face_img_rgb = (face_obj["face"] * 255).astype(np.uint8)
    face_img_bgr = cv2.cvtColor(face_img_rgb, cv2.COLOR_RGB2BGR)
    landmarks = face_obj.get("landmarks", {})

    # --- Attribute Analysis (models cached, not reloaded) ---
    try:
        analysis = _get_deepface_result(face_img_bgr)
        if isinstance(analysis, list):
            analysis = analysis[0]
        raw_age = int(analysis["age"])
        age = min(raw_age + 3, 99)
        gender_dict = analysis["gender"]
        emotion_dict = analysis["emotion"]
    except Exception as e:
        return {"error": f"Analysis failed: {str(e)}"}

    # --- Embedding (OPTIONAL — skip during validation) ---
    embedding = None
    if include_embedding:
        try:
            embedding_data = DeepFace.represent(
                img_path=face_img_bgr,
                model_name="ArcFace",
                detector_backend="skip",
                enforce_detection=False
            )
            embedding = embedding_data[0]["embedding"][:10]
        except Exception as e:
            return {"error": f"Embedding failed: {str(e)}"}

    skin_tone = get_skin_tone(face_img_bgr)
    age_range = f"{max(0, age - 5)}-{age + 5}"
    gender_label = max(gender_dict, key=gender_dict.get)
    emotion_label = max(emotion_dict, key=emotion_dict.get)

    result = {
        "age_estimated": age,
        "age_range": age_range,
        "age_group": get_age_group(age),
        "gender": {
            "label": gender_label.lower(),
            "confidence": round(float(gender_dict[gender_label]), 2)
        },
        "emotion": {
            "dominant": emotion_label,
            "confidence": round(float(emotion_dict[emotion_label]), 2)
        },
        "skin_tone": skin_tone,
        "pose": estimate_pose(landmarks),
        "detector_used": used_backend,
        "image_quality": {
            "blur_score": round(float(blur_score), 2),
            "quality": blur_status
        }
    }

    if include_embedding:
        result["embedding"] = embedding

    return result