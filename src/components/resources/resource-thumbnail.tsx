import { cn } from "@/lib/utils";

type ResourceThumbnailProps = {
  category: string;
  title: string;
  className?: string;
  compact?: boolean;
};

function getTheme(category: string) {
  const key = category.toLowerCase();
  if (key.includes("javascript") && !key.includes("interview")) {
    return "js";
  }
  if (key.includes("react")) return "react";
  if (key.includes("node")) return "node";
  if (key.includes("type")) return "ts";
  if (key.includes("git")) return "git";
  if (key.includes("next")) return "next";
  if (key.includes("css") || key.includes("html")) return "css";
  if (key.includes("roadmap")) return "roadmap";
  if (key.includes("interview")) return "interview";
  return "default";
}

export function ResourceThumbnail({
  category,
  title,
  className,
  compact = false,
}: ResourceThumbnailProps) {
  const theme = getTheme(category);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-muted",
        compact ? "aspect-[16/10]" : "aspect-[5/3]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-40 mix-blend-multiply dark:opacity-30 dark:mix-blend-screen">
        <div className="dot-field h-full w-full" />
      </div>

      {theme === "js" ? <JsArt /> : null}
      {theme === "react" ? <ReactArt /> : null}
      {theme === "node" ? <NodeArt /> : null}
      {theme === "ts" ? <TsArt /> : null}
      {theme === "git" ? <GitArt /> : null}
      {theme === "next" ? <NextArt /> : null}
      {theme === "css" ? <CssArt /> : null}
      {theme === "roadmap" ? <RoadmapArt /> : null}
      {theme === "interview" ? <InterviewArt /> : null}
      {theme === "default" ? <DefaultArt label={category.slice(0, 2).toUpperCase()} /> : null}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-3 pt-8">
        <p className="truncate font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          {title}
        </p>
      </div>
    </div>
  );
}

function JsArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_oklab,var(--thumb-js)_18%,transparent)]">
      <div className="relative">
        <div className="absolute -inset-6 rounded-full bg-[color-mix(in_oklab,var(--thumb-js)_25%,transparent)] blur-2xl" />
        <span className="relative font-display text-5xl font-bold tracking-tight text-foreground/90 sm:text-6xl">
          JS
        </span>
        <pre className="absolute -right-8 -bottom-6 font-mono text-[10px] leading-tight text-foreground/40">
          {`const learn = () => {\n  return true\n}`}
        </pre>
      </div>
    </div>
  );
}

function ReactArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_oklab,var(--thumb-react)_12%,transparent)]">
      <svg viewBox="0 0 120 120" className="size-24 opacity-80 sm:size-28">
        <ellipse
          cx="60"
          cy="60"
          rx="18"
          ry="46"
          fill="none"
          stroke="var(--thumb-react)"
          strokeWidth="2"
          transform="rotate(0 60 60)"
        />
        <ellipse
          cx="60"
          cy="60"
          rx="18"
          ry="46"
          fill="none"
          stroke="var(--thumb-react)"
          strokeWidth="2"
          transform="rotate(60 60 60)"
        />
        <ellipse
          cx="60"
          cy="60"
          rx="18"
          ry="46"
          fill="none"
          stroke="var(--thumb-react)"
          strokeWidth="2"
          transform="rotate(120 60 60)"
        />
        <circle cx="60" cy="60" r="6" fill="var(--thumb-react)" />
      </svg>
    </div>
  );
}

function NodeArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_oklab,var(--thumb-node)_14%,transparent)]">
      <div className="grid grid-cols-3 gap-2 opacity-80">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="size-3 rounded-sm border border-[var(--thumb-node)]"
            style={{ opacity: 0.35 + (i % 3) * 0.2 }}
          />
        ))}
      </div>
      <span className="absolute font-display text-3xl font-bold text-foreground/85">
        node
      </span>
    </div>
  );
}

function TsArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_oklab,var(--thumb-ts)_16%,transparent)]">
      <div className="rounded-lg border border-[var(--thumb-ts)]/40 bg-card/60 px-4 py-3 shadow-[var(--shadow)]">
        <span className="font-display text-4xl font-bold tracking-tight text-[var(--thumb-ts)]">
          TS
        </span>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">
          type Safe = true
        </p>
      </div>
    </div>
  );
}

function GitArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_oklab,var(--thumb-git)_12%,transparent)]">
      <svg viewBox="0 0 140 100" className="w-40 opacity-90">
        <path
          d="M20 70 C40 70, 40 30, 70 30 S100 70, 120 70"
          fill="none"
          stroke="var(--thumb-git)"
          strokeWidth="2.5"
        />
        <circle cx="20" cy="70" r="5" fill="var(--thumb-git)" />
        <circle cx="70" cy="30" r="5" fill="var(--thumb-git)" />
        <circle cx="120" cy="70" r="5" fill="var(--thumb-git)" />
        <line
          x1="70"
          y1="30"
          x2="70"
          y2="70"
          stroke="var(--thumb-git)"
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity="0.5"
        />
        <circle cx="70" cy="70" r="4" fill="currentColor" className="text-foreground/50" />
      </svg>
    </div>
  );
}

function NextArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-foreground/[0.03] dark:bg-foreground/[0.04]">
      <div className="relative">
        <div className="absolute inset-0 rotate-12 border border-foreground/20" />
        <div className="-rotate-6 border border-foreground/40 bg-card px-5 py-4">
          <span className="font-display text-2xl font-bold tracking-tight">
            Next.js
          </span>
        </div>
      </div>
    </div>
  );
}

function CssArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_oklab,var(--thumb-css)_12%,transparent)]">
      <div className="space-y-2">
        <div className="h-2 w-28 rounded-full bg-[var(--thumb-css)]/70" />
        <div className="h-2 w-20 rounded-full bg-[var(--thumb-css)]/40" />
        <div className="h-2 w-24 rounded-full bg-[var(--thumb-css)]/55" />
        <div className="mt-3 font-mono text-[10px] text-muted-foreground">
          display: grid;
        </div>
      </div>
    </div>
  );
}

function RoadmapArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full border border-accent/50 bg-accent-soft font-mono text-xs text-accent">
              {n}
            </div>
            {n < 4 ? <div className="h-px w-4 bg-border-strong" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function InterviewArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-40 space-y-2 rounded-lg border border-border bg-card/70 p-3">
        <div className="h-2 w-28 rounded bg-foreground/15" />
        <div className="h-2 w-36 rounded bg-foreground/10" />
        <div className="h-2 w-24 rounded bg-accent/40" />
        <div className="pt-1 font-mono text-[10px] text-muted-foreground">
          Q → A
        </div>
      </div>
    </div>
  );
}

function DefaultArt({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="font-display text-4xl font-bold tracking-tight text-foreground/70">
        {label}
      </span>
    </div>
  );
}
