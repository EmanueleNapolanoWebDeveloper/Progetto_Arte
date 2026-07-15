import { fetchFeaturedWorks } from "@/src/lib/repositories/work.repository";
import { Work } from "@/src/types/Auth/work";

export async function getFeaturedWorks(): Promise<Work[]> {
  const works = await fetchFeaturedWorks();
  return works.slice(0, 12);
}

/** Categorie effettivamente presenti nel set corrente, per popolare i filtri */
export function extractAvailableCategories(works: Work[]) {
  const seen = new Map<string, string>();
  for (const work of works) {
    seen.set(work.categorySlug, work.categoryName);
  }
  return Array.from(seen, ([slug, name]) => ({ slug, name }));
}
