import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  const staticRoutes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/programs', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/programs/outpatient', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/programs/intensive-outpatient', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/programs/partial-hospitalization', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/programs/supportive-housing', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/about/approach', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/about/team', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/about/testimonials', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/about/locations', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/verify-insurance', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/intake', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/privacy', priority: 0.4, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.4, changeFrequency: 'yearly' as const },
    { url: '/accessibility', priority: 0.4, changeFrequency: 'yearly' as const },
  ]

  const blogPosts = getAllPosts().map((post) => ({
    url: `/blog/${post.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: new Date(post.updatedAt || post.publishedAt),
  }))

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.url}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}${post.url}`,
      lastModified: post.lastModified,
      changeFrequency: post.changeFrequency,
      priority: post.priority,
    })),
  ]
}
