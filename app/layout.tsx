import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// IMPORT CORRETTI
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
        
        {/* SFONDI: Spostati qui per performance e z-index stabili */}
        <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_0%_0%,rgba(109,40,217,0.55),transparent_55%),radial-gradient(circle_at_100%_20%,rgba(245,158,11,0.45),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(15,23,42,0.95),#020617)] opacity-40 pointer-events-none" />
        <div className="fixed inset-0 -z-10 bg-[#020205] pointer-events-none" /> 
        {/* Nota: Se non hai un'immagine noise.png, usa il gradiente CSS precedente, ma un'immagine png statica è molto più leggera per la GPU */}

        <Navbar />
        
        <main className="relative z-10 flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}