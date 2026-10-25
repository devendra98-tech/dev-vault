import { cn } from "@/lib/utils";
import {
  resolveThumbnailTheme,
  type ThumbnailThemeInput,
} from "@/lib/resources/thumbnail-theme";
import { ThumbnailIcon } from "@/components/resources/thumbnail-icons";

type ResourceThumbnailProps = ThumbnailThemeInput & {
  className?: string;
  compact?: boolean;
  showCaption?: boolean;
  showBadge?: boolean;
};

export function ResourceThumbnail({
  title,
  category,
  type,
  tags,
  slug,
  className,
  compact = true,
  showCaption = true,
  showBadge = false,
}: ResourceThumbnailProps) {
  const theme = resolveThumbnailTheme({ title, category, type, tags, slug });

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden bg-[#0f172a]",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-br",
          theme.gradient,
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.18),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/75 via-black/25 to-transparent" />

      {showBadge ? (
        <span className="chip-on-media absolute top-3 left-3 z-10 max-w-[70%] truncate rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm">
          {category}
        </span>
      ) : null}

      <ThumbnailIcon
        theme={theme.id}
        className="pointer-events-none absolute -top-10 -right-8 size-40 opacity-[0.12] sm:size-48"
      />
      <ThumbnailIcon
        theme={theme.id}
        className={cn(
          "pointer-events-none absolute top-3 right-3 drop-shadow-sm sm:top-4 sm:right-4",
          compact ? "size-16 sm:size-[4.5rem]" : "size-20 sm:size-24",
        )}
      />

      {showCaption ? (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10",
            compact ? "p-3 pr-14 sm:p-4 sm:pr-16" : "p-4 pr-16 sm:p-5 sm:pr-20",
          )}
        >
          <p className="line-clamp-1 text-[11px] font-semibold tracking-[0.14em] text-white/75 uppercase">
            {category}
          </p>
          <p className="mt-1 font-display text-base leading-snug font-bold break-words text-white sm:text-lg">
            {title}
          </p>
        </div>
      ) : null}
    </div>
  );
}
