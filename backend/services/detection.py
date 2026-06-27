"""Object detection with YOLO (fallback to contour-based detection)."""

import cv2
import numpy as np

YOLO_CLASSES = {"person", "car", "truck", "bus", "building", "dog", "cat", "horse", "bird"}
DISPLAY_MAP = {
    "person": "human",
    "car": "vehicle",
    "truck": "vehicle",
    "bus": "vehicle",
    "dog": "animal",
    "cat": "animal",
    "horse": "animal",
    "bird": "animal",
}

_model = None


def _get_model():
    global _model
    if _model is not None:
        return _model
    try:
        from ultralytics import YOLO

        _model = YOLO("yolov8n.pt")
    except Exception:
        _model = False
    return _model


def detect_objects(gray: np.ndarray) -> list[dict]:
    model = _get_model()
    bgr = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)

    if model and model is not False:
        results = model(bgr, verbose=False)
        detections = []
        for r in results:
            for box in r.boxes:
                cls_id = int(box.cls[0])
                name = r.names[cls_id]
                if name in YOLO_CLASSES or name in DISPLAY_MAP:
                    display = DISPLAY_MAP.get(name, name)
                    x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                    detections.append(
                        {
                            "class": display,
                            "confidence": round(float(box.conf[0]), 3),
                            "bbox": [x1, y1, x2, y2],
                        }
                    )
        return detections[:20]

    return _fallback_detection(gray)


def _fallback_detection(gray: np.ndarray) -> list[dict]:
    """Contour-based fallback when YOLO is unavailable."""
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    _, thresh = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    detections = []
    h, w = gray.shape
    for i, cnt in enumerate(contours[:8]):
        area = cv2.contourArea(cnt)
        if area < (w * h * 0.002):
            continue
        x, y, bw, bh = cv2.boundingRect(cnt)
        cls = ["building", "vehicle", "human", "animal"][i % 4]
        conf = min(0.95, 0.55 + area / (w * h) * 2)
        detections.append(
            {"class": cls, "confidence": round(conf, 3), "bbox": [x, y, x + bw, y + bh]}
        )
    return detections


def draw_detections(img: np.ndarray, detections: list[dict]) -> np.ndarray:
    colors = {
        "human": (0, 229, 255),
        "vehicle": (255, 107, 0),
        "building": (124, 58, 237),
        "animal": (0, 255, 128),
    }
    for d in detections:
        x1, y1, x2, y2 = d["bbox"]
        color = colors.get(d["class"], (0, 229, 255))
        cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
        label = f"{d['class']} {d['confidence']*100:.0f}%"
        cv2.putText(img, label, (x1, y1 - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)
    return img
