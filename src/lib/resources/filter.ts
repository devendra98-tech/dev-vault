import type { Resource } from "@/types/resource";
import { normalizeCategoryKey } from "@/data/categories";

export function filterResources(
  resources: Resource[],
  query: string,
  filters?: {
    category?: string;
    difficulty?: string;
    type?: string;
  },
): Resource[] {
  const normalizedQuery = query.trim().toLowerCase();

  return resources.filter((resource) => {
    const matchesQuery =
      !normalizedQuery ||
      resource.title.toLowerCase().includes(normalizedQuery) ||
      resource.description.toLowerCase().includes(normalizedQuery) ||
      resource.category.toLowerCase().includes(normalizedQuery) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

    const matchesCategory =
      !filters?.category ||
      filters.category === "All" ||
      matchesCategoryName(resource, filters.category) ||
      (filters.category === "Git" &&
        normalizeCategoryKey(resource.category) ===
          normalizeCategoryKey("Git & GitHub"));

    const matchesDifficulty =
      !filters?.difficulty ||
      filters.difficulty === "All" ||
      resource.difficulty.includes(filters.difficulty);

    const matchesType =
      !filters?.type ||
      filters.type === "All" ||
      resource.type === filters.type;

    return matchesQuery && matchesCategory && matchesDifficulty && matchesType;
  });
}

export function sortByPublishedAt(resources: Resource[]): Resource[] {
  return [...resources].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function matchesCategoryName(
  resource: Resource,
  categoryName: string,
): boolean {
  if (categoryName === "Cheat Sheets") {
    return resource.type === "Cheat Sheet";
  }
  if (categoryName === "Roadmaps") {
    return resource.type === "Roadmap";
  }

  const resourceKey = normalizeCategoryKey(resource.category);
  const categoryKey = normalizeCategoryKey(categoryName);

  if (resourceKey === categoryKey) {
    return true;
  }

  // Legacy shorthand used in older filters
  if (
    categoryKey === "git" &&
    resourceKey === normalizeCategoryKey("Git & GitHub")
  ) {
    return true;
  }

  return false;
}
