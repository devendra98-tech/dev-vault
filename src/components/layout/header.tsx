"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
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
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="container-page !px-0">
        <div className="flex h-14 items-center justify-between gap-3 rounded-full border border-border/80 bg-[var(--nav-bg)] px-3 shadow-[var(--shadow)] backdrop-blur-xl sm:h-16 sm:px-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 pl-1"
            onClick={() => setOpen(false)}
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-paper transition-transform duration-200 group-hover:scale-105 dark:bg-foreground dark:text-background">
              D
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight text-foreground sm:text-base">
              {siteConfig.name}
            </span>
          </Link>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
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
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-0.5">
            <Button
              asChild
              variant="ghost"
              size="icon-sm"
              aria-label="Search resources"
            >
              <Link href="/resources">
                <Search className="size-4" />
              </Link>
            </Button>
            <ThemeToggle />
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
      </div>

      {open ? (
        <div className="container-page !px-0 pt-2 md:hidden">
          <nav
            className="rounded-3xl border border-border bg-card p-2 shadow-[var(--shadow)]"
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-2xl px-4 py-3.5 text-sm font-medium text-foreground hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/resources"
              className="mt-1 block rounded-2xl bg-ink px-4 py-3.5 text-center text-sm font-medium text-paper dark:bg-foreground dark:text-background"
              onClick={() => setOpen(false)}
            >
              Browse library
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
