"use client";
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Music, Laptop, GraduationCap 
} from 'lucide-react';
import Link from 'next/link';

// Importazione Chitarra 3D (Percorso aggiornato per la tua struttura)
const GuitarScene = dynamic(() => import('../src/components/GuitarModel'), { 
  ssr: false, 
  loading: () => <div className="h-full w-full bg-transparent" /> 
});

const cardStyle = "bg-[#0A0A0A] border border-white/10 shadow-2xl rounded-[3rem] transition-all duration-300";

const ScrollingBlurText = ({ text }: { text: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blur = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [10, 0, 0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div className="py-32 px-6 max-w-5xl mx-auto text-center flex flex-col items-center gap-10">
      <motion.div ref={ref} style={{ filter: useTransform(blur, (v) => `blur(${v}px)`), opacity }}>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white">
          {text}
        </h2>
      </motion.div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="w-full bg-[#050505] text-white selection:bg-red-500 selection:text-white">
      
      {/* --- HERO SECTION (STICKY) --- */}
      <section className="sticky top-0 h-screen w-full flex items-center overflow-hidden z-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 blur-[120px] rounded-full opacity-50" />
           <div className="absolute bottom-[-10%] left-[-20%] w-[700px] h-[700px] bg-red-900/10 blur-[120px] rounded-full opacity-40" />
        </div>

        <div className="absolute inset-0 z-0 hidden lg:block">
           <GuitarScene />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="max-w-xl pointer-events-auto"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-lg">
                <span className="text-red-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/> Iscrizioni Aperte
                </span>
              </div>
              
              {/* --- TITOLO HERO CON GRADIENTE CORRETTO --- */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8 drop-shadow-2xl text-white">
                MusicaNova: <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-600">
                  la tua scuola
                </span> <br/> 
                di Musica.
              </h1>

              <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light border-l-4 border-indigo-500 pl-6">
                Uno spazio creativo dove l'empatia incontra la musica moderna.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contatti" className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all group shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transform hover:scale-105">
                  Prenota una Prova <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/la-scuola" className="border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/5 backdrop-blur-sm transition-colors">
                  Scopri di più
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONTENT COVER --- */}
      <div className="relative z-10 bg-[#050505] shadow-[0_-50px_100px_rgba(0,0,0,1)]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#050505] -mt-32 pointer-events-none" />

        <section id="corsi" className="pt-24 pb-32 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* BOX 1: MUSIGRAMMA */}
            <div className={`md:col-span-8 md:row-span-2 ${cardStyle} p-12 relative overflow-hidden group border-[#00ced1]/20 hover:border-[#00ced1]/60 flex flex-col justify-between min-h-[500px]`}>
               <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-[#00ced1]" size={32} />
                    <span className="px-3 py-1 rounded-full bg-[#00ced1]/10 text-[#00ced1] text-xs font-bold uppercase tracking-widest border border-[#00ced1]/20">Esclusiva</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 italic text-white">Metodo Musigramma™</h3>
                  <p className="text-xl text-gray-300 max-w-lg leading-relaxed mb-4">
                    Siamo tra le <strong>prime scuole in Italia</strong> ad adottare questo sistema rivoluzionario.
                  </p>
                  <p className="text-gray-400 max-w-lg text-sm leading-relaxed mb-8">
                    Un approccio all'armonia ancora in fase sperimentale, ma già <strong>validato scientificamente</strong> (Progetto SUNRAISE). Rendiamo visibile l'invisibile.
                  </p>
               </div>
               
               <Link href="/musigramma" className="inline-flex items-center gap-2 text-[#00ced1] font-bold uppercase tracking-widest hover:translate-x-2 transition-transform">
                 Scopri l'innovazione <ArrowRight size={20}/>
               </Link>

               {/* Decorazione Sfondo */}
               <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#00ced1]/5 blur-[80px] group-hover:bg-[#00ced1]/10 transition-all duration-500 rounded-full" />
               <div className="absolute top-1/2 right-10 hidden md:block opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                  <svg width="200" height="200" viewBox="0 0 100 100" className="animate-[spin_10s_linear_infinite]">
                    <circle cx="50" cy="50" r="40" stroke="#00ced1" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                    <circle cx="50" cy="50" r="20" stroke="#00ced1" strokeWidth="1" fill="none" />
                  </svg>
               </div>
            </div>
            
            {/* BOX 2: I CORSI */}
            <div className={`md:col-span-4 ${cardStyle} p-10 flex flex-col justify-between border-white/10 group hover:border-white/30 bg-[#0A0A0A]`}>
               <GraduationCap className="text-white mb-6 group-hover:scale-110 transition-transform duration-300" size={32} />
               <div>
                 <h4 className="text-2xl font-bold mb-4 uppercase italic text-white">I Corsi</h4>
                 <div className="flex flex-col gap-3">
                   <Link href="/corsi/pianoforte" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/item">
                      <span className="text-gray-300 group-hover/item:text-white">Pianoforte</span>
                      <ArrowRight size={16} className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all"/>
                   </Link>
                   <Link href="/corsi/chitarra" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/item">
                      <span className="text-gray-300 group-hover/item:text-white">Chitarra</span>
                      <ArrowRight size={16} className="opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all"/>
                   </Link>
                 </div>
               </div>
            </div>

            {/* BOX 3: COMMUNITY */}
            <div className={`md:col-span-4 ${cardStyle} p-10 flex flex-col justify-between border-indigo-500/20 group hover:border-indigo-500/50 bg-gradient-to-b from-[#0A0A0A] to-[#0a0a1a]`}>
               <Music className="text-indigo-500 mb-6 group-hover:scale-110 transition-transform duration-300" size={32} />
               <div>
                 <h4 className="text-2xl font-bold mb-2 uppercase italic text-white">All Ages</h4>
                 <p className="text-gray-400 text-sm">Dai 6 agli 80 anni. La musica non ha età, solo passione.</p>
               </div>
            </div>

            {/* BOX 4: TECH SPECS */}
            <div className={`md:col-span-12 ${cardStyle} p-10 border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#080808]`}>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[#111] flex items-center justify-center text-white border border-white/10">
                  <Laptop size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-1">Strumentazione in Sede</h4>
                  <p className="text-gray-400">Non hai lo strumento? Usa il nostro in studio.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm font-mono text-gray-500 uppercase tracking-widest">
                <span className="border border-white/10 px-4 py-2 rounded-lg bg-[#111]">Pianoforti Pesati</span>
                <span className="border border-white/10 px-4 py-2 rounded-lg bg-[#111]">Ampli Valvolari</span>
                <span className="border border-white/10 px-4 py-2 rounded-lg bg-[#111]">Fender & Gibson</span>
              </div>
            </div>
          </div>
        </section>

        {/* LIVE SECTION */}
        <section id="live" className="py-12 px-6 md:px-10 max-w-7xl mx-auto">
          <div className={`${cardStyle} p-12 border-red-900/30 bg-gradient-to-br from-[#0A0A0A] via-[#110505] to-[#1A0505] overflow-hidden relative`}>
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
               <div>
                 <div className="flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-500 font-mono text-xs uppercase tracking-widest">Musica Live</span>
                 </div>
                 <h2 className="text-5xl font-bold mb-6 italic uppercase tracking-tighter text-white">La Band</h2>
                 <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                   Portiamo la nostra musica dal vivo. Dal duo acustico alla band completa.
                 </p>
                 <Link href="/band-live" className="px-10 py-4 border border-red-600 text-red-500 font-bold rounded-full hover:bg-red-600 hover:text-white transition-all uppercase text-xs tracking-widest">
                   Scopri la Band
                 </Link>
               </div>
               <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                 <img src="https://images.unsplash.com/photo-1514320298574-2b9d53b05423?q=80&w=1200" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Live Performance" />
               </div>
             </div>
          </div>
        </section>

        <ScrollingBlurText text="Siamo orgogliosi di essere tra i primi in Italia ad abbracciare il Metodo Musigramma per l'armonia, un ecosistema educativo rivoluzionario." />
      </div>
    </div>
  );
}