"use client";
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, PresentationControls } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Music, Laptop, GraduationCap, MapPin, Coffee 
} from 'lucide-react';
import Link from 'next/link';
import CassetteModel from '../src/components/CassetteModel';
import { useIsMobile } from '@/src/hooks/useIsMobile';

const cardStyle = "bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-[3rem] transition-all duration-300";

// COMPONENTE AGGIORNATO: Ora accetta titolo e descrizione per gestire testi lunghi con eleganza
const ScrollingBlurText = ({ title, description }: { title: string | React.ReactNode, description?: React.ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blur = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [10, 0, 0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div className="py-32 px-6 max-w-4xl mx-auto text-center flex flex-col items-center gap-10 pointer-events-auto relative z-20 bg-transparent">
      <motion.div ref={ref} style={{ filter: useTransform(blur, (v) => `blur(${v}px)`), opacity }}>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-8">
          {title}
        </h2>
        {description && (
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full bg-transparent text-white selection:bg-red-500 selection:text-white">
      
      {/* --- HERO SECTION (STICKY) --- */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden z-0">
        {!isMobile && (
          <div className="absolute inset-0 z-0 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 25 }} dpr={[1, 2]}>
                <ambientLight intensity={1.5} />
                <spotLight position={[10, 10, 10]} intensity={2} angle={0.3} penumbra={1} />
                <Suspense fallback={null}>
                  <PresentationControls
                    global
                    snap
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 3, Math.PI / 3]}
                  >
                    <CassetteModel />
                  </PresentationControls>
                  <Environment preset="city" />
                  <ContactShadows position={[0, -1.8, 0]} opacity={0.25} scale={5} blur={3} />
                </Suspense>
              </Canvas>
            </motion.div>
          </div>
        )}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 blur-[120px] rounded-full opacity-50" />
           <div className="absolute bottom-[-10%] left-[-20%] w-[700px] h-[700px] bg-red-900/10 blur-[120px] rounded-full opacity-40" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pointer-events-none">
          <div className="max-w-xl pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-lg">
                  <span className="text-red-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/> Iscrizioni Aperte
                  </span>
                </div>
                
                {/* --- TITOLO HERO CON GRADIENTE CORRETTO --- */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8 drop-shadow-2xl text-white">
                  MusicaNova: <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-orange-400 to-red-600">
                    la tua scuola
                  </span> <br/> 
                  di Musica.
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
              >
                <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light border-l-4 border-indigo-500 pl-6">
                  Uno spazio creativo dove l&apos;empatia incontra la musica moderna.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
                className="flex flex-wrap gap-4"
              >
                <Link href="#contatti" className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all group shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transform hover:scale-105">
                  Prenota una Prova <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/la-scuola" className="border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/5 backdrop-blur-sm transition-colors">
                  Scopri di più
                </Link>
              </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONTENT COVER --- */}
      <div className="relative z-20 bg-transparent">

        <section id="corsi" className="pt-24 pb-16 px-6 md:px-10 max-w-7xl mx-auto pointer-events-auto relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* BOX 1: MUSIGRAMMA */}
            <div className={`md:col-span-8 md:row-span-2 ${cardStyle} p-12 relative overflow-hidden group border-[#00ced1]/20 hover:border-[#00ced1]/60 flex flex-col justify-between min-h-[500px] bg-transparent`}>
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
                    Un approccio all&apos;armonia ancora in fase sperimentale, ma già <strong>validato scientificamente</strong> (Progetto SUNRAISE). Rendiamo visibile l&apos;invisibile.
                  </p>
               </div>
               
               <div className="flex flex-col gap-4">
                 <Link href="/musigramma" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00ced1]/10 border border-[#00ced1]/30 text-[#00ced1] font-bold uppercase tracking-widest rounded-full hover:bg-[#00ced1]/20 hover:border-[#00ced1]/50 transition-all shadow-lg shadow-[#00ced1]/20 hover:shadow-[#00ced1]/40">
                   Scopri il Metodo <ArrowRight size={20}/>
                 </Link>
                 <Link href="/musigramma" className="inline-flex items-center gap-2 text-[#00ced1] font-bold uppercase tracking-widest hover:translate-x-2 transition-transform text-sm px-5 py-2">
                  Scopri l&apos;innovazione <ArrowRight size={16}/>
                 </Link>
               </div>

               {/* Decorazione Sfondo - Glow fisso */}
               <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#00ced1]/5 blur-[80px] group-hover:bg-[#00ced1]/10 transition-all duration-500 rounded-full pointer-events-none" />

               {/* Nuovo Effetto Pulse (Radar) */}
               <div className="absolute top-12 right-16 hidden md:flex items-center justify-center w-32 h-32 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute w-3 h-3 bg-[#00ced1] rounded-full shadow-[0_0_12px_#00ced1]"></div>
                  <div className="absolute w-full h-full border border-[#00ced1]/50 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute w-16 h-16 border border-[#00ced1]/80 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1.5s' }}></div>
               </div>
            </div>
            
            {/* BOX 2: I CORSI */}
            <div className={`md:col-span-4 ${cardStyle} p-10 flex flex-col justify-between border-white/10 group hover:border-white/30 bg-transparent`}>
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
            <div className={`md:col-span-4 ${cardStyle} p-10 flex flex-col justify-between border-indigo-500/20 group hover:border-indigo-500/50 bg-transparent`}>
               <Music className="text-indigo-500 mb-6 group-hover:scale-110 transition-transform duration-300" size={32} />
               <div>
                 <h4 className="text-2xl font-bold mb-2 uppercase italic text-white">All Ages</h4>
                 <p className="text-gray-400 text-sm">Dai 6 agli 80 anni. La musica non ha età, solo passione.</p>
               </div>
            </div>

            {/* BOX 4: TECH SPECS */}
            <div className={`md:col-span-12 ${cardStyle} p-10 border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 bg-transparent`}>
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

        {/* --- LA TUA SECONDA CASA --- */}
        <section className="py-16 px-6 md:px-10 max-w-5xl mx-auto relative z-20 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`${cardStyle} p-10 md:p-16 border-amber-500/20 relative overflow-hidden group`}
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-70 opacity-40" />

             <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-amber-500 font-bold tracking-widest text-xs md:text-sm uppercase mb-6 flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
                  <MapPin size={16} /> LA TUA SECONDA CASA A PONTICELLA
                </span>
                
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
                  La tua musica, <br className="md:hidden" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                    a due passi da casa.
                  </span>
                </h2>

                <div className="space-y-6 text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">
                  <p>
                    Da oltre 20 anni, MusicaNova è molto più di una scuola di musica a San Lazzaro di Savena. È uno spazio dove bambini, ragazzi e adulti (sì, fino agli 80 anni!) si sentono in famiglia.
                  </p>
                  <p>
                    Dimentica le accademie rigide o la frustrazione del &quot;fai-da-te&quot; solitario davanti allo schermo di un telefono. Noi crediamo profondamente nell&apos;innovazione — lo dimostra la web app esclusiva del nostro Metodo Musigramma — ma sappiamo che la tecnologia funziona davvero solo quando è accompagnata dal <strong className="text-white">calore umano</strong>.
                  </p>
                  <p>
                    Qui troverai <strong className="text-white">Francesco</strong> e <strong className="text-white">Claudio</strong>, pronti a guidarti con un percorso costruito su misura per te. Che sia la tua prima nota assoluta o un ritorno di fiamma con la chitarra o il pianoforte, abbiamo il posto giusto per te.
                  </p>
                </div>

                <div className="mt-12 inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors">
                  <Coffee className="text-amber-400" size={20} />
                  <p className="text-sm md:text-base text-gray-200 font-medium tracking-wide">
                    Vieni a conoscerci in studio. Il caffè è sempre pronto.
                  </p>
                </div>
             </div>
          </motion.div>
        </section>

        {/* --- SCROLLING TEXT: METODO MUSIGRAMMA EXPANDED --- */}
        <ScrollingBlurText 
          title={
            <>
              Siamo orgogliosi di essere tra i primi in Italia ad abbracciare il <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ced1] to-blue-500">Metodo Musigramma</span>.
            </>
          }
          description="Un ecosistema educativo rivoluzionario che rende l&apos;armonia visibile e tangibile. Dimentica i vecchi tomi impolverati: il nostro percorso integra un manuale innovativo ricco di immagini, una web app interattiva e un dispositivo fisico esclusivo. Attraverso geometrie intuitive, trasformiamo concetti astratti in pura comprensione musicale, permettendoti di &apos;toccare&apos; le note prima ancora di suonarle."
        />

        {/* --- LIVE SECTION (SPOSTATA IN FONDO) --- */}
        <section id="live" className="py-12 px-6 md:px-10 max-w-7xl mx-auto mb-20 pointer-events-auto relative z-20 bg-transparent">
          <div className={`${cardStyle} p-12 border-red-900/30 overflow-hidden relative`}>
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src="https://images.unsplash.com/photo-1514320298574-2b9d53b05423?q=80&w=1200" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Live Performance" />
               </div>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
}
