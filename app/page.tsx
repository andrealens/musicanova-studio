"use client";
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Mic2, Sparkles, Music, Laptop 
} from 'lucide-react';
import Link from 'next/link';

// Importazione Chitarra 3D con caricamento ottimizzato
const GuitarScene = dynamic(() => import('../src/components/GuitarModel'), { 
  ssr: false, 
  loading: () => <div className="h-full w-full bg-transparent" /> 
});

const cardStyle = "bg-[#0A0A0A] border border-white/10 shadow-2xl rounded-[3rem] transition-all duration-300";

// Componente per il testo che si sfoca scrollando
const ScrollingBlurText = ({ text }: { text: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blur = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [10, 0, 0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div className="py-32 px-6 max-w-5xl mx-auto text-center flex flex-col items-center gap-10">
      <motion.div 
        ref={ref} 
        style={{ filter: useTransform(blur, (v) => `blur(${v}px)`), opacity }} 
      >
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white">
          {text.split("Metodo Musigramma").map((part, i) => (
            <React.Fragment key={i}>
              {part}
              {i === 0 && <span className="text-[#00ced1] drop-shadow-[0_0_20px_rgba(0,206,209,0.5)]">Metodo Musigramma</span>}
            </React.Fragment>
          ))}
        </h2>
      </motion.div>
      
      {/* PULSANTE SCOPRI IL METODO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Link 
          href="/la-scuola"
          className="px-8 py-4 rounded-full border border-[#00ced1] text-[#00ced1] font-bold uppercase tracking-widest hover:bg-[#00ced1] hover:text-black transition-all shadow-[0_0_20px_rgba(0,206,209,0.2)] hover:shadow-[0_0_40px_rgba(0,206,209,0.6)]"
        >
          Scopri il Metodo
        </Link>
      </motion.div>
    </div>
  );
};

export default function Home() {
  return (
    // MAIN CONTAINER
    <div className="w-full bg-[#050505] text-white selection:bg-red-500 selection:text-white">
      
      {/* --- 1. HERO SECTION (STICKY) --- */}
      {/* Questa sezione rimane FERMA (sticky) mentre il resto ci passa sopra */}
      <section className="sticky top-0 h-screen w-full flex items-center overflow-hidden z-0">
        
        {/* SFONDO ATMOSFERICO HERO */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 blur-[120px] rounded-full opacity-50" />
           <div className="absolute bottom-[-10%] left-[-20%] w-[700px] h-[700px] bg-red-900/10 blur-[120px] rounded-full opacity-40" />
        </div>

        {/* 3D GUITAR */}
        <div className="absolute inset-0 z-0 hidden lg:block">
           <GuitarScene />
        </div>
        
        {/* HERO CONTENT */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="max-w-xl pointer-events-auto" // Riattiva il mouse per i bottoni
            >
              <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-lg">
                <span className="text-red-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/> Nuova Stagione
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
                IL TUO STUDIO <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-500 to-[#00ced1]">
                  PER CREARE.
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light">
                Non serve essere "tecnologici" per suonare come dei pro. 
                Uno spazio creativo dove l'empatia incontra la produzione moderna.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contatti" className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all group shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transform hover:scale-105">
                  Prenota una Prova <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/la-scuola" className="border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/5 backdrop-blur-sm transition-colors">
                  Esplora Corsi
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* --- 2. IL CONTENUTO CHE SCORRE SOPRA (THE COVER) --- */}
      {/* z-10 e background solido (ma sfumato) per coprire la chitarra */}
      <div className="relative z-10 bg-[#050505] shadow-[0_-50px_100px_rgba(0,0,0,1)]">
        
        {/* SFUMATURA DI RACCORDO */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#050505] -mt-32 pointer-events-none" />

        {/* --- SEZIONE BENTO GRID --- */}
        <section id="corsi" className="pt-24 pb-32 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* BOX 1: METODO (Verde Petrolio) */}
            <div className={`md:col-span-8 md:row-span-2 ${cardStyle} p-12 relative overflow-hidden group border-[#00ced1]/20 hover:border-[#00ced1]/60`}>
               <Sparkles className="text-[#00ced1] mb-6" size={40} />
               <h3 className="text-5xl font-bold mb-6 italic text-white">Metodo Musigramma™</h3>
               <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                 L'armonia complessa resa intuitiva. Un ecosistema unico per imparare a fare musica, non solo a studiarla sui libri.
               </p>
               {/* Glow effect interno */}
               <div className="absolute bottom-[-20%] right-[-10%] w-80 h-80 bg-[#00ced1]/10 blur-[100px] group-hover:bg-[#00ced1]/20 transition-all duration-500" />
            </div>
            
            {/* BOX 2: RECORDING (Rosso) */}
            <div className={`md:col-span-4 ${cardStyle} p-10 flex flex-col justify-between border-red-500/20 group hover:border-red-500/50 bg-gradient-to-b from-[#0A0A0A] to-[#1a0505]`}>
               <Mic2 className="text-red-500 mb-6 group-hover:scale-110 transition-transform duration-300" size={32} />
               <div>
                 <h4 className="text-2xl font-bold mb-2 uppercase italic text-white">Recording</h4>
                 <p className="text-gray-400 text-sm">Zoom Q8 & Mac Setup. Registra i tuoi progressi in alta definizione.</p>
               </div>
            </div>

            {/* BOX 3: COMMUNITY (Indaco) */}
            <div className={`md:col-span-4 ${cardStyle} p-10 flex flex-col justify-between border-indigo-500/20 group hover:border-indigo-500/50 bg-gradient-to-b from-[#0A0A0A] to-[#0a0a1a]`}>
               <Music className="text-indigo-500 mb-6 group-hover:scale-110 transition-transform duration-300" size={32} />
               <div>
                 <h4 className="text-2xl font-bold mb-2 uppercase italic text-white">All Ages</h4>
                 <p className="text-gray-400 text-sm">Dai 6 agli 80 anni. La musica non ha età, solo passione.</p>
               </div>
            </div>

            {/* --- BOX 4: TECH SPECS (Nuovo) --- */}
            <div className={`md:col-span-12 ${cardStyle} p-10 border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#080808]`}>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[#111] flex items-center justify-center text-white border border-white/10">
                  <Laptop size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-1">Professional Gear</h4>
                  <p className="text-gray-400">Non hai lo strumento? Usa il nostro in studio.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm font-mono text-gray-500 uppercase tracking-widest">
                <span className="border border-white/10 px-4 py-2 rounded-lg bg-[#111]">Zoom Q8 4K</span>
                <span className="border border-white/10 px-4 py-2 rounded-lg bg-[#111]">Mac Environment</span>
                <span className="border border-white/10 px-4 py-2 rounded-lg bg-[#111]">Fender Amps</span>
              </div>
            </div>

          </div>
        </section>

        {/* --- LIVE PERFORMANCE SECTION --- */}
        <section id="live" className="py-12 px-6 md:px-10 max-w-7xl mx-auto">
          <div className={`${cardStyle} p-12 border-red-900/30 bg-gradient-to-br from-[#0A0A0A] via-[#110505] to-[#1A0505] overflow-hidden relative`}>
            {/* Red Glow Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-6">
                   <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                   <span className="text-red-500 font-mono text-xs uppercase tracking-widest">Booking Aperto 2026</span>
                </div>
                <h2 className="text-5xl font-bold mb-6 italic uppercase tracking-tighter text-white">Live Performance</h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Dal Duo Acustico (Piano, Chitarra e Voce) alla Band completa. Portiamo l'energia di MusicaNova Studio ai tuoi eventi, feste private e locali.
                </p>
                <button className="px-10 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all uppercase text-xs tracking-widest shadow-lg shadow-red-900/40 hover:scale-105">
                  Ingaggia la Band
                </button>
              </div>
              
              {/* Foto Live */}
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1501612722927-d1d5d738d026?q=80&w=1200" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt="Live Performance" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white font-bold text-xl uppercase italic">On Stage</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- BLUR TEXT --- */}
        <ScrollingBlurText text="La nostra scuola è all'avanguardia nel cercare nuovi metodi di apprendimento rapidi e duraturi. Per questo possiamo dirci orgogliosi di essere tra le prime scuole in Italia ad abbracciare il Metodo Musigramma per l'apprendimento dell'armonia complessa attraverso un'ecosistema Phygital integrato." />

        {/* --- GALLERY COMPLETA (8 CARD) --- */}
        <section className="py-24 bg-[#050505]">
          <div className="px-6 md:px-10 mb-12 flex justify-between items-end max-w-7xl mx-auto">
            <h3 className="text-2xl font-mono text-gray-500 uppercase tracking-widest">Gallery // Inside MusicaNova</h3>
            <div className="hidden md:flex gap-2 text-gray-600 text-sm">
               <span>← Drag to explore →</span>
            </div>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-12 px-6 md:px-10 no-scrollbar snap-x cursor-grab active:cursor-grabbing">
            {[
              { t: "Studio Vibe", url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04" },
              { t: "Piano Lab", url: "https://images.unsplash.com/photo-1552422535-c45813c61732" },
              { t: "Guitar Hero", url: "https://images.unsplash.com/photo-1519412169826-00c7344e27f8" },
              { t: "Live Soul", url: "https://images.unsplash.com/photo-1514525253361-bee8718a34e1" },
              { t: "Writing", url: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd" },
              { t: "Details", url: "https://images.unsplash.com/photo-1550985543-f47f38aeee65" },
              { t: "Passion", url: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9" },
              { t: "Stage", url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a" }
            ].map((item, i) => (
              <div key={i} className="flex-none w-[280px] md:w-[350px] aspect-[4/5] relative rounded-[2.5rem] overflow-hidden border border-white/5 snap-center group shadow-lg bg-[#0a0a0a]">
                <img 
                  src={`${item.url}?w=600&q=80`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" 
                  alt={item.t} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 border-l-2 border-[#00ced1] pl-4">
                  <p className="text-[#00ced1] font-mono text-xs mb-1">0{i+1}</p>
                  <h4 className="text-white font-bold text-lg uppercase tracking-wider">{item.t}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}