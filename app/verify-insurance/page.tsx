import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, Phone, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Verify Insurance Coverage',
  description:
    'Walkway to Healing accepts Maryland Medicaid. Call us or submit your information and we\'ll verify your substance use treatment benefits — no cost, no pressure.',
  alternates: { canonical: '/verify-insurance' },
}

const medicaidPlans = [
  'Maryland Medicaid (MCO Plans)',
  'Amerigroup Maryland',
  'CareFirst BlueCross BlueShield (Medicaid)',
  'Jai Medical Systems',
  'MedStar Family Choice',
  'Priority Partners',
  'UnitedHealthcare Community Plan',
  'University of Maryland Health Partners',
]

export default function VerifyInsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Insurance & Coverage"
        title="Insurance shouldn't stand between you and help."
        description="We accept Maryland Medicaid and can help you verify your benefits before your first visit — at no cost to you."
        backgroundImage="/images/sunrise-lake.jpg"
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <AnimatedSection direction="left">
              <div>
                <h2 className="font-display text-2xl font-bold text-stone-900 mb-5">
                  What we accept
                </h2>
                <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
                    <span className="font-bold text-primary-dark text-lg">Maryland Medicaid</span>
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed mb-4">
                    We are a Maryland Medicaid-enrolled provider. Maryland Medicaid
                    (HealthChoice) covers outpatient substance use treatment when
                    medically necessary, including IOP and PHP levels of care.
                  </p>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    If you have Maryland Medicaid, your treatment may be covered at
                    little or no cost to you. We&apos;ll verify your specific benefits
                    before your assessment.
                  </p>
                </div>

                <h3 className="font-semibold text-stone-900 mb-3">
                  Maryland Medicaid plans we work with:
                </h3>
                <ul className="space-y-2" role="list">
                  {medicaidPlans.map((plan) => (
                    <li key={plan} className="flex items-center gap-2.5 text-sm text-stone-700">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                      {plan}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <p className="text-stone-600 text-sm">
                    <strong>Don&apos;t have insurance?</strong> If you are uninsured or
                    unsure about your coverage, please still reach out. We can help
                    you explore options, including Maryland Medicaid enrollment.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div>
                <h2 className="font-display text-2xl font-bold text-stone-900 mb-5">
                  How to verify your coverage
                </h2>

                <StaggerContainer className="space-y-4 mb-8">
                  {[
                    {
                      step: '1',
                      title: 'Call or email us',
                      description: 'The easiest way — our staff can verify your Medicaid benefits directly in most cases during a quick phone call.',
                    },
                    {
                      step: '2',
                      title: 'Include it in your intake',
                      description: 'When you complete the prescreen intake form, mark that you\'d like help verifying your insurance. We\'ll follow up before your assessment.',
                    },
                    {
                      step: '3',
                      title: 'Call your insurance directly',
                      description: 'You can also call the member services number on your insurance card and ask if Walkway to Healing is an in-network provider for substance use treatment.',
                    },
                  ].map((item) => (
                    <StaggerItem key={item.step}>
                      <div className="flex gap-4 bg-white rounded-xl p-5 border border-stone-100">
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-stone-900 mb-1">{item.title}</h3>
                          <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                {/* CTA */}
                <div className="bg-primary rounded-2xl p-7 text-white">
                  <h3 className="font-display font-bold text-xl mb-2">
                    Ready to verify now?
                  </h3>
                  <p className="text-primary-100 text-sm mb-5">
                    Call us and we&apos;ll verify your benefits while we&apos;re on the phone.
                  </p>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center justify-center gap-2 w-full bg-white text-primary font-semibold py-3.5 rounded-xl hover:bg-primary-50 transition-colors mb-3"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {siteConfig.contact.phoneFormatted}
                  </a>
                  <Link
                    href="/intake"
                    className="flex items-center justify-center gap-2 w-full border-2 border-white/40 text-white font-semibold py-3.5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    Include it in my intake
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* FAQ */}
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-8 border border-stone-100">
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">
                Insurance questions answered
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    q: 'Does Medicaid cover all three levels of care?',
                    a: 'Maryland Medicaid covers Outpatient, Intensive Outpatient, and Partial Hospitalization when medically necessary. Our clinical team will document medical necessity during your assessment.',
                  },
                  {
                    q: 'What if I just got Medicaid?',
                    a: 'Recent Medicaid enrollment is fine. As long as your coverage is active, we can work with you. If there are any gaps, we\'ll help figure out next steps.',
                  },
                  {
                    q: 'Will my insurance company know I\'m seeking treatment?',
                    a: 'Your substance use treatment records are protected by federal law (42 CFR Part 2) and HIPAA. We only share information as required by your insurance for billing purposes.',
                  },
                  {
                    q: 'What if my insurance doesn\'t cover it?',
                    a: 'If you don\'t have coverage, we\'ll help you explore options. Many people qualify for Maryland Medicaid without realizing it. Reach out and we\'ll work through it with you.',
                  },
                ].map((faq) => (
                  <div key={faq.q}>
                    <h3 className="font-semibold text-stone-900 mb-2 text-sm">{faq.q}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
