import type { Resource } from "@/types/resource";

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
      resource.category.toLowerCase() === filters.category.toLowerCase() ||
      (filters.category === "Cheat Sheets" &&
        resource.type === "Cheat Sheet") ||
      (filters.category === "Roadmaps" && resource.type === "Roadmap") ||
      (filters.category === "Git" && resource.category === "Git & GitHub");

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
  return resource.category.toLowerCase() === categoryName.toLowerCase();
}
