'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  new: { label: 'New', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  contacted: { label: 'Contacted', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  scheduled: { label: 'Scheduled', color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
  follow_up: { label: 'Follow Up', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200' },
  enrolled: { label: 'Enrolled', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' },
  not_a_fit: { label: 'Not a Fit', color: 'text-stone-600', bg: 'bg-stone-50', border: 'border-stone-200' },
}

interface Props {
  status: string
  count: number
  index: number
}

export function StatusCard({ status, count, index }: Props) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.new

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={`/dashboard/leads?status=${status}`}
        className={cn(
          'block rounded-2xl border-2 p-5 transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
          config.bg,
          config.border
        )}
      >
        <p className={cn('text-sm font-semibold', config.color)}>
          {config.label}
        </p>
        <p className={cn('text-3xl font-bold mt-1', config.color)}>
          {count}
        </p>
      </Link>
    </motion.div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.new
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
      config.bg, config.color
    )}>
      {config.label}
    </span>
  )
}
