import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "DevVault is a curated library of developer notes, guides, cheat sheets and practical resources.",
  alternates: {
    canonical: "/about",
  },
};

const points = [
  { title: "Built for developers" },
  { title: "Practical and reference-ready" },
  { title: "Continuously expanding library" },
  { title: "Designed for focused learning" },
  {
    title: "Follow & support the journey",
    description:
      "Follow for more tech tips, developer insights, life hacks and useful resources.",
    href: "https://www.instagram.com/godavariabbayi_98/",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="container-page py-12 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
          About
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Built for Developers.
        </h1>
        <section className="mt-14 border-t border-border pt-10">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Behind DevVault
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            DevVault is created by @godavariabbayi_98 — a developer and tech
            content creator sharing practical programming tips, developer
            insights, life hacks and useful resources.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            DevVault brings those ideas together in one place, making it easier
            to explore, learn and keep useful developer resources.
          </p>
          <a
            href="https://www.instagram.com/godavariabbayi_98/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex text-sm font-medium text-accent transition-colors hover:text-foreground"
          >
            Follow @godavariabbayi_98 ↗
          </a>
        </section>

        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          DevVault is a curated collection of developer resources, notes, cheat
          sheets and guides — designed to help you learn, reference and ship
          with clarity.
        </p>

        <ul className="mt-10 space-y-0 border-y border-border">
          {points.map((point, index) => {
            const content = (
              <>
                <span className="shrink-0 font-mono text-xs text-accent tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-foreground">
                    {point.title}
                  </span>
                  {"description" in point ? (
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </span>
                  ) : null}
                </span>
              </>
            );

            return (
              <li
                key={point.title}
                className="border-b border-border last:border-b-0"
              >
                {"href" in point ? (
                  <a
                    href={point.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 py-4 transition-colors hover:text-accent"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 py-4">{content}</div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-10">
          <Button asChild>
            <Link href="/resources">Browse the library</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
