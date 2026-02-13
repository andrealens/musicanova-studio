import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// CORREZIONE IMPORT: Ora puntano alla cartella 'src'
import Navbar from "../src/components/Navbar";
import SmoothScroll from "../src/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MusicaNova Studio",
  description: "Studio musicale e sala prove",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020205] text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden`}
      >
        <SmoothScroll />
        
        {/* SFONDI STATICI (Ottimizzati per performance) */}
        <div className="fixed inset-0 -z-20 bg-[#020205] pointer-events-none" />
        <div className="fixed inset-0 -z-10 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none mix-blend-overlay" />

        <Navbar />
        
        <main className="relative z-10 flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}