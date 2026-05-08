"use client";

/**
 * Wrapper Client Component — unico scopo: isolare il dynamic import
 * con ssr:false in un contesto client, così layout.tsx può restare
 * un Server Component puro.
 *
 * Regola Next.js App Router:
 * - `next/dynamic` con `ssr: false` è permesso SOLO nei Client Component
 * - I Server Component non possono usarlo direttamente
 * - Soluzione: un thin wrapper "use client" che fa il dynamic import,
 * importato staticamente dal layout (import statico di un Client
 * Component è perfettamente legale da un Server Component)
 */

import dynamic from "next/dynamic";

const AnimatedBackground = dynamic(
  () => import("./AnimatedBackground"),
  { ssr: false, loading: () => null }
);

export default function AnimatedBackgroundClient() {
  return <AnimatedBackground />;
}
