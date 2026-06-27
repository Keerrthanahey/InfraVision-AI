"use client";

import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/layout/AnimatedSection";

export function ContactSection() {
  return (
    <AnimatedSection id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Launch Your <span className="text-gradient">Mission</span>
          </h2>
        </div>

        <form
          className="glass rounded-2xl p-8 space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              aria-label="Name"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              aria-label="Email"
            />
          </div>
          <textarea
            placeholder="Describe your infrared imaging use case..."
            rows={4}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
            aria-label="Message"
          />
          <Button type="submit" className="w-full">
            <Send className="h-4 w-4" />
            Send Mission Brief
          </Button>
        </form>

        <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-foreground/50">
          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            contact@infravision.ai
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-secondary" />
            ISRO HQ, Bengaluru
          </span>
        </div>
      </div>
    </AnimatedSection>
  );
}
