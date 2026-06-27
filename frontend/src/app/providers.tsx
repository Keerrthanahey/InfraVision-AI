"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { MouseGlow } from "@/components/layout/MouseGlow";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <MouseGlow />
      {children}
    </SessionProvider>
  );
}
