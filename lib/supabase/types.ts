export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ── Status enums ──

export type SubmissionStatus =
  | 'new'
  | 'contacted'
  | 'scheduled'
  | 'no_show'
  | 'enrolled'
  | 'not_a_fit'
  | 'needs_follow_up'
  | 'needs_medical_evaluation'
  | 'needs_housing_referral'

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'scheduled'
  | 'follow_up'
  | 'enrolled'
  | 'not_a_fit'

export type StaffRole = 'admin' | 'staff'

// ── Legacy row types (prescreen_submissions) ──

export interface Substance {
  name: string
  route?: string
  frequency?: string
  typical_amount?: string
  last_use_date?: string
  last_use_time?: string
  years_of_use?: string
  has_overdosed?: boolean
  last_overdose_date?: string
}

export interface Medication {
  name: string
  dose?: string
  frequency?: string
}

export interface WoundDetail {
  location: string
  duration: string
  signs_of_infection: string
  needs_eval: boolean
  permission_to_coordinate: boolean
}

export type PrescreenSubmissionRow = {
  id: string
  created_at: string
  updated_at: string
  status: SubmissionStatus
  full_name: string
  preferred_name: string | null
  date_of_birth: string | null
  phone: string
  email: string | null
  address: string | null
  city: string | null
  state: string | null
  zip: string | null
  county: string | null
  gender_identity: string | null
  preferred_contact_method: string | null
  safe_call_times: string[] | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  emergency_contact_relationship: string | null
  treatment_reason: string | null
  substances: Json
  drugs_abusing: string[] | null
  last_use_date: string | null
  withdrawal_risk_level: string | null
  withdrawal_symptoms: Json | null
  referral_source: string | null
  referral_center: string | null
  ready_now: boolean | null
  medications_prescribed: string | null
  maintenance_clinic: string | null
  diagnosis: string | null
  insurance_type: string | null
  has_medicaid: boolean | null
  needs_insurance_verification: boolean
  needs_detox_referral: boolean
  needs_housing_referral: boolean
  history_seizures: boolean
  mobility_issues: boolean
  has_open_wounds: boolean
  wounds_self_treatable: string | null
  pregnant: string | null
  sex_offender: boolean
  court_appt_next_30: boolean
  court_appt_details: string | null
  transportation_type: string | null
  schedule_constraints: string[] | null
  housing_status: string | null
  housing_referral_requested: boolean
  feels_safe: string | null
  safety_notes: string | null
  current_medications: Json
  allergies: string | null
  primary_care_provider: string | null
  accessibility_needs: string[] | null
  wound_details: Json | null
  on_probation_parole: string | null
  upcoming_court_dates: string | null
  consent_given: boolean
  signature_name: string
  consent_timestamp: string
  ip_address: string | null
  form_version: string
  assigned_to: string | null
}

export type StaffNoteRow = {
  id: string
  submission_id: string
  author_id: string
  author_name: string
  note: string
  created_at: string
}

export type CallAttemptRow = {
  id: string
  submission_id: string
  author_id: string
  author_name: string
  outcome: string
  notes: string | null
  attempted_at: string
}

// ── Dashboard row types ──

export type StaffUserRow = {
  id: string
  name: string
  email: string
  role: StaffRole
  is_active: boolean
  created_at: string
}

export type LeadRow = {
  id: string
  created_at: string
  updated_at: string
  full_name: string
  preferred_name: string | null
  dob: string | null
  phone: string | null
  email: string | null
  county: string | null
  gender_identity: string | null
  primary_reason: string | null
  primary_drug: string | null
  drugs_abusing: string[] | null
  last_use_date: string | null
  insurance_type: string | null
  medicaid: boolean | null
  diagnosis: string | null
  needs_detox_referral: boolean
  needs_housing_referral: boolean
  needs_medical_eval: boolean
  history_seizures: boolean
  mobility_issues: boolean
  has_open_wounds: boolean
  pregnant: string | null
  sex_offender: boolean
  court_appt_next_30: boolean
  court_appt_details: string | null
  medications_prescribed: string | null
  maintenance_clinic: string | null
  status: LeadStatus
  assigned_staff_id: string | null
  source: string | null
  referral_source: string | null
  referral_center: string | null
  ready_now: boolean | null
}

export type IntakeFormRow = {
  id: string
  lead_id: string
  created_at: string
  prescreen_json: Json
  full_intake_json: Json | null
  version: string | null
}

export type LeadNoteRow = {
  id: string
  lead_id: string
  staff_id: string
  created_at: string
  note: string
}

export type LeadActivityRow = {
  id: string
  lead_id: string
  staff_id: string | null
  created_at: string
  action: string
  details: Json | null
}

// ── Database interface ──

export interface Database {
  public: {
    Tables: {
      prescreen_submissions: {
        Row: PrescreenSubmissionRow
        Insert: Partial<PrescreenSubmissionRow> & { full_name: string; phone: string; consent_given: boolean; signature_name: string }
        Update: Partial<PrescreenSubmissionRow>
        Relationships: []
      }
      staff_notes: {
        Row: StaffNoteRow
        Insert: Omit<StaffNoteRow, 'id' | 'created_at'>
        Update: Partial<StaffNoteRow>
        Relationships: []
      }
      call_attempts: {
        Row: CallAttemptRow
        Insert: Omit<CallAttemptRow, 'id' | 'attempted_at'>
        Update: Partial<CallAttemptRow>
        Relationships: []
      }
      staff_users: {
        Row: StaffUserRow
        Insert: Omit<StaffUserRow, 'created_at'>
        Update: Partial<StaffUserRow>
        Relationships: []
      }
      leads: {
        Row: LeadRow
        Insert: Partial<LeadRow> & { full_name: string }
        Update: Partial<LeadRow>
        Relationships: []
      }
      intake_forms: {
        Row: IntakeFormRow
        Insert: Omit<IntakeFormRow, 'id' | 'created_at'>
        Update: Partial<IntakeFormRow>
        Relationships: []
      }
      lead_notes: {
        Row: LeadNoteRow
        Insert: Omit<LeadNoteRow, 'id' | 'created_at'>
        Update: Partial<LeadNoteRow>
        Relationships: []
      }
      lead_activity_log: {
        Row: LeadActivityRow
        Insert: Omit<LeadActivityRow, 'id' | 'created_at'>
        Update: Partial<LeadActivityRow>
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
