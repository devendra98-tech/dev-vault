-- DevVault Supabase schema (production-hardened)
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

-- ---------------------------------------------------------------------------
-- Admin helper: checks JWT app_metadata.role === 'admin'
-- Set via Dashboard → Authentication → Users → user → App Metadata:
--   { "role": "admin" }
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Resources table
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  long_description text,
  category text not null,
  difficulty text not null,
  pages integer,
  type text not null,
  featured boolean not null default false,
  thumbnail text,
  pdf_url text not null,
  pdf_path text,
  tags text[] not null default '{}',
  highlights text[] not null default '{}',
  published boolean not null default true,
  published_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resources_published_at_idx
  on public.resources (published_at desc);

create index if not exists resources_category_idx
  on public.resources (category);

create index if not exists resources_published_idx
  on public.resources (published);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists resources_set_updated_at on public.resources;
create trigger resources_set_updated_at
  before update on public.resources
  for each row
  execute function public.set_updated_at();

-- Row Level Security
alter table public.resources enable row level security;

-- Remove older permissive policies if they exist
drop policy if exists "Public can read published resources" on public.resources;
drop policy if exists "Authenticated can read all resources" on public.resources;
drop policy if exists "Authenticated can insert resources" on public.resources;
drop policy if exists "Authenticated can update resources" on public.resources;
drop policy if exists "Authenticated can delete resources" on public.resources;
drop policy if exists "Admins can read all resources" on public.resources;
drop policy if exists "Admins can insert resources" on public.resources;
drop policy if exists "Admins can update resources" on public.resources;
drop policy if exists "Admins can delete resources" on public.resources;

-- Anyone can read PUBLISHED resources only
create policy "Public can read published resources"
  on public.resources
  for select
  to anon, authenticated
  using (published = true);

-- Admins can read drafts + published
create policy "Admins can read all resources"
  on public.resources
  for select
  to authenticated
  using (public.is_admin());

-- Mutations: admins only (not every authenticated user)
create policy "Admins can insert resources"
  on public.resources
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update resources"
  on public.resources
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete resources"
  on public.resources
  for delete
  to authenticated
  using (public.is_admin());

-- Storage bucket for PDFs
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'pdfs',
  'pdfs',
  true,
  52428800,
  array['application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read PDFs" on storage.objects;
drop policy if exists "Authenticated can upload PDFs" on storage.objects;
drop policy if exists "Authenticated can update PDFs" on storage.objects;
drop policy if exists "Authenticated can delete PDFs" on storage.objects;
drop policy if exists "Admins can upload PDFs" on storage.objects;
drop policy if exists "Admins can update PDFs" on storage.objects;
drop policy if exists "Admins can delete PDFs" on storage.objects;

-- Public can download PDFs (bucket is public; treat URLs as public assets)
create policy "Public can read PDFs"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'pdfs');

-- Only admins can mutate storage objects
create policy "Admins can upload PDFs"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'pdfs' and public.is_admin());

create policy "Admins can update PDFs"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'pdfs' and public.is_admin())
  with check (bucket_id = 'pdfs' and public.is_admin());

create policy "Admins can delete PDFs"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'pdfs' and public.is_admin());
