import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metodo Musigramma™ | MusicaNova Studio San Lazzaro di Savena",
  description: "MusicaNova Studio è tra le prime scuole in Italia ad adottare il Metodo Musigramma™. Sistema brevettato e validato scientificamente (Progetto SUNRAISE) per imparare l'armonia in modo visivo e intuitivo.",
  openGraph: {
    title: "Metodo Musigramma™ | MusicaNova Studio",
    description: "Tra le prime scuole in Italia ad adottare il Metodo Musigramma™. Brevettato, validato scientificamente, inclusivo DSA.",
    url: "https://musicanovastudio.com/musigramma",
    images: [{
      url: "https://www.musicanovastudio.com/logo/musicanova_logo.png",
      width: 800,
      height: 800,
    }],
  },
};

export default function MusigrammaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
