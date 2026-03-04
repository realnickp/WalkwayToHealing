import Image from 'next/image'
import { Quote } from 'lucide-react'
import { StaggerContainer, StaggerItem, AnimatedSection } from '@/components/shared/AnimatedSection'

const testimonials = [
  {
    quote:
      'I was terrified to call. I kept telling myself I wasn\'t bad enough to need help. The first person I spoke to just listened — no lecture, no judgment. That call changed everything.',
    attribution: 'Outpatient Program Graduate',
    program: 'Level 1 Outpatient',
    image: '/images/recovery-woman-strength.jpg',
  },
  {
    quote:
      'The IOP schedule worked around my job. I was able to keep working, come to treatment, and come home to my kids at night. I didn\'t think that kind of flexibility existed.',
    attribution: 'IOP Program Graduate',
    program: 'Level 2.1 IOP',
    image: '/images/recovery-man-hope.jpg',
  },
  {
    quote:
      'When I started PHP I was in rough shape. My counselor had been through it themselves — I could tell. They knew the difference between saying the right things and actually meaning them.',
    attribution: 'PHP Program Graduate',
    program: 'Level 2.5 PHP',
    image: '/images/recovery-php-portrait.jpg',
  },
]

export function TestimonialsSection() {
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Full background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-pathway.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary-900/90" />
      </div>

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto relative z-10">
        <AnimatedSection className="text-center mb-12">
          <p className="text-primary-200 text-sm font-semibold uppercase tracking-widest mb-3">
            Voices of Recovery
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 text-balance"
          >
            People just like you have found a way forward.
          </h2>
          <p className="text-primary-200 text-base max-w-xl mx-auto">
            These are composite stories representative of the experiences shared
            by people who have come through our doors.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <StaggerItem key={item.attribution}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 h-full flex flex-col">
                {/* Testimonial image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.program} recovery testimonial`}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent" />
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <Quote
                    className="h-7 w-7 text-accent mb-3 opacity-80 shrink-0"
                    aria-hidden="true"
                  />
                  <blockquote className="text-white leading-relaxed mb-6 flex-1 italic text-sm sm:text-base">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-primary-100 text-sm font-medium">
                      {item.attribution}
                    </p>
                    <p className="text-primary-300 text-xs mt-0.5">{item.program}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.2} className="text-center mt-12">
          <p className="text-primary-200 text-sm mb-6">
            Stories have been generalized to protect privacy. Recovery is possible.
          </p>
          <a
            href="/intake"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-primary-50 transition-colors duration-150 shadow-lg"
          >
            Your story can start today
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
