import type { Metadata } from "next";
import { Suspense } from "react";
import { ResourceExplorer } from "@/components/resources/resource-explorer";
import { ResourceGridSkeleton } from "@/components/loading/page-skeletons";
import { Skeleton } from "@/components/ui/skeleton";
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

function ResourcesExplorerFallback() {
  return (
    <div className="space-y-6" aria-busy="true">
      <span className="sr-only">Loading library…</span>
      <Skeleton className="h-14 w-full rounded-2xl" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-24 rounded-full" />
        ))}
      </div>
      <ResourceGridSkeleton />
    </div>
  );
}

export default async function ResourcesPage() {
  const resources = await getAllResources();

  return (
    <div className="container-page py-10 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
          Resources
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Browse the library.
        </h1>
      </div>

      <Suspense fallback={<ResourcesExplorerFallback />}>
        <ResourceExplorer resources={resources} />
      </Suspense>
    </div>
  );
}
