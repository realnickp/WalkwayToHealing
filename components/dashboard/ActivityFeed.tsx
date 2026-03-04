'use client'

import { formatDistanceToNow } from 'date-fns'
import { Activity, Eye, ArrowRight, User, MessageSquare, FileDown, Pencil } from 'lucide-react'
import type { Json } from '@/lib/supabase/types'

interface ActivityItem {
  id: string
  action: string
  details: Json | null
  staff_name: string | null
  created_at: string
}

const ACTION_CONFIG: Record<string, { icon: typeof Eye; label: string; color: string }> = {
  viewed: { icon: Eye, label: 'Viewed lead', color: 'text-stone-400' },
  status_changed: { icon: ArrowRight, label: 'Changed status', color: 'text-blue-500' },
  assigned: { icon: User, label: 'Assigned lead', color: 'text-purple-500' },
  note_added: { icon: MessageSquare, label: 'Added note', color: 'text-green-500' },
  exported_pdf: { icon: FileDown, label: 'Exported PDF', color: 'text-amber-500' },
}

interface Props {
  activity: ActivityItem[]
}

export function ActivityFeed({ activity }: Props) {
  if (activity.length === 0) {
    return (
      <div>
        <h3 className="flex items-center gap-2 font-semibold text-stone-900 mb-4">
          <Activity className="h-4 w-4 text-primary" aria-hidden="true" />
          Activity
        </h3>
        <p className="text-stone-400 text-sm text-center py-4">No activity yet</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="flex items-center gap-2 font-semibold text-stone-900 mb-4">
        <Activity className="h-4 w-4 text-primary" aria-hidden="true" />
        Activity
        <span className="text-xs text-stone-400 font-normal">({activity.length})</span>
      </h3>

      <div className="space-y-1 max-h-[50vh] sm:max-h-[350px] overflow-y-auto pr-1">
        {activity.map((item) => {
          const config = ACTION_CONFIG[item.action] ?? { icon: Pencil, label: item.action, color: 'text-stone-400' }
          const Icon = config.icon
          const details = item.details as Record<string, string> | null
          const newStatus = details?.new_status
          const assignedName = details?.assigned_name

          return (
            <div key={item.id} className="flex items-start gap-3 py-2">
              <Icon className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${config.color}`} aria-hidden="true" />
              <div className="min-w-0 flex-1 text-xs">
                <span className="text-stone-700 font-medium">{config.label}</span>
                {newStatus ? (
                  <span className="text-stone-500"> to <span className="font-medium">{newStatus.replace('_', ' ')}</span></span>
                ) : null}
                {assignedName ? (
                  <span className="text-stone-500"> to <span className="font-medium">{assignedName}</span></span>
                ) : null}
                <div className="text-xs text-stone-400 mt-0.5">
                  {item.staff_name && <span>{item.staff_name} &middot; </span>}
                  {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
