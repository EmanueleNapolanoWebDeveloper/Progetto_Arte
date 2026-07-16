// src/components/Pages/Home/ArtistSpotlight/ArtistSpotlightSkeleton.tsx
import styles from "./ArtistSpotlight.module.css";

export default function ArtistSpotlightSkeleton() {
  const skeletonCards = Array.from({ length: 4 });

  return (
    <div className={styles.section} aria-hidden="true">
      <div className="animate-pulse">
        <div className="h-4 w-28 bg-border rounded" />
        <div className="mt-2 h-10 w-64 bg-border rounded sm:h-11" />
      </div>

      <div className="mt-12 flex gap-6 overflow-hidden">
        {skeletonCards.map((_, i) => (
          <div
            key={i}
            className={`${styles.card} animate-pulse border-border/60`}
          >
            {/* Sfondo finto opera */}
            <div className="aspect-[3/4] w-full bg-border/40" />

            <div className="p-6 flex flex-col items-center">
              {/* Finto avatar */}
              <div className="relative -mt-16 h-20 w-20 rounded-full border-4 border-card bg-border/60" />
              {/* Nome */}
              <div className="mt-4 h-5 w-32 bg-border/50 rounded" />
              {/* Opere pubblicate */}
              <div className="mt-2 h-3.5 w-24 bg-border/40 rounded" />
              {/* Bio */}
              <div className="mt-4 space-y-2 w-full px-2">
                <div className="h-3 w-full bg-border/40 rounded" />
                <div className="h-3 w-4/5 mx-auto bg-border/40 rounded" />
              </div>
              {/* Bottone */}
              <div className="mt-6 w-full pt-4 border-t border-border/40 flex justify-center">
                <div className="h-10 w-full bg-border/50 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}