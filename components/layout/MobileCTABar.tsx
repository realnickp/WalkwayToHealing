'use client'

import Link from 'next/link'
import { Phone, ClipboardList } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function MobileCTABar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      role="complementary"
      aria-label="Quick action bar"
    >
      {/* Safe area for iPhones */}
      <div className="bg-white border-t border-stone-200 shadow-2xl pb-safe">
        <div className="grid grid-cols-2 gap-px bg-stone-200">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex flex-col items-center justify-center gap-1 bg-primary text-white py-3.5 px-4 min-h-[60px] hover:bg-primary-dark transition-colors duration-150 active:scale-95"
            aria-label={`Call us at ${siteConfig.contact.phoneFormatted}`}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-semibold">Call Now</span>
          </a>
          <Link
            href="/intake"
            className="flex flex-col items-center justify-center gap-1 bg-accent text-white py-3.5 px-4 min-h-[60px] hover:bg-accent-dark transition-colors duration-150 active:scale-95"
            aria-label="Start intake form"
          >
            <ClipboardList className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-semibold">Start Intake</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
