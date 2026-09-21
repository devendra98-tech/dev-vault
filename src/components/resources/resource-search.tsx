"use client";

import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

export type SearchSuggestionItem = {
  title: string;
  slug: string;
  category: string;
};

type ResourceSearchProps = {
  value: string;
  onChange: (value: string) => void;
  catalog?: SearchSuggestionItem[];
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  id?: string;
};

function matchCatalog(catalog: SearchSuggestionItem[], query: string) {
  const q = query.trim().toLowerCase();
  if (q.length < 3) return [];

  return catalog
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q),
    )
    .slice(0, 6);
}

export function ResourceSearch({
  value,
  onChange,
  catalog = [],
  placeholder = "Search the library...",
  className,
  autoFocus,
  id = "resource-search",
}: ResourceSearchProps) {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const matches = matchCatalog(catalog, value);
  const showSuggestions = open && value.trim().length >= 3;

  useEffect(() => {
    setActiveIndex(-1);
  }, [value]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  function goToResource(slug: string) {
    setOpen(false);
    router.push(`/resources/${slug}`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!showSuggestions || matches.length === 0) {
      if (event.key === "Escape") setOpen(false);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % matches.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        index <= 0 ? matches.length - 1 : index - 1,
      );
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0 && matches[activeIndex]) {
      event.preventDefault();
      goToResource(matches[activeIndex].slug);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <label htmlFor={id} className="sr-only">
        Search resources
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id={id}
        role="combobox"
        aria-expanded={showSuggestions}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
        }
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="h-12 w-full appearance-none rounded-2xl border border-border-strong bg-card pr-11 pl-11 text-[15px] text-foreground shadow-[var(--shadow)] outline-none ring-0 transition-[border-color,box-shadow,ring-color] duration-200 placeholder:text-muted-foreground focus:border-0 focus:shadow-[var(--shadow-hover)] focus:outline-none focus:ring-1 focus:ring-sky-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-300 dark:focus:ring-sky-400/70 dark:focus-visible:ring-sky-400/70 sm:h-14 sm:text-sm"
        autoComplete="off"
        spellCheck={false}
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            onChange("");
            setOpen(false);
          }}
          className="absolute top-1/2 right-3 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      ) : null}

      {showSuggestions ? (
        <div
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-hover)]"
        >
          {matches.length > 0 ? (
            <ul className="max-h-72 overflow-y-auto py-1">
              {matches.map((item, index) => (
                <li key={item.slug} role="presentation">
                  <button
                    id={`${listId}-option-${index}`}
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => goToResource(item.slug)}
                    className={`flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors duration-150 ${
                      index === activeIndex
                        ? "bg-muted text-foreground"
                        : "text-foreground hover:bg-muted/70"
                    }`}
                  >
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                      {item.category}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-muted-foreground">
              No matches for “{value.trim()}”.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
