"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Shapes, CheckCircle2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

export default function MusigrammaPage() {
  return (
    <div className="w-full bg-[#021a1a] text-white selection:bg-[#00ced1] selection:text-black overflow-hidden">
      
      {/* HERO MUSIGRAMMA */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Sfondo geometrico astratto */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="#00ced1" strokeWidth="0.2" className="animate-[pulse_5s_infinite]"/>
             <path d="M0,60 Q25,10 50,60 T100,60" fill="none" stroke="#00ced1" strokeWidth="0.1" className="animate-[pulse_7s_infinite]"/>
          </svg>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-[#00ced1]/10 border border-[#00ced1]/30 text-[#00ced1] text-xs font-bold uppercase tracking-widest mb-6">
              Innovazione Didattica
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00ced1] to-teal-800">
              MUSIGRAMMA
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              L'armonia non è mai stata così visibile. <br/>
              Un metodo sperimentale, brevettato e validato.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <FadeIn>
              <h2 className="text-4xl font-bold mb-4">Perché è diverso?</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Musigramma trasforma concetti astratti in oggetti manipolabili. 
                Grazie al progetto <strong>SUNRAISE</strong>, il metodo è stato validato come strumento inclusivo ed efficace.
              </p>
            </FadeIn>
            
            <div className="space-y-4">
              {[
                "Apprendimento multisensoriale (vista, tatto, udito)",
                "Ideale anche per DSA e BES",
                "Visualizzazione geometrica degli accordi",
                "Riduzione del carico cognitivo teorico"
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#00ced1]/30 transition-colors">
                    <CheckCircle2 className="text-[#00ced1] shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          
          <FadeIn delay={0.3}>
             <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-[#00ced1]/20 to-transparent border border-[#00ced1]/20 relative overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"/>
                <Brain size={120} className="text-[#00ced1] opacity-80 group-hover:scale-110 transition-transform duration-700" />
                <Shapes size={80} className="absolute top-10 right-10 text-white opacity-20 animate-spin-slow" />
             </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== SEZIONE: COME FUNZIONA IL METODO ===== */}
      <section className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-[#00ced1]/10 border border-[#00ced1]/30 text-[#00ced1] text-xs font-bold uppercase tracking-widest mb-4">
              Il Metodo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Come funziona Musigramma</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Un ecosistema didattico integrato: fisico, digitale e umano. Tre livelli che si parlano.
            </p>
          </div>
        </FadeIn>

        {/* Step cards orizzontali */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Tocca l'armonia",
              description:
                "Il dispositivo fisico brevettato usa forme geometriche e relazioni spaziali per visualizzare accordi, intervalli e rivolti. La teoria musicale non si legge. Si tocca.",
              tag: "Phygital 1.0",
            },
            {
              step: "02",
              title: "Impara con l'AI",
              description:
                "L'app iOS/Android non è un lettore di contenuti. È un tutor adattivo: riconosce gradi e intervalli, personalizza il percorso e ti accompagna al livello successivo.",
              tag: "Vibe Coding & AI",
            },
            {
              step: "03",
              title: "Consolida con il testo",
              description:
                "Il manuale — cartaceo e digitale — è progettato per tutti: studenti standard, DSA e non vedenti. Inclusività radicale non è un'aggiunta. È nella struttura del metodo.",
              tag: "Inclusività Radicale",
            },
          ].map((card, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="relative flex flex-col h-full p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-[#00ced1]/40 transition-all group overflow-hidden">
                {/* Numero sfondo decorativo */}
                <span className="absolute top-4 right-6 text-8xl font-black text-white/5 select-none group-hover:text-[#00ced1]/10 transition-colors">
                  {card.step}
                </span>
                <span className="inline-block mb-4 py-1 px-3 rounded-full bg-[#00ced1]/10 border border-[#00ced1]/20 text-[#00ced1] text-xs font-bold uppercase tracking-widest w-fit">
                  {card.tag}
                </span>
                <h3 className="text-2xl font-bold mb-3 text-white">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed flex-1">{card.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== SEZIONE: I 4 UNFAIR ADVANTAGE ===== */}
      <section className="py-24 px-6 md:px-10 bg-[#011010]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full bg-[#00ced1]/10 border border-[#00ced1]/30 text-[#00ced1] text-xs font-bold uppercase tracking-widest mb-4">
                Perché sceglierci
              </span>
              <h2 className="text-4xl md:text-5xl font-bold">I nostri 4 vantaggi sleali</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "🖐️",
                title: "Phygital 1.0",
                headline: "L'unico dispositivo fisico al mondo di questo tipo",
                body: "Nessun software può replicare l'apprendimento cinestetico. Girare, toccare, vedere le geometrie dell'armonia attiva meccanismi cognitivi che il video da solo non raggiunge. Protetto da brevetto UE.",
              },
              {
                icon: "⚡",
                title: "Metodo 10x",
                headline: "Fino a 10 volte più veloce dei metodi tradizionali",
                body: "Non è gamification superficiale. È comprensione profonda e strutturale della grammatica musicale. Meno nozionismo, più padronanza reale — in una frazione del tempo.",
              },
              {
                icon: "♿",
                title: "Inclusività Radicale",
                headline: "Nativamente pensato per DSA e non vedenti",
                body: "Il supporto Braille e il design inclusivo non sono stati aggiunti in un secondo momento. Sono nella struttura originale del prodotto. La musica è davvero per tutti.",
              },
              {
                icon: "🤖",
                title: "Vibe Coding & AI",
                headline: "Un tutor adattivo disponibile 24/7",
                body: "L'integrazione con OpenAI API permette all'app di riconoscere automaticamente gradi, intervalli e rivolti e di personalizzare ogni percorso utente in tempo reale.",
              },
            ].map((adv, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex gap-6 p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-[#00ced1]/40 hover:bg-[#00ced1]/5 transition-all group">
                  <div className="text-4xl shrink-0 mt-1">{adv.icon}</div>
                  <div>
                    <span className="text-[#00ced1] text-xs font-bold uppercase tracking-widest mb-1 block">
                      {adv.title}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{adv.headline}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{adv.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEZIONE: NUMERI ===== */}
      <section className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-[#00ced1]/10 border border-[#00ced1]/30 text-[#00ced1] text-xs font-bold uppercase tracking-widest mb-4">
              Dati
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">Il metodo in numeri</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "10x", label: "Riduzione tempi di apprendimento", sub: "vs metodi tradizionali" },
            { value: "50K+", label: "Musicisti amatoriali target", sub: "solo mercato italiano Anno 1" },
            { value: "85", label: "Istituti pilota B2B", sub: "obiettivo Anno 1" },
            { value: "93%", label: "Margine di contribuzione", sub: "sul digitale" },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-[#00ced1]/30 transition-all">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00ced1] mb-2">
                  {stat.value}
                </span>
                <span className="text-white font-semibold mb-1 text-sm leading-snug">{stat.label}</span>
                <span className="text-gray-500 text-xs">{stat.sub}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-32 text-center bg-[#011010]">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Vuoi approfondire il metodo?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-12">
            Visita il sito ufficiale del progetto per scoprire la ricerca scientifica, i materiali e la community internazionale.
          </p>
          <a 
            href="https://www.musigramma.eu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#00ced1] text-black font-bold rounded-full hover:bg-[#00a8a8] hover:scale-105 transition-all shadow-[0_0_40px_rgba(0,206,209,0.3)]"
          >
            Vai al sito ufficiale <ExternalLink size={20}/>
          </a>
        </FadeIn>
      </section>
    </div>
  );
}