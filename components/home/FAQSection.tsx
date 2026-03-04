import Image from 'next/image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import Link from 'next/link'

const faqs = [
  {
    id: 'iop-explained',
    question: 'What is Intensive Outpatient (IOP) and how does it work?',
    answer:
      'Intensive Outpatient Program (IOP) typically meets 3–5 days per week for 3 hours per session — roughly 9–20 hours of treatment per week. Unlike residential treatment, you live at home and continue your daily responsibilities. Sessions include group therapy, individual counseling, and skills-based learning. IOP is ideal for people who need more structure than standard outpatient but don\'t require 24-hour residential care.',
  },
  {
    id: 'php-explained',
    question: 'What is Partial Hospitalization (PHP)?',
    answer:
      'Partial Hospitalization (Level 2.5) is our highest outpatient level — typically 5 days per week for 5–6 hours per day, totaling 20+ hours of treatment weekly. It\'s designed for people stepping down from inpatient care or those who need intensive daily support while still living in the community. PHP includes comprehensive clinical services, medical monitoring, and peer support in a structured environment.',
  },
  {
    id: 'medicaid',
    question: 'Does Medicaid cover substance use treatment at Walkway to Healing?',
    answer:
      'Yes — we accept Maryland Medicaid, including HealthChoice plans. Medicaid typically covers all levels of outpatient substance use treatment when medically necessary. Our staff can help you verify your specific benefits before your first appointment so you know exactly what to expect. There is no cost to verify your coverage.',
  },
  {
    id: 'first-day',
    question: 'What happens on the first day of treatment?',
    answer:
      'Your first appointment is a clinical assessment — a conversation with a counselor to understand your history, your goals, and your situation. It\'s not a test, and there are no wrong answers. We\'ll talk about your substance use history, any co-occurring mental health needs, your daily life, and what you want your life to look like. From there, we collaboratively determine your starting level of care. You won\'t be judged, and you don\'t need to have everything figured out.',
  },
  {
    id: 'transportation',
    question: 'What if I don\'t have reliable transportation?',
    answer:
      'Transportation barriers shouldn\'t prevent access to care. Let us know your situation when you complete the intake form. We can help connect you with public transit options, ride assistance programs, or coordinate scheduling to make attendance as manageable as possible. We\'ll work with you.',
  },
  {
    id: 'housing',
    question: 'Can Walkway to Healing help with housing?',
    answer:
      'We understand that stable housing is essential to stable recovery. While we are an outpatient treatment center and not a housing provider, we maintain connections with trusted housing partners across Maryland and can facilitate referrals and coordination. Housing support is a referral and coordination service — please ask about it during your intake assessment.',
  },
  {
    id: 'right-level',
    question: 'How do I know which level of care is right for me?',
    answer:
      'You don\'t have to figure that out on your own — that\'s what our clinical assessment is for. In general: Level 1 Outpatient suits people with a stable environment who need structured support; Level 2.1 IOP is for those needing more frequent engagement; Level 2.5 PHP is for those requiring intensive daily structure. Our clinicians will work with you to find the right fit and adjust as you progress.',
  },
  {
    id: 'confidentiality',
    question: 'Is my information kept private?',
    answer:
      'Yes. Your privacy is protected under federal law, including 42 CFR Part 2 (the federal law specifically protecting substance use treatment records) and HIPAA. We do not share your information with employers, family members, law enforcement, or courts without your written consent, except in very limited circumstances required by law. All intake information is stored securely.',
  },
]

export function FAQSection() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section
      className="py-16 md:py-24 bg-cream"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto">
        {/* Baltimore skyline image banner */}
        <AnimatedSection className="mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-[200px] sm:h-[260px]">
            <Image
              src="/images/baltimore-skyline.jpg"
              alt="Baltimore skyline at sunset"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-white font-display text-xl sm:text-2xl font-bold drop-shadow-lg">
                Serving Maryland&apos;s communities with compassion.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Left: Header */}
          <AnimatedSection direction="left" className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
                Common Questions
              </p>
              <h2
                id="faq-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-5 text-balance"
              >
                We answer the questions you might be afraid to ask.
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Reaching out is already hard enough. Here are honest answers to the
                questions we hear most.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-dark transition-colors"
              >
                Still have questions? Talk to us →
              </Link>

              {/* Small image in sidebar */}
              <div className="mt-8 relative rounded-xl overflow-hidden shadow-md hidden lg:block">
                <Image
                  src="/images/zen-stones.jpg"
                  alt="Balanced zen stones by a calm stream"
                  width={320}
                  height={240}
                  className="object-cover w-full h-[200px]"
                  sizes="320px"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Right: FAQ accordion */}
          <AnimatedSection direction="right" delay={0.1} className="lg:col-span-2">
            <Accordion type="single" collapsible className="bg-white rounded-2xl border border-stone-100 divide-y divide-stone-100 overflow-hidden shadow-sm">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="px-6 border-none">
                  <AccordionTrigger className="text-base font-medium text-stone-900 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-600 leading-relaxed text-sm pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
