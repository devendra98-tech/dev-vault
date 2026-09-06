"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ResourceSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  id?: string;
};

export function ResourceSearch({
  value,
  onChange,
  placeholder = "Search the library...",
  className,
  autoFocus,
  id = "resource-search",
}: ResourceSearchProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <label htmlFor={id} className="sr-only">
        Search resources
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="h-12 w-full rounded-2xl border border-border-strong bg-card pr-11 pl-11 text-[15px] text-foreground shadow-[var(--shadow)] outline-none transition-shadow placeholder:text-muted-foreground focus:border-accent/40 focus:shadow-[var(--shadow-hover)] sm:h-14 sm:text-sm"
        autoComplete="off"
        spellCheck={false}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
