import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Resource } from "@/types/resource";
import { ResourceThumbnail } from "@/components/resources/resource-thumbnail";
import { cn } from "@/lib/utils";
import { categoryFromName } from "@/data/categories";

type ResourceCardProps = {
  resource: Resource;
  className?: string;
  featured?: boolean;
};

export function ResourceCard({
  resource,
  className,
  featured = false,
}: ResourceCardProps) {
  const category = categoryFromName(resource.category);
  const categoryHref = `/categories/${category.slug}`;

  if (featured) {
    return (
      <article
        className={cn(
          "group relative overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-hover)]",
          className,
        )}
      >
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <Link
                href={categoryHref}
                className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase transition-colors hover:text-foreground"
              >
                {resource.category}
              </Link>
              <h3 className="mt-4 max-w-lg font-display text-3xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-4xl">
                <Link
                  href={`/resources/${resource.slug}`}
                  className="transition-colors hover:text-accent"
                >
                  {resource.title}
                </Link>
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                {resource.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                {resource.pages ? <span>{resource.pages} pages</span> : null}
                <span>{resource.difficulty}</span>
                <span>{resource.type}</span>
              </div>
            </div>
            <Link
              href={`/resources/${resource.slug}`}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-transform duration-200 group-hover:translate-x-0.5 dark:bg-foreground dark:text-background"
            >
              View resource
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="relative min-h-[200px] border-t border-border p-4 lg:min-h-full lg:border-t-0 lg:border-l">
            <ResourceThumbnail
              category={resource.category}
              title={resource.title}
              className="h-full min-h-[220px] rounded-2xl"
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-hover)]",
        className,
      )}
    >
      <Link href={`/resources/${resource.slug}`} className="block p-3 pb-0">
        <ResourceThumbnail
          category={resource.category}
          title={resource.title}
          compact
          className="transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={categoryHref}
            className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase"
          >
            {resource.category}
          </Link>
          <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </div>

        <h3 className="mt-3 font-display text-xl leading-tight font-semibold tracking-tight text-foreground">
          <Link
            href={`/resources/${resource.slug}`}
            className="transition-colors hover:text-accent"
          >
            {resource.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {resource.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-4 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
          {resource.pages ? <span>{resource.pages} pages</span> : null}
          <span>{resource.difficulty}</span>
        </div>

        <Link
          href={`/resources/${resource.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          View resource
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
