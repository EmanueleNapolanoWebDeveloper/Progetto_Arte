// src/components/Pages/Home/ArtistSpotlight/ArtistSpotlightCarousel.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./ArtistSpotlight.module.css";

interface ArtistSpotlightCarouselProps {
  children: React.ReactNode;
}

export default function ArtistSpotlightCarousel({ children }: ArtistSpotlightCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Aggiorna lo stato delle frecce di navigazione in base allo scroll reale
  const checkScrollState = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      // 2px di tolleranza per gestire arrotondamenti decimali dei pixel
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollState, { passive: true });
      // Controllo iniziale (es. ridimensionamenti)
      checkScrollState();
      
      const resizeObserver = new ResizeObserver(() => checkScrollState());
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener("scroll", checkScrollState);
        resizeObserver.disconnect();
      };
    }
  }, []);

  const handleScroll = (direction: "prev" | "next") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.75; // Scorri di 3/4 di schermo
      const directionMultiplier = direction === "prev" ? -1 : 1;
      container.scrollBy({
        left: scrollAmount * directionMultiplier,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Bottone Sinistra */}
      <button
        onClick={() => handleScroll("prev")}
        className={`${styles.navButton} ${styles.navButtonPrev}`}
        aria-label="Artisti precedenti"
        disabled={!canScrollLeft}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Contenitore nativo a scroll snap */}
      <div 
        ref={scrollContainerRef} 
        className={styles.carousel}
        tabIndex={0}
        aria-label="Carosello artisti in evidenza"
      >
        {children}
      </div>

      {/* Bottone Destra */}
      <button
        onClick={() => handleScroll("next")}
        className={`${styles.navButton} ${styles.navButtonNext}`}
        aria-label="Prossimi artisti"
        disabled={!canScrollRight}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}