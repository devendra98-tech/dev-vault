import { Hero } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats-section";
import { ResourceLibrary } from "@/components/home/resource-library";
import { AboutCreator } from "@/components/home/about-creator";
import { FinalCta } from "@/components/home/final-cta";
import { getAllResources } from "@/data/resources";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const resources = await getAllResources();

  return (
    <>
      <Hero />
      <StatsSection resources={resources} />
      <ResourceLibrary resources={resources} />
      <AboutCreator />
      <FinalCta />
    </>
  );
}
