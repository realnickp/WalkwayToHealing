'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { User, Calendar, Trash2, ArrowRightLeft, UserPlus, X, Loader2, CheckSquare, Square } from 'lucide-react'
import { bulkDeleteLeads, bulkUpdateLeadStatus, bulkAssignLeads } from '@/lib/actions/dashboard'
import type { LeadStatus } from '@/lib/supabase/types'

interface LeadData {
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

interface StaffOption {
  id: string
  name: string
}

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'follow_up', label: 'Follow Up' },
  { value: 'enrolled', label: 'Enrolled' },
  { value: 'not_a_fit', label: 'Not a Fit' },
]

function SelectableLeadCard({ lead, selected, onToggle }: { lead: LeadData; selected: boolean; onToggle: () => void }) {
  return (
    <div className={`bg-white rounded-xl border p-4 transition-all ${selected ? 'border-primary ring-2 ring-primary/20' : 'border-stone-100'}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className="mt-0.5 shrink-0 p-0.5"
          aria-label={selected ? 'Deselect' : 'Select'}
        >
          {selected ? (
            <CheckSquare className="h-5 w-5 text-primary" />
          ) : (
            <Square className="h-5 w-5 text-stone-300" />
          )}
        </button>

        <Link href={`/dashboard/leads/${lead.id}`} className="flex-1 min-w-0">
          <p className="font-semibold text-stone-900 text-sm truncate hover:text-primary transition-colors">
            {lead.full_name}
          </p>
          <div className="mt-1.5 space-y-1 text-xs text-stone-500">
            {lead.primary_drug && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span className="truncate">{lead.primary_drug}</span>
              </div>
            )}
            {lead.last_use_date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 shrink-0 text-stone-400" />
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
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-stone-50">
            <div className="flex items-center gap-1.5 text-xs text-stone-400">
              {lead.assigned_staff_name ? (
                <>
                  <User className="h-3 w-3" />
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
      </div>
    </div>
  )
}

export function BulkLeadManager({ leads, staffList, isAdmin }: {
  leads: LeadData[]
  staffList: StaffOption[]
  isAdmin: boolean
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [actionType, setActionType] = useState<'status' | 'assign' | 'delete' | null>(null)
  const router = useRouter()

  const toggleSelect = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const selectAll = () => setSelected(new Set(leads.map(l => l.id)))
  const deselectAll = () => setSelected(new Set())

  const handleBulkStatus = async (status: LeadStatus) => {
    setLoading(true)
    try {
      await bulkUpdateLeadStatus([...selected], status)
      setSelected(new Set())
      setActionType(null)
      router.refresh()
    } catch { /* ignore */ } finally { setLoading(false) }
  }

  const handleBulkAssign = async (staffId: string | null) => {
    setLoading(true)
    try {
      await bulkAssignLeads([...selected], staffId)
      setSelected(new Set())
      setActionType(null)
      router.refresh()
    } catch { /* ignore */ } finally { setLoading(false) }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selected.size} lead${selected.size > 1 ? 's' : ''}? This cannot be undone.`)) return
    setLoading(true)
    try {
      await bulkDeleteLeads([...selected])
      setSelected(new Set())
      setActionType(null)
      router.refresh()
    } catch { /* ignore */ } finally { setLoading(false) }
  }

  return (
    <div>
      {/* Select all / deselect bar */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={selected.size === leads.length ? deselectAll : selectAll}
          className="text-xs font-medium text-primary hover:underline"
        >
          {selected.size === leads.length ? 'Deselect all' : 'Select all'}
        </button>
        {selected.size > 0 && (
          <span className="text-xs text-stone-400">{selected.size} selected</span>
        )}
      </div>

      {/* Lead list with checkboxes */}
      <div className="space-y-2">
        {leads.map(lead => (
          <SelectableLeadCard
            key={lead.id}
            lead={lead}
            selected={selected.has(lead.id)}
            onToggle={() => toggleSelect(lead.id)}
          />
        ))}
      </div>

      {/* Bulk action bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-auto z-40"
          >
            <div className="bg-stone-900 text-white rounded-2xl shadow-2xl px-5 py-3.5 flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium shrink-0">
                {selected.size} selected
              </span>

              <div className="h-5 w-px bg-stone-700 hidden sm:block" />

              {/* Status change */}
              {actionType === 'status' ? (
                <div className="flex items-center gap-2 flex-wrap">
                  {STATUS_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleBulkStatus(opt.value)}
                      disabled={loading}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-800 hover:bg-stone-700 transition-colors disabled:opacity-50"
                    >
                      {opt.label}
                    </button>
                  ))}
                  <button onClick={() => setActionType(null)} className="p-1.5 hover:bg-stone-800 rounded-lg">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : actionType === 'assign' ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handleBulkAssign(null)}
                    disabled={loading}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-800 hover:bg-stone-700 transition-colors disabled:opacity-50"
                  >
                    Unassign
                  </button>
                  {staffList.map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleBulkAssign(s.id)}
                      disabled={loading}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-800 hover:bg-stone-700 transition-colors disabled:opacity-50"
                    >
                      {s.name}
                    </button>
                  ))}
                  <button onClick={() => setActionType(null)} className="p-1.5 hover:bg-stone-800 rounded-lg">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActionType('status')}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-stone-800 hover:bg-stone-700 transition-colors min-h-[36px]"
                  >
                    <ArrowRightLeft className="h-3.5 w-3.5" />
                    Change Status
                  </button>
                  <button
                    onClick={() => setActionType('assign')}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-stone-800 hover:bg-stone-700 transition-colors min-h-[36px]"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Assign
                  </button>
                  {isAdmin && (
                    <button
                      onClick={handleBulkDelete}
                      disabled={loading}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-red-600 hover:bg-red-500 transition-colors min-h-[36px]"
                    >
                      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      Delete
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={deselectAll}
                className="p-1.5 hover:bg-stone-800 rounded-lg ml-auto"
                aria-label="Clear selection"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
