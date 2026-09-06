"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";

const suggestions = [
  "JavaScript",
  "React",
  "Next.js",
  "TypeScript",
  "Git",
];

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function goSearch(value?: string) {
    const trimmed = (value ?? query).trim();
    router.push(
      trimmed
        ? `/resources?q=${encodeURIComponent(trimmed)}`
        : "/resources",
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    goSearch();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      goSearch();
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hero-mesh" aria-hidden="true" />

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
            <div className="group flex items-center gap-3 rounded-2xl border border-border-strong bg-card px-4 py-3 shadow-[var(--shadow)] transition-shadow duration-200 focus-within:border-accent/50 focus-within:shadow-[var(--shadow-hover)]">
              <Search
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="hero-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search resources..."
                className="min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden items-center gap-1 rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
                ⌘K
              </kbd>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">Try</span>
              {suggestions.map((item) => (
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
            <Button type="submit" className="mt-5 w-full sm:hidden">
              Search library
            </Button>
          </form>
        </div>

        <div
          className="relative mx-auto hidden h-[360px] w-full max-w-md lg:block xl:h-[400px] xl:max-w-lg"
          aria-hidden="true"
        >
          <div className="absolute top-4 left-2 float-a rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-hover)] sm:w-56">
            <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
              JavaScript
            </p>
            <p className="mt-2 font-display text-lg leading-tight font-semibold">
              Complete Notes
            </p>
            <p className="mt-2 text-xs text-muted-foreground">42 pages</p>
          </div>
          <div className="absolute top-28 right-0 float-b rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-hover)] sm:w-60">
            <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
              React
            </p>
            <p className="mt-2 font-display text-lg leading-tight font-semibold">
              Interview Guide
            </p>
            <p className="mt-2 text-xs text-muted-foreground">24 pages</p>
          </div>
          <div className="absolute bottom-6 left-10 float-c rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-hover)] sm:w-52">
            <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
              Git
            </p>
            <p className="mt-2 font-display text-lg leading-tight font-semibold">
              Cheat Sheet
            </p>
            <p className="mt-2 text-xs text-muted-foreground">Quick reference</p>
          </div>
          <div className="absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--hero-glow),transparent_70%)] blur-2xl" />
        </div>

        {/* Mobile compact visual strip */}
        <div className="flex gap-3 overflow-x-auto pb-1 lg:hidden" aria-hidden="true">
          {[
            { cat: "JS", title: "Complete Notes" },
            { cat: "React", title: "Interview Guide" },
            { cat: "Git", title: "Cheat Sheet" },
          ].map((card) => (
            <div
              key={card.cat}
              className="min-w-[140px] shrink-0 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow)]"
            >
              <p className="font-mono text-[10px] text-accent uppercase">
                {card.cat}
              </p>
              <p className="mt-1 font-display text-sm font-semibold">{card.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hairline" />
    </section>
  );
}
