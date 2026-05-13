"use client";
import React, { useState } from 'react';
import {
  PaperPlaneTilt,
  CalendarBlank,
  MapPin,
  Envelope,
  Phone,
  YoutubeLogo,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react";
import emailjs from '@emailjs/browser';

const cardStyle = "bg-[#0A0A0A] border border-white/10 shadow-2xl rounded-[3rem] transition-all duration-300";

export default function Footer() {
  const [sent, setSent] = useState(false);
  const [fields, setFields] = useState({ 
    nome: '', 
    email: '', 
    messaggio: '' 
  });
  const [loading, setLoading] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          nome: fields.nome,
          email: fields.email,
          telefono: '',
          interesse: 'Contatto generale',
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

  return (
    <footer id="contatti" className="pt-32 pb-12 px-6 md:px-10 border-t border-white/5 bg-[#020202] text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
        
        {/* COLONNA SINISTRA: Form Contatti */}
        <div>
          <h3 className="text-5xl font-bold mb-8 italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
            Contatti
          </h3>
          <form className="space-y-6" onSubmit={handleContactSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Nome" value={fields.nome} onChange={(e) => setFields({...fields, nome: e.target.value})} className="bg-[#111] border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-red-500 focus:bg-[#151515] transition-all" />
              {/* suppressHydrationWarning aggiunto per evitare conflitti con le estensioni del browser */}
              <input type="email" suppressHydrationWarning placeholder="Email" value={fields.email} onChange={(e) => setFields({...fields, email: e.target.value})} className="bg-[#111] border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-red-500 focus:bg-[#151515] transition-all" />
            </div>
            <textarea placeholder="Il tuo messaggio..." rows={4} value={fields.messaggio} onChange={(e) => setFields({...fields, messaggio: e.target.value})} className="w-full bg-[#111] border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-red-500 focus:bg-[#151515] transition-all"></textarea>
            <button type="submit" className="w-full bg-[#00ced1] text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#00a8a8] hover:shadow-[0_0_20px_rgba(0,206,209,0.4)] transition-all" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Stiamo inviando...
                </span>
              ) : (
                <>
                  <PaperPlaneTilt size={20} strokeWidth={2.25} />
                  Invia Richiesta
                </>
              )}
            </button>
            {sent && (
              <p className="text-[#00ced1] text-sm font-medium text-center mt-4">
                Messaggio inviato! Ti risponderemo presto.
              </p>
            )}
          </form>
        </div>

        {/* COLONNA DESTRA: Info & Prenotazione */}
        <div className="flex flex-col justify-between py-2">
          <div className={`${cardStyle} p-10 bg-indigo-900/5 border-indigo-500/20 mb-12 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full" />
            <h4 className="text-2xl font-bold mb-4 flex items-center gap-3 italic text-white z-10 relative">
              <CalendarBlank weight="duotone" className="text-indigo-400"/> Prenota Online
            </h4>
            <p className="text-gray-400 mb-8 leading-relaxed relative z-10">
              Scegli il tuo slot per la lezione conoscitiva gratuita di 30 minuti. Semplice, digitale, diretto.
            </p>
            <a
              href="https://calendly.com/musicanovastudio/lezione-di-prova-gratuita"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-indigo-600 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 relative z-10 text-center"
            >
              Apri Calendario
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-4 text-gray-400">
              <p className="flex items-center gap-3 hover:text-white transition-colors">
                <MapPin size={18} className="text-red-500"/> Via del Rio 9, Ponticella (BO)
              </p>
              {/* Trasformato in tag <a> con mailto: per UX Mobile */}
              <a href="mailto:musicanovastudio@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                <Envelope size={18} className="text-red-500"/> musicanovastudio@gmail.com
              </a>
              <a href="tel:+393464005500" 
   className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
  <Phone size={18} className="text-red-500"/>
  +39 346 400 5500
</a>
            </div>
            <div className="flex gap-4">
              {/* Aggiunti aria-label per Accessibilità e SEO */}
              <a href="https://www.youtube.com/@FrancescoMorrealeMusicaNova" target="_blank" rel="noopener noreferrer" aria-label="Canale YouTube MusicaNova Studio" className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center text-white border border-white/5 hover:bg-red-600 hover:border-red-600 transition-all duration-300">
                <YoutubeLogo weight="duotone" size={20}/>
              </a>
              <a href="https://www.instagram.com/musicanova_studio/" target="_blank" rel="noopener noreferrer" aria-label="Profilo Instagram MusicaNova Studio" className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center text-white border border-white/5 hover:bg-red-600 hover:border-red-600 transition-all duration-300">
                <InstagramLogo weight="duotone" size={20}/>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61556544116760" target="_blank" rel="noopener noreferrer" aria-label="Pagina Facebook MusicaNova Studio" className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center text-white border border-white/5 hover:bg-red-600 hover:border-red-600 transition-all duration-300">
                <FacebookLogo weight="duotone" size={20}/>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs font-mono uppercase tracking-[0.2em]">
        <p>© 2026 MusicaNova Studio</p>
        <p>Phygital Music Academy</p>
        <p className="flex items-center gap-2 flex-wrap justify-center">
          <span>Dev & Design</span>
          <a 
            href="https://www.ecommercelens.it" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#00ced1] hover:text-white transition-colors"
          >
            Andrea Lenzi
          </a>
          <span>&</span>
          <a 
            href="https://www.brainboxstudio.it" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#00ced1] hover:text-white transition-colors"
          >
            BrainBoxStudio
          </a>
        </p>
      </div>
    </footer>
  );
}