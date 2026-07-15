"use client";

import { useMemo, useState } from "react";
import WorkCard from "./WorkCard";
import { Work } from "@/src/types/Auth/work";

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
        className="flex flex-wrap gap-2"
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

      <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
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
      className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
        active
          ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
          : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
      }`}
    >
      {label}
    </button>
  );
}
