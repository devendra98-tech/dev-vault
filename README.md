# DevVault

Developer resource library with a public site + Supabase-powered admin.

## Stack

- Next.js (App Router) on Vercel
- Supabase Postgres (resource data)
- Supabase Storage (PDFs)
- Supabase Auth (admin login with `app_metadata.role = "admin"`)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Supabase setup (required for production)

1. Create a Supabase project
2. Put **Project URL** + **anon/public key** in `.env.local` (and Vercel)
3. Run `supabase/schema.sql` in SQL Editor  
   - If you already ran an older schema: also run `supabase/harden-rls.sql`
4. Authentication → Users → create your admin user
5. Edit user → **App Metadata** → set:
   ```json
   { "role": "admin" }
   ```
6. Authentication → Providers / Settings → **disable public sign-ups**
7. Deploy to Vercel with the same `NEXT_PUBLIC_*` env vars

Do **not** add the service role key to the app. Admin writes use the admin session JWT + RLS.

## Security model

- Public (`anon`): read published resources only; download PDFs
- Non-admin authenticated users: same as public for reads; **cannot** mutate
- Admin (`app_metadata.role = "admin"`): full CRUD + PDF upload/delete
- `/admin/*` protected by middleware (session + admin role)
- Server actions call `requireAdmin()` before any mutation

## Where things live

| What | Where |
| --- | --- |
| Admin dashboard | `/admin` |
| Schema / RLS | `supabase/schema.sql` |
| RLS upgrade script | `supabase/harden-rls.sql` |
| Categories | `src/data/categories.ts` |
| Local fallback (no Supabase) | `src/data/seed-resources.ts` |
| Env template | `.env.example` |

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
