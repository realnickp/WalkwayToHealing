export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  author: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  readingTime: string
  featured?: boolean
}

const posts: BlogPost[] = [
  {
    slug: 'what-to-expect-first-outpatient-visit',
    title: 'What to Expect at Your First Outpatient Visit',
    description:
      'Feeling nervous about your first appointment? Here\'s exactly what happens during a clinical assessment at Walkway to Healing — no surprises.',
    content: `
Starting substance use treatment can feel intimidating. You might not know what to expect, and that uncertainty alone can be enough to keep someone from walking through the door. We want to change that.

## Before Your Visit

Before your first appointment, you'll complete a brief intake form — either online or over the phone. This gives our clinical team a starting point so your first conversation isn't starting from scratch.

You don't need to bring anything special. Just bring a valid ID and your insurance card (if you have one). We accept Maryland Medicaid, and our team can help verify your benefits before your visit.

## What Happens During the Assessment

Your first visit is a **clinical assessment** — a one-on-one conversation with a licensed counselor. It typically lasts 60–90 minutes.

Here's what we'll talk about:

- **Your history** — substance use, mental health, and anything you're comfortable sharing
- **Your current situation** — housing, employment, family, legal concerns
- **Your goals** — what you want your life to look like
- **Your level of care** — together, we'll determine whether Level 1 Outpatient, IOP, or PHP is the right fit

This is a conversation, not an interrogation. There are no wrong answers. Our job is to listen, not to judge.

## After the Assessment

Based on your assessment, we'll recommend a treatment plan tailored to your needs. This includes:

- Your starting level of care
- A schedule that works for your life
- Any referrals you might need (housing, medical, etc.)
- A follow-up appointment

Most people start treatment within a few days of their assessment.

## You're Not Alone

Walking through the door is the hardest part. Once you're here, you'll find a team of people — many of whom have been where you are — ready to support you every step of the way.

**Ready to get started?** [Complete your intake online](/intake) or call us at [(410) 934-7976](tel:4109347976).
    `.trim(),
    author: 'Walkway to Healing',
    publishedAt: '2025-12-15',
    tags: ['treatment', 'getting started', 'outpatient'],
    readingTime: '4 min read',
    featured: true,
  },
  {
    slug: 'understanding-maryland-medicaid-substance-use-treatment',
    title: 'Understanding Maryland Medicaid for Substance Use Treatment',
    description:
      'Maryland Medicaid covers substance use treatment at every level of outpatient care. Here\'s what you need to know about coverage, eligibility, and getting started.',
    content: `
One of the most common questions we hear is: "Can I afford treatment?" If you have Maryland Medicaid, the answer is almost certainly yes.

## What Maryland Medicaid Covers

Maryland Medicaid — including HealthChoice managed care plans — covers medically necessary substance use treatment at all outpatient levels of care:

- **Level 1 Outpatient (OP)** — individual and group counseling
- **Level 2.1 Intensive Outpatient (IOP)** — structured programming 9–20 hours per week
- **Level 2.5 Partial Hospitalization (PHP)** — intensive daily treatment 20+ hours per week

Coverage typically includes clinical assessments, individual therapy, group therapy, case management, and medication-assisted treatment coordination.

## Am I Eligible?

You may be eligible for Maryland Medicaid if you:

- Are a Maryland resident
- Meet income requirements (which vary by household size)
- Are a U.S. citizen or qualified immigrant

If you're not sure whether you're eligible, we can help you check. Many people qualify and don't realize it.

## What If I Don't Have Insurance?

If you don't currently have Medicaid, our staff can help you begin the application process. We'll work with you to explore every option available so that cost is never the reason you don't get help.

## How to Verify Your Benefits

The easiest way to check your coverage is to call us at [(410) 934-7976](tel:4109347976). Our team will verify your specific plan and let you know exactly what's covered before your first appointment — at no cost to you.

You can also [start your intake online](/intake) and we'll reach out to discuss your coverage as part of the process.

## The Bottom Line

Cost should never be a barrier to recovery. Maryland Medicaid exists to make treatment accessible, and Walkway to Healing is here to make the process as simple as possible.
    `.trim(),
    author: 'Walkway to Healing',
    publishedAt: '2025-11-28',
    tags: ['insurance', 'medicaid', 'maryland', 'coverage'],
    readingTime: '3 min read',
    featured: true,
  },
  {
    slug: 'signs-its-time-to-seek-help',
    title: 'Signs It Might Be Time to Seek Help for Substance Use',
    description:
      'Recognizing when substance use has become a problem isn\'t always easy. Here are some signs that it may be time to reach out for support.',
    content: `
Addiction doesn't always look the way movies and TV portray it. For many people, substance use starts gradually and becomes a problem before they fully realize what's happening.

If you're reading this, something prompted you to search. That alone might be a sign worth paying attention to.

## Common Signs That Substance Use Has Become a Problem

Everyone's experience is different, but here are patterns we commonly see:

### Changes in Daily Life
- Missing work, school, or important obligations
- Losing interest in activities you used to enjoy
- Neglecting relationships, hygiene, or responsibilities
- Financial problems related to substance use

### Physical and Mental Health Changes
- Needing more of a substance to feel the same effect (tolerance)
- Feeling sick, anxious, or irritable when you haven't used (withdrawal)
- Sleep problems — either too much or too little
- Worsening mental health symptoms like anxiety or depression

### Loss of Control
- Using more than you intended
- Wanting to stop or cut back but finding it difficult
- Spending significant time obtaining, using, or recovering from substances
- Continuing to use despite negative consequences

### Relationship Impact
- Loved ones expressing concern about your use
- Increased conflict at home or work
- Isolating from people who don't use
- Hiding your use from others

## You Don't Have to Hit "Rock Bottom"

One of the most harmful myths about addiction is that you need to hit rock bottom before getting help. That's not true. In fact, earlier intervention typically leads to better outcomes.

You don't need to have lost everything. You just need to recognize that something isn't working and be willing to explore a different path.

## What Reaching Out Looks Like

If any of this resonates, here's what you can do:

1. **Call us** at [(410) 934-7976](tel:4109347976) — a real person will answer
2. **Start an intake online** at [walkwaytohealing.com/intake](/intake) — it takes about 2 minutes
3. **Ask a question** — you don't have to commit to anything. Just start a conversation.

Recovery starts with one honest step. We're here when you're ready.
    `.trim(),
    author: 'Walkway to Healing',
    publishedAt: '2025-11-10',
    tags: ['addiction', 'recovery', 'mental health', 'getting started'],
    readingTime: '5 min read',
    featured: true,
  },
  {
    slug: 'iop-vs-outpatient-which-level-of-care',
    title: 'IOP vs. Outpatient: Which Level of Care Is Right for You?',
    description:
      'Not sure whether you need Intensive Outpatient or standard Outpatient treatment? Here\'s a clear breakdown of the differences and how to decide.',
    content: `
When people first look into substance use treatment, the different "levels of care" can be confusing. What's the difference between outpatient and intensive outpatient? How do you know which one you need?

Here's a straightforward guide.

## Level 1: Outpatient (OP)

**Hours:** Fewer than 9 hours per week  
**Schedule:** Typically 1–3 sessions per week  
**Best for:** People who have a stable home environment, employment, and a support system — and who need structured counseling to maintain or build on their recovery.

Outpatient treatment includes individual counseling, group therapy, and skills-based education. It's the most flexible option and allows you to maintain your daily routine while receiving consistent support.

## Level 2.1: Intensive Outpatient (IOP)

**Hours:** 9–20 hours per week  
**Schedule:** Typically 3–5 sessions per week, 3 hours each  
**Best for:** People who need more structure and support than standard outpatient can provide, but who don't require 24-hour residential care.

IOP is a step up in intensity. It includes more frequent group and individual sessions, with a focus on building coping skills, addressing triggers, and developing a strong recovery foundation.

## How We Determine the Right Level

You don't have to figure this out on your own. During your clinical assessment, our team evaluates several factors:

- Severity and history of substance use
- Co-occurring mental health conditions
- Stability of your living situation
- Employment and family obligations
- Previous treatment history
- Your personal goals and preferences

Based on this assessment, we'll recommend a starting level — and adjust as you progress. Many clients start at IOP and step down to outpatient as they gain stability.

## Can I Move Between Levels?

Yes. Treatment isn't a straight line. If your circumstances change — for better or worse — we can adjust your level of care. The goal is always to match your treatment intensity to your current needs.

## Next Steps

Not sure where you fall? That's completely okay. [Start your intake](/intake) or call us at [(410) 934-7976](tel:4109347976) and we'll figure it out together.
    `.trim(),
    author: 'Walkway to Healing',
    publishedAt: '2025-10-22',
    tags: ['treatment', 'IOP', 'outpatient', 'levels of care'],
    readingTime: '4 min read',
  },
]

export function getAllPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.featured)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug)
}
