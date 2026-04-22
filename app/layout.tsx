import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import { headers } from 'next/headers'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileCTABar } from '@/components/layout/MobileCTABar'
import { CrisisBar } from '@/components/layout/CrisisBar'
import { siteConfig } from '@/config/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Outpatient Substance Use Treatment in Maryland`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.meta.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Outpatient Substance Use Treatment in Maryland`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Outpatient Substance Use Treatment in Maryland`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1B6B5A',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-next-url') || headersList.get('x-invoke-path') || ''
  const isStaffRoute = pathname.startsWith('/dashboard')

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: 'Walkway to Healing LLC',
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneFormatted,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1200 Light St, Floor 1',
      addressLocality: 'Baltimore',
      addressRegion: 'MD',
      postalCode: '21230',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.2800,
      longitude: -76.6180,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    description: siteConfig.description,
    medicalSpecialty: 'Addiction Medicine',
    priceRange: 'Accepts Maryland Medicaid',
    paymentAccepted: 'Medicaid',
    areaServed: {
      '@type': 'State',
      name: 'Maryland',
      sameAs: 'https://en.wikipedia.org/wiki/Maryland',
    },
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        {!isStaffRoute && (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': `${siteConfig.url}/#website`,
                name: siteConfig.name,
                url: siteConfig.url,
                description: siteConfig.description,
                publisher: { '@id': `${siteConfig.url}/#organization` },
                potentialAction: {
                  '@type': 'SearchAction',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
                  },
                  'query-input': 'required name=search_term_string',
                },
              }) }}
            />
          </>
        )}
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-M6KH8CNG8Q"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-M6KH8CNG8Q');
        `}
      </Script>
      <body className="min-h-screen flex flex-col bg-cream">
        {isStaffRoute ? (
          children
        ) : (
          <>
            <CrisisBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileCTABar />
          </>
        )}
      </body>
    </html>
  )
}
