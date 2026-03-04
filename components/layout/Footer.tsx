import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { siteConfig } from '@/config/site'

const footerLinks = {
  Programs: [
    { label: 'Level 1 Outpatient', href: '/programs/outpatient' },
    { label: 'Level 2.1 Intensive Outpatient', href: '/programs/intensive-outpatient' },
    { label: 'Level 2.5 Partial Hospitalization', href: '/programs/partial-hospitalization' },
    { label: 'Supportive Housing', href: '/programs/supportive-housing' },
  ],
  'Get Help': [
    { label: 'Start Intake', href: '/intake' },
    { label: 'Verify Insurance', href: '/verify-insurance' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Staff Portal', href: '/dashboard/login' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="bg-stone-900 text-stone-300"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Crisis Bar */}
      <div className="bg-primary-dark py-4 px-4">
        <div className="container mx-auto text-center">
          <p className="text-white text-sm">
            <strong>This is not an emergency or crisis line.</strong>{' '}
            If you or someone you know is in immediate danger, call{' '}
            <a
              href="tel:911"
              className="font-bold underline hover:text-accent-100 transition-colors"
            >
              911
            </a>
            . For mental health crises, call or text{' '}
            <a
              href="tel:988"
              className="font-bold underline hover:text-accent-100 transition-colors"
            >
              988
            </a>{' '}
            (Suicide &amp; Crisis Lifeline), available 24/7.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 w-fit" aria-label="Walkway to Healing home">
              <div className="relative h-12 w-12 bg-white rounded-xl p-1.5">
                <Image
                  src="/logo.png"
                  alt="Walkway to Healing logo"
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg leading-tight">
                  Walkway to Healing
                </div>
                <div className="text-xs text-stone-400 font-medium">
                  Outpatient Substance Use Treatment
                </div>
              </div>
            </Link>

            <p className="text-sm text-stone-400 leading-relaxed mb-6 max-w-sm">
              Compassionate, evidence-based outpatient substance use treatment
              serving communities across Maryland. Accepting Maryland Medicaid.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2.5 text-sm text-stone-300 hover:text-white transition-colors group"
                aria-label={`Call us at ${siteConfig.contact.phoneFormatted}`}
              >
                <Phone className="h-4 w-4 text-primary-light group-hover:text-primary-light shrink-0" aria-hidden="true" />
                {siteConfig.contact.phoneFormatted}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 text-sm text-stone-300 hover:text-white transition-colors group"
              >
                <Mail className="h-4 w-4 text-primary-light shrink-0" aria-hidden="true" />
                {siteConfig.contact.email}
              </a>
              <address className="flex items-start gap-2.5 text-sm text-stone-400 not-italic">
                <MapPin className="h-4 w-4 text-primary-light mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  {siteConfig.contact.address.street}<br />
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{' '}
                  {siteConfig.contact.address.zip}
                </span>
              </address>
              <div className="flex items-center gap-2.5 text-sm text-stone-400">
                <Clock className="h-4 w-4 text-primary-light shrink-0" aria-hidden="true" />
                <span>Mon–Fri: 9:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-stone-500">
              © {currentYear} Walkway to Healing LLC. All rights reserved.
            </p>
            <p className="text-xs text-stone-600 text-center sm:text-right max-w-md">
              Confidentiality Notice: Information shared through this website is
              protected under applicable federal and state privacy laws, including
              42 CFR Part 2 and HIPAA.
            </p>
          </div>
          <p className="mt-4 text-xs text-stone-600 text-center">
            Walkway to Healing accepts Maryland Medicaid. Recovery is possible — you
            deserve support. Accredited outpatient treatment serving communities
            across Maryland.
          </p>
        </div>
      </div>
    </footer>
  )
}
