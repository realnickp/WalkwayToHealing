'use server'

import { createServiceClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { getStaffUser, requireAdmin } from './auth'
import type { LeadRow, LeadNoteRow, LeadActivityRow, StaffUserRow, IntakeFormRow, LeadStatus } from '@/lib/supabase/types'

// ── Lead Counts ──

export async function getLeadCounts(): Promise<Record<LeadStatus, number>> {
  await getStaffUser()
  const supabase = await createServiceClient()

  const statuses: LeadStatus[] = ['new', 'contacted', 'scheduled', 'follow_up', 'enrolled', 'not_a_fit']
  const counts: Record<string, number> = {}

  await Promise.all(
    statuses.map(async (status) => {
      const { count } = await supabase
        .from('leads')
        .select('id', { count: 'exact', head: true })
        .eq('status', status)
      counts[status] = count ?? 0
    })
  )

  return counts as Record<LeadStatus, number>
}

// ── Lead Queries ──

export type LeadListItem = Pick<LeadRow,
  'id' | 'created_at' | 'full_name' | 'primary_drug' | 'last_use_date' |
  'insurance_type' | 'status' | 'assigned_staff_id' | 'phone'
> & {
  assigned_staff_name?: string | null
}

interface LeadFilters {
  status?: LeadStatus
  search?: string
  assignedStaffId?: string
  unassignedOnly?: boolean
  limit?: number
  offset?: number
}

export async function getLeads(filters: LeadFilters = {}): Promise<LeadListItem[]> {
  await getStaffUser()
  const supabase = await createServiceClient()

  let query = supabase
    .from('leads')
    .select('id, created_at, full_name, primary_drug, last_use_date, insurance_type, status, assigned_staff_id, phone')
    .order('created_at', { ascending: false })
    .limit(filters.limit ?? 50)

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit ?? 50) - 1)
  }

  if (filters.status) {
    query = query.eq('status', filters.status)
  }

  if (filters.search) {
    query = query.or(`full_name.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`)
  }

  if (filters.assignedStaffId) {
    query = query.eq('assigned_staff_id', filters.assignedStaffId)
  }

  if (filters.unassignedOnly) {
    query = query.is('assigned_staff_id', null)
  }

  const { data, error } = await query

  if (error) throw new Error('Failed to fetch leads')

  const leads = (data ?? []) as LeadListItem[]

  const staffIds = [...new Set(leads.map(l => l.assigned_staff_id).filter(Boolean))]
  if (staffIds.length > 0) {
    const { data: staffData } = await supabase
      .from('staff_users')
      .select('id, name')
      .in('id', staffIds as string[])

    const typedStaff = (staffData ?? []) as { id: string; name: string }[]
    const staffMap = new Map(typedStaff.map(s => [s.id, s.name]))
    leads.forEach(l => {
      l.assigned_staff_name = l.assigned_staff_id ? staffMap.get(l.assigned_staff_id) ?? null : null
    })
  }

  return leads
}

export async function getRecentLeads(limit = 10): Promise<LeadListItem[]> {
  return getLeads({ limit })
}

// ── Single Lead ──

export async function getLead(id: string): Promise<{
  lead: LeadRow
  intakeForm: IntakeFormRow | null
  notes: (LeadNoteRow & { staff_name: string })[]
  activity: (LeadActivityRow & { staff_name: string | null })[]
  assignedStaff: StaffUserRow | null
}> {
  const staff = await getStaffUser()
  const supabase = await createServiceClient()

  const [{ data: lead }, { data: intakeForms }, { data: notes }, { data: activity }] = await Promise.all([
    supabase.from('leads').select('*').eq('id', id).single(),
    supabase.from('intake_forms').select('*').eq('lead_id', id).order('created_at', { ascending: false }).limit(1),
    supabase.from('lead_notes').select('*').eq('lead_id', id).order('created_at', { ascending: false }),
    supabase.from('lead_activity_log').select('*').eq('lead_id', id).order('created_at', { ascending: false }).limit(50),
  ])

  if (!lead) throw new Error('Lead not found')

  const typedLead = lead as LeadRow
  const intakeForm = ((intakeForms ?? []) as IntakeFormRow[])[0] ?? null

  // Resolve staff names for notes
  const noteStaffIds = [...new Set((notes ?? []).map(n => (n as LeadNoteRow).staff_id))]
  const activityStaffIds = [...new Set((activity ?? []).map(a => (a as LeadActivityRow).staff_id).filter(Boolean))]
  const allStaffIds = [...new Set([...noteStaffIds, ...activityStaffIds])]

  let staffMap = new Map<string, string>()
  if (allStaffIds.length > 0) {
    const { data: staffData } = await supabase
      .from('staff_users')
      .select('id, name')
      .in('id', allStaffIds as string[])
    const typedStaffData = (staffData ?? []) as { id: string; name: string }[]
    staffMap = new Map(typedStaffData.map(s => [s.id, s.name]))
  }

  const typedNotes = (notes ?? []).map(n => ({
    ...(n as LeadNoteRow),
    staff_name: staffMap.get((n as LeadNoteRow).staff_id) ?? 'Unknown',
  }))

  const typedActivity = (activity ?? []).map(a => ({
    ...(a as LeadActivityRow),
    staff_name: (a as LeadActivityRow).staff_id ? staffMap.get((a as LeadActivityRow).staff_id!) ?? null : null,
  }))

  let assignedStaff: StaffUserRow | null = null
  if (typedLead.assigned_staff_id) {
    const { data: s } = await supabase
      .from('staff_users')
      .select('*')
      .eq('id', typedLead.assigned_staff_id)
      .single()
    assignedStaff = s as StaffUserRow | null
  }

  // Log view activity
  await supabase.from('lead_activity_log').insert({
    lead_id: id,
    staff_id: staff.id,
    action: 'viewed',
    details: null,
  } as never)

  return { lead: typedLead, intakeForm, notes: typedNotes, activity: typedActivity, assignedStaff }
}

// ── Lead Mutations ──

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  const staff = await getStaffUser()
  const supabase = await createServiceClient()

  const { error } = await supabase
    .from('leads')
    .update({ status, updated_at: new Date().toISOString() } as never)
    .eq('id', leadId)

  if (error) throw new Error('Failed to update status')

  await supabase.from('lead_activity_log').insert({
    lead_id: leadId,
    staff_id: staff.id,
    action: 'status_changed',
    details: { new_status: status },
  } as never)

  revalidatePath(`/dashboard/leads/${leadId}`)
  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function assignLead(leadId: string, staffId: string | null) {
  const staff = await getStaffUser()
  const supabase = await createServiceClient()

  const { error } = await supabase
    .from('leads')
    .update({ assigned_staff_id: staffId, updated_at: new Date().toISOString() } as never)
    .eq('id', leadId)

  if (error) throw new Error('Failed to assign lead')

  let assigneeName = 'Unassigned'
  if (staffId) {
    const { data: s } = await supabase.from('staff_users').select('name').eq('id', staffId).single()
    assigneeName = (s as { name: string } | null)?.name ?? 'Unknown'
  }

  await supabase.from('lead_activity_log').insert({
    lead_id: leadId,
    staff_id: staff.id,
    action: 'assigned',
    details: { assigned_to: staffId, assigned_name: assigneeName },
  } as never)

  revalidatePath(`/dashboard/leads/${leadId}`)
  revalidatePath('/dashboard/leads')
  return { success: true }
}

export async function addLeadNote(leadId: string, note: string) {
  const staff = await getStaffUser()
  const supabase = await createServiceClient()

  const { error } = await supabase.from('lead_notes').insert({
    lead_id: leadId,
    staff_id: staff.id,
    note,
  } as never)

  if (error) throw new Error('Failed to add note')

  await supabase.from('lead_activity_log').insert({
    lead_id: leadId,
    staff_id: staff.id,
    action: 'note_added',
    details: null,
  } as never)

  revalidatePath(`/dashboard/leads/${leadId}`)
  return { success: true }
}

// ── Staff Management ──

export async function getStaffList(): Promise<StaffUserRow[]> {
  await requireAdmin()
  const supabase = await createServiceClient()

  const { data, error } = await supabase
    .from('staff_users')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw new Error('Failed to fetch staff')
  return (data ?? []) as StaffUserRow[]
}

export async function getAllStaff(): Promise<Pick<StaffUserRow, 'id' | 'name'>[]> {
  await getStaffUser()
  const supabase = await createServiceClient()

  const { data } = await supabase
    .from('staff_users')
    .select('id, name')
    .eq('is_active', true)
    .order('name')

  return (data ?? []) as Pick<StaffUserRow, 'id' | 'name'>[]
}

export async function toggleStaffActive(staffId: string, isActive: boolean) {
  await requireAdmin()
  const supabase = await createServiceClient()

  const { error } = await supabase
    .from('staff_users')
    .update({ is_active: isActive } as never)
    .eq('id', staffId)

  if (error) throw new Error('Failed to update staff')
  revalidatePath('/dashboard/staff')
  return { success: true }
}

export async function resetStaffPassword(staffId: string, newPassword: string) {
  await requireAdmin()

  if (newPassword.length < 8) {
    throw new Error('Password must be at least 8 characters')
  }

  const supabase = await createServiceClient()

  const { error } = await supabase.auth.admin.updateUserById(staffId, {
    password: newPassword,
  })

  if (error) throw new Error(`Failed to reset password: ${error.message}`)
  return { success: true }
}

export async function inviteStaffMember(email: string, name: string, role: 'admin' | 'staff', password: string) {
  const admin = await requireAdmin()
  const supabase = await createServiceClient()

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters')
  }

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, role },
  })

  if (authError) {
    if (authError.message.includes('already been registered')) {
      throw new Error('A user with this email already exists')
    }
    throw new Error(`Failed to create user: ${authError.message}`)
  }

  if (!authData.user) throw new Error('Failed to create user')

  // Insert staff_users record
  const { error: staffError } = await supabase.from('staff_users').insert({
    id: authData.user.id,
    name,
    email,
    role,
    is_active: true,
  } as never)

  if (staffError) {
    throw new Error('User created in auth but failed to add staff record')
  }

  revalidatePath('/dashboard/staff')
  return { success: true, userId: authData.user.id }
}

export async function deleteLeadAdmin(leadId: string) {
  await requireAdmin()
  const supabase = await createServiceClient()

  const { error } = await supabase.from('leads').delete().eq('id', leadId)
  if (error) throw new Error('Failed to delete lead')

  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard')
  return { success: true }
}
