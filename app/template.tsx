"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Usiamo una key basata sul pathname per forzare il re-render dell'animazione
  
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        
        {/* IL CONTENUTO DELLA PAGINA */}
        {/* Ritardo l'apparizione per far finire l'onda */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {children}
        </motion.div>

        {/* --- CURVE TRANSITION OVERLAY --- */}
        {/* Parte alto, scende coprendo tutto (concavo), poi risale piatto */}
        <CurveOverlay />

      </motion.div>
    </AnimatePresence>
  );
}

const CurveOverlay = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none flex flex-col-reverse"
      initial={{ height: "100vh" }} // Parte pieno
      animate={{ height: "0vh" }}   // Si ritira
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
    >
      {/* IL BLOCCO NERO SOLIDO */}
      <div className="bg-[#050505] w-full flex-grow relative"></div>

      {/* LA CURVA SVG IN CIMA AL BLOCCO */}
      <div className="bg-transparent h-[100px] w-full relative -top-[1px]"> {/* -top-1px fix per le righe bianche */}
        <svg className="w-full h-full text-[#050505] fill-current" preserveAspectRatio="none" viewBox="0 0 1440 100">
          <motion.path 
            d="M0 100 L1440 100 L1440 0 Q720 100 0 0 Z" // Forma Curva Iniziale
            initial={{ d: "M0 100 L1440 100 L1440 0 Q720 0 0 0 Z" }} // Piatto (schermo coperto)
            animate={{ d: "M0 100 L1440 100 L1440 0 Q720 100 0 0 Z" }} // Curva mentre scende
            exit={{ d: "M0 100 L1440 100 L1440 0 Q720 0 0 0 Z" }} 
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          />
        </svg>
      </div>
    </motion.div>
  );
};