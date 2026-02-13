"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Music, Heart, Users, Calendar, ArrowRight, Mic2, MapPin } from 'lucide-react';

// Componente per le sezioni di testo che appaiono dal basso
const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function ChiSiamo() {
  const containerRef = useRef(null);
  
  // Parallax per l'immagine Hero
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="w-full bg-[#050505] text-white selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      {/* --- HERO SECTION: ATMOSFERA --- */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Sfondo Parallax */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2000" 
            alt="Piano e Chitarra" 
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1 }}
          >
            <span className="text-indigo-400 font-mono uppercase tracking-widest text-sm mb-4 block">La Nostra Storia</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
              PIÙ CHE UNA SCUOLA.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-red-400">UNA FAMIGLIA.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Dal cuore della tradizione bolognese a un progetto rinnovato. 
              Benvenuti a casa MusicaNova.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CAPITOLO 1: LE RADICI (TIMELINE) --- */}
      <section className="py-24 px-6 md:px-10 max-w-6xl mx-auto relative">
        {/* Linea di connessione verticale */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center relative">
          {/* 2019 Box */}
          <div className="md:text-right">
            <FadeInSection>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-900/20 text-indigo-400 mb-6 border border-indigo-500/20">
                <Calendar size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Le Radici</h2>
              <p className="text-gray-400 leading-relaxed">
                MusicaNova Studio nasce a <span className="text-white font-bold">Ponticella di San Lazzaro</span>. 
                Nel 2019 ho raccolto il testimone dal mio maestro, trasformando "Le Magiche Note" in un progetto con nuova energia.
              </p>
            </FadeInSection>
          </div>

          {/* Foto Radici */}
          <FadeInSection delay={0.2}>
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-700">
               <img src="https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" alt="Chitarra Vintage" />
            </div>
          </FadeInSection>
          
          {/* Foto Duo */}
          <FadeInSection delay={0.2}>
             <div className="aspect-video rounded-[3rem] overflow-hidden border border-white/10 -rotate-3 hover:rotate-0 transition-transform duration-700 order-2 md:order-1">
               <img src="https://images.unsplash.com/photo-1514320298574-2b9d53b05423?w=800" className="w-full h-full object-cover" alt="Duo Musicale" />
             </div>
          </FadeInSection>

          {/* Il Duo Text */}
          <div className="order-1 md:order-2">
             <FadeInSection>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-900/20 text-red-400 mb-6 border border-red-500/20">
                  <Users size={32} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Il Duo</h2>
                <p className="text-gray-400 leading-relaxed">
                  Siamo due musicisti, io alla chitarra e voce, il mio collega al pianoforte. 
                  Ma soprattutto siamo due persone che credono nel potere della musica di creare <span className="text-white italic">connessioni autentiche</span>.
                </p>
             </FadeInSection>
          </div>
        </div>
      </section>

      {/* --- CAPITOLO 2: FILOSOFIA (8 to 80) --- */}
      <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeInSection>
            <Music className="w-20 h-20 text-indigo-500 mx-auto mb-8 opacity-80" />
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Da 8 a 80 Anni.</h2>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12">
              "Il nostro allievo più grande ha proprio 80 anni, ed è una gioia vederlo suonare!"
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { title: "Bambini Curiosi", desc: "Scoprono il ritmo giocando." },
              { title: "Adulti Sognatori", desc: "Realizzano un sogno nel cassetto." },
              { title: "Sempre Giovani", desc: "Nuova dimensione di vita." }
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="p-8 border border-white/5 rounded-3xl bg-[#111] hover:border-indigo-500/30 transition-colors group">
                   <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                   <p className="text-gray-500">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* --- CAPITOLO 3: L'ANEDDOTO (Tommy Emmanuel) --- */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-[#111] to-[#080808] border border-white/10 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-10">
              <Heart size={200} />
           </div>
           
           <FadeInSection>
             <h3 className="text-indigo-400 font-mono uppercase tracking-widest mb-6">Connessioni</h3>
             <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-gray-200 mb-8">
               "L'altra sera sono andato al concerto di <span className="text-white font-bold">Tommy Emmanuel</span> al Teatro Duse con due allievi. 
               Sono orgoglioso di aver fatto scoprire loro questo artista, proprio come il mio maestro lo fece scoprire a me."
             </blockquote>
             <p className="text-gray-500 italic">— È così che la musica si tramanda, da cuore a cuore.</p>
           </FadeInSection>
        </div>
      </section>

      {/* --- CAPITOLO 4: LIVE & ACTION --- */}
      <section className="py-24 bg-gradient-to-b from-[#050505] to-[#1a0505] relative">
         <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-900 to-transparent" />
         
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
               <div className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold uppercase text-xs tracking-widest mb-6">
                 Oltre la didattica
               </div>
               <h2 className="text-5xl font-bold mb-6">MusicaNova Live.</h2>
               <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                 Siamo musicisti attivi. Portiamo la nostra musica in locali, feste private e piazze. 
                 Che sia un duo acustico intimo o una band completa, condividiamo la nostra passione sul palco come in sala prove.
               </p>
               <div className="flex flex-wrap gap-4">
                 <button className="px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all shadow-lg shadow-red-900/40">
                   Ingaggia la Band
                 </button>
                 <button className="px-8 py-4 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-all">
                   Vieni a sentirci
                 </button>
               </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
               <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-red-600/20 blur-[60px] rounded-full group-hover:bg-red-600/30 transition-all duration-500" />
                  <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10">
                     <img src="https://images.unsplash.com/photo-1501612722927-d1d5d738d026?w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Live Concert" />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                     <div className="absolute center inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                           <Mic2 className="text-white w-8 h-8" />
                        </div>
                     </div>
                  </div>
               </div>
            </FadeInSection>
         </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-24 text-center px-6">
         <FadeInSection>
           <h2 className="text-4xl font-bold mb-6">Vieni a trovarci a Ponticella</h2>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
             Ti aspettiamo per una lezione di prova gratuita. Porta la tua curiosità: noi mettiamo la musica, il sorriso e tanta esperienza.
           </p>
           <button className="px-10 py-5 bg-[#00ced1] text-black font-bold rounded-full hover:bg-[#00a8a8] transition-all shadow-[0_0_30px_rgba(0,206,209,0.3)] flex items-center gap-3 mx-auto">
             <MapPin size={20} /> Prenota la tua Prova
           </button>
         </FadeInSection>
      </section>

    </div>
  );
}