import { API_BASE } from "./utils";

export type Palette = "ironbow" | "rainbow" | "hot" | "arctic" | "grayscale" | "custom";

export interface EnhancementParams {
  clahe: number;
  bilateral: number;
  gaussian: number;
  sharpen: number;
}

export interface DetectionResult {
  class: string;
  confidence: number;
  bbox: [number, number, number, number];
}

export interface ProcessingResult {
  original: string;
  enhanced: string;
  colorized: string;
  detection: string;
  detections: DetectionResult[];
  metrics: {
    psnr: number;
    ssim: number;
    lpips: number;
    processing_time_ms: number;
  };
}

export async function processImage(
  file: File,
  params: EnhancementParams,
  palette: Palette
): Promise<ProcessingResult> {
  const form = new FormData();
  form.append("file", file);
  form.append("clahe", String(params.clahe));
  form.append("bilateral", String(params.bilateral));
  form.append("gaussian", String(params.gaussian));
  form.append("sharpen", String(params.sharpen));
  form.append("palette", palette);

  const res = await fetch(`${API_BASE}/api/process`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`, { cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}
