import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Clock } from 'lucide-react'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

export const metadata: Metadata = {
  title: 'Level 2.5 Partial Hospitalization Program (PHP) | Walkway to Healing Maryland',
  description:
    'Partial Hospitalization Program (PHP) in Maryland. 20+ hours per week intensive outpatient. Maryland Medicaid accepted. Walkway to Healing.',
  alternates: { canonical: '/programs/partial-hospitalization' },
}

export default function PHPPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Programs', href: '/programs' }, { name: 'Partial Hospitalization', href: '/programs/partial-hospitalization' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ name: 'Level 2.5 Partial Hospitalization Program', description: 'Intensive daily outpatient substance use treatment over 20 hours per week in Maryland.', url: '/programs/partial-hospitalization' })) }} />
      <PageHero
        eyebrow="Level 2.5 Partial Hospitalization (PHP)"
        title="Intensive daily structure. Home every night."
        description="Our Partial Hospitalization Program is our highest level of outpatient care — full-day programming, 5–7 days a week, with comprehensive clinical services and medical monitoring."
        size="lg"
        backgroundImage="/images/program-php.jpg"
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection direction="left">
              <div>
                <h2 className="font-display text-2xl font-bold text-stone-900 mb-5">
                  What is Partial Hospitalization (PHP)?
                </h2>
                <div className="space-y-4 text-stone-600 leading-relaxed">
                  <p>
                    Level 2.5 Partial Hospitalization Program (PHP) provides a full-day
                    structured treatment experience — typically 5–6 hours per day, 5–7 days
                    a week — while allowing you to return home (or to a supportive
                    residence) each evening.
                  </p>
                  <p>
                    PHP is designed for people who need a high level of clinical support
                    but do not require 24-hour residential care. This includes people stepping
                    down from inpatient or residential treatment, those with complex
                    co-occurring mental health needs, and those who need more structure
                    than IOP can provide.
                  </p>
                  <p>
                    Services include intensive group therapy, individual clinical sessions,
                    mental health co-occurring support, medical monitoring, medication
                    management, and comprehensive discharge planning.
                  </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/intake" className="inline-flex items-center justify-center h-12 px-7 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors">
                    Start Intake
                  </Link>
                  <a href="tel:4109347976" className="inline-flex items-center justify-center h-12 px-7 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-colors">
                    Call to Learn More
                  </a>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 border border-stone-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-stone-900">Program Details</h3>
                  </div>
                  <dl className="space-y-3">
                    {[
                      { label: 'Level', value: 'Level 2.5 PHP (ASAM)' },
                      { label: 'Weekly Hours', value: '20+ hours per week' },
                      { label: 'Schedule', value: '5–7 days/week, 5–6 hrs per day' },
                      { label: 'Insurance', value: 'Maryland Medicaid accepted' },
                      { label: 'Location', value: '1200 Light St, Floor 1, Baltimore' },
                    ].map((item) => (
                      <div key={item.label} className="flex gap-3">
                        <dt className="text-xs text-stone-400 uppercase tracking-wide w-28 shrink-0 mt-0.5">{item.label}</dt>
                        <dd className="text-sm text-stone-700">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                  <h3 className="font-semibold text-primary-dark mb-3">Best for:</h3>
                  <ul className="space-y-2" role="list">
                    {[
                      'Stepping down from inpatient or residential care',
                      'Complex co-occurring mental health conditions',
                      'High intensity of use requiring daily structure',
                      'People who need more than IOP can offer',
                      'Those with medical stability who can live at home',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
