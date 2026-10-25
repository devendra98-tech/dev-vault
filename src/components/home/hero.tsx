import Link from "next/link";
import { BookOpen } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const topics = [
  { label: "JavaScript", className: "top-10 left-[4%] hidden lg:flex" },
  { label: "React", className: "top-24 right-[6%] hidden lg:flex" },
  { label: "Next.js", className: "bottom-28 left-[8%] hidden md:flex" },
  { label: "Node.js", className: "bottom-16 right-[10%] hidden md:flex" },
  { label: "AI & Machine Learning", className: "top-1/2 right-[2%] hidden xl:flex" },
  { label: "Git & GitHub", className: "top-1/2 left-[1%] hidden xl:flex" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hero-mesh" aria-hidden="true" />

      {topics.map((topic) => (
        <span
          key={topic.label}
          className={`absolute z-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm ${topic.className}`}
        >
          {topic.label}
        </span>
      ))}

      <div className="container-page relative z-10 py-14 text-center sm:py-20 lg:py-24">
        <div className="reveal mx-auto max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <span aria-hidden="true">📸</span>
            {siteConfig.instagramHandle} · Free Developer Notes
          </p>

          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Learn to Code.{" "}
            <span className="bg-linear-to-r from-accent to-accent-hover bg-clip-text text-transparent">
              One Concept at a Time.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Master JavaScript, React, Next.js, Node.js, AI, and modern
            development with beginner-friendly notes, practical guides, and free
            downloadable PDFs.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/#notes">
                <BookOpen className="size-4" />
                Explore Free Notes
              </Link>
            </Button>
            <Button asChild variant="navy" size="lg">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="size-4" />
                Follow on Instagram
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
