'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback, useTransition } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const STATUSES = [
  { value: '', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'follow_up', label: 'Follow Up' },
  { value: 'enrolled', label: 'Enrolled' },
  { value: 'not_a_fit', label: 'Not a Fit' },
]

interface Props {
  staffList: { id: string; name: string }[]
}

export function LeadFilters({ staffList }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentStatus = searchParams.get('status') || ''
  const currentSearch = searchParams.get('search') || ''
  const currentStaff = searchParams.get('staff') || ''
  const currentUnassigned = searchParams.get('unassigned') === '1'

  const [searchValue, setSearchValue] = useState(currentSearch)

  const applyFilters = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, val]) => {
      if (val) params.set(key, val)
      else params.delete(key)
    })
    startTransition(() => {
      router.push(`/dashboard/leads?${params.toString()}`)
    })
  }, [router, searchParams, startTransition])

  const handleSearch = () => {
    applyFilters({ search: searchValue })
  }

  const clearFilters = () => {
    setSearchValue('')
    startTransition(() => {
      router.push('/dashboard/leads')
    })
  }

  const hasFilters = currentStatus || currentSearch || currentStaff || currentUnassigned

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" aria-hidden="true" />
          <Input
            placeholder="Search by name or phone…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10 h-11"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 h-11 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors shrink-0"
        >
          Search
        </button>
      </div>

      {/* Filter chips row */}
      <div className="flex flex-nowrap md:flex-wrap gap-2 items-center overflow-x-auto">
        <Filter className="h-4 w-4 text-stone-400 shrink-0" aria-hidden="true" />

        {/* Status chips */}
        <div className="flex flex-nowrap md:flex-wrap gap-1.5 shrink-0">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => applyFilters({ status: s.value })}
              className={cn(
                'px-3 py-2 min-h-[44px] rounded-full text-xs font-medium transition-all',
                currentStatus === s.value
                  ? 'bg-primary text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <span className="text-stone-300">|</span>

        {/* Unassigned toggle */}
        <button
          onClick={() => applyFilters({ unassigned: currentUnassigned ? '' : '1' })}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
            currentUnassigned
              ? 'bg-orange-500 text-white'
              : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'
          )}
        >
          Unassigned only
        </button>

        {/* Staff filter */}
        {staffList.length > 0 && (
          <select
            value={currentStaff}
            onChange={(e) => applyFilters({ staff: e.target.value })}
            className="h-11 px-3 rounded-full text-xs font-medium bg-white border border-stone-200 text-stone-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">All staff</option>
            {staffList.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        )}

        {/* Clear all */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2 min-h-[44px] text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {isPending && (
        <div className="h-0.5 bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-primary rounded-full animate-pulse" />
        </div>
      )}
    </div>
  )
}
