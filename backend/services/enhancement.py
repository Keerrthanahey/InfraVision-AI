"""IR image enhancement pipeline using OpenCV."""

import cv2
import numpy as np


def enhance_image(
    gray: np.ndarray,
    clahe_clip: float = 2.0,
    bilateral_d: int = 9,
    gaussian_ksize: int = 3,
    sharpen_amount: float = 1.2,
) -> np.ndarray:
    clahe = cv2.createCLAHE(clipLimit=max(clahe_clip, 0.1), tileGridSize=(8, 8))
    enhanced = clahe.apply(gray)

    if bilateral_d > 0:
        d = bilateral_d if bilateral_d % 2 == 1 else bilateral_d + 1
        enhanced = cv2.bilateralFilter(enhanced, d, 75, 75)

    if gaussian_ksize > 0:
        k = gaussian_ksize if gaussian_ksize % 2 == 1 else gaussian_ksize + 1
        enhanced = cv2.GaussianBlur(enhanced, (k, k), 0)

    if sharpen_amount > 0:
        kernel = np.array(
            [[0, -1, 0], [-1, 5 + sharpen_amount, -1], [0, -1, 0]],
            dtype=np.float32,
        )
        enhanced = cv2.filter2D(enhanced, -1, kernel)
        enhanced = np.clip(enhanced, 0, 255).astype(np.uint8)

    return enhanced
