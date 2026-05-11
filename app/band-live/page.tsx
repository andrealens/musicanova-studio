"use client";
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  MusicNote,
  Microphone,
  Cylinder,
  Sparkle,
  Wine,
  Coffee,
  Confetti,
  Warehouse,
  PlayCircle,
  CalendarBlank,
} from "@phosphor-icons/react";

const Lightning = dynamic(() => import('@/src/components/Lightning'), { ssr: false });

// --- COMPONENTI UI & ANIMAZIONI ---

const AudioWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const BARS = 48;
    const seeds = Array.from({ length: BARS }, (_, i) => 0.5 + ((i * 137.508) % 100) / 200);
    let t = 0;
    let rafId: number;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const cy = H / 2;
      const gap = W / BARS;
      const barW = 4;

      for (let i = 0; i < BARS; i++) {
        const x = i * gap + gap / 2;
        const h =
          (Math.sin(t * seeds[i] * 3 + i * 0.35) * 0.5 + 0.5) *
          (Math.sin(t * 0.7 + i * 0.2) * 0.3 + 0.7) *
          (H * 0.4) + 4;

        const ratio = i / BARS;
        const r = Math.round(239 * (1 - ratio) + 168 * ratio);
        const g = Math.round(68 * (1 - ratio) + 85 * ratio);
        const b = Math.round(68 * (1 - ratio) + 247 * ratio);
        const alpha = 0.5 + ratio * 0.5;

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.shadowColor = `rgba(${r},${g},${b},0.7)`;
        ctx.shadowBlur = 8;

        const rr = barW / 2;
        ctx.beginPath();
        ctx.roundRect(x - barW / 2, cy - h, barW, h * 2, rr);
        ctx.fill();
      }

      t += 0.025;
      rafId = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-24 mb-8"
    />
  );
};

// FadeIn standard dal basso
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

// Testo Scorrevole (Marquee) per i nomi degli artisti
const ArtistMarquee = ({ names }: { names: string[] }) => {
  return (
    <div className="relative flex overflow-x-hidden py-4 bg-[#111]/50 border-y border-white/5 backdrop-blur-sm">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...names, ...names].map((name, i) => (
          <span key={i} className="mx-8 text-2xl md:text-4xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500 font-mono tracking-tight opacity-50">
            {name} <span className="text-red-500 mx-2">•</span>
          </span>
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none" />
    </div>
  );
};


export default function BandLivePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={containerRef} className="w-full text-white selection:bg-red-900 selection:text-white overflow-hidden">
      
      {/* --- HERO SECTION: VIDEO BACKGROUND --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-[#050505] z-10" />
          {/* VIDEO PLACEHOLDER - Sostituire con video reale della band */}
          <video 
            autoPlay loop muted playsInline 
            className="w-full h-full object-cover opacity-50 scale-105"
            poster="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-guitarist-playing-in-a-concert-with-warm-lights-41857-large.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="absolute inset-0 z-[15] pointer-events-none mix-blend-screen opacity-30">
          <Lightning
            hue={260}
            xOffset={0}
            speed={0.8}
            intensity={1.2}
            size={1}
          />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-20">
          <FadeIn>
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-red-600/20 border border-red-500/30 backdrop-blur-md text-red-400 text-sm font-bold uppercase tracking-widest mb-8 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500" /> On Stage
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white drop-shadow-2xl leading-none">
              LA MUSICA DAL VIVO <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
                È LA NOSTRA SECONDA ANIMA.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
              Non solo una scuola: siamo musicisti attivi, pronti a portare la nostra passione sui palchi, nelle piazze e nei locali.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* --- SEZIONE 1: IL SOUND (Blues & Jazz Fusion) --- */}
      <section className="py-24 px-6 md:px-10 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/4 left-[-20%] w-[600px] h-[600px] bg-red-900/20 blur-[150px] rounded-full pointer-events-none opacity-40" />
        <div className="absolute bottom-1/4 right-[-20%] w-[600px] h-[600px] bg-indigo-900/20 blur-[150px] rounded-full pointer-events-none opacity-40" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <AudioWave />
            <h2 className="text-4xl font-bold mb-8">Radici Profonde, Feeling Autentico.</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Siamo un duo acustico (o trio con batteria) che unisce chitarra, voce e pianoforte in un sound caldo e coinvolgente. 
              La nostra musica nasce dall&apos;incontro tra <span className="text-red-400 font-bold">blues</span> e <span className="text-indigo-400 font-bold">jazz</span>: improvvisazione, feeling, e quella capacità di creare atmosfera che solo chi suona con il cuore riesce a trasmettere.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* --- SEZIONE 2: ON STAGE (Split Screen) --- */}
      <section className="py-24 px-6 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          
          {/* SX: Chitarra & Voce (Blues) */}
          <div className="relative group overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1525201548942-d8732f6617a0?q=80&w=1200" alt="Chitarra Blues" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-red-900/40 to-transparent opacity-90" />
            <div className="absolute bottom-0 left-0 p-10 md:p-16 relative z-10">
              <Microphone
                weight="duotone"
                className="text-red-500 mb-4"
                size={40}
              />
              <h3 className="text-3xl font-bold mb-4 text-red-400 uppercase italic">Chitarra e Voce</h3>
              <p className="text-gray-300 leading-relaxed max-w-md">
                Un sound blues viscerale: groove, slide, fingerpicking e una voce che racconta storie. Il linguaggio dell&apos;anima, suonato con la stessa passione dell&apos;insegnamento.
              </p>
            </div>
          </div>

          {/* DX: Pianoforte (Jazz) */}
          <div className="relative group overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=1200" alt="Piano Jazz" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-indigo-900/40 to-transparent opacity-90" />
            <div className="absolute bottom-0 left-0 p-10 md:p-16 relative z-10">
              <MusicNote
                weight="duotone"
                className="text-indigo-500 mb-4"
                size={40}
              />
              <h3 className="text-3xl font-bold mb-4 text-indigo-400 uppercase italic">Pianoforte</h3>
              <p className="text-gray-300 leading-relaxed max-w-md">
                Una formazione jazz solida: armonie ricercate e tocco raffinato. Dialoga con la chitarra, crea tensioni e apre spazi per l&apos;improvvisazione.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- SEZIONE 3: LE PROPOSTE LIVE (Cards) --- */}
      <section className="py-32 px-6 md:px-10 max-w-7xl mx-auto bg-[#080808] rounded-[3rem] my-24 relative overflow-hidden border border-white/5">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
        
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">La Nostra Proposta Live</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Adattiamo il repertorio e l&apos;energia al momento e al pubblico. Non siamo una cover band meccanica: sentiamo quello che suoniamo.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          
          {/* CARD 1: DUO ACUSTICO */}
          <FadeIn>
            <div className="bg-[#111] rounded-3xl overflow-hidden border border-white/10 group hover:border-indigo-500/50 transition-all h-full flex flex-col">
              <div className="h-64 relative overflow-hidden">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200" alt="Duo Piano e Chitarra Live" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-indigo-900/30 mix-blend-multiply" />
                 <div className="absolute bottom-6 left-6 bg-indigo-600 py-1 px-3 rounded text-xs font-bold uppercase">Intimo & Versatile</div>
              </div>
              <div className="p-10 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Wine weight="duotone" className="text-indigo-400" size={24} />{" "}
                    Duo Acustico
                  </h3>
                  <p className="text-gray-400 text-sm mb-8">Chitarra, Voce e Piano. La formula perfetta per atmosfere rilassate ed eleganti.</p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3 text-gray-300"><Coffee weight="duotone" size={18} className="text-indigo-500 mt-1 shrink-0"/> Locali, wine bar e dehors estivi.</li>
                    <li className="flex items-start gap-3 text-gray-300"><Sparkle weight="duotone" size={18} className="text-indigo-500 mt-1 shrink-0"/> Eventi privati, cene aziendali, matrimoni.</li>
                    <li className="flex items-start gap-3 text-gray-300"><MusicNote size={18} className="text-indigo-500 mt-1 shrink-0"/> Aperitivi musicali con classe.</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* CARD 2: TRIO CON BATTERIA */}
          <FadeIn delay={0.2}>
            <div className="bg-[#111] rounded-3xl overflow-hidden border border-white/10 group hover:border-red-500/50 transition-all h-full flex flex-col">
              <div className="h-64 relative overflow-hidden">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src="https://images.unsplash.com/photo-1760024101626-d6d5709aad3d?q=80&w=1200" alt="Luci palco concerto live" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-red-900/30 mix-blend-multiply" />
                 <div className="absolute bottom-6 left-6 bg-red-600 py-1 px-3 rounded text-xs font-bold uppercase">Energia & Dinamica</div>
              </div>
              <div className="p-10 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Cylinder weight="duotone" className="text-red-400" size={24} />{" "}
                    Trio (con Batteria)
                  </h3>
                  <p className="text-gray-400 text-sm mb-8">Quando serve più spinta. La batteria completa il sound e apre nuove possibilità.</p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3 text-gray-300"><Warehouse weight="duotone" size={18} className="text-red-500 mt-1 shrink-0"/> Concerti su palchi, festival e rassegne.</li>
                    <li className="flex items-start gap-3 text-gray-300"><Confetti weight="duotone" size={18} className="text-red-500 mt-1 shrink-0"/> Feste di piazza, coinvolgimento ritmato.</li>
                    <li className="flex items-start gap-3 text-gray-300"><Microphone size={18} className="text-red-500 mt-1 shrink-0"/> Jazz club, blues bar e live venue.</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* --- SEZIONE 4: ATMOSFERA & REPERTORIO --- */}
      <section className="py-24 relative overflow-hidden">
        <ArtistMarquee names={["BB King", "Bill Evans", "Stevie Ray Vaughan", "Keith Jarrett", "Eric Clapton", "Chet Baker", "Robert Johnson", "Thelonious Monk"]} />
        
        <div className="max-w-4xl mx-auto px-6 text-center mt-16 relative z-10">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8">Ogni concerto è un viaggio.</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Il repertorio spazia tra blues classico, jazz standard e brani d&apos;autore riarrangiati. 
              Partiamo da brani amati, ma lasciamo sempre spazio all&apos;improvvisazione e a quei momenti magici che nascono solo dal vivo.
            </p>
            <p className="text-gray-400 italic">
              &quot;Intima e raccolta, energica e coinvolgente, sofisticata o spontanea: sappiamo creare l&apos;atmosfera giusta.&quot;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* --- SEZIONE 5: VIDEO SHOWCASE & STORY --- */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <div className="relative group cursor-pointer rounded-[3rem] overflow-hidden border border-red-500/20 shadow-2xl shadow-red-900/20">
            <div className="aspect-video relative overflow-hidden">
              {!isVideoPlaying ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    alt="Live Video Placeholder"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <button
                    type="button"
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center w-full h-full"
                    aria-label="Riproduci video"
                  >
                    <div className="w-24 h-24 rounded-full bg-red-600/80 backdrop-blur-md flex items-center justify-center border-2 border-red-400 group-hover:scale-110 transition-transform shadow-lg shadow-red-600/50">
                      <PlayCircle weight="fill" className="text-white w-12 h-12 fill-white" />
                    </div>
                  </button>
                  <div className="absolute bottom-8 left-8 pointer-events-none">
                    <p className="text-red-400 font-mono uppercase text-sm mb-2">Live Session</p>
                    <h3 className="text-2xl font-bold text-white">Guarda l&apos;energia dal vivo</h3>
                  </div>
                </>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/lk2urrMQXy4?autoplay=1&rel=0"
                  title="MusicaNova Live Session"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
           <h2 className="text-4xl font-bold mb-6">Due musicisti, <br/>una storia condivisa.</h2>
           <p className="text-gray-300 text-lg leading-relaxed mb-8">
             Suonare insieme non è solo un lavoro: è il modo in cui condividiamo la nostra passione anche fuori dalla sala prove. 
              La musica dal vivo è l&apos;altra faccia della nostra identità: se in sala prove trasmettiamo tecnica, sul palco trasmettiamo emozione pura.
           </p>
           <div className="flex items-center gap-4 text-gray-400">
             <div className="w-12 h-1 px-2 bg-gradient-to-r from-red-500 to-indigo-500 rounded-full" />
             <p className="italic font-medium text-white">Insegnare e suonare: due facce della stessa passione.</p>
           </div>
        </FadeIn>
      </section>

      {/* --- SEZIONE: I MUSICISTI --- */}
      <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Francesco */}
          <FadeIn>
            <div className="group bg-[#111] rounded-[3rem] overflow-hidden border border-white/10 hover:border-red-500/40 transition-all duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/home_gallery/22.webp"
                  alt="Francesco Morreale"
                  fill
                  className="object-cover object-[center_30%] grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="text-red-500 font-mono text-xs uppercase tracking-widest mb-2 block">Chitarra & Voce</span>
                  <h3 className="text-2xl font-bold text-white">Francesco Morreale</h3>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Claudio */}
          <FadeIn delay={0.15}>
            <div className="group bg-[#111] rounded-[3rem] overflow-hidden border border-white/10 hover:border-indigo-500/40 transition-all duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/home_gallery/58.webp"
                  alt="Claudio Bernardi"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="text-indigo-400 font-mono text-xs uppercase tracking-widest mb-2 block">Pianoforte</span>
                  <h3 className="text-2xl font-bold text-white">Claudio Bernardi</h3>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* --- SEZIONE 6: BOOKING CTA (Footer Specifico) --- */}
      <section id="booking" className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-[#050505] to-[#110202]">
         {/* Stage Light Effect */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />
         
         <div className="max-w-4xl mx-auto text-center relative z-10">
           <FadeIn>
             <Microphone
                weight="duotone"
                size={48}
                className="text-red-500 mx-auto mb-6"
              />
             <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Vuoi la nostra musica <br/> al tuo evento?</h2>
             <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto">
               Organizzi un matrimonio, una festa privata o cerchi una band per il tuo locale? 
              Scrivici: costruiremo insieme la scaletta perfetta per l&apos;occasione.
             </p>

             <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
               <Link
                 href="/contatti?interesse=band"
                 className="px-10 py-5 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all shadow-[0_0_40px_rgba(220,38,38,0.4)] flex items-center justify-center gap-3 hover:scale-105"
               >
                 <CalendarBlank size={20} /> Contattaci per un Ingaggio
               </Link>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left md:text-center border-t border-white/10 pt-12">
               <div>
                 <h4 className="font-bold text-white mb-2 uppercase text-sm tracking-widest">Location</h4>
                 <p className="text-gray-400">Ponticella, San Lazzaro (BO) <br/> Disponibili in trasferta.</p>
               </div>
               <div>
                 <h4 className="font-bold text-white mb-2 uppercase text-sm tracking-widest">Email Booking</h4>
                 <p className="text-red-400 font-medium">[Inserisci Email Qui]</p>
               </div>
               <div>
                 <h4 className="font-bold text-white mb-2 uppercase text-sm tracking-widest">Telefono</h4>
                 <p className="text-red-400 font-medium">[Inserisci Telefono Qui]</p>
               </div>
             </div>

           </FadeIn>
         </div>
      </section>

    </div>
  );
}