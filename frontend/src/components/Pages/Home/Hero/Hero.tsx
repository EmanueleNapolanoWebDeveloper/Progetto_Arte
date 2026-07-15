import Image from "next/image";
import HeroBackgroundClient from "../Hero/HerobackgroundClient";
import Link from "next/link";
import { getHeroWorks } from "@/src/lib/Services/work.service";

export default async function Hero() {
  const heroWorks = await getHeroWorks({ limit: 4 });
  const [firstWork, ...restWorks] = heroWorks;

  return (
    <section className="h-[85vh] min-h-[560px] w-full overflow-hidden">
      {/* Immagine LCP: SEMPRE renderizzata server-side, priority */}
      <Image
        src={firstWork.imageUrl}
        alt={firstWork.title}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL={firstWork.blurDataUrl}
      />

      {/* Overlay leggero per leggibilità testo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

      {/* Rotazione successiva: client-only, non blocca il paint iniziale */}
      {restWorks.length > 0 && (
        <HeroBackgroundClient works={restWorks} firstWork={firstWork} />
      )}

      {/* Contenuto testuale: RSC puro, nell'HTML fin da subito */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16 max-w-2xl">
        <h1 className="font-serif text-4xl md:text-6xl leading-tight text-white">
          L&apos;arte che cerchi,
          <br />
          dall&apos;artista che la crea
        </h1>
        <p className="mt-4 text-base md:text-lg text-white/85 max-w-md">
          Scopri opere fisiche e digitali selezionate, acquistate direttamente
          dagli artisti che le hanno create.
        </p>
        <div className="mt-8 flex items-center gap-6">
          <Link
            href="/catalogo"
            className="inline-flex items-center bg-white text-neutral-900 px-6 py-3 text-sm font-medium tracking-wide hover:bg-neutral-100 transition-colors"
          >
            Esplora la Collezione
          </Link>
          <Link
            href="/come-funziona"
            className="text-white/90 text-sm underline underline-offset-4 hover:text-white transition-colors"
          >
            Scopri come funziona
          </Link>
        </div>
      </div>
    </section>
  );
}
