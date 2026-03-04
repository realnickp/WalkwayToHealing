import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="font-display text-8xl font-bold text-primary-100 mb-6 leading-none">
          404
        </div>
        <h1 className="font-display text-2xl font-bold text-stone-900 mb-3">
          Page not found
        </h1>
        <p className="text-stone-500 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          If you were trying to reach our intake form or contact us, the links below
          will take you there.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors text-sm"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Go Home
          </Link>
          <Link
            href="/intake"
            className="flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition-colors text-sm"
          >
            Start Intake
          </Link>
        </div>
        <p className="mt-6 text-stone-400 text-sm">
          Need help?{' '}
          <a href="tel:4109347976" className="text-primary hover:underline">
            Call (410) 934-7976
          </a>
        </p>
      </div>
    </div>
  )
}
