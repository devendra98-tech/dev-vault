import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="container-page pb-16 sm:pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center text-paper sm:px-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.28),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Start with one note. Build from there.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-paper/70">
            Free developer notes, cheat sheets, and practical guides — ready to
            preview and download.
          </p>
          <Button asChild size="lg" className="mt-7">
            <Link href="/resources">Explore all notes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
