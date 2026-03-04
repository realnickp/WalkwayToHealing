import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Brain, Users, Shield, ArrowRight } from 'lucide-react'
import { breadcrumbSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { StaggerContainer, StaggerItem, AnimatedSection } from '@/components/shared/AnimatedSection'

export const metadata: Metadata = {
  title: 'Our Approach | Walkway to Healing',
  description:
    'Learn about the trauma-informed, evidence-based approach to substance use treatment at Walkway to Healing in Maryland.',
  alternates: { canonical: '/about/approach' },
}

const approaches = [
  {
    icon: Heart,
    title: 'Trauma-Informed Care',
    description:
      'We recognize that for many people, substance use is deeply connected to traumatic experiences. Our team is trained to provide care that acknowledges trauma without retraumatizing — creating a safe space where you can heal at your own pace.',
  },
  {
    icon: Brain,
    title: 'Motivational Interviewing',
    description:
      'We don\'t push or pressure. Motivational Interviewing helps our counselors meet you where you are — exploring your own reasons for change, at your own pace. It\'s a collaborative approach that honors your autonomy.',
  },
  {
    icon: Users,
    title: 'Cognitive Behavioral Therapy (CBT)',
    description:
      'CBT helps identify the thoughts, patterns, and situations that contribute to substance use — and build practical tools to change them. It\'s one of the most researched and effective approaches in addiction treatment.',
  },
  {
    icon: Shield,
    title: 'Relapse Prevention',
    description:
      'Recovery isn\'t linear. We equip you with specific, practical skills for managing cravings, navigating high-risk situations, and building a life that supports long-term stability — not just initial abstinence.',
  },
]

export default function ApproachPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'About', href: '/about' }, { name: 'Our Approach', href: '/about/approach' }])) }} />
      <PageHero
        eyebrow="Our Approach"
        title="Evidence-based care with a human heart."
        description="We believe in the science of recovery and the dignity of every person who walks through our door. Our clinical approach combines what the research shows works with genuine human connection."
        size="lg"
        backgroundImage="/images/sunrise-lake.jpg"
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="text-stone-600 text-lg leading-relaxed">
                Recovery is possible. Our role is to provide the right clinical tools,
                delivered with respect and authenticity, by people who understand from
                experience what it means to ask for help.
              </p>
            </div>
          </AnimatedSection>

          {/* Nature image break */}
          <AnimatedSection className="mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-[220px] sm:h-[280px]">
              <Image
                src="/images/zen-stones.jpg"
                alt="Stacked zen stones beside a calm stream"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-transparent" />
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6 mb-16">
            {approaches.map((approach) => (
              <StaggerItem key={approach.title}>
                <div className="bg-white rounded-2xl p-7 border border-stone-100 h-full hover:border-primary-100 hover:shadow-sm transition-all">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                    <approach.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="font-display font-bold text-xl text-stone-900 mb-3">
                    {approach.title}
                  </h2>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {approach.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection>
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="font-display text-2xl font-bold mb-4">
                Ready to experience this care firsthand?
              </h2>
              <p className="text-primary-100 mb-8 max-w-lg mx-auto">
                The first step is the hardest. We make everything after that as
                straightforward and supportive as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/intake" className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white text-primary font-semibold hover:bg-primary-50 transition-colors">
                  Start Intake
                  <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center h-12 px-8 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-primary transition-colors">
                  Talk to Us First
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
