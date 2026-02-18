"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Music4, Zap, Star } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// IMPORT: Usa questo percorso che funziona con la tua struttura attuale
const PianoScene = dynamic(() => import('../../../src/components/PianoModel'), { 
  ssr: false, 
  loading: () => null 
});

export default function PianofortePage() {
  return (
    <div className="w-full bg-[#050505] text-white overflow-hidden">
      
      {/* --- HERO SECTION IMMERSIVA (3 LIVELLI) --- */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        
        {/* LIVELLO 0: SFONDO TESTO GIGANTE */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none">
          <h1 className="text-[18vw] font-bold text-[#111] tracking-tighter leading-none opacity-50">
            PIANO
          </h1>
        </div>

        {/* LIVELLO 1: MODELLO 3D (Tutto Schermo) */}
        <div className="absolute inset-0 z-10 w-full h-full">
           <PianoScene />
        </div>

        {/* LIVELLO 2: CONTENUTO TESTUALE */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-center pointer-events-none">
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Colonna Testo: pointer-events-auto per cliccare i bottoni */}
            <motion.div 
               initial={{ opacity: 0, x: -50 }} 
               animate={{ opacity: 1, x: 0 }} 
               transition={{ duration: 1 }}
               className="pointer-events-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                 <span className="w-12 h-[2px] bg-indigo-500 shadow-[0_0_10px_#6366f1]"></span>
                 <span className="text-indigo-400 uppercase tracking-widest text-sm font-bold drop-shadow-md">
                   Classico & Moderno
                 </span>
              </div>
              
              <h2 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 drop-shadow-2xl">
                Il Tocco <br/> 
                {/* --- IL GRADIENTE CHE VOLEVI --- */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-600">
                  Perfetto.
                </span>
              </h2>
              
              <p className="text-xl text-gray-200 max-w-md leading-relaxed mb-10 font-light drop-shadow-lg bg-black/30 backdrop-blur-sm p-4 rounded-xl border-l-2 border-indigo-500">
                Dalla tecnica classica all'improvvisazione jazz. Scopri il pianoforte con un approccio su misura per te.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/#contatti" className="group inline-flex items-center gap-4 px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-500 transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-105">
                  <span>Prenota una lezione</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
                <Link href="#dettagli" className="group inline-flex items-center gap-4 px-8 py-4 border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all backdrop-blur-md bg-black/20">
                  <span>Dettagli</span>
                </Link>
              </div>
            </motion.div>

            {/* Spazio vuoto per vedere il piano */}
            <div className="hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* --- DETTAGLI --- */}
      <section id="dettagli" className="relative z-20 py-24 px-6 md:px-10 bg-[#050505] border-t border-white/5">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Tecnica", d: "Postura, agilità e tocco. Le basi solide per ogni genere.", i: Zap },
              { t: "Repertorio", d: "Da Bach ai Coldplay. Suoniamo ciò che ami davvero.", i: Music4 },
              { t: "Creatività", d: "Composizione e improvvisazione fin dalle prime lezioni.", i: Star }
            ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.2 }}
                 viewport={{ once: true }}
                 className="group p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-[#0f0f0f]"
               >
                 <div className="w-14 h-14 rounded-2xl bg-indigo-900/10 flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform">
                    <item.i size={28}/>
                 </div>
                 <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">
                   {item.t}
                 </h3>
                 <p className="text-gray-400 leading-relaxed">{item.d}</p>
               </motion.div>
            ))}
         </div>
      </section>
    </div>
  );
}