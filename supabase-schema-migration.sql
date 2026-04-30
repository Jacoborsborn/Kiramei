-- ============================================================
-- Kira Mei — Schema Migration v2 (Client Portal)
-- Run this in your Supabase SQL editor
-- ============================================================

-- 1. Add new columns to kira_leads
ALTER TABLE kira_leads
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS stripe_customer_id text,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id text,
  ADD COLUMN IF NOT EXISTS activation_token text;

-- 2. Update RLS on kira_leads
--    Keep anon insert (intake form unchanged)
--    Replace permissive auth policies with user-scoped ones
--    Admin routes bypass RLS via service_role key so this is safe

DROP POLICY IF EXISTS "auth can select leads" ON kira_leads;
DROP POLICY IF EXISTS "auth can update leads" ON kira_leads;

-- Clients can only read their own lead
CREATE POLICY "client can select own lead"
  ON kira_leads FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Clients can update their own lead (e.g. profile changes)
CREATE POLICY "client can update own lead"
  ON kira_leads FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- 3. Programmes table
CREATE TABLE IF NOT EXISTS kira_programmes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid REFERENCES kira_leads(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  programme jsonb NOT NULL,
  sent_at timestamptz DEFAULT now()
);

ALTER TABLE kira_programmes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "client can select own programme"
  ON kira_programmes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 4. Check-ins table (Pro)
CREATE TABLE IF NOT EXISTS kira_checkins (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  lead_id uuid REFERENCES kira_leads(id),
  week_number int NOT NULL,
  energy int CHECK (energy BETWEEN 1 AND 10),
  sleep_hrs numeric(3,1),
  sessions_completed int,
  weight numeric(5,2),
  notes text,
  submitted_at timestamptz DEFAULT now()
);

ALTER TABLE kira_checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "client can manage own checkins"
  ON kira_checkins FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. Body composition table (Pro — filled by Kira via admin)
CREATE TABLE IF NOT EXISTS kira_body_comp (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  lead_id uuid REFERENCES kira_leads(id),
  frame_type text,
  body_fat_est text,
  hormonal_notes text,
  priority_areas text,
  measurements jsonb,
  analysed_at timestamptz DEFAULT now()
);

ALTER TABLE kira_body_comp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "client can select own body comp"
  ON kira_body_comp FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 6. Progress tracking table (Pro)
CREATE TABLE IF NOT EXISTS kira_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  lead_id uuid REFERENCES kira_leads(id),
  week_number int NOT NULL,
  waist numeric(5,2),
  hips numeric(5,2),
  weight numeric(5,2),
  energy_score int CHECK (energy_score BETWEEN 1 AND 10),
  strength_notes text,
  logged_at timestamptz DEFAULT now()
);

ALTER TABLE kira_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "client can manage own progress"
  ON kira_progress FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
