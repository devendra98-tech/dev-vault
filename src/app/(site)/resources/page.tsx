import type { Metadata } from "next";
import { Suspense } from "react";
import { ResourceExplorer } from "@/components/resources/resource-explorer";
import { getAllResources } from "@/data/resources";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Browse developer notes, guides, cheat sheets, roadmaps and practical resources.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Resources | DevVault",
    description:
      "Browse developer notes, guides, cheat sheets, roadmaps and practical resources.",
    url: "/resources",
  },
};

export default async function ResourcesPage() {
  const resources = await getAllResources();

  return (
    <div className="container-page py-10 sm:py-16">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          Resources
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Free Notes & Learning Guides
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Search and filter the library. Preview notes instantly or download the
          PDF.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
            Loading library...
          </div>
        }
      >
        <ResourceExplorer resources={resources} showAdvancedFilters />
      </Suspense>
    </div>
  );
}
