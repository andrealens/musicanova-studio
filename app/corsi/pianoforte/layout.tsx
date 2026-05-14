import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corso di Pianoforte | MusicaNova Studio San Lazzaro di Savena",
  description: "Lezioni di pianoforte a San Lazzaro di Savena (Bologna). Insegnante Claudio Bernardi. Dal classico al jazz, per tutte le età e livelli. Prima lezione gratuita.",
  openGraph: {
    title: "Corso di Pianoforte | MusicaNova Studio",
    description: "Lezioni di pianoforte a San Lazzaro di Savena. Dal classico al jazz, tutte le età. Prima lezione gratuita.",
    url: "https://musicanovastudio.com/corsi/pianoforte",
    images: [{
      url: "https://www.musicanovastudio.com/logo/musicanova_logo.png",
      width: 800,
      height: 800,
    }],
  },
};

export default function PianoforteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
