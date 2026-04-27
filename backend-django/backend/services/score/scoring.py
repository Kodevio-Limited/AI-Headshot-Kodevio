

import cv2
import numpy as np


# feat: v8.0.0 - Blur Score
def blur_score(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return cv2.Laplacian(gray, cv2.CV_64F).var()


# feat: v8.0.0 - Brightness Score
def brightness_score(image_path):
    image = cv2.imread(image_path)
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    return np.mean(hsv[:, :, 2])  # brightness


# feat: v8.0.0 - Combined Scoring Function
def score_image(image_path):
    blur = blur_score(image_path)
    brightness = brightness_score(image_path)

    # normalize a bit (rough weights)
    score = (0.7 * blur) + (0.3 * brightness)

    return score