# import cv2
# import numpy as np
# from deepface import DeepFace


# # -------------------------------
# # 📸 Blur Detection (still valid)
# # -------------------------------
# def get_blur_score(image):
#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     return cv2.Laplacian(gray, cv2.CV_64F).var()


# def assess_blur(score):
#     if score < 250:
#         return "blurry"
#     elif score < 500:
#         return "slightly_blurry"
#     return "sharp"


# # -------------------------------
# # 🧠 DeepFace Detection (Modern)
# # -------------------------------
# def detect_faces(image_path):
#     faces = DeepFace.extract_faces(
#         img_path=image_path,
#         detector_backend="retinaface",
#         enforce_detection=True,
#         align=True
#     )
#     return faces

# # -------------------------------
# # 🎯 Age Group
# # -------------------------------
# def get_age_group(age):
#     if age < 13:
#         return "child"
#     elif age < 20:
#         return "teen"
#     elif age < 30:
#         return "young adult"
#     elif age < 50:
#         return "adult"
#     return "middle-aged"


# # -------------------------------
# # 🧭 Pose (Better heuristic)
# # -------------------------------
# def estimate_pose(face_img):
#     h, w, _ = face_img.shape

#     left = face_img[:, :w//2]
#     right = face_img[:, w//2:]

#     diff = np.mean(left) - np.mean(right)

#     if abs(diff) < 5:
#         return "front-facing"
#     elif diff > 0:
#         return "looking right"
#     else:
#         return "looking left"


# # -------------------------------
# # 🧬 Feature Extraction (lightweight)
# # -------------------------------
# def extract_features(face_img):
#     return {
#         "accessories": "unknown",
#         "facial_hair": "unknown",
#         "hair": "unknown"
#     }


# # -------------------------------
# # 🧠 MAIN ANALYZER
# # -------------------------------
# def analyze_face(image_path):

#     image = cv2.imread(image_path)
#     if image is None:
#         return {"error": "Invalid image"}

#     # --- Blur ---
#     blur_score = get_blur_score(image)
#     blur_status = assess_blur(blur_score)

#     if blur_status == "blurry":
#         return {"error": "Image too blurry"}

#     # --- Detection ---
#     faces = detect_faces(image_path)

#     if len(faces) == 0:
#         return {"error": "No face detected"}

#     if len(faces) > 1:
#         return {"error": "Multiple faces detected"}

#     face_obj = faces[0]

#     # DeepFace gives normalized face (0–1)
#     face_img = (face_obj["face"] * 255).astype("uint8")

#     # -------------------------------
#     # 🧠 Attribute Analysis
#     # -------------------------------
#     analysis = DeepFace.analyze(
#         img_path=image_path,
#         actions=["age", "gender", "emotion"],
#         detector_backend="retinaface",
#         enforce_detection=False
#     )

#     if isinstance(analysis, list):
#         analysis = analysis[0]

#     # -------------------------------
#     # 🧠 Identity Embedding (IMPORTANT)
#     # -------------------------------
#     embedding = DeepFace.represent(
#         img_path=image_path,
#         model_name="ArcFace",
#         detector_backend="retinaface",
#         enforce_detection=False
#     )[0]["embedding"]

#     # -------------------------------
#     # 🧠 Structuring Output
#     # -------------------------------
#     age = int(analysis["age"])
#     age_group = get_age_group(age)

#     gender_dict = analysis["gender"]
#     gender_label = max(gender_dict, key=gender_dict.get)

#     emotion_dict = analysis["emotion"]
#     emotion_label = max(emotion_dict, key=emotion_dict.get)

#     output = {
#         "age": age,
#         "age_group": age_group,

#         "gender": {
#             "label": gender_label.lower(),
#             "confidence": float(gender_dict[gender_label])
#         },

#         "emotion": {
#             "dominant": emotion_label,
#             "confidence": float(emotion_dict[emotion_label])
#         },

#         "pose": estimate_pose(face_img),

#         "face_features": extract_features(face_img),

#         "embedding": embedding[:10],  # store partial (or full if needed)

#         "image_quality": {
#             "blur_score": float(blur_score),
#             "quality": blur_status
#         }
#     }

#     return output




# # from deepface import DeepFace


# # def normalize_age(age: int):
# #     if age < 13:
# #         return "child"
# #     elif age < 18:
# #         return "teenager"
# #     elif age < 35:
# #         return "young adult"
# #     elif age < 55:
# #         return "adult"
# #     else:
# #         return "mature adult"


# # def normalize_gender(gender: str, age: int):
# #     gender = gender.lower()

# #     if age < 16:
# #         if "female" in gender:
# #             return "girl"
# #         elif "male" in gender:
# #             return "boy"
# #         return "child"

# #     if "female" in gender:
# #         return "woman"
# #     elif "male" in gender:
# #         return "man"

# #     return "person"


# # def normalize_emotion(emotion: str):
# #     emotion = emotion.lower()

# #     if emotion in ["happy", "surprise"]:
# #         return "slight smile"
# #     return "neutral expression"


# # def normalize_skin_tone(_):
# #     return "natural skin tone consistent with input image"


# # def analyze_face(image_path: str):
# #     try:
# #         result = DeepFace.analyze(
# #             img_path=image_path,
# #             actions=["age", "gender", "emotion", "race"],
# #             enforce_detection=False,
# #             detector_backend="opencv"
# #         )

# #         data = result[0] if isinstance(result, list) else result

# #         raw_age = int(data.get("age", 25))
# #         raw_gender = data.get("dominant_gender", "person")
# #         raw_emotion = data.get("dominant_emotion", "neutral")
# #         raw_race = data.get("dominant_race", None)

# #         return {
# #             "age": raw_age,
# #             "age_group": normalize_age(raw_age),
# #             "gender": normalize_gender(raw_gender, raw_age),
# #             "emotion": normalize_emotion(raw_emotion),
# #             "skin_tone": normalize_skin_tone(raw_race),
# #         }

# #     except Exception:
# #         return {
# #             "age": 30,
# #             "age_group": "adult",
# #             "gender": "person",
# #             "emotion": "neutral expression",
# #             "skin_tone": "natural skin tone",
# #         }

import cv2
import numpy as np
from deepface import DeepFace

# -------------------------------
# 📸 Blur Detection
# -------------------------------
def get_blur_score(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return cv2.Laplacian(gray, cv2.CV_64F).var()

def assess_blur(score):
    # Lowered thresholds to accommodate standard web/phone images
    if score < 50:
        return "blurry"
    elif score < 100:
        return "slightly_blurry"
    return "sharp"

# -------------------------------
# 🎯 Age Group
# -------------------------------
def get_age_group(age):
    if age < 13:
        return "child"
    elif age < 20:
        return "teen"
    elif age < 30:
        return "young adult"
    elif age < 50:
        return "adult"
    return "middle-aged"

# -------------------------------
# 🧭 Pose (Geometric approach via Landmarks)
# -------------------------------
def estimate_pose(landmarks):
    if not landmarks:
        return "unknown"
    
    left_eye = landmarks.get("left_eye")
    right_eye = landmarks.get("right_eye")
    nose = landmarks.get("nose")
    
    if not (left_eye and right_eye and nose):
        return "unknown"

    # Calculate horizontal distances from eyes to the nose
    left_dist = abs(nose[0] - left_eye[0])
    right_dist = abs(right_eye[0] - nose[0])
    
    # Calculate a simple ratio to determine head yaw
    ratio = left_dist / (right_dist + 1e-6) # prevent div by zero
    
    if 0.8 < ratio < 1.2:
        return "front-facing"
    elif ratio <= 0.8:
        return "looking right" # From camera's perspective
    else:
        return "looking left"

# -------------------------------
# 🧠 MAIN ANALYZER
# -------------------------------
def analyze_face(image_path):
    image = cv2.imread(image_path)
    if image is None:
        return {"error": "Invalid image"}

    # --- Blur ---
    blur_score = get_blur_score(image)
    blur_status = assess_blur(blur_score)

    if blur_status == "blurry":
        return {"error": "Image too blurry"}

    # --- Detection with Fallback Strategy ---
    backends = ["retinaface", "mtcnn", "opencv"]
    faces = []
    
    for backend in backends:
        try:
            faces = DeepFace.extract_faces(
                img_path=image_path,
                detector_backend=backend,
                enforce_detection=True,
                align=True
            )
            if len(faces) > 0:
                print(f"Face detected successfully using: {backend}")
                break
        except ValueError:
            continue

    if len(faces) == 0:
        return {"error": "No face detected"}
    if len(faces) > 1:
        return {"error": "Multiple faces detected"}

    face_obj = faces[0]
    
    # 🛠️ CRITICAL FIX: Convert DeepFace's normalized RGB float array to standard BGR uint8.
    # Without this, downstream analyze/represent functions fail to read the image properly.
    face_img_rgb = (face_obj["face"] * 255).astype(np.uint8)
    face_img_bgr = cv2.cvtColor(face_img_rgb, cv2.COLOR_RGB2BGR)
    
    # Extract landmarks for pose estimation
    landmarks = face_obj.get("facial_area", {})

    # -------------------------------
    # 🧠 Attribute Analysis
    # -------------------------------
    try:
        analysis = DeepFace.analyze(
            img_path=face_img_bgr, # Pass the corrected BGR array
            actions=["age", "gender", "emotion"],
            detector_backend="skip", # Skip detection (Requires DeepFace >= 0.0.79)
            enforce_detection=False
        )
        if isinstance(analysis, list):
            analysis = analysis[0]
            
        age = int(analysis["age"])
        gender_dict = analysis["gender"]
        emotion_dict = analysis["emotion"]
        
    except Exception as e:
        return {"error": f"Analysis failed: {str(e)}"}

    # -------------------------------
    # 🧠 Identity Embedding
    # -------------------------------
    try:
        embedding_data = DeepFace.represent(
            img_path=face_img_bgr, # Pass the corrected BGR array
            model_name="ArcFace",
            detector_backend="skip", # Skip detection
            enforce_detection=False
        )
        embedding = embedding_data[0]["embedding"]
    except Exception as e:
         return {"error": f"Embedding failed: {str(e)}"}

    # -------------------------------
    # 🧠 Structuring Output
    # -------------------------------
    gender_label = max(gender_dict, key=gender_dict.get)
    emotion_label = max(emotion_dict, key=emotion_dict.get)

    return {
        "age": age,
        "age_group": get_age_group(age),
        "gender": {
            "label": gender_label.lower(),
            "confidence": float(gender_dict[gender_label])
        },
        "emotion": {
            "dominant": emotion_label,
            "confidence": float(emotion_dict[emotion_label])
        },
        "pose": estimate_pose(landmarks),
        "embedding": embedding[:10], # Truncated for output readability
        "image_quality": {
            "blur_score": float(blur_score),
            "quality": blur_status
        }
    }