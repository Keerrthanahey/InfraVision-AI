"use client";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import type { EnhancementParams } from "@/lib/api";

interface Props {
  params: EnhancementParams;
  onChange: (p: EnhancementParams) => void;
  onApply: () => void;
}

export function EnhancementPanel({ params, onChange, onApply }: Props) {
  return (
    <div className="glass rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="font-semibold">Enhancement</h3>
      </div>

      <Slider
        label="CLAHE Clip Limit"
        valueDisplay={params.clahe.toFixed(1)}
        min={0}
        max={8}
        step={0.1}
        value={params.clahe}
        onChange={(e) =>
          onChange({ ...params, clahe: parseFloat(e.target.value) })
        }
      />
      <Slider
        label="Bilateral Filter"
        valueDisplay={String(params.bilateral)}
        min={0}
        max={15}
        step={1}
        value={params.bilateral}
        onChange={(e) =>
          onChange({ ...params, bilateral: parseInt(e.target.value) })
        }
      />
      <Slider
        label="Gaussian Denoise"
        valueDisplay={String(params.gaussian)}
        min={0}
        max={9}
        step={1}
        value={params.gaussian}
        onChange={(e) =>
          onChange({ ...params, gaussian: parseInt(e.target.value) })
        }
      />
      <Slider
        label="Sharpening"
        valueDisplay={params.sharpen.toFixed(1)}
        min={0}
        max={3}
        step={0.1}
        value={params.sharpen}
        onChange={(e) =>
          onChange({ ...params, sharpen: parseFloat(e.target.value) })
        }
      />

      <Button variant="outline" className="w-full" onClick={onApply}>
        Apply Enhancement
      </Button>
    </div>
  );
}
