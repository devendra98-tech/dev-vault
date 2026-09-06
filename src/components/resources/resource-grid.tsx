import type { Resource } from "@/types/resource";
import { ResourceCard } from "@/components/resources/resource-card";

export function ResourceGrid({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-border-strong px-6 py-20 text-center">
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {resources.map((resource, index) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          featured={index === 0 && resources.length > 3}
          className={
            index === 0 && resources.length > 3
              ? "sm:col-span-2 lg:col-span-3"
              : undefined
          }
        />
      ))}
    </div>
  );
}
