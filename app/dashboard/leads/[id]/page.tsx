import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import { getLead, getAllStaff } from '@/lib/actions/dashboard'
import { getStaffUser } from '@/lib/actions/auth'
import { LeadActions } from '@/components/dashboard/LeadActions'
import { IntakeViewer } from '@/components/dashboard/IntakeViewer'
import { NotesPanel } from '@/components/dashboard/NotesPanel'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { ExportButton } from '@/components/dashboard/ExportButton'
import { format } from 'date-fns'
import {
  ArrowLeft, Phone, Mail, Calendar, Pill,
  Home, Stethoscope, Gavel, Shield
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lead Detail',
  robots: { index: false, follow: false },
}

function Section({ title, icon: Icon, children }: { title: string; icon: typeof Phone; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-5 md:p-6">
      <h3 className="flex items-center gap-2 font-semibold text-stone-900 mb-4">
        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
        {title}
      </h3>
      {children}
    </div>
  )
}

function Field({ label, value, href }: { label: string; value: string | null | undefined | boolean; href?: string }) {
  const display = value === null || value === undefined || value === ''
    ? '—'
    : typeof value === 'boolean'
    ? value ? 'Yes' : 'No'
    : String(value)

  return (
    <div className="py-2 border-b border-stone-50 last:border-0">
      <p className="text-xs text-stone-400 mb-0.5">{label}</p>
      {href ? (
        <a href={href} className="text-sm text-primary font-medium hover:underline">{display}</a>
      ) : (
        <p className="text-sm text-stone-800">{display}</p>
      )}
    </div>
  )
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  let staff
  try {
    staff = await getStaffUser()
  } catch {
    redirect('/dashboard/login')
  }

  const { id } = await params

  let data
  try {
    data = await getLead(id)
  } catch {
    notFound()
  }

  const { lead, intakeForm, notes, activity } = data
  const staffList = await getAllStaff()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back + header */}
      <div className="mb-6">
        <Link
          href="/dashboard/leads"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leads
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
              {lead.full_name}
            </h1>
            {lead.preferred_name && (
              <p className="text-stone-500 text-sm mt-0.5">Goes by &ldquo;{lead.preferred_name}&rdquo;</p>
            )}
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-stone-500">
              {lead.phone && (
                <a href={`tel:${lead.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 min-h-[44px] py-2 px-3 text-primary font-medium hover:underline rounded-lg">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {lead.phone}
                </a>
              )}
              {lead.email && (
                <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-2 min-h-[44px] py-2 px-3 text-primary font-medium hover:underline rounded-lg">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {lead.email}
                </a>
              )}
              {lead.dob && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  DOB: {format(new Date(lead.dob), 'MM/dd/yyyy')}
                </span>
              )}
              <span className="text-stone-400 text-xs">
                Submitted {format(new Date(lead.created_at), 'MMM d, yyyy h:mm a')}
              </span>
            </div>
          </div>

          {staff.role === 'admin' && (
            <ExportButton leadId={lead.id} />
          )}
        </div>
      </div>

      {/* Status + assignment bar */}
      <div className="bg-white rounded-2xl border border-stone-100 p-5 mb-6">
        <LeadActions
          leadId={lead.id}
          currentStatus={lead.status}
          currentStaffId={lead.assigned_staff_id}
          staffList={staffList}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content — left 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Treatment summary */}
          <Section title="Treatment Summary" icon={Pill}>
            <Field label="Primary Drug" value={lead.primary_drug} />
            <Field label="All Substances" value={lead.drugs_abusing?.join(', ')} />
            <Field label="Last Use" value={lead.last_use_date} />
            <Field label="Diagnosis" value={lead.diagnosis} />
            <Field label="Ready Now" value={lead.ready_now === null ? null : lead.ready_now ? 'Yes' : 'Not yet'} />
            <Field label="Referral Source" value={lead.referral_source} />
            {lead.referral_center && <Field label="Referral Center" value={lead.referral_center} />}
          </Section>

          {/* Logistics */}
          <Section title="Logistics" icon={Shield}>
            <Field label="Insurance" value={lead.insurance_type} />
            <Field label="County" value={lead.county} />
            <Field label="Gender Identity" value={lead.gender_identity} />
          </Section>

          {/* Housing */}
          <Section title="Housing" icon={Home}>
            <Field label="Needs Housing Referral" value={lead.needs_housing_referral} />
            <Field label="Needs Detox Referral" value={lead.needs_detox_referral} />
          </Section>

          {/* Medical */}
          <Section title="Medical & Accessibility" icon={Stethoscope}>
            <Field label="Medications" value={lead.medications_prescribed} />
            <Field label="Maintenance Clinic" value={lead.maintenance_clinic} />
            <Field label="History of Seizures" value={lead.history_seizures} />
            <Field label="Mobility Issues" value={lead.mobility_issues} />
            <Field label="Open Wounds" value={lead.has_open_wounds} />
            <Field label="Pregnant" value={lead.pregnant === 'yes' ? 'Yes' : lead.pregnant === 'no' ? 'No' : lead.pregnant === 'na' ? 'N/A' : null} />
            <Field label="Needs Medical Evaluation" value={lead.needs_medical_eval} />
          </Section>

          {/* Legal */}
          {(lead.court_appt_next_30 || lead.sex_offender) && (
            <Section title="Legal" icon={Gavel}>
              <Field label="Court/Dr Appts (next 30 days)" value={lead.court_appt_next_30} />
              {lead.court_appt_details && <Field label="Details" value={lead.court_appt_details} />}
              <Field label="Sex Offender" value={lead.sex_offender} />
            </Section>
          )}

          {/* Intake form viewer */}
          {intakeForm?.prescreen_json && (
            <div className="bg-white rounded-2xl border border-stone-100 p-5 md:p-6">
              <IntakeViewer data={intakeForm.prescreen_json} />
            </div>
          )}
        </div>

        {/* Sidebar — right column */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-100 p-5 md:p-6">
            <NotesPanel leadId={lead.id} notes={notes} />
          </div>

          <div className="bg-white rounded-2xl border border-stone-100 p-5 md:p-6">
            <ActivityFeed activity={activity} />
          </div>
        </div>
      </div>
    </div>
  )
}
