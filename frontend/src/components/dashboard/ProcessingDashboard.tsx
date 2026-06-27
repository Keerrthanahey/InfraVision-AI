"use client";

import { useCallback, useRef, useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Move,
  Upload,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EnhancementParams, Palette, ProcessingResult } from "@/lib/api";
import { processImage, checkHealth } from "@/lib/api";
import { EnhancementPanel } from "@/components/ai-modules/EnhancementPanel";
import { ColorisationPanel } from "@/components/ai-modules/ColorisationPanel";
import { ObjectDetectionPanel } from "@/components/ai-modules/ObjectDetectionPanel";
import { AnimatedSection } from "@/components/layout/AnimatedSection";

const defaultParams: EnhancementParams = {
  clahe: 2.0,
  bilateral: 9,
  gaussian: 3,
  sharpen: 1.2,
};

type PanelKey = "original" | "enhanced" | "colorized" | "detection";

function ImagePanel({
  title,
  src,
  zoom,
  pan,
  onPanChange,
  active,
}: {
  title: string;
  src?: string;
  zoom: number;
  pan: { x: number; y: number };
  onPanChange: (pan: { x: number; y: number }) => void;
  active?: boolean;
}) {
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    onPanChange({ x: pan.x + dx, y: pan.y + dy });
  };

  const onMouseUp = () => {
    dragging.current = false;
  };

  return (
    <div
      className={`glass rounded-xl overflow-hidden flex flex-col ${
        active ? "ring-2 ring-primary/50" : ""
      }`}
    >
      <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-foreground/60">
          {title}
        </span>
        <Move className="h-3.5 w-3.5 text-foreground/30" />
      </div>
      <div
        className="relative aspect-video bg-black/40 overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {src ? (
          <img
            src={src}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-100"
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            }}
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-foreground/30 text-sm">
            Awaiting input
          </div>
        )}
      </div>
    </div>
  );
}

export function ProcessingDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [params, setParams] = useState<EnhancementParams>(defaultParams);
  const [palette, setPalette] = useState<Palette>("ironbow");
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [comparePos, setComparePos] = useState(50);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const dashRef = useRef<HTMLDivElement>(null);

  const checkBackend = useCallback(async () => {
    setBackendOnline(await checkHealth());
  }, []);

  const handleUpload = async (f: File) => {
    setFile(f);
    setError(null);
    setLoading(true);
    await checkBackend();

    try {
      const res = await processImage(f, params, palette);
      setResult(res);
    } catch {
      const url = URL.createObjectURL(f);
      setResult({
        original: url,
        enhanced: url,
        colorized: url,
        detection: url,
        detections: [
          { class: "vehicle", confidence: 0.87, bbox: [120, 80, 280, 200] },
          { class: "building", confidence: 0.92, bbox: [300, 40, 520, 260] },
        ],
        metrics: {
          psnr: 28.4,
          ssim: 0.91,
          lpips: 0.12,
          processing_time_ms: 342,
        },
      });
      setError("Backend offline — showing demo preview. Start FastAPI server.");
    } finally {
      setLoading(false);
    }
  };

  const reprocess = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const res = await processImage(file, params, palette);
      setResult(res);
      setError(null);
    } catch {
      setError("Reprocess failed — check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const panels: { key: PanelKey; title: string; src?: string }[] = [
    { key: "original", title: "Original IR", src: result?.original },
    { key: "enhanced", title: "Enhanced", src: result?.enhanced },
    { key: "colorized", title: "Colourised", src: result?.colorized },
    { key: "detection", title: "Object Detection", src: result?.detection },
  ];

  const toggleFullscreen = () => {
    if (!dashRef.current) return;
    if (!document.fullscreenElement) {
      dashRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <AnimatedSection id="demo" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm uppercase tracking-widest mb-3">
            AI Processing Dashboard
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Live <span className="text-gradient">IR Pipeline</span>
          </h2>
          {backendOnline === false && (
            <p className="text-accent text-sm">
              Backend offline — demo mode active
            </p>
          )}
        </div>

        <div ref={dashRef} className="space-y-6">
          <div className="flex flex-wrap gap-3 items-center justify-between glass rounded-xl p-4">
            <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg bg-secondary/80 px-4 py-2 text-sm font-medium text-white hover:bg-secondary transition-all">
              <Upload className="h-4 w-4" />
              Upload IR Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleUpload(f);
                }}
              />
            </label>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setZoom((z) => Math.min(z + 0.25, 4))}
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                aria-label="Fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              {loading && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            {panels.map((p) => (
              <ImagePanel
                key={p.key}
                title={p.title}
                src={p.src}
                zoom={zoom}
                pan={pan}
                onPanChange={setPan}
              />
            ))}
          </div>

          {result && (
            <div className="glass rounded-xl p-4">
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-3">
                Before / After Comparison
              </p>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={result.enhanced}
                  alt="Enhanced"
                  className="absolute inset-0 w-full h-full object-contain"
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - comparePos}% 0 0)` }}
                >
                  <img
                    src={result.original}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={comparePos}
                  onChange={(e) => setComparePos(Number(e.target.value))}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 accent-primary"
                  aria-label="Comparison slider"
                />
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            <EnhancementPanel
              params={params}
              onChange={setParams}
              onApply={reprocess}
            />
            <ColorisationPanel
              palette={palette}
              onChange={setPalette}
              onApply={reprocess}
            />
            <ObjectDetectionPanel detections={result?.detections ?? []} />
          </div>

          {error && (
            <p className="text-center text-sm text-accent/80">{error}</p>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
