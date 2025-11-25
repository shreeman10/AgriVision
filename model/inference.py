import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import os

# ---- Load Model ----
MODEL_PATH = "../model/agri_guard_final.h5"
model = load_model(MODEL_PATH)

# ---- Class Labels ----
class_names = [
"Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
"Blueberry___healthy",
"Cherry___Powdery_mildew", "Cherry___healthy",
"Corn___Cercospora_leaf_spot", "Corn___Common_rust", "Corn___Northern_Leaf_Blight", "Corn___healthy",
"Grape___Black_rot", "Grape___Esca", "Grape___Leaf_blight", "Grape___healthy",
"Orange___Haunglongbing",
"Peach___Bacterial_spot", "Peach___healthy",
"Pepper__bell___Bacterial_spot", "Pepper__bell___healthy",
"Potato___Early_blight", "Potato___Late_blight", "Potato___healthy",
"Raspberry___healthy",
"Soybean___healthy",
"Squash___Powdery_mildew",
"Strawberry___Leaf_scorch", "Strawberry___healthy",
"Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
"Tomato___Septoria_leaf_spot", "Tomato___Spider_mites", "Tomato___Target_Spot",
"Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus", "Tomato___healthy"
]

IMG_SIZE = (224, 224)

# ---- Preprocess Function ----
def preprocess_image(image_path):
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_resized = cv2.resize(img_rgb, IMG_SIZE)
    img_norm = img_resized / 255.0
    return img, np.expand_dims(img_norm, axis=0)

# ---- Prediction ----
def predict_disease(image_path):
    original_img, img_array = preprocess_image(image_path)
    preds = model.predict(img_array)
    confidence = np.max(preds)
    class_index = np.argmax(preds)
    predicted_class = class_names[class_index]
    return original_img, predicted_class, confidence

# ---- Severity ----
def get_severity(predicted_class, confidence):
    if "healthy" in predicted_class.lower():
        return "None"
    if confidence < 0.60:
        return "Mild"
    elif confidence < 0.85:
        return "Moderate"
    else:
        return "Severe"

# ---- Recommendations ----
recommendations = {
    "Apple___Black_rot": "Remove infected leaves, apply copper fungicide.",
    "Potato___Early_blight": "Ensure spacing, apply neem oil.",
    "Tomato___Late_blight": "Remove infected parts, avoid overhead watering.",
}

def get_recommendation(class_name, severity):
    base = recommendations.get(class_name, "Maintain hygiene and monitor leaf conditions.")
    if severity == "Mild":
        return base + " (Mild stage: Monitor and apply preventive care.)"
    elif severity == "Moderate":
        return base + " (Moderate stage: Take action soon.)"
    elif severity == "Severe":
        return base + " (Severe stage: Consider removing affected leaves.)"
    else:
        return base

# ---- Grad-CAM ----
LAST_CONV_LAYER_NAME = "Conv_1"

def make_gradcam_heatmap(img_array):
    grad_model = tf.keras.models.Model(
        [model.inputs],
        [model.get_layer(LAST_CONV_LAYER_NAME).output, model.output]
    )

    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_array)
        predictions = tf.squeeze(predictions)
        class_index = tf.argmax(predictions)
        loss = predictions[class_index]

    grads = tape.gradient(loss, conv_outputs)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    conv_outputs = conv_outputs[0]

    heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)
    heatmap = tf.maximum(heatmap, 0) / (tf.math.reduce_max(heatmap) + 1e-8)
    return heatmap.numpy()


def generate_gradcam(image_path):
    original_img, img_array = preprocess_image(image_path)
    heatmap = make_gradcam_heatmap(img_array)

    heatmap_resized = cv2.resize(heatmap, (original_img.shape[1], original_img.shape[0]))
    heatmap_colored = cv2.applyColorMap(np.uint8(255 * heatmap_resized), cv2.COLORMAP_JET)

    overlay = cv2.addWeighted(original_img, 0.5, heatmap_colored, 0.5, 0)
    save_path = "../assets/gradcam_output.png"
    cv2.imwrite(save_path, overlay)
    return save_path

# ---- Main Inference ----
def run_inference(image_path):
    original_img, predicted_class, confidence = predict_disease(image_path)
    severity = get_severity(predicted_class, confidence)
    advice = get_recommendation(predicted_class, severity)
    heatmap_path = generate_gradcam(image_path)

    return {
        "Prediction": predicted_class,
        "Confidence": float(confidence),
        "Severity": severity,
        "Recommendation": advice,
        "GradCAM": heatmap_path
    }
