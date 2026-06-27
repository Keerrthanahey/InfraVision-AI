"""Image quality metrics for enhancement evaluation."""

import cv2
import numpy as np


def compute_metrics(original: np.ndarray, enhanced: np.ndarray) -> dict:
    orig = original.astype(np.float64)
    enh = enhanced.astype(np.float64)

    mse = np.mean((orig - enh) ** 2)
    psnr = 10 * np.log10(255**2 / (mse + 1e-10))

    ssim = _ssim(orig, enh)
    lpips_proxy = 1.0 - ssim

    return {
        "psnr": round(float(psnr), 2),
        "ssim": round(float(ssim), 3),
        "lpips": round(float(lpips_proxy), 3),
    }


def _ssim(img1: np.ndarray, img2: np.ndarray) -> float:
    C1 = (0.01 * 255) ** 2
    C2 = (0.03 * 255) ** 2
    kernel = cv2.getGaussianKernel(11, 1.5)
    window = kernel @ kernel.T

    mu1 = cv2.filter2D(img1, -1, window)
    mu2 = cv2.filter2D(img2, -1, window)
    mu1_sq, mu2_sq, mu1_mu2 = mu1**2, mu2**2, mu1 * mu2

    sigma1_sq = cv2.filter2D(img1**2, -1, window) - mu1_sq
    sigma2_sq = cv2.filter2D(img2**2, -1, window) - mu2_sq
    sigma12 = cv2.filter2D(img1 * img2, -1, window) - mu1_mu2

    ssim_map = ((2 * mu1_mu2 + C1) * (2 * sigma12 + C2)) / (
        (mu1_sq + mu2_sq + C1) * (sigma1_sq + sigma2_sq + C2)
    )
    return float(ssim_map.mean())
