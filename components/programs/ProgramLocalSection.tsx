import Link from 'next/link'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { siteConfig } from '@/config/site'

type Faq = { question: string; answer: string }

// Baltimore-focused copy + FAQ block for a program page. Emits FAQPage schema for its questions.
export function ProgramLocalSection({
  heading,
  paragraphs,
  faqs,
}: {
  heading: string
  paragraphs: string[]
  faqs: Faq[]
}) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <section className="py-16 md:py-20 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <AnimatedSection direction="left">
            <div>
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-5">{heading}</h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <p className="mt-6 text-sm text-stone-500">
                Our phones are answered 24/7. Call{' '}
                <a href={`tel:${siteConfig.contact.phone}`} className="text-primary font-semibold">
                  {siteConfig.contact.phoneFormatted}
                </a>{' '}
                any time, or <Link href="/verify-insurance" className="text-primary font-semibold">verify your Medicaid coverage</Link>.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.15}>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-cream rounded-2xl p-6 border border-stone-100">
                  <h3 className="font-semibold text-stone-900 mb-2">{faq.question}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
