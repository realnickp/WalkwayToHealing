'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Phone, ChevronRight, Shield, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

const words = ['Recovery', 'starts', 'with', 'one', 'honest', 'step.']

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const outerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end start'],
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -60])
  const bgScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.08])
  const whiteOpacity = useTransform(scrollYProgress, [0.25, 0.75], [0, 1])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.8,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <div ref={outerRef} className="relative z-0" style={{ height: '140vh' }}>
      <section
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        aria-labelledby="hero-heading"
      >
        {/* Background image with Ken Burns + scroll parallax zoom */}
        <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'easeOut' }}
          >
            <Image
              src="/images/walking-toward-light.jpg"
              alt=""
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* White fade overlay — driven by scroll */}
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none z-30"
          style={{ opacity: whiteOpacity }}
          aria-hidden="true"
        />

        {/* Light sweep animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.12, 0] }}
          transition={{ duration: 3, delay: 0.5, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        {/* Content — fades out + shifts up on scroll */}
        <motion.div
          className="container mx-auto relative z-10 px-4"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="flex flex-col items-center text-center">
            {/* Eyebrow badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-7"
            >
              <span className="flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
                <Heart className="h-3 w-3" aria-hidden="true" />
                Serving All of Maryland
              </span>
              <span className="flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
                <Shield className="h-3 w-3" aria-hidden="true" />
                Accepts Maryland Medicaid
              </span>
            </motion.div>

            {/* Headline — word-by-word reveal */}
            <h1
              id="hero-heading"
              className="font-display text-[clamp(2.2rem,5.2vw,4.8rem)] font-bold text-white leading-tight mb-2 drop-shadow-lg"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 36, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.5,
                    delay: 0.35 + i * 0.09,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="inline-block"
                  style={{ marginRight: i < words.length - 1 ? '0.28em' : 0 }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Animated underline accent */}
            <motion.div
              className="h-1 rounded-full bg-accent mb-7"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 100, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Subheadline + CTAs */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.p
                variants={item}
                className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10 max-w-2xl drop-shadow-sm"
              >
                Walkway to Healing offers compassionate, outpatient substance use
                treatment in Baltimore. We accept Maryland Medicaid — and our team
                understands what you&apos;re going through because many of us have
                lived it.
              </motion.p>

              <motion.div
                variants={item}
                className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
              >
                <Button
                  size="xl"
                  variant="accent"
                  asChild
                  className="w-full sm:w-auto shadow-lg shadow-accent/30"
                >
                  <Link href="/intake">
                    Start Your Intake
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline-white"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <a href={`tel:${siteConfig.contact.phone}`}>
                    <Phone className="h-4 w-4" />
                    {siteConfig.contact.phoneFormatted}
                  </a>
                </Button>
              </motion.div>

              <motion.div variants={item}>
                <Link
                  href="/verify-insurance"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors duration-150"
                  aria-label="Check if your insurance is accepted"
                >
                  <Shield className="h-4 w-4" aria-hidden="true" />
                  Verify your insurance coverage →
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          style={{ opacity: contentOpacity }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/40">
              <path d="M10 4L10 14M10 14L5 9M10 14L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
