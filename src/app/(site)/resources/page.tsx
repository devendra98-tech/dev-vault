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
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
          Resources
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Everything worth keeping close while you build.
        </h1>
      </div>

      <Suspense
        fallback={
          <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
            Loading library...
          </div>
        }
      >
        <ResourceExplorer resources={resources} />
      </Suspense>
    </div>
  );
}
