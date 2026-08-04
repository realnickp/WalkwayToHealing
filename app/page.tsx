import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { AwardSection } from '@/components/home/AwardSection'
import { TrustSection } from '@/components/home/TrustSection'
import { ProgramsOverview } from '@/components/home/ProgramsOverview'
import { WhatHappensNext } from '@/components/home/WhatHappensNext'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { FAQSection } from '@/components/home/FAQSection'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: `${siteConfig.name} | Outpatient Substance Use Treatment Maryland`,
  description:
    'Compassionate outpatient substance use treatment serving communities across Maryland. Accepting Maryland Medicaid. Level 1 Outpatient, IOP, and Partial Hospitalization. Real people, real recovery.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Walkway to Healing | Outpatient Substance Use Treatment in Maryland',
    description:
      'Compassionate outpatient substance use treatment serving communities across Maryland. Accepting Maryland Medicaid. Level 1 Outpatient, IOP, and Partial Hospitalization. Real people, real recovery.',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="relative z-10">
        <AwardSection />
        <TrustSection />
        <ProgramsOverview />
        <WhatHappensNext />
        <TestimonialsSection />
        <FAQSection />
      </div>
    </>
  )
}
