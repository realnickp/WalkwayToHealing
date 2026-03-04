import Image from 'next/image'
import { Shield, Heart, Home, Users, CheckCircle } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

const trustItems = [
  {
    icon: Shield,
    title: 'Accepts Maryland Medicaid',
    description:
      'We work with Maryland Medicaid so cost isn\'t a barrier. Our team can help you verify your coverage before your first appointment.',
    color: 'bg-primary-50',
    iconColor: 'text-primary',
  },
  {
    icon: Heart,
    title: 'Trauma-Informed Care',
    description:
      'Our approach is rooted in dignity and respect. Many of our staff members are in recovery themselves — we understand from the inside out.',
    color: 'bg-accent-50',
    iconColor: 'text-accent',
  },
  {
    icon: Users,
    title: 'Multiple Levels of Care',
    description:
      'From Level 1 Outpatient to Partial Hospitalization, we offer a full continuum of care so you start at the right level and step down at the right pace.',
    color: 'bg-primary-50',
    iconColor: 'text-primary',
  },
  {
    icon: Home,
    title: 'Supportive Housing Connections',
    description:
      'Stable housing supports stable recovery. We connect clients with trusted housing partners across Maryland when that support is needed.',
    color: 'bg-accent-50',
    iconColor: 'text-accent',
  },
]

const stats = [
  { value: 'Medicaid', label: 'Accepted', sub: 'Maryland Medicaid welcome' },
  { value: '3', label: 'Levels of Care', sub: 'OP · IOP · PHP' },
  { value: 'Mon–Fri', label: 'Office Hours', sub: '9:00 AM – 5:00 PM' },
  { value: 'Baltimore', label: 'Location', sub: '1200 Light St, Floor 1' },
]

export function TrustSection() {
  return (
    <section
      className="py-16 md:py-24 bg-white"
      aria-labelledby="trust-heading"
    >
      <div className="container mx-auto">
        {/* Header with image */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">
          <AnimatedSection direction="left">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Why Families Choose Us
            </p>
            <h2
              id="trust-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4 text-balance"
            >
              Real support, real people, real recovery.
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed">
              We built Walkway to Healing to be the kind of place we wish had
              existed when we needed it most.
            </p>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/walkway-conversation.jpg"
                alt="A peer counselor walking and talking with a client on a sidewalk in Maryland"
                width={600}
                height={400}
                className="object-cover w-full h-[300px] sm:h-[360px]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent" />
            </div>
          </AnimatedSection>
        </div>

        {/* Trust cards */}
        <StaggerContainer className="grid sm:grid-cols-2 gap-6 mb-16">
          {trustItems.map((item) => (
            <StaggerItem key={item.title}>
              <div className="bg-cream rounded-2xl p-6 h-full border border-stone-100 hover:border-primary-100 transition-colors duration-200">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className={`h-6 w-6 ${item.iconColor}`} aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-lg text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-600 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stats bar */}
        <AnimatedSection>
          <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light rounded-2xl p-1">
            <div className="bg-primary rounded-xl">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center justify-center py-8 px-4 text-center"
                  >
                    <div className="font-display text-2xl md:text-3xl font-bold text-white mb-0.5">
                      {stat.value}
                    </div>
                    <div className="text-primary-100 text-sm font-medium">
                      {stat.label}
                    </div>
                    <div className="text-primary-200 text-xs mt-1">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Checklist with image */}
        <AnimatedSection delay={0.1} className="mt-14">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/journal-reflection.jpg"
                  alt="Hands writing in a journal with a cup of coffee — the quiet work of recovery"
                  width={480}
                  height={320}
                  className="object-cover w-full h-[260px]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </div>
            <div className="lg:col-span-3">
              <p className="text-stone-500 text-sm font-medium uppercase tracking-wider mb-6">
                What to expect when you reach out
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-left">
                {[
                  'A real person answers — no automated phone trees',
                  'No judgment, no lectures — just honest support',
                  'We confirm your insurance before your first visit',
                  'You choose how much to share at your own pace',
                  'Flexible scheduling around work and family',
                  'Connections to housing if you need it',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle
                      className="h-5 w-5 text-primary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-stone-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
