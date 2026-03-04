import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { breadcrumbSchema } from '@/lib/seo'
import { PageHero } from '@/components/shared/PageHero'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | Walkway to Healing',
  description:
    'Insights, guidance, and resources about substance use treatment, recovery, and Maryland Medicaid from the team at Walkway to Healing.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Walkway to Healing',
    description:
      'Insights, guidance, and resources about substance use treatment, recovery, and Maryland Medicaid.',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Blog', href: '/blog' }])) }} />
      <PageHero
        eyebrow="Blog"
        title="Resources & Insights"
        description="Honest information about treatment, recovery, insurance, and what to expect — from the team at Walkway to Healing."
        backgroundImage="/images/forest-path.jpg"
      />

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            {posts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block bg-white rounded-2xl border border-stone-100 p-6 sm:p-8 hover:border-primary-100 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {post.featured && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary-50 px-2.5 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-stone-400">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-stone-400">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-stone-500 leading-relaxed mb-4 text-sm sm:text-base">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-[11px] text-stone-400 bg-stone-50 px-2 py-0.5 rounded-full"
                        >
                          <Tag className="h-2.5 w-2.5" aria-hidden="true" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                      Read
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
