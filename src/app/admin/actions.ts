"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth/admin";
import { adminErrorMessage, requireAdmin } from "@/lib/auth/require-admin";
import { slugify } from "@/lib/utils";
import { toResourceInsert } from "@/lib/resources/types";
import {
  isValidPdfObjectPath,
  PDFS_BUCKET,
} from "@/lib/resources/pdf";

function revalidatePublicSite(slug?: string) {
  revalidatePath("/", "layout");
  revalidatePath("/resources", "layout");
  revalidatePath("/categories", "layout");
  if (slug) {
    revalidatePath(`/resources/${slug}`, "page");
  }
}

export type ActionResult = {
  success: boolean;
  error?: string;
  id?: string;
};

function parseList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * Accepts client-uploaded PDF metadata. The file bytes are never sent here —
 * only path + public URL from a direct browser → Supabase Storage upload.
 */
function parseUploadedPdf(
  formData: FormData,
  supabase: Awaited<ReturnType<typeof createClient>>,
  required: boolean,
): { pdfUrl: string; pdfPath: string } | { error: string } | null {
  const pdfPath = String(formData.get("pdf_path") ?? "").trim();
  const pdfUrl = String(formData.get("pdf_url") ?? "").trim();

  if (!pdfPath && !pdfUrl) {
    if (required) {
      return { error: "A PDF file is required." };
    }
    return null;
  }

  if (!pdfPath || !pdfUrl) {
    return { error: "Invalid PDF upload." };
  }

  if (!isValidPdfObjectPath(pdfPath)) {
    return { error: "Invalid PDF path." };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(PDFS_BUCKET).getPublicUrl(pdfPath);

  if (pdfUrl !== publicUrl) {
    return { error: "Invalid PDF URL." };
  }

  return { pdfUrl, pdfPath };
}

export async function loginAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const supabase = await createClient();
  let data;
  let error;
  try {
    ({ data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    }));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (/fetch failed|ECONNRESET|ENOTFOUND|network/i.test(message)) {
      return {
        success: false,
        error:
          "Cannot reach Supabase from this machine (network/DNS). Check your connection, VPN, and that the project is active — credentials were not verified.",
      };
    }
    return { success: false, error: message };
  }

  if (error) {
    if (/fetch failed|ECONNRESET|ENOTFOUND|network/i.test(error.message)) {
      return {
        success: false,
        error:
          "Cannot reach Supabase from this machine (network/DNS). Check your connection, VPN, and that the project is active — credentials were not verified.",
      };
    }
    return { success: false, error: error.message };
  }

  if (!isAdminUser(data?.user)) {
    await supabase.auth.signOut();
    return {
      success: false,
      error: "This account is not authorized for admin access.",
    };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createResourceAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    const title = String(formData.get("title") ?? "").trim();
    const slugInput = String(formData.get("slug") ?? "").trim();
    const slug = slugify(slugInput || title);
    const description = String(formData.get("description") ?? "").trim();
    const longDescription = String(formData.get("longDescription") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const difficulty = String(formData.get("difficulty") ?? "").trim();
    const type = String(formData.get("type") ?? "").trim();
    const pagesRaw = String(formData.get("pages") ?? "").trim();
    const featured = formData.get("featured") === "on";
    const published = formData.get("published") === "on";
    const publishedAt = String(formData.get("publishedAt") ?? "").trim();
    const tags = parseList(formData.get("tags"));
    const highlights = parseList(formData.get("highlights"));

    if (!title || !description || !category || !difficulty || !type || !slug) {
      return { success: false, error: "Please fill in all required fields." };
    }

    const uploaded = parseUploadedPdf(formData, supabase, true);
    if (!uploaded || "error" in uploaded) {
      return {
        success: false,
        error: uploaded && "error" in uploaded ? uploaded.error : "A PDF file is required.",
      };
    }

    const { pdfUrl, pdfPath } = uploaded;

    const payload = toResourceInsert({
      title,
      slug,
      description,
      longDescription: longDescription || undefined,
      category,
      difficulty,
      type,
      pages: pagesRaw ? Number(pagesRaw) : null,
      featured,
      published,
      publishedAt: publishedAt || undefined,
      tags,
      highlights,
      pdfUrl,
      pdfPath,
    });

    const { data, error } = await supabase
      .from("resources")
      .insert(payload)
      .select("id, slug")
      .single();

    if (error) {
      await supabase.storage.from(PDFS_BUCKET).remove([pdfPath]);
      return { success: false, error: error.message };
    }

    revalidatePublicSite(data.slug);
    redirect(`/admin/resources/${data.id}`);
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) {
      throw error;
    }
    return { success: false, error: adminErrorMessage(error) };
  }
}

export async function updateResourceAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const { supabase } = await requireAdmin();

    const id = String(formData.get("id") ?? "").trim();
    if (!id) {
      return { success: false, error: "Missing resource id." };
    }

    const { data: existing, error: existingError } = await supabase
      .from("resources")
      .select("*")
      .eq("id", id)
      .single();

    if (existingError || !existing) {
      return { success: false, error: "Resource not found." };
    }

    const title = String(formData.get("title") ?? "").trim();
    const slugInput = String(formData.get("slug") ?? "").trim();
    const slug = slugify(slugInput || title);
    const description = String(formData.get("description") ?? "").trim();
    const longDescription = String(formData.get("longDescription") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const difficulty = String(formData.get("difficulty") ?? "").trim();
    const type = String(formData.get("type") ?? "").trim();
    const pagesRaw = String(formData.get("pages") ?? "").trim();
    const featured = formData.get("featured") === "on";
    const published = formData.get("published") === "on";
    const publishedAt = String(formData.get("publishedAt") ?? "").trim();
    const tags = parseList(formData.get("tags"));
    const highlights = parseList(formData.get("highlights"));

    if (!title || !description || !category || !difficulty || !type || !slug) {
      return { success: false, error: "Please fill in all required fields." };
    }

    const uploaded = parseUploadedPdf(formData, supabase, false);
    if (uploaded && "error" in uploaded) {
      return { success: false, error: uploaded.error };
    }

    let pdfUrl = existing.pdf_url as string;
    let pdfPath = existing.pdf_path as string | null;
    const previousPath = pdfPath;

    if (uploaded) {
      pdfUrl = uploaded.pdfUrl;
      pdfPath = uploaded.pdfPath;
    }

    const payload = toResourceInsert({
      title,
      slug,
      description,
      longDescription: longDescription || undefined,
      category,
      difficulty,
      type,
      pages: pagesRaw ? Number(pagesRaw) : null,
      featured,
      published,
      publishedAt: publishedAt || existing.published_at,
      tags,
      highlights,
      pdfUrl,
      pdfPath,
    });

    const { error } = await supabase
      .from("resources")
      .update(payload)
      .eq("id", id);

    if (error) {
      if (uploaded) {
        await supabase.storage.from(PDFS_BUCKET).remove([uploaded.pdfPath]);
      }
      return { success: false, error: error.message };
    }

    if (uploaded && previousPath && previousPath !== uploaded.pdfPath) {
      await supabase.storage.from(PDFS_BUCKET).remove([previousPath]);
    }

    revalidatePublicSite(slug);
    if (existing.slug !== slug) {
      revalidatePublicSite(existing.slug as string);
    }

    return { success: true, id };
  } catch (error) {
    return { success: false, error: adminErrorMessage(error) };
  }
}

export async function deleteResourceAction(formData: FormData): Promise<void> {
  try {
    const { supabase } = await requireAdmin();
    const id = String(formData.get("id") ?? "").trim();

    if (!id) {
      redirect("/admin");
    }

    const { data: existing } = await supabase
      .from("resources")
      .select("slug, pdf_path")
      .eq("id", id)
      .maybeSingle();

    const { error } = await supabase.from("resources").delete().eq("id", id);
    if (!error && existing?.pdf_path) {
      await supabase.storage.from(PDFS_BUCKET).remove([existing.pdf_path]);
    }

    if (existing?.slug) {
      revalidatePublicSite(existing.slug);
    } else {
      revalidatePublicSite();
    }

    redirect("/admin");
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) {
      throw error;
    }
    redirect("/admin/login");
  }
}
