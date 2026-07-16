import { CATEGORIES_MOCK, type Category } from "@/src/lib/mocks/categories.mocks";

/**
 * MOCK — sostituire con chiamata reale all'API Laravel
 * (es. GET /api/categories/featured) quando il DB sarà pronto.
 */
export async function getFeaturedCategories(): Promise<Category[]> {
  return CATEGORIES_MOCK;
}
