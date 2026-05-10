"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Heart,
  Users,
  Sparkle,
  Brain,
  Eye,
  Hand,
  GraduationCap,
  House,
  ArrowRight,
} from "@phosphor-icons/react";

const FadeIn = ({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode,
  delay?: number,
  className?: string
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

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

      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-[#050505] z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
              DOVE LA MUSICA <br />
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

      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <FadeIn>
              <h2 className="text-4xl font-bold mb-6">Empatia, Sorrisi e <br /><span className="text-indigo-400">Nessun Giudizio.</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Quando entri da noi, dimentica il freddo delle aule scolastiche.
                Qui ci si chiama per nome, si ride e si sperimenta senza paura di sbagliare.
              </p>
              <div className="pl-6 border-l-2 border-indigo-500 italic text-gray-300">
                &quot;Il nostro allievo più grande ha 80 anni e suona con un entusiasmo contagioso.
                Qui non ci sono limiti, solo voglia di emozionarsi.&quot;
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-[#111] p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full group-hover:bg-indigo-500/20 transition-all" />
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Heart
                    weight="duotone"
                    className="text-red-500 fill-red-500/20"
                    size={20}
                  />{" "}
                  Oltre la lezione
                </h3>
                <p className="text-sm text-gray-400">
                  Spesso gli allievi diventano amici. Condividiamo concerti (come Tommy Emmanuel al Duse!)
                  e passioni. La musica si tramanda da cuore a cuore.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="relative h-[600px] w-full bg-[#0A0A0A] rounded-[3rem] overflow-hidden border border-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800"
                className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-1000"
                alt="Lesson Atmosphere"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <Users weight="duotone" size={24} />
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

      <section className="py-24 relative">
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
                Dimentica l&apos;astrazione: qui la musica si tocca.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            <div className="lg:col-span-7 bg-[#081818] border border-[#00ced1]/20 rounded-[3rem] p-10 md:p-14 relative overflow-hidden flex flex-col justify-between">
              <MusigrammaBackground />

              <FadeIn delay={0.2} className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-6">
                  Vedere i suoni, <br /> toccare l&apos;armonia.
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Musigramma è un sistema brevettato che trasforma concetti complessi (scale, accordi) in forme geometriche.
                  Utilizziamo un dispositivo fisico con pioli ed elastici colorati: non studi regole astratte,
                  costruisci fisicamente le relazioni tra le note.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  <span className="px-4 py-2 rounded-lg bg-[#00ced1]/10 text-[#00ced1] border border-[#00ced1]/20 text-sm font-bold">Brevettato EU</span>
                  <span className="px-4 py-2 rounded-lg bg-[#00ced1]/10 text-[#00ced1] border border-[#00ced1]/20 text-sm font-bold">Progetto SUNRAISE</span>
                  <span className="px-4 py-2 rounded-lg bg-[#00ced1]/10 text-[#00ced1] border border-[#00ced1]/20 text-sm font-bold">Inclusivo DSA</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.4} className="relative z-10 mt-auto">
                <Link href="/musigramma" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent border-2 border-[#00ced1] text-[#00ced1] font-bold hover:bg-[#00ced1] hover:text-black transition-all group/btn w-fit">
                  Scopri come funziona
                  <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={20} />
                </Link>
              </FadeIn>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              {[
                { icon: Eye, title: "Apprendimento Visivo", desc: "Vedi le relazioni armoniche nello spazio, riducendo il carico cognitivo." },
                { icon: Hand, title: "Manipolazione Fisica", desc: "Costruisci accordi con le mani. La memoria del gesto consolida la teoria." },
                { icon: Brain, title: "Meno Frustrazione", desc: "Capisci davvero cosa suoni. Più autonomia, più divertimento, zero ansia." }
              ].map((item, i) => (
                <FadeIn key={i} delay={0.3 + (i * 0.1)}>
                  <div className="bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 hover:border-[#00ced1]/50 transition-colors flex items-start gap-4 group h-full">
                    <div className="min-w-[48px] h-12 rounded-xl bg-[#00ced1]/10 flex items-center justify-center text-[#00ced1] group-hover:scale-110 transition-transform">
                      <item.icon size={24} weight="duotone" />
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

      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-mono uppercase tracking-widest text-sm mb-4 block">Dietro le quinte</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              I Volti di <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">MusicaNova</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Attimi di lezione, concerti ed emozioni. Perché la musica è prima di tutto condivisione.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "/scuola_gallery/02.webp",
            "/scuola_gallery/12.webp",
            "/scuola_gallery/27.webp",
            "/scuola_gallery/31.webp",
            "/scuola_gallery/35.webp",
            "/scuola_gallery/45.webp",
          ].map((imgUrl, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div className="group relative h-[350px] rounded-[2.5rem] overflow-hidden bg-[#111] border border-white/5 hover:border-indigo-500/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Image
                  src={imgUrl}
                  alt={`Gallery MusicaNova ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                  quality={75}
                />

                <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold tracking-wider text-xl mb-1">In Studio</p>
                      <p className="text-indigo-300 text-sm flex items-center gap-1">
                      <Sparkle weight="duotone" size={14} /> MusicaNova
                    </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white shadow-xl">
                      <Heart
                        weight="duotone"
                        size={20}
                        className="text-indigo-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-10 max-w-5xl mx-auto">
        <FadeIn>
          <div className="bg-[#111] rounded-[3rem] p-12 text-center border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-red-500 to-[#00ced1]" />

            <GraduationCap
              weight="duotone"
              className="w-16 h-16 text-white mx-auto mb-6 opacity-50"
            />
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
                <House weight="duotone" size={40} className="text-white mb-2" />
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
