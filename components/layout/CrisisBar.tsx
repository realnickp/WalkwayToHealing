import { AlertTriangle } from 'lucide-react'

export function CrisisBar() {
  return (
    <div
      role="banner"
      aria-label="Emergency and crisis information"
      className="bg-stone-800 text-white text-xs py-2 px-4 text-center"
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
        <span className="flex items-center gap-1.5 font-medium text-amber-300">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Not an emergency line
        </span>
        <span className="hidden sm:inline text-stone-400">·</span>
        <span className="text-stone-300">
          In a crisis? Call or text{' '}
          <a
            href="tel:988"
            className="font-bold text-white underline underline-offset-2 hover:text-amber-300 transition-colors"
            aria-label="Call 988 Suicide and Crisis Lifeline"
          >
            988
          </a>{' '}
          (Suicide &amp; Crisis Lifeline) · Emergency:{' '}
          <a
            href="tel:911"
            className="font-bold text-white underline underline-offset-2 hover:text-amber-300 transition-colors"
            aria-label="Call 911 for emergencies"
          >
            911
          </a>
        </span>
      </div>
    </div>
  )
}
