import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@/components/icons/instagram";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 hero-mesh opacity-70"
        aria-hidden="true"
      />
      <div className="container-page relative py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="reveal max-w-xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              Meet the creator
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
              Building, Learning & Sharing Tech.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              I&apos;m a developer and tech content creator who turns complex
              programming concepts into simple, practical learning resources.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              DevVault is my free developer resource library — notes, cheat
              sheets, roadmaps, and guides collected in one place so you can
              learn at your own pace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <Link href="/resources">Explore Free Notes</Link>
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
            <p className="mt-4 text-sm text-muted-foreground">
              {siteConfig.instagramHandle}
            </p>
          </div>

          <div className="relative order-first mx-auto w-full max-w-[18.5rem] sm:max-w-[22rem] lg:order-none lg:max-w-[26rem]">
            <div
              className="absolute -inset-4 rounded-[2.25rem] bg-linear-to-br from-accent/25 via-transparent to-brand-blue/20 blur-sm"
              aria-hidden="true"
            />
            <div
              className="absolute -right-3 -bottom-4 size-28 rounded-full bg-accent/20 blur-2xl sm:size-36"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[var(--shadow-hover)]">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={siteConfig.creatorPhoto}
                  alt="DevVault creator working on a laptop in an office"
                  fill
                  priority
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 22rem, 18.5rem"
                  className="object-cover object-[72%_38%]"
                />
              </div>
              <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/45 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white uppercase backdrop-blur-sm">
                Developer · Tech Creator
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
