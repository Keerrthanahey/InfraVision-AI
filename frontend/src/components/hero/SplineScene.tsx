"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border border-primary/30 animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl animate-pulse-glow" />
        </div>
      </div>
    ),
  }
);

const SPLINE_SCENE =
  "https://prod.spline.design/kZDDjO5HubA71Sv0/scene.splinecode";

export function SplineScene() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx * 12);
      mouseY.set((e.clientY - cy) / cy * 12);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  if (failed) {
    return <FallbackGlobe />;
  }

  return (
    <motion.div
      className="relative w-full h-[420px] md:h-[520px] animate-float"
      style={{ rotateY: springX, rotateX: springY }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-primary/60 text-sm font-mono animate-pulse">
            Initializing 3D sensor core...
          </div>
        </div>
      )}
      <Spline
        scene={SPLINE_SCENE}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className="w-full h-full"
      />
    </motion.div>
  );
}

function FallbackGlobe() {
  return (
    <div className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center animate-float">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
        <div className="absolute inset-4 rounded-full border border-secondary/40" />
        <div className="absolute inset-8 rounded-full border border-accent/30" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.15)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/20 blur-2xl animate-pulse-glow" />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-full h-px bg-primary/20 origin-left"
            style={{ transform: `rotate(${i * 30}deg)` }}
          />
        ))}
      </div>
    </div>
  );
}
