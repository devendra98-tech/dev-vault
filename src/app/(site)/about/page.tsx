import type { Metadata } from "next";
import { AboutCta } from "@/components/about/about-cta";
import { AboutHero } from "@/components/about/about-hero";
import { CreatorJourney } from "@/components/about/creator-journey";
import { TechInterests } from "@/components/about/tech-interests";
import { WhyDevVault } from "@/components/about/why-devvault";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the creator behind DevVault — a free library of developer notes, cheat sheets, roadmaps, and practical programming guides.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhyDevVault />
      <TechInterests />
      <CreatorJourney />
      <AboutCta />
    </>
  );
}
