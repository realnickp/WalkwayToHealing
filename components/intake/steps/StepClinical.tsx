'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  clinicalSchema,
  type ClinicalFormData,
  SUBSTANCES,
  INSURANCE_TYPES,
} from '@/lib/validations/prescreen'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  defaultValues: Record<string, unknown>
  onNext: (data: Record<string, unknown>) => void
  onPrev: () => void
}

type YesNo = 'yes' | 'no'
type YesNoNa = 'yes' | 'no' | 'na'

function YesNoToggle({
  label,
  value,
  onChange,
  error,
  options = [{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }],
}: {
  label: string
  value: string | undefined
  onChange: (val: string) => void
  error?: string
  options?: { id: string; label: string }[]
}) {
  return (
    <div>
      <Label className="block mb-2 text-sm">
        {label} <span className="text-red-500">*</span>
      </Label>
      <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              'py-3 min-h-[44px] rounded-xl border-2 text-sm font-medium transition-all',
              value === opt.id
                ? 'border-primary bg-primary-50 text-primary'
                : 'border-stone-200 hover:border-stone-300 text-stone-600'
            )}
            aria-pressed={value === opt.id}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5" role="alert">{error}</p>}
    </div>
  )
}

export function StepClinical({ defaultValues, onNext, onPrev }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClinicalFormData>({
    resolver: zodResolver(clinicalSchema),
    defaultValues: {
      drugsAbusing: (defaultValues.drugsAbusing as string[]) || [],
      lastUseDate: (defaultValues.lastUseDate as string) || '',
      medicationsPrescribed: (defaultValues.medicationsPrescribed as string) || '',
      maintenanceClinic: (defaultValues.maintenanceClinic as string) || '',
      insuranceType: (defaultValues.insuranceType as string) || '',
      diagnosis: (defaultValues.diagnosis as string) || '',
      needsDetoxReferral: (defaultValues.needsDetoxReferral as YesNo) || undefined,
      needsHousingReferral: (defaultValues.needsHousingReferral as YesNo) || undefined,
      historySeizures: (defaultValues.historySeizures as YesNo) || undefined,
      mobilityIssues: (defaultValues.mobilityIssues as YesNo) || undefined,
      mobilityDescription: (defaultValues.mobilityDescription as string) || '',
      hasOpenWounds: (defaultValues.hasOpenWounds as YesNo) || undefined,
      woundsSelfTreatable: (defaultValues.woundsSelfTreatable as string) || '',
      pregnant: (defaultValues.pregnant as YesNoNa) || undefined,
      sexOffender: (defaultValues.sexOffender as YesNo) || undefined,
    },
  })

  const drugsAbusing = watch('drugsAbusing') || []
  const insuranceType = watch('insuranceType')
  const hasOpenWounds = watch('hasOpenWounds')

  const toggleSubstance = (name: string) => {
    const updated = drugsAbusing.includes(name)
      ? drugsAbusing.filter((s) => s !== name)
      : [...drugsAbusing, name]
    setValue('drugsAbusing', updated, { shouldValidate: true })
  }

  const onSubmit = (data: ClinicalFormData) => {
    onNext(data as unknown as Record<string, unknown>)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="bg-white rounded-2xl border border-stone-100 p-6 md:p-8 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-stone-900 mb-1">
          Clinical information
        </h2>
        <p className="text-stone-500 text-sm mb-8">
          This helps us place you in the right level of care. Everything is confidential.
        </p>

        <div className="space-y-6">
          {/* Substances */}
          <div>
            <Label className="block mb-2">
              What substances are you currently using? <span className="text-red-500">*</span>
            </Label>
            <p className="text-stone-400 text-xs mb-3">Select all that apply</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="group">
              {SUBSTANCES.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => toggleSubstance(sub)}
                  className={cn(
                    'py-3 px-3 min-h-[44px] rounded-xl border-2 text-sm font-medium transition-all text-left leading-tight',
                    drugsAbusing.includes(sub)
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  )}
                  aria-pressed={drugsAbusing.includes(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
            {errors.drugsAbusing && (
              <p className="text-red-500 text-xs mt-1.5" role="alert">{errors.drugsAbusing.message}</p>
            )}
          </div>

          {/* Last use date */}
          <div>
            <Label htmlFor="lastUseDate">
              When did you last use? <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastUseDate"
              placeholder="e.g., today, yesterday, 3 days ago"
              className="mt-1.5"
              {...register('lastUseDate')}
            />
            {errors.lastUseDate && (
              <p className="text-red-500 text-xs mt-1.5" role="alert">{errors.lastUseDate.message}</p>
            )}
          </div>

          {/* Medications */}
          <div>
            <Label htmlFor="medicationsPrescribed">
              Current prescribed medications <span className="text-stone-400 font-normal">(if any)</span>
            </Label>
            <Textarea
              id="medicationsPrescribed"
              placeholder="List any meds you're currently taking, e.g., Methadone 80mg, Seroquel, Lisinopril"
              className="mt-1.5 min-h-[80px]"
              {...register('medicationsPrescribed')}
            />
          </div>

          {/* Maintenance clinic */}
          <div>
            <Label htmlFor="maintenanceClinic">
              If on Methadone/Suboxone, which clinic? <span className="text-stone-400 font-normal">(if applicable)</span>
            </Label>
            <Input
              id="maintenanceClinic"
              placeholder="Clinic name or N/A"
              className="mt-1.5"
              {...register('maintenanceClinic')}
            />
          </div>

          {/* Insurance */}
          <div>
            <Label className="block mb-2">
              Insurance <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="group">
              {INSURANCE_TYPES.map((ins) => (
                <button
                  key={ins.id}
                  type="button"
                  onClick={() => setValue('insuranceType', ins.id, { shouldValidate: true })}
                  className={cn(
                    'py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all text-center',
                    insuranceType === ins.id
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  )}
                  aria-pressed={insuranceType === ins.id}
                >
                  {ins.label}
                </button>
              ))}
            </div>
            {errors.insuranceType && (
              <p className="text-red-500 text-xs mt-1.5" role="alert">{errors.insuranceType.message}</p>
            )}
          </div>

          {/* Diagnosis */}
          <div>
            <Label htmlFor="diagnosis">
              Any mental or physical diagnoses? <span className="text-stone-400 font-normal">(optional)</span>
            </Label>
            <Input
              id="diagnosis"
              placeholder="e.g., Depression, PTSD, Diabetes"
              className="mt-1.5"
              {...register('diagnosis')}
            />
          </div>

          {/* Yes/No clinical questions */}
          <div className="border-t border-stone-100 pt-6 space-y-5">
            <p className="text-stone-500 text-sm uppercase tracking-widest font-semibold mb-1">Quick questions</p>

            <YesNoToggle
              label="Do you need a referral for detox?"
              value={watch('needsDetoxReferral')}
              onChange={(val) => setValue('needsDetoxReferral', val as YesNo, { shouldValidate: true })}
              error={errors.needsDetoxReferral?.message}
            />

            <YesNoToggle
              label="Will you need a referral for housing?"
              value={watch('needsHousingReferral')}
              onChange={(val) => setValue('needsHousingReferral', val as YesNo, { shouldValidate: true })}
              error={errors.needsHousingReferral?.message}
            />

            <YesNoToggle
              label="History of seizures?"
              value={watch('historySeizures')}
              onChange={(val) => setValue('historySeizures', val as YesNo, { shouldValidate: true })}
              error={errors.historySeizures?.message}
            />

            <YesNoToggle
              label="Any mobility issues?"
              value={watch('mobilityIssues')}
              onChange={(val) => setValue('mobilityIssues', val as YesNo, { shouldValidate: true })}
              error={errors.mobilityIssues?.message}
            />

            {watch('mobilityIssues') === 'yes' && (
              <div className="ml-4 pl-4 border-l-2 border-primary-100">
                <Label htmlFor="mobilityDescription">Please describe your mobility issue</Label>
                <Textarea
                  id="mobilityDescription"
                  placeholder="e.g., I use a wheelchair, I have difficulty walking long distances, etc."
                  className="mt-1.5 min-h-[80px]"
                  {...register('mobilityDescription')}
                />
              </div>
            )}

            <YesNoToggle
              label="Any open wounds or sores?"
              value={watch('hasOpenWounds')}
              onChange={(val) => setValue('hasOpenWounds', val as YesNo, { shouldValidate: true })}
              error={errors.hasOpenWounds?.message}
            />

            {hasOpenWounds === 'yes' && (
              <div className="ml-4 pl-4 border-l-2 border-primary-100">
                <Label htmlFor="woundsSelfTreatable">Are they self-treatable?</Label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  {[{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setValue('woundsSelfTreatable', opt.id)}
                      className={cn(
                        'py-3 min-h-[44px] rounded-xl border-2 text-sm font-medium transition-all',
                        watch('woundsSelfTreatable') === opt.id
                          ? 'border-primary bg-primary-50 text-primary'
                          : 'border-stone-200 hover:border-stone-300 text-stone-600'
                      )}
                      aria-pressed={watch('woundsSelfTreatable') === opt.id}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <YesNoToggle
              label="Are you pregnant?"
              value={watch('pregnant')}
              onChange={(val) => setValue('pregnant', val as YesNoNa, { shouldValidate: true })}
              error={errors.pregnant?.message}
              options={[
                { id: 'yes', label: 'Yes' },
                { id: 'no', label: 'No' },
                { id: 'na', label: 'N/A' },
              ]}
            />

            <YesNoToggle
              label="Are you a registered sex offender?"
              value={watch('sexOffender')}
              onChange={(val) => setValue('sexOffender', val as YesNo, { shouldValidate: true })}
              error={errors.sexOffender?.message}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6 gap-3">
        <Button type="button" variant="ghost" size="lg" onClick={onPrev} className="gap-1.5">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Button>
        <Button type="submit" size="lg" className="gap-2 flex-1 sm:flex-none">
          Continue
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  )
}
