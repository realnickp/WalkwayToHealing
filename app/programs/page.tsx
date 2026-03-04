import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Users, CheckCircle } from 'lucide-react'
import { breadcrumbSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Programs & Levels of Care',
  description:
    'Walkway to Healing offers three levels of outpatient substance use treatment in Maryland — Level 1 OP, Level 2.1 IOP, and Level 2.5 PHP — plus supportive housing referrals. Medicaid accepted.',
  alternates: { canonical: '/programs' },
  openGraph: {
    title: 'Programs & Levels of Care | Walkway to Healing',
    description:
      'Three levels of outpatient substance use treatment in Maryland — OP, IOP, and PHP — plus supportive housing referrals.',
  },
}

const levelDetails = [
  {
    ...siteConfig.services[0],
    level: '1',
    hoursDetail: 'Fewer than 9 hours per week',
    bestFor: ['Stepping down from IOP or PHP', 'People with stable home environments', 'Early recovery with solid support networks', 'Ongoing maintenance after completing higher care'],
    includes: ['Individual counseling sessions', 'Group therapy', 'Relapse prevention planning', 'Case management and referrals'],
    image: '/images/counseling-office.jpg',
  },
  {
    ...siteConfig.services[1],
    level: '2.1',
    hoursDetail: '9–20 hours per week, typically 3–5 days',
    bestFor: ['People who need frequent engagement without residential care', 'Those balancing work, family, and treatment', 'Stepping down from PHP', 'People with moderate support systems at home'],
    includes: ['Group therapy (multiple sessions per week)', 'Individual counseling', 'Psychoeducation and skill-building', 'Family involvement when appropriate', 'Case management'],
    image: '/images/group-room.jpg',
  },
  {
    ...siteConfig.services[2],
    level: '2.5',
    hoursDetail: '20+ hours per week, typically 5 days',
    bestFor: ['Stepping down from residential or inpatient care', 'People needing intensive daily structure', 'Complex co-occurring mental health needs', 'Those who need more than IOP but can live at home'],
    includes: ['Full-day structured programming', 'Intensive group therapy', 'Individual clinical sessions', 'Mental health co-occurring support', 'Medical monitoring', 'Case management and discharge planning'],
    image: '/images/recovery-php-portrait.jpg',
  },
]

export default function ProgramsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Programs', href: '/programs' }])) }} />
      <PageHero
        eyebrow="Levels of Care"
        title="Treatment that meets you where you are."
        description="We offer a full continuum of outpatient services — from standard outpatient to intensive partial hospitalization — so we can match the right intensity of care to your specific situation. All services accept Maryland Medicaid."
        size="lg"
        backgroundImage="/images/group-room.jpg"
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto">
          <div className="space-y-16">
            {levelDetails.map((service, index) => (
              <AnimatedSection key={service.id} delay={0.05 * index}>
                <div className={`grid lg:grid-cols-2 gap-10 items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-bold text-primary bg-primary-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
                        Level {service.level}
                      </span>
                      <div className="flex items-center gap-1.5 text-stone-400 text-sm">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        {service.hoursDetail}
                      </div>
                    </div>

                    <h2 className="font-display text-3xl font-bold text-stone-900 mb-4">
                      {service.name}
                    </h2>

                    <p className="text-stone-600 leading-relaxed mb-6 text-lg">
                      {service.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h3 className="font-semibold text-stone-900 text-sm mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" aria-hidden="true" />
                          Best For
                        </h3>
                        <ul className="space-y-2" role="list">
                          {service.bestFor.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                              <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-900 text-sm mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" aria-hidden="true" />
                          What&apos;s Included
                        </h3>
                        <ul className="space-y-2" role="list">
                          {service.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                              <ArrowRight className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors duration-150"
                    >
                      Learn More About {service.shortName}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-lg">
                    <Image
                      src={service.image}
                      alt={`${service.name} at Walkway to Healing`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Supportive Housing */}
          <AnimatedSection delay={0.1} className="mt-16 pt-16 border-t border-stone-200">
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="font-display text-3xl font-bold mb-4">
                {siteConfig.services[3].name}
              </h2>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {siteConfig.services[3].description}
              </p>
              <Link
                href="/programs/supportive-housing"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
              >
                Learn About Housing Support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection className="text-center mt-16">
            <p className="text-stone-500 mb-6 text-lg">
              Not sure where to start? Our clinical team will guide you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center h-13 px-8 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                Start Your Intake
              </Link>
              <a
                href="tel:4109347976"
                className="inline-flex items-center justify-center h-13 px-8 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Call (410) 934-7976
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
