import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi Siamo | MusicaNova Studio San Lazzaro di Savena",
  description: "Francesco Morreale e Claudio Bernardi: due musicisti e insegnanti a Ponticella, San Lazzaro di Savena. Scopri la storia di MusicaNova Studio e la nostra filosofia didattica.",
  openGraph: {
    title: "Chi Siamo | MusicaNova Studio",
    description: "Francesco Morreale e Claudio Bernardi, musicisti e insegnanti a San Lazzaro di Savena. La storia di MusicaNova Studio.",
    url: "https://musicanovastudio.com/chi-siamo",
    images: [{
      url: "https://www.musicanovastudio.com/logo/musicanova_logo.png",
      width: 800,
      height: 800,
    }],
  },
};

export default function ChiSiamoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
