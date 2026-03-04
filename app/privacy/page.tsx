import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Walkway to Healing Privacy Policy — how we collect, use, and protect your information.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  const lastUpdated = 'March 1, 2026'

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${lastUpdated}`}
        size="sm"
      />

      <section className="py-12 md:py-16 bg-cream">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white rounded-2xl border border-stone-100 p-8 prose prose-stone prose-sm max-w-none">
            <h2>1. Who We Are</h2>
            <p>
              Walkway to Healing LLC (&ldquo;Walkway to Healing,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is an
              outpatient substance use treatment center located at{' '}
              {siteConfig.contact.address.full}. We can be reached at{' '}
              {siteConfig.contact.phoneFormatted} or{' '}
              {siteConfig.contact.email}.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We collect information you provide when completing our online intake form,
              contacting us by phone or email, or otherwise interacting with our website.
              This includes:
            </p>
            <ul>
              <li>Contact information (name, phone, email, address)</li>
              <li>Health-related information provided in our intake form</li>
              <li>Insurance and billing information</li>
              <li>Usage data collected automatically (browser type, IP address, pages visited)</li>
            </ul>

            <h2>3. Federal Confidentiality Protections — 42 CFR Part 2</h2>
            <p>
              Information shared in connection with substance use treatment is protected under
              federal law, specifically <strong>42 CFR Part 2</strong> (Confidentiality of
              Substance Use Disorder Patient Records). We may not disclose your records to
              any person or entity, including family members, employers, law enforcement,
              or courts, without your written consent, except in very limited circumstances
              as permitted or required by law (such as a medical emergency or mandatory
              reporting requirements).
            </p>

            <h2>4. HIPAA</h2>
            <p>
              As a healthcare provider, we comply with the Health Insurance Portability and
              Accountability Act (HIPAA). We will provide you with a separate Notice of
              Privacy Practices prior to or at your first treatment visit.
            </p>

            <h2>5. How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul>
              <li>Respond to your inquiry and coordinate care</li>
              <li>Verify insurance benefits</li>
              <li>Schedule assessments and appointments</li>
              <li>Maintain clinical records as required by law</li>
              <li>Improve our website and services</li>
            </ul>
            <p>We do not sell, rent, or share your personal information for marketing purposes.</p>

            <h2>6. Data Security</h2>
            <p>
              We implement administrative, technical, and physical safeguards to protect
              your information. Intake form submissions are transmitted using industry-standard
              encryption (TLS/HTTPS) and stored in a secure, access-controlled database.
              Only authorized Walkway to Healing staff may access submitted intake records.
            </p>

            <h2>7. Cookies and Website Analytics</h2>
            <p>
              Our website may use cookies and similar technologies to understand how visitors
              use our site. We do not use tracking cookies for advertising. You may disable
              cookies in your browser settings, though some site features may not function
              as intended.
            </p>

            <h2>8. Third-Party Services</h2>
            <p>
              We use Supabase (a cloud database platform) to store intake submissions securely.
              All data is stored in the United States. Supabase complies with SOC 2 Type II
              and other security standards.
            </p>

            <h2>9. Your Rights</h2>
            <p>
              You have the right to access, correct, or request deletion of your information,
              subject to applicable legal and clinical recordkeeping requirements. To make a
              request, contact us at {siteConfig.contact.email} or{' '}
              {siteConfig.contact.phoneFormatted}.
            </p>

            <h2>10. Children&apos;s Privacy</h2>
            <p>
              Our services are intended for adults 18 and older. We do not knowingly collect
              information from minors without parental or guardian consent.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will post the updated
              policy on this page with a revised &ldquo;Last Updated&rdquo; date.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <address className="not-italic">
              <strong>Walkway to Healing LLC</strong><br />
              {siteConfig.contact.address.full}<br />
              Phone: {siteConfig.contact.phoneFormatted}<br />
              Email: {siteConfig.contact.email}
            </address>
          </div>
        </div>
      </section>
    </>
  )
}
