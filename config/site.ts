// Single source of truth for all site configuration
// Edit this file to update contact info, hours, and addresses across the entire site

export const siteConfig = {
  name: 'Walkway to Healing',
  tagline: 'Outpatient Substance Use Treatment',
  description:
    'Compassionate, evidence-based outpatient substance use treatment serving communities across Maryland. Accepting Maryland Medicaid. Real people, real recovery.',
  url: 'https://www.walkwaytohealing.com',

  contact: {
    phone: '4109347976',
    phoneFormatted: '(410) 934-7976',
    email: 'Admin@WalkWaytoHealing.com',
    address: {
      street: '1200 Light St, Floor 1',
      city: 'Baltimore',
      state: 'MD',
      zip: '21230',
      full: '1200 Light St, Floor 1, Baltimore, MD 21230',
    },
  },

  hours: {
    weekdays: 'Monday – Friday: 9:00 AM – 5:00 PM',
    weekend: 'Saturday – Sunday: Closed',
    formatted: [
      { days: 'Monday – Friday', hours: '9:00 AM – 5:00 PM' },
      { days: 'Saturday – Sunday', hours: 'Closed' },
    ],
  },

  insurance: {
    accepted: ['Maryland Medicaid'],
    notes: 'We work with you to verify your benefits. Call us with any questions.',
  },

  services: [
    {
      id: 'outpatient',
      name: 'Level 1 Outpatient',
      shortName: 'Outpatient (OP)',
      href: '/programs/outpatient',
      hours: '9 hours or fewer per week',
      description:
        'Structured counseling and support for those stepping down from higher levels of care or beginning their recovery journey with stable home environments.',
    },
    {
      id: 'intensive-outpatient',
      name: 'Level 2.1 Intensive Outpatient',
      shortName: 'Intensive Outpatient (IOP)',
      href: '/programs/intensive-outpatient',
      hours: '9–20 hours per week',
      description:
        'More intensive support for people who need structured treatment several days per week while continuing to live at home.',
    },
    {
      id: 'partial-hospitalization',
      name: 'Level 2.5 Partial Hospitalization',
      shortName: 'Partial Hospitalization (PHP)',
      href: '/programs/partial-hospitalization',
      hours: '20+ hours per week',
      description:
        'Our highest level of outpatient care — a structured, full-day program for those who need intensive clinical support without 24-hour residential placement.',
    },
    {
      id: 'supportive-housing',
      name: 'Supportive Housing Referrals',
      shortName: 'Housing Support',
      href: '/programs/supportive-housing',
      hours: 'Coordination available',
      description:
        'We connect clients to vetted housing partners across Maryland to support stability during and after treatment.',
    },
  ],

  social: {
    facebook: '',
    instagram: '',
    twitter: '',
  },

  crisisLine: {
    number: '988',
    name: 'Suicide & Crisis Lifeline',
    text: 'Call or text 988',
  },

  emergencyDisclaimer:
    'This website is not for emergencies. If you or someone else is in immediate danger, call 911. For mental health crises, call or text 988.',

  meta: {
    keywords: [
      'substance use treatment Maryland',
      'outpatient rehab Maryland',
      'intensive outpatient program Maryland',
      'partial hospitalization Maryland',
      'Medicaid drug treatment Maryland',
      'addiction treatment Maryland',
      'IOP Maryland',
      'PHP Maryland',
      'alcohol treatment Maryland',
      'opioid treatment Maryland',
      'substance use treatment Baltimore',
      'outpatient rehab Baltimore MD',
      'addiction treatment Baltimore',
      'drug rehab near me Maryland',
      'Medicaid rehab Maryland',
      'outpatient substance abuse treatment near me',
    ],
  },
}

export type SiteConfig = typeof siteConfig
