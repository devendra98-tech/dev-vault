import { Hero } from "@/components/home/hero";
import { CategorySection } from "@/components/home/category-section";
import { FeaturedResources } from "@/components/home/featured-resources";
import { ResourceCollection } from "@/components/home/resource-collection";
import { WhyDevVault } from "@/components/home/why-devvault";
import { LatestResources } from "@/components/home/latest-resources";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedResources />
      <ResourceCollection />
      <WhyDevVault />
      <LatestResources />
    </>
  );
}
