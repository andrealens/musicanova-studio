"use client";
import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MasonryItem } from './Masonry';

interface LightboxProps {
  items: MasonryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const isOpen = currentIndex !== null;
  const current = currentIndex !== null ? items[currentIndex] : null;

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Blocca lo scroll del body quando il lightbox è aperto
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.dataset.scrollY = String(scrollY);
    } else {
      const scrollY = Number(document.body.dataset.scrollY || 0);
      document.body.style.overflow = '';
      delete document.body.dataset.scrollY;
      window.scrollTo(0, scrollY);
    }
    return () => {
      const scrollY = Number(document.body.dataset.scrollY || 0);
      document.body.style.overflow = '';
      delete document.body.dataset.scrollY;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          key="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[500] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 z-[0] bg-black/90 backdrop-blur-md" />

          {/* Contatore */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-white/50 font-mono text-sm tracking-widest">
            {(currentIndex! + 1).toString().padStart(2, '0')} / {items.length.toString().padStart(2, '0')}
          </div>

          {/* Bottone chiudi */}
          <button
            className="absolute top-24 right-4 md:top-6 md:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all"
            onClick={onClose}
          >
            <X size={20} className="text-white" />
          </button>

          {/* Immagine */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.img}
              alt=""
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </motion.div>

          {/* Freccia sinistra */}
          {currentIndex! > 0 && (
            <button
              className="absolute left-[5%] z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all"
              onClick={e => { e.stopPropagation(); onPrev(); }}
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
          )}

          {/* Freccia destra */}
          {currentIndex! < items.length - 1 && (
            <button
              className="absolute right-[5%] z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all"
              onClick={e => { e.stopPropagation(); onNext(); }}
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
