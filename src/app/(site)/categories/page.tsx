import type { Metadata } from "next";
import Link from "next/link";
import { getCategoriesWithCounts } from "@/data/resources";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Explore developer resources by category — JavaScript, React, Next.js, TypeScript and more.",
  alternates: {
    canonical: "/categories",
  },
};

export default async function CategoriesPage() {
  const categories = await getCategoriesWithCounts();

  return (
    <div className="container-page py-10 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          Explore by category
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Find your next resource.
        </h1>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <p className="font-display text-xl font-bold">No categories yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Published notes will appear here by topic.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-0 border-t border-border md:grid-cols-2">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group border-b border-border px-1 py-8 transition-colors hover:bg-muted/60 md:odd:border-r md:px-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
                  {category.count}
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
                {category.name}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
