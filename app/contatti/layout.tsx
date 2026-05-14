import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti | MusicaNova Studio San Lazzaro di Savena",
  description: "Contatta MusicaNova Studio a Ponticella, San Lazzaro di Savena (Bologna). Tel: +39 346 400 5500. Email: musicanovastudio@gmail.com. Prenota la tua prima lezione gratuita.",
  openGraph: {
    title: "Contatti | MusicaNova Studio",
    description: "Contattaci per informazioni sui corsi o per prenotare la prima lezione gratuita. Via del Rio 9, Ponticella, San Lazzaro di Savena (BO).",
    url: "https://musicanovastudio.com/contatti",
    images: [{
      url: "https://www.musicanovastudio.com/logo/musicanova_logo.png",
      width: 800,
      height: 800,
    }],
  },
};

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
