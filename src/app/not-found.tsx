import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Resource Not Found
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        The resource you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button asChild className="mt-8">
        <Link href="/resources">Browse Resources</Link>
      </Button>
    </div>
  );
}
