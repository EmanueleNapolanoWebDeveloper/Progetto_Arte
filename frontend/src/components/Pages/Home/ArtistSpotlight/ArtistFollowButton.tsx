// src/components/Pages/Home/ArtistSpotlight/ArtistFollowButton.tsx
"use client";

import { useState, useTransition } from "react";
import styles from "./ArtistSpotlight.module.css";

interface ArtistFollowButtonProps {
  artistId: string;
  initialState?: boolean;
}

export default function ArtistFollowButton({ artistId, initialState = false }: ArtistFollowButtonProps) {
  const [active, setActive] = useState(initialState);
  const [isPending, startTransition] = useTransition();

  function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    
    const nextState = !active;
    setActive(nextState); // Aggiornamento ottimistico dello stato dell'interfaccia

    startTransition(async () => {
      try {
        // Simulazione chiamata API (con relativo endpoint fittizio)
        const response = await fetch(`/api/artists/${artistId}/follow`, {
          method: nextState ? "POST" : "DELETE",
        });
        
        if (!response.ok) {
          throw new Error("Errore nel salvataggio della preferenza");
        }
      } catch (error) {
        // In caso di errore ripristiniamo lo stato precedente
        setActive(!nextState);
      }
    });
  }

  return (
    <button
      onClick={handleToggle}
      className={`${styles.followButton} ${
        active ? styles.followButtonActive : styles.followButtonInactive
      }`}
      aria-label={active ? `Smetti di seguire l'artista` : `Segui l'artista`}
      aria-pressed={active}
      disabled={isPending}
    >
      {active ? "Segui già" : "Segui"}
    </button>
  );
}