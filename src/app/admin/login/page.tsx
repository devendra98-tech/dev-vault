import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-6">
        <h1 className="font-display text-2xl font-bold">Setup required</h1>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Copy <code>.env.example</code> to <code>.env.local</code>
          </li>
          <li>Add Supabase URL + anon key</li>
          <li>
            Run <code>supabase/schema.sql</code> in the SQL Editor
          </li>
          <li>Create a user in Authentication → Users</li>
          <li>
            Set App Metadata to <code>{`{"role":"admin"}`}</code>
          </li>
          <li>Disable public sign-ups in Auth settings</li>
        </ol>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow)]">
      <h1 className="font-display text-2xl font-bold">Admin login</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Only accounts with <code>app_metadata.role = &quot;admin&quot;</code> can
        access the dashboard.
      </p>
      <div className="mt-6">
        <LoginForm />
      </div>
    </div>
  );
}
