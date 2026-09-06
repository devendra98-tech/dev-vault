import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { isAdminUser } from "@/lib/auth/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let showLogout = false;

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      showLogout = isAdminUser(user);
    } catch {
      showLogout = false;
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-display text-lg font-bold">
              DevVault Admin
            </Link>
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              View site
            </Link>
          </div>
          {showLogout ? (
            <form action={logoutAction}>
              <Button type="submit" variant="outline" size="sm">
                Sign out
              </Button>
            </form>
          ) : null}
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
