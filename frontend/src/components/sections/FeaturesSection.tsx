"use client";

import {
  Wand2,
  Palette,
  Scan,
  Layers,
  Download,
  History,
  Mic,
  Camera,
} from "lucide-react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/layout/AnimatedSection";

const features = [
  {
    icon: Wand2,
    title: "AI Enhancement",
    desc: "CLAHE, bilateral filtering, Gaussian denoising, and adaptive sharpening.",
  },
  {
    icon: Palette,
    title: "Thermal Colourisation",
    desc: "12+ palettes including Ironbow, Rainbow, Hot, and Arctic mappings.",
  },
  {
    icon: Scan,
    title: "YOLO Detection",
    desc: "Real-time object detection for humans, vehicles, buildings, and animals.",
  },
  {
    icon: Layers,
    title: "Batch Processing",
    desc: "Process multiple satellite IR frames in a single pipeline run.",
  },
  {
    icon: Download,
    title: "Export & Reports",
    desc: "Download processed images and generate PDF analysis reports.",
  },
  {
    icon: History,
    title: "Processing History",
    desc: "Track all previous runs with metrics and parameter snapshots.",
  },
  {
    icon: Camera,
    title: "Webcam Thermal Sim",
    desc: "Live thermal simulation from webcam feed for rapid prototyping.",
  },
  {
    icon: Mic,
    title: "Voice Guidance",
    desc: "Voice-guided image interpretation for hands-free analysis.",
  },
];

export function FeaturesSection() {
  return (
    <AnimatedSection id="features" className="py-24 px-6 thermal-grid">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-3">
            Platform Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete <span className="text-gradient">AI Stack</span>
          </h2>
        </div>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="glass rounded-xl p-5 h-full hover:border-primary/30 transition-all group">
                <f.icon className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-foreground/55 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
