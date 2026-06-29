"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const Spline = dynamic(
  () => import("@splinetool/react-spline"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border border-cyan-400/30 animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
        </div>
      </div>
    ),
  }
);

const SPLINE_SCENE =
  "https://prod.spline.design/kZDDjO5HubA71Sv0/scene.splinecode";

export default function SplineScene() {
  const [loaded, setLoaded] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const rotateY = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x =
        (e.clientX / window.innerWidth - 0.5) * 15;

      const y =
        -(e.clientY / window.innerHeight - 0.5) * 15;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className="relative w-full h-[420px] md:h-[520px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.12)_0%,transparent_70%)] pointer-events-none" />

      {!loaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-cyan-400 text-sm font-mono animate-pulse">
            Initializing 3D Sensor Core...
          </div>
        </div>
      )}
      <div className="w-full h-full">
        <Spline
          scene={SPLINE_SCENE}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </motion.div>
  );
}