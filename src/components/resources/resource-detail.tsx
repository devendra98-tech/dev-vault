import Link from "next/link";
import { Check, Download, Eye } from "lucide-react";
import type { Resource } from "@/types/resource";
import { Button } from "@/components/ui/button";
import { ResourceThumbnail } from "@/components/resources/resource-thumbnail";
import { categoryFromName } from "@/data/categories";

export function ResourceDetail({ resource }: { resource: Resource }) {
  const category = categoryFromName(resource.category);

  return (
    <div className="space-y-10">
      <nav aria-label="Breadcrumb" className="overflow-x-auto">
        <ol className="flex min-w-max items-center gap-2 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
          <li>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/resources" className="hover:text-foreground">
              Resources
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/categories/${category.slug}`}
              className="hover:text-foreground"
            >
              {resource.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="max-w-[10rem] truncate text-foreground sm:max-w-none">
            {resource.title}
          </li>
        </ol>
      </nav>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
            {resource.category}
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-[1.02] font-bold tracking-tight text-foreground sm:text-5xl">
            {resource.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            {resource.longDescription ?? resource.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-y border-border py-4 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            {resource.pages ? <span>{resource.pages} pages</span> : null}
            <span>{resource.difficulty}</span>
            <span>{resource.type}</span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a
                href={resource.pdfUrl}
                download
                aria-label={`Download ${resource.title} PDF`}
              >
                <Download className="size-4" />
                Download PDF
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <a
                href={resource.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${resource.title} PDF`}
              >
                <Eye className="size-4" />
                View PDF
              </a>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card p-3 shadow-[var(--shadow)] sm:p-4">
          <ResourceThumbnail
            category={resource.category}
            title={resource.title}
            className="min-h-[280px] rounded-[1.1rem] sm:min-h-[340px]"
          />
          <p className="mt-3 px-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            Resource preview
          </p>
        </div>
      </section>

      {resource.highlights && resource.highlights.length > 0 ? (
        <section className="rounded-[1.5rem] border border-border bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            What&apos;s inside
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {resource.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
