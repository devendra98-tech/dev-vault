import Link from "next/link";
import { InstagramIcon } from "@/components/icons/instagram";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function AboutCreator() {
  return (
    <section className="container-page py-14 sm:py-16">
      <div className="rounded-3xl border border-border bg-card px-6 py-10 text-center shadow-sm sm:px-12">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          About the creator
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Built by a Developer, for Developers.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          DevVault is a free learning resource hub by {siteConfig.instagramHandle},
          created to help developers understand complex concepts through simple
          notes, visual explanations, cheat sheets, and practical guides.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="outline">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="size-4" />
              Follow {siteConfig.instagramHandle}
            </a>
          </Button>
          <Button asChild>
            <Link href="/#notes">Browse the library</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
