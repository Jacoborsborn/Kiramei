-- ═══════════════════════════════════════════════════════
--  Kira Mei — Full Schema
--  Run this in Supabase SQL Editor after wiping all tables
-- ═══════════════════════════════════════════════════════

-- ── Existing coaching tables ─────────────────────────────

create table kira_leads (
  id                     uuid primary key default gen_random_uuid(),
  email                  text not null,
  name                   text not null default '',
  status                 text not null default 'pending',
  plan_selected          text,
  user_id                uuid references auth.users on delete set null,
  stripe_customer_id     text,
  stripe_subscription_id text,
  activation_token       text,
  created_at             timestamptz not null default now()
);

create table kira_programmes (
  id        uuid primary key default gen_random_uuid(),
  user_id   uuid not null references auth.users on delete cascade,
  programme jsonb not null,
  sent_at   timestamptz not null default now()
);

create table kira_checkins (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users on delete cascade,
  lead_id             uuid references kira_leads on delete set null,
  week_number         int,
  energy              int,
  sleep_hrs           numeric,
  sessions_completed  int,
  weight              numeric,
  notes               text,
  created_at          timestamptz not null default now()
);

create table kira_progress (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users on delete cascade,
  lead_id          uuid references kira_leads on delete set null,
  week_number      int,
  waist            numeric,
  hips             numeric,
  weight           numeric,
  energy_score     int,
  strength_notes   text,
  created_at       timestamptz not null default now()
);

create table kira_body_comp (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null unique references auth.users on delete cascade,
  lead_id          uuid references kira_leads on delete set null,
  frame_type       text,
  body_fat_est     text,
  hormonal_notes   text,
  priority_areas   text[],
  measurements     jsonb,
  analysed_at      timestamptz not null default now()
);

-- ── Programme app tables ──────────────────────────────────

create table profiles (
  id               uuid primary key references auth.users on delete cascade,
  email            text,
  full_name        text,
  programme_access boolean not null default false,
  template_access  boolean not null default false,
  created_at       timestamptz not null default now()
);

create table week_progress (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references profiles on delete cascade,
  week_number     int not null check (week_number between 1 and 8),
  session_a_done  boolean not null default false,
  session_b_done  boolean not null default false,
  session_c_done  boolean not null default false,
  quiz_passed     boolean not null default false,
  week_complete   boolean not null default false,
  completed_at    timestamptz,
  unique (user_id, week_number)
);

create table exercise_logs (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references profiles on delete cascade,
  week_number    int not null,
  session_label  text not null check (session_label in ('A', 'B', 'C')),
  exercise_name  text not null,
  weight_kg      numeric,
  reps           int,
  rpe            int check (rpe between 1 and 10),
  logged_at      timestamptz not null default now()
);

-- ── Auto-create profiles row on new auth user ─────────────

create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ── RLS ───────────────────────────────────────────────────

alter table profiles        enable row level security;
alter table week_progress   enable row level security;
alter table exercise_logs   enable row level security;
alter table kira_leads      enable row level security;
alter table kira_programmes enable row level security;
alter table kira_checkins   enable row level security;
alter table kira_progress   enable row level security;
alter table kira_body_comp  enable row level security;

create policy "profiles_own" on profiles for all
  using (auth.uid() = id) with check (auth.uid() = id);

create policy "week_progress_own" on week_progress for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "exercise_logs_own" on exercise_logs for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "leads_own_read" on kira_leads for select
  using (auth.uid() = user_id);

create policy "programmes_own_read" on kira_programmes for select
  using (auth.uid() = user_id);

create policy "checkins_own" on kira_checkins for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "progress_own" on kira_progress for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "body_comp_own_read" on kira_body_comp for select
  using (auth.uid() = user_id);
