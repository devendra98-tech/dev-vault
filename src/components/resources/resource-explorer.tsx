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

const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced"] as const;

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

  const filterDifficulties = useMemo(() => {
    const available = DIFFICULTY_OPTIONS.filter((level) =>
      resources.some((resource) => resource.difficulty.includes(level)),
    );
    return ["All", ...available];
  }, [resources]);

  const filterTypes = useMemo(() => {
    const unique = Array.from(
      new Set(
        resources
          .map((resource) => resource.type.trim())
          .filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, [resources]);

  const safeFilters = useMemo(() => {
    const category = filterCategories.includes(filters.category)
      ? filters.category
      : "All";
    const difficulty = filterDifficulties.includes(filters.difficulty)
      ? filters.difficulty
      : "All";
    const type = filterTypes.includes(filters.type) ? filters.type : "All";
    return { category, difficulty, type };
  }, [filters, filterCategories, filterDifficulties, filterTypes]);

  const filtered = useMemo(
    () =>
      filterResources(resources, query, {
        category: safeFilters.category,
        difficulty: safeFilters.difficulty,
        type: safeFilters.type,
      }),
    [resources, query, safeFilters],
  );

  return (
    <div className="space-y-8">
      <ResourceSearch value={query} onChange={setQuery} />
      <ResourceFilters
        value={safeFilters}
        onChange={setFilters}
        categories={filterCategories}
        difficulties={filterDifficulties}
        types={filterTypes}
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
