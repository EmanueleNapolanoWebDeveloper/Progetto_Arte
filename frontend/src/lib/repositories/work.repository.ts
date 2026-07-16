import { worksFixtures } from "@/src/lib/mocks/works.mocks";
import { Work } from "@/src/types/Auth/work";
/**
 * MOCK: in attesa dell'endpoint Laravel /api/works/featured.
 */
export async function fetchFeaturedWorks(): Promise<Work[]> {
  await simulateNetworkDelay();
  return worksFixtures;
}

function simulateNetworkDelay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
