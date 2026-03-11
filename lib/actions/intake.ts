'use server'

import { createServiceClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '300', 10)
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '3', 10)

async function checkRateLimit(ip: string): Promise<boolean> {
  const supabase = await createServiceClient()
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW * 1000).toISOString()

  const { count } = await supabase
    .from('prescreen_submissions')
    .select('id', { count: 'exact', head: true })
    .eq('ip_address', ip)
    .gte('created_at', windowStart)

  return (count ?? 0) < RATE_LIMIT_MAX
}

async function sendStaffNotification(leadId: string) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SENDGRID_API_KEY not set — skipping email notification')
    return
  }

  const sgMail = (await import('@sendgrid/mail')).default
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.walkwaytohealing.com'
  const dashboardLink = `${siteUrl}/dashboard/leads/${leadId}`
  const from = process.env.NOTIFICATION_FROM || 'info@legacylinqdigital.com'
  const toList = (process.env.NOTIFICATION_TO || '').split(',').map(e => e.trim()).filter(Boolean)

  if (toList.length === 0) {
    console.warn('NOTIFICATION_TO not set — skipping email notification')
    return
  }

  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #1B6B5A; margin-bottom: 16px;">New Intake Submitted</h2>
  <p style="color: #44403C; line-height: 1.6;">A new intake has been submitted and is ready for review.</p>
  <p style="background: #F0F9F6; border-left: 4px solid #1B6B5A; padding: 12px 16px; border-radius: 4px; color: #44403C; font-size: 14px;">
    To protect patient privacy, no personal information is included in this email.
  </p>
  <p style="margin: 24px 0;">
    <a href="${dashboardLink}" style="display: inline-block; background: #1B6B5A; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
      View Lead in Dashboard
    </a>
  </p>
  <p style="color: #A8A29E; font-size: 13px; line-height: 1.5;">
    This link requires staff login. Do not forward this email.<br/>
    Walkway to Healing &mdash; Confidential
  </p>
</div>`

  try {
    await sgMail.send({
      to: toList,
      from,
      subject: 'New Intake Submitted — Walkway to Healing',
      text: `A new intake has been submitted. Log in to review: ${dashboardLink}`,
      html,
    })
  } catch (err) {
    console.error('SendGrid notification failed:', err)
  }
}

// Save partial lead after Step 1 so we capture contact info even if they abandon
export async function savePartialLead(
  data: Record<string, unknown>
): Promise<{ success: boolean; leadId?: string; error?: string }> {
  try {
    const supabase = await createServiceClient()

    const referralSources = (data.referralSources as string[]) || []
    const dobRaw = data.dateOfBirth as string | undefined
    const dobIso = dobRaw
      ? (() => {
          const parts = dobRaw.split('/')
          if (parts.length === 3) return `${parts[2]}-${parts[0]}-${parts[1]}`
          return null
        })()
      : null

    const leadValues = {
      full_name: (data.fullName as string) || 'Unknown',
      dob: dobIso,
      phone: (data.phone as string) || null,
      county: (data.county as string) || null,
      gender_identity: (data.genderIdentity as string) || null,
      referral_source: referralSources.join(', ') || null,
      referral_center: (data.referralCenter as string) || null,
      ready_now: data.readyNow === 'yes',
      status: 'new',
      source: 'website-partial',
    }

    const existingLeadId = data._partialLeadId as string | undefined

    if (existingLeadId) {
      await supabase
        .from('leads')
        .update({ ...leadValues, updated_at: new Date().toISOString() } as never)
        .eq('id', existingLeadId)

      return { success: true, leadId: existingLeadId }
    }

    const { data: leadRaw, error } = await supabase
      .from('leads')
      .insert(leadValues as never)
      .select('id')
      .single()

    if (error) {
      console.error('Partial lead save error:', error)
      return { success: false, error: 'Failed to save progress' }
    }

    return { success: true, leadId: (leadRaw as { id: string }).id }
  } catch (err) {
    console.error('Partial lead save error:', err)
    return { success: false, error: 'Failed to save progress' }
  }
}

interface SubmitData {
  fullName: string
  dateOfBirth?: string
  phone?: string
  county?: string
  genderIdentity?: string
  referralSources?: string[]
  referralCenter?: string
  readyNow?: string
  drugsAbusing?: string[]
  lastUseDate?: string
  medicationsPrescribed?: string
  maintenanceClinic?: string
  insuranceTypes?: string[]
  diagnosis?: string
  needsDetoxReferral?: string
  needsHousingReferral?: string
  historySeizures?: string
  mobilityIssues?: string
  mobilityDescription?: string
  hasOpenWounds?: string
  woundsSelfTreatable?: string
  pregnant?: string
  sexOffender?: string
  courtApptNext30?: string
  courtApptDetails?: string
  anythingElse?: string
  consentGiven: boolean
  signatureName: string
  _partialLeadId?: string
}

export async function submitPrescreen(
  data: SubmitData
): Promise<{ success: boolean; error?: string; submissionId?: string }> {
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headersList.get('x-real-ip') ||
    'unknown'

  const allowed = await checkRateLimit(ip)
  if (!allowed) {
    return {
      success: false,
      error: 'Too many submissions. Please wait a few minutes before trying again.',
    }
  }

  if (!data.consentGiven) {
    return { success: false, error: 'Consent is required to submit.' }
  }

  try {
    const supabase = await createServiceClient()

    const referralSources = data.referralSources || []
    const insuranceTypes = data.insuranceTypes || []
    const dobIso = data.dateOfBirth
      ? (() => {
          const parts = data.dateOfBirth!.split('/')
          if (parts.length === 3) return `${parts[2]}-${parts[0]}-${parts[1]}`
          return null
        })()
      : null

    const prescreenValues = {
      status: 'new',
      full_name: data.fullName,
      date_of_birth: dobIso,
      phone: data.phone || null,
      county: data.county || null,
      gender_identity: data.genderIdentity || null,
      referral_source: referralSources.join(', ') || null,
      referral_center: data.referralCenter || null,
      ready_now: data.readyNow === 'yes',
      drugs_abusing: data.drugsAbusing || [],
      last_use_date: data.lastUseDate || null,
      medications_prescribed: data.medicationsPrescribed || null,
      maintenance_clinic: data.maintenanceClinic || null,
      insurance_type: insuranceTypes.join(', ') || null,
      diagnosis: data.diagnosis || null,
      needs_detox_referral: data.needsDetoxReferral === 'yes',
      needs_housing_referral: data.needsHousingReferral === 'yes',
      history_seizures: data.historySeizures === 'yes',
      mobility_issues: data.mobilityIssues === 'yes',
      has_open_wounds: data.hasOpenWounds === 'yes',
      wounds_self_treatable: data.woundsSelfTreatable || null,
      pregnant: data.pregnant || null,
      sex_offender: data.sexOffender === 'yes',
      court_appt_next_30: data.courtApptNext30 === 'yes',
      court_appt_details: data.courtApptDetails || null,
      consent_given: true,
      signature_name: data.signatureName,
      consent_timestamp: new Date().toISOString(),
      ip_address: ip,
      form_version: '3.0',
    }

    const { data: submissionRaw, error: prescreenError } = await supabase
      .from('prescreen_submissions')
      .insert(prescreenValues as never)
      .select('id')
      .single()

    if (prescreenError) {
      console.error('Prescreen insert error:', prescreenError)
    }

    const leadValues = {
      full_name: data.fullName,
      dob: dobIso,
      phone: data.phone || null,
      county: data.county || null,
      gender_identity: data.genderIdentity || null,
      primary_drug: data.drugsAbusing?.[0] ?? null,
      drugs_abusing: data.drugsAbusing || [],
      last_use_date: data.lastUseDate || null,
      insurance_type: insuranceTypes.join(', ') || null,
      diagnosis: data.diagnosis || null,
      medications_prescribed: data.medicationsPrescribed || null,
      maintenance_clinic: data.maintenanceClinic || null,
      needs_detox_referral: data.needsDetoxReferral === 'yes',
      needs_housing_referral: data.needsHousingReferral === 'yes',
      history_seizures: data.historySeizures === 'yes',
      mobility_issues: data.mobilityIssues === 'yes',
      has_open_wounds: data.hasOpenWounds === 'yes',
      pregnant: data.pregnant || null,
      sex_offender: data.sexOffender === 'yes',
      court_appt_next_30: data.courtApptNext30 === 'yes',
      court_appt_details: data.courtApptDetails || null,
      referral_source: referralSources.join(', ') || null,
      referral_center: data.referralCenter || null,
      ready_now: data.readyNow === 'yes',
      status: 'new',
      source: 'website',
      updated_at: new Date().toISOString(),
    }

    let leadId: string | null = null
    const existingLeadId = data._partialLeadId

    if (existingLeadId) {
      await supabase
        .from('leads')
        .update(leadValues as never)
        .eq('id', existingLeadId)
      leadId = existingLeadId
    } else {
      const { data: leadRaw, error: leadError } = await supabase
        .from('leads')
        .insert(leadValues as never)
        .select('id')
        .single()

      if (leadError) {
        console.error('Lead insert error:', leadError)
      }
      leadId = (leadRaw as { id: string } | null)?.id ?? null
    }

    if (leadId) {
      const { consentGiven: _c, signatureName: _s, _partialLeadId: _p, ...formAnswers } = data
      void _c; void _s; void _p;
      await supabase.from('intake_forms').insert({
        lead_id: leadId,
        prescreen_json: { ...formAnswers, anythingElse: data.anythingElse } as never,
        version: '3.0',
      } as never).then(({ error }) => {
        if (error) console.error('Intake form insert error:', error)
      })
    }

    const submissionId = (submissionRaw as { id: string } | null)?.id

    sendStaffNotification(leadId || submissionId || 'unknown').catch(console.error)

    return { success: true, submissionId: submissionId || leadId || undefined }
  } catch (err) {
    console.error('Intake submission error:', err)
    return {
      success: false,
      error: 'Something went wrong. Please try again or call us at (410) 934-7976.',
    }
  }
}
