"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { Satellite, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#domains", label: "Domains" },
  { href: "#demo", label: "Demo" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-strong border-b border-primary/10 shadow-lg"
          : "bg-transparent border-b border-transparent"
      )}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative">
            <Satellite className="h-8 w-8 text-primary transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 blur-md bg-primary/30 rounded-full" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Infra<span className="text-primary">Vision</span> AI
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/70 hover:text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt=""
              className="h-8 w-8 rounded-full border border-primary/30"
            />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
          <a
            href="#demo"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-background shadow-[0_0_24px_rgba(0,229,255,0.35)] transition-all hover:bg-primary/90"
          >
            Launch AI
          </a>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden glass border-t border-primary/10 px-6 py-4 space-y-3"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#demo"
            className="block w-full rounded-lg bg-primary py-2.5 text-center text-sm font-medium text-background"
            onClick={() => setMobileOpen(false)}
          >
            Launch AI
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
