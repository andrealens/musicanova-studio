import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corso di Chitarra | MusicaNova Studio San Lazzaro di Savena",
  description: "Lezioni di chitarra elettrica e acustica a San Lazzaro di Savena (Bologna). Insegnante Francesco Morreale. Adatto a principianti e avanzati, tutte le età. Prima lezione gratuita.",
  openGraph: {
    title: "Corso di Chitarra | MusicaNova Studio",
    description: "Lezioni di chitarra elettrica e acustica a San Lazzaro di Savena. Prima lezione gratuita.",
    url: "https://musicanovastudio.com/corsi/chitarra",
    images: [{
      url: "https://www.musicanovastudio.com/logo/musicanova_logo.png",
      width: 800,
      height: 800,
    }],
  },
};

export default function ChitarraLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
