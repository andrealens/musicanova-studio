import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Band & Live | MusicaNova Studio Bologna",
  description: "Duo acustico e band live disponibili per eventi, matrimoni, feste private e locali in provincia di Bologna. Chitarra, voce e pianoforte. Blues, jazz e brani d'autore.",
  openGraph: {
    title: "Band & Live | MusicaNova Studio",
    description: "Duo acustico e band live per eventi in provincia di Bologna. Blues, jazz, brani d'autore. Contattaci per un ingaggio.",
    url: "https://musicanovastudio.com/band-live",
    images: [{
      url: "https://www.musicanovastudio.com/logo/musicanova_logo.png",
      width: 800,
      height: 800,
    }],
  },
};

export default function BandLiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
