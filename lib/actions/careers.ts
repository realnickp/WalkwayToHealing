'use server'

import { headers } from 'next/headers'

// Applications are emailed straight to hiring staff; nothing is stored in the database.
const DEFAULT_RECIPIENTS = 'troyp@walkwaytohealing.com,nickp@walkwaytohealing.com'

const MAX_RESUME_BYTES = 5 * 1024 * 1024
const ALLOWED_RESUME_TYPES: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
}

// Simple in-memory rate limit (per server instance) to slow down spam bursts
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 3
const recentSubmissions = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (recentSubmissions.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (hits.length >= RATE_LIMIT_MAX) {
    recentSubmissions.set(ip, hits)
    return true
  }
  recentSubmissions.set(ip, [...hits, now])
  return false
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export type ApplicationState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Partial<Record<string, string>>
}

export async function submitJobApplication(
  _prev: ApplicationState,
  formData: FormData
): Promise<ApplicationState> {
  // Honeypot: real people never see or fill this field
  if (String(formData.get('company') || '').trim()) {
    return { status: 'success' }
  }

  const field = (name: string) => String(formData.get(name) || '').trim()
  const fullName = field('fullName')
  const email = field('email')
  const phone = field('phone')
  const position = field('position')
  const credentials = field('credentials')
  const experience = field('experience')
  const availability = field('availability')
  const message = field('message')
  const resume = formData.get('resume')

  const fieldErrors: Record<string, string> = {}
  if (fullName.length < 2) fieldErrors.fullName = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = 'Please enter a valid email address.'
  if (phone.replace(/\D/g, '').length < 10) fieldErrors.phone = 'Please enter a valid phone number.'
  if (!position) fieldErrors.position = 'Please choose a position.'
  if (message.length > 5000) fieldErrors.message = 'Please keep this under 5,000 characters.'

  let attachment: { content: string; filename: string; type: string; disposition: string } | undefined
  if (resume instanceof File && resume.size > 0) {
    if (!ALLOWED_RESUME_TYPES[resume.type]) {
      fieldErrors.resume = 'Resume must be a PDF or Word document.'
    } else if (resume.size > MAX_RESUME_BYTES) {
      fieldErrors.resume = 'Resume must be 5 MB or smaller.'
    } else {
      const safeName = fullName.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'applicant'
      attachment = {
        content: Buffer.from(await resume.arrayBuffer()).toString('base64'),
        filename: `Resume-${safeName}.${ALLOWED_RESUME_TYPES[resume.type]}`,
        type: resume.type,
        disposition: 'attachment',
      }
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', message: 'Please fix the highlighted fields.', fieldErrors }
  }

  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headersList.get('x-real-ip') ||
    'unknown'

  if (isRateLimited(ip)) {
    return {
      status: 'error',
      message: 'Too many submissions. Please wait a few minutes and try again.',
    }
  }

  if (!process.env.SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY not set — cannot send job application')
    return {
      status: 'error',
      message: 'We couldn’t send your application right now. Please call us at (410) 934-7976.',
    }
  }

  const sgMail = (await import('@sendgrid/mail')).default
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const from = process.env.NOTIFICATION_FROM || 'info@legacylinqdigital.com'
  const toList = (process.env.CAREERS_TO || DEFAULT_RECIPIENTS)
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean)

  const rows: [string, string][] = [
    ['Name', fullName],
    ['Email', email],
    ['Phone', phone],
    ['Position', position],
    ['Credentials / License', credentials || '—'],
    ['Years of Experience', experience || '—'],
    ['Availability', availability || '—'],
  ]

  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #1B6B5A; margin-bottom: 16px;">New Job Application — ${escapeHtml(position)}</h2>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #44403C;">
    ${rows
      .map(
        ([label, value]) => `<tr>
      <td style="padding: 8px 12px 8px 0; font-weight: 600; vertical-align: top; white-space: nowrap;">${label}</td>
      <td style="padding: 8px 0;">${escapeHtml(value)}</td>
    </tr>`
      )
      .join('')}
  </table>
  ${
    message
      ? `<h3 style="color: #1B6B5A; margin: 24px 0 8px; font-size: 15px;">About the applicant</h3>
  <p style="color: #44403C; line-height: 1.6; white-space: pre-wrap; background: #F0F9F6; border-left: 4px solid #1B6B5A; padding: 12px 16px; border-radius: 4px;">${escapeHtml(message)}</p>`
      : ''
  }
  <p style="color: #44403C; font-size: 14px; margin-top: 16px;">
    ${attachment ? 'Resume is attached.' : 'No resume was attached.'} Reply to this email to respond to the applicant directly.
  </p>
  <p style="color: #A8A29E; font-size: 13px;">Submitted through the Careers page on walkwaytohealing.com</p>
</div>`

  const text = [
    `New job application — ${position}`,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    message ? `About the applicant:\n${message}\n` : '',
    attachment ? 'Resume is attached.' : 'No resume was attached.',
  ].join('\n')

  try {
    await sgMail.send({
      to: toList,
      from,
      replyTo: { email, name: fullName },
      subject: `Job Application: ${position} — ${fullName}`,
      text,
      html,
      attachments: attachment ? [attachment] : undefined,
    })
  } catch (err) {
    console.error('SendGrid job application failed:', err)
    return {
      status: 'error',
      message: 'We couldn’t send your application right now. Please try again or call (410) 934-7976.',
    }
  }

  return { status: 'success' }
}
