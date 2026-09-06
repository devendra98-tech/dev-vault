const reasons = [
  {
    title: "Built for learning",
    description:
      "Resources designed to make complex development topics easier to understand.",
  },
  {
    title: "Practical",
    description: "Focused on concepts developers actually use.",
  },
  {
    title: "Quick to reference",
    description:
      "Find the information you need without digging through endless pages.",
  },
  {
    title: "Always growing",
    description: "New resources are continuously added to the library.",
  },
];

export function WhyDevVault() {
  return (
    <section className="border-y border-border bg-ink text-paper dark:bg-muted dark:text-foreground">
      <div className="container-page py-14 sm:py-20">
        <div className="mb-10 max-w-xl">
          <p className="font-mono text-[11px] tracking-[0.2em] text-paper/50 uppercase dark:text-muted-foreground">
            Why DevVault
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Made to stay useful.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {reasons.map((reason, index) => (
            <div key={reason.title} className="border-t border-paper/15 pt-5 dark:border-border">
              <p className="font-mono text-[11px] text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/65 dark:text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
