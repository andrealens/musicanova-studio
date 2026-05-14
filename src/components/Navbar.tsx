"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 1. Animazione di ingresso della Navbar al caricamento della pagina
  useGSAP(() => {
    if (!navRef.current) return;
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: "power2.out"
    });
  }, { scope: navRef, dependencies: [] });

  // 2. Animazione del Menu Mobile
  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        display: "flex"
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        display: "none"
      });
    }
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-6 left-0 w-full flex justify-center z-[100] px-4 pointer-events-none">
        <nav 
          ref={navRef}
          // Modificato md:w-auto in min-[920px]:w-auto
          className="pointer-events-auto w-full min-[920px]:w-auto flex items-center justify-between gap-8 px-6 min-[920px]:px-8 py-4 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl"
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <img 
              src="/logo/musicanova_logo.png" 
              alt="MusicaNova Studio" 
              className="h-16 w-auto"
            />
          </Link>

          {/* MENU CENTRALE (Solo Desktop da 920px in su) */}
          {/* Modificato md:flex in min-[920px]:flex */}
          <div className="hidden min-[920px]:flex items-center gap-6 text-sm font-medium text-gray-400">
            <Link href="/la-scuola" className="hover:text-white transition-colors">La Scuola</Link>
            
            <div className="flex items-center gap-4 px-4 py-1 rounded-full bg-white/5 border border-indigo-500/30">
              <Link href="/corsi" className="text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-white transition-colors">Corsi:</Link>
              <Link href="/corsi/pianoforte" className="hover:text-white text-indigo-400 transition-colors font-semibold">Pianoforte</Link>
              <span className="text-indigo-600">/</span>
              <Link href="/corsi/chitarra" className="hover:text-white text-indigo-400 transition-colors font-semibold">Chitarra</Link>
            </div>
            
            <Link href="/musigramma" className="hover:text-white transition-colors">Musigramma</Link>
            <Link href="/band-live" className="hover:text-white transition-colors">Band & Live</Link>
            <Link href="/chi-siamo" className="hover:text-white transition-colors">Chi Siamo</Link>
            <Link href="/contatti" className="hover:text-white transition-colors">Contatti</Link>
          </div>

          {/* WRAPPER BOTTONI DESTRA */}
          <div className="flex items-center gap-4">
            {/* CTA */}
            <Link 
              href="https://calendly.com/musicanovastudio/lezione-di-prova-gratuita"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-indigo-500 hover:scale-105 transition-all shadow-lg shadow-indigo-600/20"
            >
              Prova
            </Link>

            {/* HAMBURGER BUTTON (Mobile e fino a 919px) */}
            {/* Modificato md:hidden in min-[920px]:hidden */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="min-[920px]:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 z-[101]"
            >
              <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </nav>
      </div>

      {/* MENU MOBILE OVERLAY */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-[90] bg-[#050505]/95 backdrop-blur-md hidden flex-col items-center justify-center gap-8 px-4"
        style={{ transform: "translateY(-100%)", opacity: 0 }}
      >
        <Link href="/la-scuola" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white">La Scuola</Link>
        <Link href="/corsi" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-indigo-400">Corsi</Link>
        <Link href="/corsi/pianoforte" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-indigo-400">Pianoforte</Link>
        <Link href="/corsi/chitarra" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-indigo-400">Chitarra</Link>
        <Link href="/musigramma" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white">Musigramma</Link>
        <Link href="/band-live" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white">Band & Live</Link>
        <Link href="/chi-siamo" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white">Chi Siamo</Link>
        <Link href="/contatti" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-[#00ced1]">Contatti</Link>
      </div>
    </>
  );
}