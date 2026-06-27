"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  valueDisplay?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, valueDisplay, ...props }, ref) => (
    <div className="space-y-2">
      {(label || valueDisplay) && (
        <div className="flex items-center justify-between text-xs">
          {label && (
            <span className="text-foreground/70 uppercase tracking-wider">
              {label}
            </span>
          )}
          {valueDisplay && (
            <span className="font-mono text-primary">{valueDisplay}</span>
          )}
        </div>
      )}
      <input
        type="range"
        ref={ref}
        className={cn(
          "w-full h-1.5 rounded-full appearance-none cursor-pointer",
          "bg-white/10 accent-primary",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
          "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary",
          "[&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(0,229,255,0.6)]",
          className
        )}
        {...props}
      />
    </div>
  )
);
Slider.displayName = "Slider";
