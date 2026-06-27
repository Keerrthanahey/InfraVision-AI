"use client";

import { Scan } from "lucide-react";
import type { DetectionResult } from "@/lib/api";

interface Props {
  detections: DetectionResult[];
}

export function ObjectDetectionPanel({ detections }: Props) {
  return (
    <div className="glass rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Scan className="h-4 w-4 text-accent" />
        <h3 className="font-semibold">Object Detection (YOLO)</h3>
      </div>

      {detections.length === 0 ? (
        <p className="text-sm text-foreground/40 text-center py-6">
          Upload an image to run detection
        </p>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {detections.map((d, i) => (
            <div
              key={i}
              className="flex items-center justify-between glass rounded-lg px-3 py-2 text-sm"
            >
              <div>
                <span className="capitalize font-medium text-primary">
                  {d.class}
                </span>
                <span className="text-foreground/40 ml-2 text-xs">
                  [{d.bbox.join(", ")}]
                </span>
              </div>
              <span className="font-mono text-accent">
                {(d.confidence * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="text-xs text-foreground/40 space-y-1 pt-2 border-t border-white/5">
        <p>Classes: Humans · Vehicles · Buildings · Animals</p>
      </div>
    </div>
  );
}
