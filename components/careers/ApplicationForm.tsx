'use client'

import { useActionState, useRef, useState } from 'react'
import { CheckCircle, FileText, Loader2, Send, Upload } from 'lucide-react'
import { submitJobApplication, type ApplicationState } from '@/lib/actions/careers'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const POSITIONS = ['Addiction Counselor', 'Other / General Application']

const EXPERIENCE_OPTIONS = ['Less than 1 year', '1–2 years', '3–5 years', '6–10 years', '10+ years']

const AVAILABILITY_OPTIONS = ['Full-time', 'Part-time', 'Either']

const initialState: ApplicationState = { status: 'idle' }

const selectClass =
  'flex h-11 w-full rounded-lg border border-input bg-white px-4 py-2.5 text-base text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-colors duration-150 md:text-sm'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-sm text-red-600 mt-1.5">{message}</p>
}

export function ApplicationForm() {
  const [state, formAction, isPending] = useActionState(submitJobApplication, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const errors = state.fieldErrors || {}

  if (state.status === 'success') {
    return (
      <div className="bg-white rounded-2xl border border-stone-100 p-8 md:p-10 shadow-sm text-center">
        <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="h-7 w-7 text-primary" aria-hidden="true" />
        </div>
        <h2 className="font-display text-2xl font-bold text-stone-900 mb-3">
          Application received
        </h2>
        <p className="text-stone-600 leading-relaxed max-w-md mx-auto">
          Thank you for your interest in joining Walkway to Healing. Our team will review
          your information and reach out if it&apos;s a good fit.
        </p>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="bg-white rounded-2xl border border-stone-100 p-6 md:p-8 shadow-sm"
    >
      <h2 className="font-display text-2xl font-bold text-stone-900 mb-1">Apply now</h2>
      <p className="text-stone-500 text-sm mb-8">
        Fields marked <span className="text-red-600">*</span> are required.
      </p>

      {/* Honeypot — hidden from people, catches bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="hp_confirm_field">Leave this field empty</label>
        <input id="hp_confirm_field" name="hp_confirm_field" type="text" tabIndex={-1} autoComplete="new-password" />
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="fullName" className="block mb-2">
            Full name <span className="text-red-600">*</span>
          </Label>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            required
            aria-invalid={!!errors.fullName}
            className={cn(errors.fullName && 'border-red-400')}
          />
          <FieldError message={errors.fullName} />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="email" className="block mb-2">
              Email <span className="text-red-600">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={!!errors.email}
              className={cn(errors.email && 'border-red-400')}
            />
            <FieldError message={errors.email} />
          </div>
          <div>
            <Label htmlFor="phone" className="block mb-2">
              Phone <span className="text-red-600">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              aria-invalid={!!errors.phone}
              className={cn(errors.phone && 'border-red-400')}
            />
            <FieldError message={errors.phone} />
          </div>
        </div>

        <div>
          <Label htmlFor="position" className="block mb-2">
            Position <span className="text-red-600">*</span>
          </Label>
          <select
            id="position"
            name="position"
            defaultValue={POSITIONS[0]}
            className={cn(selectClass, errors.position && 'border-red-400')}
          >
            {POSITIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <FieldError message={errors.position} />
        </div>

        <div>
          <span className="block mb-2 text-sm font-medium text-stone-800">Resume</span>
          <label
            htmlFor="resume"
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setIsDragging(false)
              const file = e.dataTransfer.files?.[0]
              if (file && fileInputRef.current) {
                const dt = new DataTransfer()
                dt.items.add(file)
                fileInputRef.current.files = dt.files
                setFileName(file.name)
              }
            }}
            className={cn(
              'flex flex-col items-center justify-center gap-2 w-full rounded-xl border-2 border-dashed px-6 py-8 text-center cursor-pointer transition-colors',
              isDragging
                ? 'border-primary bg-primary-50'
                : fileName
                  ? 'border-primary/40 bg-primary-50/50'
                  : 'border-stone-200 bg-stone-50 hover:border-primary/40 hover:bg-primary-50/40',
              errors.resume && 'border-red-400'
            )}
          >
            {fileName ? (
              <>
                <FileText className="h-8 w-8 text-primary" aria-hidden="true" />
                <span className="text-sm font-semibold text-stone-900 break-all">{fileName}</span>
                <span className="text-xs text-primary font-medium">Click to choose a different file</span>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-primary" aria-hidden="true" />
                <span className="text-sm font-semibold text-stone-900">
                  Upload your resume
                </span>
                <span className="text-xs text-stone-500">
                  Drag and drop or click to browse · PDF or Word, up to 5 MB
                </span>
              </>
            )}
            <input
              ref={fileInputRef}
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
              className="sr-only"
            />
          </label>
          <FieldError message={errors.resume} />
        </div>

        <div>
          <Label htmlFor="credentials" className="block mb-2">
            Credentials / license
          </Label>
          <Input
            id="credentials"
            name="credentials"
            placeholder="e.g. LCADC, LGADC, CAC-AD, CSC-AD, LCPC, LCSW-C"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="experience" className="block mb-2">
              Years of experience
            </Label>
            <select id="experience" name="experience" defaultValue="" className={selectClass}>
              <option value="">Select…</option>
              {EXPERIENCE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="availability" className="block mb-2">
              Availability
            </Label>
            <select id="availability" name="availability" defaultValue="" className={selectClass}>
              <option value="">Select…</option>
              {AVAILABILITY_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="message" className="block mb-2">
            Tell us a little about yourself
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            maxLength={5000}
            placeholder="Your background, why you're interested in this work, anything you'd like us to know."
          />
          <FieldError message={errors.message} />
        </div>

        {state.status === 'error' && state.message && (
          <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {state.message}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              <Send aria-hidden="true" /> Submit Application
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
