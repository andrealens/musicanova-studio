"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const CassetteScene = dynamic(
  () => import("./CassetteModel").then((m) => m.CassetteScene),
  { ssr: false }
);
const PianoScene = dynamic(
  () => import("./PianoModel").then((m) => m.PianoScene),
  { ssr: false }
);
const GuitarScene = dynamic(
  () => import("./GuitarModel").then((m) => m.GuitarScene),
  { ssr: false }
);

const SCROLL_IDLE_MS = 160;

function useScrollIdle() {
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        timeoutRef.current = null;
      }, SCROLL_IDLE_MS);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  return isScrolling;
}

const CAMERAS: Record<string, { position: [number, number, number]; fov: number }> = {
  "/": { position: [0, 0, 5], fov: 30 },
  "/corsi/pianoforte": { position: [0, 2, 9], fov: 45 },
  "/corsi/chitarra": { position: [0, 0, 16], fov: 40 },
};

function getCamera(pathname: string) {
  return CAMERAS[pathname] ?? CAMERAS["/"];
}

function getActiveScene(pathname: string, isScrolling: boolean) {
  switch (pathname) {
    case "/":
      return <CassetteScene isScrolling={isScrolling} />;
    case "/corsi/pianoforte":
      return <PianoScene isScrolling={isScrolling} />;
    case "/corsi/chitarra":
      return <GuitarScene isScrolling={isScrolling} />;
    default:
      return null;
  }
}

export default function Unified3DBackground() {
  const pathname = usePathname();
  const isScrolling = useScrollIdle();
  const camera = getCamera(pathname);
  const activeScene = getActiveScene(pathname, isScrolling);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden>
      <Canvas
        key="unified-3d-canvas"
        camera={camera}
        frameloop={isScrolling ? "never" : "always"}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>{activeScene}</Suspense>
      </Canvas>
    </div>
  );
}
