import { worksFixtures } from "@/src/lib/mocks/works.mocks";
import FeaturedWorksFilterBar from "./FeaturedWorksFilterBar";
import styles from "./FeaturedWorks.module.css";

function extractAvailableCategories(works: typeof worksFixtures) {
  const seen = new Map<string, string>();
  for (const work of works) {
    seen.set(work.categorySlug, work.categoryName);
  }
  return Array.from(seen, ([slug, name]) => ({ slug, name }));
}

export default function FeaturedWorksGrid() {
  const works = worksFixtures;

  if (works.length === 0) return null;

  const categories = extractAvailableCategories(works);

  return (
    <section
      aria-labelledby="featured-works-heading"
      className={styles.section}
    >
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>In evidenza</p>
          <h2 id="featured-works-heading" className={styles.heading}>
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
