'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'

interface TeamMember {
  name: string
  title: string
  image: string
  bio?: string
  quote?: string
}

const leaders: TeamMember[] = [
  {
    name: 'Troy Pritt',
    title: 'Chief Executive Officer',
    image: '/images/team/troy-pritt.png',
    bio: 'Troy\u2019s path to founding Walkway to Healing started in a recovery house, where a housing director saw something in him and gave him the chance to become a house manager. That opportunity sparked a calling built on the belief that everyone deserves to be treated like a human being and heard. In recovery himself since May 2020, Troy built an organization that refuses to let finances become a barrier to getting help and meets every client exactly where they are.',
    quote: 'Give it a chance. The drugs ain\u2019t going anywhere, but your life is.',
  },
  {
    name: 'Hannah Bukovsky',
    title: 'Executive Director',
    image: '/images/team/hannah-bukovsky.png',
    bio: 'Hannah leads the daily operations of Walkway to Healing with nearly three years of personal recovery guiding every decision. After getting clean, she chose to do something entirely different with her life \u2014 and everything fell into place. Having been in the same position as the clients who walk through the door, she channels that experience into building an environment where every person feels supported, respected, and never judged.',
    quote: 'Rock bottom can be the solid foundation you rebuild your life on.',
  },
]

const team: TeamMember[] = [
  {
    name: 'Tyler May-Holzman',
    title: 'Outreach Specialist',
    image: '/images/team/tyler-may-holzman.png',
    bio: 'Tyler didn\u2019t learn about addiction from a textbook \u2014 he lived with it. He watched his father build a business during stability, then saw everything unravel after a relapse. As a teenager, he and his brother stepped into survival mode. Those experiences gave him a deep understanding of what addiction does to families and shaped the empathy he brings to every interaction.',
    quote: 'Being scared is normal \u2014 but staying stuck is harder.',
  },
  {
    name: 'Marva Williams',
    title: 'Director of Admissions',
    image: '/images/team/marva-williams.png',
  },
  {
    name: 'Frederick Kingery',
    title: 'Clinical Coordinator',
    image: '/images/team/frederick-kingery.png',
    bio: 'Frederick brings 11 years of sobriety and deep personal understanding to his role. Having been through treatment himself, he knows what it\u2019s like to walk in carrying the weight of mistakes. He found that helping others stay sober was also helping him be a better person.',
    quote: 'Just for today, try something different. Make that first step.',
  },
  {
    name: 'Dawanda Boardley',
    title: 'Counselor',
    image: '/images/team/dawanda-boardley.png',
    bio: 'Dawanda started as a nurse before realizing she wanted to heal people at the root. She returned to school to become a substance abuse counselor. The loss of a close friend to an overdose and her father\u2019s 25+ years of recovery from PTSD shaped her compassion.',
    quote: 'Taking the first step toward recovery is an act of courage and self-love.',
  },
  {
    name: 'Casey Marshall',
    title: 'Counselor',
    image: '/images/team/casey-marshall.png',
    bio: 'Casey walks alongside people through recovery, leading groups and creating spaces for honest conversation. She knows how important it is to feel understood instead of judged, and helps people see that their story is more than their addiction.',
    quote: 'Recovery isn\u2019t about becoming a different person; it\u2019s about remembering who you are underneath the struggle.',
  },
  {
    name: 'Rachel Cornelio',
    title: 'Counselor',
    image: '/images/team/rachel-cornelio.png',
  },
  {
    name: 'Ellie Evans',
    title: 'Director of Business & Marketing',
    image: '/images/team/ellie-evans.png',
    bio: 'Ellie understands what it means to be at the end of the line. For years she struggled with addiction herself, and those experiences fuel her belief that compassion, patience, and understanding are the foundations of recovery.',
    quote: 'Sometimes things have to fall apart so better things can come together.',
  },
  {
    name: 'John Schelor',
    title: 'Peer Resource Coordinator',
    image: '/images/team/john-schelor.png',
    bio: 'John lost both parents to addiction, and that pain changed the course of his life. Nearly three years clean, he turned his story into a mission to help others. He knows the power of second chances.',
    quote: 'You don\u2019t have to be ready, you just have to be willing.',
  },
  {
    name: 'Dillon Mastales',
    title: 'Administrative Assistant',
    image: '/images/team/dillon-mastales.png',
  },
]

/* ─── Leadership ─── */

function LeaderCard({ leader, index }: { leader: TeamMember; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reverse = index % 2 === 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}
    >
      <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 relative rounded-full overflow-hidden shadow-xl shrink-0 ring-4 ring-primary/20">
        <Image
          src={leader.image}
          alt={`${leader.name}, ${leader.title}`}
          fill
          className="object-cover object-top"
          sizes="208px"
          priority
        />
      </div>
      <div className={`flex-1 text-center ${reverse ? 'md:text-right' : 'md:text-left'}`}>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">{leader.name}</h2>
        <p className="text-primary font-medium text-sm mt-1 mb-4">{leader.title}</p>
        <p className="text-stone-600 leading-relaxed">{leader.bio}</p>
        {leader.quote && (
          <blockquote className={`mt-5 pl-4 border-l-4 border-primary ${reverse ? 'md:pl-0 md:pr-4 md:border-l-0 md:border-r-4' : ''}`}>
            <p className={`text-stone-800 font-display italic text-lg leading-snug ${reverse ? 'md:text-right' : ''}`}>
              &ldquo;{leader.quote}&rdquo;
            </p>
          </blockquote>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Team Grid: Circular avatars with click-to-expand bio ─── */

function BioPanel({ member }: { member: TeamMember }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="overflow-hidden col-span-full"
    >
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 sm:p-7 my-2">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="48px"
            />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-stone-900">{member.name}</h3>
            <p className="text-primary text-sm font-medium">{member.title}</p>
          </div>
        </div>
        {member.bio && (
          <p className="text-stone-600 leading-relaxed">{member.bio}</p>
        )}
        {member.quote && (
          <blockquote className="mt-5 pl-4 border-l-4 border-primary">
            <p className="text-stone-800 font-display italic text-lg leading-snug">
              &ldquo;{member.quote}&rdquo;
            </p>
          </blockquote>
        )}
      </div>
    </motion.div>
  )
}

function MemberCircle({ member, isActive, onClick, size = 'default' }: { member: TeamMember; isActive: boolean; onClick: () => void; size?: 'default' | 'large' }) {
  const hasBio = Boolean(member.bio || member.quote)
  const sizeClass = size === 'large' ? 'w-32 h-32' : 'w-20 h-20 sm:w-24 sm:h-24'

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center text-center group ${hasBio ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className={`relative ${sizeClass} rounded-full overflow-hidden transition-shadow duration-300 ${isActive ? 'ring-[3px] ring-primary ring-offset-2' : hasBio ? 'group-hover:ring-[3px] group-hover:ring-primary/40 group-hover:ring-offset-2' : ''}`}>
        <Image
          src={member.image}
          alt={`${member.name}, ${member.title}`}
          fill
          className="object-cover object-top"
          sizes={size === 'large' ? '128px' : '(max-width: 640px) 80px, 96px'}
        />
      </div>
      <h3 className="font-bold text-stone-900 text-xs sm:text-sm mt-3 leading-tight">{member.name}</h3>
      <p className="text-stone-500 text-[11px] sm:text-xs mt-0.5 leading-tight">{member.title}</p>
      {hasBio && (
        <span className={`text-[10px] sm:text-xs mt-1.5 font-medium transition-colors ${isActive ? 'text-primary' : 'text-primary/60 group-hover:text-primary'}`}>
          {isActive ? 'Close' : 'Read bio'}
        </span>
      )}
    </button>
  )
}

function TeamRow({ members, startIndex, selectedIndex, onSelect, size = 'default' }: {
  members: TeamMember[]
  startIndex: number
  selectedIndex: number | null
  onSelect: (i: number) => void
  size?: 'default' | 'large'
}) {
  const bioRef = useRef<HTMLDivElement>(null)
  const activeInRow = selectedIndex !== null && selectedIndex >= startIndex && selectedIndex < startIndex + members.length
  const activeMember = activeInRow && selectedIndex !== null ? members[selectedIndex - startIndex] : null

  return (
    <>
      <div className="flex justify-center gap-4 sm:gap-6 md:gap-10">
        {members.map((member, i) => (
          <MemberCircle
            key={member.name}
            member={member}
            isActive={selectedIndex === startIndex + i}
            onClick={() => onSelect(startIndex + i)}
            size={size}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {activeMember && (
          <div key={`bio-${selectedIndex}`} ref={bioRef}>
            <BioPanel member={activeMember} />
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

function TeamGrid({ members }: { members: TeamMember[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleClick = (index: number) => {
    const member = members[index]
    if (!member.bio && !member.quote) return
    setSelectedIndex(prev => prev === index ? null : index)
  }

  const desktopRow1 = members.slice(0, 5)
  const desktopRow2 = members.slice(5)

  const mobileRow1 = members.slice(0, 3)
  const mobileRow2 = members.slice(3, 6)
  const mobileRow3 = members.slice(6)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Desktop: 5 top / 4 bottom */}
      <div className="hidden md:flex flex-col gap-8">
        <TeamRow members={desktopRow1} startIndex={0} selectedIndex={selectedIndex} onSelect={handleClick} size="large" />
        <TeamRow members={desktopRow2} startIndex={5} selectedIndex={selectedIndex} onSelect={handleClick} size="large" />
      </div>

      {/* Mobile: rows of 3 */}
      <div className="md:hidden flex flex-col gap-6 max-w-sm mx-auto">
        <TeamRow members={mobileRow1} startIndex={0} selectedIndex={selectedIndex} onSelect={handleClick} />
        <TeamRow members={mobileRow2} startIndex={3} selectedIndex={selectedIndex} onSelect={handleClick} />
        <TeamRow members={mobileRow3} startIndex={6} selectedIndex={selectedIndex} onSelect={handleClick} />
      </div>
    </div>
  )
}

/* ─── Main ─── */

export default function TeamContent() {
  return (
    <>
      {/* Leadership */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-5 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-2">Leadership</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
              Guided by experience, driven by purpose
            </h2>
          </motion.div>

          <div className="space-y-16 md:space-y-20">
            {leaders.map((leader, i) => (
              <LeaderCard key={leader.name} leader={leader} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-2">The Team</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
              The people who walk beside you
            </h2>
            <p className="text-stone-500 text-sm">Click on a team member to learn their story</p>
          </motion.div>

          <TeamGrid members={team} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary-900 text-white">
        <div className="container mx-auto max-w-3xl px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
              The best way to know us is to meet us
            </h2>
            <p className="text-primary-100/80 leading-relaxed mb-8 max-w-xl mx-auto">
              Every recovery journey starts with a conversation. Our team is ready to listen.
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
          </motion.div>
        </div>
      </section>
    </>
  )
}
