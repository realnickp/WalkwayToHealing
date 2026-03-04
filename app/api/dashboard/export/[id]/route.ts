import { NextResponse } from 'next/server'
import { getLead } from '@/lib/actions/dashboard'
import { requireAdmin } from '@/lib/actions/auth'
import { createServiceClient } from '@/lib/supabase/server'
import { format } from 'date-fns'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderField(label: string, value: unknown): string {
  if (value === null || value === undefined || value === '') return ''
  const display = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)
  return `<tr><td style="padding:6px 12px;color:#78716C;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 12px;font-size:13px;">${escapeHtml(display)}</td></tr>`
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin()
    const { id } = await params
    const { lead, notes } = await getLead(id)

    // Log export activity
    const supabase = await createServiceClient()
    await supabase.from('lead_activity_log').insert({
      lead_id: id,
      staff_id: admin.id,
      action: 'exported_pdf',
      details: null,
    } as never)

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lead Report — ${escapeHtml(lead.full_name)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 40px; color: #1C1917; line-height: 1.5; }
    h1 { color: #1B6B5A; font-size: 22px; margin-bottom: 4px; }
    h2 { color: #1B6B5A; font-size: 15px; margin-top: 28px; margin-bottom: 8px; border-bottom: 1px solid #E7E5E4; padding-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; }
    .meta { color: #78716C; font-size: 12px; margin-bottom: 20px; }
    .note { background: #F8F5F0; border-radius: 8px; padding: 10px 14px; margin-bottom: 8px; font-size: 13px; }
    .note-meta { color: #A8A29E; font-size: 11px; margin-top: 4px; }
    .footer { margin-top: 40px; border-top: 1px solid #E7E5E4; padding-top: 12px; color: #A8A29E; font-size: 11px; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
  <h1>${escapeHtml(lead.full_name)}</h1>
  <p class="meta">
    Exported on ${format(new Date(), 'MMM d, yyyy h:mm a')} by ${escapeHtml(admin.name)}<br>
    Submitted: ${format(new Date(lead.created_at), 'MMM d, yyyy h:mm a')}
    ${lead.dob ? ` · DOB: ${format(new Date(lead.dob), 'MM/dd/yyyy')}` : ''}
  </p>

  <h2>Contact</h2>
  <table>
    ${renderField('Phone', lead.phone)}
    ${renderField('Email', lead.email)}
    ${renderField('County', lead.county)}
    ${renderField('Gender', lead.gender_identity)}
  </table>

  <h2>Treatment</h2>
  <table>
    ${renderField('Status', lead.status)}
    ${renderField('Primary Drug', lead.primary_drug)}
    ${renderField('All Substances', lead.drugs_abusing?.join(', '))}
    ${renderField('Last Use', lead.last_use_date)}
    ${renderField('Diagnosis', lead.diagnosis)}
    ${renderField('Insurance', lead.insurance_type)}
    ${renderField('Ready Now', lead.ready_now)}
    ${renderField('Referral Source', lead.referral_source)}
  </table>

  <h2>Clinical Flags</h2>
  <table>
    ${renderField('Needs Detox Referral', lead.needs_detox_referral)}
    ${renderField('Needs Housing Referral', lead.needs_housing_referral)}
    ${renderField('History of Seizures', lead.history_seizures)}
    ${renderField('Mobility Issues', lead.mobility_issues)}
    ${renderField('Open Wounds', lead.has_open_wounds)}
    ${renderField('Pregnant', lead.pregnant)}
    ${renderField('Sex Offender', lead.sex_offender)}
    ${renderField('Court Appts (30 days)', lead.court_appt_next_30)}
    ${renderField('Court Details', lead.court_appt_details)}
  </table>

  <h2>Medications</h2>
  <table>
    ${renderField('Prescribed', lead.medications_prescribed)}
    ${renderField('Maintenance Clinic', lead.maintenance_clinic)}
  </table>

  ${notes.length > 0 ? `
  <h2>Staff Notes</h2>
  ${notes.map(n => `
    <div class="note">
      ${escapeHtml(n.note)}
      <div class="note-meta">${escapeHtml(n.staff_name)} — ${format(new Date(n.created_at), 'MMM d, yyyy h:mm a')}</div>
    </div>
  `).join('')}` : ''}

  <div class="footer">
    CONFIDENTIAL — Protected by 42 CFR Part 2 and HIPAA<br>
    Walkway to Healing · (410) 934-7976
  </div>
</body>
</html>`

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="lead-${id.slice(0, 8)}.html"`,
      },
    })
  } catch (err) {
    console.error('Export error:', err)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}
