import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Users, Shield, Star } from 'lucide-react'
import { breadcrumbSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { StaggerContainer, StaggerItem, AnimatedSection } from '@/components/shared/AnimatedSection'

export const metadata: Metadata = {
  title: 'About Walkway to Healing',
  description:
    'Learn about Walkway to Healing, Maryland\'s compassionate outpatient substance use treatment center. Our team includes people in recovery who bring lived experience to every client relationship.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Walkway to Healing',
    description:
      "Maryland's compassionate outpatient substance use treatment center with staff who bring lived recovery experience.",
  },
}

const values = [
  {
    icon: Heart,
    title: 'Lived Experience',
    description:
      'Many of our staff members are in recovery themselves. We don\'t just understand addiction from a textbook — we\'ve lived it, and that changes everything about how we show up for our clients.',
  },
  {
    icon: Shield,
    title: 'Dignity First',
    description:
      'Every person who walks through our door is treated with the same respect and dignity we\'d want for ourselves or our families. Shame has no place in recovery.',
  },
  {
    icon: Users,
    title: 'Meeting You Where You Are',
    description:
      'We don\'t expect you to be ready for everything at once. We work with you at the pace that makes sense for your life, your responsibilities, and your goals.',
  },
  {
    icon: Star,
    title: 'Evidence-Based Care',
    description:
      'Our clinical approaches are grounded in research that works — motivational interviewing, cognitive behavioral therapy, and trauma-informed care — delivered by people who genuinely care.',
  },
]

const aboutLinks = [
  { label: 'Our Approach', href: '/about/approach', description: 'How we think about treatment and recovery' },
  { label: 'Meet the Team', href: '/about/team', description: 'The people behind Walkway to Healing' },
  { label: 'Testimonials', href: '/about/testimonials', description: 'Voices of people who have walked this path' },
  { label: 'Location & Hours', href: '/about/locations', description: 'How to find us and when we\'re here' },
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'About', href: '/about' }])) }} />
      <PageHero
        eyebrow="About Us"
        title="We built the center we wish had existed."
        description="Walkway to Healing was founded by people who understand — from the inside — what it takes to reach out for help, and how much it matters who answers."
        size="lg"
        backgroundImage="/images/forest-path.jpg"
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto">
          {/* Mission statement */}
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="font-display text-2xl md:text-3xl text-stone-800 leading-relaxed italic">
                &ldquo;Recovery isn&apos;t just about stopping — it&apos;s about
                building a life worth living. We&apos;re here to help you build it.&rdquo;
              </p>
              <p className="text-stone-500 mt-4 text-sm">
                — Walkway to Healing Clinical Team
              </p>
            </div>
          </AnimatedSection>

          {/* Story */}
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="font-display text-3xl font-bold text-stone-900 mb-5">
                  Why we exist
                </h2>
                <div className="space-y-4 text-stone-600 leading-relaxed">
                  <p>
                    Walkway to Healing was founded out of a belief that substance use
                    treatment should feel like walking into a place that actually
                    wants you to succeed — not a system that processes you.
                  </p>
                  <p>
                    Headquartered in South Baltimore, we serve people across Maryland.
                    We accept Maryland Medicaid because we believe cost should never be
                    a barrier to quality care.
                  </p>
                  <p>
                    Our team is made up of licensed clinicians, peer support specialists,
                    and administrative staff — many of whom have personal experience
                    with addiction and recovery. That lived experience shapes every
                    interaction we have.
                  </p>
                  <p>
                    We offer three levels of outpatient care and coordinate with trusted
                    housing partners because we understand that recovery happens in the
                    context of a whole life — not just in a treatment room.
                  </p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-lg">
                <Image
                  src="/images/walkway-conversation.jpg"
                  alt="A peer counselor walking and talking with a client in Maryland"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Values */}
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-stone-900 text-center mb-10">
              What guides everything we do
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid sm:grid-cols-2 gap-6 mb-20">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="bg-white rounded-2xl p-7 border border-stone-100 h-full">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                    <value.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-stone-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* About sub-pages */}
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-stone-900 text-center mb-8">
              Learn more about us
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid sm:grid-cols-2 gap-5 mb-16">
            {aboutLinks.map((link) => (
              <StaggerItem key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between bg-white rounded-xl p-6 border border-stone-100 hover:border-primary/20 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    <div className="font-semibold text-stone-900 group-hover:text-primary transition-colors">
                      {link.label}
                    </div>
                    <div className="text-stone-500 text-sm mt-0.5">{link.description}</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-stone-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-150 shrink-0 ml-4" aria-hidden="true" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* CTA */}
          <AnimatedSection>
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Ready to take the first step?
              </h2>
              <p className="text-primary-100 mb-8 max-w-lg mx-auto">
                Whether you call, email, or fill out the intake form — we&apos;ll be
                here when you&apos;re ready. No pressure, no judgment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/intake"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white text-primary font-semibold hover:bg-primary-50 transition-colors"
                >
                  Start Intake
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
