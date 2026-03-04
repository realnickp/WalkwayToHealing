import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Quote, ArrowRight } from 'lucide-react'
import { breadcrumbSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { StaggerContainer, StaggerItem, AnimatedSection } from '@/components/shared/AnimatedSection'

export const metadata: Metadata = {
  title: 'Testimonials | Walkway to Healing',
  description:
    'Hear from people who have gone through treatment at Walkway to Healing across Maryland. Recovery stories and perspectives.',
  alternates: { canonical: '/about/testimonials' },
}

const testimonials = [
  {
    quote: 'I was terrified to call. I kept telling myself I wasn\'t bad enough to need help. The first person I spoke to just listened — no lecture, no judgment. That call changed everything.',
    attribution: 'Outpatient Program Graduate',
    program: 'Level 1 Outpatient',
    theme: 'First call',
  },
  {
    quote: 'The IOP schedule worked around my job. I was able to keep working, come to treatment, and come home to my kids at night. I didn\'t think that kind of flexibility existed.',
    attribution: 'IOP Program Graduate',
    program: 'Level 2.1 IOP',
    theme: 'Flexibility',
  },
  {
    quote: 'When I started PHP I was in rough shape. My counselor had been through it themselves — I could tell. They knew the difference between saying the right things and actually meaning them.',
    attribution: 'PHP Program Graduate',
    program: 'Level 2.5 PHP',
    theme: 'Lived experience',
  },
  {
    quote: 'I was skeptical about group therapy. I\'d never been comfortable talking in groups. But something about the way it was facilitated made it feel safe. I actually looked forward to going.',
    attribution: 'IOP Program Graduate',
    program: 'Level 2.1 IOP',
    theme: 'Group therapy',
  },
  {
    quote: 'They helped me get my Medicaid sorted before I even started. I didn\'t have to figure that out on my own. That\'s not nothing — that\'s everything when you\'re already overwhelmed.',
    attribution: 'PHP Program Graduate',
    program: 'Level 2.5 PHP',
    theme: 'Insurance support',
  },
  {
    quote: 'I\'ve been clean for 14 months. I still think about how close I came to not making that call. If you\'re reading this and on the fence — just call.',
    attribution: 'Outpatient Program Graduate',
    program: 'Level 1 Outpatient',
    theme: 'Call to action',
  },
]

export default function TestimonialsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'About', href: '/about' }, { name: 'Testimonials', href: '/about/testimonials' }])) }} />
      <PageHero
        eyebrow="Voices of Recovery"
        title="People just like you have found a way forward."
        description="These composite stories represent the experiences shared by graduates of our programs. Details have been generalized to protect privacy."
        size="lg"
        backgroundImage="/images/ocean-peace.jpg"
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto">
          <AnimatedSection>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-12 text-center max-w-2xl mx-auto">
              <p className="text-amber-800 text-sm">
                These testimonials are composite stories that represent the types of experiences
                shared by our clients. They are not attributed to specific individuals to
                protect privacy. Recovery is deeply personal and outcomes vary.
              </p>
            </div>
          </AnimatedSection>

          {/* Nature image banner */}
          <AnimatedSection className="mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-[200px] sm:h-[260px]">
              <Image
                src="/images/sunrise-lake.jpg"
                alt="A calm lake at sunrise — peace and reflection"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-display text-lg sm:text-xl font-bold drop-shadow-lg">
                  Every recovery journey begins with one conversation.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {testimonials.map((t) => (
              <StaggerItem key={t.quote.slice(0, 30)}>
                <div className="bg-white rounded-2xl p-7 border border-stone-100 h-full flex flex-col hover:border-primary-100 hover:shadow-sm transition-all">
                  <Quote className="h-7 w-7 text-primary/20 mb-4 shrink-0" aria-hidden="true" />
                  <blockquote className="text-stone-700 leading-relaxed flex-1 italic text-sm">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="border-t border-stone-100 pt-4 mt-5">
                    <p className="text-stone-800 text-sm font-medium">{t.attribution}</p>
                    <p className="text-stone-400 text-xs mt-0.5">{t.program}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection>
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="font-display text-2xl font-bold mb-4">
                Your story can start today.
              </h2>
              <p className="text-primary-100 mb-8 max-w-lg mx-auto">
                Recovery doesn&apos;t look the same for everyone. But the first step —
                reaching out — is the same for all of us.
              </p>
              <Link
                href="/intake"
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-50 transition-colors"
              >
                Start Your Intake
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
