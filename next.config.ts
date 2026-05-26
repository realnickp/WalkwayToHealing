import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  // 301 redirects from the old (Wix) site URLs to current pages.
  // Preserves any link equity and resolves legacy 404s in Search Console.
  async redirects() {
    return [
      {
        source: '/service-page/level-1-outpatient',
        destination: '/programs/outpatient',
        permanent: true,
      },
      {
        source: '/service-page/level-2-1-intensive-outpatient',
        destination: '/programs/intensive-outpatient',
        permanent: true,
      },
      {
        source: '/service-page/level-2-5-partial-hospitalization',
        destination: '/programs/partial-hospitalization',
        permanent: true,
      },
      {
        source: '/book-online',
        destination: '/intake',
        permanent: true,
      },
      {
        source: '/locations',
        destination: '/about/locations',
        permanent: true,
      },
      // Catch-all for any other legacy Wix service pages
      {
        source: '/service-page/:slug*',
        destination: '/programs',
        permanent: true,
      },
    ]
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
