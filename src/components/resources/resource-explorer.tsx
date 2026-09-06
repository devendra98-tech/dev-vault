"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Resource } from "@/types/resource";
import { ResourceSearch } from "@/components/resources/resource-search";
import {
  ResourceFilters,
  type ResourceFiltersState,
} from "@/components/resources/resource-filters";
import { ResourceGrid } from "@/components/resources/resource-grid";
import { filterResources } from "@/lib/resources/filter";

type ResourceExplorerProps = {
  resources: Resource[];
  initialQuery?: string;
  initialCategory?: string;
};

export function ResourceExplorer({
  resources,
  initialQuery = "",
  initialCategory = "All",
}: ResourceExplorerProps) {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("q") ?? initialQuery;
  const categoryFromUrl = searchParams.get("category") ?? initialCategory;

  const [query, setQuery] = useState(queryFromUrl);
  const [filters, setFilters] = useState<ResourceFiltersState>({
    category: categoryFromUrl,
    difficulty: "All",
    type: "All",
  });

  const filterCategories = useMemo(() => {
    const unique = Array.from(
      new Set(
        resources
          .map((resource) => resource.category.trim())
          .filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, [resources]);

  const filtered = useMemo(
    () =>
      filterResources(resources, query, {
        category: filters.category,
        difficulty: filters.difficulty,
        type: filters.type,
      }),
    [resources, query, filters],
  );

  return (
    <div className="space-y-8">
      <ResourceSearch value={query} onChange={setQuery} />
      <ResourceFilters
        value={filters}
        onChange={setFilters}
        categories={filterCategories}
      />
      <p
        className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase"
        aria-live="polite"
      >
        {filtered.length} resource{filtered.length === 1 ? "" : "s"} found
      </p>
      <ResourceGrid resources={filtered} />
    </div>
  );
}
