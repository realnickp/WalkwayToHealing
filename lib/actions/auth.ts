'use server'

import { createClient, createServiceClient } from '@/lib/supabase/server'
import type { StaffUserRow } from '@/lib/supabase/types'

export async function getStaffUser(): Promise<StaffUserRow> {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Not authenticated')
  }

  const service = await createServiceClient()
  const { data: staff, error } = await service
    .from('staff_users')
    .select('*')
    .eq('id', user.id)
    .eq('is_active', true)
    .single()

  if (error || !staff) {
    throw new Error('Access denied — not an active staff member')
  }

  return staff as StaffUserRow
}

export async function requireAdmin(): Promise<StaffUserRow> {
  const staff = await getStaffUser()
  if (staff.role !== 'admin') {
    throw new Error('Admin access required')
  }
  return staff
}

export async function getOptionalStaffUser(): Promise<StaffUserRow | null> {
  try {
    return await getStaffUser()
  } catch {
    return null
  }
}
