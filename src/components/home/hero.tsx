"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { Button } from "@/components/ui/button";

const quickSearches = [
  "JavaScript",
  "React",
  "Next.js",
  "TypeScript",
  "Git",
];

const floatingCards = [
  {
    category: "JavaScript",
    title: "Complete Notes",
    meta: "42 pages",
    href: "/resources/javascript-beginner-to-advanced",
    className: "absolute top-4 left-2 float-a sm:w-56",
  },
  {
    category: "React",
    title: "Complete Notes",
    meta: "Full guide",
    href: "/resources/react-js",
    className: "absolute top-28 right-0 float-b sm:w-60",
  },
  {
    category: "Git",
    title: "End-to-End Guide",
    meta: "Quick reference",
    href: "/resources/git-end-to-end-guide",
    className: "absolute bottom-6 left-10 float-c sm:w-52",
  },
] as const;

const mobileCards = [
  {
    cat: "JS",
    title: "Complete Notes",
    href: "/resources/javascript-beginner-to-advanced",
  },
  {
    cat: "React",
    title: "Complete Notes",
    href: "/resources/react-js",
  },
  {
    cat: "Git",
    title: "End-to-End Guide",
    href: "/resources/git-end-to-end-guide",
  },
] as const;

export type HeroSearchItem = {
  title: string;
  slug: string;
  category: string;
};

type HeroProps = {
  catalog?: HeroSearchItem[];
};

function matchCatalog(catalog: HeroSearchItem[], query: string) {
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

export function Hero({ catalog = [] }: HeroProps) {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const matches = matchCatalog(catalog, query);
  const showSuggestions = open && query.trim().length >= 3;

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  function goSearch(value?: string) {
    const trimmed = (value ?? query).trim();
    setOpen(false);
    router.push(
      trimmed
        ? `/resources?q=${encodeURIComponent(trimmed)}`
        : "/resources",
    );
  }

  function goToResource(slug: string) {
    setOpen(false);
    router.push(`/resources/${slug}`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeIndex >= 0 && matches[activeIndex]) {
      goToResource(matches[activeIndex].slug);
      return;
    }
    goSearch();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      goSearch();
      return;
    }

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

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 hero-mesh"
        aria-hidden="true"
      />

      <div className="container-page relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
        <div className="reveal max-w-xl">
          <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
            Developer Resource Library
          </p>
          <h1 className="mt-4 font-display text-[2.6rem] leading-[0.95] font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem]">
            Resources
            <br />
            for Developers.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Notes, guides, cheat sheets and practical resources for building
            better software.
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <label htmlFor="hero-search" className="sr-only">
              Search resources
            </label>
            <div ref={rootRef} className="relative">
              <div className="group flex items-center gap-3 rounded-2xl border border-border-strong bg-card px-4 py-3 shadow-[var(--shadow)] transition-[border-color,box-shadow,ring-color] duration-200 ease-out focus-within:border-0 focus-within:shadow-[var(--shadow-hover)] focus-within:ring-1 focus-within:ring-sky-300 dark:focus-within:ring-sky-400/70">
                <Search
                  className="size-4 shrink-0 text-muted-foreground transition-colors duration-200 group-focus-within:text-sky-500"
                  aria-hidden="true"
                />
                <input
                  id="hero-search"
                  role="combobox"
                  aria-expanded={showSuggestions}
                  aria-controls={listId}
                  aria-autocomplete="list"
                  aria-activedescendant={
                    activeIndex >= 0
                      ? `${listId}-option-${activeIndex}`
                      : undefined
                  }
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search resources..."
                  className="min-w-0 flex-1 appearance-none border-0 bg-transparent text-[15px] text-foreground shadow-none outline-none ring-0 placeholder:text-muted-foreground focus:border-0 focus:shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  autoComplete="off"
                  spellCheck={false}
                />
                <kbd className="hidden items-center gap-1 rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
                  ⌘K
                </kbd>
              </div>

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
                            <span className="text-sm font-medium">
                              {item.title}
                            </span>
                            <span className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                              {item.category}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-4 py-3 text-sm text-muted-foreground">
                      No matches. Press Enter to search the library.
                    </p>
                  )}
                  {matches.length > 0 ? (
                    <button
                      type="submit"
                      className="flex w-full items-center justify-between border-t border-border px-4 py-2.5 text-left text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                    >
                      <span>
                        Search all for “{query.trim()}”
                      </span>
                      <span className="font-mono text-[10px]">Enter ↵</span>
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>

            {!showSuggestions ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">Try</span>
                {quickSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => goSearch(item)}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}

            <Button type="submit" className="mt-5 w-full sm:hidden">
              Search library
            </Button>
          </form>
        </div>

        <div className="relative mx-auto hidden h-[360px] w-full max-w-md lg:block xl:h-[400px] xl:max-w-lg">
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--hero-glow),transparent_70%)] blur-2xl"
            aria-hidden="true"
          />
          {floatingCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`${card.className} block rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow)] transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-hover)] focus-visible:border-accent/50`}
            >
              <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
                {card.category}
              </p>
              <p className="mt-2 font-display text-lg leading-tight font-semibold">
                {card.title}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{card.meta}</p>
            </Link>
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 lg:hidden">
          {mobileCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="min-w-[140px] shrink-0 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow)] transition-[border-color,box-shadow] duration-200 hover:border-accent/40 hover:shadow-[var(--shadow-hover)]"
            >
              <p className="font-mono text-[10px] text-accent uppercase">
                {card.cat}
              </p>
              <p className="mt-1 font-display text-sm font-semibold">
                {card.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="hairline" />
    </section>
  );
}
