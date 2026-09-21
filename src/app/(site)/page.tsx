import { Hero } from "@/components/home/hero";
import { CategorySection } from "@/components/home/category-section";
import { FeaturedResources } from "@/components/home/featured-resources";
import { ResourceCollection } from "@/components/home/resource-collection";
import { WhyDevVault } from "@/components/home/why-devvault";
import { LatestResources } from "@/components/home/latest-resources";
import { getAllResources } from "@/data/resources";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const resources = await getAllResources();
  const catalog = resources.map((resource) => ({
    title: resource.title,
    slug: resource.slug,
    category: resource.category,
  }));

  return (
    <>
      <Hero catalog={catalog} />
      <CategorySection />
      <FeaturedResources />
      <ResourceCollection />
      <WhyDevVault />
      <LatestResources />
    </>
  );
}
