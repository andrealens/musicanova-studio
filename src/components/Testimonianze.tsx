"use client";

import { motion } from "framer-motion";

const recensioni = [
  {
    nome: "Laura Corsano",
    stelle: 5,
    testo: "MusicaNova è molto più di una scuola di musica: è un posto dove ti senti accolto, ascoltato e subito a tuo agio, qualsiasi sia la tua età. Gli insegnanti sono preparati, appassionati e davvero pazienti, e riescono a trasmettere l'amore per la musica con entusiasmo! Ogni lezione è coinvolgente, divertente e ti fa venire voglia di imparare sempre di più. Stra consiglio!",
    iniziale: "L",
  },
  {
    nome: "Enrico Giuliani",
    stelle: 5,
    testo: "Una scuola musicale veramente affidabile sia per la disponibilità dello staff che per la loro ottima preparazione didattica. Personalmente sono seguito per lo studio del pianoforte dal maestro Claudio. Grazie alle sue lezioni nel corso degli anni sono riuscito a cogliere quelle soddisfazioni artistiche che questo strumento riesce a trasmettere sia per quanto riguarda la musica classica che la musica pop.",
    iniziale: "E",
  },
  {
    nome: "Susanna Giardinazzi",
    stelle: 5,
    testo: "Ottimi professionisti.",
    iniziale: "S",
  },
  {
    nome: "A. Valmaggi",
    stelle: 5,
    testo: "Francesco è un insegnante di chitarra paziente, competente, pronto a correggerti e mai a scoraggiarti. Sempre gentile e con la voglia di farti stare bene con la musica. Claudio, il maestro di pianoforte è la spalla perfetta. 50 anni d'esperienza con lo strumento e simpaticissimo!",
    iniziale: "A",
  },
  {
    nome: "Massimiliano Colossi",
    stelle: 5,
    testo: "Conosco gli insegnanti di MusicaNova e so come lavorano: mettono grande passione, competenza e professionalità in quello che fanno. Attenti anche all'empatia verso gli allievi. Ho sentito solo feedback positivi da chi frequenta la scuola: ambiente serio ma tutt'altro che austero.",
    iniziale: "M",
  },
  {
    nome: "Stefano Brescia",
    stelle: 5,
    testo: "Ci sono scuole di musica e poi ci sono luoghi come questo, dove respiri musica e passione in ogni angolo. Francesco ha creato una realtà rara, fondata sulla sensibilità e sul cuore. Qui la musica non è un dovere, ma un linguaggio per esprimere chi siamo.",
    iniziale: "S",
  },
];

export default function Testimonianze() {
  return (
    <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="text-center">
        <p className="font-mono uppercase tracking-widest text-xs text-indigo-400 mb-4">
          Le parole dei nostri allievi
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
          Cosa dicono di noi
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recensioni.map((recensione, i) => (
          <motion.div
            key={recensione.nome}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-indigo-500/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm">
                {recensione.iniziale}
              </div>
              <span className="text-white font-semibold text-sm">
                {recensione.nome}
              </span>
            </div>
            <div className="text-lg text-[#f59e0b] mt-4" aria-hidden>
              ★★★★★
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mt-3">
              {recensione.testo}
            </p>
          </motion.div>
        ))}
      </div>

      <a
        href="https://maps.app.goo.gl/KmQZD9oS9ZSX4vcWA"
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-400 hover:text-white text-sm font-medium transition-colors mt-12 block text-center"
      >
        Leggi tutte le recensioni su Google →
      </a>
    </section>
  );
}
