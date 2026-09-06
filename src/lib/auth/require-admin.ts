import { createClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth/admin";
import type { User } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

export type AdminContext = {
  supabase: SupabaseClient;
  user: User;
};

/**
 * Server-only guard for admin mutations and admin data access.
 * Verifies a real session AND app_metadata.role === "admin".
 */
export async function requireAdmin(): Promise<AdminContext> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("UNAUTHORIZED");
  }

  if (!isAdminUser(user)) {
    throw new Error("FORBIDDEN");
  }

  return { supabase, user };
}

export function adminErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message === "UNAUTHORIZED") {
      return "You must be signed in as an admin.";
    }
    if (error.message === "FORBIDDEN") {
      return "This account is not authorized for admin access.";
    }
    return error.message;
  }
  return "Something went wrong.";
}
