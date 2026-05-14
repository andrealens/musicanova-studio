"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    if (typeof window.gtag === "undefined") return;
    const url = search ? `${pathname}?${search}` : pathname;
    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: url,
    });
  }, [pathname, search]);

  return null;
}

export default function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
