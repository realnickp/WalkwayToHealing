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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://walkwaytohealing.com'
  const dashboardLink = `${siteUrl}/dashboard/leads/${leadId}`

  // Try Resend first
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL || 'notifications@walkwaytohealing.com',
          to: [process.env.NOTIFICATION_EMAIL || 'Admin@WalkWaytoHealing.com'],
          subject: 'New intake submitted',
          html: `
<div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
  <h2 style="color: #1B6B5A;">New Intake Submitted</h2>
  <p>A new intake was submitted. Log in to view.</p>
  <p style="background: #F0F9F6; border-left: 4px solid #1B6B5A; padding: 12px 16px; border-radius: 4px;">
    To protect privacy, no personal information is included in this email.
  </p>
  <p>
    <a href="${dashboardLink}" style="display: inline-block; background: #1B6B5A; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
      View in Dashboard
    </a>
  </p>
  <p style="color: #78716C; font-size: 14px;">
    This link requires staff login. Do not forward this email.
  </p>
</div>`,
        }),
      })
      if (res.ok) return
      console.error('Resend error:', await res.text())
    } catch (err) {
      console.error('Resend failed:', err)
    }
  }

  // Fall back to SMTP
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) return

  try {
    const nodemailer = await import('nodemailer')
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: 'New intake submitted',
      text: `A new intake was submitted. Log in to view: ${dashboardLink}`,
      html: `
<div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
  <h2 style="color: #1B6B5A;">New Intake Submitted</h2>
  <p>A new intake was submitted. Log in to view.</p>
  <p>
    <a href="${dashboardLink}" style="display: inline-block; background: #1B6B5A; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">
      View in Dashboard
    </a>
  </p>
</div>`,
    })
  } catch (err) {
    console.error('SMTP notification failed:', err)
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
      const { consentGiven: _consent, signatureName: _sig, ...formAnswers } = data
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
