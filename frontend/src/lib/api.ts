import { API_BASE } from "./utils";

export type Palette =
  | "ironbow"
  | "rainbow"
  | "hot"
  | "arctic"
  | "grayscale"
  | "custom";

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

const TIMEOUT_MS = 15000;

async function fetchWithTimeout(url: string, options: RequestInit = {}) {
  const controller = new AbortController();

  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return res;
  } finally {
    clearTimeout(timeout);
  }
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

  let res: Response;

  try {
    res = await fetchWithTimeout(`${API_BASE}/api/process`, {
      method: "POST",
      body: form,
    });
  } catch (err: any) {
    throw new Error(
      err?.name === "AbortError"
        ? "Request timeout — backend too slow or not responding"
        : "Network error — backend not reachable"
    );
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Backend error: ${res.status} ${text}`);
  }

  return res.json();
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/health`, {
      cache: "no-store",
    });

    return res.ok;
  } catch {
    return false;
  }
}