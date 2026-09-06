import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { deleteResourceAction } from "@/app/admin/actions";
import { ResourceForm } from "@/components/admin/resource-form";
import { Button } from "@/components/ui/button";
import { getAdminResourceById } from "@/data/resources";

export const dynamic = "force-dynamic";

type EditResourcePageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Edit Resource",
  robots: { index: false, follow: false },
};

export default async function EditResourcePage({
  params,
}: EditResourcePageProps) {
  const { id } = await params;

  let resource;
  try {
    resource = await getAdminResourceById(id);
  } catch {
    redirect("/admin/login");
  }

  if (!resource) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/admin"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back
          </Link>
          <h1 className="mt-3 font-display text-3xl font-bold">
            Edit resource
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{resource.title}</p>
        </div>
        <div className="flex gap-2">
          {resource.published ? (
            <Button asChild variant="outline" size="sm">
              <Link href={`/resources/${resource.slug}`} target="_blank">
                View public page
              </Link>
            </Button>
          ) : null}
          <form action={deleteResourceAction}>
            <input type="hidden" name="id" value={resource.id} />
            <Button type="submit" variant="outline" size="sm">
              Delete
            </Button>
          </form>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <ResourceForm mode="edit" resource={resource} />
      </div>
    </div>
  );
}
