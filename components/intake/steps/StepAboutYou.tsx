'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  aboutYouSchema,
  type AboutYouFormData,
  REFERRAL_SOURCES,
  GENDER_OPTIONS,
  MD_COUNTIES,
} from '@/lib/validations/prescreen'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronRight } from 'lucide-react'
import { formatPhone, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Props {
  defaultValues: Record<string, unknown>
  onNext: (data: Record<string, unknown>) => void
}

export function StepAboutYou({ defaultValues, onNext }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AboutYouFormData>({
    resolver: zodResolver(aboutYouSchema),
    defaultValues: {
      referralSource: (defaultValues.referralSource as string) || '',
      referralCenter: (defaultValues.referralCenter as string) || '',
      readyNow: (defaultValues.readyNow as 'yes' | 'no') || undefined,
      fullName: (defaultValues.fullName as string) || '',
      dateOfBirth: (defaultValues.dateOfBirth as string) || '',
      phone: (defaultValues.phone as string) || '',
      genderIdentity: (defaultValues.genderIdentity as string) || '',
      county: (defaultValues.county as string) || '',
    },
  })

  const referralSource = watch('referralSource')
  const readyNow = watch('readyNow')

  const onSubmit = (data: AboutYouFormData) => {
    onNext(data as unknown as Record<string, unknown>)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="bg-white rounded-2xl border border-stone-100 p-6 md:p-8 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-stone-900 mb-1">
          Tell us about yourself
        </h2>
        <p className="text-stone-500 text-sm mb-8">
          Basic info so we can reach you and get you started.
        </p>

        <div className="space-y-5">
          {/* Referral Source */}
          <div>
            <Label className="block mb-2">
              How did you find us? <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="group">
              {REFERRAL_SOURCES.map((src) => (
                <button
                  key={src.id}
                  type="button"
                  onClick={() => setValue('referralSource', src.id, { shouldValidate: true })}
                  className={cn(
                    'py-3 px-3 min-h-[44px] rounded-xl border-2 text-sm font-medium transition-all text-center leading-tight',
                    referralSource === src.id
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  )}
                  aria-pressed={referralSource === src.id}
                >
                  {src.label}
                </button>
              ))}
            </div>
            {errors.referralSource && (
              <p className="text-red-500 text-xs mt-1.5" role="alert">{errors.referralSource.message}</p>
            )}
          </div>

          {/* Treatment center name (conditional) */}
          {referralSource === 'treatment_center' && (
            <div>
              <Label htmlFor="referralCenter">Which treatment center?</Label>
              <Input
                id="referralCenter"
                placeholder="Center name"
                className="mt-1.5"
                {...register('referralCenter')}
              />
            </div>
          )}

          {/* Ready now? */}
          <div>
            <Label className="block mb-2">
              Are you ready to start treatment now? <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {(['yes', 'no'] as const).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setValue('readyNow', val, { shouldValidate: true })}
                  className={cn(
                    'py-3.5 rounded-xl border-2 text-sm font-medium transition-all',
                    readyNow === val
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  )}
                  aria-pressed={readyNow === val}
                >
                  {val === 'yes' ? 'Yes, I\'m ready' : 'Not yet'}
                </button>
              ))}
            </div>
            {errors.readyNow && (
              <p className="text-red-500 text-xs mt-1.5" role="alert">{errors.readyNow.message}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              placeholder="First and last name"
              className="mt-1.5"
              autoComplete="name"
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1.5" role="alert">{errors.fullName.message}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <Label htmlFor="dateOfBirth">
              Date of Birth <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dateOfBirth"
              placeholder="MM/DD/YYYY"
              inputMode="numeric"
              maxLength={10}
              className="mt-1.5"
              {...register('dateOfBirth', {
                onChange: (e) => setValue('dateOfBirth', formatDate(e.target.value), { shouldValidate: false }),
              })}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs mt-1.5" role="alert">{errors.dateOfBirth.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(410) 555-0100"
              inputMode="tel"
              autoComplete="tel"
              className="mt-1.5"
              {...register('phone', {
                onChange: (e) => setValue('phone', formatPhone(e.target.value), { shouldValidate: true }),
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1.5" role="alert">{errors.phone.message}</p>
            )}
          </div>

          {/* Gender Identity */}
          <div>
            <Label className="block mb-2">
              Gender Identity <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" role="group">
              {GENDER_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setValue('genderIdentity', opt.id, { shouldValidate: true })}
                  className={cn(
                    'py-2.5 px-2 min-h-[44px] rounded-xl border-2 text-sm font-medium transition-all text-center',
                    watch('genderIdentity') === opt.id
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-stone-200 hover:border-stone-300 text-stone-600'
                  )}
                  aria-pressed={watch('genderIdentity') === opt.id}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {errors.genderIdentity && (
              <p className="text-red-500 text-xs mt-1.5" role="alert">{errors.genderIdentity.message}</p>
            )}
          </div>

          {/* County */}
          <div>
            <Label htmlFor="county">
              County <span className="text-red-500">*</span>
            </Label>
            <div className="mt-1.5">
              <Select
                onValueChange={(val) => setValue('county', val, { shouldValidate: true })}
                defaultValue={(defaultValues.county as string) || undefined}
              >
                <SelectTrigger id="county">
                  <SelectValue placeholder="Select your county" />
                </SelectTrigger>
                <SelectContent>
                  {MD_COUNTIES.map((county) => (
                    <SelectItem key={county} value={county}>{county}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {errors.county && (
              <p className="text-red-500 text-xs mt-1.5" role="alert">{errors.county.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button type="submit" size="lg" className="w-full sm:w-auto gap-2">
          Continue
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  )
}
