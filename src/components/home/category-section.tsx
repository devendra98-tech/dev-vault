import Link from "next/link";
import { getCategoriesWithCounts } from "@/data/resources";

const blurbs: Record<string, string> = {
  JavaScript: "Language fundamentals & modern JS",
  React: "Components, hooks & patterns",
  "Next.js": "Modern full-stack React",
  TypeScript: "Safer types for everyday code",
  "Node.js": "Backend fundamentals & APIs",
  "HTML & CSS": "Layout, styling & modern CSS",
  "Git & GitHub": "Version control essentials",
  "Interview Preparation": "Questions worth practicing",
  "Cheat Sheets": "Quick-reference sheets",
  Roadmaps: "Clear learning paths",
};

export async function CategorySection() {
  const categories = (await getCategoriesWithCounts()).slice(0, 8);

  return (
    <section className="container-page py-14 sm:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Browse
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Popular Categories
          </h2>
        </div>
        <Link
          href="/categories"
          className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
        >
          View all →
        </Link>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 transition-colors hover:bg-muted/40 sm:gap-6 sm:py-5"
          >
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-xl">
                {category.name}
              </h3>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {blurbs[category.name] ?? category.description}
              </p>
            </div>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {category.count}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1 sm:hidden">
        {categories.map((category) => (
          <Link
            key={`pill-${category.id}`}
            href={`/categories/${category.slug}`}
            className="shrink-0 rounded-full border border-border bg-card px-3.5 py-2 text-xs text-foreground"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
