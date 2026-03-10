'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { LayoutGrid, List } from 'lucide-react'

export function ViewToggle({ current }: { current: 'board' | 'list' }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const toggle = (view: 'board' | 'list') => {
    const params = new URLSearchParams(searchParams.toString())
    if (view === 'board') {
      params.delete('view')
    } else {
      params.set('view', 'list')
    }
    router.push(`/dashboard/leads?${params.toString()}`)
  }

  return (
    <div className="flex items-center bg-stone-100 rounded-lg p-0.5">
      <button
        onClick={() => toggle('board')}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
          current === 'board'
            ? 'bg-white text-stone-900 shadow-sm'
            : 'text-stone-500 hover:text-stone-700'
        }`}
      >
        <LayoutGrid className="h-3.5 w-3.5" />
        Board
      </button>
      <button
        onClick={() => toggle('list')}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
          current === 'list'
            ? 'bg-white text-stone-900 shadow-sm'
            : 'text-stone-500 hover:text-stone-700'
        }`}
      >
        <List className="h-3.5 w-3.5" />
        List
      </button>
    </div>
  )
}
