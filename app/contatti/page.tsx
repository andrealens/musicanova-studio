"use client";

import React, { Suspense, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  PaperPlaneTilt,
  MapPin,
  Envelope,
  Phone,
  Clock,
  CheckCircle,
  GraduationCap,
  ArrowRight,
} from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import emailjs from "@emailjs/browser";

const Particles = dynamic(() => import("@/src/components/Particles"), { ssr: false });

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
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

function ContattiForm() {
  const searchParams = useSearchParams();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    nome: "",
    email: "",
    telefono: "",
    messaggio: "",
    interesse: searchParams.get("interesse") ?? "chitarra",
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          nome: fields.nome,
          email: fields.email,
          telefono: fields.telefono,
          interesse: fields.interesse,
          messaggio: fields.messaggio,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSent(true);
      setLoading(false);
    } catch (error) {
      console.error("EmailJS error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-8 md:p-10">
      <h2 className="text-2xl font-bold mb-2">Scrivici</h2>
      <p className="text-gray-400 text-sm mb-8">
        Compila il modulo: ti ricontatteremo il prima possibile.
      </p>

      {!sent ? (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Nome
            </label>
            <input
              type="text"
              value={fields.nome}
              onChange={(e) =>
                setFields({ ...fields, nome: e.target.value })
              }
              className="w-full bg-[#111] border border-white/10 rounded-2xl p-4 text-white focus:border-[#00ced1] outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Email
            </label>
            <input
              type="email"
              suppressHydrationWarning
              value={fields.email}
              onChange={(e) =>
                setFields({ ...fields, email: e.target.value })
              }
              className="w-full bg-[#111] border border-white/10 rounded-2xl p-4 text-white focus:border-[#00ced1] outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Telefono <span className="text-gray-600">(opzionale)</span>
            </label>
            <input
              type="tel"
              value={fields.telefono}
              onChange={(e) =>
                setFields({ ...fields, telefono: e.target.value })
              }
              className="w-full bg-[#111] border border-white/10 rounded-2xl p-4 text-white focus:border-[#00ced1] outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Sono interessato a
            </label>
            <select
              value={fields.interesse}
              onChange={(e) =>
                setFields({ ...fields, interesse: e.target.value })
              }
              className="w-full bg-[#111] border border-white/10 rounded-2xl p-4 text-white focus:border-[#00ced1] outline-none transition-all appearance-none"
            >
              <option value="chitarra">Corso di Chitarra</option>
              <option value="pianoforte">Corso di Pianoforte</option>
              <option value="prova">Lezione di Prova Gratuita</option>
              <option value="band">Ingaggio Band/Live</option>
              <option value="altro">Altro</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Messaggio
            </label>
            <textarea
              rows={4}
              value={fields.messaggio}
              onChange={(e) =>
                setFields({ ...fields, messaggio: e.target.value })
              }
              className="w-full resize-y min-h-[120px] bg-[#111] border border-white/10 rounded-2xl p-4 text-white focus:border-[#00ced1] outline-none transition-all"
            />
          </div>
          <button
            type="button"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#00ced1] text-black font-bold py-4 rounded-2xl hover:brightness-110 transition-all"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Stiamo inviando la tua richiesta...
              </span>
            ) : (
              <>
                <PaperPlaneTilt size={20} strokeWidth={2.25} />
                Invia Messaggio
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center gap-4 py-8">
          <CheckCircle
            weight="duotone"
            size={48}
            className="text-[#00ced1]"
            strokeWidth={2}
            aria-hidden
          />
          <p className="text-lg font-medium">
            Messaggio inviato! Ti risponderemo presto.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ContattiPage() {
  return (
    <div className="w-full min-h-screen bg-transparent text-white selection:bg-[#00ced1]/30 selection:text-white overflow-hidden">
      {/* HERO */}
      <section className="relative h-[50vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Particles
            particleColors={["#ffffff", "#a5b4fc", "#00ced1"]}
            particleCount={180}
            particleSpread={8}
            speed={0.08}
            particleBaseSize={80}
            moveParticlesOnHover={true}
            particleHoverFactor={0.3}
            alphaParticles={true}
            disableRotation={false}
            pixelRatio={1}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 mb-6">
            Ponticella · San Lazzaro di Savena (BO)
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Vieni a trovarci
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Via del Rio 9 — Ponticella, San Lazzaro di Savena (BO) 40068
          </p>
        </motion.div>
      </section>

      {/* GRID PRINCIPALE */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 py-24">
        {/* COLONNA SX — Form */}
        <FadeIn>
          <Suspense fallback={null}>
            <ContattiForm />
          </Suspense>
        </FadeIn>

        {/* COLONNA DX — Info */}
        <div className="space-y-6">
          <FadeIn delay={0.1}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6">
              <MapPin
                weight="duotone"
                size={28}
                className="text-red-500 mb-4"
              />
              <h3 className="text-xl font-bold mb-3">Dove Siamo</h3>
              <p className="text-gray-300 leading-relaxed">
                Via del Rio 9, Ponticella, San Lazzaro di Savena (BO) 40068
              </p>
              <p className="text-gray-500 text-sm mt-3">
                A 10 minuti dal centro di Bologna
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6">
              <Envelope weight="duotone" size={28} className="text-[#00ced1] mb-4" />
              <h3 className="text-xl font-bold mb-4">Contatti Diretti</h3>
              <div className="space-y-3">
                <a
                  href="mailto:musicanovastudio@gmail.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Envelope size={18} className="text-red-500 shrink-0" />
                  musicanovastudio@gmail.com
                </a>
                <a
                  href="tel:+393464005500"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone size={18} className="text-red-500 shrink-0" />
                  +39 346 400 5500
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6">
              <Clock
                weight="duotone"
                size={28}
                className="text-indigo-400 mb-4"
              />
              <h3 className="text-xl font-bold mb-3">Orari Lezioni</h3>
              <p className="text-gray-300 leading-relaxed">
                Lun–Ven: 15:00–21:00 • Sab: 10:00–14:00
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* MAPPA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <FadeIn>
          <div className="h-[400px] rounded-[3rem] overflow-hidden border border-white/10 bg-[#111]">
            <iframe
              src="https://maps.google.com/maps?q=Via+del+Rio+9+Ponticella+San+Lazzaro+di+Savena+Bologna&output=embed"
              className="w-full h-full grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700 border-0"
              title="MusicaNova Studio — Mappa"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </FadeIn>
      </section>

      {/* CTA FINALE */}
      <section className="py-24 px-6 text-center">
        <FadeIn>
          <div className="bg-gradient-to-br from-[#0A0A0A] via-[#0a0a1a] to-[#0A0A0A] border border-indigo-500/20 rounded-[3rem] max-w-3xl mx-auto px-8 py-12 md:py-14">
            <GraduationCap
              weight="duotone"
              size={48}
              className="text-indigo-400 mx-auto mb-6"
              strokeWidth={1.75}
            />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prima lezione gratuita
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-lg mx-auto">
              Senza impegno. 30 minuti per conoscerti, capire i tuoi obiettivi e
              suonare insieme.
            </p>
            <Link
              href="https://calendly.com/musicanovastudio/lezione-di-prova-gratuita"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-full font-bold hover:bg-indigo-500 transition-all"
            >
              Prenota ora
              <ArrowRight size={20} />
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
