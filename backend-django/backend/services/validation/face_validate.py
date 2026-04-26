
import cv2
import mediapipe as mp
from pathlib import Path


class ImageValidator:
    def __init__(self, model_asset_path: str):
        if not Path(model_asset_path).exists():
            raise FileNotFoundError(f"Model not found: {model_asset_path}")

        BaseOptions = mp.tasks.BaseOptions
        FaceDetector = mp.tasks.vision.FaceDetector
        FaceDetectorOptions = mp.tasks.vision.FaceDetectorOptions

        options = FaceDetectorOptions(
            base_options=BaseOptions(model_asset_path=model_asset_path),
            min_detection_confidence=0.6  # stable default
        )

        self.detector = FaceDetector.create_from_options(options)

    def _is_blurry(self, image, threshold=80):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        variance = cv2.Laplacian(gray, cv2.CV_64F).var()
        return variance < threshold

    def validate(self, image_path):
        img = cv2.imread(image_path)
        if img is None:
            return False, "Invalid image", None

        rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)

        result = self.detector.detect(mp_image)
        faces = result.detections or []

        # 1. No face
        if len(faces) == 0:
            return False, "Validation failed: No face detected", None

        # 2. Multiple faces
        if len(faces) > 1:
            return False, "Validation failed: Multiple faces detected", None

        # 3. Single face → blur check
        bbox = faces[0].bounding_box
        x, y = int(bbox.origin_x), int(bbox.origin_y)
        w, h = int(bbox.width), int(bbox.height)

        # Safe crop
        h_img, w_img, _ = img.shape
        x = max(0, x)
        y = max(0, y)
        w = min(w_img - x, w)
        h = min(h_img - y, h)

        face_crop = img[y:y+h, x:x+w]

        if self._is_blurry(face_crop):
            return False, "Validation failed: Face is blurry", None

        return True, "Validation passed: Valid image", None



# import cv2
# import mediapipe as mp
# from pathlib import Path


# class ImageValidator:
#     def __init__(self, model_asset_path: str):
#         if not Path(model_asset_path).exists():
#             raise FileNotFoundError(f"Model not found: {model_asset_path}")

#         BaseOptions = mp.tasks.BaseOptions
#         FaceDetector = mp.tasks.vision.FaceDetector
#         FaceDetectorOptions = mp.tasks.vision.FaceDetectorOptions

#         options = FaceDetectorOptions(
#             base_options=BaseOptions(model_asset_path=model_asset_path),
#             min_detection_confidence=0.6  # stable default
#         )

#         self.detector = FaceDetector.create_from_options(options)

#     def _is_blurry(self, image, threshold=80):
#         gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#         variance = cv2.Laplacian(gray, cv2.CV_64F).var()
#         return variance < threshold

#     def validate(self, image_path):
#         img = cv2.imread(image_path)
#         if img is None:
#             return False, "Invalid image", None

#         rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#         mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)

#         result = self.detector.detect(mp_image)
#         faces = result.detections or []

#         # 1. No face
#         if len(faces) == 0:
#             if self._is_blurry(img):
#                 return False, "Validation failed: Image is too blurry", None
#             return False, "Validation failed: No face detected", None

#         # 2. Multiple faces
#         if len(faces) > 1:
#             return False, "Validation failed: Multiple faces detected", None

#         # 3. Single face → blur check
#         bbox = faces[0].bounding_box
#         x, y, w, h = int(bbox.origin_x), int(bbox.origin_y), int(bbox.width), int(bbox.height)

#         face_crop = img[y:y+h, x:x+w]

#         if self._is_blurry(face_crop):
#             return False, "Validation failed: Face is blurry", None

#         return True, "Validation passed: Valid image", None

