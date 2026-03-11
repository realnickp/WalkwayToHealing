import { z } from 'zod'

export const MD_COUNTIES = [
  'Allegany',
  'Anne Arundel',
  'Baltimore City',
  'Baltimore County',
  'Calvert',
  'Caroline',
  'Carroll',
  'Cecil',
  'Charles',
  'Dorchester',
  'Frederick',
  'Garrett',
  'Harford',
  'Howard',
  'Kent',
  'Montgomery',
  'Prince George\'s',
  'Queen Anne\'s',
  'Somerset',
  'St. Mary\'s',
  'Talbot',
  'Washington',
  'Wicomico',
  'Worcester',
]

export const SUBSTANCES = [
  'Alcohol',
  'Heroin',
  'Fentanyl / Fentanyl Analogues',
  'Prescription Opioids',
  'Methamphetamine',
  'Cocaine / Crack Cocaine',
  'Benzodiazepines',
  'Marijuana / Cannabis',
  'Stimulants (Adderall, Ritalin)',
  'Synthetic Opioids',
  'Other',
]

export const REFERRAL_SOURCES = [
  { id: 'self', label: 'Searched online' },
  { id: 'family', label: 'Family or friend' },
  { id: 'hospital', label: 'Hospital or ER' },
  { id: 'court', label: 'Court or legal' },
  { id: 'probation', label: 'Probation / Parole' },
  { id: 'provider', label: 'Doctor or provider' },
  { id: 'treatment_center', label: 'Treatment center' },
  { id: 'social_media', label: 'Social media' },
  { id: 'other', label: 'Other' },
]

export const GENDER_OPTIONS = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'nonbinary', label: 'Non-binary' },
  { id: 'other', label: 'Other' },
  { id: 'prefer_not', label: 'Prefer not to say' },
]

export const INSURANCE_TYPES = [
  { id: 'medicaid', label: 'Maryland Medicaid' },
  { id: 'medicare', label: 'Medicare' },
  { id: 'private', label: 'Private / Employer' },
  { id: 'uninsured', label: 'No Insurance' },
  { id: 'unknown', label: 'Not Sure' },
]

// ── Step 1: About You ──
export const aboutYouSchema = z.object({
  referralSources: z.array(z.string()).min(1, 'Please tell us how you found us'),
  referralCenter: z.string().optional(),
  readyNow: z.enum(['yes', 'no']).optional(),
  fullName: z.string().min(2, 'Please enter your name'),
  dateOfBirth: z.string().optional(),
  phone: z.string().optional(),
  genderIdentity: z.string().optional(),
  county: z.string().optional(),
})

// ── Step 2: Clinical Info ──
export const clinicalSchema = z.object({
  drugsAbusing: z.array(z.string()).optional(),
  lastUseDate: z.string().optional(),
  medicationsPrescribed: z.string().optional(),
  maintenanceClinic: z.string().optional(),
  insuranceTypes: z.array(z.string()).optional(),
  diagnosis: z.string().optional(),
  needsDetoxReferral: z.enum(['yes', 'no']).optional(),
  needsHousingReferral: z.enum(['yes', 'no']).optional(),
  historySeizures: z.enum(['yes', 'no']).optional(),
  mobilityIssues: z.enum(['yes', 'no']).optional(),
  mobilityDescription: z.string().optional(),
  hasOpenWounds: z.enum(['yes', 'no']).optional(),
  woundsSelfTreatable: z.string().optional(),
  pregnant: z.enum(['yes', 'no', 'na']).optional(),
  sexOffender: z.enum(['yes', 'no']).optional(),
})

// ── Step 3: Review & Submit ──
export const reviewSchema = z.object({
  courtApptNext30: z.enum(['yes', 'no']).optional(),
  courtApptDetails: z.string().optional(),
  anythingElse: z.string().optional(),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to continue' }),
  }),
  signatureName: z.string().min(2, 'Please type your full name'),
})

// Combined schema for server validation
export const prescreenSchema = z.object({
  ...aboutYouSchema.shape,
  ...clinicalSchema.shape,
  ...reviewSchema.shape,
})

export type PrescreenFormData = z.infer<typeof prescreenSchema>
export type AboutYouFormData = z.infer<typeof aboutYouSchema>
export type ClinicalFormData = z.infer<typeof clinicalSchema>
export type ReviewFormData = z.infer<typeof reviewSchema>
