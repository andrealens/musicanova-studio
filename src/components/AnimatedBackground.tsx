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
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-100, 100),
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
    >
      <div className="glow-blob absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-indigo-600/15 blur-[120px]" />
      <div className="glow-blob absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-purple-600/15 blur-[120px]" />
      <div className="glow-blob absolute top-[30%] left-[40%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
    </div>
  );
}
