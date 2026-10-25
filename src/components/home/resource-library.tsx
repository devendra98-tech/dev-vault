import { Suspense } from "react";
import { BookOpen, Download, FileText, Zap } from "lucide-react";
import type { Resource } from "@/types/resource";
import { ResourceExplorer } from "@/components/resources/resource-explorer";
import { hasDownloadablePdf } from "@/lib/utils";

export function ResourceLibrary({ resources }: { resources: Resource[] }) {
  const pdfCount = resources.filter((resource) =>
    hasDownloadablePdf(resource.pdfUrl),
  ).length;

  const cards = [
    { label: "Total Resources", value: String(resources.length), icon: BookOpen },
    { label: "Free Downloads", value: String(pdfCount), icon: Download },
    { label: "PDF Guides", value: String(pdfCount), icon: FileText },
    { label: "Instant Access", value: resources.length > 0 ? "Yes" : "Soon", icon: Zap },
  ];

  return (
    <section id="notes" className="scroll-mt-24 border-y border-border bg-muted/50 py-14 sm:py-16">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
            Free Developer Resource Library
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Free Notes & Learning Guides
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Explore developer notes, cheat sheets, roadmaps, and practical
            learning resources. Learn faster with everything organized in one
            place.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm"
            >
              <card.icon className="size-4 text-accent" aria-hidden="true" />
              <p className="mt-2 font-display text-xl font-bold text-foreground">
                {card.value}
              </p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
                Loading library...
              </div>
            }
          >
            <ResourceExplorer resources={resources} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
