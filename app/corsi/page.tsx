"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Comparison, ComparisonItem, ComparisonHandle } from "@/src/components/ComparisonSlider";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import {
  GraduationCap,
  Guitar,
  VinylRecord,
  PianoKeys,
  Heart,
  Users,
  House,
  ArrowRight,
  CheckCircle,
  Star,
  Question,
  Clock,
} from "@phosphor-icons/react";

const GuitarScene = dynamic(() => import("@/src/components/GuitarModel"), { ssr: false });
const PianoModel = dynamic(() => import("@/src/components/PianoModel"), { ssr: false });

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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

const faqItems = [
  {
    q: "Devo avere già uno strumento per iniziare?",
    a: "No. In sede mettiamo a disposizione pianoforti pesati e chitarre. Puoi iniziare subito senza acquistare nulla - lo strumento lo provi prima di comprarlo.",
  },
  {
    q: "A che età si può iniziare?",
    a: "Dai 6 anni in su, senza limite massimo. Il nostro allievo più anziano ha 80 anni e suona con entusiasmo ogni settimana. L'età non è mai un ostacolo.",
  },
  {
    q: "Quanto tempo ci vuole per imparare?",
    a: "Dipende dagli obiettivi. Molti allievi suonano i primi brani già dopo poche settimane. Il percorso è personalizzato: non esiste una tabella di marcia rigida.",
  },
  {
    q: "Offrite corsi per chi ha DSA o difficoltà di apprendimento?",
    a: "Sì. Il Metodo Musigramma che utilizziamo è stato validato scientificamente come strumento inclusivo, ideale per studenti con DSA e BES. La musica è davvero per tutti.",
  },
  {
    q: "Posso fare lezione a casa mia?",
    a: "Sì, offriamo lezioni a domicilio nella zona di San Lazzaro di Savena e dintorni. Contattaci per concordare i dettagli.",
  },
  {
    q: "Come funziona la prima lezione gratuita?",
    a: "La prima lezione è gratuita, dura circa 30 minuti ed è completamente informale. Suoniamo insieme, capiamo i tuoi obiettivi e vediamo se c'è feeling. Nessun impegno, nessuna pressione.",
  },
];

export default function CorsiPage() {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'chitarra' | 'pianoforte'>('chitarra');
  const isMobile = useIsMobile(1000);
  const hideModels = useIsMobile(1295);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setActiveTab('chitarra');
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full bg-transparent text-white overflow-hidden">
      <section className="relative h-screen w-full overflow-hidden">

        {/* DESKTOP — Comparison Slider */}
        <div className="hidden min-[1000px]:block h-full w-full">
          <Comparison mode="drag" className="h-full w-full">
            
            {/* LATO SINISTRO — CHITARRA */}
            <ComparisonItem position="left">
              <div className="absolute inset-0 flex items-center" style={{paddingLeft: '25%'}}>
                <img
                  src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-[18vw] font-black text-white/5 select-none overflow-hidden">
                  CHITARRA
                </span>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none" />
                {!hideModels && isMounted && (
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <Canvas
                      gl={{ antialias: true, alpha: true }}
                      camera={{ position: [0, 0, 16], fov: 40 }}
                      style={{ background: "transparent", pointerEvents: "none" }}
                    >
                      <Suspense fallback={null}>
                        <GuitarScene
                          bp1600={{ scale: 0.5, posX: 3, posY: -2 }}
                          bp1366={{ scale: 0.5, posX: 3, posY: -2 }}
                          bp1024={{ scale: 0.5, posX: 2.5, posY: -2 }}
                        />
                      </Suspense>
                    </Canvas>
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-auto max-w-[480px]"
                >
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-6">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-red-200 to-red-600">
                      Chitarra
                    </span>
                  </h2>
                  <p className="text-gray-300 mb-10 leading-relaxed text-lg max-w-xs">
                    Blues, rock, fingerpicking.<br/>
                    Acustica o elettrica, partiamo<br/>
                    da zero e arriviamo dove vuoi.
                  </p>
                  <Link href="/corsi/chitarra"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:scale-105">
                    Scopri il corso <ArrowRight size={20} />
                  </Link>
                </motion.div>
              </div>
            </ComparisonItem>

            {/* LATO DESTRO — PIANOFORTE */}
            <ComparisonItem position="right">
              <div className="absolute inset-0 flex items-center justify-end" style={{paddingRight: '25%'}}>
                <img
                  src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1200"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-[18vw] font-black text-white/5 select-none overflow-hidden">
                  PIANO
                </span>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
                {!hideModels && isMounted && (
                  <div className="absolute inset-0 z-0 pointer-events-none" style={{ transform: 'translateX(-35%)' }}>
                    <Canvas
                      gl={{ antialias: true, alpha: true }}
                      camera={{ position: [0, 2, 9], fov: 45 }}
                      style={{ background: "transparent", pointerEvents: "none" }}
                    >
                      <ambientLight intensity={0.7} />
                      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
                      <Suspense fallback={null}>
                        <PianoModel
                          bp1600={{ scale: 1.2, posX: 0.5, posY: -1 }}
                          bp1245={{ scale: 1.2, posX: -0.3, posY: -1 }}
                          bp919={{ scale: 1.0, posX: -1, posY: -0.8 }}
                        />
                      </Suspense>
                    </Canvas>
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-auto max-w-[480px] text-right"
                >
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-6">
                    <span className="text-transparent bg-clip-text bg-gradient-to-bl from-white via-indigo-200 to-indigo-600">
                      Pianoforte
                    </span>
                  </h2>
                  <p className="text-gray-300 mb-10 leading-relaxed text-lg max-w-xs ml-auto">
                    Classico, jazz o pop.<br/>
                    Dalle prime note all'improvvisazione,<br/>
                    un percorso su misura per te.
                  </p>
                  <Link href="/corsi/pianoforte"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-105 ml-auto">
                    Scopri il corso <ArrowRight size={20} />
                  </Link>
                </motion.div>
              </div>
            </ComparisonItem>

            {/* HANDLE */}
            <ComparisonHandle>
              <div className="relative flex flex-col items-center h-full">
                <div className="absolute inset-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent -translate-x-1/2" />
                <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
                  <motion.div
                    animate={{ x: [-6, 6, -6] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-14 h-14 rounded-full bg-[#020205] border-2 border-white/30 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-sm"
                  >
                    <VinylRecord weight="duotone" size={28} className="text-white" />
                  </motion.div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 whitespace-nowrap">
                    ← trascina →
                  </span>
                </div>
              </div>
            </ComparisonHandle>

          </Comparison>
        </div>

        {/* MOBILE — Tabs */}
        <div className="flex min-[1000px]:hidden h-full w-full flex-col">
          
          {/* Tab switcher */}
          <div className="relative z-20 flex items-center justify-center pt-28 pb-4 gap-3 px-6">
            <button
              onClick={() => setActiveTab('chitarra')}
              className={`flex-1 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all ${
                activeTab === 'chitarra'
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                  : 'bg-white/5 text-gray-400 border border-white/10'
              }`}
            >
              Chitarra
            </button>
            <button
              onClick={() => setActiveTab('pianoforte')}
              className={`flex-1 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all ${
                activeTab === 'pianoforte'
                  ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                  : 'bg-white/5 text-gray-400 border border-white/10'
              }`}
            >
              Pianoforte
            </button>
          </div>

          {/* Contenuto tab */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'chitarra' ? (
                <motion.div
                  key="chitarra"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-br from-[#2a0505] via-[#1a0505] to-[#050505] flex items-center justify-center px-8"
                >
                  <img
                    src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[300px] bg-red-600/10 blur-[80px] pointer-events-none" />
                  <div className="relative z-10 text-center">
                    <Guitar weight="duotone" size={64} className="text-red-500 mb-6 mx-auto" />
                    <h2 className="text-6xl font-bold tracking-tighter mb-6 leading-none">
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-red-200 to-red-600">
                        Chitarra
                      </span>
                    </h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                      Blues, rock, fingerpicking. Acustica o elettrica, partiamo da zero e arriviamo dove vuoi.
                    </p>
                    <Link href="/corsi/chitarra"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                      Scopri il corso <ArrowRight size={20} />
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="pianoforte"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-bl from-[#05051a] via-[#05050a] to-[#050505] flex items-center justify-center px-8"
                >
                  <img
                    src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute bottom-0 right-0 w-full h-[300px] bg-indigo-600/10 blur-[80px] pointer-events-none" />
                  <div className="relative z-10 text-center">
                    <PianoKeys weight="duotone" size={64} className="text-indigo-400 mb-6 mx-auto" />
                    <h2 className="text-6xl font-bold tracking-tighter mb-6 leading-none">
                      <span className="text-transparent bg-clip-text bg-gradient-to-bl from-white via-indigo-200 to-indigo-600">
                        Pianoforte
                      </span>
                    </h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                      Classico, jazz o pop. Dalle prime note all'improvvisazione, un percorso su misura per te.
                    </p>
                    <Link href="/corsi/pianoforte"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                      Scopri il corso <ArrowRight size={20} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Badge bottom center — solo desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <span className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-gray-300 font-mono tracking-widest whitespace-nowrap">
            Prima lezione gratuita · Tutte le età · San Lazzaro di Savena
          </span>
        </motion.div>

      </section>

      <section className="py-24 px-6 md:px-10 max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <GraduationCap weight="duotone" size={36} className="mx-auto mb-4 text-white/60" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Il nostro approccio alla didattica</h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
              Ambiente familiare, empatia e nessun giudizio. Si impara a qualsiasi età, con un percorso umano prima ancora
              che tecnico. Qui gli allievi diventano amici e la musica crea legami veri.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn delay={0.1}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 h-full">
              <Heart weight="duotone" size={30} className="text-red-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Ambiente Familiare</h3>
              <p className="text-gray-400">Niente aule fredde. Ci si chiama per nome e si impara ridendo.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 h-full">
              <Users weight="duotone" size={30} className="text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Tutte le Età</h3>
              <p className="text-gray-400">
                Dal bambino curioso all&apos;adulto che realizza un sogno. Il nostro allievo più grande ha 80 anni.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 h-full">
              <House weight="duotone" size={30} className="text-amber-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Anche a Domicilio</h3>
              <p className="text-gray-400">
                Preferisci studiare a casa tua? Offriamo lezioni direttamente da te, senza spostamenti.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-6 md:px-10 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-12">Per chi sono i nostri corsi</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                age: "06+",
                title: "Bambini (6-12 anni)",
                desc: "Approccio ludico, ritmo e creatività per iniziare con entusiasmo e basi solide.",
              },
              {
                age: "13+",
                title: "Ragazzi (13-18 anni)",
                desc: "Repertorio moderno, tecnica e spazio all'espressione personale.",
              },
              {
                age: "18+",
                title: "Adulti",
                desc: "Realizzare un sogno nel cassetto, senza prerequisiti e senza pressioni.",
              },
              {
                age: "60+",
                title: "Anziani",
                desc: "Stimolo cognitivo, gioia e condivisione: non è mai troppo tardi per iniziare.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={0.1 * i}>
                <div className="relative bg-transparent border border-white/10 rounded-3xl p-8 overflow-hidden h-full">
                  <span className="absolute -top-6 -right-3 text-[6rem] font-black text-white/5 select-none">{item.age}</span>
                  <h3 className="text-2xl font-bold mb-3 relative z-10">{item.title}</h3>
                  <p className="text-gray-400 relative z-10">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeIn>
            <div className="bg-gradient-to-br from-[#0A0A0A] to-[#0a0a1a] border border-indigo-500/20 rounded-[3rem] p-10 h-full">
              <PianoKeys weight="duotone" size={48} className="text-indigo-400 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Pianoforte</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Dalla tecnica classica al jazz moderno. Un percorso costruito su misura, dalle prime note fino alla piena
                autonomia musicale.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Tecnica, postura e lettura musicale",
                  "Repertorio classico, jazz e pop",
                  "Composizione e improvvisazione",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-200">
                    <CheckCircle weight="duotone" size={20} className="text-indigo-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/corsi/pianoforte"
                className="inline-flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-500 transition-colors"
              >
                Vai al corso <ArrowRight size={20} />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-gradient-to-br from-[#0A0A0A] to-[#1a0a0a] border border-red-900/30 rounded-[3rem] p-10 h-full">
              <Guitar weight="duotone" size={48} className="text-red-400 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Chitarra</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Acustica, elettrica o classica. Blues, rock, fingerpicking e molto altro. Si parte dalle basi e si arriva dove
                vuoi.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Accordi, ritmica e tecnica fingerstyle",
                  "Repertorio blues, rock, pop e folk",
                  "Improvvisazione e linguaggio blues",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-200">
                    <CheckCircle weight="duotone" size={20} className="text-red-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/corsi/chitarra"
                className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-500 transition-colors"
              >
                Vai al corso <ArrowRight size={20} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-6 md:px-10 max-w-5xl mx-auto">
        <FadeIn>
          <div className="bg-[#081818] border border-[#00ced1]/20 rounded-[3rem] p-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div>
              <span className="inline-block px-4 py-2 rounded-lg bg-[#00ced1]/10 text-[#00ced1] border border-[#00ced1]/20 text-sm font-bold mb-4">
                Metodo Esclusivo
              </span>
              <h3 className="text-3xl font-bold mb-4">Studiamo con il Metodo Musigramma™</h3>
              <p className="text-gray-300 leading-relaxed max-w-2xl">
                Siamo tra le prime scuole in Italia ad adottare questo sistema brevettato che rende l&apos;armonia visibile e
                tangibile. Ideale anche per chi ha DSA.
              </p>
            </div>
            <Link
              href="/musigramma"
              className="inline-flex items-center gap-3 bg-[#00ced1] text-black px-8 py-4 rounded-full font-bold hover:brightness-105 transition"
            >
              Scopri Musigramma <ArrowRight size={20} />
            </Link>
          </div>
        </FadeIn>
      </section>

      <section className="py-24 px-6 md:px-10 max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Come funziona</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn delay={0.1}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 h-full">
              <Clock size={48} weight="duotone" className="text-indigo-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">4 lezioni al mese</h3>
              <p className="text-gray-400">Una a settimana, stessa fascia oraria</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 h-full">
              <Star size={48} weight="duotone" className="text-[#00ced1] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Prima lezione gratuita</h3>
              <p className="text-gray-400">Conoscitiva e senza impegno, 30 minuti</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 h-full">
              <House size={48} weight="duotone" className="text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Anche a domicilio</h3>
              <p className="text-gray-400">Veniamo noi da te se preferisci</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-6 md:px-10 max-w-3xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-10">Domande Frequenti</h2>
        </FadeIn>

        <div>
          {faqItems.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={item.q} className="border-b border-white/10 py-6">
                <button
                  className="w-full flex justify-between items-center gap-4 text-left"
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  type="button"
                >
                  <span className="text-lg font-semibold text-white">{item.q}</span>
                  <Question weight="duotone" className="text-[#00ced1] min-w-5" size={20} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 pt-4 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 px-6 md:px-10 text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Inizia il tuo percorso musicale</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Prima lezione gratuita. Nessun impegno. Solo musica, passione e tanta voglia di crescere.
          </p>
          <Link
            href="/#contatti"
            className="inline-flex items-center gap-3 bg-[#00ced1] text-black px-10 py-5 rounded-full font-bold hover:brightness-105 transition"
          >
            Prenota la tua prova <ArrowRight size={20} />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
