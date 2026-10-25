import { BookOpen, Compass, Users } from "lucide-react";

const cards = [
  {
    title: "Learn Simply",
    description:
      "Break complex programming concepts into understandable notes.",
    icon: BookOpen,
  },
  {
    title: "Practice with Purpose",
    description:
      "Provide practical references, cheat sheets, and learning guides.",
    icon: Compass,
  },
  {
    title: "Grow Together",
    description:
      "Keep expanding the library with useful resources for developers.",
    icon: Users,
  },
] as const;

export function WhyDevVault() {
  return (
    <section className="border-y border-border bg-muted/40 py-14 sm:py-16">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            The library
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why I Built DevVault
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            DevVault brings together free developer notes, cheat sheets,
            roadmaps, and practical programming guides in one accessible
            library.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
            >
              <card.icon className="size-5 text-accent" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-foreground">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
