import { ResourceCard } from "@/components/resources/resource-card";
import { getLatestResources } from "@/data/resources";

export async function LatestResources() {
  const resources = await getLatestResources(3);

  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          Latest
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Recently added
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
