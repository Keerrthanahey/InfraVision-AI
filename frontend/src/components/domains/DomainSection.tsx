"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  Shield,
  Car,
  AlertTriangle,
  Satellite,
  Search,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/layout/AnimatedSection";

const domains: { icon: LucideIcon; title: string; desc: string; color: string }[] = [
  {
    icon: Shield,
    title: "Defense & Surveillance",
    desc: "Night-time border monitoring and threat detection with enhanced IR clarity.",
    color: "from-cyan-500/20 to-blue-600/10",
  },
  {
    icon: Car,
    title: "Autonomous Vehicles",
    desc: "Thermal perception for ADAS systems in fog, rain, and zero-visibility conditions.",
    color: "from-purple-500/20 to-violet-600/10",
  },
  {
    icon: AlertTriangle,
    title: "Disaster Management",
    desc: "Rapid assessment of flood, fire, and earthquake zones via satellite IR feeds.",
    color: "from-orange-500/20 to-red-600/10",
  },
  {
    icon: Satellite,
    title: "Remote Sensing",
    desc: "ISRO-compatible pipeline for LEO satellite infrared data interpretation.",
    color: "from-cyan-500/20 to-teal-600/10",
  },
  {
    icon: Search,
    title: "Search & Rescue",
    desc: "Human heat signature detection in wilderness and urban collapse scenarios.",
    color: "from-emerald-500/20 to-green-600/10",
  },
  {
    icon: HeartPulse,
    title: "Medical Thermography",
    desc: "Clinical-grade thermal mapping with semantic colorization for diagnostics.",
    color: "from-pink-500/20 to-rose-600/10",
  },
];

function DomainCard({
  icon: Icon,
  title,
  desc,
  color,
}: (typeof domains)[0]) {
  return (
    <Tilt
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      perspective={1000}
      scale={1.02}
      transitionSpeed={800}
      glareEnable
      glareMaxOpacity={0.15}
      glareColor="#00E5FF"
      className="h-full"
    >
      <div
        className={`glass rounded-2xl p-6 h-full relative overflow-hidden group hover:border-primary/40 transition-all duration-500 bg-gradient-to-br ${color}`}
        style={{ perspective: "1000px" }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
        <motion.div
          className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-4 animate-float"
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <Icon className="h-6 w-6 text-primary" />
        </motion.div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-foreground/60 leading-relaxed">{desc}</p>
        <div className="mt-4 h-px w-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Tilt>
  );
}

export function DomainSection() {
  return (
    <AnimatedSection id="domains" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-3">
            Application Domains
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mission-Critical <span className="text-gradient">Use Cases</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            From defense surveillance to disaster response — InfraVision AI
            transforms infrared data across every operational domain.
          </p>
        </div>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((d) => (
            <StaggerItem key={d.title}>
              <DomainCard {...d} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
