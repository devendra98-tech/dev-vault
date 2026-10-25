import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { InstagramIcon } from "@/components/icons/instagram";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/resources", label: "Resources" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" className="inline-flex">
              <BrandLogo size={40} />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Making developer learning simple, visual, and accessible.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Quick Links
            </p>
            <nav className="mt-4 flex flex-col gap-2.5" aria-label="Footer">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Follow the Creator
            </p>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              <InstagramIcon className="size-4" />
              Instagram {siteConfig.instagramHandle}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Built for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
