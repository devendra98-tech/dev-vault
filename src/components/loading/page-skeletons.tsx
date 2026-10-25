import { Skeleton } from "@/components/ui/skeleton";

export function ResourceCardSkeleton({ featured = false }: { featured?: boolean }) {
  if (featured) {
    return (
      <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[var(--shadow)]">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 p-6 sm:p-8 lg:p-10">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-[80%] max-w-md" />
            <Skeleton className="h-4 w-full max-w-sm" />
            <Skeleton className="h-4 w-[75%] max-w-xs" />
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="mt-4 h-11 w-36 rounded-full" />
          </div>
          <div className="border-t border-border p-4 lg:border-t-0 lg:border-l">
            <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-[80%]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[66%]" />
        <Skeleton className="mt-auto h-3 w-24" />
      </div>
    </div>
  );
}

export function ResourceGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ResourceCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
          <div className="max-w-xl space-y-5">
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-14 w-72 sm:h-16 sm:w-80" />
            <Skeleton className="h-14 w-64 sm:h-16 sm:w-72" />
            <Skeleton className="h-4 w-full max-w-md" />
            <Skeleton className="h-4 w-3/4 max-w-sm" />
            <Skeleton className="mt-4 h-14 w-full rounded-2xl" />
            <div className="flex flex-wrap gap-2 pt-1">
              <Skeleton className="h-8 w-12 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          </div>
          <div className="relative hidden h-[360px] lg:block">
            <Skeleton className="absolute top-4 left-2 h-28 w-56 rounded-2xl" />
            <Skeleton className="absolute top-28 right-0 h-28 w-60 rounded-2xl" />
            <Skeleton className="absolute bottom-6 left-10 h-28 w-52 rounded-2xl" />
          </div>
        </div>
        <div className="hairline" />
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div className="space-y-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-9 w-56" />
          </div>
          <Skeleton className="hidden h-4 w-20 sm:block" />
        </div>
        <div className="divide-y divide-border border-y border-border">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5"
            >
              <Skeleton className="h-3 w-6" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3 w-56" />
              </div>
              <Skeleton className="hidden h-3 w-6 sm:block" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/25 py-14 sm:py-20">
        <div className="container-page space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-9 w-48" />
          </div>
          <ResourceCardSkeleton featured />
        </div>
      </section>
    </div>
  );
}

export function ResourcesPageSkeleton() {
  return (
    <div className="container-page py-10 sm:py-16" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading resources…</span>
      <div className="mb-10 max-w-2xl space-y-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-10 w-full max-w-xl" />
        <Skeleton className="h-10 w-4/5 max-w-lg" />
      </div>
      <Skeleton className="mb-6 h-14 w-full rounded-2xl" />
      <div className="mb-8 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-24 rounded-full" />
        ))}
      </div>
      <ResourceGridSkeleton />
    </div>
  );
}

export function ResourceDetailSkeleton() {
  return (
    <div className="container-page py-10 sm:py-16" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading resource…</span>
      <div className="mb-8 flex gap-2">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-3" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-3" />
        <Skeleton className="h-3 w-28" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-12 w-full max-w-lg" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-5/6 max-w-sm" />
          <div className="flex gap-4 border-y border-border py-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-12 w-full rounded-full sm:w-40" />
            <Skeleton className="h-12 w-full rounded-full sm:w-36" />
          </div>
        </div>
        <Skeleton className="aspect-[4/3] w-full rounded-[1.5rem]" />
      </div>
    </div>
  );
}

export function CategoriesPageSkeleton() {
  return (
    <div className="container-page py-10 sm:py-16" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading categories…</span>
      <div className="mb-10 max-w-2xl space-y-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <div className="grid gap-0 border-y border-border sm:grid-cols-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="space-y-3 border-border px-0 py-6 sm:border-r sm:odd:pr-8 sm:even:pl-8 sm:even:border-r-0 [&:nth-child(n+3)]:border-t"
          >
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-full max-w-xs" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategoryDetailSkeleton() {
  return (
    <div className="container-page py-10 sm:py-16" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading category…</span>
      <div className="mb-10 max-w-2xl space-y-4 border-b border-border pb-8">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-4 w-full max-w-md" />
        <Skeleton className="h-3 w-28" />
      </div>
      <ResourceGridSkeleton />
    </div>
  );
}

export function AboutPageSkeleton() {
  return (
    <div className="container-page py-10 sm:py-16" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="mx-auto max-w-2xl space-y-6">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
        <div className="space-y-3 border-y border-border py-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>
        <Skeleton className="h-11 w-48 rounded-full" />
      </div>
    </div>
  );
}

export function GenericPageSkeleton() {
  return (
    <div className="container-page py-10 sm:py-16" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <div className="mb-10 max-w-2xl space-y-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <ResourceGridSkeleton count={3} />
      </div>
    </div>
  );
}
