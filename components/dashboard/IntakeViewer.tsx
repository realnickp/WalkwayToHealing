'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, FileText } from 'lucide-react'
import type { Json } from '@/lib/supabase/types'

const SECTION_MAP: Record<string, string> = {
  referralSource: 'Referral Source',
  referralSources: 'Referral Sources',
  referralCenter: 'Referral Center',
  readyNow: 'Ready Now',
  fullName: 'Full Name',
  dateOfBirth: 'Date of Birth',
  phone: 'Phone',
  genderIdentity: 'Gender Identity',
  county: 'County',
  drugsAbusing: 'Substances',
  lastUseDate: 'Last Use',
  medicationsPrescribed: 'Medications',
  maintenanceClinic: 'Maintenance Clinic',
  insuranceType: 'Insurance',
  insuranceTypes: 'Insurance',
  diagnosis: 'Diagnosis',
  needsDetoxReferral: 'Needs Detox Referral',
  needsHousingReferral: 'Needs Housing Referral',
  historySeizures: 'Seizure History',
  mobilityIssues: 'Mobility Issues',
  mobilityDescription: 'Mobility Details',
  hasOpenWounds: 'Open Wounds',
  woundsSelfTreatable: 'Wounds Self-Treatable',
  pregnant: 'Pregnant',
  sexOffender: 'Sex Offender',
  courtApptNext30: 'Court Appts (30 days)',
  courtApptDetails: 'Court Details',
  anythingElse: 'Additional Notes from Client',
}

function formatValue(val: unknown): string {
  if (val === null || val === undefined || val === '') return '—'
  if (typeof val === 'boolean') return val ? 'Yes' : 'No'
  if (val === 'yes') return 'Yes'
  if (val === 'no') return 'No'
  if (val === 'na') return 'N/A'
  if (Array.isArray(val)) return val.join(', ') || '—'
  if (typeof val === 'object') return JSON.stringify(val, null, 2)
  return String(val)
}

interface Props {
  data: Json
}

export function IntakeViewer({ data }: Props) {
  const [expanded, setExpanded] = useState(false)

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return null
  }

  const entries = Object.entries(data as Record<string, unknown>)
  const displayEntries = expanded ? entries : entries.slice(0, 8)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 font-semibold text-stone-900">
          <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
          Intake Form Answers
        </h3>
      </div>

      <div className="space-y-2">
        {displayEntries.map(([key, val]) => (
          <div key={key} className="flex flex-col sm:flex-row items-start gap-3 py-2 border-b border-stone-50 last:border-0">
            <span className="text-xs text-stone-400 sm:w-36 sm:shrink-0 pt-0.5">
              {SECTION_MAP[key] || key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className="text-sm text-stone-800 break-words">
              {formatValue(val)}
            </span>
          </div>
        ))}
      </div>

      {entries.length > 8 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 mt-3 text-primary text-sm font-medium hover:underline"
        >
          {expanded ? (
            <>Show less <ChevronUp className="h-3.5 w-3.5" /></>
          ) : (
            <>Show all {entries.length} fields <ChevronDown className="h-3.5 w-3.5" /></>
          )}
        </button>
      )}
    </div>
  )
}
