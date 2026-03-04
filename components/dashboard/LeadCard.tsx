'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { User, Calendar } from 'lucide-react'
import type { LeadStatus } from '@/lib/supabase/types'

export interface LeadCardData {
  id: string
  created_at: string
  full_name: string
  primary_drug: string | null
  last_use_date: string | null
  insurance_type: string | null
  status: LeadStatus
  assigned_staff_id: string | null
  assigned_staff_name?: string | null
  phone: string | null
}

interface Props {
  lead: LeadCardData
  index: number
}

export function LeadCard({ lead, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Link
        href={`/dashboard/leads/${lead.id}`}
        className="block bg-white rounded-xl border border-stone-100 p-4 hover:shadow-md hover:border-stone-200 transition-all active:scale-[0.98]"
      >
        <p className="font-semibold text-stone-900 text-sm truncate">
          {lead.full_name}
        </p>

        <div className="mt-2.5 space-y-1.5 text-xs text-stone-500">
          {lead.primary_drug && (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              <span className="truncate">{lead.primary_drug}</span>
            </div>
          )}

          {lead.last_use_date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 shrink-0 text-stone-400" aria-hidden="true" />
              <span>Last use: {lead.last_use_date}</span>
            </div>
          )}

          {lead.insurance_type && (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{lead.insurance_type}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-stone-50">
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            {lead.assigned_staff_name ? (
              <>
                <User className="h-3 w-3" aria-hidden="true" />
                <span className="truncate max-w-[80px]">{lead.assigned_staff_name}</span>
              </>
            ) : (
              <span className="text-orange-400 font-medium">Unassigned</span>
            )}
          </div>
          <span className="text-xs text-stone-400">
            {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
