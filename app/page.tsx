"use client";
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion'; // Importa hook per scroll
import { ArrowRight, Users, Mic2, Sparkles } from 'lucide-react';
import { useRef } from 'react';

const GuitarScene = dynamic(() => import('../src/components/GuitarModel'), { 
  ssr: false, 
  loading: () => <div className="h-screen w-full bg-transparent" /> 
});

const glassCardStyle = "bg-[#0A0A0A] border border-white/10 shadow-2xl rounded-[2.5rem] hover:border-indigo-500/30 transition-all duration-300";

export default function Home() {
  // Hook per tracciare lo scroll della pagina
  const { scrollY } = useScroll();
  // Quando scrolli da 0 a 600px, l'opacità va da 1 a 0.
  // La chitarra sparisce gradualmente e non pesa più.
  const guitarOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const guitarY = useTransform(scrollY, [0, 600], [0, 100]); // Leggero effetto parallasse

  return (
    <div className="w-full relative">
      
      {/* --- LIVELLO 0: CHITARRA FIXED (Non scrolla, resta ferma) --- */}
      {/* Usiamo style={{ opacity }} per nasconderla via GPU senza layout thrashing */}
      <motion.div 
        style={{ opacity: guitarOpacity, y: guitarY }}
        className="fixed top-0 right-0 w-full lg:w-[50%] h-screen z-0 pointer-events-none hidden lg:block"
      >
         <GuitarScene />
      </motion.div>

      {/* Versione Mobile della chitarra (Non fixed, scorre normale) */}
      <div className="lg:hidden h-[400px] w-full relative z-0">
         <GuitarScene />
      </div>

      {/* SFONDO GLOBALE */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 blur-[100px] rounded-full opacity-60" />
      </div>

      {/* --- CONTENUTO SCROLLABILE (Z-INDEX SUPERIORE) --- */}
      <main className="relative z-10">

        {/* HERO SECTION */}
        <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 py-20 overflow-hidden">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            
            {/* TESTI */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-[#1A1A1A] border border-white/10 mb-6">
                 <span className="text-indigo-400 font-mono tracking-widest uppercase text-xs font-bold">
                   Nuova Stagione 2026
                 </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 text-white">
                IL TUO STUDIO <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-white">
                  PER CREARE.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
                Non solo lezioni. Uno spazio creativo dove il metodo Musigramma™ incontra la produzione moderna.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#prenota" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-white/10 flex items-center gap-2">
                  Prenota una Prova <ArrowRight size={18} />
                </a>
                <a href="#corsi" className="px-8 py-4 border border-white/20 bg-[#1A1A1A] rounded-full hover:bg-[#252525] transition-colors text-white">
                  Esplora i Corsi
                </a>
              </div>
            </motion.div>

            {/* SPAZIO VUOTO A DESTRA PER LA CHITARRA FIXED */}
            <div className="hidden lg:block h-full w-full"></div>
          </div>
        </section>

        {/* --- STATEMENT SECTION --- */}
        <section className="py-32 px-6 relative border-t border-white/5 bg-[#020205]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              "La musica non si impara <br className="hidden md:block" /> studiando. Si impara <br className="hidden md:block" /> <span className="text-indigo-500">facendola.</span>"
            </h2>
          </div>
        </section>

        {/* --- BENTO GRID --- */}
        <section id="corsi" className="py-32 px-6 md:px-10 relative max-w-7xl mx-auto bg-[#020205]">
           {/* ... (Il resto della Bento Grid rimane identico a prima) ... */}
           {/* Incolla qui il codice della griglia che avevi prima */}
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">L'Ecosistema</h2>
              <p className="text-gray-400">Tutto quello che serve per la tua crescita.</p>
            </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
                <div className={`md:col-span-8 md:row-span-2 ${glassCardStyle} p-10`}>
                    <h3 className="text-4xl font-bold text-white">Metodo Musigramma™</h3>
                    <p className="text-gray-400 mt-4">Il nostro approccio esclusivo.</p>
                </div>
                <div className={`md:col-span-4 ${glassCardStyle} p-8`}>
                    <h3 className="text-2xl font-bold text-white">Band Labs</h3>
                </div>
                <div className={`md:col-span-4 ${glassCardStyle} p-8`}>
                    <h3 className="text-2xl font-bold text-white">Recording Studio</h3>
                </div>
            </div>
        </section>
        
        {/* PRENOTA */}
        <section className="py-20 text-center bg-[#020205]">
            {/* ... codice prenota ... */}
        </section>

      </main>
    </div>
  );
}