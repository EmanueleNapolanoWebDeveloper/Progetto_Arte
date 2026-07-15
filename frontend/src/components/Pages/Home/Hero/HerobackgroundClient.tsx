"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
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
              className="object-cover"
              placeholder="blur"
              blurDataURL={work.blurDataUrl}
            />
          )}
        </div>
      ))}
    </>
  );
}
