import FeaturedCategories from "@/src/components/Pages/Home/FeaturedCategories/FeaturedCategories";
import FeaturedCategoriesSkeleton from "@/src/components/Pages/Home/FeaturedCategories/FeaturedCategoriesSkeleton";
import Hero from "@/src/components/Pages/Home/Hero/Hero";
import ValuePropStrip from "@/src/components/Pages/Home/ValuePropsStrip/ValuePropStrip";
import { Suspense } from "react";
import FeaturedWorksSkeleton from "../../src/components/Pages/Home/Works/FeaturedWorksSkeleton";
import FeaturedWorksGrid from "@/src/components/Pages/Home/Works/FeaturedWorksGrid";

export default function Home() {
  return (
    <main className="min-h-[100vh]">
      <Hero />

      <ValuePropStrip />

      <Suspense fallback={<FeaturedCategoriesSkeleton />}>
        <FeaturedCategories />
      </Suspense>

      <Suspense fallback={<FeaturedWorksSkeleton />}>
        <FeaturedWorksGrid />
      </Suspense>
    </main>
  );
}
