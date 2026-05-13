"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({ nome: '', email: '', messaggio: '' });

  useEffect(() => { setMounted(true); }, []);

  const handleClose = () => {
    onClose();
    setTimeout(() => setSent(false), 400);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          nome: fields.nome,
          email: fields.email,
          telefono: '',
          interesse: 'Contatto dal sito',
          messaggio: fields.messaggio,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSent(true);
      setLoading(false);
      setFields({ nome: '', email: '', messaggio: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '520px',
              background: '#0A0A0A',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '2rem',
              padding: '2rem',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                width: '2rem',
                height: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.05)',
                color: '#9ca3af',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Chiudi"
            >
              ✕
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.25rem' }}>
                Vieni a trovarci
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                Scegli come contattarci o prenota direttamente.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <a
                href="tel:+393464005500"
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.05)', textDecoration: 'none' }}
              >
                <span>📞</span>
                <span style={{ color: '#d1d5db', fontWeight: '500' }}>+39 346 400 5500</span>
              </a>
              <a
                href="https://maps.google.com/maps?q=Via+del+Rio+9+Ponticella+San+Lazzaro+di+Savena+Bologna"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.05)', textDecoration: 'none' }}
              >
                <span>📍</span>
                <span style={{ color: '#d1d5db', fontWeight: '500' }}>Via del Rio 9, Ponticella (BO)</span>
              </a>
            </div>

            <a
              href="https://calendly.com/musicanovastudio/lezione-di-prova-gratuita"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '1rem', marginBottom: '1.5rem', background: '#00ced1', color: 'black', fontWeight: 'bold', borderRadius: '0.75rem', textDecoration: 'none' }}
            >
              Prenota ora la tua lezione di prova
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ color: '#4b5563', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>oppure scrivi</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            </div>

            {!sent ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Nome"
                  value={fields.nome}
                  onChange={(e) => setFields({ ...fields, nome: e.target.value })}
                  style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '1rem', color: 'white', outline: 'none', fontSize: '0.875rem', boxSizing: 'border-box' }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={fields.email}
                  onChange={(e) => setFields({ ...fields, email: e.target.value })}
                  style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '1rem', color: 'white', outline: 'none', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  suppressHydrationWarning
                />
                <textarea
                  rows={3}
                  placeholder="Il tuo messaggio..."
                  value={fields.messaggio}
                  onChange={(e) => setFields({ ...fields, messaggio: e.target.value })}
                  style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '1rem', color: 'white', outline: 'none', fontSize: '0.875rem', resize: 'none', boxSizing: 'border-box' }}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ width: '100%', padding: '1rem', background: '#4f46e5', color: 'white', fontWeight: 'bold', borderRadius: '0.75rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  {loading ? (
                    <>
                      <svg style={{ animation: 'spin 1s linear infinite', width: '1rem', height: '1rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Stiamo inviando...
                    </>
                  ) : 'Invia Messaggio'}
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✓</p>
                <p style={{ color: '#00ced1', fontWeight: '500' }}>
                  Messaggio inviato! Ti risponderemo presto.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
