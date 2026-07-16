import { HERO_WORKS_MOCK, type HeroWork } from '@/src/lib/mocks/hero-work.mocks';

/**
 * MOCK — sostituire con chiamata reale all'API Laravel
 * (es. GET /api/works/featured?context=hero&limit=4)
 * quando lo schema DB e l'endpoint saranno pronti.
 */
export async function getHeroWorks({
  limit = 4,
}: {
  limit?: number;
}): Promise<HeroWork[]> {
  return HERO_WORKS_MOCK.slice(0, limit);
}