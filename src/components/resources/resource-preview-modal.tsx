"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { Download, ExternalLink, X } from "lucide-react";
import type { Resource } from "@/types/resource";
import { ResourceMedia } from "@/components/resources/resource-media";
import { Button } from "@/components/ui/button";
import { hasDownloadablePdf } from "@/lib/utils";

type ResourcePreviewModalProps = {
  resource: Resource | null;
  onClose: () => void;
};

export function ResourcePreviewModal({
  resource,
  onClose,
}: ResourcePreviewModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!resource) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [resource, onClose]);

  if (!resource) return null;

  const canDownload = hasDownloadablePdf(resource.pdfUrl);
  const description = resource.longDescription ?? resource.description;
  const hasMeta = Boolean(
    resource.difficulty || resource.type || resource.pages,
  );

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 cursor-pointer bg-black/50 backdrop-blur-[2px]"
        aria-label="Close preview"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="modal-in relative z-10 flex h-[min(100dvh,100%)] w-full max-w-[760px] flex-col overflow-hidden bg-card shadow-[var(--shadow-hover)] sm:h-auto sm:max-h-[85vh] sm:rounded-3xl"
      >
        <div className="relative w-full shrink-0">
          <ResourceMedia
            resource={resource}
            compact
            showCaption={false}
            className="aspect-video w-full"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <span className="chip-on-media inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold">
              {resource.category}
            </span>
            <h2
              id={titleId}
              className="mt-2 line-clamp-2 font-display text-xl leading-tight font-bold text-white sm:text-2xl"
            >
              {resource.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="chip-on-media absolute top-3 right-3 inline-flex size-9 cursor-pointer items-center justify-center rounded-full shadow-sm transition-opacity hover:opacity-90"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {description ? (
            <p className="text-sm leading-relaxed break-words text-muted-foreground">
              {description}
            </p>
          ) : null}

          {hasMeta ? (
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              {resource.difficulty ? <span>{resource.difficulty}</span> : null}
              {resource.type ? <span>{resource.type}</span> : null}
              {resource.pages ? <span>{resource.pages} pages</span> : null}
            </div>
          ) : null}

          {resource.highlights && resource.highlights.length > 0 ? (
            <div className="mt-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Key topics covered
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {resource.highlights.map((item) => (
                  <li key={item} className="text-sm break-words text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {resource.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {canDownload || resource.slug ? (
          <div className="flex shrink-0 flex-col gap-2 border-t border-border p-4 sm:flex-row">
            {resource.slug ? (
              <Button asChild variant="outline" className="flex-1 cursor-pointer">
                <Link href={`/resources/${resource.slug}`} onClick={onClose}>
                  <ExternalLink className="size-4" />
                  Open Resource
                </Link>
              </Button>
            ) : null}
            {canDownload ? (
              <Button asChild className="flex-1 cursor-pointer">
                <a
                  href={resource.pdfUrl}
                  download
                  aria-label={`Download ${resource.title} PDF`}
                >
                  <Download className="size-4" />
                  Download PDF
                </a>
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
