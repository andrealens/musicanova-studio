"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type CookieConsent = "granted" | "denied" | null;

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cookie_consent");
      const consent: CookieConsent =
        raw === "granted" || raw === "denied" ? raw : null;
      if (consent === null) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie_consent", "granted");
    if (typeof window.gtag !== "undefined") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
    setVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem("cookie_consent", "denied");
    if (typeof window.gtag !== "undefined") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 z-[200] w-[90vw] max-w-2xl -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-6 shadow-2xl backdrop-blur-xl"
      role="dialog"
      aria-label="Preferenze cookie"
    >
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-left">
          <h3 className="text-sm font-bold text-white">🍪 Cookie & Privacy</h3>
          <p className="mt-1 text-xs text-gray-400">
            Usiamo cookie analitici per migliorare il sito. Nessun dato venduto
            a terzi.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={rejectAll}
            className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/5"
          >
            Solo necessari
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-full bg-[#00ced1] px-5 py-2.5 text-xs font-bold text-black transition-all hover:bg-[#00a8a8]"
          >
            Accetta tutti
          </button>
        </div>
      </div>
    </div>
  );
}
