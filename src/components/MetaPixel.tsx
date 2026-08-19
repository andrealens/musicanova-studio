"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    fbq?: {
      (...args: unknown[]): void;
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
    _fbq?: Window["fbq"];
    __metaPixelInitialized?: boolean;
  }
}

type CookieConsent = "granted" | "denied" | null;

const PIXEL_ID = "28057903127212070";
const CONSENT_KEY = "cookie_consent";

function readConsent(): CookieConsent {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw === "granted" || raw === "denied" ? raw : null;
  } catch {
    return null;
  }
}

export default function MetaPixel() {
  const [hasMarketingConsent, setHasMarketingConsent] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setHasMarketingConsent(readConsent() === "granted");
    };

    syncConsent();

    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY) {
        syncConsent();
      }
    };

    const originalSetItem = window.localStorage.setItem.bind(window.localStorage);
    window.localStorage.setItem = ((key: string, value: string) => {
      originalSetItem(key, value);
      if (key === CONSENT_KEY) {
        syncConsent();
      }
    }) as typeof window.localStorage.setItem;

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.localStorage.setItem = originalSetItem;
    };
  }, []);

  useEffect(() => {
    if (typeof window.fbq === "function") {
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasMarketingConsent) return;
    if (!scriptLoaded) return;
    if (window.__metaPixelInitialized) return;
    if (typeof window.fbq !== "function") return;

    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
    window.__metaPixelInitialized = true;
  }, [hasMarketingConsent, scriptLoaded]);

  if (!hasMarketingConsent) return null;

  return (
    <>
      <Script
        id="meta-pixel-script"
        src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <Script id="meta-pixel-bootstrap" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s){
  if(f.fbq) return;
  n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq) f._fbq=n;
  n.push=n;
  n.loaded=!0;
  n.version='2.0';
  n.queue=[];
}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        `.trim()}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
