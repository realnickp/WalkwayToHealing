'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Phone, ChevronRight, Shield, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { brandFilm } from '@/config/videos'

const words = ['Recovery', 'starts', 'with', 'one', 'honest', 'step.']

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.5,
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
    <section
      className="relative overflow-hidden py-14 md:py-20 lg:min-h-[calc(100vh-6rem)] lg:flex lg:items-center"
      aria-labelledby="hero-heading"
    >
      {/* Backdrop */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={shouldReduceMotion ? {} : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
        >
          <Image
            src="/images/walking-toward-light.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-stone-950/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/40 to-stone-950/70" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-center">
          {/* ── Copy ── */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6"
            >
              <span className="flex items-center gap-1.5 bg-white/10 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20">
                <Heart className="h-3 w-3" aria-hidden="true" />
                Serving All of Maryland
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20">
                <Shield className="h-3 w-3" aria-hidden="true" />
                Accepts Maryland Medicaid
              </span>
            </motion.div>

            <h1
              id="hero-heading"
              className="font-display text-[clamp(2.1rem,4.4vw,3.9rem)] font-bold text-white leading-[1.08] mb-5"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 28, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.5,
                    delay: 0.25 + i * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="inline-block"
                  style={{ marginRight: i < words.length - 1 ? '0.26em' : 0 }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.div
              className="h-1 rounded-full bg-accent mb-6 mx-auto lg:mx-0"
              initial={{ width: 0 }}
              animate={{ width: 88 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            <motion.div variants={container} initial="hidden" animate="show">
              <motion.p
                variants={item}
                className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Walkway to Healing offers compassionate, outpatient substance use
                treatment in Baltimore. We accept Maryland Medicaid — and our team
                understands what you&apos;re going through because many of us have
                lived it.
              </motion.p>

              <motion.div
                variants={item}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-5"
              >
                <Button size="xl" variant="accent" asChild className="shadow-lg shadow-accent/30">
                  <Link href="/intake">
                    Start Your Intake
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline-white" asChild>
                  <a href={`tel:${siteConfig.contact.phone}`}>
                    <Phone className="h-4 w-4" />
                    {siteConfig.contact.phoneFormatted}
                  </a>
                </Button>
              </motion.div>

              <motion.div variants={item}>
                <Link
                  href="/verify-insurance"
                  className="inline-flex items-center gap-2 text-white/75 hover:text-white text-sm font-medium transition-colors duration-150"
                  aria-label="Check if your insurance is accepted"
                >
                  <Shield className="h-4 w-4" aria-hidden="true" />
                  Verify your insurance coverage →
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* ── The film, playing right here ── */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Ambient brand glow behind the frame */}
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2rem] bg-gradient-to-tr from-accent/25 via-primary/20 to-accent/25 blur-2xl"
            />

            <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl bg-stone-950">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${brandFilm.id}?rel=0&modestbranding=1&playsinline=1`}
                  title={brandFilm.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Caption rail */}
              <div className="flex items-center justify-between gap-4 bg-stone-950/90 border-t border-white/10 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-accent-light text-[10px] font-semibold uppercase tracking-[0.18em]">
                    Our Story · {brandFilm.duration}
                  </p>
                  <p className="font-display text-white text-base sm:text-lg font-bold leading-tight truncate">
                    {brandFilm.title}
                  </p>
                </div>
                <p className="hidden sm:block text-white/50 text-xs text-right shrink-0 max-w-[11rem] leading-snug">
                  Clients, counselors, and leadership — in their own voices.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
