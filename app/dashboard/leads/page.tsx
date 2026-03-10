import { Suspense } from 'react'
import { getLeads, getLeadCounts, getAllStaff } from '@/lib/actions/dashboard'
import { getStaffUser } from '@/lib/actions/auth'
import { LeadCard } from '@/components/dashboard/LeadCard'
import { LeadFilters } from '@/components/dashboard/LeadFilters'
import { StatusBadge } from '@/components/dashboard/StatusCard'
import { AddLeadDialog } from '@/components/dashboard/AddLeadDialog'
import { BulkLeadManager } from '@/components/dashboard/BulkLeadManager'
import { ViewToggle } from '@/components/dashboard/ViewToggle'
import type { LeadStatus } from '@/lib/supabase/types'

const COLUMNS: { status: LeadStatus; label: string }[] = [
  { status: 'new', label: 'New Intake' },
  { status: 'contacted', label: 'Contacted' },
  { status: 'scheduled', label: 'Scheduled' },
  { status: 'follow_up', label: 'Follow Up' },
  { status: 'enrolled', label: 'Enrolled' },
  { status: 'not_a_fit', label: 'Not a Fit' },
]

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string
    search?: string
    staff?: string
    unassigned?: string
    view?: string
  }>
}) {
  const params = await searchParams
  const statusFilter = params.status as LeadStatus | undefined
  const search = params.search
  const staffFilter = params.staff
  const unassignedOnly = params.unassigned === '1'
  const viewMode = params.view === 'list' ? 'list' : 'board'

  const [leads, counts, staffList, currentStaff] = await Promise.all([
    getLeads({
      status: statusFilter,
      search,
      assignedStaffId: staffFilter,
      unassignedOnly,
      limit: 200,
    }),
    getLeadCounts(),
    getAllStaff(),
    getStaffUser(),
  ])

  const hasActiveFilter = statusFilter || search || staffFilter || unassignedOnly

  const showKanban = !hasActiveFilter && viewMode === 'board'

  const grouped = showKanban
    ? COLUMNS.map((col) => ({
        ...col,
        leads: leads.filter((l) => l.status === col.status),
        count: counts[col.status] ?? 0,
      }))
    : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-2xl font-bold text-stone-900">
            Leads
          </h1>
          <div className="flex items-center gap-2">
            {!hasActiveFilter && (
              <div className="hidden lg:block">
                <ViewToggle current={viewMode} />
              </div>
            )}
            <AddLeadDialog />
          </div>
        </div>
        <Suspense fallback={null}>
          <LeadFilters staffList={staffList} />
        </Suspense>
      </div>

      {/* Kanban board (desktop, no filter, board view) */}
      {grouped && (
        <div className="hidden lg:grid lg:grid-cols-6 gap-3">
          {grouped.map((col) => (
            <div key={col.status} className="flex flex-col min-h-[400px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <StatusBadge status={col.status} />
                  <span className="text-xs text-stone-400 font-medium">{col.count}</span>
                </div>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto max-h-[calc(100vh-280px)] pr-1 scrollbar-thin">
                {col.leads.length === 0 ? (
                  <div className="text-center py-8 text-stone-300 text-xs">
                    No leads
                  </div>
                ) : (
                  col.leads.map((lead, i) => (
                    <LeadCard key={lead.id} lead={lead} index={i} />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List view with bulk actions (mobile always, desktop when filtered or list view selected) */}
      <div className={grouped ? 'lg:hidden' : ''}>
        {leads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100 p-10 text-center">
            <p className="text-stone-500 font-medium">No leads found</p>
            <p className="text-stone-400 text-sm mt-1">
              {hasActiveFilter ? 'Try adjusting your filters.' : 'Leads appear as intakes are submitted.'}
            </p>
          </div>
        ) : (
          <BulkLeadManager leads={leads} staffList={staffList} isAdmin={currentStaff.role === 'admin'} />
        )}
      </div>
    </div>
  )
}
