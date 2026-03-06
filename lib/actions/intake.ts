'use server'

import { createServiceClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import type { PrescreenFormData } from '@/lib/validations/prescreen'

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://walkwaytohealing.com'
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

export async function submitPrescreen(
  data: Omit<PrescreenFormData, 'consentGiven'> & { consentGiven: boolean }
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

    const dobIso = data.dateOfBirth
      ? (() => {
          const [m, d, y] = data.dateOfBirth.split('/')
          return `${y}-${m}-${d}`
        })()
      : null

    // 1. Insert into legacy prescreen_submissions
    const prescreenValues = {
      status: 'new',
      full_name: data.fullName,
      date_of_birth: dobIso,
      phone: data.phone,
      county: data.county,
      gender_identity: data.genderIdentity,
      referral_source: data.referralSource,
      referral_center: data.referralCenter || null,
      ready_now: data.readyNow === 'yes',
      drugs_abusing: data.drugsAbusing,
      last_use_date: data.lastUseDate || null,
      medications_prescribed: data.medicationsPrescribed || null,
      maintenance_clinic: data.maintenanceClinic || null,
      insurance_type: data.insuranceType,
      diagnosis: data.diagnosis || null,
      needs_detox_referral: data.needsDetoxReferral === 'yes',
      needs_housing_referral: data.needsHousingReferral === 'yes',
      history_seizures: data.historySeizures === 'yes',
      mobility_issues: data.mobilityIssues === 'yes',
      has_open_wounds: data.hasOpenWounds === 'yes',
      wounds_self_treatable: data.woundsSelfTreatable || null,
      pregnant: data.pregnant,
      sex_offender: data.sexOffender === 'yes',
      court_appt_next_30: data.courtApptNext30 === 'yes',
      court_appt_details: data.courtApptDetails || null,
      consent_given: true,
      signature_name: data.signatureName,
      consent_timestamp: new Date().toISOString(),
      ip_address: ip,
      form_version: '2.0',
    }

    const { data: submissionRaw, error: prescreenError } = await supabase
      .from('prescreen_submissions')
      .insert(prescreenValues as never)
      .select('id')
      .single()

    if (prescreenError) {
      console.error('Prescreen insert error:', prescreenError)
    }

    // 2. Create a lead in the new CRM table
    const leadValues = {
      full_name: data.fullName,
      dob: dobIso,
      phone: data.phone,
      county: data.county,
      gender_identity: data.genderIdentity,
      primary_drug: data.drugsAbusing?.[0] ?? null,
      drugs_abusing: data.drugsAbusing,
      last_use_date: data.lastUseDate || null,
      insurance_type: data.insuranceType,
      diagnosis: data.diagnosis || null,
      medications_prescribed: data.medicationsPrescribed || null,
      maintenance_clinic: data.maintenanceClinic || null,
      needs_detox_referral: data.needsDetoxReferral === 'yes',
      needs_housing_referral: data.needsHousingReferral === 'yes',
      history_seizures: data.historySeizures === 'yes',
      mobility_issues: data.mobilityIssues === 'yes',
      has_open_wounds: data.hasOpenWounds === 'yes',
      pregnant: data.pregnant,
      sex_offender: data.sexOffender === 'yes',
      court_appt_next_30: data.courtApptNext30 === 'yes',
      court_appt_details: data.courtApptDetails || null,
      referral_source: data.referralSource,
      referral_center: data.referralCenter || null,
      ready_now: data.readyNow === 'yes',
      status: 'new',
      source: 'website',
    }

    const { data: leadRaw, error: leadError } = await supabase
      .from('leads')
      .insert(leadValues as never)
      .select('id')
      .single()

    const lead = leadRaw as { id: string } | null

    if (leadError) {
      console.error('Lead insert error:', leadError)
    }

    // 3. Store full form JSON in intake_forms
    if (lead) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { consentGiven, signatureName, ...formAnswers } = data
      await supabase.from('intake_forms').insert({
        lead_id: lead.id,
        prescreen_json: formAnswers as never,
        version: '2.0',
      } as never).then(({ error }) => {
        if (error) console.error('Intake form insert error:', error)
      })
    }

    const submissionId = (submissionRaw as { id: string } | null)?.id
    const leadId = lead?.id

    // 4. Send notification (non-blocking)
    sendStaffNotification(leadId || submissionId || 'unknown').catch(console.error)

    return { success: true, submissionId: submissionId || leadId }
  } catch (err) {
    console.error('Intake submission error:', err)
    return {
      success: false,
      error: 'Something went wrong. Please try again or call us at (410) 934-7976.',
    }
  }
}
