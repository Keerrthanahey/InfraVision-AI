"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  { end: 50000, suffix: "+", label: "Images Processed", decimals: 0 },
  { end: 97.8, suffix: "%", label: "Detection Accuracy", decimals: 1 },
  { end: 12, suffix: "+", label: "Thermal Palettes", decimals: 0 },
  { end: 5, suffix: "×", label: "Faster Interpretation", decimals: 0, prefix: "" },
];

function StatItem({
  end,
  suffix,
  label,
  decimals,
  prefix = "",
}: (typeof stats)[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="glass rounded-2xl p-6 text-center hover:border-primary/30 transition-colors group"
      whileHover={{ y: -4 }}
    >
      <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 font-mono">
        {inView ? (
          <>
            {prefix}
            <CountUp end={end} duration={2.5} decimals={decimals} separator="," />
            {suffix}
          </>
        ) : (
          "0"
        )}
      </div>
      <p className="text-sm text-foreground/60 uppercase tracking-wider">
        {label}
      </p>
      <div className="mt-3 h-px w-0 group-hover:w-full mx-auto bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-500" />
    </motion.div>
  );
}

export function AnimatedStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <StatItem {...stat} />
        </motion.div>
      ))}
    </div>
  );
}
