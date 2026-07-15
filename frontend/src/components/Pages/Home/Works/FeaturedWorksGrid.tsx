import {
  getFeaturedWorks,
  extractAvailableCategories,
} from "@/src/lib/Services/work.categories.service";
import FeaturedWorksFilterBar from "./FeaturedWorksFilterBar";

export default async function FeaturedWorksGrid() {
  const works = await getFeaturedWorks();

  if (works.length === 0) return null;

  const categories = extractAvailableCategories(works);

  return (
    <section
      aria-labelledby="featured-works-heading"
      className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8"
    >
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
            In evidenza
          </p>
          <h2
            id="featured-works-heading"
            className="mt-3 font-serif text-3xl text-[var(--color-text-primary)] sm:text-4xl"
          >
            Opere selezionate questa settimana
          </h2>
        </div>
      </header>

      <div className="mt-10">
        <FeaturedWorksFilterBar works={works} categories={categories} />
      </div>
    </section>
  );
}
