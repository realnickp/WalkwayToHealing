'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  Phone, ClipboardList, Calendar, Layers, Home, ArrowRight, Star
} from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Reach Out Today',
    description:
      'Call us, send an email, or start the online intake — whichever feels right. A real person will respond during business hours. No judgment, no pressure.',
    cta: { label: 'Call (410) 934-7976', href: 'tel:4109347976', external: true },
    color: 'from-primary to-primary-light',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Quick Prescreen Intake',
    description:
      'A short online form (3–7 minutes) so we can understand your situation before we speak. You can also complete it over the phone if you prefer.',
    cta: { label: 'Start Intake', href: '/intake', external: false },
    color: 'from-primary-dark to-primary',
  },
  {
    number: '03',
    icon: Calendar,
    title: 'Schedule Your Assessment',
    description:
      'We\'ll reach out to set up a full clinical assessment — a conversation, not an interrogation. We\'ll determine which level of care fits your needs.',
    cta: { label: 'Learn What to Expect', href: '/about/approach', external: false },
    color: 'from-accent to-accent-light',
  },
  {
    number: '04',
    icon: Layers,
    title: 'Start the Right Level of Care',
    description:
      'Begin your program — whether that\'s Outpatient, Intensive Outpatient, or Partial Hospitalization. We meet you where you are.',
    cta: { label: 'Explore Programs', href: '/programs', external: false },
    color: 'from-primary to-primary-light',
  },
  {
    number: '05',
    icon: Home,
    title: 'Build Stability & Support',
    description:
      'As you progress, we help connect you to housing resources, peer support, and community resources that reinforce your recovery.',
    cta: { label: 'Housing Support', href: '/programs/supportive-housing', external: false },
    color: 'from-primary-dark to-primary',
  },
  {
    number: '06',
    icon: Star,
    title: 'Stay Connected',
    description:
      'Recovery is ongoing. As you step down or transition out of active treatment, we remain a resource and help you stay connected to support.',
    cta: { label: 'Contact Us Anytime', href: '/contact', external: false },
    color: 'from-accent to-accent-light',
  },
]

export function WhatHappensNext() {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const progressBarHeight = useTransform(scrollYProgress, [0, 0.9], ['0%', '100%'])

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 bg-cream relative"
      aria-labelledby="what-happens-heading"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Your Path Forward
          </p>
          <h2
            id="what-happens-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4 text-balance"
          >
            What Happens Next
          </h2>
          <p className="text-stone-500 text-lg leading-relaxed">
            We know reaching out takes courage. Here&apos;s exactly what you can
            expect from us — step by step, no surprises.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical progress line */}
          <div
            className="absolute left-6 md:left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-stone-200"
            aria-hidden="true"
          >
            {!shouldReduceMotion && (
              <motion.div
                className="absolute top-0 left-0 w-full bg-primary rounded-full"
                style={{ height: progressBarHeight }}
              />
            )}
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={step.number}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`flex gap-6 md:gap-10 relative ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } pl-16 md:pl-0`}
                >
                  {/* Step connector dot */}
                  <div
                    className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 flex items-start justify-center z-10"
                  >
                    <div className="w-12 h-12 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-md">
                      <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`md:w-1/2 ${
                      isEven ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16 md:ml-auto'
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:border-primary-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-display text-4xl font-bold text-primary/30 leading-none select-none">
                          {step.number}
                        </span>
                        <h3 className="font-display text-xl font-bold text-stone-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-stone-600 leading-relaxed mb-4 text-sm">
                        {step.description}
                      </p>
                      {step.cta.external ? (
                        <a
                          href={step.cta.href}
                          className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-dark transition-colors group"
                        >
                          {step.cta.label}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-150" aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          href={step.cta.href}
                          className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-dark transition-colors group"
                        >
                          {step.cta.label}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-150" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-16"
        >
          <p className="text-stone-500 mb-6">
            Ready to take that first step?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/intake"
              className="inline-flex items-center justify-center h-13 px-8 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors duration-150 shadow-lg shadow-primary/20"
            >
              Start Intake — It Takes 5 Minutes
            </Link>
            <a
              href="tel:4109347976"
              className="inline-flex items-center justify-center h-13 px-8 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-150"
            >
              <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
              (410) 934-7976
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
