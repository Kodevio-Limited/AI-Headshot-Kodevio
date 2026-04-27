
import cv2
import numpy as np

# feat: v8.0.0 - Blur Score
def blur_score(face_crop):
    gray = cv2.cvtColor(face_crop, cv2.COLOR_BGR2GRAY)
    return cv2.Laplacian(gray, cv2.CV_64F).var()


# feat: v8.0.0 - Brightness Score
def brightness_score(face_crop):
    hsv = cv2.cvtColor(face_crop, cv2.COLOR_BGR2HSV)
    return np.mean(hsv[:, :, 2])


# feat: v8.0.0 - Combined Scoring Function
def score_image(image_path, face_info):
    image = cv2.imread(image_path)

    x = face_info["x"]
    y = face_info["y"]
    w = face_info["w"]
    h = face_info["h"]

    face_crop = image[y:y+h, x:x+w]

    blur = blur_score(face_crop)
    brightness = brightness_score(face_crop)

    # weighted score
    score = (0.7 * blur) + (0.3 * brightness)

    return score