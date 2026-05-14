-- ============================================================
-- Kira Mei — Accounts, Activation & Referrals Migration
-- Run in Supabase SQL Editor after supabase-schema.sql
-- ============================================================

-- 1. Extend profiles with account fields
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS first_name        text,
  ADD COLUMN IF NOT EXISTS last_name         text,
  ADD COLUMN IF NOT EXISTS date_of_birth     date,
  ADD COLUMN IF NOT EXISTS country           text,
  ADD COLUMN IF NOT EXISTS goal              text CHECK (goal IN ('strength','general','fatloss','restart')),
  ADD COLUMN IF NOT EXISTS experience        text CHECK (experience IN ('new','some','exp','returning')),
  ADD COLUMN IF NOT EXISTS training_days_pw  int CHECK (training_days_pw BETWEEN 2 AND 6),
  ADD COLUMN IF NOT EXISTS avatar_url        text,
  ADD COLUMN IF NOT EXISTS referral_code     text UNIQUE,
  ADD COLUMN IF NOT EXISTS referred_by_id    uuid REFERENCES profiles(id),
  ADD COLUMN IF NOT EXISTS credit_pence      int NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS email_verified_at timestamptz,
  ADD COLUMN IF NOT EXISTS password_hash     text,
  ADD COLUMN IF NOT EXISTS deleted_at        timestamptz,
  ADD COLUMN IF NOT EXISTS delete_requested_at timestamptz;

-- 2. Email preferences (1:1 with profiles)
CREATE TABLE IF NOT EXISTS email_prefs (
  user_id          uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  weekly_recap     boolean NOT NULL DEFAULT true,
  product_drops    boolean NOT NULL DEFAULT true,
  partner_offers   boolean NOT NULL DEFAULT false,
  long_reads       boolean NOT NULL DEFAULT false,
  paused_until     timestamptz,
  consent_log      jsonb NOT NULL DEFAULT '[]',
  updated_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE email_prefs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "email_prefs_own" ON email_prefs FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3. Activation tokens (1:1 with profiles, replaced each re-issue)
CREATE TABLE IF NOT EXISTS activation_tokens (
  user_id    uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  token      text NOT NULL UNIQUE,
  otp_hash   text NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at    timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Service role only — no RLS policy for clients
ALTER TABLE activation_tokens ENABLE ROW LEVEL SECURITY;

-- 4. Orders
CREATE TABLE IF NOT EXISTS orders (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_id     text NOT NULL UNIQUE,
  product_sku   text NOT NULL, -- training | nutrition | bundle | merch:notebook
  amount_pence  int NOT NULL,
  discount_code text,
  status        text NOT NULL DEFAULT 'paid' CHECK (status IN ('paid','refunded')),
  stripe_event_id text UNIQUE, -- idempotency key
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_own_read" ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- 5. Referrals
CREATE TABLE IF NOT EXISTS referrals (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id      uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  referee_email    text NOT NULL,
  referee_user_id  uuid REFERENCES profiles(id),
  order_id         uuid REFERENCES orders(id),
  status           text NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending','joined','refunded','expired')),
  reward_pence     int NOT NULL DEFAULT 1000,
  discount_pence   int NOT NULL DEFAULT 1000,
  unlocked_at      timestamptz,
  expires_at       timestamptz NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "referrals_own_read" ON referrals FOR SELECT
  USING (auth.uid() = referrer_id);

-- 6. User sessions (for security tab — device tracking)
CREATE TABLE IF NOT EXISTS user_sessions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  device_label  text NOT NULL DEFAULT 'Unknown device',
  ip_address    text,
  last_seen_at  timestamptz NOT NULL DEFAULT now(),
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_sessions_own" ON user_sessions FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 7. Magic link tokens (for /signin/magic-link)
CREATE TABLE IF NOT EXISTS magic_link_tokens (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  token      text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used_at    timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE magic_link_tokens ENABLE ROW LEVEL SECURITY;

-- 8. Index on referral_code for lookup speed
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON profiles(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referee_email ON referrals(referee_email);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_activation_tokens_token ON activation_tokens(token);

-- 9. Credit helper RPCs (atomic increment / decrement)
CREATE OR REPLACE FUNCTION increment_credit(p_user_id uuid, p_amount int)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE profiles
  SET credit_pence = credit_pence + p_amount
  WHERE id = p_user_id;
$$;

CREATE OR REPLACE FUNCTION decrement_credit(p_user_id uuid, p_amount int)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE profiles
  SET credit_pence = GREATEST(0, credit_pence - p_amount)
  WHERE id = p_user_id;
$$;
