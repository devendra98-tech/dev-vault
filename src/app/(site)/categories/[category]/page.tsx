import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceGrid } from "@/components/resources/resource-grid";
import { resolveCategoryBySlug } from "@/data/categories";
import { getAllResources, getResourcesByCategory } from "@/data/resources";
import { matchesCategoryName } from "@/lib/resources/filter";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const resources = await getAllResources();
  const categoryNames = resources.map((resource) => resource.category);
  const category = resolveCategoryBySlug(categorySlug, categoryNames);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} Resources`,
    description: category.description,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} Resources | DevVault`,
      description: category.description,
      url: `/categories/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const allResources = await getAllResources();
  const categoryNames = allResources.map((resource) => resource.category);
  const category = resolveCategoryBySlug(categorySlug, categoryNames);

  if (!category) {
    notFound();
  }

  const resources = await getResourcesByCategory(category.name);
  const count = resources.filter((resource) =>
    matchesCategoryName(resource, category.name),
  ).length;

  return (
    <div className="container-page py-10 sm:py-16">
      <div className="mb-10 max-w-2xl border-b border-border pb-8">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          Category
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {category.name}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {category.description}
        </p>
        <p className="mt-4 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
          {count} resource{count === 1 ? "" : "s"}
        </p>
      </div>

      {resources.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-border-strong px-6 py-20 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">
            No resources available in this category yet.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back soon or browse the full library.
          </p>
          <Link
            href="/resources"
            className="mt-6 inline-flex text-sm font-medium text-accent hover:underline"
          >
            Browse all resources
          </Link>
        </div>
      ) : (
        <ResourceGrid resources={resources} />
      )}
    </div>
  );
}
