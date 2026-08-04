// YouTube videos from the Walkway to Healing channel.
// Shared by the homepage Voices of Recovery section and the team page.
// Descriptions are condensed from each video's YouTube description.

export const youtubeChannelUrl = 'https://www.youtube.com/@Walkwaytohealing'

/** The flagship brand film, featured in the homepage hero. */
export const brandFilm = {
  id: 'KnI6-D6RmFw',
  title: 'Inside Walkway to Healing',
  duration: '2 min film',
  description:
    'Recovery looks different for everyone, but no one should have to face it alone. Through the voices of clients, alumni, counselors, and leadership, this film shows the people and purpose behind Walkway to Healing — and what makes our approach to addiction treatment different.',
}

export interface ChannelVideo {
  /** YouTube video ID */
  id: string
  /** Person featured in the video */
  person: string
  /** Role/title shown under staff videos */
  role?: string
  /** Short description shown below the video in the popup player */
  description: string
}

export const storiesOfHealingVideos: ChannelVideo[] = [
  {
    id: 'Qe2RIHEk8ZA',
    person: 'Ethan Rambo',
    description:
      'As a photographer and business owner, Ethan spent years looking like everything was under control while privately struggling with cocaine, opiates, and unresolved trauma. He shares how he found his way forward at Walkway to Healing.',
  },
  {
    id: 'KA_JLY7mTG8',
    person: 'Alyson Leoffler',
    description:
      'For years, addiction kept Alyson trapped in a cycle where everything revolved around using — existing, not really living. She shares the moment someone who loved her asked, “When are you going to choose yourself?” and how that changed everything.',
  },
  {
    id: 'birpuM4z76E',
    person: 'Adam Geppi',
    description:
      'Adam reached a point where he was tired of rebuilding his life only to burn it back down. He shares how reaching out to Walkway to Healing gave him consistency, stability, peace, and a real chance at a new life.',
  },
]

export const meetTheStaffVideos: ChannelVideo[] = [
  {
    id: 'gvfdu5y94Pk',
    person: 'Troy Pritt',
    role: 'Chief Executive Officer',
    description:
      'Before recovery, Troy experienced homelessness, addiction, and the pain of having nowhere to go. He shares how those experiences shaped the environment he built at Walkway to Healing — and why his connection to this work is deeply personal.',
  },
  {
    id: 'EvNUtw5Q1aw',
    person: 'Hannah Bukovsky',
    role: 'Executive Director',
    description:
      'Hannah shares how she builds a warm, welcoming environment where clients can feel comfortable, be themselves, and receive care that is personal, compassionate, and built around their individual needs.',
  },
  {
    id: 'bLKsnVTKTSs',
    person: 'Troy “Zayde” Pritt',
    role: 'Director of Human Resources',
    description:
      'Zayde’s connection to this work is deeply personal — both of his sons and other members of his family have struggled with addiction. He shares how that firsthand understanding shapes the way he sees every client who walks through the door.',
  },
  {
    id: 'GlhlcIoa4hc',
    person: 'Frederick Kingery',
    role: 'Clinical Coordinator',
    description:
      'Fred struggled with heroin and cocaine addiction — a road that led to prison and the realization that something had to change. He shares how his own recovery shapes the way he guides clients today.',
  },
  {
    id: '5i1wWWA_jPw',
    person: 'Casey Marshall',
    role: 'Counselor',
    description:
      'For Casey, helping people recover is more than a career — she is in recovery herself and has lost loved ones to the disease. She shares how that experience shapes the way she walks beside clients.',
  },
  {
    id: 'huZhI0KJnQg',
    person: 'Elli Evans',
    role: 'Director of Business & Marketing',
    description:
      'Fear keeps a lot of people stuck far longer than they need to be. Elli, in recovery herself, shares how she helps people take that first step and coordinates the care and resources they need from day one.',
  },
]
