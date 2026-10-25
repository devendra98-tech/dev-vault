"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Resource } from "@/types/resource";
import { ResourceSearch } from "@/components/resources/resource-search";
import {
  ResourceFilters,
  type ResourceFiltersState,
} from "@/components/resources/resource-filters";
import { ResourceGrid } from "@/components/resources/resource-grid";
import { ResourcePreviewModal } from "@/components/resources/resource-preview-modal";
import { filterResources } from "@/lib/resources/filter";

const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced"] as const;

type ResourceExplorerProps = {
  resources: Resource[];
  initialQuery?: string;
  initialCategory?: string;
  showAdvancedFilters?: boolean;
};

export function ResourceExplorer({
  resources,
  initialQuery = "",
  initialCategory = "All",
  showAdvancedFilters = false,
}: ResourceExplorerProps) {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("q") ?? initialQuery;
  const categoryFromUrl = searchParams.get("category") ?? initialCategory;

  const [query, setQuery] = useState(queryFromUrl);
  const [debouncedQuery, setDebouncedQuery] = useState(queryFromUrl);
  const [preview, setPreview] = useState<Resource | null>(null);
  const [filters, setFilters] = useState<ResourceFiltersState>({
    category: categoryFromUrl,
    difficulty: "All",
    type: "All",
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 250);
    return () => window.clearTimeout(timeout);
  }, [query]);

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

  const catalog = useMemo(
    () =>
      resources.map((resource) => ({
        title: resource.title,
        slug: resource.slug,
        category: resource.category,
      })),
    [resources],
  );

  const filtered = useMemo(
    () =>
      filterResources(resources, debouncedQuery, {
        category: safeFilters.category,
        difficulty: safeFilters.difficulty,
        type: safeFilters.type,
      }),
    [resources, debouncedQuery, safeFilters],
  );

  return (
    <div className="space-y-6">
      <ResourceSearch value={query} onChange={setQuery} catalog={catalog} />
      <ResourceFilters
        value={safeFilters}
        onChange={setFilters}
        categories={filterCategories}
        difficulties={filterDifficulties}
        types={filterTypes}
        showAdvanced={showAdvancedFilters}
      />
      <p
        className="text-sm text-muted-foreground"
        aria-live="polite"
      >
        Showing {filtered.length} of {resources.length}{" "}
        {resources.length === 1 ? "resource" : "resources"}
      </p>
      <ResourceGrid resources={filtered} onPreview={setPreview} />
      <ResourcePreviewModal
        resource={preview}
        onClose={() => setPreview(null)}
      />
    </div>
  );
}
