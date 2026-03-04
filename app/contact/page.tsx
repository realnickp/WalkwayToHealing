import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, AlertTriangle } from 'lucide-react'
import { breadcrumbSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Walkway to Healing in Maryland. Call (410) 934-7976, email us, or start your intake online. Office hours Monday–Friday 9 AM–5 PM.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Walkway to Healing',
    description:
      'Get in touch — call (410) 934-7976, email us, or start your intake online. Serving communities across Maryland.',
  },
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Contact', href: '/contact' }])) }} />
      <PageHero
        eyebrow="Get in Touch"
        title="We're here when you're ready."
        description="Whether you have a question, want to verify your insurance, or are ready to start — reach out. A real person will respond."
        backgroundImage="/images/new-growth.jpg"
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <AnimatedSection direction="left">
              <div>
                <h2 className="font-display text-2xl font-bold text-stone-900 mb-8">
                  Reach Out Directly
                </h2>

                <div className="space-y-6 mb-10">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-start gap-4 p-5 bg-white rounded-xl border border-stone-100 hover:border-primary/20 hover:shadow-sm transition-all group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs text-stone-500 uppercase tracking-wider mb-0.5">Call or Text</div>
                      <div className="font-semibold text-stone-900 group-hover:text-primary transition-colors">
                        {siteConfig.contact.phoneFormatted}
                      </div>
                      <div className="text-sm text-stone-500 mt-0.5">
                        Mon–Fri, 9:00 AM – 5:00 PM
                      </div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-start gap-4 p-5 bg-white rounded-xl border border-stone-100 hover:border-primary/20 hover:shadow-sm transition-all group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs text-stone-500 uppercase tracking-wider mb-0.5">Email Us</div>
                      <div className="font-semibold text-stone-900 group-hover:text-primary transition-colors">
                        {siteConfig.contact.email}
                      </div>
                      <div className="text-sm text-stone-500 mt-0.5">
                        We respond within one business day
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-stone-100">
                    <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs text-stone-500 uppercase tracking-wider mb-0.5">Our Location</div>
                      <address className="font-semibold text-stone-900 not-italic">
                        {siteConfig.contact.address.street}<br />
                        {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{' '}
                        {siteConfig.contact.address.zip}
                      </address>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-primary-dark mt-1 inline-block"
                      >
                        Get directions →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-stone-100">
                    <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs text-stone-500 uppercase tracking-wider mb-0.5">Office Hours</div>
                      {siteConfig.hours.formatted.map((h) => (
                        <div key={h.days} className="flex gap-3 text-sm mt-1">
                          <span className="font-medium text-stone-900 min-w-[120px]">{h.days}</span>
                          <span className="text-stone-500">{h.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Insurance */}
                <div className="bg-primary-50 rounded-xl p-5 border border-primary-100">
                  <h3 className="font-semibold text-primary-dark mb-2">
                    We Accept Maryland Medicaid
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Not sure if you qualify or what your coverage includes? We can help
                    you verify your insurance — just let us know when you reach out.
                  </p>
                  <Link
                    href="/verify-insurance"
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-3 hover:text-primary-dark transition-colors"
                  >
                    Verify your coverage →
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Emergency disclaimer + intake CTA */}
            <AnimatedSection direction="right" delay={0.15}>
              <div className="space-y-6">
                {/* Crisis notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-1">
                        Not for emergencies
                      </h3>
                      <p className="text-amber-800 text-sm leading-relaxed">
                        This phone line and this website are not crisis or emergency
                        services. If you are in immediate danger, call{' '}
                        <strong>911</strong>. If you are in mental health crisis, call
                        or text <strong>988</strong> (Suicide &amp; Crisis Lifeline),
                        available 24 hours a day.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Intake CTA card */}
                <div className="bg-primary rounded-2xl p-8 text-white">
                  <h2 className="font-display text-2xl font-bold mb-3">
                    Ready to start?
                  </h2>
                  <p className="text-primary-100 mb-6 leading-relaxed">
                    Our online intake takes 5–7 minutes and lets our clinical team
                    prepare for your call. You can also complete it at your own pace
                    and we&apos;ll reach out at a time that works for you.
                  </p>
                  <Link
                    href="/intake"
                    className="block w-full text-center bg-white text-primary font-semibold py-3.5 rounded-xl hover:bg-primary-50 transition-colors"
                  >
                    Start Intake — Takes About 5 Minutes
                  </Link>
                  <Link
                    href="/verify-insurance"
                    className="block w-full text-center border-2 border-white/40 text-white font-semibold py-3.5 rounded-xl hover:bg-white/10 transition-colors mt-3"
                  >
                    Verify Your Insurance First
                  </Link>
                </div>

                {/* Map placeholder */}
                <div className="bg-white rounded-xl border border-stone-100 overflow-hidden aspect-video">
                  <iframe
                    title="Walkway to Healing location map"
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3088.012!2d-76.6180!3d39.2800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1200+Light+St%2C+Baltimore%2C+MD+21230!5e0!3m2!1sen!2sus!4v1`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
