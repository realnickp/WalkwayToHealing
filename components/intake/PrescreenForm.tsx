'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Save } from 'lucide-react'
import { submitPrescreen, savePartialLead } from '@/lib/actions/intake'

import { StepAboutYou } from './steps/StepAboutYou'
import { StepClinical } from './steps/StepClinical'
import { StepReviewSubmit } from './steps/StepReviewSubmit'

const STEPS = [
  { id: 'about', title: 'About You', subtitle: 'Basic info' },
  { id: 'clinical', title: 'Clinical Info', subtitle: 'Treatment details' },
  { id: 'review', title: 'Review & Submit', subtitle: 'Almost done' },
]

const STORAGE_KEY = 'wth_prescreen_draft_v3'

export function PrescreenForm() {
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()
  const formTopRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    if (typeof window === 'undefined') return {}
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }
  }, [formData])

  const updateFormData = useCallback((stepData: Record<string, unknown>) => {
    setFormData((prev) => ({ ...prev, ...stepData }))
  }, [])

  const scrollToForm = useCallback(() => {
    requestAnimationFrame(() => {
      if (formTopRef.current) {
        const headerOffset = 16
        const top = formTopRef.current.getBoundingClientRect().top + window.scrollY - headerOffset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    })
  }, [])

  const goNext = useCallback(
    async (stepData: Record<string, unknown>) => {
      const merged = { ...formData, ...stepData }
      updateFormData(stepData)

      // After Step 1, save partial lead to DB so we capture contact info
      if (currentStep === 0) {
        try {
          const result = await savePartialLead(merged)
          if (result.success && result.leadId) {
            setFormData((prev) => ({ ...prev, ...stepData, _partialLeadId: result.leadId }))
          }
        } catch {
          // Non-blocking — continue even if partial save fails
        }
      }

      if (currentStep < STEPS.length - 1) {
        setDirection(1)
        setCurrentStep((s) => s + 1)
        scrollToForm()
      }
    },
    [currentStep, formData, updateFormData, scrollToForm]
  )

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep((s) => s - 1)
      scrollToForm()
    }
  }, [currentStep, scrollToForm])

  const handleSubmit = useCallback(
    async (stepData: Record<string, unknown>) => {
      updateFormData(stepData)
      const combined = { ...formData, ...stepData }

      setIsSubmitting(true)
      setSubmitError(null)

      try {
        const result = await submitPrescreen(combined as unknown as Parameters<typeof submitPrescreen>[0])

        if (result.success) {
          localStorage.removeItem(STORAGE_KEY)
          router.push(`/intake/success${result.submissionId ? `?id=${result.submissionId}` : ''}`)
        } else {
          setSubmitError(result.error || 'Something went wrong. Please try again.')
          setIsSubmitting(false)
        }
      } catch {
        setSubmitError('Something went wrong. Please call us at (410) 934-7976.')
        setIsSubmitting(false)
      }
    },
    [formData, updateFormData, router]
  )

  const variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  }

  const stepComponents = [
    <StepAboutYou key="about" defaultValues={formData} onNext={goNext} />,
    <StepClinical key="clinical" defaultValues={formData} onNext={goNext} onPrev={goPrev} />,
    <StepReviewSubmit
      key="review"
      defaultValues={formData}
      onSubmit={handleSubmit}
      onPrev={goPrev}
      isSubmitting={isSubmitting}
      submitError={submitError}
    />,
  ]

  return (
    <div>
      {/* Scroll anchor */}
      <div ref={formTopRef} className="scroll-mt-24" />

      {/* Step indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-base font-semibold text-stone-800">
            {STEPS[currentStep].title}
          </p>
          <p className="text-xs text-stone-400 font-medium tabular-nums">
            Step {currentStep + 1} of {STEPS.length}
          </p>
        </div>

        {/* Three-segment bar */}
        <div className="flex gap-1.5" role="list" aria-label="Form steps">
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              role="listitem"
              aria-current={i === currentStep ? 'step' : undefined}
              className={`h-1 rounded-full transition-all duration-500 flex-1 ${
                i < currentStep
                  ? 'bg-primary'
                  : i === currentStep
                    ? 'bg-primary/60'
                    : 'bg-stone-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Auto-save indicator */}
      {Object.keys(formData).length > 0 && currentStep > 0 && (
        <div className="flex items-center gap-1.5 text-sm text-stone-400 mb-4">
          <Save className="h-3 w-3" aria-hidden="true" />
          Progress saved
        </div>
      )}

      {/* Step content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.25, ease: 'easeOut' }}
        >
          {stepComponents[currentStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
