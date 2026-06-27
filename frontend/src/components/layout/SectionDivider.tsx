"use client";

export function SectionDivider({ variant = "cyan" }: { variant?: "cyan" | "purple" | "orange" }) {
  const colors = {
    cyan: "via-cyan-500/20",
    purple: "via-purple-500/20",
    orange: "via-orange-500/15",
  };

  return (
    <div className="relative w-full h-24 overflow-hidden" aria-hidden>
      <div
        className={`absolute inset-0 bg-gradient-to-b from-transparent ${colors[variant]} to-background`}
      />
      <svg
        className="absolute bottom-0 w-full h-16"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 40 Q360 80 720 40 T1440 40 V80 H0 Z"
          fill="url(#wave-gradient)"
          opacity="0.3"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm" />
    </div>
  );
}
