import type { Resource } from "@/types/resource";
import { ResourceCard } from "@/components/resources/resource-card";

export function ResourceGrid({
  resources,
  onPreview,
}: {
  resources: Resource[];
  onPreview?: (resource: Resource) => void;
}) {
  if (resources.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center">
        <h3 className="font-display text-2xl font-bold text-foreground">
          No resources found
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try another search
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}
