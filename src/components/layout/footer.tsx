import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/resources", label: "Resources" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: siteConfig.instagramUrl, label: "Instagram", external: true },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="font-display text-5xl leading-none font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              DevVault
            </p>
            <p className="mt-4 max-w-md font-display text-xl text-muted-foreground sm:text-2xl">
              Resources for Developers.
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-end"
            aria-label="Footer"
          >
            {footerLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © 2026 {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            Built for builders
          </p>
        </div>
      </div>
    </footer>
  );
}
