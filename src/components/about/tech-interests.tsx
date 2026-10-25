const topics = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Docker",
  "System Design",
  "AI & Machine Learning",
] as const;

export function TechInterests() {
  return (
    <section className="container-page py-14 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          Topics
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Technologies & Developer Interests
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          The notes and guides in DevVault focus on the tools and ideas I
          learn and share most often.
        </p>
      </div>

      <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
        {topics.map((topic) => (
          <li
            key={topic}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm"
          >
            {topic}
          </li>
        ))}
      </ul>
    </section>
  );
}
