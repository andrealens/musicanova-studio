"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const blobs = containerRef.current.querySelectorAll(".glow-blob");

    blobs.forEach((blob) => {
      gsap.to(blob, {
        x: () => gsap.utils.random(-80, 80),
        y: () => gsap.utils.random(-80, 80),
        scale: () => gsap.utils.random(0.9, 1.1),
        duration: () => gsap.utils.random(15, 20),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1] overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/*
       * REGOLA blur/dimensione:
       * Il blur non deve superare il ~20% del diametro del blob.
       * Con blob da 200px e blur 120px il rapporto è 60% → tutto dissolto.
       *
       * Mobile  → blob grandi (80-90vw), blur piccolo (35-40px), opacità più alta
       * Desktop → blob medi  (50-65vw), blur grande (110-120px), opacità originale
       *
       * Le opacità su mobile sono /20-/25 invece di /10-/15 perché i pannelli
       * OLED entry-level e LCD economici comprimono i valori bassi verso il nero.
       */}

      {/* Blob 1 — alto sinistra, indigo */}
      <div className="
        glow-blob absolute
        top-[-5%] left-[-5%]
        w-[85vw] h-[85vw]   md:w-[55vw] md:h-[55vw]
        max-w-[380px] max-h-[380px]   md:max-w-[650px] md:max-h-[650px]
        rounded-full
        bg-indigo-600/25   md:bg-indigo-600/15
        blur-[40px]   md:blur-[120px]
      " />

      {/* Blob 2 — basso destra, viola */}
      <div className="
        glow-blob absolute
        bottom-[-5%] right-[-5%]
        w-[90vw] h-[90vw]   md:w-[65vw] md:h-[65vw]
        max-w-[420px] max-h-[420px]   md:max-w-[750px] md:max-h-[750px]
        rounded-full
        bg-purple-600/25   md:bg-purple-600/15
        blur-[40px]   md:blur-[120px]
      " />

      {/* Blob 3 — centro, blu.
         Su mobile spostato più in basso e a sinistra per distribuire
         la copertura senza sovrapporsi completamente agli altri due. */}
      <div className="
        glow-blob absolute
        top-[45%] left-[5%]   md:top-[30%] md:left-[40%]
        w-[75vw] h-[75vw]   md:w-[45vw] md:h-[45vw]
        max-w-[340px] max-h-[340px]   md:max-w-[550px] md:max-h-[550px]
        rounded-full
        bg-blue-600/20   md:bg-blue-600/10
        blur-[35px]   md:blur-[110px]
      " />
    </div>
  );
}