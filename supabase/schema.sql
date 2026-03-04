-- Walkway to Healing — Supabase Database Schema
-- Run this in the Supabase SQL editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PRESCREEN SUBMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS prescreen_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'scheduled', 'no_show', 'enrolled',
    'not_a_fit', 'needs_follow_up', 'needs_medical_evaluation',
    'needs_housing_referral'
  )),

  -- Contact Information
  full_name TEXT NOT NULL,
  preferred_name TEXT,
  date_of_birth DATE,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT DEFAULT 'MD',
  zip TEXT,
  county TEXT,
  gender_identity TEXT,

  -- Contact Preferences (legacy)
  preferred_contact_method TEXT,
  safe_call_times TEXT[],
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relationship TEXT,

  -- Treatment Need (legacy)
  treatment_reason TEXT,

  -- Substance Use
  substances JSONB DEFAULT '[]'::JSONB,
  drugs_abusing TEXT[],
  last_use_date TEXT,
  withdrawal_symptoms JSONB,
  withdrawal_risk_level TEXT CHECK (withdrawal_risk_level IN ('low', 'moderate', 'high')),

  -- Referral
  referral_source TEXT,
  referral_center TEXT,
  ready_now BOOLEAN,

  -- Medications & Clinical
  medications_prescribed TEXT,
  maintenance_clinic TEXT,
  diagnosis TEXT,
  insurance_type TEXT,
  has_medicaid BOOLEAN,
  needs_insurance_verification BOOLEAN DEFAULT FALSE,

  -- Clinical yes/no flags
  needs_detox_referral BOOLEAN DEFAULT FALSE,
  needs_housing_referral BOOLEAN DEFAULT FALSE,
  history_seizures BOOLEAN DEFAULT FALSE,
  mobility_issues BOOLEAN DEFAULT FALSE,
  has_open_wounds BOOLEAN DEFAULT FALSE,
  wounds_self_treatable TEXT,
  pregnant TEXT,
  sex_offender BOOLEAN DEFAULT FALSE,

  -- Court / appointments
  court_appt_next_30 BOOLEAN DEFAULT FALSE,
  court_appt_details TEXT,

  -- Care Logistics (legacy)
  transportation_type TEXT,
  schedule_constraints TEXT[],

  -- Housing & Safety (legacy)
  housing_status TEXT,
  housing_referral_requested BOOLEAN DEFAULT FALSE,
  feels_safe TEXT,
  safety_notes TEXT,

  -- Medical & Accessibility (legacy)
  current_medications JSONB DEFAULT '[]'::JSONB,
  allergies TEXT,
  primary_care_provider TEXT,
  accessibility_needs TEXT[],
  wound_details JSONB,

  -- Legal (legacy)
  on_probation_parole TEXT,
  upcoming_court_dates TEXT,

  -- Consent
  consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  signature_name TEXT,
  consent_timestamp TIMESTAMPTZ,

  -- Meta
  ip_address TEXT,
  form_version TEXT DEFAULT '2.0',
  assigned_to UUID REFERENCES auth.users(id),

  CONSTRAINT consent_must_be_true CHECK (consent_given = TRUE)
);

-- ============================================================
-- STAFF NOTES
-- ============================================================
CREATE TABLE IF NOT EXISTS staff_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES prescreen_submissions(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CALL ATTEMPTS
-- ============================================================
CREATE TABLE IF NOT EXISTS call_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES prescreen_submissions(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT NOT NULL,
  outcome TEXT NOT NULL CHECK (outcome IN (
    'reached', 'voicemail', 'no_answer', 'wrong_number', 'callback_requested'
  )),
  notes TEXT,
  attempted_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_prescreen_status ON prescreen_submissions(status);
CREATE INDEX IF NOT EXISTS idx_prescreen_created ON prescreen_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prescreen_phone ON prescreen_submissions(phone);
CREATE INDEX IF NOT EXISTS idx_prescreen_ip ON prescreen_submissions(ip_address, created_at);
CREATE INDEX IF NOT EXISTS idx_notes_submission ON staff_notes(submission_id);
CREATE INDEX IF NOT EXISTS idx_calls_submission ON call_attempts(submission_id);

-- ============================================================
-- UPDATED AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_prescreen_updated_at
  BEFORE UPDATE ON prescreen_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE prescreen_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_attempts ENABLE ROW LEVEL SECURITY;

-- Prescreen submissions:
-- Anyone can INSERT (public intake form)
-- Only authenticated staff can SELECT, UPDATE
CREATE POLICY "Allow public insert" ON prescreen_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (TRUE);

CREATE POLICY "Staff can view submissions" ON prescreen_submissions
  FOR SELECT TO authenticated
  USING (auth.role() = 'authenticated');

CREATE POLICY "Staff can update submissions" ON prescreen_submissions
  FOR UPDATE TO authenticated
  USING (auth.role() = 'authenticated');

-- Staff notes: only authenticated users
CREATE POLICY "Staff notes access" ON staff_notes
  FOR ALL TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Call attempts: only authenticated users
CREATE POLICY "Call attempts access" ON call_attempts
  FOR ALL TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- MIGRATION HELPER (for existing databases)
-- Run this if upgrading from v1.0 schema
-- ============================================================
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS gender_identity TEXT;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS referral_center TEXT;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS ready_now BOOLEAN;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS drugs_abusing TEXT[];
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS last_use_date TEXT;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS medications_prescribed TEXT;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS maintenance_clinic TEXT;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS diagnosis TEXT;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS needs_detox_referral BOOLEAN DEFAULT FALSE;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS history_seizures BOOLEAN DEFAULT FALSE;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS mobility_issues BOOLEAN DEFAULT FALSE;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS wounds_self_treatable TEXT;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS pregnant TEXT;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS sex_offender BOOLEAN DEFAULT FALSE;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS court_appt_next_30 BOOLEAN DEFAULT FALSE;
-- ALTER TABLE prescreen_submissions ADD COLUMN IF NOT EXISTS court_appt_details TEXT;
-- ALTER TABLE prescreen_submissions ALTER COLUMN treatment_reason DROP NOT NULL;
