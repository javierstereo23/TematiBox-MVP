-- ============================================================================
-- TEMATIBOX DIGITAL — Schema inicial
-- ============================================================================
-- Ejecutá este script completo en el SQL Editor de Supabase:
--   Dashboard → SQL Editor → New query → pegar → RUN
-- Es idempotente (podés correrlo varias veces sin romper nada)
-- ============================================================================

-- Profiles: extiende auth.users con datos propios de la app
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  phone text,
  first_discount_used boolean default false,
  source text default 'signup', -- 'signup' | 'popup' | 'checkout' | 'newsletter'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Orders: pedidos con su estado y personalización
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  email text not null,
  product_id text not null,
  product_title text not null,
  product_image text,
  amount numeric(10,2) not null,
  discount_applied numeric(10,2) default 0,
  personalization jsonb,
  mp_preference_id text,
  mp_payment_id text,
  mp_status text default 'pending', -- 'pending' | 'approved' | 'rejected' | 'in_process'
  files_delivered boolean default false,
  files_delivered_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Coupons: cupones por usuario (ej. 10% OFF primera compra)
create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  email text not null,
  code text unique not null,
  percent_off int not null default 10,
  max_uses int default 1,
  times_used int default 0,
  valid_until timestamptz,
  created_at timestamptz default now()
);

-- Events: tracking para funnel / remarketing
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  email text,
  event_type text not null, -- 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase' | 'abandoned_cart'
  metadata jsonb,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_orders_user on public.orders(user_id);
create index if not exists idx_orders_email on public.orders(email);
create index if not exists idx_orders_status on public.orders(mp_status);
create index if not exists idx_coupons_code on public.coupons(code);
create index if not exists idx_coupons_email on public.coupons(email);
create index if not exists idx_events_user on public.events(user_id);
create index if not exists idx_events_type on public.events(event_type);

-- ============================================================================
-- Trigger: auto-crear profile cuando un user se registra
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, source)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    'signup'
  )
  on conflict (id) do nothing;

  -- Crear cupón automático de 10% OFF primera compra
  insert into public.coupons (user_id, email, code, percent_off, max_uses)
  values (
    new.id,
    new.email,
    'BIENVENIDA-' || upper(substring(new.id::text, 1, 8)),
    10,
    1
  )
  on conflict (code) do nothing;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.coupons enable row level security;
alter table public.events enable row level security;

-- Profiles: cada user ve/edita sólo el suyo
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Orders: cada user ve sólo sus pedidos
drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);

-- Coupons: cada user ve sólo sus cupones
drop policy if exists "coupons_select_own" on public.coupons;
create policy "coupons_select_own" on public.coupons
  for select using (auth.uid() = user_id);

-- Events: el user inserta sus propios eventos
drop policy if exists "events_insert_own" on public.events;
create policy "events_insert_own" on public.events
  for insert with check (auth.uid() = user_id or user_id is null);
drop policy if exists "events_select_own" on public.events;
create policy "events_select_own" on public.events
  for select using (auth.uid() = user_id);

-- ============================================================================
-- Listo!
-- Siguientes pasos:
-- 1. Settings → Authentication → Providers → habilitar Google
--    (configurar OAuth client en Google Cloud Console)
-- 2. Settings → Authentication → URL Configuration:
--    - Site URL: https://temati-box-mvp.vercel.app
--    - Redirect URLs: agregar http://localhost:3002/auth/callback y
--      https://temati-box-mvp.vercel.app/auth/callback
-- ============================================================================
