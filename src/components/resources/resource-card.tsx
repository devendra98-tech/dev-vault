"use client";

import Link from "next/link";
import { Download, Eye } from "lucide-react";
import type { Resource } from "@/types/resource";
import { ResourceMedia } from "@/components/resources/resource-media";
import { Button } from "@/components/ui/button";
import { categoryFromName } from "@/data/categories";
import { cn, hasDownloadablePdf, isRecentResource } from "@/lib/utils";

type ResourceCardProps = {
  resource: Resource;
  className?: string;
  featured?: boolean;
  onPreview?: (resource: Resource) => void;
};

export function ResourceCard({
  resource,
  className,
  onPreview,
}: ResourceCardProps) {
  const category = categoryFromName(resource.category);
  const canDownload = hasDownloadablePdf(resource.pdfUrl);
  const isNew = isRecentResource(resource.publishedAt);

  const media = (
    <>
      <ResourceMedia resource={resource} />
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
        <span className="chip-on-media rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm">
          {resource.category}
        </span>
        {isNew ? (
          <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
            NEW
          </span>
        ) : null}
      </div>
      <span className="chip-on-media absolute right-3 bottom-3 z-10 inline-flex size-8 cursor-pointer items-center justify-center rounded-full opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
        <Eye className="size-4" aria-hidden="true" />
      </span>
    </>
  );

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]",
        className,
      )}
    >
      {onPreview ? (
        <button
          type="button"
          onClick={() => onPreview(resource)}
          className="relative block w-full cursor-pointer overflow-hidden text-left"
          aria-label={`Preview ${resource.title}`}
        >
          {media}
        </button>
      ) : (
        <Link
          href={`/resources/${resource.slug}`}
          className="relative block overflow-hidden"
          aria-label={`Open ${resource.title}`}
        >
          {media}
        </Link>
      )}

      <div className="flex flex-1 flex-col p-5">
        <Link
          href={`/categories/${category.slug}`}
          className="text-[11px] font-semibold tracking-wide text-accent uppercase"
        >
          {resource.category}
        </Link>
        <h3 className="mt-2 font-display text-lg leading-snug font-bold tracking-tight text-foreground">
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

        <div className="mt-3 flex flex-wrap gap-1.5">
          {resource.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {resource.difficulty ? (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
              {resource.difficulty}
            </span>
          ) : null}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {onPreview ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onPreview(resource)}
            >
              <Eye className="size-3.5" />
              Preview
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link href={`/resources/${resource.slug}`}>
                <Eye className="size-3.5" />
                Preview
              </Link>
            </Button>
          )}
          {canDownload ? (
            <Button asChild size="sm">
              <a
                href={resource.pdfUrl}
                download
                aria-label={`Download ${resource.title} PDF`}
              >
                <Download className="size-3.5" />
                Download PDF
              </a>
            </Button>
          ) : (
            <Button asChild size="sm" variant="outline">
              <Link href={`/resources/${resource.slug}`}>Open</Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
