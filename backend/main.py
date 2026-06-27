"""InfraVision AI - Image enhancement, colourisation, and detection services."""

import base64
import io
import time
from typing import Literal

import cv2
import numpy as np
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

from services.colorization import apply_palette
from services.detection import detect_objects, draw_detections
from services.enhancement import enhance_image
from services.metrics import compute_metrics

app = FastAPI(
    title="InfraVision AI API",
    description="Infrared image enhancement, colourisation, and object detection",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _to_b64(img: np.ndarray) -> str:
    if len(img.shape) == 2:
        img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
    _, buf = cv2.imencode(".png", img)
    b64 = base64.b64encode(buf).decode("utf-8")
    return f"data:image/png;base64,{b64}"


def _read_upload(file: UploadFile) -> np.ndarray:
    data = file.file.read()
    arr = np.frombuffer(data, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_GRAYSCALE)
    if img is None:
        img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
        if img is not None:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    if img is None:
        raise ValueError("Could not decode image")
    return img


@app.get("/health")
def health():
    return {"status": "ok", "service": "InfraVision AI"}


@app.post("/api/process")
async def process(
    file: UploadFile = File(...),
    clahe: float = Form(2.0),
    bilateral: int = Form(9),
    gaussian: int = Form(3),
    sharpen: float = Form(1.2),
    palette: Literal["ironbow", "rainbow", "hot", "arctic", "grayscale", "custom"] = Form(
        "ironbow"
    ),
):
    start = time.perf_counter()
    original = _read_upload(file)
    enhanced = enhance_image(original, clahe, bilateral, gaussian, sharpen)
    colorized = apply_palette(enhanced, palette)

    detections = detect_objects(enhanced)
    detection_img = draw_detections(colorized.copy(), detections)

    metrics = compute_metrics(original, enhanced)
    elapsed_ms = (time.perf_counter() - start) * 1000
    metrics["processing_time_ms"] = round(elapsed_ms, 1)

    return {
        "original": _to_b64(original),
        "enhanced": _to_b64(enhanced),
        "colorized": _to_b64(colorized),
        "detection": _to_b64(detection_img),
        "detections": detections,
        "metrics": metrics,
    }
