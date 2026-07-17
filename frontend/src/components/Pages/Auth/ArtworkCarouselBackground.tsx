// components/auth/ArtworkCarouselBackground.tsx
import Image from "next/image";
import styles from "./artworkcarouse.module.css";

const CAROUSEL_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
    alt: "Dipinto floreale classico dai toni caldi",
  },
  {
    src: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=800&q=80",
    alt: "Dipinto a olio di un paesaggio classico con figure umane",
  },
  {
    src: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=800&q=80",
    alt: "Natura morta classica con fiori e dettagli barocchi",
  },
  {
    src: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80",
    alt: "Opera d'arte astratta moderna con pennellate colorate",
  },
  {
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    alt: "Arte fluida astratta con venature blu e dorate",
  },
  {
    src: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80",
    alt: "Ritratto dipinto in stile rinascimentale",
  },
];

export function ArtworkCarouselBackground() {
  return (
    <div className={styles.carousel} aria-hidden="true">
      {CAROUSEL_IMAGES.map((img, i) => (
        <div
          key={img.src}
          className={styles.slide}
          style={{ animationDelay: `${i * 8}s` }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="100vw"
            priority={i === 0}
            className={styles.slideImage}
          />
        </div>
      ))}
      <div className={styles.overlay} />
    </div>
  );
}
