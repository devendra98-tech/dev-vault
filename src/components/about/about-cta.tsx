import Link from "next/link";
import { InstagramIcon } from "@/components/icons/instagram";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function AboutCta() {
  return (
    <section className="container-page py-14 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center text-paper sm:px-10 sm:py-14">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.28),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s Learn and Build Together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-paper/70 sm:text-base">
            Follow along for programming notes, developer insights, practical
            tips, and new learning resources.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="size-4" />
                Follow {siteConfig.instagramHandle}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-paper/20 bg-transparent text-paper hover:bg-paper/10 hover:text-paper"
            >
              <Link href="/resources">Explore the Resource Library</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
