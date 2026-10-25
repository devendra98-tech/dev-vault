"use client";

import { useState } from "react";
import type { Resource } from "@/types/resource";
import { ResourceThumbnail } from "@/components/resources/resource-thumbnail";
import { hasCustomThumbnail } from "@/lib/resources/thumbnail-theme";
import { cn } from "@/lib/utils";

export function ResourceMedia({
  resource,
  className,
  compact = true,
  showCaption = true,
  showBadge = false,
}: {
  resource: Resource;
  className?: string;
  compact?: boolean;
  showCaption?: boolean;
  showBadge?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const rawThumbnail = resource.thumbnail?.trim() ?? "";
  const src = hasCustomThumbnail(rawThumbnail) ? rawThumbnail : "";

  if (src && !failed) {
    return (
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden bg-muted",
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <ResourceThumbnail
      title={resource.title}
      category={resource.category}
      type={resource.type}
      tags={resource.tags}
      slug={resource.slug}
      compact={compact}
      showCaption={showCaption}
      showBadge={showBadge}
      className={cn(
        "w-full transition-transform duration-500 group-hover:scale-105",
        className,
      )}
    />
  );
}
