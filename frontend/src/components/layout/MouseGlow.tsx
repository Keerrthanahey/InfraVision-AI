"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function MouseGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const addHoverEvents = () => {
      const elements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .cursor-hover'
      );

      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });

      return () => {
        elements.forEach((el) => {
          el.removeEventListener("mouseenter", handleEnter);
          el.removeEventListener("mouseleave", handleLeave);
        });
      };
    };

    const handleEnter = () => setHovering(true);
    const handleLeave = () => setHovering(false);

    window.addEventListener("mousemove", move);

    const cleanupHover = addHoverEvents();

    return () => {
      document.body.style.cursor = "default";
      window.removeEventListener("mousemove", move);
      cleanupHover();
    };
  }, []);

  return (
    <>
      {/* Glow Circle */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{
          x: position.x,
          y: position.y,
          scale: hovering ? 1.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(0,229,255,0.08) 40%, transparent 75%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(2px)",
        }}
      />

      {/* Pointer Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: position.x,
          y: position.y,
          scale: hovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
        }}
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#00E5FF",
          boxShadow:
            "0 0 8px #00E5FF, 0 0 18px #00E5FF, 0 0 28px rgba(0,229,255,0.8)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}