"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createResourceAction,
  updateResourceAction,
  type ActionResult,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { isAdminUser } from "@/lib/auth/admin";
import {
  buildPdfObjectPath,
  PDFS_BUCKET,
  validatePdfFile,
} from "@/lib/resources/pdf";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import type { ResourceRow } from "@/lib/resources/types";

const difficulties = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Beginner → Intermediate",
  "Beginner → Advanced",
  "Intermediate → Advanced",
];

const types = ["PDF", "Cheat Sheet", "Roadmap", "Guide"];

const initialState: ActionResult = { success: false };

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-accent/50";
const textareaClass =
  "min-h-24 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:border-accent/50";

type ResourceFormProps = {
  mode: "create" | "edit";
  resource?: ResourceRow;
};

async function uploadPdfIfNeeded(
  formData: FormData,
  mode: "create" | "edit",
): Promise<ActionResult | null> {
  const file = formData.get("pdf");
  const pdfFile =
    file instanceof File && file.size > 0 ? file : null;

  const pdfError = validatePdfFile(pdfFile, mode === "create");
  if (pdfError) {
    return { success: false, error: pdfError };
  }

  // Strip any file from FormData so PDF bytes never hit the Vercel server.
  formData.delete("pdf");

  if (!pdfFile) {
    return null;
  }

  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || title);
  if (!slug) {
    return { success: false, error: "Please fill in all required fields." };
  }

  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "You must be signed in as an admin." };
  }

  if (!isAdminUser(user)) {
    return {
      success: false,
      error: "This account is not authorized for admin access.",
    };
  }

  const pdfPath = buildPdfObjectPath(slug);
  const { error: uploadError } = await supabase.storage
    .from(PDFS_BUCKET)
    .upload(pdfPath, pdfFile, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (uploadError) {
    return { success: false, error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(PDFS_BUCKET).getPublicUrl(pdfPath);

  formData.set("pdf_path", pdfPath);
  formData.set("pdf_url", publicUrl);
  return null;
}

export function ResourceForm({ mode, resource }: ResourceFormProps) {
  const router = useRouter();
  const serverAction =
    mode === "create" ? createResourceAction : updateResourceAction;

  const [state, formAction, pending] = useActionState(
    async (
      prev: ActionResult | null,
      formData: FormData,
    ): Promise<ActionResult> => {
      const uploadResult = await uploadPdfIfNeeded(formData, mode);
      if (uploadResult) {
        return uploadResult;
      }
      return serverAction(prev, formData);
    },
    initialState,
  );
  const [title, setTitle] = useState(resource?.title ?? "");
  const [slug, setSlug] = useState(resource?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(resource?.slug));

  useEffect(() => {
    if (mode === "edit" && state.success) {
      router.refresh();
    }
  }, [mode, state.success, router]);

  return (
    <form action={formAction} className="space-y-6">
      {resource ? <input type="hidden" name="id" value={resource.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title *" htmlFor="title">
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(event) => {
              const next = event.target.value;
              setTitle(next);
              if (!slugTouched) {
                setSlug(slugify(next));
              }
            }}
            className={inputClass}
          />
        </Field>
        <Field label="Slug *" htmlFor="slug">
          <input
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(slugify(event.target.value));
            }}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Short description *" htmlFor="description">
        <textarea
          id="description"
          name="description"
          required
          defaultValue={resource?.description}
          className={textareaClass}
        />
      </Field>

      <Field label="Long description" htmlFor="longDescription">
        <textarea
          id="longDescription"
          name="longDescription"
          defaultValue={resource?.long_description ?? ""}
          className={textareaClass}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Category *" htmlFor="category">
          <input
            id="category"
            name="category"
            type="text"
            required
            defaultValue={resource?.category ?? ""}
            placeholder="e.g. JavaScript, Python, AWS, Docker"
            className={inputClass}
          />
        </Field>
        <Field label="Type *" htmlFor="type">
          <select
            id="type"
            name="type"
            required
            defaultValue={resource?.type ?? "PDF"}
            className={inputClass}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Difficulty *" htmlFor="difficulty">
          <select
            id="difficulty"
            name="difficulty"
            required
            defaultValue={resource?.difficulty ?? "Beginner → Advanced"}
            className={inputClass}
          >
            {difficulties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Pages" htmlFor="pages">
          <input
            id="pages"
            name="pages"
            type="number"
            min={1}
            defaultValue={resource?.pages ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Published date" htmlFor="publishedAt">
          <input
            id="publishedAt"
            name="publishedAt"
            type="date"
            defaultValue={
              resource?.published_at ??
              new Date().toISOString().slice(0, 10)
            }
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Tags (comma or newline separated)" htmlFor="tags">
        <textarea
          id="tags"
          name="tags"
          defaultValue={(resource?.tags ?? []).join(", ")}
          className={textareaClass}
          placeholder="javascript, notes, frontend"
        />
      </Field>

      <Field
        label="What's inside (one item per line)"
        htmlFor="highlights"
      >
        <textarea
          id="highlights"
          name="highlights"
          defaultValue={(resource?.highlights ?? []).join("\n")}
          className={textareaClass}
        />
      </Field>

      <Field
        label={mode === "create" ? "PDF file *" : "Replace PDF (optional)"}
        htmlFor="pdf"
      >
        <input
          id="pdf"
          name="pdf"
          type="file"
          accept="application/pdf"
          required={mode === "create"}
          className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-muted file:px-4 file:py-2 file:text-sm file:font-medium file:text-foreground"
        />
        {resource?.pdf_url ? (
          <a
            href={resource.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs text-accent hover:underline"
          >
            Current PDF
          </a>
        ) : null}
      </Field>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={resource?.featured ?? false}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={resource?.published ?? true}
          />
          Published
        </label>
      </div>

      {state?.error ? (
        <p className="text-sm text-red-500" role="alert">
          {state.error}
        </p>
      ) : null}

      {mode === "edit" && state.success ? (
        <p className="text-sm text-accent" role="status">
          Saved. The public site will update immediately.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending
            ? "Saving..."
            : mode === "create"
              ? "Publish resource"
              : "Save changes"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
