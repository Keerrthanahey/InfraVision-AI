"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/layout/AnimatedSection";

const metricHistory = [
  { run: "R1", psnr: 24.2, ssim: 0.84, lpips: 0.22, time: 420 },
  { run: "R2", psnr: 26.1, ssim: 0.87, lpips: 0.18, time: 380 },
  { run: "R3", psnr: 27.5, ssim: 0.89, lpips: 0.15, time: 350 },
  { run: "R4", psnr: 28.4, ssim: 0.91, lpips: 0.12, time: 342 },
  { run: "R5", psnr: 29.1, ssim: 0.93, lpips: 0.09, time: 310 },
];

const summary = [
  { label: "PSNR", value: "29.1 dB", desc: "Peak Signal-to-Noise Ratio" },
  { label: "SSIM", value: "0.93", desc: "Structural Similarity Index" },
  { label: "LPIPS", value: "0.09", desc: "Learned Perceptual Image Patch Similarity" },
  { label: "Processing", value: "310 ms", desc: "End-to-end pipeline latency" },
];

export function AnalyticsSection() {
  return (
    <AnimatedSection className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-3">
            Quality Analytics
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Performance <span className="text-gradient">Metrics</span>
          </h2>
        </div>

        <StaggerContainer className="grid md:grid-cols-4 gap-4 mb-12">
          {summary.map((s) => (
            <StaggerItem key={s.label}>
              <div className="glass rounded-xl p-5 text-center hover:border-primary/30 transition-colors">
                <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">
                  {s.label}
                </p>
                <p className="text-2xl font-bold text-gradient font-mono mb-1">
                  {s.value}
                </p>
                <p className="text-xs text-foreground/40">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-semibold mb-4 text-foreground/70">
              PSNR & SSIM Trend
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={metricHistory}>
                <defs>
                  <linearGradient id="psnrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="run" stroke="#ffffff30" fontSize={12} />
                <YAxis stroke="#ffffff30" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(0,229,255,0.2)",
                    borderRadius: 8,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="psnr"
                  stroke="#00E5FF"
                  fill="url(#psnrGrad)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="ssim"
                  stroke="#7C3AED"
                  fill="none"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-semibold mb-4 text-foreground/70">
              Processing Time (ms)
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={metricHistory}>
                <XAxis dataKey="run" stroke="#ffffff30" fontSize={12} />
                <YAxis stroke="#ffffff30" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(124,58,237,0.2)",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="time" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
