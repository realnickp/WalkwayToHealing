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
  referralSource: z.string().min(1, 'Please tell us how you found us'),
  referralCenter: z.string().optional(),
  readyNow: z.enum(['yes', 'no'], { required_error: 'Please let us know' }),
  fullName: z.string().min(2, 'Please enter your name'),
  dateOfBirth: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Please enter date as MM/DD/YYYY'),
  phone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid 10-digit phone number'),
  genderIdentity: z.string().min(1, 'Please select an option'),
  county: z.string().min(1, 'Please select your county'),
})

// ── Step 2: Clinical Info ──
export const clinicalSchema = z.object({
  drugsAbusing: z.array(z.string()).min(1, 'Please select at least one'),
  lastUseDate: z.string().min(1, 'Please let us know when you last used'),
  medicationsPrescribed: z.string().optional(),
  maintenanceClinic: z.string().optional(),
  insuranceType: z.string().min(1, 'Please select your insurance'),
  diagnosis: z.string().optional(),
  needsDetoxReferral: z.enum(['yes', 'no'], { required_error: 'Please select' }),
  needsHousingReferral: z.enum(['yes', 'no'], { required_error: 'Please select' }),
  historySeizures: z.enum(['yes', 'no'], { required_error: 'Please select' }),
  mobilityIssues: z.enum(['yes', 'no'], { required_error: 'Please select' }),
  mobilityDescription: z.string().optional(),
  hasOpenWounds: z.enum(['yes', 'no'], { required_error: 'Please select' }),
  woundsSelfTreatable: z.string().optional(),
  pregnant: z.enum(['yes', 'no', 'na'], { required_error: 'Please select' }),
  sexOffender: z.enum(['yes', 'no'], { required_error: 'Please select' }),
})

// ── Step 3: Review & Submit ──
export const reviewSchema = z.object({
  courtApptNext30: z.enum(['yes', 'no'], { required_error: 'Please select' }),
  courtApptDetails: z.string().optional(),
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
