"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./hero.module.css";

type Work = { imageUrl: string; title: string; blurDataUrl: string };

export default function HeroBackgroundClient({
  works,
  firstWork,
}: {
  works: Work[];
  firstWork: Work;
}) {
  const all = [firstWork, ...works];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % all.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [all.length]);

  return (
    <>
      {all.map((work, i) => (
        <div
          key={work.imageUrl}
          className={`${styles.slide} ${i === activeIndex ? styles.slideActive : ""}`}
          aria-hidden={i !== activeIndex}
        >
          {/* i === 0 già renderizzata dal server come priority, qui la
              "ridisegniamo" solo per la transizione, senza priority per
              non duplicare il preload */}
          {i !== 0 && (
            <Image
              src={work.imageUrl}
              alt={work.title}
              fill
              sizes="100vw"
              className={styles.slideImage}
              placeholder="blur"
              blurDataURL={work.blurDataUrl}
            />
          )}
        </div>
      ))}
    </>
  );
}
