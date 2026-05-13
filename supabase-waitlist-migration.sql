-- ═══════════════════════════════════════════════════════
--  Waitlist table — run in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════

create table if not exists waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  product    text not null check (product in ('nutrition', 'bundle')),
  created_at timestamptz not null default now(),
  unique (email, product)
);

-- Allow the service role (server-side) to insert — no RLS needed for a public waitlist
-- The API route uses the service client so RLS bypass is fine here.
-- If you want to enable RLS anyway:
-- alter table waitlist enable row level security;
-- create policy "service_only" on waitlist for all using (false);
