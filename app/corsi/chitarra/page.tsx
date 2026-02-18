"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mic2, Zap, Music2 } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// --- FIX IMPORT ---
// Questo percorso esce da: chitarra > corsi > app (3 livelli) ed entra in src/components
const GuitarScene = dynamic(() => import('../../../src/components/GuitarModel'), { 
  ssr: false, 
  loading: () => null 
});

export default function ChitarraPage() {
  return (
    <div className="w-full bg-[#050505] text-white overflow-hidden">
      
      {/* --- HERO SECTION IMMERSIVA (LAYERED) --- */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        
        {/* LIVELLO 0: SFONDO TESTO GIGANTE (Dietro a tutto) */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none">
          <h1 className="text-[18vw] font-bold text-[#111] tracking-tighter leading-none opacity-50">
            GUITAR
          </h1>
        </div>

        {/* LIVELLO 1: MODELLO 3D (In mezzo) */}
        {/* Absolute inset-0 permette al 3D di prendersi tutto lo spazio senza rompere il layout */}
        <div className="absolute inset-0 z-10 w-full h-full">
           <GuitarScene />
        </div>

        {/* LIVELLO 2: CONTENUTO TESTUALE (Sopra a tutto) */}
        {/* z-20 per stare sopra alla chitarra. pointer-events-none per lasciar ruotare la chitarra sotto se si clicca a vuoto */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-center pointer-events-none">
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Colonna Testo: Riattiviamo il mouse qui (pointer-events-auto) altrimenti i bottoni non vanno */}
            <motion.div 
               initial={{ opacity: 0, x: -50 }} 
               animate={{ opacity: 1, x: 0 }} 
               transition={{ duration: 1 }}
               className="pointer-events-auto" 
            >
              <div className="flex items-center gap-3 mb-6">
                 <span className="w-12 h-[2px] bg-red-600 shadow-[0_0_10px_#dc2626]"></span>
                 <span className="text-red-500 uppercase tracking-widest text-sm font-bold drop-shadow-md">
                   Elettrica & Acustica
                 </span>
              </div>
              
              <h2 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 drop-shadow-2xl">
                Alza il <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                  Volume.
                </span>
              </h2>
              
              <p className="text-xl text-gray-200 max-w-md leading-relaxed mb-10 font-light drop-shadow-lg bg-black/30 backdrop-blur-sm p-4 rounded-xl border-l-2 border-red-500">
                Dal fingerstyle delicato ai riff distorti. Esprimi la tua voce interiore attraverso le sei corde.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/#contatti" className="group inline-flex items-center gap-4 px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-500 transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:scale-105">
                  <span>Prenota una lezione</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
                <Link href="#programma" className="group inline-flex items-center gap-4 px-8 py-4 border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all backdrop-blur-md bg-black/20">
                  <span>Programma</span>
                </Link>
              </div>
            </motion.div>

            {/* Colonna Destra vuota (spazio per vedere la chitarra 3D) */}
            <div className="hidden md:block"></div>

          </div>
        </div>
      </section>

      {/* --- DETTAGLI / CARDS --- */}
      {/* Z-index 20 e background solido per coprire il 3D quando si scrolla giù */}
      <section id="programma" className="relative z-20 py-24 px-6 md:px-10 bg-[#050505] border-t border-white/5">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                t: "Ritmica Solida", 
                d: "Groove, strumming e timing. Impara a portare il tempo come un batterista.",
                icon: Zap 
              },
              { 
                t: "Solista & Espressione", 
                d: "Scale, bending, vibrato. L'arte di far 'cantare' lo strumento.",
                icon: Mic2 
              },
              { 
                t: "Sound & Gear", 
                d: "Come gestire amplificatori, pedali ed effettistica per trovare il tuo suono.",
                icon: Music2 
              }
            ].map((item, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="group p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-red-500/30 transition-all hover:bg-[#0f0f0f]"
               >
                 <div className="w-14 h-14 rounded-2xl bg-red-900/10 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                    <item.icon size={28} />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 group-hover:text-red-400 transition-colors">
                   {item.t}
                 </h3>
                 <p className="text-gray-400 leading-relaxed">
                   {item.d}
                 </p>
               </motion.div>
            ))}
         </div>
      </section>
    </div>
  );
}