-- Run this if you already applied an older schema.sql
-- Re-applies admin-only RLS + storage policies without recreating the table.

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

alter table public.resources enable row level security;

drop policy if exists "Public can read published resources" on public.resources;
drop policy if exists "Authenticated can read all resources" on public.resources;
drop policy if exists "Authenticated can insert resources" on public.resources;
drop policy if exists "Authenticated can update resources" on public.resources;
drop policy if exists "Authenticated can delete resources" on public.resources;
drop policy if exists "Admins can read all resources" on public.resources;
drop policy if exists "Admins can insert resources" on public.resources;
drop policy if exists "Admins can update resources" on public.resources;
drop policy if exists "Admins can delete resources" on public.resources;

create policy "Public can read published resources"
  on public.resources
  for select
  to anon, authenticated
  using (published = true);

create policy "Admins can read all resources"
  on public.resources
  for select
  to authenticated
  using (public.is_admin());

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

drop policy if exists "Public can read PDFs" on storage.objects;
drop policy if exists "Authenticated can upload PDFs" on storage.objects;
drop policy if exists "Authenticated can update PDFs" on storage.objects;
drop policy if exists "Authenticated can delete PDFs" on storage.objects;
drop policy if exists "Admins can upload PDFs" on storage.objects;
drop policy if exists "Admins can update PDFs" on storage.objects;
drop policy if exists "Admins can delete PDFs" on storage.objects;

create policy "Public can read PDFs"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'pdfs');

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
