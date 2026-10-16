import type { Metadata } from 'next'
import { HeartHandshake, Users, MapPin, CheckCircle } from 'lucide-react'
import { breadcrumbSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { ApplicationForm } from '@/components/careers/ApplicationForm'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Careers: Addiction Counselor Jobs in Baltimore',
  description:
    'Join the Walkway to Healing team in Baltimore, MD. We are hiring addiction counselors for our outpatient substance use treatment programs. Apply online today.',
  alternates: { canonical: '/careers' },
  openGraph: {
    title: 'Careers at Walkway to Healing',
    description:
      'We are hiring addiction counselors in Baltimore, MD. Help people build lasting recovery — apply online.',
  },
}

const reasons = [
  {
    icon: HeartHandshake,
    title: 'Meaningful work',
    body: 'Walk alongside people at one of the most important moments of their lives and see recovery happen.',
  },
  {
    icon: Users,
    title: 'A supportive team',
    body: 'Work with a close-knit clinical team that shares the load and cares about each other as much as our clients.',
  },
  {
    icon: MapPin,
    title: 'Rooted in Baltimore',
    body: `Serve our community from our location at ${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}.`,
  },
]

const counselorDuties = [
  'Provide individual and group counseling across Level 1 Outpatient, Level 2.1 IOP, and Level 2.5 PHP',
  'Complete assessments, treatment plans, and progress notes',
  'Coordinate care with case management and outside providers',
  'Build trusting, nonjudgmental relationships with clients and families',
]

const counselorQualifications = [
  'Maryland counseling credential or license (LCADC, LGADC, CAC-AD, CSC-AD, LCPC, LCSW-C, or similar)',
  'Experience in substance use disorder treatment preferred',
  'Strong documentation and communication skills',
  'A genuine belief that recovery is possible for everyone',
]

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Careers', href: '/careers' }])) }}
      />
      <PageHero
        eyebrow="Careers"
        title="Help people find their walkway to healing."
        description="We're growing and hiring counselors who want to make a real difference in Baltimore."
        backgroundImage="/images/walkway-conversation.jpg"
      />

      {/* Why work here */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {reasons.map(({ icon: Icon, title, body }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div className="h-full p-6 rounded-2xl bg-cream border border-stone-100">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-lg font-bold text-stone-900 mb-2">{title}</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">{body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Open position + application */}
      <section id="apply" className="py-16 md:py-24 bg-cream scroll-mt-24">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection direction="left">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary-50 rounded-full px-3 py-1 mb-4">
                  Now Hiring
                </span>
                <h2 className="font-display text-3xl font-bold text-stone-900 mb-3">
                  Addiction Counselor
                </h2>
                <p className="text-stone-500 text-sm mb-6">
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.state} · Outpatient
                </p>
                <p className="text-stone-700 leading-relaxed mb-8">
                  We&apos;re looking for compassionate counselors to join our outpatient
                  substance use treatment team. You&apos;ll help adults in recovery build the
                  skills, support, and confidence they need to move forward.
                </p>

                <h3 className="font-semibold text-stone-900 mb-3">What you&apos;ll do</h3>
                <ul className="space-y-2.5 mb-8" role="list">
                  {counselorDuties.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="font-semibold text-stone-900 mb-3">What we&apos;re looking for</h3>
                <ul className="space-y-2.5 mb-8" role="list">
                  {counselorQualifications.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="p-5 bg-white rounded-xl border border-stone-100">
                  <p className="text-stone-600 text-sm leading-relaxed">
                    <strong className="text-stone-800">Don&apos;t see the right role?</strong>{' '}
                    We&apos;re always glad to hear from people who share our mission. Choose
                    &ldquo;Other / General Application&rdquo; in the form and tell us about yourself.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <ApplicationForm />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
