import Link from "next/link";
import { ResourceCard } from "@/components/resources/resource-card";
import { getAllResources, getFeaturedResources } from "@/data/resources";

export async function ResourceCollection() {
  const featuredIds = new Set(
    (await getFeaturedResources()).slice(0, 4).map((resource) => resource.id),
  );
  const resources = (await getAllResources())
    .filter((resource) => !featuredIds.has(resource.id))
    .slice(0, 4);

  const display =
    resources.length >= 3
      ? resources
      : (await getAllResources()).slice(3, 7);

  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mb-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Collection
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The library
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:justify-self-end">
          A curated set of notes and guides meant to stay open beside your
          editor — not buried in bookmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {display.map((resource, index) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            className={index === 0 ? "md:col-span-2" : undefined}
            featured={index === 0}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          View all resources
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
