"""Thermal palette colourisation for grayscale IR images."""

import cv2
import numpy as np

PALETTES = {
    "ironbow": cv2.COLORMAP_INFERNO,
    "rainbow": cv2.COLORMAP_JET,
    "hot": cv2.COLORMAP_HOT,
    "arctic": cv2.COLORMAP_WINTER,
    "grayscale": None,
    "custom": cv2.COLORMAP_TURBO,
}


def apply_palette(gray: np.ndarray, palette: str) -> np.ndarray:
    cmap = PALETTES.get(palette, cv2.COLORMAP_INFERNO)

    if cmap is None:
        return cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)

    normalized = cv2.normalize(gray, None, 0, 255, cv2.NORM_MINMAX)
    colored = cv2.applyColorMap(normalized, cmap)

    return colored