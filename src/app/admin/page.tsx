import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminResources } from "@/data/resources";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <h1 className="font-display text-2xl font-bold">Connect Supabase</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Copy <code>.env.example</code> to <code>.env.local</code>, add your
          project keys, run <code>supabase/schema.sql</code>, create an auth
          user, then set App Metadata to{" "}
          <code>{`{"role":"admin"}`}</code>.
        </p>
      </div>
    );
  }

  let resources;
  try {
    resources = await getAdminResources();
  } catch {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Resources</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload PDFs and publish without redeploying.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/resources/new">Add resource</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">
                Category
              </th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">
                Status
              </th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No resources yet. Add your first PDF.
                </td>
              </tr>
            ) : (
              resources.map((resource) => (
                <tr key={resource.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium">{resource.title}</div>
                    <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                      /{resource.slug}
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    {resource.category}
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span
                      className={
                        resource.published
                          ? "text-accent"
                          : "text-muted-foreground"
                      }
                    >
                      {resource.published ? "Published" : "Draft"}
                      {resource.featured ? " · Featured" : ""}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/resources/${resource.id}`}
                      className="text-sm text-accent hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
