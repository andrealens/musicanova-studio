import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Scuola | MusicaNova Studio San Lazzaro di Savena",
  description: "Scopri MusicaNova Studio a Ponticella, San Lazzaro di Savena. Ambiente familiare, metodo innovativo Musigramma™, lezioni per bambini, ragazzi e adulti. Prima lezione gratuita.",
  openGraph: {
    title: "La Scuola | MusicaNova Studio",
    description: "Ambiente familiare, metodo innovativo, lezioni per tutte le età a San Lazzaro di Savena.",
    url: "https://musicanovastudio.com/la-scuola",
    images: [{
      url: "https://www.musicanovastudio.com/logo/musicanova_logo.png",
      width: 800,
      height: 800,
    }],
  },
};

export default function LaScuolaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
