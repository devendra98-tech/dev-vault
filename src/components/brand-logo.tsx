import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function BrandLogo({
  size = 40,
  className,
  showName = true,
}: {
  size?: number;
  className?: string;
  showName?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={siteConfig.logo}
        alt=""
        width={size}
        height={size}
        className="rounded-full border border-border object-cover"
        style={{ width: size, height: size }}
      />
      {showName ? (
        <span className="font-display text-base font-bold tracking-tight text-foreground">
          {siteConfig.name}
        </span>
      ) : null}
    </span>
  );
}
