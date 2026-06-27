"use client";

import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Palette as PaletteType } from "@/lib/api";

const palettes: { id: PaletteType; label: string; preview: string }[] = [
  { id: "ironbow", label: "Ironbow", preview: "from-purple-900 via-red-500 to-yellow-300" },
  { id: "rainbow", label: "Rainbow", preview: "from-red-500 via-green-400 to-blue-600" },
  { id: "hot", label: "Hot", preview: "from-black via-red-600 to-yellow-200" },
  { id: "arctic", label: "Arctic", preview: "from-indigo-900 via-cyan-400 to-white" },
  { id: "grayscale", label: "Grayscale", preview: "from-black to-white" },
  { id: "custom", label: "Custom", preview: "from-primary via-secondary to-accent" },
];

interface Props {
  palette: PaletteType;
  onChange: (p: PaletteType) => void;
  onApply: () => void;
}

export function ColorisationPanel({ palette, onChange, onApply }: Props) {
  return (
    <div className="glass rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Palette className="h-4 w-4 text-secondary" />
        <h3 className="font-semibold">Colourisation</h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {palettes.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={cn(
              "rounded-lg p-3 text-left text-xs transition-all border",
              palette === p.id
                ? "border-primary bg-primary/10"
                : "border-white/5 hover:border-primary/30"
            )}
          >
            <div
              className={cn(
                "h-4 rounded-full mb-2 bg-gradient-to-r",
                p.preview
              )}
            />
            {p.label}
          </button>
        ))}
      </div>

      <Button variant="outline" className="w-full" onClick={onApply}>
        Apply Palette
      </Button>
    </div>
  );
}
