import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { siteConfig } from '@/config/site'

const programImages = [
  { src: '/images/program-outpatient.jpg', position: 'object-center' },
  { src: '/images/program-iop.jpg', position: 'object-center' },
  { src: '/images/program-php.jpg', position: 'object-center' },
  { src: '/images/program-housing.jpg', position: 'object-center' },
]

export function ProgramsOverview() {
  return (
    <section
      className="py-16 md:py-24 bg-white"
      aria-labelledby="programs-heading"
    >
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            Our Services
          </p>
          <h2
            id="programs-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4 text-balance"
          >
            Treatment that fits your life
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto leading-relaxed">
            We offer a full range of outpatient levels of care so you receive
            the right intensity of support — and can step up or down as your
            needs change.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {siteConfig.services.map((service, index) => (
            <StaggerItem key={service.id}>
              <Link
                href={service.href}
                className="group block bg-cream rounded-2xl overflow-hidden border border-stone-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full"
                aria-label={`Learn more about ${service.name}`}
              >
                {/* Program image */}
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  <Image
                    src={programImages[index]?.src || programImages[0].src}
                    alt={service.name}
                    fill
                    className={`object-cover group-hover:scale-105 transition-transform duration-500 ${programImages[index]?.position || 'object-center'}`}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-bold text-white bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">
                    {index < 3
                      ? `Level ${['1', '2.1', '2.5'][index]}`
                      : 'Support'}
                  </span>
                </div>

                <div className="p-7">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-xl font-bold text-stone-900 group-hover:text-primary transition-colors duration-150">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-stone-400 text-xs">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {service.hours}
                    </div>
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                    Learn More
                    <ArrowRight
                      className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-150"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.2} className="text-center mt-10">
          <p className="text-stone-500 text-sm mb-4">
            Not sure which level is right for you?
          </p>
          <Link
            href="/intake"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
          >
            Start the intake — we&apos;ll help you figure it out →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
