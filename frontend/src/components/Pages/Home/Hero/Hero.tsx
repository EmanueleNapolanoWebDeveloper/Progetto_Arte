// components/home/Hero/Hero.tsx
import Image from "next/image";
import HeroBackgroundClient from "../Hero/HerobackgroundClient";
import Link from "next/link";
import { getHeroWorks } from "@/src/lib/Services/work.service";
import styles from "./hero.module.css";

export default async function Hero() {
  const heroWorks = await getHeroWorks({ limit: 4 });
  const [firstWork, ...restWorks] = heroWorks;

  return (
    <section className={styles.section}>
      {/* Immagine LCP: SEMPRE renderizzata server-side, priority */}
      <Image
        src={firstWork.imageUrl}
        alt={firstWork.title}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className={styles.heroImage}
        placeholder="blur"
        blurDataURL={firstWork.blurDataUrl}
      />

      {/* Overlay leggero per leggibilità testo */}
      <div className={styles.overlay} />

      {/* Rotazione successiva: client-only, non blocca il paint iniziale */}
      {restWorks.length > 0 && (
        <HeroBackgroundClient works={restWorks} firstWork={firstWork} />
      )}

      {/* Contenuto testuale: RSC puro, nell'HTML fin da subito */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          L&apos;arte che cerchi,
          <br />
          dall&apos;artista che la crea
        </h1>
        <p className={styles.subtitle}>
          Scopri opere fisiche e digitali selezionate, acquistate direttamente
          dagli artisti che le hanno create.
        </p>
        <div className={styles.actions}>
          <Link href="/catalogo" className={styles.primaryButton}>
            Esplora la Collezione
          </Link>
          <Link href="/come-funziona" className={styles.secondaryLink}>
            Scopri come funziona
          </Link>
        </div>
      </div>
    </section>
  );
}
