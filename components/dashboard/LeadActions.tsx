'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateLeadStatus, assignLead } from '@/lib/actions/dashboard'
import type { LeadStatus } from '@/lib/supabase/types'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'New Intake' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'follow_up', label: 'Follow Up' },
  { value: 'enrolled', label: 'Enrolled' },
  { value: 'not_a_fit', label: 'Not a Fit' },
]

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  scheduled: 'bg-purple-50 text-purple-700 border-purple-200',
  follow_up: 'bg-orange-50 text-orange-700 border-orange-200',
  enrolled: 'bg-green-50 text-green-700 border-green-200',
  not_a_fit: 'bg-stone-50 text-stone-600 border-stone-200',
}

interface Props {
  leadId: string
  currentStatus: LeadStatus
  currentStaffId: string | null
  staffList: { id: string; name: string }[]
}

export function LeadActions({ leadId, currentStatus, currentStaffId, staffList }: Props) {
  const router = useRouter()
  const [isStatusPending, startStatusTransition] = useTransition()
  const [isAssignPending, startAssignTransition] = useTransition()

  const handleStatusChange = (status: LeadStatus) => {
    if (status === currentStatus) return
    startStatusTransition(async () => {
      await updateLeadStatus(leadId, status)
      router.refresh()
    })
  }

  const handleAssign = (staffId: string) => {
    const newId = staffId === '' ? null : staffId
    if (newId === currentStaffId) return
    startAssignTransition(async () => {
      await assignLead(leadId, newId)
      router.refresh()
    })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {/* Status selector */}
      <div className="flex-1 min-w-0 sm:min-w-[180px]">
        <label className="block text-xs text-stone-400 font-medium mb-1.5">Status</label>
        <div className="relative">
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
            disabled={isStatusPending}
            className={cn(
              'w-full h-11 px-4 rounded-xl border-2 text-sm font-semibold appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20',
              STATUS_COLORS[currentStatus] ?? 'bg-white border-stone-200 text-stone-700'
            )}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {isStatusPending && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-stone-400" />
          )}
        </div>
      </div>

      {/* Assign staff selector */}
      <div className="flex-1 w-full sm:min-w-[180px]">
        <label className="block text-xs text-stone-400 font-medium mb-1.5">Assigned To</label>
        <div className="relative">
          <select
            value={currentStaffId ?? ''}
            onChange={(e) => handleAssign(e.target.value)}
            disabled={isAssignPending}
            className="w-full h-11 px-4 rounded-xl border-2 border-stone-200 text-sm font-medium bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Unassigned</option>
            {staffList.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          {isAssignPending && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-stone-400" />
          )}
        </div>
      </div>
    </div>
  )
}
