import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Clock, AlertTriangle, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Intake Submitted — Thank You',
  description: 'Your prescreen has been received. Our team will be in touch soon.',
  robots: { index: false },
}

export default function IntakeSuccessPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full">
        {/* Success card */}
        <div className="bg-white rounded-2xl border border-stone-100 p-8 shadow-sm text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-primary" aria-hidden="true" />
          </div>

          <h1 className="font-display text-2xl font-bold text-stone-900 mb-3">
            Your prescreen has been received
          </h1>

          <p className="text-stone-600 leading-relaxed mb-6">
            Thank you for taking this step. A member of our team will review your
            information and reach out to schedule your assessment — at the time and
            in the way you specified.
          </p>

          <div className="bg-cream rounded-xl p-5 border border-stone-100 text-left mb-6">
            <h2 className="font-semibold text-stone-900 mb-3 text-sm">What happens next</h2>
            <div className="space-y-3">
              {[
                { step: '1', text: 'Our clinical team reviews your prescreen' },
                { step: '2', text: 'We reach out to schedule your assessment' },
                { step: '3', text: 'We verify your insurance coverage if requested' },
                { step: '4', text: 'Your assessment appointment — a conversation, not a test' },
                { step: '5', text: 'You begin the right level of care for your situation' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 font-bold">
                    {item.step}
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-stone-500 text-sm mb-2">
            <Clock className="h-4 w-4" aria-hidden="true" />
            Our office hours: Mon–Fri, 9:00 AM – 5:00 PM
          </div>
          <p className="text-stone-500 text-sm">
            Need to talk now?{' '}
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              {siteConfig.contact.phoneFormatted}
            </a>
          </p>
        </div>

        {/* Crisis reminder */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold text-amber-900 text-sm mb-1">
              If you need immediate help
            </p>
            <p className="text-amber-800 text-sm leading-relaxed">
              This form is not monitored in real-time. If you or someone else is in
              immediate danger, call <strong>911</strong>. For a mental health or
              substance use crisis, call or text <strong>988</strong> (Suicide &amp;
              Crisis Lifeline), available 24 hours a day.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-stone-200 text-stone-700 font-medium py-3.5 rounded-xl hover:bg-stone-50 transition-colors text-sm"
          >
            Return to Homepage
          </Link>
          <Link
            href="/programs"
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-medium py-3.5 rounded-xl hover:bg-primary-dark transition-colors text-sm"
          >
            Learn About Programs
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
