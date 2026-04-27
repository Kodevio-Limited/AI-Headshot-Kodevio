from services.validation.face_validate import ImageValidator

validator = ImageValidator(
    model_asset_path="models/blaze_face_short_range.tflite"
)