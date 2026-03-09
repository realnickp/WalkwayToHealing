import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { breadcrumbSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection'

export const metadata: Metadata = {
  title: 'Meet the Team | Walkway to Healing',
  description:
    'Meet the people behind Walkway to Healing — clinicians, counselors, and peer support specialists bringing both professional expertise and lived recovery experience to substance use treatment across Maryland.',
  alternates: { canonical: '/about/team' },
}

interface TeamMember {
  name: string
  title: string
  image: string
  bio?: string
  quote?: string
}

const leadership: TeamMember[] = [
  {
    name: 'Troy Pritt',
    title: 'Chief Executive Officer',
    image: '/images/team/troy-pritt.jpg',
    bio: 'Troy founded Walkway to Healing after discovering his calling while living in a recovery house, where a housing director saw something in him and gave him the chance to become a house manager. That opportunity sparked a career built on the belief that everyone deserves to be treated like a human being and heard. In recovery himself since May 2020, Troy leads with the understanding that compassion and organization are what separate great treatment from the rest.',
    quote: 'Give it a chance. The drugs ain\u2019t going anywhere, but your life is.',
  },
  {
    name: 'Hannah Bukovsky',
    title: 'Executive Director',
    image: '/images/team/hannah-bukovsky.png',
    bio: 'Hannah oversees the daily operations of Walkway to Healing with nearly three years of personal recovery guiding her leadership. After getting clean, she chose to do something entirely different with her life \u2014 and everything fell into place. She brings firsthand understanding of what it means to walk through the door at rock bottom, and channels that experience into building an environment where every client feels supported, respected, and never judged.',
    quote: 'Rock bottom can be the solid foundation you rebuild your life on.',
  },
  {
    name: 'Marva Williams',
    title: 'Director of Admissions',
    image: '/images/team/marva-williams.jpg',
  },
  {
    name: 'Tyler May-Holzman',
    title: 'Director of Business & Marketing',
    image: '/images/team/tyler-may-holzman.jpg',
    bio: 'Tyler grew up surrounded by addiction. He watched his father build a towing business during a period of stability, then saw everything unravel after a relapse. As a teenager, Tyler and his brother stepped into survival mode, working to provide for themselves during some of the hardest years of their lives. Those experiences gave him a deep understanding of what addiction does to families \u2014 especially children \u2014 and shaped the empathy he brings to every patient interaction today.',
    quote: 'Being scared is normal \u2014 but staying stuck is harder. You don\u2019t have to have it all figured out.',
  },
]

const staff: TeamMember[] = [
  {
    name: 'Frederick Kingery',
    title: 'Clinical Coordinator',
    image: '/images/team/frederick-kingery.jpg',
    bio: 'Frederick brings 11 years of sobriety and deep personal understanding to his role. A friend introduced him to Walkway to Healing, and he quickly realized that helping others stay sober was also helping him stay sober and be a better person. Having been through treatment programs himself, he knows what it\u2019s like to walk in carrying the weight of mistakes and trying to reset your life.',
    quote: 'Just for today, try something different. Make that first step. You can always go back, but there is a better way.',
  },
  {
    name: 'Dawanda Boardley',
    title: 'Counselor',
    image: '/images/team/dawanda-boardley.jpg',
    bio: 'Dawanda began her career as a nurse before realizing she wanted to do more than treat symptoms \u2014 she wanted to help people heal at the root. She returned to school to become a mental health and substance abuse counselor, expanding her ability to support individuals physically, mentally, and emotionally. The tragic loss of a close friend to an overdose and watching her father, a retired veteran, navigate 25+ years of recovery from PTSD taught her that every person\u2019s journey is unique and deserving of respect.',
    quote: 'Taking the first step toward recovery is an act of courage and self-love.',
  },
  {
    name: 'Casey Marshall',
    title: 'Counselor',
    image: '/images/team/casey-marshall.jpg',
    bio: 'Casey walks alongside people as they work through the ups and downs of recovery, leading groups, meeting with clients one-on-one, and creating spaces for honest conversation. His own understanding of recovery shapes how he shows up \u2014 he knows how important it is to feel understood instead of judged. He focuses on helping people build practical coping skills and recognize that their story is more than their addiction.',
    quote: 'Recovery isn\u2019t about becoming a different person; it\u2019s about remembering who you are underneath the struggle and choosing, day by day, to give that person a chance to live.',
  },
  {
    name: 'Rachel Cornelio',
    title: 'Counselor',
    image: '/images/team/rachel-cornelio.jpg',
  },
  {
    name: 'Ellie Evans',
    title: 'Outreach Specialist',
    image: '/images/team/ellie-evans.jpg',
    bio: 'Ellie got into recovery work because she understands what it means to be at the end of the line with no support system left. For years she struggled with addiction herself, cycling in and out of treatment facilities during times when it felt like people had given up on her. That experience fuels her belief that compassion, patience, and understanding are the foundations of recovery \u2014 and that witnessing someone grow and regain confidence is the most rewarding work there is.',
    quote: 'Sometimes things have to fall apart so better things can come together.',
  },
  {
    name: 'John Schelor',
    title: 'Peer Resource Coordinator',
    image: '/images/team/john-schelor.jpg',
    bio: 'John\u2019s path to recovery work is deeply personal \u2014 he lost both parents to addiction, and that pain changed the course of his life. Nearly three years clean himself, he turned his story into a mission to help others. He understands the struggle, the fear, and the shame that come with addiction, but he also knows the power of second chances. At Walkway to Healing, he meets people where they are with compassion instead of judgment.',
    quote: 'You don\u2019t have to be ready, you just have to be willing. That fear means you still care about your life.',
  },
  {
    name: 'Dillon Mastales',
    title: 'Administrative Assistant',
    image: '/images/team/dillon-mastales.jpg',
  },
]

function TeamCard({ member, featured }: { member: TeamMember; featured?: boolean }) {
  const hasContent = member.bio || member.quote

  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm h-full flex flex-col ${featured ? '' : ''}`}>
      <div className={`relative ${featured ? 'h-72 sm:h-80' : 'h-60 sm:h-72'} overflow-hidden`}>
        <Image
          src={member.image}
          alt={`${member.name}, ${member.title} at Walkway to Healing`}
          fill
          className="object-cover object-top"
          sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-xl font-bold text-white">{member.name}</h3>
          <p className="text-white/80 text-sm font-medium">{member.title}</p>
        </div>
      </div>

      {hasContent && (
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          {member.bio && (
            <p className="text-stone-600 text-sm leading-relaxed">{member.bio}</p>
          )}
          {member.quote && (
            <blockquote className="mt-auto pt-5 border-t border-stone-100">
              <p className="text-primary font-medium text-sm italic leading-relaxed">
                &ldquo;{member.quote}&rdquo;
              </p>
            </blockquote>
          )}
        </div>
      )}
    </div>
  )
}

export default function TeamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'About', href: '/about' }, { name: 'Team', href: '/about/team' }])) }} />
      <PageHero
        eyebrow="Our Team"
        title="People who understand — from the inside."
        description="Many of our staff members are in recovery themselves. That lived experience changes every conversation we have with every person who walks through our door."
        size="lg"
        backgroundImage="/images/walkway-conversation.jpg"
      />

      {/* Leadership */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto max-w-6xl px-4">
          <AnimatedSection className="text-center mb-12">
            <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-2">Leadership</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
              Guided by experience, driven by purpose
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-6 mb-8">
            {leadership.slice(0, 2).map((member) => (
              <StaggerItem key={member.name}>
                <TeamCard member={member} featured />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {leadership.slice(2).map((member) => (
              <StaggerItem key={member.name}>
                <TeamCard member={member} featured />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Clinical & Support Staff */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <AnimatedSection className="text-center mb-12">
            <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-2">Clinical &amp; Support Staff</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
              The people who walk beside you
            </h2>
            <p className="text-stone-500 mt-3 max-w-2xl mx-auto">
              Counselors, coordinators, and support staff who bring compassion, expertise, and often their own lived experience to your recovery journey.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <StaggerItem key={member.name}>
                <TeamCard member={member} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary-900 text-white">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
              The best way to know us is to meet us
            </h2>
            <p className="text-primary-100/80 leading-relaxed mb-8 max-w-xl mx-auto">
              Every recovery journey starts with a conversation. Our team is ready to listen, understand, and help you take the next step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white text-primary-900 font-semibold hover:bg-stone-100 transition-colors"
              >
                Start Your Intake
              </Link>
              <a
                href="tel:4109347976"
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Call (410) 934-7976
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
