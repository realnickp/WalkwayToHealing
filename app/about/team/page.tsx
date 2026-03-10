import type { Metadata } from 'next'
import { breadcrumbSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import TeamContent from '@/components/team/TeamContent'

export const metadata: Metadata = {
  title: 'Meet the Team | Walkway to Healing',
  description:
    'Meet the people behind Walkway to Healing — clinicians, counselors, and peer support specialists bringing both professional expertise and lived recovery experience to substance use treatment across Maryland.',
  alternates: { canonical: '/about/team' },
}

export default function TeamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'About', href: '/about' }, { name: 'Team', href: '/about/team' }])) }} />
      <PageHero
        eyebrow="Our Team"
        title="Real people. Real recovery. Real care."
        description="At Walkway to Healing, many of our staff have walked the same road our clients are on now. That lived experience isn't just a credential — it's the foundation of everything we do."
        size="lg"
        backgroundImage="/images/walkway-conversation.jpg"
      />
      <TeamContent />
    </>
  )
}
