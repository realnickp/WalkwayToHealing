import Link from 'next/link'
import { getLeadCounts, getRecentLeads } from '@/lib/actions/dashboard'
import { StatusCard, StatusBadge } from '@/components/dashboard/StatusCard'
import { formatDistanceToNow } from 'date-fns'
import { ArrowRight, Users } from 'lucide-react'
import type { LeadStatus } from '@/lib/supabase/types'

const STATUS_ORDER: LeadStatus[] = ['new', 'contacted', 'scheduled', 'follow_up', 'enrolled']

export default async function DashboardHomePage() {
  const [counts, recentLeads] = await Promise.all([
    getLeadCounts(),
    getRecentLeads(10),
  ])

  const totalActive = STATUS_ORDER.reduce((sum, s) => sum + (counts[s] ?? 0), 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            Welcome back
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            {totalActive} active lead{totalActive !== 1 ? 's' : ''} across your pipeline
          </p>
        </div>
        <Link
          href="/dashboard/leads"
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          <Users className="h-4 w-4" aria-hidden="true" />
          View All Leads
        </Link>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-10">
        {STATUS_ORDER.map((status, i) => (
          <StatusCard key={status} status={status} count={counts[status] ?? 0} index={i} />
        ))}
      </div>

      {/* Recent leads */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-stone-900">
            Recent Leads
          </h2>
          <Link
            href="/dashboard/leads"
            className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
          >
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100 p-10 text-center">
            <Users className="h-10 w-10 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-500 font-medium">No leads yet</p>
            <p className="text-stone-400 text-sm mt-1">
              Leads will appear here once intake forms are submitted.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-100 divide-y divide-stone-100 overflow-hidden">
            {recentLeads.map((lead) => (
              <Link
                key={lead.id}
                href={`/dashboard/leads/${lead.id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-stone-900 truncate group-hover:text-primary transition-colors">
                    {lead.full_name}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-stone-400">
                    {lead.primary_drug && <span>{lead.primary_drug}</span>}
                    {lead.insurance_type && <span>{lead.insurance_type}</span>}
                    <span>{formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4 shrink-0">
                  {lead.assigned_staff_name && (
                    <span className="text-xs text-stone-400 hidden sm:block">
                      {lead.assigned_staff_name}
                    </span>
                  )}
                  <StatusBadge status={lead.status} />
                  <ArrowRight className="h-4 w-4 text-stone-300 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
