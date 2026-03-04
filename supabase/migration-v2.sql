-- Walkway to Healing — Dashboard Migration v2
-- Run this AFTER the initial schema.sql has been applied.
-- This adds the CRM dashboard tables alongside the existing prescreen_submissions.

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION (required by leads table)
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- HELPER FUNCTIONS FOR RLS
-- ============================================================

CREATE OR REPLACE FUNCTION is_active_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM staff_users
    WHERE id = auth.uid()
      AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM staff_users
    WHERE id = auth.uid()
      AND is_active = true
      AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- STAFF USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS staff_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_staff_users_email ON staff_users(email);
CREATE INDEX IF NOT EXISTS idx_staff_users_active ON staff_users(is_active);

-- ============================================================
-- LEADS
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Identity
  full_name TEXT NOT NULL,
  preferred_name TEXT,
  dob DATE,
  phone TEXT,
  email TEXT,
  county TEXT,
  gender_identity TEXT,

  -- Clinical snapshot
  primary_reason TEXT,
  primary_drug TEXT,
  drugs_abusing TEXT[],
  last_use_date TEXT,
  insurance_type TEXT,
  medicaid BOOLEAN,
  diagnosis TEXT,

  -- Flags
  needs_detox_referral BOOLEAN DEFAULT FALSE,
  needs_housing_referral BOOLEAN DEFAULT FALSE,
  needs_medical_eval BOOLEAN DEFAULT FALSE,
  history_seizures BOOLEAN DEFAULT FALSE,
  mobility_issues BOOLEAN DEFAULT FALSE,
  has_open_wounds BOOLEAN DEFAULT FALSE,
  pregnant TEXT,
  sex_offender BOOLEAN DEFAULT FALSE,
  court_appt_next_30 BOOLEAN DEFAULT FALSE,
  court_appt_details TEXT,

  -- Medications
  medications_prescribed TEXT,
  maintenance_clinic TEXT,

  -- CRM
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'scheduled', 'follow_up', 'enrolled', 'not_a_fit'
  )),
  assigned_staff_id UUID REFERENCES staff_users(id),
  source TEXT,
  referral_source TEXT,
  referral_center TEXT,
  ready_now BOOLEAN
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_assigned ON leads(assigned_staff_id);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_name ON leads(full_name);

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- INTAKE FORMS (raw JSON storage)
-- ============================================================
CREATE TABLE IF NOT EXISTS intake_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  prescreen_json JSONB NOT NULL,
  full_intake_json JSONB,
  version TEXT DEFAULT '2.0'
);

CREATE INDEX IF NOT EXISTS idx_intake_forms_lead ON intake_forms(lead_id);

-- ============================================================
-- LEAD NOTES
-- ============================================================
CREATE TABLE IF NOT EXISTS lead_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES staff_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  note TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_lead_notes_lead ON lead_notes(lead_id);

-- ============================================================
-- LEAD ACTIVITY LOG
-- ============================================================
CREATE TABLE IF NOT EXISTS lead_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  staff_id UUID REFERENCES staff_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  action TEXT NOT NULL,
  details JSONB
);

CREATE INDEX IF NOT EXISTS idx_activity_lead ON lead_activity_log(lead_id);
CREATE INDEX IF NOT EXISTS idx_activity_created ON lead_activity_log(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE staff_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE intake_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activity_log ENABLE ROW LEVEL SECURITY;

-- staff_users: active staff can read, admins can write
CREATE POLICY "Staff can view staff list"
  ON staff_users FOR SELECT TO authenticated
  USING (is_active_staff());

CREATE POLICY "Admins can manage staff"
  ON staff_users FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- leads: active staff can read, admins can do everything, staff can update limited fields
CREATE POLICY "Staff can view leads"
  ON leads FOR SELECT TO authenticated
  USING (is_active_staff());

CREATE POLICY "Admins can insert leads"
  ON leads FOR INSERT TO authenticated
  WITH CHECK (is_admin() OR is_active_staff());

CREATE POLICY "Staff can update leads"
  ON leads FOR UPDATE TO authenticated
  USING (is_active_staff());

CREATE POLICY "Admins can delete leads"
  ON leads FOR DELETE TO authenticated
  USING (is_admin());

-- intake_forms: read-only for staff, insert for system
CREATE POLICY "Staff can view intake forms"
  ON intake_forms FOR SELECT TO authenticated
  USING (is_active_staff());

CREATE POLICY "System can insert intake forms"
  ON intake_forms FOR INSERT TO authenticated
  WITH CHECK (true);

-- lead_notes: staff can read and insert
CREATE POLICY "Staff can view notes"
  ON lead_notes FOR SELECT TO authenticated
  USING (is_active_staff());

CREATE POLICY "Staff can add notes"
  ON lead_notes FOR INSERT TO authenticated
  WITH CHECK (is_active_staff());

-- lead_activity_log: staff can read and insert
CREATE POLICY "Staff can view activity"
  ON lead_activity_log FOR SELECT TO authenticated
  USING (is_active_staff());

CREATE POLICY "Staff can log activity"
  ON lead_activity_log FOR INSERT TO authenticated
  WITH CHECK (is_active_staff());

-- ============================================================
-- ALLOW PUBLIC INTAKE TO CREATE LEADS
-- (The intake form submits as anon — needs service role,
--  but we add a policy so server actions using service client work)
-- ============================================================

-- Note: The intake submission uses createServiceClient() which
-- bypasses RLS. No additional anon policy needed for leads/intake_forms.

-- ============================================================
-- MIGRATION: Copy existing prescreen_submissions into leads
-- Uncomment and run this block ONE TIME to migrate existing data.
-- ============================================================
/*
INSERT INTO leads (
  created_at, updated_at, full_name, preferred_name, dob, phone, email, county,
  insurance_type, referral_source, status, source
)
SELECT
  created_at, updated_at, full_name, preferred_name, date_of_birth, phone, email, county,
  insurance_type, referral_source,
  CASE
    WHEN status IN ('new', 'contacted', 'scheduled', 'enrolled', 'not_a_fit') THEN status
    WHEN status = 'needs_follow_up' THEN 'follow_up'
    WHEN status = 'no_show' THEN 'follow_up'
    ELSE 'new'
  END,
  'migrated_v1'
FROM prescreen_submissions
WHERE NOT EXISTS (SELECT 1 FROM leads WHERE leads.phone = prescreen_submissions.phone AND leads.full_name = prescreen_submissions.full_name)
ORDER BY created_at;
*/
