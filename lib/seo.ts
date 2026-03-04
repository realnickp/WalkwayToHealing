import { siteConfig } from '@/config/site'

interface BreadcrumbItem {
  name: string
  href: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: `${siteConfig.url}${item.href}`,
      })),
    ],
  }
}

export function serviceSchema(opts: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: opts.name,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
    areaServed: {
      '@type': 'State',
      name: 'Maryland',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${siteConfig.url}/intake`,
      servicePhone: siteConfig.contact.phoneFormatted,
    },
  }
}
