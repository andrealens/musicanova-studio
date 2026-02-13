"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Music, Heart, Users, Sparkles, Brain, 
  Eye, Hand, GraduationCap, Home, ArrowRight 
} from 'lucide-react';

// --- COMPONENTI UI ---

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// Sfondo animato "Geometrico" per Musigramma
const MusigrammaBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M10,50 Q30,20 50,50 T90,50"
          fill="none"
          stroke="#00ced1"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M20,80 Q50,10 80,80"
          fill="none"
          stroke="#00ced1"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
        />
        {/* Nodi */}
        <circle cx="10" cy="50" r="1" fill="#00ced1" />
        <circle cx="50" cy="50" r="1" fill="#00ced1" />
        <circle cx="90" cy="50" r="1" fill="#00ced1" />
        <circle cx="20" cy="80" r="1" fill="#00ced1" />
        <circle cx="80" cy="80" r="1" fill="#00ced1" />
      </svg>
    </div>
  );
};

export default function LaScuola() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={containerRef} className="w-full bg-[#050505] text-white selection:bg-[#00ced1] selection:text-black overflow-hidden">
      
      {/* --- HERO: ATMOSFERA CASA --- */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-[#050505] z-10" />
          {/* Immagine calda/familiare */}
          <img 
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000" 
            alt="MusicaNova Studio Interno" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-20">
          <FadeIn>
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-mono tracking-widest mb-6">
              BENVENUTI A PONTICELLA
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white drop-shadow-2xl">
              DOVE LA MUSICA <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
                DIVENTA CASA.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
              Non una scuola tradizionale, ma uno spazio dove sentirsi accolti.
              Dai bambini curiosi agli adulti che realizzano un sogno.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* --- SEZIONE 1: L'AMBIENTE (Grid Layout) --- */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Testo */}
          <div className="space-y-12">
            <FadeIn>
              <h2 className="text-4xl font-bold mb-6">Empatia, Sorrisi e <br/><span className="text-indigo-400">Nessun Giudizio.</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Quando entri da noi, dimentica il freddo delle aule scolastiche. 
                Qui ci si chiama per nome, si ride e si sperimenta senza paura di sbagliare.
              </p>
              <div className="pl-6 border-l-2 border-indigo-500 italic text-gray-300">
                "Il nostro allievo più grande ha 80 anni e suona con un entusiasmo contagioso. 
                Qui non ci sono limiti, solo voglia di emozionarsi."
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
               <div className="bg-[#111] p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full group-hover:bg-indigo-500/20 transition-all" />
                 <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                   <Heart className="text-red-500 fill-red-500/20" size={20} /> Oltre la lezione
                 </h3>
                 <p className="text-sm text-gray-400">
                   Spesso gli allievi diventano amici. Condividiamo concerti (come Tommy Emmanuel al Duse!) 
                   e passioni. La musica si tramanda da cuore a cuore.
                 </p>
               </div>
            </FadeIn>
          </div>

          {/* Immagine Collage */}
          <FadeIn delay={0.3}>
            <div className="relative h-[600px] w-full bg-[#0A0A0A] rounded-[3rem] overflow-hidden border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-1000"
                alt="Lesson Atmosphere"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Ambiente Familiare</p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Ponticella, BO</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- SEZIONE 2: BOX MUSIGRAMMA (Il Core) --- */}
      <section className="py-24 relative">
        {/* Background Verde Petrolio Sfumato */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#002b2c] to-[#050505] opacity-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-[#00ced1] font-mono uppercase tracking-widest text-sm mb-4 block">Innovazione Didattica</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                IL METODO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ced1] to-white">MUSIGRAMMA</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Rendiamo la teoria musicale visibile, concreta e accessibile. 
                Dimentica l'astrazione: qui la musica si tocca.
              </p>
            </div>
          </FadeIn>

          {/* IL BOX PRINCIPALE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* COLONNA SINISTRA: Spiegazione Visiva */}
            <div className="lg:col-span-7 bg-[#081818] border border-[#00ced1]/20 rounded-[3rem] p-10 md:p-14 relative overflow-hidden group">
               <MusigrammaBackground />
               
               <FadeIn delay={0.2}>
                 <h3 className="text-3xl font-bold text-white mb-6 relative z-10">
                   Vedere i suoni, <br/> toccare l'armonia.
                 </h3>
                 <p className="text-gray-300 text-lg leading-relaxed mb-8 relative z-10">
                   Musigramma è un sistema brevettato che trasforma concetti complessi (scale, accordi) in forme geometriche. 
                   Utilizziamo un dispositivo fisico con pioli ed elastici colorati: non studi regole astratte, 
                   costruisci fisicamente le relazioni tra le note.
                 </p>
                 
                 <div className="flex flex-wrap gap-3 relative z-10">
                   <span className="px-4 py-2 rounded-lg bg-[#00ced1]/10 text-[#00ced1] border border-[#00ced1]/20 text-sm font-bold">Brevettato EU</span>
                   <span className="px-4 py-2 rounded-lg bg-[#00ced1]/10 text-[#00ced1] border border-[#00ced1]/20 text-sm font-bold">Progetto SUNRAISE</span>
                   <span className="px-4 py-2 rounded-lg bg-[#00ced1]/10 text-[#00ced1] border border-[#00ced1]/20 text-sm font-bold">Inclusivo DSA</span>
                 </div>
               </FadeIn>
            </div>

            {/* COLONNA DESTRA: I Benefici (Cards) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
               {[
                 { 
                   icon: Eye, 
                   title: "Apprendimento Visivo", 
                   desc: "Vedi le relazioni armoniche nello spazio, riducendo il carico cognitivo." 
                 },
                 { 
                   icon: Hand, 
                   title: "Manipolazione Fisica", 
                   desc: "Costruisci accordi con le mani. La memoria del gesto consolida la teoria." 
                 },
                 { 
                   icon: Brain, 
                   title: "Meno Frustrazione", 
                   desc: "Capisci davvero cosa suoni. Più autonomia, più divertimento, zero ansia." 
                 }
               ].map((item, i) => (
                 <FadeIn key={i} delay={0.3 + (i * 0.1)}>
                   <div className="bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 hover:border-[#00ced1]/50 transition-colors flex items-start gap-4 group">
                     <div className="w-12 h-12 rounded-xl bg-[#00ced1]/10 flex items-center justify-center text-[#00ced1] group-hover:scale-110 transition-transform">
                       <item.icon size={24} />
                     </div>
                     <div>
                       <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#00ced1] transition-colors">{item.title}</h4>
                       <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                     </div>
                   </div>
                 </FadeIn>
               ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- SEZIONE 3: INFO PRATICHE --- */}
      <section className="py-24 px-6 md:px-10 max-w-5xl mx-auto">
        <FadeIn>
          <div className="bg-[#111] rounded-[3rem] p-12 text-center border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-red-500 to-[#00ced1]" />
             
             <GraduationCap className="w-16 h-16 text-white mx-auto mb-6 opacity-50" />
             <h2 className="text-4xl font-bold mb-8">Come Funziona</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
               <div>
                 <div className="text-4xl font-bold text-white mb-2">4</div>
                 <p className="text-gray-400 uppercase text-sm tracking-widest">Lezioni al Mese</p>
               </div>
               <div>
                 <div className="text-4xl font-bold text-white mb-2">1°</div>
                 <p className="text-[#00ced1] uppercase text-sm tracking-widest font-bold">Lezione Gratuita</p>
               </div>
               <div className="flex flex-col items-center">
                 <Home size={40} className="text-white mb-2" />
                 <p className="text-gray-400 uppercase text-sm tracking-widest">Anche a Domicilio</p>
               </div>
             </div>

             <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
               Prenota la tua Prova <ArrowRight size={20} />
             </button>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}