"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Globe2 } from "lucide-react";
import { SplineScene } from "./SplineScene";
import { AnimatedStats } from "./AnimatedStats";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col pt-24">
      <div className="flex-1 mx-auto max-w-7xl w-full px-6 grid lg:grid-cols-2 gap-12 items-center py-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-primary mb-6">
            <Zap className="h-3.5 w-3.5" />
            ISRO-Grade Infrared Intelligence Platform
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Next-Gen{" "}
            <span className="text-gradient">Infrared</span>
            <br />
            Enhancement &amp; Colourisation
          </h1>

          <p className="text-lg text-foreground/65 max-w-xl mb-8 leading-relaxed">
            Transform low-visibility IR satellite imagery into high-fidelity,
            colorized intelligence. Powered by deep learning for defense,
            disaster response, and autonomous systems.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-primary text-background font-medium shadow-[0_0_32px_rgba(0,229,255,0.4)] hover:bg-primary/90 transition-all"
            >
              Start Processing
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg glass font-medium hover:border-primary/40 transition-all"
            >
              Explore Features
            </a>
          </div>

          <div className="flex gap-6 text-sm text-foreground/50">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Defense Ready
            </span>
            <span className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-secondary" /> Satellite IR
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl blur-3xl" />
          <SplineScene />
        </motion.div>
      </div>

      <div className="px-6 pb-16">
        <AnimatedStats />
      </div>
    </section>
  );
}
