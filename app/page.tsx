"use client";
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Mic2, Sparkles } from 'lucide-react';

// IMPORT DINAMICO (Non tocchiamo più la chitarra!)
const GuitarScene = dynamic(() => import('../src/components/GuitarModel'), { 
  ssr: false, 
  loading: () => <div className="h-full w-full bg-transparent" /> 
});

// STILE BASE CARD
const cardStyle = "bg-[#0A0A0A] border border-white/10 shadow-2xl rounded-[2.5rem] transition-all duration-300";

export default function Home() {
  return (
    <div className="w-full">
      
      {/* SFONDO LUCI (Aggiornato con il Rosso) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Luce Viola in alto a destra */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 blur-[120px] rounded-full opacity-60" />
        {/* NUOVA LUCE ROSSA in basso a sinistra (Richiama la chitarra) */}
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-red-900/20 blur-[120px] rounded-full opacity-60" />
      </div>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen w-full flex items-center overflow-hidden">
        
        {/* LIVELLO 1: CHITARRA (Sfondo Desktop) */}
        <div className="absolute inset-0 z-0 hidden md:block">
           <GuitarScene />
        </div>

        {/* LIVELLO 2: CONTENUTO */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* COLONNA TESTO */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start pointer-events-auto"
            >
              {/* BADGE AGGIORNATO: Rosso "Nuova Stagione" */}
              <div className="inline-block px-4 py-2 rounded-full bg-[#1A1A1A]/80 backdrop-blur-sm border border-red-500/20 mb-6 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                 <span className="text-red-400 font-mono tracking-widest uppercase text-xs font-bold flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
                   Nuova Stagione 2026
                 </span>
              </div>
              
              {/* TITOLO CON SFUMATURA ROSSA */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 text-white drop-shadow-2xl">
                IL TUO STUDIO <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-400 to-indigo-500">
                  PER CREARE.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed drop-shadow-lg bg-black/30 p-2 rounded-lg backdrop-blur-sm lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
                Non solo lezioni. Uno spazio creativo dove il metodo Musigramma™ incontra la produzione moderna.
              </p>

              <div className="flex flex-wrap gap-4">
                {/* BOTTONE PRINCIPALE: Ombra Rossa */}
                <a href="#prenota" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-red-500/20 hover:shadow-red-500/40 flex items-center gap-2">
                  Prenota una Prova <ArrowRight size={18} className="text-red-600"/>
                </a>
                <a href="#corsi" className="px-8 py-4 border border-white/20 bg-[#1A1A1A]/50 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors text-white">
                  Esplora i Corsi
                </a>
              </div>
            </motion.div>

            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* --- STATEMENT --- */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5 bg-[#020205]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
            "La musica non si impara <br className="hidden md:block" /> studiando. Si impara <br className="hidden md:block" /> <span className="text-red-500">facendola.</span>"
          </h2>
        </div>
      </section>

      {/* --- BENTO GRID --- */}
      <section id="corsi" className="py-32 px-6 md:px-10 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">L'Ecosistema</h2>
            <p className="text-gray-400">Tutto quello che serve per la tua crescita.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-indigo-400 hover:text-white transition-colors group">
            Vedi tutto l'orario 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
          
          {/* BOX 1: Metodo (Viola/Indaco - Colore Istituzionale) */}
          <div className={`md:col-span-8 md:row-span-2 ${cardStyle} p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/30`}>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-indigo-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-400 border border-indigo-500/20">
                <Sparkles size={24} />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-4 text-white">Metodo Musigramma™</h3>
              <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
                Il nostro approccio esclusivo. Dimentica la teoria noiosa: qui tocchi l'armonia con mano fin dal primo giorno.
              </p>
            </div>
            <div className="relative z-10 mt-8">
              <button className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-indigo-50 transition-colors">
                Scopri il Metodo
              </button>
            </div>
          </div>

          {/* BOX 2: Band Labs (Bianco/Neutro) */}
          <div className={`md:col-span-4 ${cardStyle} p-8 relative overflow-hidden flex flex-col justify-between hover:border-white/30`}>
             <div className="absolute top-6 right-6 text-white/20"><Users size={32}/></div>
             <div className="mt-8">
               <h3 className="text-2xl font-bold mb-2 text-white">Band Labs</h3>
               <p className="text-gray-400 text-sm">Non suonare da solo. Unisciti a una band e prepara il live.</p>
             </div>
          </div>

          {/* BOX 3: Recording (ROSSO - Richiama il tasto REC) */}
          <div className={`md:col-span-4 ${cardStyle} p-8 relative overflow-hidden flex flex-col justify-between hover:border-red-500/30 group`}>
             {/* Sfumatura rossa leggera sullo sfondo */}
             <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-50" />
             
             <div className="absolute top-6 right-6 text-red-500/50 group-hover:text-red-400 transition-colors"><Mic2 size={32}/></div>
             <div className="mt-8 relative z-10">
               <h3 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
                 Recording Studio
                 <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
               </h3>
               <p className="text-gray-400 text-sm">Dalla tua camera a Spotify. Impara a produrre le tue tracce.</p>
             </div>
          </div>

        </div>
      </section>
      
    </div>
  );
}