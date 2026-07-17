import styles from "./Testimonials.module.css";

import TestimonialCard from "./TestimonialCard";

export type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string; // es. "Collezionista" o "Artista"
};

const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Ho trovato la mia prima opera originale in pochi giorni. Il processo d'acquisto è stato semplice e trasparente.",
    authorName: "Giulia Ferrante",
    authorRole: "Collezionista",
  },
  {
    id: "t2",
    quote:
      "Come artista, finalmente ho una vetrina che valorizza il mio lavoro senza commissioni assurde.",
    authorName: "Marco Bianchi",
    authorRole: "Artista",
  },
  {
    id: "t3",
    quote:
      "Il certificato di autenticità incluso mi ha dato la sicurezza che cercavo per il mio primo acquisto importante.",
    authorName: "Alessandro Conti",
    authorRole: "Collezionista",
  },
  {
    id: "t4",
    quote:
      "La dashboard per gestire ordini e spedizioni è intuitiva: dedico più tempo a dipingere che alla burocrazia.",
    authorName: "Sara Moretti",
    authorRole: "Artista",
  },
  {
    id: "t5",
    quote:
      "Spedizione impeccabile e imballaggio curatissimo. Si vede che l'attenzione al dettaglio è reale.",
    authorName: "Elena Ricci",
    authorRole: "Collezionista",
  },
  {
    id: "t6",
    quote:
      "In tre mesi ho venduto più opere qui che in un anno di fiere. La visibilità è tutta un'altra cosa.",
    authorName: "Davide Russo",
    authorRole: "Artista",
  },
];

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Testimonianze</p>
        <h2 id="testimonials-heading" className={styles.title}>
          Cosa dice la community
        </h2>
      </div>

      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {/* Set 1 */}
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
          {/* Set 2 — duplicato per loop seamless, nascosto agli screen reader */}
          {testimonials.map((t) => (
            <TestimonialCard key={`${t.id}-dup`} testimonial={t} ariaHidden />
          ))}
        </div>
      </div>
    </section>
  );
}
