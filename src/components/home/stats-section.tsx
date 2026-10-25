import { BookOpen, Layers, Sparkles } from "lucide-react";
import type { Resource } from "@/types/resource";

export function StatsSection({ resources }: { resources: Resource[] }) {
  const total = resources.length;
  const hasRange = resources.some((resource) =>
    resource.difficulty.toLowerCase().includes("beginner"),
  ) && resources.some((resource) =>
    resource.difficulty.toLowerCase().includes("advanced"),
  );

  const stats = [
    {
      label: "Total available resources",
      value: String(total),
      icon: BookOpen,
    },
    {
      label: "Free learning resources",
      value: total > 0 ? `${total}` : "0",
      icon: Sparkles,
    },
    {
      label: "Learning coverage",
      value: hasRange ? "Beginner to Advanced" : total > 0 ? "Ready to learn" : "Coming soon",
      icon: Layers,
    },
  ];

  return (
    <section className="container-page pb-6 sm:pb-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card px-5 py-4 shadow-sm"
          >
            <stat.icon className="size-4 text-accent" aria-hidden="true" />
            <p className="mt-3 font-display text-lg font-bold tracking-tight text-foreground">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
