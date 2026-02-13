"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 w-full flex justify-center z-[100] px-4 pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="pointer-events-auto flex items-center gap-8 px-8 py-4 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl"
      >
        {/* LOGO - Porta sempre alla Home */}
        <Link href="/" className="text-white font-bold tracking-tighter text-xl group">
          MN<span className="text-indigo-500 group-hover:text-white transition-colors">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          
          {/* LINK 1: La Scuola -> Nuova Pagina */}
          <Link href="/la-scuola" className="hover:text-white transition-colors">
            La Scuola
          </Link>
          
          {/* LINK 2: Band & Live -> Nuova Pagina */}
          <Link href="/band-live" className="hover:text-white transition-colors">
            Band & Live
          </Link>
          
          {/* LINK 3: Chi Siamo -> Nuova Pagina */}
          <Link href="/chi-siamo" className="hover:text-white transition-colors">
            Chi Siamo
          </Link>

        </div>

        {/* CTA BUTTON: Porta al modulo contatti nel Footer (che è presente in tutte le pagine) */}
        <Link 
          href="/#contatti" 
          className="bg-indigo-600 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-indigo-500 hover:scale-105 transition-all shadow-lg shadow-indigo-600/20"
        >
          Prova
        </Link>
      </motion.nav>
    </div>
  );
}