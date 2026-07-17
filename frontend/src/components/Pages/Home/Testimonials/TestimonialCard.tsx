import { Testimonial } from "./Testimonials";

import styles from "./Testimonials.module.css";

export default function TestimonialCard({
  testimonial,
  ariaHidden,
}: {
  testimonial: Testimonial;
  ariaHidden?: boolean;
}) {
  return (
    <blockquote
      className={styles.card}
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>
      <footer className={styles.footer}>
        <span className={styles.authorName}>{testimonial.authorName}</span>
        <span className={styles.authorRole}>{testimonial.authorRole}</span>
      </footer>
    </blockquote>
  );
}
