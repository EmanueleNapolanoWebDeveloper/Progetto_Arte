// src/components/Pages/Home/ArtistSpotlight/ArtistSpotlight.tsx
import { getFeaturedArtists } from "@/src/lib/mocks/artists.mocks";
import ArtistCard from "./ArtistCard";
import ArtistSpotlightCarousel from "./ArtistSpotlightCarousel";
import styles from "./ArtistSpotlight.module.css";

export default async function ArtistSpotlight() {
  const artists = await getFeaturedArtists();

  if (artists.length === 0) return null;

  return (
    <section
      className={styles.section}
      aria-labelledby="artist-spotlight-heading"
    >
      <div>
        <span className={styles.eyebrow} id="artist-spotlight-eyebrow">
          Community
        </span>
        <h2 id="artist-spotlight-heading" className={styles.heading}>
          Artisti da scoprire
        </h2>
      </div>

      <ArtistSpotlightCarousel>
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </ArtistSpotlightCarousel>
    </section>
  );
}
