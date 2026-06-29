"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Satellite,
  ShieldCheck,
  Radar,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { ParticleBackground } from "@/components/layout/ParticleBackground";

const missionTexts = [
  "Enhancing Infrared Imagery...",
  "Detecting Thermal Signatures...",
  "Processing Multi-Spectral Data...",
  "Initializing Mission Control...",
];

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, {
    stiffness: 120,
    damping: 20,
  });

  const rotateY = useSpring(mouseX, {
    stiffness: 120,
    damping: 20,
  });

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % missionTexts.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 25;
      const y = -(e.clientY / window.innerHeight - 0.5) * 25;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouse);

    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-6">

      <ParticleBackground />

      {/* Animated Orbs */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px] animate-pulse" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[140px] animate-pulse" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 max-w-7xl w-full items-center">

        {/* LEFT SIDE */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="hidden lg:block"
        >
          <div className="glass-strong rounded-[32px] p-10 border border-primary/20">

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 6, -6, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
            >
              <Satellite className="h-20 w-20 text-primary mb-8" />
            </motion.div>

            <h1 className="text-5xl font-bold leading-tight">
              Welcome to
              <br />
              <span className="text-gradient">
                InfraVision AI
              </span>
            </h1>

            <p className="mt-6 text-foreground/60 leading-relaxed">
              AI-powered infrared image enhancement and
              satellite intelligence platform built for
              Bharatiya Antariksh Hackathon.
            </p>

            <div className="mt-10 space-y-5">
              {[
                {
                  icon: ShieldCheck,
                  text: "Secure OAuth Authentication",
                },
                {
                  icon: Radar,
                  text: "Real-time Thermal Analytics",
                },
                {
                  icon: Satellite,
                  text: "Satellite-ready AI Processing",
                },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  <span className="text-foreground/80">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 text-primary font-medium h-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={textIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {missionTexts[textIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* LOGIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{
            scale: 1.02,
          }}
          className="max-w-md w-full mx-auto"
        >
          <div className="glass-strong rounded-[32px] border border-primary/20 p-10 shadow-[0_0_60px_rgba(0,229,255,0.08)]">

            <div className="flex items-center gap-3 mb-8">
              <Satellite className="h-8 w-8 text-primary" />

              <h2 className="text-2xl font-bold">
                InfraVision AI
              </h2>
            </div>

            <h3 className="text-3xl font-bold">
              Mission Login
            </h3>

            <p className="text-foreground/50 mt-2 mb-8">
              Authenticate to access the mission dashboard.
            </p>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="group h-14 w-full rounded-2xl bg-white text-black font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09A6.98 6.98 0 015.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 001 12c0 1.77.43 3.45 1.18 4.93z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                    />
                  </svg>

                  Continue with Google

                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </>
              )}
            </button>

            <p className="mt-8 text-center text-xs text-foreground/35">
              Secure OAuth 2.0 • End-to-End Encryption
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
