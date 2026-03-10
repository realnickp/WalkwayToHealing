'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X, Loader2 } from 'lucide-react'
import { createLeadManual } from '@/lib/actions/dashboard'

export function AddLeadDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const fd = new FormData(e.currentTarget)
    const data = {
      full_name: fd.get('full_name') as string,
      phone: fd.get('phone') as string,
      email: fd.get('email') as string,
      dob: fd.get('dob') as string,
      county: fd.get('county') as string,
      gender_identity: fd.get('gender_identity') as string,
      primary_drug: fd.get('primary_drug') as string,
      insurance_type: fd.get('insurance_type') as string,
      referral_source: fd.get('referral_source') as string,
      notes: fd.get('notes') as string,
    }

    if (!data.full_name.trim()) {
      setError('Name is required')
      setLoading(false)
      return
    }

    try {
      const result = await createLeadManual(data)
      setOpen(false)
      router.push(`/dashboard/leads/${result.leadId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lead')
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Client
      </button>
    )
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50" onClick={() => !loading && setOpen(false)} />
      <div className="fixed inset-x-4 top-[5%] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50 bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-stone-100 px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="font-display text-lg font-bold text-stone-900">Add New Client</h2>
          <button
            onClick={() => !loading && setOpen(false)}
            className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-stone-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="full_name"
              type="text"
              required
              placeholder="First and last name"
              className="w-full h-11 px-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
              <input
                name="phone"
                type="tel"
                placeholder="(410) 555-1234"
                className="w-full h-11 px-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="email@example.com"
                className="w-full h-11 px-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Date of Birth</label>
              <input
                name="dob"
                type="date"
                className="w-full h-11 px-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Gender</label>
              <select
                name="gender_identity"
                className="w-full h-11 px-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Non-binary</option>
                <option value="other">Other</option>
                <option value="prefer_not">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">County</label>
              <input
                name="county"
                type="text"
                placeholder="e.g., Baltimore City"
                className="w-full h-11 px-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Insurance</label>
              <select
                name="insurance_type"
                className="w-full h-11 px-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
              >
                <option value="">Select...</option>
                <option value="medicaid">Maryland Medicaid</option>
                <option value="medicare">Medicare</option>
                <option value="private">Private / Employer</option>
                <option value="uninsured">No Insurance</option>
                <option value="unknown">Not Sure</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Primary Drug</label>
              <input
                name="primary_drug"
                type="text"
                placeholder="e.g., Fentanyl, Alcohol"
                className="w-full h-11 px-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Referral Source</label>
              <select
                name="referral_source"
                className="w-full h-11 px-3 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
              >
                <option value="">Select...</option>
                <option value="self">Searched online</option>
                <option value="family">Family or friend</option>
                <option value="hospital">Hospital or ER</option>
                <option value="court">Court or legal</option>
                <option value="probation">Probation / Parole</option>
                <option value="provider">Doctor or provider</option>
                <option value="treatment_center">Treatment center</option>
                <option value="walk_in">Walk-in</option>
                <option value="phone_call">Phone call</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Notes</label>
            <textarea
              name="notes"
              rows={3}
              placeholder="Any additional context about this client..."
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => !loading && setOpen(false)}
              className="flex-1 h-11 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-11 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add Client
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
