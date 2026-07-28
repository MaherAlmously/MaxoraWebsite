-- Maxora database schema snapshot (Supabase / Postgres, schema "public")
--
-- This project has no tracked migrations directory. The live database in
-- Supabase (project ref qcejbzcrpipgqiuelvqr) is the source of truth, and
-- this file is a point-in-time snapshot of that design so the schema can be
-- reconstructed from the repo alone if the live database is ever lost.
-- Regenerate this file whenever the schema changes; it is not applied
-- automatically.

-- ============================================================
-- Tables
-- ============================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users (id),
  email text,
  role text not null default 'client' check (role = any (array['client', 'admin'])),
  created_at timestamptz not null default now(),
  confirmed_at timestamptz
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  notes text,
  total_cents integer not null check (total_cents >= 0),
  status text not null default 'pending',
  stripe_session_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id),
  product_slug text not null,
  product_name text not null,
  tier_id text not null,
  tier_name text not null,
  unit_price_cents integer not null,
  quantity integer not null default 1 check (quantity > 0)
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  service text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.payment_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  amount_cents integer not null check (amount_cents > 0),
  note text,
  status text not null default 'pending',
  stripe_session_id text,
  created_at timestamptz not null default now()
);

-- Scratch/demo table, not used by the app. Kept here only because it exists
-- in the live database.
create table if not exists public.test_users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.contact_messages enable row level security;
alter table public.payment_requests enable row level security;
alter table public.test_users enable row level security;

-- profiles
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_select_admin" on public.profiles
  for select using (is_admin());

create policy "profiles_update_admin" on public.profiles
  for update using (is_admin());

-- orders (guest checkout allows anonymous insert by design)
create policy "anyone can insert orders" on public.orders
  for insert with check (true);

create policy "users read own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "orders_admin_select" on public.orders
  for select using (is_admin());

create policy "orders_admin_update" on public.orders
  for update using (is_admin());

-- order_items
create policy "anyone can insert order items" on public.order_items
  for insert with check (true);

create policy "users read own order items" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id and o.user_id = auth.uid()
    )
  );

create policy "order_items_admin_select" on public.order_items
  for select using (is_admin());

-- contact_messages
create policy "anyone can insert contact messages" on public.contact_messages
  for insert with check (true);

create policy "contact_messages_admin_select" on public.contact_messages
  for select using (is_admin());

-- payment_requests
create policy "anyone can insert payment requests" on public.payment_requests
  for insert with check (true);

create policy "payment_requests_admin_select" on public.payment_requests
  for select using (is_admin());

create policy "payment_requests_admin_update" on public.payment_requests
  for update using (is_admin());

-- ============================================================
-- Functions
-- ============================================================

-- Used in RLS policies above so admin access doesn't need to be duplicated
-- per table.
create or replace function public.is_admin()
returns boolean
language sql
stable security definer
set search_path to 'public'
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- Keeps public.profiles in sync with new auth.users signups.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  insert into public.profiles (id, email, confirmed_at)
  values (new.id, new.email, new.email_confirmed_at)
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Keeps public.profiles.confirmed_at in sync when a user confirms their
-- email in auth.users.
create or replace function public.handle_user_confirmed()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if new.email_confirmed_at is distinct from old.email_confirmed_at then
    update public.profiles set confirmed_at = new.email_confirmed_at where id = new.id;
  end if;
  return new;
end;
$$;

-- Project-level event trigger function: auto-enables RLS on any new table
-- created in the public schema, so a forgotten `enable row level security`
-- can't ship a publicly readable table by accident. Registered as an event
-- trigger (see below), not attached to a specific table.
create or replace function public.rls_auto_enable()
returns event_trigger
language plpgsql
security definer
set search_path to 'pg_catalog'
as $$
declare
  cmd record;
begin
  for cmd in
    select *
    from pg_event_trigger_ddl_commands()
    where command_tag in ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      and object_type in ('table', 'partitioned table')
  loop
    if cmd.schema_name is not null and cmd.schema_name in ('public') then
      begin
        execute format('alter table if exists %s enable row level security', cmd.object_identity);
      exception
        when others then
          raise log 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      end;
    end if;
  end loop;
end;
$$;

-- ============================================================
-- Triggers
-- ============================================================

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create trigger on_auth_user_confirmed
  after update on auth.users
  for each row execute function public.handle_user_confirmed();

-- Event trigger (database-wide, not table-scoped).
create event trigger ensure_rls
  on ddl_command_end
  execute function public.rls_auto_enable();
