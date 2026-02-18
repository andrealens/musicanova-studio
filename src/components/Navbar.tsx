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
        {/* LOGO */}
        <Link href="/" className="text-white font-bold tracking-tighter text-xl group">
          MN<span className="text-indigo-500 group-hover:text-white transition-colors">.</span>
        </Link>

        {/* MENU CENTRALE */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          
          <Link href="/la-scuola" className="hover:text-white transition-colors">
            La Scuola
          </Link>
          
          {/* GRUPPO CORSI (Semplificato visivamente) */}
          <div className="flex items-center gap-4 px-4 py-1 rounded-full bg-white/5 border border-white/5">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 cursor-default">Corsi:</span>
            <Link href="/corsi/pianoforte" className="hover:text-white text-gray-300 transition-colors">Pianoforte</Link>
            <span className="text-gray-600">/</span>
            <Link href="/corsi/chitarra" className="hover:text-white text-gray-300 transition-colors">Chitarra</Link>
          </div>
          
          <Link href="/band-live" className="hover:text-white transition-colors">
            Band & Live
          </Link>
          
          <Link href="/chi-siamo" className="hover:text-white transition-colors">
            Chi Siamo
          </Link>

        </div>

        {/* CTA */}
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