import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, CheckCircle, Phone } from 'lucide-react'
import { breadcrumbSchema, serviceSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

export const metadata: Metadata = {
  title: 'Supportive Housing Referrals | Walkway to Healing Maryland',
  description:
    'Walkway to Healing connects clients with supportive housing partners across Maryland. Housing referrals and coordination for people in substance use treatment.',
  alternates: { canonical: '/programs/supportive-housing' },
}

export default function SupportiveHousingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Programs', href: '/programs' }, { name: 'Supportive Housing', href: '/programs/supportive-housing' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({ name: 'Supportive Housing Referrals', description: 'Connection to vetted housing partners across Maryland for people in substance use treatment.', url: '/programs/supportive-housing' })) }} />
      <PageHero
        eyebrow="Supportive Housing"
        title="Stable housing, stable recovery."
        description="Where you live shapes your ability to heal. We connect clients with trusted housing partners across Maryland who provide safe, supportive environments for people in recovery."
        size="lg"
        backgroundImage="/images/hero-pathway.jpg"
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-12">
              <p className="text-amber-900 text-sm">
                <strong>Important:</strong> Walkway to Healing is an outpatient treatment provider,
                not a housing provider. Housing support is a referral and coordination service.
                We cannot guarantee placement but will work diligently to connect you with
                appropriate options.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <AnimatedSection direction="left">
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-5">
                How we support housing stability
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  We understand that you can&apos;t focus on recovery when you&apos;re
                  worried about where you&apos;ll sleep. Housing instability is one of
                  the most significant barriers to successful treatment.
                </p>
                <p>
                  Through our relationships with housing partners across Maryland, we can
                  help connect you with options that include recovery housing (sober living),
                  transitional housing, and other community resources — based on your
                  individual situation.
                </p>
                <p>
                  During your clinical assessment, we&apos;ll ask about your housing
                  situation and coordinate referrals as part of your overall treatment plan.
                  You don&apos;t need to figure this out alone.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 border border-stone-100">
                  <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" aria-hidden="true" />
                    Types of housing we can help with
                  </h3>
                  <ul className="space-y-3" role="list">
                    {[
                      { title: 'Recovery Housing (Sober Living)', desc: 'Structured, substance-free housing with peer support' },
                      { title: 'Transitional Housing', desc: 'Time-limited housing during active treatment' },
                      { title: 'Community Resources', desc: 'Connection to Maryland housing programs' },
                      { title: 'Emergency Housing Guidance', desc: 'Immediate options for people without stable shelter' },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                        <div>
                          <div className="text-sm font-medium text-stone-800">{item.title}</div>
                          <div className="text-xs text-stone-500">{item.desc}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary rounded-2xl p-6 text-white">
                  <p className="font-semibold mb-2">Need housing support?</p>
                  <p className="text-primary-100 text-sm mb-4">
                    Let us know in your intake form, or call us directly. We&apos;ll work
                    through options with you.
                  </p>
                  <a
                    href="tel:4109347976"
                    className="flex items-center gap-2 bg-white text-primary font-semibold px-5 py-3 rounded-xl text-sm hover:bg-primary-50 transition-colors"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    (410) 934-7976
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <div className="text-center">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
              >
                Start Intake — Tell Us Your Situation
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
