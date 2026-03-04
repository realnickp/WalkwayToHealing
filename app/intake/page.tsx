import type { Metadata } from 'next'
import Link from 'next/link'
import { Lock, Clock, ShieldCheck } from 'lucide-react'
import { PrescreenForm } from '@/components/intake/PrescreenForm'

export const metadata: Metadata = {
  title: 'Start Your Intake',
  description:
    'Begin your substance use treatment journey with Walkway to Healing. Complete a confidential prescreen intake in about 2 minutes. Accepts Maryland Medicaid.',
  robots: { index: false },
  alternates: { canonical: '/intake' },
}

export default function IntakePage() {
  return (
    <div className="min-h-screen bg-stone-100">
      {/* ── Hero ── */}
      <section className="relative bg-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(27,107,90,0.35),transparent_60%)]" />

        <div className="relative z-10 container mx-auto max-w-3xl px-5 pt-16 pb-36 sm:pt-20 sm:pb-40 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Let&apos;s get started
          </h1>
          <p className="text-primary-100/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Three quick steps so our clinical team can prepare for your first
            conversation. No wrong answers — just be as honest as you&apos;re
            comfortable with.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium px-4 py-2 rounded-full">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              Encrypted &amp; Confidential
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium px-4 py-2 rounded-full">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Takes about 2 minutes
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium px-4 py-2 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              HIPAA &amp; 42 CFR Part 2 Protected
            </span>
          </div>
        </div>
      </section>

      {/* ── Form Card ── */}
      <div className="relative z-10 container mx-auto max-w-2xl px-4 -mt-24 pb-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-stone-200/60 p-6 sm:p-10">
          <PrescreenForm />
        </div>

        {/* Footer links */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-stone-500 text-sm">
            Prefer to talk to someone?{' '}
            <a
              href="tel:4109347976"
              className="text-primary font-semibold hover:underline"
            >
              (410) 934-7976
            </a>
          </p>
          <p className="text-stone-400 text-xs">
            Your data is protected under federal privacy laws.{' '}
            <Link href="/privacy" className="underline hover:text-stone-600 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
