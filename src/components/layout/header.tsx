"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/resources", label: "Resources" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);

  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[var(--nav-bg)] backdrop-blur-xl">
      <div className="container-page grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="group flex items-center gap-2.5 justify-self-start"
          onClick={() => setOpen(false)}
        >
          <BrandLogo size={40} />
        </Link>

        <nav
          className="hidden items-center justify-center gap-1 md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const active =
              link.label === "Categories"
                ? pathname.startsWith("/categories")
                : pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                {active ? (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:inline-flex"
          >
            <InstagramIcon className="size-4" />
            {siteConfig.instagramHandle}
          </a>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/#notes">Explore Notes</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          className="border-t border-border bg-card px-4 py-3 md:hidden"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            <InstagramIcon className="size-4" />
            {siteConfig.instagramHandle}
          </a>
          <Link
            href="/#notes"
            className="mt-1 block rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground"
            onClick={() => setOpen(false)}
          >
            Explore Notes
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
