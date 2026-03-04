import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Clock, Phone, Mail, Bus } from 'lucide-react'
import { breadcrumbSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Location & Hours | Walkway to Healing Maryland',
  description:
    'Serving communities across Maryland. Walkway to Healing is located at 1200 Light St, Floor 1, Baltimore, MD 21230. Office hours Monday–Friday 9 AM–5 PM. Easy access from public transit.',
  alternates: { canonical: '/about/locations' },
}

export default function LocationsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'About', href: '/about' }, { name: 'Location & Hours', href: '/about/locations' }])) }} />
      <PageHero
        eyebrow="Location & Hours"
        title="Come see us in Maryland."
        description="Serving communities across Maryland. Our office is on Light Street in South Baltimore, with easy access by car, bus, and bike."
        backgroundImage="/images/baltimore-skyline.jpg"
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection direction="left">
              <div className="space-y-6">
                {/* Address */}
                <div className="bg-white rounded-2xl p-6 border border-stone-100">
                  <h2 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                    Address
                  </h2>
                  <address className="not-italic text-stone-700">
                    <p className="font-medium">{siteConfig.name}</p>
                    <p>{siteConfig.contact.address.street}</p>
                    <p>{siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}</p>
                  </address>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-3 hover:text-primary-dark transition-colors"
                  >
                    Open in Google Maps →
                  </a>
                </div>

                {/* Hours */}
                <div className="bg-white rounded-2xl p-6 border border-stone-100">
                  <h2 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                    Office Hours
                  </h2>
                  <div className="space-y-2">
                    {siteConfig.hours.formatted.map((h) => (
                      <div key={h.days} className="flex justify-between items-center text-sm">
                        <span className="font-medium text-stone-800">{h.days}</span>
                        <span className="text-stone-500">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-amber-800 text-xs">
                      <strong>Not an emergency line.</strong> Outside business hours, call or
                      text 988 for crisis support, or 911 for emergencies.
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-white rounded-2xl p-6 border border-stone-100">
                  <h2 className="font-semibold text-stone-900 mb-4">Contact</h2>
                  <div className="space-y-3">
                    <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-3 text-sm text-stone-700 hover:text-primary transition-colors group">
                      <Phone className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                      {siteConfig.contact.phoneFormatted}
                    </a>
                    <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 text-sm text-stone-700 hover:text-primary transition-colors">
                      <Mail className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Transit */}
                <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                  <h2 className="font-semibold text-primary-dark mb-3 flex items-center gap-2">
                    <Bus className="h-4 w-4" aria-hidden="true" />
                    Getting Here
                  </h2>
                  <p className="text-stone-600 text-sm leading-relaxed mb-3">
                    Our office is accessible by MTA bus routes along Light Street. Parking
                    is available on surrounding streets. If transportation is a barrier to
                    care, please let us know — we can help connect you with options.
                  </p>
                  <Link href="/intake" className="text-primary font-semibold text-sm hover:text-primary-dark transition-colors">
                    Need transportation support? Tell us in your intake →
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <div className="rounded-2xl overflow-hidden border border-stone-100 shadow-sm bg-white" style={{ height: '500px' }}>
                <iframe
                  title="Walkway to Healing location"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3088!2d-76.618!3d39.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1200+Light+St%2C+Baltimore%2C+MD+21230!5e0!3m2!1sen!2sus!4v1`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
