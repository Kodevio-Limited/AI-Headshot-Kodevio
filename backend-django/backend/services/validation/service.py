import cv2
from deepface import DeepFace

# This function is responsible for
def is_blurry(image_path,threshold=100):
    img=cv2.imread(image_path)
    gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    variance = cv2.Laplacian(gray,cv2.CV_64F).var()
    return variance < threshold
    
def face_detection(image_path):
    try:
        faces = DeepFace.extract_faces(
            img_path=image_path,
            enforce_detection=False
        )
        return faces
    except Exception:
        return []

def validate_image(image_path):
    if is_blurry(image_path):
        return False, "Error: The Image is Blurry."
    
    faces = face_detection(image_path)

    if len(faces) == 0:
        return False, "Invalid Input: No Face was Detected in the uploaded image file."

    if len(faces) > 1:
        return False, "Invalid Input: Multiple Faces detectedin the uploaded image file."
    
    return True, "Success: The Uploaded image is valid."
    