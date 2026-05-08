import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "../src/components/Navbar";
import SmoothScroll from "../src/components/SmoothScroll";
import Footer from "../src/components/Footer";
import PageNavigation from "../src/components/PageNavigation";

/**
 * Import STATICO del wrapper Client Component.
 * Questo è legale: un Server Component può importare staticamente
 * un Client Component. È il Client Component stesso che poi gestisce
 * internamente il dynamic import con ssr:false.
 *
 * NON usare next/dynamic con ssr:false direttamente qui:
 * layout.tsx è un Server Component e Next.js lo vieta.
 */
import AnimatedBackgroundClient from "../src/components/AnimatedBackgroundClient";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MusicaNova Studio",
  description: "Studio musicale e sala prove",
};

export const viewport: Viewport = {
  themeColor: "#020205",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className="bg-[#020205]">
      <head>
        <link rel="preload" href="/guitar.glb" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/black_piano.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased bg-transparent text-slate-200
          selection:bg-indigo-500/30 overflow-x-hidden
        `}
      >
        <SmoothScroll />

        {/* Layer 1: blob animati — montati solo sul client */}
        <AnimatedBackgroundClient />

        {/* Layer 2: noise texture */}
        <div
          className="fixed inset-0 z-[2] opacity-[0.03] bg-[url('/noise.png')] pointer-events-none mix-blend-overlay"
          aria-hidden="true"
        />

        {/* Layer 50: navigazione */}
        <Navbar />
        <PageNavigation />

        {/* Layer 10: contenuto */}
        <main className="relative z-[10] flex flex-col min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}