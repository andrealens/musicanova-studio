"use client";
import React, { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ArrowRight, Microphone, Lightning, MusicNotes } from "@phosphor-icons/react";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/src/hooks/useIsMobile';

/*
 * GuitarScene gestisce internamente luci, PresentationControls,
 * Environment e ContactShadows.
 * Non aggiungere nessuno di questi elementi fuori da GuitarScene
 * dentro questo Canvas: si accumulerebbero e distorcerebbero
 * l'illuminazione o causerebbero conflitti tra controls.
 */
const GuitarScene = dynamic(() => import('@/src/components/GuitarModel'), {
  ssr: false,
  loading: () => null,
});

export default function ChitarraPage() {
  const isMobile = useIsMobile();

  /*
   * isMounted: il Canvas viene montato solo dopo l'hydration completa.
   * Questo risolve il caso in cui Next.js App Router naviga client-side
   * verso questa pagina e il DOM node del Canvas non è ancora stabile
   * quando R3F tenta di acquisire il WebGL context.
   */
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full bg-transparent text-white overflow-hidden">

      {/* Sfondo tematico chitarra — z-[3] per stare sopra AnimatedBackground globale (z-[1]) */}
      <div className="fixed inset-0 z-[3] overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-red-900/10 blur-[120px] rounded-full opacity-50 animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-[-10%] left-[-20%] w-[700px] h-[700px] bg-orange-900/10 blur-[120px] rounded-full opacity-40 animate-pulse"
          style={{ animationDuration: '10s' }}
        />
      </div>

      <section className="relative h-screen w-full flex items-center overflow-hidden">

        {/* Canvas montato solo su desktop e solo dopo hydration */}
        {!isMobile && isMounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute inset-0 z-[10] pointer-events-auto"
          >
            <Canvas
              frameloop="always"
              performance={{ min: 0.5 }}
              gl={{ antialias: true, alpha: true }}
              camera={{ position: [0, 0, 16], fov: 40 }}
              style={{ background: 'transparent' }}
            >
              {/*
               * Nessuna luce o Environment qui fuori:
               * GuitarScene li gestisce al suo interno.
               * Aggiungerne altri creerebbe conflitti di illuminazione.
               */}
              <Suspense fallback={null}>
                <GuitarScene />
              </Suspense>
            </Canvas>
          </motion.div>
        )}

        {/* Titolo watermark decorativo */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none">
          <h1
            aria-hidden="true"
            className="text-[18vw] font-bold text-white tracking-tighter leading-none opacity-[0.08]"
          >
            GUITAR
          </h1>
        </div>

        {/* Contenuto Hero */}
        <div className="relative z-[20] pointer-events-none w-full max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="pointer-events-auto will-change-transform"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[2px] bg-red-600 shadow-[0_0_10px_#dc2626]" />
                <span className="text-red-500 uppercase tracking-widest text-sm font-bold drop-shadow-md">
                  Elettrica &amp; Acustica
                </span>
              </div>

              <h2 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 drop-shadow-2xl">
                Alza il <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                  Volume.
                </span>
              </h2>

              <p className="text-xl text-gray-200 max-w-md leading-relaxed mb-10 font-light drop-shadow-lg bg-black/30 backdrop-blur-sm p-4 rounded-xl border-l-2 border-red-500">
                Dal fingerstyle delicato ai riff distorti. Esprimi la tua voce interiore attraverso le sei corde.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#contatti"
                  className="group inline-flex items-center gap-4 px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-500 transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:scale-105"
                >
                  <span>Prenota una lezione</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#programma"
                  className="group inline-flex items-center gap-4 px-8 py-4 border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all backdrop-blur-md bg-black/20"
                >
                  <span>Programma</span>
                </Link>
              </div>
            </motion.div>

            <div className="hidden md:block" />
          </div>
        </div>
      </section>

      {/* SEZIONE PROGRAMMA */}
      <section
        id="programma"
        className="relative z-[20] py-24 px-6 md:px-10 bg-transparent border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              t: "Ritmica Solida",
              d: "Groove, strumming e timing. Impara a portare il tempo come un batterista.",
              icon: Lightning,
            },
            {
              t: "Solista & Espressione",
              d: "Scale, bending, vibrato. L'arte di far 'cantare' lo strumento.",
              icon: Microphone,
            },
            {
              t: "Sound & Gear",
              d: "Come gestire amplificatori, pedali ed effettistica per trovare il tuo suono.",
              icon: MusicNotes,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="group p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-red-500/30 transition-all hover:bg-white/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-900/10 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <item.icon size={28} weight="duotone" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-red-400 transition-colors">
                {item.t}
              </h3>
              <p className="text-gray-400 leading-relaxed">{item.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEZIONE INSEGNANTE */}
      <section className="relative z-[20] py-24 px-6 md:px-10 bg-transparent border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative group aspect-[4/5] overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <Image
                src="/francesco.jpeg"
                alt="Francesco Morreale"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-[2px] bg-red-600 shadow-[0_0_10px_#dc2626]" />
                <span className="text-red-500 uppercase tracking-widest text-sm font-bold">
                  L&apos;Insegnante
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Francesco Morreale
              </h2>

              <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                <p>
                  La musica è un potentissimo mezzo di espressione. Mi ha letteralmente salvato. Con la musica possiamo entrare in contatto con il bambino che abbiamo dentro, permettergli di esprimersi, farlo giocare.
                </p>
                <p>
                  La musica salva, è terapeutica. E per me è un piacere e un onore cercare di trasmettere emozioni in musica, imbracciando la chitarra. Che sia suonando davanti ad un pubblico, che sia mentre sto insegnando a qualcuno.
                </p>
                <p>
                  Vedere allievi che suonano i loro primi accordi, un arpeggio, un assolo, vedere la soddisfazione e la gioia nei loro volti, sorridenti, è per me importantissimo, mi fa capire quanto la musica sia importante nella vita di tutti.
                </p>
                <p className="text-gray-400 italic">
                  E mi accorgo di quanto anch&apos;io abbia imparato e impari dai miei allievi, mentre suoniamo e facciamo lezione. Non solo musicalmente, ma anche umanamente. Quindi posso benissimo dire che moltissimi miei allievi sono anche dei cari amici. La musica unisce, in un mondo diviso. La musica è pura, è vita.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}