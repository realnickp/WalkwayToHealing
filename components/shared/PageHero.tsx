import Image from 'next/image'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  backgroundImage?: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  children,
  size = 'md',
  backgroundImage,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        backgroundImage
          ? ''
          : 'bg-gradient-to-b from-primary-900 to-primary',
        size === 'sm' && 'py-12 md:py-16',
        size === 'md' && 'py-16 md:py-24',
        size === 'lg' && 'py-20 md:py-32',
        className
      )}
    >
      {/* Background image (when provided) */}
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary-900/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 to-transparent" />
        </>
      )}

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl">
          {eyebrow && (
            <AnimatedSection>
              <p className="text-primary-200 text-sm font-semibold uppercase tracking-widest mb-3">
                {eyebrow}
              </p>
            </AnimatedSection>
          )}
          <AnimatedSection delay={0.1}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
              {title}
            </h1>
          </AnimatedSection>
          {description && (
            <AnimatedSection delay={0.2}>
              <p className="text-lg text-primary-100 leading-relaxed max-w-2xl">
                {description}
              </p>
            </AnimatedSection>
          )}
          {children && (
            <AnimatedSection delay={0.3} className="mt-8">
              {children}
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  )
}
