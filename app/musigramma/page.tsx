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