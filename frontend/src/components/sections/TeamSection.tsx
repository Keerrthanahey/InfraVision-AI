"use client";

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/layout/AnimatedSection";

const team = [
  {
    name: "Dr. Arjun Mehta",
    role: "Lead AI Researcher",
    focus: "IR-to-RGB Translation",
  },
  {
    name: "Priya Sharma",
    role: "Computer Vision Engineer",
    focus: "YOLO & Object Detection",
  },
  {
    name: "Rahul Nair",
    role: "Satellite Systems Specialist",
    focus: "Remote Sensing Pipeline",
  },
  {
    name: "Ananya Reddy",
    role: "Full-Stack Developer",
    focus: "Platform Architecture",
  },
];

export function TeamSection() {
  return (
    <AnimatedSection id="team" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-3">
            Mission Team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Built for <span className="text-gradient">Bharatiya Antariksh</span>
          </h2>
        </div>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <StaggerItem key={m.name}>
              <div className="glass rounded-2xl p-6 text-center hover:glow-cyan transition-shadow">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 mb-4 flex items-center justify-center text-2xl font-bold text-primary">
                  {m.name.charAt(0)}
                </div>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-sm text-primary/80 mb-1">{m.role}</p>
                <p className="text-xs text-foreground/50">{m.focus}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
