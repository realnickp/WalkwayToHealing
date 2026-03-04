import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Walkway to Healing Accessibility Statement — our commitment to making this website usable by everyone.',
  alternates: { canonical: '/accessibility' },
}

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="Accessibility Statement"
        description="Our commitment to making care accessible to everyone — online and in person."
        size="sm"
      />

      <section className="py-12 md:py-16 bg-cream">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white rounded-2xl border border-stone-100 p-8 prose prose-stone prose-sm max-w-none">
            <h2>Our Commitment</h2>
            <p>
              Walkway to Healing is committed to ensuring digital accessibility for
              people of all abilities. We continually work to improve the user experience
              for everyone and apply relevant accessibility standards.
            </p>

            <h2>Standards We Target</h2>
            <p>
              We aim to conform to the{' '}
              <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
              These guidelines help make web content accessible to people with visual,
              auditory, motor, and cognitive disabilities.
            </p>

            <h2>What We&apos;ve Done</h2>
            <ul>
              <li>Semantic HTML with proper heading hierarchy</li>
              <li>ARIA labels on interactive elements and form fields</li>
              <li>Keyboard navigation support throughout the site</li>
              <li>Sufficient color contrast ratios for text</li>
              <li>Focus indicators on all interactive elements</li>
              <li>Responsive design that works at all screen sizes</li>
              <li>Alt text on all meaningful images</li>
              <li>Video with accessible controls (not auto-playing)</li>
              <li>Respects prefers-reduced-motion for animations</li>
              <li>Large touch targets on mobile (minimum 44×44px)</li>
            </ul>

            <h2>Known Limitations</h2>
            <p>
              While we strive for full accessibility, some areas may not yet meet all
              standards. We are actively working to improve these. If you encounter a
              barrier, please let us know.
            </p>

            <h2>In-Person Accessibility</h2>
            <p>
              Our office at 1200 Light St, Floor 1, Baltimore, MD 21230 is accessible.
              If you have specific accessibility needs — including hearing impairment,
              vision impairment, mobility needs, or language/interpreter needs — please
              let us know when you complete your intake or call us at{' '}
              {siteConfig.contact.phoneFormatted}. We will make reasonable accommodations.
            </p>

            <h2>Feedback</h2>
            <p>
              If you experience any accessibility barriers on our website, please contact us:
            </p>
            <ul>
              <li>Email: {siteConfig.contact.email}</li>
              <li>Phone: {siteConfig.contact.phoneFormatted}</li>
            </ul>
            <p>
              We take all accessibility feedback seriously and aim to respond within
              3 business days.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
