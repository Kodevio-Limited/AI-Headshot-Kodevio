from services.validation.face_validate import ImageValidator

_validator = None

def get_validator():
    global _validator
    if _validator is None:
        _validator = ImageValidator(
            model_asset_path="models/blaze_face_short_range.tflite"
        )
    return _validator