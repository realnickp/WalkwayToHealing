import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import { getAllSlugs, getPostBySlug } from '@/lib/blog'
import { siteConfig } from '@/config/site'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

function renderMarkdown(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0
  let listItems: string[] = []

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1.5 text-stone-600 my-4 pl-1">
          {listItems.map((li, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: parseInline(li) }} />
          ))}
        </ul>
      )
      listItems = []
    }
  }

  function parseInline(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary font-medium underline hover:text-primary-dark">$1</a>')
  }

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={i} className="font-display text-2xl font-bold text-stone-900 mt-10 mb-4">
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={i} className="font-display text-lg font-bold text-stone-800 mt-8 mb-3">
          {line.replace('### ', '')}
        </h3>
      )
    } else if (line.startsWith('- ')) {
      listItems.push(line.replace(/^- /, ''))
    } else if (line.match(/^\d+\. /)) {
      flushList()
      listItems.push(line.replace(/^\d+\. /, ''))
    } else if (line.trim() === '') {
      flushList()
    } else {
      flushList()
      elements.push(
        <p
          key={i}
          className="text-stone-600 leading-relaxed my-4"
          dangerouslySetInnerHTML={{ __html: parseInline(line) }}
        />
      )
    }
    i++
  }
  flushList()

  return elements
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="bg-cream min-h-screen">
        <div className="bg-primary-900 pt-12 pb-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-primary-200 text-sm hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All posts
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="flex items-center gap-1.5 text-primary-200 text-sm">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5 text-primary-200 text-sm">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readingTime}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        <div className="container mx-auto max-w-3xl px-4 -mt-8">
          <div className="bg-white rounded-2xl shadow-lg border border-stone-200/60 p-6 sm:p-10 mb-12">
            <div className="prose-custom">
              {renderMarkdown(post.content)}
            </div>

            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-stone-100">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs text-stone-500 bg-stone-50 px-3 py-1.5 rounded-full"
                >
                  <Tag className="h-3 w-3" aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center pb-16">
            <p className="text-stone-500 mb-4">Ready to take the next step?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
              >
                Start Your Intake
              </Link>
              <a
                href="tel:4109347976"
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Call (410) 934-7976
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
