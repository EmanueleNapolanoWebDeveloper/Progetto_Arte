// src/components/Pages/Home/ArtistSpotlight/ArtistCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Artist } from "@/src/types/User/Artist/artist";
import ArtistFollowButton from "./ArtistFollowButton";
import styles from "./ArtistSpotlight.module.css";

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className={styles.card} role="group" aria-roledescription="card artist">
      {/* Immagine opera rappresentativa */}
      <Link href={`/artisti/${artist.slug}`} className="block relative">
        <div className={styles.imageWrapper}>
          <Image
            src={artist.featuredWorkImageUrl}
            alt={artist.featuredWorkImageAlt}
            fill
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 400px"
            priority={false}
            className={styles.featuredImage}
          />
        </div>
      </Link>

      <div className={styles.cardContent}>
        {/* Avatar sopraelevato a metà dell'immagine superiore */}
        <div className={styles.avatarWrapper}>
          <Image
            src={artist.avatarUrl}
            alt={artist.avatarAlt}
            fill
            sizes="80px"
            className={styles.avatar}
          />
        </div>

        {/* Informazioni artista */}
        <Link href={`/artisti/${artist.slug}`} className="focus-visible:outline-accent rounded">
          <h3 className={styles.artistName}>{artist.name}</h3>
        </Link>
        <span className={styles.worksCount}>
          {artist.worksCount} opere pubblicate
        </span>
        <p className={styles.bio}>{artist.bio}</p>

        {/* Bottone Segui ottimistico */}
        <div className={styles.actions}>
          <ArtistFollowButton artistId={artist.id} initialState={artist.isFollowed} />
        </div>
      </div>
    </div>
  );
}