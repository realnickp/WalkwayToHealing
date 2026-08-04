import { cn } from '@/lib/utils'

/**
 * Editorial section break: a hairline rule that fades out at both ends,
 * centered on a small accent diamond.
 */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex items-center justify-center gap-4', className)}
      aria-hidden="true"
    >
      <span className="h-px flex-1 max-w-[9rem] bg-gradient-to-r from-transparent to-stone-300" />
      <span className="h-1.5 w-1.5 rotate-45 bg-accent shrink-0" />
      <span className="h-px flex-1 max-w-[9rem] bg-gradient-to-l from-transparent to-stone-300" />
    </div>
  )
}
