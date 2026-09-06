import type { Resource } from "@/types/resource";
import { ResourceCard } from "@/components/resources/resource-card";

export function RelatedResources({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) return null;

  return (
    <section className="space-y-6 border-t border-border pt-12">
      <div>
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          Related
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          You may also like
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
