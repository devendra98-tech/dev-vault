import type { MetadataRoute } from "next";
import { getAllResources, getCategoriesWithCounts } from "@/data/resources";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const resources = await getAllResources();
  const resourceRoutes = resources.map((resource) => ({
    url: `${baseUrl}/resources/${resource.slug}`,
    lastModified: new Date(resource.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryList = await getCategoriesWithCounts();
  const categoryRoutes = categoryList.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...resourceRoutes, ...categoryRoutes];
}
