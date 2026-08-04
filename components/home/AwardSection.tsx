import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { SectionDivider } from '@/components/shared/SectionDivider'
import { googleRating, googleReviewsUrl } from '@/config/reviews'

export function AwardSection() {
  return (
    <section className="py-16 md:py-24 bg-cream" aria-labelledby="award-heading">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <AnimatedSection className="text-center lg:text-left order-2 lg:order-1">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
              Proud to Share
            </p>
            <h2
              id="award-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-5 text-balance"
            >
              Ranked #1 Addiction Treatment Center in Baltimore
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0">
              Walkway to Healing was named the #1 addiction treatment center in
              Baltimore in the June 2026 BusinessRate Awards — a recognition
              earned not by application or nomination, but by the authentic
              feedback of our clients on Google Reviews.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
              Recognized for excellence in patient care and community trust.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <span role="img" aria-label={`${googleRating.value} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-amber-400 inline-block"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                ))}
              </span>
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 text-sm underline underline-offset-4 hover:text-primary transition-colors"
              >
                {googleRating.value} rating &middot; {googleRating.count} Google reviews
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-700 transition-colors duration-150 shadow-lg"
              >
                Start Your Walkway
              </Link>
              <a
                href="tel:4109347976"
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl border-2 border-stone-200 text-stone-700 font-semibold text-sm hover:border-primary hover:text-primary transition-colors duration-150"
              >
                Call (410) 934-7976
              </a>
            </div>
          </AnimatedSection>

          {/* Award graphic */}
          <AnimatedSection delay={0.15} className="order-1 lg:order-2">
            <div className="relative aspect-[3/4] max-w-sm sm:max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-stone-200">
              <Image
                src="/images/ranked-1-baltimore-2026.png"
                alt="Ranked #1 Addiction Treatment Center in Baltimore — June 2026 BusinessRate Award, powered by Google Reviews"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 448px, (min-width: 640px) 448px, 90vw"
              />
            </div>
          </AnimatedSection>
        </div>

        <SectionDivider className="mt-16 md:mt-20" />
      </div>
    </section>
  )
}
