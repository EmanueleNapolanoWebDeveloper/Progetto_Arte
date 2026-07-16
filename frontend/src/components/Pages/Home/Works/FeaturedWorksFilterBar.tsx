"use client";

import { useMemo, useState } from "react";
import WorkCard from "./WorkCard";
import { Work } from "@/src/types/Auth/work";
import styles from "./FeaturedWorks.module.css";

interface FeaturedWorksFilterBarProps {
  works: Work[];
  categories: { slug: string; name: string }[];
}

export default function FeaturedWorksFilterBar({
  works,
  categories,
}: FeaturedWorksFilterBarProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredWorks = useMemo(() => {
    if (!activeCategory) return works;
    return works.filter((work) => work.categorySlug === activeCategory);
  }, [works, activeCategory]);

  return (
    <div>
      <div
        role="group"
        aria-label="Filtra opere per categoria"
        className={styles.filterGroup}
      >
        <FilterButton
          label="Tutte"
          active={activeCategory === null}
          onClick={() => setActiveCategory(null)}
        />
        {categories.map((category) => (
          <FilterButton
            key={category.slug}
            label={category.name}
            active={activeCategory === category.slug}
            onClick={() => setActiveCategory(category.slug)}
          />
        ))}
      </div>

      <ul className={styles.grid}>
        {filteredWorks.map((work, index) => (
          <WorkCard key={work.id} work={work} priority={index < 4} />
        ))}
      </ul>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={active ? styles.filterButtonActive : styles.filterButton}
    >
      {label}
    </button>
  );
}
