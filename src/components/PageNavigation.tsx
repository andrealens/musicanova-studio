"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const pages = [
  { path: '/', label: 'Home' },
  { path: '/la-scuola', label: 'La Scuola' },
  { path: '/corsi/pianoforte', label: 'Pianoforte' },
  { path: '/corsi/chitarra', label: 'Chitarra' },
  { path: '/musigramma', label: 'Musigramma' },
  { path: '/band-live', label: 'Band & Live' },
  { path: '/chi-siamo', label: 'Chi Siamo' },
];

export default function PageNavigation() {
  const pathname = usePathname();
  const currentIndex = pages.findIndex((page) => page.path === pathname);

  if (currentIndex === -1) return null;

  const prevPage = pages[currentIndex - 1];
  const nextPage = pages[currentIndex + 1];

  // Stile della Lente
  const lensClass = `
    fixed top-1/2 -translate-y-1/2 z-50 
    w-12 h-12 hover:w-32 hover:h-32 
    rounded-full 
    bg-white/5 backdrop-blur-[10px] hover:backdrop-blur-[20px] 
    border border-white/10 hover:border-white/30
    flex items-center justify-center 
    transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
    group cursor-pointer overflow-hidden
    shadow-[0_0_20px_rgba(0,0,0,0.5)]
  `;

  return (
    <div className="hidden md:block pointer-events-none">
      
      {/* --- PREV LENS (SINISTRA) --- */}
      {prevPage && (
        <Link href={prevPage.path} className="pointer-events-auto">
          <div className={`${lensClass} left-6`}>
            {/* Contenuto che cambia tra Icona e Testo */}
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Icona (visibile a riposo) */}
              <ArrowLeft className="absolute w-5 h-5 text-white group-hover:opacity-0 group-hover:scale-50 transition-all duration-300" />
              
              {/* Testo (visibile in hover con effetto zoom) */}
              <div className="opacity-0 group-hover:opacity-100 scale-150 group-hover:scale-100 transition-all duration-500 flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Prev</span>
                <span className="text-sm font-bold text-white text-center leading-tight px-2">{prevPage.label}</span>
              </div>

            </div>
            
            {/* Effetto Glow interno */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </Link>
      )}

      {/* --- NEXT LENS (DESTRA) --- */}
      {nextPage && (
        <Link href={nextPage.path} className="pointer-events-auto">
          <div className={`${lensClass} right-6`}>
             <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Icona */}
              <ArrowRight className="absolute w-5 h-5 text-white group-hover:opacity-0 group-hover:scale-50 transition-all duration-300" />
              
              {/* Testo */}
              <div className="opacity-0 group-hover:opacity-100 scale-150 group-hover:scale-100 transition-all duration-500 flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Next</span>
                <span className="text-sm font-bold text-white text-center leading-tight px-2">{nextPage.label}</span>
              </div>

            </div>
            {/* Effetto Glow interno */}
            <div className="absolute inset-0 bg-gradient-to-bl from-[#00ced1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </Link>
      )}

    </div>
  );
}