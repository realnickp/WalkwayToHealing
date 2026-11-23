export interface BlogFaq {
  question: string
  answer: string
}

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
  faqs?: BlogFaq[]
}

const posts: BlogPost[] = [
  {
    "slug": "what-happens-in-group-therapy-for-addiction",
    "title": "What Happens in Group Therapy for Addiction? (And Do I Have to Talk?)",
    "description": "Nervous about group therapy? What really happens in an addiction group, whether you have to share, what people talk about, and how to get started at Walkway to Healing in South Baltimore.",
    "content": "![A loose circle of mismatched chairs in a brick-walled group room, a few people seated with their backs to the camera and Baltimore rooftops outside the window](/images/blog/group-therapy-room.jpg)\n\nIf someone told you group therapy is part of treatment, I'd bet your stomach dropped a little. A room full of strangers. Everybody looking at you. Somebody asking you to tell your whole story out loud. That's the picture most people have in their heads, and it keeps a lot of people from picking up the phone.\n\nSo here's what group is really like, the way I'd explain it if you called us.\n\n## What actually happens in group therapy for addiction?\n\nA small group of people working on the same thing sits down with a counselor and talks through real life: cravings, stress, family, sleep, the hard days and the decent ones.\n\nAt Walkway to Healing, our groups are led by our counselors. It isn't a free-for-all, and it isn't a lecture either. The counselor keeps things on track, makes sure one person doesn't take over the room, and brings a topic when the group needs one. Some days that topic is a skill, like what to do when a craving hits. Other days it's whatever people walked in carrying.\n\nGroup therapy is part of every level of care we offer: [Level 1 Outpatient](/programs/outpatient), [Intensive Outpatient (IOP)](/programs/intensive-outpatient) and [Partial Hospitalization (PHP)](/programs/partial-hospitalization). The more intensive the program, the more group time you'll have in your week.\n\n## Do I have to talk in group therapy?\n\nNo. Not on day one, and not until you're ready.\n\nIt's completely normal to spend your first group mostly listening. A lot of groups start with a quick check-in around the room, and you can keep yours to your first name and \"I'm here.\" You can pass. Nobody is going to make you tell your story before you want to.\n\nWhat tends to happen is that somebody across the room says something that sounds exactly like what's been going on in your own head, and it hits you that you're not the only one. That's usually when people start talking, on their own, because the room feels a little less scary.\n\n## What do you talk about in group?\n\nMostly the stuff that makes recovery hard in real life. Things like:\n\n- Spotting your triggers: the people, places, moods and times of day that pull you back toward using\n- What to do when a craving hits, and how to ride it out\n- Handling stress, anger, grief and boredom without drinking or using\n- Rebuilding trust with family, and setting boundaries with people who aren't good for you\n- Relapse prevention, which is basically a plan for the risky moments before they show up\n- Getting through regular life: work, money worries, holidays, bad news\n\nOur team is trauma-informed, and plenty of people carry heavy history. You don't have to dig into any of it in front of a group. Some things belong in one-on-one counseling, and you'll have individual sessions alongside group for exactly that.\n\n![Close-up of a person's hands holding a small worn notebook and pen in a counseling group, other seated people soft in the background](/images/blog/group-therapy-notebook.jpg)\n\n## Is what I say in group kept private?\n\nEvery group runs on ground rules, and privacy is the big one. What people share in the room stays in the room. You don't repeat names, and you don't repeat stories.\n\nThe other rules are pretty simple. One person talks at a time. No cross-talk, no trying to fix each other, no judging. You can disagree with somebody without tearing them down. If someone is having a rough day, people slow down and listen.\n\nIf you're worried you'll see someone you know, say so before your first group. That's a real concern in a city like Baltimore, where everybody seems to know somebody, and it's worth talking through with your counselor ahead of time.\n\n## Why group instead of just one-on-one counseling?\n\nBecause some things land differently when they come from someone who's been there.\n\nA counselor can tell you cravings pass. When someone in the same room, fighting the same fight, tells you the same thing, it hits different. Group gives you that. It also gives you practice. Saying \"I'm not doing great today\" out loud to a room full of people is a skill, and it's the same skill you'll need with your family, your friends, and maybe your boss someday.\n\nEarly recovery can also be lonely, and people don't talk about that much. The old friends were often tied to using, and the new ones don't exist yet. Group is often the first place people meet others who are trying to stay on the same road.\n\nAnd some of the people on our team are in recovery themselves. The person in the room with you may know a little of what you're feeling.\n\n## What if I don't like my first group?\n\nGive it a few tries. First groups are awkward for almost everybody. You don't know anyone, you don't know the rhythm yet, and you're sizing up the room as much as it's sizing up you.\n\nIf something really isn't working, tell your counselor. Maybe a topic hit too close. Maybe someone's energy rubs you the wrong way. That's real, and it's worth saying out loud so we can work with it. You won't be in trouble for being honest.\n\n## What should I bring to my first group?\n\nJust yourself, really. Some people like a small notebook to jot down something that stuck with them. Try to come a few minutes early so you're not walking into a room that's already started. Wear whatever's comfortable.\n\nAnd if you're nervous, say it. \"I'm nervous, this is my first one\" is about the most normal sentence anyone can say in a group, and people tend to go a little easier on you for it.\n\n![A person walking alone down a brick sidewalk past South Baltimore rowhouses at dusk, seen from behind as the streetlights come on](/images/blog/group-therapy-walk-home.jpg)\n\n## How do I start group therapy in Baltimore?\n\nStart with a conversation. You can [start your intake online](/intake) or call us at (410) 934-7976. A real person answers, 24/7. From there you'll sit down with one of our counselors for an assessment, and together you'll figure out which level of care fits your life right now.\n\nWe're at 1200 Light St in South Baltimore, and we accept Maryland Medicaid. We check your coverage before your first visit, and you can [verify your insurance here](/verify-insurance) if you'd like to get that out of the way first.\n\nStill deciding between programs? Our guide to [IOP vs. PHP vs. Outpatient](/blog/iop-vs-php-vs-outpatient-levels-of-care) walks through the differences. And if you want to know what the very first appointment looks like, read [what to expect at your first outpatient visit](/blog/what-to-expect-first-outpatient-visit).\n\nThis article is general information and isn't a substitute for advice from a licensed clinician.",
    "author": "Walkway to Healing",
    "publishedAt": "2026-11-21",
    "tags": [
      "group therapy",
      "getting started",
      "treatment",
      "baltimore",
      "recovery"
    ],
    "readingTime": "6 min read",
    "faqs": [
      {
        "question": "What happens in group therapy for addiction?",
        "answer": "A small group of people working on recovery meets with a counselor and talks through real life: cravings, triggers, stress, family and relapse prevention. At Walkway to Healing, groups are led by our counselors and are part of Level 1 Outpatient, IOP and PHP."
      },
      {
        "question": "Do I have to talk in group therapy?",
        "answer": "No. You can listen for as long as you need to, and you can pass during check-ins. Most people start talking once they hear someone describe something they have been going through themselves."
      },
      {
        "question": "Is group therapy confidential?",
        "answer": "Every group runs on ground rules, and privacy is the big one: what people share in the room stays in the room, including names and stories. If you are worried about seeing someone you know, talk it through with your counselor before your first group."
      },
      {
        "question": "Does Maryland Medicaid cover group therapy for substance use?",
        "answer": "Walkway to Healing accepts Maryland Medicaid and checks your coverage before your first visit. You can start by verifying your insurance online or starting your intake."
      }
    ]
  },
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
One of the most common questions we hear is whether Maryland Medicaid will cover treatment. If you have Maryland Medicaid, the answer is almost certainly yes.

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

If you don't currently have Medicaid, our staff can help you begin the application process. We'll work with you to explore every option available so that getting started is as simple as possible.

## How to Verify Your Benefits

The easiest way to check your coverage is to call us at [(410) 934-7976](tel:4109347976). Our team will verify your specific plan and let you know exactly what's covered before your first appointment.

You can also [start your intake online](/intake) and we'll reach out to discuss your coverage as part of the process.

## The Bottom Line

Recovery should be within reach. Maryland Medicaid is designed to make outpatient treatment available to those who need it, and Walkway to Healing is here to make the process as simple as possible.
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
  {
    slug: 'does-maryland-medicaid-cover-rehab',
    title: 'Does Maryland Medicaid Cover Drug and Alcohol Rehab? (2026 Guide)',
    description:
      'Yes — Maryland Medicaid covers outpatient drug and alcohol rehab at every level of care. Here\'s exactly what\'s covered, who qualifies, and how to start treatment in Baltimore.',
    content: `
One of the first questions almost everyone asks when they look into addiction treatment is whether their insurance will cover it. **Does Maryland Medicaid cover drug and alcohol rehab? In nearly every case, yes.** Maryland Medicaid — known formally as Medical Assistance and delivered through the state's HealthChoice managed care program — covers medically necessary substance use treatment at every outpatient level of care.

This guide breaks down exactly what Maryland Medicaid covers for drug and alcohol rehab, who qualifies, which plans are included, and how to start treatment at a Medicaid-accepting outpatient program in Baltimore.

## Does Maryland Medicaid Cover Rehab?

Yes. Maryland Medicaid covers substance use disorder (SUD) treatment as an essential health benefit. That includes screening and assessment, outpatient counseling, intensive outpatient and partial hospitalization programs, medication-assisted treatment (MAT), case management, and care coordination. Because addiction is treated as a medical condition, Medicaid is required to cover medically necessary care the same way it covers any other health service.

At Walkway to Healing, **we accept Maryland Medicaid** for all of our outpatient programs, and our team verifies your specific benefits before your first appointment so there are no surprises.

## What Levels of Care Does Maryland Medicaid Cover?

Maryland Medicaid covers the full continuum of outpatient addiction treatment, defined by the American Society of Addiction Medicine (ASAM) levels of care:

- **Level 1 Outpatient (OP)** — individual and group counseling, generally fewer than 9 hours per week. Learn more about our [Level 1 Outpatient program](/programs/outpatient).
- **Level 2.1 Intensive Outpatient (IOP)** — structured group and individual therapy, typically 9–20 hours per week. See our [Intensive Outpatient Program](/programs/intensive-outpatient).
- **Level 2.5 Partial Hospitalization (PHP)** — the most intensive level of outpatient care, usually 20 or more hours per week. Explore our [Partial Hospitalization Program](/programs/partial-hospitalization).

Maryland Medicaid also covers medical detox, residential treatment, and medication-assisted treatment (MAT) when those services are medically necessary. Walkway to Healing specializes in the outpatient and partial hospitalization levels listed above — and if you need detox or MAT, we'll help connect you with the right provider.

## Which Maryland Medicaid Plans Cover Addiction Treatment?

Maryland delivers Medicaid through nine HealthChoice managed care organizations (MCOs). All of them are required to cover substance use treatment. The plans include:

- Aetna Better Health of Maryland
- AmeriHealth Caritas
- CareFirst Community Health Plan Maryland
- Jai Medical Systems
- Kaiser Permanente
- Maryland Physicians Care
- MedStar Family Choice
- Priority Partners
- UnitedHealthcare Community Plan

Behavioral health and SUD services in Maryland are administered through the state's public behavioral health system, which means coverage for addiction treatment is broadly consistent across plans. If you're not sure which plan you have, we can help you check — just [verify your insurance](/verify-insurance) with our team.

## Who Qualifies for Maryland Medicaid?

You may qualify for Maryland Medicaid if you are a Maryland resident and your household income falls within the program's limits. For most adults aged 19–64, the income threshold is set at 138% of the federal poverty level, and eligibility does not depend on having a disability or dependent children. U.S. citizens and many qualified immigrants are eligible.

If you don't currently have Medicaid, you can apply any time of year through Maryland Health Connection. Our staff can walk you through the application and, in many cases, help you begin the process the same day you reach out. Many people qualify and simply never applied.

## What If I Don't Have Insurance Yet?

If you're uninsured, that doesn't mean treatment is out of reach. We can help you apply for Maryland Medicaid and connect you with care while your application is processed. Don't let the paperwork stop you — [contact us](/contact) and we'll help you figure out your options.

## How to Start Medicaid-Covered Rehab in Maryland

Getting started is simpler than most people expect:

- **Verify your benefits.** Call us at [(410) 934-7976](tel:4109347976) or [verify your insurance online](/verify-insurance). We'll confirm exactly what your Maryland Medicaid plan covers before your first appointment.
- **Complete a brief intake.** [Start your intake online](/intake) in about two minutes, or do it over the phone.
- **Come in for an assessment.** A licensed counselor will recommend the right level of care. Here's [what to expect at your first visit](/blog/what-to-expect-first-outpatient-visit).
- **Begin treatment.** Most people start within a few days of their assessment.

## The Bottom Line

Maryland Medicaid covers drug and alcohol rehab at every outpatient level of care. If you have Maryland Medicaid — or think you might qualify — treatment is within reach today. [Verify your coverage](/verify-insurance) or call [(410) 934-7976](tel:4109347976) to get started.

This article is for general information and is not medical or insurance advice. Coverage depends on your specific plan and medical necessity. Contact Walkway to Healing or your Medicaid plan to confirm your benefits.
    `.trim(),
    author: 'Walkway to Healing',
    publishedAt: '2026-05-20',
    tags: ['medicaid', 'insurance', 'maryland', 'coverage', 'outpatient'],
    readingTime: '7 min read',
    featured: true,
    faqs: [
      {
        question: 'Does Maryland Medicaid cover drug and alcohol rehab?',
        answer:
          'Yes. Maryland Medicaid (Medical Assistance, delivered through HealthChoice) covers medically necessary substance use treatment, including outpatient counseling, intensive outpatient (IOP), partial hospitalization (PHP), medication-assisted treatment, and detox.',
      },
      {
        question: 'Does Walkway to Healing accept Maryland Medicaid?',
        answer:
          'Yes. Walkway to Healing accepts Maryland Medicaid (HealthChoice) for our outpatient and partial hospitalization programs. Call (410) 934-7976 or verify your insurance online and we\'ll confirm your specific plan.',
      },
      {
        question: 'What levels of addiction treatment does Maryland Medicaid cover?',
        answer:
          'Medicaid covers the full continuum: Level 1 Outpatient (OP), Level 2.1 Intensive Outpatient (IOP), Level 2.5 Partial Hospitalization (PHP), medical detox, residential care when medically necessary, and medication-assisted treatment.',
      },
      {
        question: 'Which Maryland Medicaid plans cover addiction treatment?',
        answer:
          'All nine HealthChoice MCOs cover SUD treatment, including Priority Partners, AmeriHealth Caritas, Maryland Physicians Care, UnitedHealthcare Community Plan, Aetna Better Health, CareFirst, Jai Medical, Kaiser Permanente, and MedStar Family Choice.',
      },
      {
        question: 'Who qualifies for Maryland Medicaid?',
        answer:
          'Most Maryland adults aged 19–64 qualify if household income is at or below 138% of the federal poverty level. You can apply year-round through Maryland Health Connection, and our team can help.',
      },
      {
        question: 'Do I need a referral to start Medicaid-covered rehab?',
        answer:
          'No referral is required to begin an assessment at Walkway to Healing. Call (410) 934-7976 or complete an intake online and we\'ll verify your benefits and recommend the right level of care.',
      },
    ],
  },
  {
    slug: 'drug-rehab-baltimore-accepts-medicaid',
    title: 'Drug Rehab in Baltimore That Accepts Medicaid: How to Find Outpatient Treatment',
    description:
      'Looking for a drug rehab in Baltimore that accepts Medicaid? Here\'s how to find Medicaid-accepting outpatient treatment, what to look for, and how to start quickly at Walkway to Healing.',
    content: `
Finding a **drug rehab in Baltimore that accepts Medicaid** can feel overwhelming — especially when search results are crowded with national directories and out-of-state call centers. If you have Maryland Medicaid and you're looking for real, local outpatient treatment, this guide will help you cut through the noise and find care close to home.

Walkway to Healing is an outpatient substance use treatment center located at **1200 Light St, Floor 1, in Baltimore, MD 21230**, and we accept Maryland Medicaid for all of our programs.

## How to Find a Medicaid Rehab in Baltimore

Not every treatment center accepts Medicaid, so it's worth confirming before you get your hopes up. Here's how to find a legitimate, local, Medicaid-accepting outpatient program:

- **Confirm they take Maryland Medicaid directly.** Ask whether they bill Maryland Medicaid (HealthChoice) and which plans they work with. We accept all major Maryland Medicaid plans — [verify your coverage here](/verify-insurance).
- **Make sure they're actually local.** Many search results are national lead-generation sites, not Baltimore providers. Look for a real Baltimore address and a local phone number.
- **Check the levels of care they offer.** A strong outpatient provider offers a full continuum so you can step up or down as your needs change.
- **Ask how quickly you can start.** The best time to begin treatment is when you're ready. We work to get new clients assessed and into care quickly.

## What Outpatient Programs Should I Look For?

A quality outpatient rehab in Baltimore should offer more than one level of care. At Walkway to Healing, our Medicaid-covered programs include:

- **[Level 1 Outpatient (OP)](/programs/outpatient)** — flexible counseling for people with stable home environments, fewer than 9 hours per week.
- **[Level 2.1 Intensive Outpatient (IOP)](/programs/intensive-outpatient)** — structured therapy 9–20 hours per week while you continue living at home and working.
- **[Level 2.5 Partial Hospitalization (PHP)](/programs/partial-hospitalization)** — our most intensive outpatient option, 20+ hours per week, for people who need significant clinical support without 24-hour residential care.
- **[Supportive housing referrals](/programs/supportive-housing)** — connections to vetted recovery housing partners across Maryland.

Not sure which level is right for you? Read our guide on [IOP vs. PHP vs. outpatient](/blog/iop-vs-php-vs-outpatient-levels-of-care), or let our clinical team recommend a starting point during your assessment.

## What About Medication-Assisted Treatment (MAT)?

Some people in recovery benefit from medication-assisted treatment (MAT), such as Suboxone or Vivitrol. Walkway to Healing focuses on counseling-based outpatient and partial hospitalization care — we don't prescribe MAT ourselves, but if it's part of your treatment plan, we'll help coordinate a referral to a trusted prescriber so your medication and your counseling work together. Learn more about [how Maryland Medicaid covers rehab](/blog/does-maryland-medicaid-cover-rehab).

## What If I Don't Have Medicaid Yet?

If you don't have Maryland Medicaid yet, you may still qualify — and many people do without realizing it. Our staff can help you apply through Maryland Health Connection and connect you with care in the meantime. Don't let insurance paperwork stop you from reaching out.

## How Quickly Can I Start Treatment?

We know the window when someone is ready to ask for help can be short. That's why we move quickly: once you [start your intake](/intake) or call us, we work to schedule your clinical assessment promptly and begin treatment within days when possible.

## Serving Baltimore and Communities Across Maryland

Our office sits in the Federal Hill area of South Baltimore, convenient to neighborhoods across the city and the surrounding counties. We serve clients from across Maryland and can discuss telehealth options where appropriate. See our [location details](/about/locations) for directions and parking.

## Start Today

If you've been searching for a drug rehab in Baltimore that accepts Medicaid, you've found one. [Verify your Medicaid coverage](/verify-insurance), [start your intake online](/intake), or call [(410) 934-7976](tel:4109347976) to speak with a real person today.
    `.trim(),
    author: 'Walkway to Healing',
    publishedAt: '2026-05-12',
    tags: ['baltimore', 'medicaid', 'outpatient', 'local', 'getting started'],
    readingTime: '6 min read',
    featured: true,
    faqs: [
      {
        question: 'What drug rehabs in Baltimore accept Medicaid?',
        answer:
          'Walkway to Healing, located at 1200 Light St in Baltimore, accepts Maryland Medicaid for all outpatient programs — Level 1 Outpatient, Intensive Outpatient (IOP), and Partial Hospitalization (PHP). Call (410) 934-7976 to verify your plan.',
      },
      {
        question: 'What if I don\'t have Medicaid yet?',
        answer:
          'You may still qualify — many people do without realizing it. Walkway to Healing\'s staff can help you apply through Maryland Health Connection and connect you with care in the meantime.',
      },
      {
        question: 'Does Walkway to Healing provide Suboxone or MAT?',
        answer:
          'Walkway to Healing provides counseling-based outpatient and partial hospitalization treatment and does not prescribe MAT directly. If medication-assisted treatment is part of your plan, we\'ll help coordinate a referral to a prescriber.',
      },
      {
        question: 'How quickly can I start outpatient rehab in Baltimore?',
        answer:
          'At Walkway to Healing we work to schedule your assessment quickly and begin treatment within days when possible. Start by completing an intake online or calling (410) 934-7976.',
      },
      {
        question: 'Do I need a referral to start rehab in Baltimore?',
        answer:
          'No referral is needed to begin. You can complete an intake online or call us directly, and our team will verify your Maryland Medicaid benefits and recommend a level of care.',
      },
    ],
  },
  {
    slug: 'iop-vs-php-vs-outpatient-levels-of-care',
    title: 'IOP vs. PHP vs. Outpatient: Which Level of Care Do You Need?',
    description:
      'Confused by IOP, PHP, and standard outpatient? Here\'s a clear breakdown of the ASAM outpatient levels of care, the hours involved, and how to choose the right one for substance use treatment in Maryland.',
    content: `
When you start looking into substance use treatment, you'll quickly run into a wall of acronyms: OP, IOP, PHP, ASAM, MAT. The most important ones describe **levels of care** — how intensive your treatment is and how many hours per week you'll spend in it. Understanding the difference between **IOP, PHP, and standard outpatient** helps you know what to expect and what to ask for.

This guide explains each outpatient level of care, who each one is for, and how a clinical team decides which is right for you.

## What Are the ASAM Levels of Care?

The American Society of Addiction Medicine (ASAM) created a widely used framework that organizes addiction treatment into levels, from the least to the most intensive. Outpatient care — treatment that lets you live at home rather than in a residential facility — covers three main levels:

- **Level 1: Outpatient (OP)** — fewer than 9 hours per week
- **Level 2.1: Intensive Outpatient (IOP)** — 9 to 20 hours per week
- **Level 2.5: Partial Hospitalization (PHP)** — 20 or more hours per week

All three are covered by Maryland Medicaid. Here's how they compare.

## Level 1: Standard Outpatient (OP)

**Hours:** Fewer than 9 per week, often 1–3 sessions.

Standard [outpatient treatment](/programs/outpatient) is the most flexible level of care. It's built for people who have a stable living situation, a support system, and responsibilities like work or school that they can maintain alongside treatment. Sessions include individual counseling, group therapy, and skills-based education.

OP is a great fit for people early in their recovery journey with lower-severity needs, or for those stepping down from a more intensive program who want to keep their momentum going.

## Level 2.1: Intensive Outpatient (IOP)

**Hours:** 9 to 20 per week, typically 3–5 days a week for about 3 hours per session.

[Intensive Outpatient (IOP)](/programs/intensive-outpatient) is a step up in structure. It's designed for people who need more support than standard outpatient can provide but don't require round-the-clock care. The bigger time commitment means more group therapy, more individual counseling, and a stronger focus on identifying triggers and building coping skills.

A common question is whether you can keep working during IOP. For most people, yes — IOP schedules (including some evening options) are built specifically so you can continue to work, attend school, and care for your family while in treatment.

## Level 2.5: Partial Hospitalization (PHP)

**Hours:** 20 or more per week, often resembling a full-day program several days a week.

[Partial Hospitalization (PHP)](/programs/partial-hospitalization) is the most intensive level of outpatient care — sometimes called "day treatment." You receive structured clinical support for most of the day and then return home in the evening. PHP is ideal for people who need a high level of support, including those stepping down from inpatient or detox, but who have a safe place to stay overnight.

PHP bridges the gap between residential treatment and lower-intensity outpatient care, offering many of the clinical benefits of inpatient treatment without requiring you to live at the facility.

## IOP vs. PHP: What's the Difference?

The core difference between IOP and PHP is **intensity and time.** PHP is the higher level of care — 20+ hours per week, often daily, structured like a full day of treatment. IOP is less time-intensive at 9–20 hours per week. People often start at PHP and step down to IOP, then to standard outpatient, as they stabilize and gain confidence in their recovery.

## Outpatient vs. Inpatient: Where Do These Fit?

All three of these levels are **outpatient** — you live at home. Inpatient or residential treatment, by contrast, means living at a facility 24 hours a day. Outpatient care lets you keep your job, school, and family life while you get treatment, and it's appropriate for the majority of people who have a safe and stable home environment. Many people never need inpatient care at all, or use it briefly before stepping down to outpatient.

## How Do I Know Which Level Is Right for Me?

You don't have to figure this out alone. During a clinical assessment, our team looks at several factors:

- The severity and history of your substance use
- Whether you have co-occurring mental health conditions
- The stability and safety of your living situation
- Your work, school, and family obligations
- Any previous treatment experience
- Your personal goals and preferences

Based on that, we recommend a starting level of care — and we adjust it as you progress. Treatment isn't a straight line, and moving between levels is normal and expected.

## Start With an Assessment

The simplest way to find your level of care is to talk to us. [Start your intake online](/intake), [verify your Medicaid coverage](/verify-insurance), or call [(410) 934-7976](tel:4109347976). If you're still deciding whether it's time to reach out at all, our post on the [signs it may be time to seek help](/blog/signs-its-time-to-seek-help) can help.
    `.trim(),
    author: 'Walkway to Healing',
    publishedAt: '2026-05-05',
    tags: ['levels of care', 'IOP', 'PHP', 'outpatient', 'treatment'],
    readingTime: '7 min read',
    faqs: [
      {
        question: 'What is the difference between IOP and PHP?',
        answer:
          'PHP (Partial Hospitalization, Level 2.5) is the more intensive level at 20+ hours per week, often a full-day program. IOP (Intensive Outpatient, Level 2.1) is 9–20 hours per week. Both let you live at home.',
      },
      {
        question: 'How many hours per week is each level of care?',
        answer:
          'Standard Outpatient (OP) is fewer than 9 hours per week, Intensive Outpatient (IOP) is 9–20 hours, and Partial Hospitalization (PHP) is 20 or more hours per week.',
      },
      {
        question: 'Can you work while in IOP?',
        answer:
          'Yes, for most people. IOP is designed around real life, with schedules (including some evening options) that let you continue working, attending school, and caring for your family.',
      },
      {
        question: 'What are the ASAM levels of care?',
        answer:
          'ASAM is a framework that organizes addiction treatment by intensity. The outpatient levels are Level 1 Outpatient, Level 2.1 Intensive Outpatient, and Level 2.5 Partial Hospitalization.',
      },
      {
        question: 'Can I move between levels of care?',
        answer:
          'Yes. Many people start at a higher level like PHP and step down to IOP and then standard outpatient as they stabilize. Your level can be adjusted any time based on your needs.',
      },
      {
        question: 'Does Maryland Medicaid cover all three outpatient levels?',
        answer:
          'Yes. Maryland Medicaid covers Level 1 Outpatient, Level 2.1 IOP, and Level 2.5 PHP. Walkway to Healing accepts Maryland Medicaid for all of these programs.',
      },
    ],
  },
  {
    slug: 'how-to-help-a-loved-one-with-addiction',
    title: 'How to Help a Loved One With Addiction (Even If They Don\'t Want Help)',
    description:
      'Watching someone you love struggle with addiction is painful. Here\'s how to help a family member with substance use — what to say, the difference between helping and enabling, and where to find support in Maryland.',
    content: `
If someone you love is struggling with drugs or alcohol, you've probably felt helpless, frightened, and exhausted all at once. You want to help, but you're not sure how — and you may worry that saying the wrong thing will push them further away. **The good news: the way families respond genuinely matters, and you don't have to be perfect to make a difference.**

This guide covers how to help a loved one with addiction, including what to say, how to set boundaries, the difference between helping and enabling, and where to turn for support in Maryland.

## You Can't Force Recovery — But You Can Influence It

It's a myth that a person has to "hit rock bottom" before they can recover. Research consistently shows that earlier intervention leads to better outcomes, and that supportive family involvement improves the chances someone will enter and stay in treatment. You can't control another person's choices, but you can change the environment around them — and that influence is real.

## How to Talk to Someone About Their Addiction

How you start the conversation matters more than having the perfect words. A few principles help:

- **Pick a calm, sober moment.** Avoid confronting someone while they're intoxicated or in the middle of a crisis.
- **Lead with care, not blame.** Use "I" statements: "I'm worried about you," rather than "You're ruining your life."
- **Be specific and concrete.** Name what you've observed without judgment.
- **Listen more than you lecture.** Let them talk. Feeling heard reduces defensiveness.
- **Offer a next step.** Have a concrete option ready, such as a phone number or an offer to help them [start an intake](/intake).

You may need to have this conversation more than once. That's normal. Planting the seed matters even when it doesn't produce an immediate yes.

## Helping vs. Enabling: What's the Difference?

This is one of the hardest distinctions for families. **Helping** supports a person's recovery. **Enabling** unintentionally protects them from the consequences of their use, which can make it easier to keep using.

- Helping looks like: offering to drive them to an appointment, learning about treatment options, attending family counseling.
- Enabling looks like: paying debts caused by substance use, covering for missed work, repeatedly providing money that funds use.

Setting boundaries isn't cruel — it's one of the most loving things you can do. Boundaries protect your own wellbeing and stop shielding your loved one from the reality that motivates change.

## What About an Intervention?

A formal intervention — where family and friends gather to express concern and present a treatment option — can work, but it's not the only approach and it can backfire if done in anger. If you're considering one, it often helps to involve a professional interventionist or counselor. Many families find that a series of honest, caring one-on-one conversations is just as effective and far less confrontational.

## Can You Force Someone Into Rehab in Maryland?

For adults, treatment is generally voluntary, so in most cases you cannot force an adult into rehab against their will. Maryland does have a limited involuntary commitment process for situations involving imminent danger, but it's narrow and rarely the right first step. The more reliable path is to keep the door to treatment open, make it as easy as possible to say yes, and be ready to act the moment they're willing. When that moment comes, we can move quickly — [contact us](/contact) and we'll help.

## Take Care of Yourself, Too

You cannot pour from an empty cup. Supporting someone with addiction is a marathon, and your wellbeing matters — both for your own sake and because you'll be a steadier source of support. Consider:

- **Family support groups** like Al-Anon and Nar-Anon, which exist specifically for loved ones of people with addiction.
- **Your own counseling.** Many of our programs include family involvement when appropriate.
- **Education.** Understanding the [signs that it may be time to seek help](/blog/signs-its-time-to-seek-help) and the [levels of care available](/blog/iop-vs-php-vs-outpatient-levels-of-care) helps you advocate effectively.

## When Your Loved One Is Ready

Recovery often starts with a single open door. When your loved one is willing to take a step — even a small one — we're here. Walkway to Healing offers outpatient treatment across Maryland and accepts Maryland Medicaid. [Verify coverage](/verify-insurance), [start an intake](/intake), or call [(410) 934-7976](tel:4109347976).

If you or your loved one is in immediate danger, call 911. For a mental health crisis, call or text 988 to reach the Suicide & Crisis Lifeline.
    `.trim(),
    author: 'Walkway to Healing',
    publishedAt: '2026-04-28',
    tags: ['family', 'addiction', 'recovery', 'support'],
    readingTime: '8 min read',
    faqs: [
      {
        question: 'How do you help someone with addiction who doesn\'t want help?',
        answer:
          'You can\'t force an adult into recovery, but you can keep the door open: have calm, caring conversations, set healthy boundaries, stop enabling, and be ready to act the moment they\'re willing. Earlier support leads to better outcomes.',
      },
      {
        question: 'What is the difference between helping and enabling?',
        answer:
          'Helping supports recovery (driving someone to treatment, learning about options). Enabling protects a person from the consequences of their use (paying debts, covering for missed work), which can make continued use easier.',
      },
      {
        question: 'How do I talk to a loved one about their addiction?',
        answer:
          'Choose a calm, sober moment, lead with care using "I" statements, be specific about what you\'ve observed, listen more than you lecture, and offer a concrete next step like a phone number or help starting an intake.',
      },
      {
        question: 'Can you force someone into rehab in Maryland?',
        answer:
          'For adults, treatment is generally voluntary, so you usually cannot force someone into rehab. Maryland has a narrow involuntary commitment process for imminent-danger situations, but keeping treatment accessible is more reliable.',
      },
      {
        question: 'Where can families of people with addiction get support?',
        answer:
          'Family support groups like Al-Anon and Nar-Anon are designed for loved ones. Family counseling and education about treatment options also help. Walkway to Healing involves family in care when appropriate.',
      },
    ],
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
