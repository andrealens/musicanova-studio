"use client";
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkle,
  MusicNote,
  Laptop,
  GraduationCap,
  MapPin,
  Coffee,
} from "@phosphor-icons/react";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import CassetteModel from '../src/components/CassetteModel';
import { MasonryItem } from '../src/components/Masonry';
import { useIsMobile } from '@/src/hooks/useIsMobile';

const Masonry = dynamic(() => import('../src/components/Masonry'), {
  ssr: false,
  loading: () => <div className="w-full h-64 animate-pulse bg-white/5 rounded-2xl" />,
});

const cardStyle = "bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-[3rem] transition-all duration-300";

const ScrollingBlurText = ({
  title,
  description
}: {
  title: string | React.ReactNode,
  description?: React.ReactNode
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="py-32 px-6 max-w-4xl mx-auto text-center flex flex-col items-center gap-10"
    >
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease',
          willChange: 'opacity',
        }}
      >
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-8">
          {title}
        </h2>
        {description && (
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [isMounted]);

  const galleryItems: MasonryItem[] = [
    { id: '08', img: '/home_gallery/08.webp', height: 520 },
    { id: '09', img: '/home_gallery/09.webp', height: 420 },
    { id: '14', img: '/home_gallery/14.webp', height: 560 },
    { id: '15', img: '/home_gallery/15.webp', height: 460 },
    { id: '16', img: '/home_gallery/16.webp', height: 500 },
    { id: '17', img: '/home_gallery/17.webp', height: 440 },
    { id: '18', img: '/home_gallery/18.webp', height: 520 },
    { id: '19', img: '/home_gallery/19.webp', height: 480 },
    { id: '20', img: '/home_gallery/20.webp', height: 560 },
    { id: '22', img: '/home_gallery/22.webp', height: 420 },
    { id: '24', img: '/home_gallery/24.webp', height: 500 },
    { id: '26', img: '/home_gallery/26.webp', height: 460 },
    { id: '41', img: '/home_gallery/41.webp', height: 540 },
    { id: '57', img: '/home_gallery/57.webp', height: 480 },
    { id: '58', img: '/home_gallery/58.webp', height: 520 },
    { id: '60', img: '/home_gallery/60.webp', height: 440 },
    { id: '64', img: '/home_gallery/64.webp', height: 500 },
    { id: '65', img: '/home_gallery/65.webp', height: 560 },
    { id: '72', img: '/home_gallery/72.webp', height: 420 },
    { id: '73', img: '/home_gallery/73.webp', height: 480 },
  ];

  return (
    <div className="w-full bg-transparent text-white selection:bg-red-500 selection:text-white">
      
      {/* --- HERO SECTION (STICKY) --- */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden z-0 will-change-transform">
        {!isMobile && isMounted && (
          <div className="absolute inset-0 z-0 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Canvas
                frameloop="always"
                performance={{ min: 0.5 }}
                camera={{ position: [0, 0, 5], fov: 25 }}
                dpr={[1, 2]}
              >
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
      <div className="relative z-20 bg-transparent will-change-transform">

        <section id="corsi" className="pt-24 pb-16 px-6 md:px-10 max-w-7xl mx-auto pointer-events-auto relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* BOX 1: MUSIGRAMMA */}
            <div className={`md:col-span-8 md:row-span-2 ${cardStyle} p-12 relative overflow-hidden group border-[#00ced1]/20 hover:border-[#00ced1]/60 flex flex-col justify-between min-h-[500px] bg-[#0A0A0A]`}>
               <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkle
                      weight="duotone"
                      className="text-[#00ced1]"
                      size={32}
                    />
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
            <div className={`md:col-span-4 ${cardStyle} p-10 flex flex-col justify-between border-white/10 group hover:border-white/30 bg-[#0A0A0A]`}>
               <GraduationCap
                  weight="duotone"
                  className="text-white mb-6 group-hover:scale-110 transition-transform duration-300"
                  size={32}
                />
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
            <div className={`md:col-span-4 ${cardStyle} p-10 flex flex-col justify-between border-indigo-500/20 group hover:border-indigo-500/50 bg-[#0A0A0A]`}>
               <MusicNote
                  weight="duotone"
                  className="text-indigo-500 mb-6 group-hover:scale-110 transition-transform duration-300"
                  size={32}
                />
               <div>
                 <h4 className="text-2xl font-bold mb-2 uppercase italic text-white">All Ages</h4>
                 <p className="text-gray-400 text-sm">Dai 6 agli 80 anni. La musica non ha età, solo passione.</p>
               </div>
            </div>

            {/* BOX 4: TECH SPECS */}
            <div className={`md:col-span-12 ${cardStyle} p-10 border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#0A0A0A]`}>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[#111] flex items-center justify-center text-white border border-white/10">
                  <Laptop weight="duotone" size={32} />
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
          {isMounted && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1],
              delay: 1.2
            }}
            style={{ willChange: 'transform, opacity' }}
            className={`${cardStyle} p-10 md:p-16 border-amber-500/20 bg-gradient-to-br from-[#0A0A0A] via-[#120a05] to-[#1a1005] relative overflow-hidden group`}
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-70 opacity-40" />

             <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-amber-500 font-bold tracking-widest text-xs md:text-sm uppercase mb-6 flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
                  <MapPin weight="duotone" size={16} /> LA TUA SECONDA CASA A PONTICELLA
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
                  <Coffee
                    weight="duotone"
                    className="text-amber-400"
                    size={20}
                  />
                  <p className="text-sm md:text-base text-gray-200 font-medium tracking-wide">
                    Vieni a conoscerci in studio. Il caffè è sempre pronto.
                  </p>
                </div>
             </div>
          </motion.div>
          )}
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

        <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto relative z-20 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <span className="text-indigo-400 font-mono uppercase tracking-widest text-xs mb-3 block">
              Il nostro Studio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              La nostra <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#00ced1]">casa</span>.
            </h2>
          </motion.div>

          <Masonry
            items={galleryItems}
            animateFrom="bottom"
            stagger={0.04}
            scaleOnHover
            hoverScale={0.97}
            blurToFocus={false}
          />
        </section>

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
                <img
                  src="/home_gallery/63.webp"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  alt="MusicaNova Band Live"
                  decoding="async"
                />
               </div>
             </div>
          </div>
        </section>

      </div>
      </motion.div>
    </div>
  );
}
