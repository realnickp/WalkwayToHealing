'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { googleRating, googleReviews, googleReviewsUrl, type GoogleReview } from '@/config/reviews'

function Stars({ className }: { className?: string }) {
  return (
    <div className={className} role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 inline-block"
          fill="currentColor"
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, className }: { review: GoogleReview; className?: string }) {
  return (
    <figure
      className={`bg-white/10 rounded-2xl border border-white/10 p-6 sm:p-7 flex flex-col ${className ?? ''}`}
    >
      <Stars className="mb-4" />
      <blockquote className="text-white leading-relaxed flex-1 text-sm">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="border-t border-white/10 pt-4 mt-5">
        <p className="text-primary-100 text-sm font-medium">{review.author}</p>
      <p className="text-primary-300 text-xs mt-0.5">Google review</p>
      </figcaption>
    </figure>
  )
}

/** Swipeable track with arrows — used on mobile/tablet and for reduced-motion visitors. */
function ScrollTrack() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCanPrev(track.scrollLeft > 8)
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 8)
  }, [])

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [updateArrows])

  const scrollByPage = (dir: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {googleReviews.map((review) => (
          <ReviewCard
            key={review.author}
            review={review}
            className="snap-start shrink-0 w-[88%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.4px)]"
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          disabled={!canPrev}
          aria-label="Previous reviews"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          disabled={!canNext}
          aria-label="Next reviews"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

/** Continuously drifting marquee that pauses on hover — desktop only. */
function Marquee() {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="flex w-max items-stretch animate-marquee hover:[animation-play-state:paused]">
        {googleReviews.map((review) => (
          <ReviewCard key={review.author} review={review} className="w-[380px] shrink-0 mr-5" />
        ))}
        {/* Duplicate set for a seamless loop */}
        <div className="flex items-stretch" aria-hidden="true">
          {googleReviews.map((review) => (
            <ReviewCard key={`dup-${review.author}`} review={review} className="w-[380px] shrink-0 mr-5" />
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Hydration-safe reduced-motion check: always false on the server AND the
 * first client render (so the trees match), then updates after mount.
 */
function useReducedMotionSafe() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduceMotion
}

export function GoogleReviewsCarousel() {
  const reducedMotion = useReducedMotionSafe()

  return (
    <div role="group" aria-roledescription="carousel" aria-label="Five-star Google reviews">
      {/* Rating summary */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-8">
        <Stars />
        <p className="text-white font-semibold">
          {googleRating.value} out of 5
          <span className="text-primary-200 font-normal">
            {' '}
            &middot; {googleRating.count} Google reviews
          </span>
        </p>
        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-200 text-sm underline underline-offset-4 hover:text-white transition-colors"
        >
          Read them on Google
        </a>
      </div>

      {reducedMotion ? (
        <ScrollTrack />
      ) : (
        <>
          <div className="hidden lg:block">
            <Marquee />
          </div>
          <div className="lg:hidden">
            <ScrollTrack />
          </div>
        </>
      )}
    </div>
  )
}
