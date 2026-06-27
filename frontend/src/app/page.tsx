import { Navbar } from "@/components/layout/Navbar";
import { ParticleBackground } from "@/components/layout/ParticleBackground";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { DomainSection } from "@/components/domains/DomainSection";
import { ProcessingDashboard } from "@/components/dashboard/ProcessingDashboard";
import { AnalyticsSection } from "@/components/analytics/AnalyticsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <SectionDivider variant="cyan" />
      <FeaturesSection />
      <SectionDivider variant="purple" />
      <DomainSection />
      <SectionDivider variant="orange" />
      <ProcessingDashboard />
      <SectionDivider variant="cyan" />
      <AnalyticsSection />
      <SectionDivider variant="purple" />
      <TeamSection />
      <SectionDivider variant="cyan" />
      <ContactSection />

      <footer className="border-t border-white/5 py-8 text-center text-sm text-foreground/40">
        <p>
          &copy; {new Date().getFullYear()} InfraVision AI &mdash; Bharathiya
          Antariksh Hackathon
        </p>
      </footer>
    </main>
  );
}
