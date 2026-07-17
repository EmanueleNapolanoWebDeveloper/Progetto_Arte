import FeaturedCategories from "@/src/components/Pages/Home/FeaturedCategories/FeaturedCategories";
import FeaturedCategoriesSkeleton from "@/src/components/Pages/Home/FeaturedCategories/FeaturedCategoriesSkeleton";
import Hero from "@/src/components/Pages/Home/Hero/Hero";
import ValuePropStrip from "@/src/components/Pages/Home/ValuePropsStrip/ValuePropStrip";
import { Suspense } from "react";
import FeaturedWorksSkeleton from "../../src/components/Pages/Home/Works/FeaturedWorksSkeleton";
import FeaturedWorksGrid from "@/src/components/Pages/Home/Works/FeaturedWorksGrid";
import ArtistSpotlightSkeleton from "@/src/components/Pages/Home/ArtistSpotlight/ArtistSpotlightSkeleton";
import ArtistSpotlight from "@/src/components/Pages/Home/ArtistSpotlight/ArtistSpotlight";
import { EditorialSkeleton } from "@/src/components/Pages/Home/Editorials/EditorialsSkeleton";
import { Editorial } from "@/src/components/Pages/Home/Editorials/Editorial";
import { HowItWorks } from "@/src/components/Pages/Home/HowItWork/HowItWork";
import { Testimonials } from "@/src/components/Pages/Home/Testimonials/Testimonials";
import { CTA } from "@/src/components/Pages/Home/CTA/CTA";

export default function Home() {
  return (
    <main className="min-h-[100vh]">
      {/* HERO SECTION */}
      <Hero />

      {/*  */}
      <ValuePropStrip />

      {/* CATEGORIE */}
      <Suspense fallback={<FeaturedCategoriesSkeleton />}>
        <FeaturedCategories />
      </Suspense>

      {/* WORKS */}
      <Suspense fallback={<FeaturedWorksSkeleton />}>
        <FeaturedWorksGrid />
      </Suspense>

      {/* ARTISTI */}
      <Suspense fallback={<ArtistSpotlightSkeleton />}>
        <ArtistSpotlight />
      </Suspense>

      {/* EDITORIALE */}
      <Suspense fallback={<EditorialSkeleton />}>
        <Editorial />
      </Suspense>

      {/* HOW IT WORK */}
      <HowItWorks />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CTA */}
      <CTA />
    </main>
  );
}
