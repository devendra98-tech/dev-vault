import { categories, categoryFromName } from "@/data/categories";
import { seedResources } from "@/data/seed-resources";
import {
  matchesCategoryName,
  sortByPublishedAt,
} from "@/lib/resources/filter";
import { mapResourceRow, type ResourceRow } from "@/lib/resources/types";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Resource } from "@/types/resource";

async function fetchPublishedRows(): Promise<ResourceRow[] | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("[resources] Supabase query failed:", error.message);
      return null;
    }

    return (data ?? []) as ResourceRow[];
  } catch (error) {
    console.error("[resources] Supabase unavailable:", error);
    return null;
  }
}

export async function getAllResources(): Promise<Resource[]> {
  if (isSupabaseConfigured()) {
    const rows = await fetchPublishedRows();
    // Fail closed when connected: never mix live DB with local seed.
    return rows ? rows.map(mapResourceRow) : [];
  }
  return sortByPublishedAt(seedResources);
}

export async function getFeaturedResources(): Promise<Resource[]> {
  const resources = await getAllResources();
  return resources.filter((resource) => resource.featured);
}

export async function getLatestResources(limit = 6): Promise<Resource[]> {
  const resources = await getAllResources();
  return resources.slice(0, limit);
}

export async function getResourceBySlug(
  slug: string,
): Promise<Resource | undefined> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) {
        console.error("[resources] slug lookup failed:", error.message);
        return undefined;
      }

      // Never fall back to local seed when Supabase is connected —
      // unpublished/missing rows must not leak seed content.
      return data ? mapResourceRow(data as ResourceRow) : undefined;
    } catch (error) {
      console.error("[resources] slug lookup failed:", error);
      return undefined;
    }
  }

  return seedResources.find((resource) => resource.slug === slug);
}

export async function getResourcesByCategory(
  categoryName: string,
): Promise<Resource[]> {
  const resources = await getAllResources();
  return resources.filter((resource) =>
    matchesCategoryName(resource, categoryName),
  );
}

export async function getRelatedResources(
  resource: Resource,
  limit = 3,
): Promise<Resource[]> {
  const resources = await getAllResources();
  return resources
    .filter(
      (item) =>
        item.id !== resource.id &&
        (item.category === resource.category ||
          item.tags.some((tag) => resource.tags.includes(tag))),
    )
    .slice(0, limit);
}

export async function getCategoriesWithCounts() {
  const resources = await getAllResources();

  const staticWithCounts = categories.map((category) => ({
    ...category,
    count: resources.filter((resource) =>
      matchesCategoryName(resource, category.name),
    ).length,
  }));

  const knownNames = new Set(
    categories.map((category) => category.name.toLowerCase()),
  );

  const dynamicNames = Array.from(
    new Set(resources.map((resource) => resource.category.trim()).filter(Boolean)),
  )
    .filter((name) => !knownNames.has(name.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const dynamicWithCounts = dynamicNames.map((name) => {
    const category = categoryFromName(name);
    return {
      ...category,
      count: resources.filter((resource) =>
        matchesCategoryName(resource, name),
      ).length,
    };
  });

  return [...staticWithCounts, ...dynamicWithCounts];
}

export async function getAdminResources(): Promise<ResourceRow[]> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  const { requireAdmin } = await import("@/lib/auth/require-admin");
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ResourceRow[];
}

export async function getAdminResourceById(
  id: string,
): Promise<ResourceRow | null> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  const { requireAdmin } = await import("@/lib/auth/require-admin");
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as ResourceRow | null) ?? null;
}
