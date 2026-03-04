import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-white',
        secondary: 'border-transparent bg-stone-100 text-stone-800',
        destructive: 'border-transparent bg-red-100 text-red-700',
        outline: 'border-current text-stone-700',
        success: 'border-transparent bg-green-100 text-green-700',
        warning: 'border-transparent bg-amber-100 text-amber-700',
        accent: 'border-transparent bg-accent-50 text-accent-dark',
        new: 'border-transparent bg-blue-100 text-blue-700',
        contacted: 'border-transparent bg-amber-100 text-amber-700',
        scheduled: 'border-transparent bg-purple-100 text-purple-700',
        enrolled: 'border-transparent bg-green-100 text-green-700',
        'not-a-fit': 'border-transparent bg-stone-100 text-stone-500',
        'needs-follow-up': 'border-transparent bg-orange-100 text-orange-700',
        'needs-medical': 'border-transparent bg-red-100 text-red-700',
        'needs-housing': 'border-transparent bg-teal-100 text-teal-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
