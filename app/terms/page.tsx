import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Walkway to Healing Terms of Service.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated: March 1, 2026"
        size="sm"
      />

      <section className="py-12 md:py-16 bg-cream">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white rounded-2xl border border-stone-100 p-8 prose prose-stone prose-sm max-w-none">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using the Walkway to Healing website (walkwaytohealing.com),
              you agree to these Terms of Service. If you do not agree, please do not
              use our website.
            </p>

            <h2>2. Not a Medical Emergency Service</h2>
            <p>
              This website and the online intake form are <strong>not emergency services</strong>.
              They are not monitored continuously. If you or someone else is in immediate
              danger, call <strong>911</strong>. For mental health or substance use crises,
              call or text <strong>988</strong>.
            </p>

            <h2>3. No Provider-Patient Relationship</h2>
            <p>
              Use of this website or submission of an intake form does not establish a
              provider-patient relationship. A treatment relationship is only established
              upon completion of a clinical assessment and formal enrollment in our program.
            </p>

            <h2>4. Accuracy of Information</h2>
            <p>
              We strive to provide accurate, up-to-date information about our services,
              insurance acceptance, and hours of operation. However, we make no warranties
              regarding the completeness or accuracy of this information. Contact us
              directly to verify specifics before relying on any information presented here.
            </p>

            <h2>5. No Guarantee of Outcomes</h2>
            <p>
              Substance use recovery is a deeply individual process. We do not guarantee
              any specific outcome from participation in our programs. Our services are
              designed to provide evidence-based support; individual results vary.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              The content, design, and branding of this website are owned by Walkway to
              Healing LLC. You may not reproduce, distribute, or create derivative works
              without our written permission.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Walkway to Healing LLC is not liable
              for any indirect, incidental, or consequential damages arising from use of
              this website.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Maryland, without
              regard to conflict of law provisions.
            </p>

            <h2>9. Contact</h2>
            <address className="not-italic">
              <strong>Walkway to Healing LLC</strong><br />
              {siteConfig.contact.address.full}<br />
              {siteConfig.contact.phoneFormatted}<br />
              {siteConfig.contact.email}
            </address>
          </div>
        </div>
      </section>
    </>
  )
}
