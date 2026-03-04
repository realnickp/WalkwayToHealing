'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary-900"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Radial glow behind logo */}
          <motion.div
            className="absolute w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(196,103,58,0.25) 0%, transparent 70%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.6, 0.3] }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            aria-hidden="true"
          />

          {/* Logo */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative h-24 w-24 sm:h-28 sm:w-28">
              <Image
                src="/logo.png"
                alt="Walkway to Healing"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                sizes="112px"
              />
            </div>
          </motion.div>

          {/* Brand name */}
          <motion.p
            className="relative z-10 font-display text-2xl sm:text-3xl font-bold text-white mt-5 tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Walkway to Healing
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="relative z-10 text-primary-200 text-sm mt-2 tracking-wider uppercase font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Recovery starts here
          </motion.p>

          {/* Animated walkway line */}
          <motion.div
            className="relative z-10 mt-8 h-[2px] rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Pulsing dot at end of line */}
          <motion.div
            className="relative z-10 -mt-[5px] ml-[160px]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0.6], scale: [0, 1, 1.3, 1] }}
            transition={{ duration: 0.6, delay: 1.9, ease: 'easeOut' }}
          >
            <div className="w-2 h-2 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
