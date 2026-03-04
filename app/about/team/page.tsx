import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Award, Users } from 'lucide-react'
import { breadcrumbSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

export const metadata: Metadata = {
  title: 'Meet the Team | Walkway to Healing',
  description:
    'The clinical and support team at Walkway to Healing — people who bring both professional expertise and lived experience to substance use treatment in Baltimore, MD.',
  alternates: { canonical: '/about/team' },
}

export default function TeamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'About', href: '/about' }, { name: 'Team', href: '/about/team' }])) }} />
      <PageHero
        eyebrow="Our Team"
        title="People who understand — from the inside."
        description="Many of our staff members are in recovery themselves. That lived experience isn't just a credential — it changes every conversation we have with every person who walks through our door."
        size="lg"
        backgroundImage="/images/walkway-conversation.jpg"
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100 mb-16 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-4" aria-hidden="true" />
              <h2 className="font-display text-xl font-bold text-stone-900 mb-3">
                A note about our team
              </h2>
              <p className="text-stone-600 leading-relaxed max-w-2xl mx-auto">
                Out of respect for the privacy of both our staff and clients, we don&apos;t
                publish individual staff profiles online. What we can tell you is that
                our team includes licensed clinical social workers, counselors, peer support
                specialists, and administrative staff — many of whom have personal
                experience with addiction and recovery.
              </p>
              <p className="text-stone-600 leading-relaxed max-w-2xl mx-auto mt-4">
                When you come in, you&apos;ll meet your treatment team in person. That
                first conversation is the beginning of a real relationship — not a
                transaction.
              </p>
            </div>
          </AnimatedSection>

          {/* Nature image */}
          <AnimatedSection className="mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-[220px] sm:h-[260px]">
              <Image
                src="/images/forest-path.jpg"
                alt="A peaceful forest path with morning sunlight"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Award, title: 'Licensed Clinicians', desc: 'LCSWs, LCPCs, and CACs with specialized addiction training and ongoing supervision.' },
              { icon: Heart, title: 'Peer Support Specialists', desc: 'Staff with lived experience in recovery, certified to provide peer support services.' },
              { icon: Users, title: 'Case Management', desc: 'Dedicated staff to help connect you to housing, transportation, insurance, and community resources.' },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="bg-white rounded-2xl p-6 border border-stone-100 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="font-display font-bold text-lg text-stone-900 mb-2">{item.title}</h2>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection>
            <div className="text-center">
              <p className="text-stone-500 mb-6">
                The best way to get to know our team is to come in.
              </p>
              <Link
                href="/intake"
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
              >
                Start Your Intake
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
