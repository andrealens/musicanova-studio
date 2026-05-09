"use client";
import React, { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, MusicNotes, Lightning, Star } from "@phosphor-icons/react";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useIsMobile } from '@/src/hooks/useIsMobile';

const PianoModel = dynamic(() => import('@/src/components/PianoModel'), { ssr: false });

export default function PianofortePage() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full bg-transparent text-white overflow-hidden">
      
      {/* --- HERO SECTION IMMERSIVA (3 LIVELLI) --- */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        {!isMobile && isMounted && (
          <motion.div
            key="piano-canvas-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute inset-0 z-10 pointer-events-auto"
          >
            <Canvas
              key={pathname}
              frameloop="always"
              performance={{ min: 0.5 }}
              gl={{ antialias: true, alpha: true }}
              camera={{ position: [0, 2, 9], fov: 45 }}
            >
              <ambientLight intensity={0.7} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
              <Suspense fallback={null}>
                <PianoModel />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </motion.div>
        )}
        
        {/* LIVELLO 0: SFONDO TESTO GIGANTE */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none">
          <h1 aria-hidden="true" className="text-[18vw] font-bold text-white tracking-tighter leading-none opacity-[0.08]">
            PIANO
          </h1>
        </div>

        {/* LIVELLO 2: CONTENUTO TESTUALE */}
        <div className="relative z-20 pointer-events-none w-full max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-center">
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Colonna Testo: pointer-events-auto per cliccare i bottoni */}
            <motion.div 
               initial={{ opacity: 0, x: -40 }} 
               animate={{ opacity: 1, x: 0 }} 
               transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
               className="pointer-events-auto will-change-transform"
            >
              <div className="flex items-center gap-3 mb-6">
                 <span className="w-12 h-[2px] bg-indigo-500 shadow-[0_0_10px_#6366f1]"></span>
                 <span className="text-indigo-400 uppercase tracking-widest text-sm font-bold drop-shadow-md">
                   Classico & Moderno
                 </span>
              </div>
              
              <h2 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 drop-shadow-2xl">
                Il Tocco <br/> 
                {/* --- IL GRADIENTE CHE VOLEVI --- */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-600">
                  Perfetto.
                </span>
              </h2>
              
              <p className="text-xl text-gray-200 max-w-md leading-relaxed mb-10 font-light drop-shadow-lg bg-black/30 backdrop-blur-sm p-4 rounded-xl border-l-2 border-indigo-500">
                Dalla tecnica classica all&apos;improvvisazione jazz. Scopri il pianoforte con un approccio su misura per te.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/#contatti" className="group inline-flex items-center gap-4 px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-500 transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-105">
                  <span>Prenota una lezione</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
                <Link href="#dettagli" className="group inline-flex items-center gap-4 px-8 py-4 border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all backdrop-blur-md bg-black/20">
                  <span>Dettagli</span>
                </Link>
              </div>
            </motion.div>

            {/* Spazio vuoto per vedere il piano */}
            <div className="hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* --- DETTAGLI --- */}
      <section id="dettagli" className="relative z-20 py-24 px-6 md:px-10 bg-transparent border-t border-white/10">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Tecnica", d: "Postura, agilità e tocco. Le basi solide per ogni genere.", i: Lightning },
              { t: "Repertorio", d: "Da Bach ai Coldplay. Suoniamo ciò che ami davvero.", i: MusicNotes },
              { t: "Creatività", d: "Composizione e improvvisazione fin dalle prime lezioni.", i: Star }
            ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="group p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-white/10"
               >
                 <div className="w-14 h-14 rounded-2xl bg-indigo-900/10 flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform">
                    <item.i size={28} weight="duotone"/>
                 </div>
                 <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">
                   {item.t}
                 </h3>
                 <p className="text-gray-400 leading-relaxed">{item.d}</p>
               </motion.div>
            ))}
         </div>
      </section>

      {/* --- SEZIONE INSEGNANTE: CLAUDIO BERNARDI --- */}
      <section className="relative z-20 py-24 px-6 md:px-10 bg-transparent border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Immagine */}
            <div className="relative group md:order-2 aspect-[4/5] overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <Image
                src="/claudio.jpeg"
                alt="Claudio Bernardi"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true}
              />
            </div>

            {/* Testo */}
            <div className="space-y-6 md:order-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-[2px] bg-indigo-500 shadow-[0_0_10px_#6366f1]"></span>
                <span className="text-indigo-400 uppercase tracking-widest text-sm font-bold">
                  L&apos;Insegnante
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Claudio Bernardi
              </h2>

              <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                <p>
                  Musica ed insegnare la musica, ed uno strumento, come il piano, è un atto d&apos;amore. Ho maturato questa consapevolezza nel corso dei miei tanti anni di esperienza &quot;on the road&quot;, suonando con svariati musicisti, da cui ho appreso molto.
                </p>
                <p>
                  Continuo a studiare, nonostante l&apos;età, e lo farò finché potrò. Spero che la mia esperienza possa dare, attraverso lo studio della musica, ai i miei allievi momenti di gioia sincera.
                </p>
                <p>
                  A tal proposito: non esiste un&apos;età per iniziare lo studio di uno strumento, come spesso si pensa. Ma l&apos;essenziale, la cosa più importante, è il desiderio di entrare in questo meraviglioso mondo.
                </p>
                <p className="text-gray-400 italic">
                  Ho appreso, grazie ai miei maestri, il modo di studiare, la gioia di poter suonare, l&apos;equilibrio e il metodo. Di tutte queste cose ho fatto una sintesi. Questa è, credo, la maniera migliore (cioè l&apos;esperienza, unità alla comprensione di chi hai davanti) per arrivare a una buona relazione maestro/studente che possa far cresce ed innamorare della musica le persone.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}