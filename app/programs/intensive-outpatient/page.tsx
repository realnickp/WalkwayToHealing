import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Clock } from 'lucide-react'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { ProgramLocalSection } from '@/components/programs/ProgramLocalSection'

export const metadata: Metadata = {
  title: 'Intensive Outpatient Program (IOP) in Baltimore, MD | Walkway to Healing',
  description:
    'Intensive Outpatient Program (IOP) in Maryland. 9–20 hours per week. Structured group and individual therapy. Maryland Medicaid accepted. Walkway to Healing.',
  alternates: { canonical: '/programs/intensive-outpatient' },
}

export default function IntensiveOutpatientPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Programs', href: '/programs' }, { name: 'Intensive Outpatient', href: '/programs/intensive-outpatient' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ name: 'Level 2.1 Intensive Outpatient Program', description: 'Structured group and individual therapy 9-20 hours per week for substance use treatment in Maryland.', url: '/programs/intensive-outpatient' })) }} />
      <PageHero
        eyebrow="Level 2.1 Intensive Outpatient (IOP)"
        title="Structured support that fits your schedule."
        description="Our Intensive Outpatient Program meets 3–5 days per week for 3 hours per session — giving you the clinical intensity you need while you continue to live at home."
        size="lg"
        backgroundImage="/images/real-group-therapy.jpg"
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <AnimatedSection direction="left">
              <div>
                <h2 className="font-display text-2xl font-bold text-stone-900 mb-5">
                  What is Intensive Outpatient (IOP)?
                </h2>
                <div className="space-y-4 text-stone-600 leading-relaxed">
                  <p>
                    Level 2.1 Intensive Outpatient Program (IOP) is designed for people who
                    need more structured treatment than standard outpatient, but who have a
                    safe living situation and do not require 24-hour residential care.
                  </p>
                  <p>
                    IOP typically meets 3–5 days per week for 3 hours per session — about
                    9–20 hours of treatment per week. This level of care allows you to
                    maintain your job, family responsibilities, or education while receiving
                    meaningful clinical support.
                  </p>
                  <p>
                    Sessions include group therapy, individual counseling, psychoeducation,
                    skills-based learning, and ongoing case management. Family involvement
                    is encouraged when appropriate.
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
                      { label: 'Level', value: 'Level 2.1 IOP (ASAM)' },
                      { label: 'Weekly Hours', value: '9–20 hours per week' },
                      { label: 'Schedule', value: '3–5 sessions per week, 3 hrs each' },
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
                      'People balancing work, family, and treatment',
                      'Stepping down from Partial Hospitalization',
                      'Those needing more than standard outpatient',
                      'People with a safe and stable home environment',
                      'Co-occurring mental health support',
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
      <ProgramLocalSection
        heading="Intensive Outpatient (IOP) in Baltimore"
        paragraphs={["Walkway to Healing runs its Intensive Outpatient Program at 1200 Light St in South Baltimore, with easy access from public transit. IOP meets 3 to 5 days a week for about 3 hours per session, so most people keep working, parenting or going to school while they are in treatment.", "IOP is often the next step after Partial Hospitalization or an inpatient stay, and it is also a starting point for people who need more support than one or two sessions a week. Our counselors include people in recovery themselves, and we accept Maryland Medicaid."]}
        faqs={[{"question": "How many hours a week is IOP?", "answer": "Level 2.1 Intensive Outpatient is about 9 to 20 hours of treatment per week, usually 3 to 5 sessions of about 3 hours each."}, {"question": "Does Maryland Medicaid cover IOP at Walkway to Healing?", "answer": "Yes. We accept Maryland Medicaid, including HealthChoice plans, and we will verify your coverage before your first visit at no cost."}, {"question": "Can I work while I am in IOP?", "answer": "Yes. IOP is built so you can keep living at home and keep up with work, family or school while you attend treatment several days a week."}, {"question": "How do I start IOP in Baltimore?", "answer": "Call (410) 934-7976 any time, our phones are answered 24/7, or start your intake online. Your first visit is an assessment to confirm IOP is the right level of care."}]}
      />
    </>
  )
}
