import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Clock, Users, ArrowRight } from 'lucide-react'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { FAQSection } from '@/components/home/FAQSection'

export const metadata: Metadata = {
  title: 'Level 1 Outpatient Program (OP) | Walkway to Healing Maryland',
  description:
    'Level 1 Outpatient substance use treatment in Maryland. Flexible scheduling under 9 hours per week. Accepts Maryland Medicaid. Walkway to Healing.',
  alternates: { canonical: '/programs/outpatient' },
}

export default function OutpatientPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Programs', href: '/programs' }, { name: 'Level 1 Outpatient', href: '/programs/outpatient' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ name: 'Level 1 Outpatient Program', description: 'Flexible outpatient substance use treatment under 9 hours per week. Individual and group counseling in Maryland.', url: '/programs/outpatient' })) }} />
      <PageHero
        eyebrow="Level 1 Outpatient (OP)"
        title="Flexible support built around your life."
        description="Level 1 Outpatient is our least intensive level of care — fewer than 9 hours of treatment per week — designed for people with stable environments who need structured, ongoing support."
        size="lg"
        backgroundImage="/images/counseling-office.jpg"
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <AnimatedSection direction="left">
              <div>
                <h2 className="font-display text-2xl font-bold text-stone-900 mb-5">
                  What is Level 1 Outpatient?
                </h2>
                <div className="space-y-4 text-stone-600 leading-relaxed">
                  <p>
                    Level 1 Outpatient (OP) provides structured counseling and support
                    while allowing you to continue your daily life — your job, your family,
                    your routines.
                  </p>
                  <p>
                    Sessions typically meet 1–3 times per week and include a combination
                    of individual counseling and group therapy. The focus is on building
                    coping skills, identifying triggers, creating relapse prevention
                    plans, and building a foundation for lasting recovery.
                  </p>
                  <p>
                    Outpatient is often the right fit for people who have completed a
                    higher level of care (like IOP or PHP) and are stepping down, as well
                    as people beginning their recovery journey with a stable home environment
                    and strong support system.
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
                      { label: 'Level', value: 'Level 1 Outpatient (ASAM)' },
                      { label: 'Weekly Hours', value: 'Fewer than 9 hours per week' },
                      { label: 'Schedule', value: '1–3 sessions per week' },
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
                      'Stepping down from IOP or PHP',
                      'Stable home and support system',
                      'Full-time work or school',
                      'Early recovery maintenance',
                      'Ongoing support after completing treatment',
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

          {/* Other levels */}
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-8 border border-stone-100">
              <h2 className="font-display text-xl font-bold text-stone-900 mb-6">
                Need more intensive support?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Level 2.1 Intensive Outpatient', href: '/programs/intensive-outpatient', desc: '9–20 hours per week' },
                  { label: 'Level 2.5 Partial Hospitalization', href: '/programs/partial-hospitalization', desc: '20+ hours per week' },
                ].map((prog) => (
                  <Link key={prog.href} href={prog.href} className="group flex items-center justify-between p-4 bg-cream rounded-xl border border-stone-100 hover:border-primary/20 transition-all">
                    <div>
                      <div className="font-medium text-stone-800 group-hover:text-primary transition-colors text-sm">{prog.label}</div>
                      <div className="text-xs text-stone-500 mt-0.5">{prog.desc}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-stone-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
