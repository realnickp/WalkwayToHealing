'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema, type ReviewFormData } from '@/lib/validations/prescreen'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader2, Lock, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  defaultValues: Record<string, unknown>
  onSubmit: (data: Record<string, unknown>) => void
  onPrev: () => void
  isSubmitting: boolean
  submitError: string | null
}

export function StepReviewSubmit({ defaultValues, onSubmit, onPrev, isSubmitting, submitError }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      courtApptNext30: (defaultValues.courtApptNext30 as 'yes' | 'no') || undefined,
      courtApptDetails: (defaultValues.courtApptDetails as string) || '',
      anythingElse: (defaultValues.anythingElse as string) || '',
      consentGiven: undefined,
      signatureName: (defaultValues.signatureName as string) || '',
    },
  })

  const courtAppt = watch('courtApptNext30')

  const handleFormSubmit = (data: ReviewFormData) => {
    onSubmit(data as unknown as Record<string, unknown>)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      {/* Honeypot */}
      <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" autoComplete="off" />

      <div className="bg-white rounded-2xl border border-stone-100 p-6 md:p-8 shadow-sm space-y-7">
        <div>
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-1">
            Almost done
          </h2>
          <p className="text-stone-500 text-sm">
            Just a couple more things, then sign and submit.
          </p>
        </div>

        {/* Court / Dr appointments */}
        <div>
          <Label className="block mb-2">
            Any court or doctor appointments in the next 30 days?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {(['yes', 'no'] as const).map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setValue('courtApptNext30', val, { shouldValidate: true })}
                className={cn(
                  'py-3.5 rounded-xl border-2 text-sm font-medium transition-all',
                  courtAppt === val
                    ? 'border-primary bg-primary-50 text-primary'
                    : 'border-stone-200 hover:border-stone-300 text-stone-600'
                )}
                aria-pressed={courtAppt === val}
              >
                {val === 'yes' ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>

        {courtAppt === 'yes' && (
          <div>
            <Label htmlFor="courtApptDetails">Where and when?</Label>
            <Textarea
              id="courtApptDetails"
              placeholder="e.g., Maryland District Court"
              className="mt-1.5 min-h-[80px]"
              {...register('courtApptDetails')}
            />
          </div>
        )}

        {/* Anything else */}
        <div>
          <Label htmlFor="anythingElse">
            Is there anything else you&apos;d like us to know before we connect?
          </Label>
          <Textarea
            id="anythingElse"
            placeholder="Anything at all — concerns, questions, things you want us to be aware of..."
            className="mt-1.5 min-h-[100px]"
            {...register('anythingElse')}
          />
        </div>

        {/* Consent */}
        <div className="border-t border-stone-100 pt-6">
          <div className="bg-cream rounded-xl p-5 border border-stone-200 mb-5">
            <h3 className="font-semibold text-stone-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" aria-hidden="true" />
              Consent &amp; Confidentiality
            </h3>
            <div className="text-stone-600 text-sm leading-relaxed space-y-2">
              <p>
                By submitting this form, you consent to Walkway to Healing using the information
                provided to coordinate care, verify insurance, and contact you regarding treatment.
              </p>
              <p>
                Your information is protected by <strong>42 CFR Part 2</strong> and <strong>HIPAA</strong>.
                We will not share it without your written consent, except as required by law.
              </p>
              <p>
                This form is <strong>not monitored 24/7</strong>. If you are in crisis, call <strong>988</strong> or <strong>911</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-5">
            <Checkbox
              id="consent"
              onCheckedChange={(checked) => {
                setValue('consentGiven', checked === true ? true : undefined as unknown as true, { shouldValidate: true })
              }}
            />
            <label htmlFor="consent" className="text-sm text-stone-800 leading-relaxed cursor-pointer">
              I agree to the consent statement above. <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.consentGiven && (
            <p className="text-red-500 text-xs mb-4" role="alert">{errors.consentGiven.message}</p>
          )}

          <div>
            <Label htmlFor="signature">
              Type your full name as your electronic signature <span className="text-red-500">*</span>
            </Label>
            <Input
              id="signature"
              placeholder="Your full legal name"
              className="mt-1.5"
              {...register('signatureName')}
            />
            {errors.signatureName && (
              <p className="text-red-500 text-xs mt-1.5" role="alert">{errors.signatureName.message}</p>
            )}
          </div>
        </div>

        {/* Crisis reminder */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-amber-800 text-xs leading-relaxed">
            <strong>Not an emergency line.</strong> If you are in danger, call <strong>911</strong>.
            For crisis support, call or text <strong>988</strong>.
          </p>
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-700 text-sm font-medium">{submitError}</p>
            <p className="text-red-600 text-xs mt-1">You can also call us at (410) 934-7976.</p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6 gap-4">
        <Button type="button" variant="ghost" size="lg" onClick={onPrev} className="gap-1.5" disabled={isSubmitting}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Button>
        <Button type="submit" size="lg" className="gap-2 flex-1 sm:flex-none" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </div>

      <p className="text-center text-sm text-stone-400 mt-4">
        Submission is encrypted and stored securely.
      </p>
    </form>
  )
}
