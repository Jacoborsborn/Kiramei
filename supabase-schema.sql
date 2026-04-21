-- Run this in your Supabase SQL editor

CREATE TABLE kira_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  name text NOT NULL,
  age int NOT NULL,
  country text NOT NULL,
  email text NOT NULL,
  instagram text,
  plan_selected text CHECK (plan_selected IN ('monthly', 'bundle')),
  goal text,
  fitness_level text,
  days_per_week text,
  equipment text,
  injuries text,
  referral_source text,
  notes text,
  status text DEFAULT 'pending'
    CHECK (status IN ('pending', 'paid', 'accepted', 'rejected')) NOT NULL
);

-- RLS
ALTER TABLE kira_leads ENABLE ROW LEVEL SECURITY;

-- Public can insert (intake form)
CREATE POLICY "anon can insert leads"
  ON kira_leads FOR INSERT
  TO anon
  WITH CHECK (true);

-- Authenticated (you) can read and update
CREATE POLICY "auth can select leads"
  ON kira_leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth can update leads"
  ON kira_leads FOR UPDATE
  TO authenticated
  USING (true);
