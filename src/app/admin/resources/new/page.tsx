import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ResourceForm } from "@/components/admin/resource-form";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New Resource",
  robots: { index: false, follow: false },
};

export default async function NewResourcePage() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  try {
    const { requireAdmin } = await import("@/lib/auth/require-admin");
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </Link>
        <h1 className="mt-3 font-display text-3xl font-bold">
          Add resource
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a PDF and publish it to the public library.
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <ResourceForm mode="create" />
      </div>
    </div>
  );
}
