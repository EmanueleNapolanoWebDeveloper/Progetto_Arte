import { categoriesFixtures } from "@/src/lib/mocks/work.categories.mocks";

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  worksCount: number;
  imageUrl: string;
  imageAlt: string;
}

/**
 * MOCK: in attesa dell'endpoint Laravel /api/categories/featured.
 * Il ritardo simulato aiuta a testare Suspense/skeleton fin da ora.
 * Sostituire il corpo di questa funzione con la vera fetch quando
 * il backend è pronto: la firma resta identica, nulla a valle cambia.
 */
export async function fetchFeaturedCategories(): Promise<Category[]> {
  await simulateNetworkDelay();
  return categoriesFixtures;
}

function simulateNetworkDelay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
