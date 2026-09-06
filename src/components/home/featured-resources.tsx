import Link from "next/link";
import { ResourceCard } from "@/components/resources/resource-card";
import { getFeaturedResources } from "@/data/resources";

export async function FeaturedResources() {
  const resources = await getFeaturedResources();
  const [primary, ...rest] = resources;

  if (!primary) return null;

  return (
    <section className="border-y border-border bg-muted/25 py-14 sm:py-20">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              Featured
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Start here
            </h2>
          </div>
          <Link
            href="/resources"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse library →
          </Link>
        </div>

        <ResourceCard resource={primary} featured />

        {rest.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(0, 3).map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
