'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize, SkipBack, SkipForward } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/AnimatedSection'

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-20% 0px' })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasAutoPlayed = useRef(false)

  // Autoplay when section scrolls into view
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInView && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true
      const timer = setTimeout(() => {
        setIntroComplete(true)
        video.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          // autoplay blocked — that's fine
        })
      }, 1800)
      return () => clearTimeout(timer)
    }

    if (!isInView && hasAutoPlayed.current) {
      video.pause()
      setIsPlaying(false)
    }
  }, [isInView])

  const scheduleHide = useCallback(() => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    setShowControls(true)
    if (isPlaying && !isDragging) {
      hideTimeout.current = setTimeout(() => setShowControls(false), 3000)
    }
  }, [isPlaying, isDragging])

  useEffect(() => {
    scheduleHide()
    return () => { if (hideTimeout.current) clearTimeout(hideTimeout.current) }
  }, [isPlaying, scheduleHide])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onTime = () => setCurrentTime(video.currentTime)
    const onMeta = () => setDuration(video.duration)
    video.addEventListener('timeupdate', onTime)
    video.addEventListener('loadedmetadata', onMeta)
    return () => {
      video.removeEventListener('timeupdate', onTime)
      video.removeEventListener('loadedmetadata', onMeta)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const skip = (delta: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + delta))
  }

  const restart = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.play()
    setIsPlaying(true)
  }

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    const bar = progressRef.current
    if (!video || !bar) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    video.currentTime = ratio * video.duration
  }

  const goFullscreen = () => {
    const video = videoRef.current
    if (!video) return
    if (video.requestFullscreen) video.requestFullscreen()
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-cream relative overflow-hidden"
      aria-labelledby="video-section-heading"
    >
      <div className="container mx-auto">
        {/* Centered header */}
        <AnimatedSection className="text-center mb-10 md:mb-14">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">
            About Our Program
          </p>
          <h2
            id="video-section-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-5 text-balance"
          >
            See what recovery looks like.
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed max-w-2xl mx-auto">
            At Walkway to Healing, we offer flexible outpatient programs
            built around your life — not the other way around. Our team
            includes counselors and peers who have walked this road themselves.
          </p>
        </AnimatedSection>

        {/* Video — center stage */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Animated glow that pulses in */}
            <motion.div
              className="absolute -inset-4 rounded-3xl blur-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(27,107,90,0.25), rgba(196,103,58,0.2), rgba(27,107,90,0.25))' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 0.7, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              aria-hidden="true"
            />

            {/* Video container */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-900 aspect-video ring-1 ring-black/10 group"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 60, scale: 0.92 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              onMouseMove={scheduleHide}
              onMouseEnter={() => setShowControls(true)}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
                aria-label="Walkway to Healing program overview video"
                onEnded={() => { setIsPlaying(false); setShowControls(true) }}
                onClick={togglePlay}
              >
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support video playback.
              </video>

              {/* Cinematic intro overlay — plays before video starts */}
              <AnimatePresence>
                {isInView && !introComplete && (
                  <motion.div
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-stone-950 overflow-hidden"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    {/* Horizontal film grain lines */}
                    <motion.div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 3px)',
                      }}
                      aria-hidden="true"
                    />

                    {/* Expanding ring */}
                    <motion.div
                      className="absolute w-40 h-40 rounded-full border-2 border-accent/40"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 3, 5], opacity: [0, 0.5, 0] }}
                      transition={{ duration: 1.6, delay: 0.2, ease: 'easeOut' }}
                      aria-hidden="true"
                    />

                    {/* Play triangle that morphs in */}
                    <motion.div
                      initial={{ scale: 0, rotate: -90, opacity: 0 }}
                      animate={{ scale: [0, 1.2, 1], rotate: [-90, 10, 0], opacity: [0, 1, 1] }}
                      transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/30">
                        <Play className="h-8 w-8 sm:h-9 sm:w-9 text-white ml-0.5" fill="currentColor" aria-hidden="true" />
                      </div>
                    </motion.div>

                    {/* Text reveal */}
                    <motion.p
                      className="text-white font-display text-xl sm:text-2xl font-bold mt-5 tracking-tight"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      Our Story
                    </motion.p>

                    {/* Accent line draws under text */}
                    <motion.div
                      className="h-[2px] rounded-full bg-accent mt-3"
                      initial={{ width: 0 }}
                      animate={{ width: 80 }}
                      transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />

                    {/* Tagline */}
                    <motion.p
                      className="text-white/50 text-xs sm:text-sm mt-3 tracking-widest uppercase"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.1 }}
                    >
                      Walkway to Healing
                    </motion.p>

                    {/* Wipe-out: two panels slide apart */}
                    <motion.div
                      className="absolute top-0 left-0 bottom-0 w-1/2 bg-stone-950 z-30"
                      initial={{ x: 0 }}
                      animate={{ x: '-100%' }}
                      transition={{ duration: 0.5, delay: 1.5, ease: [0.76, 0, 0.24, 1] }}
                    />
                    <motion.div
                      className="absolute top-0 right-0 bottom-0 w-1/2 bg-stone-950 z-30"
                      initial={{ x: 0 }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 0.5, delay: 1.5, ease: [0.76, 0, 0.24, 1] }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tap-to-play/pause center indicator (brief flash) */}
              <AnimatePresence>
                {introComplete && !isPlaying && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/30 z-10 cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={togglePlay}
                  >
                    <motion.button
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/90 flex items-center justify-center shadow-xl shadow-accent/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Play video"
                    >
                      <Play className="h-7 w-7 sm:h-8 sm:w-8 text-white ml-0.5" fill="currentColor" aria-hidden="true" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Full control bar */}
              <AnimatePresence>
                {introComplete && showControls && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-12 pb-3 px-4 z-10"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Progress bar */}
                    <div
                      ref={progressRef}
                      className="w-full h-1.5 bg-white/20 rounded-full mb-3 cursor-pointer group/bar relative"
                      onClick={seekTo}
                      onMouseDown={() => setIsDragging(true)}
                      onMouseUp={() => setIsDragging(false)}
                      role="slider"
                      aria-label="Video progress"
                      aria-valuenow={Math.round(progress)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full bg-accent rounded-full relative transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Buttons row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={togglePlay}
                          className="text-white hover:text-accent transition-colors p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="h-5 w-5" fill="currentColor" />}
                        </button>

                        <button
                          onClick={() => skip(-10)}
                          className="text-white/70 hover:text-white transition-colors p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          aria-label="Rewind 10 seconds"
                        >
                          <SkipBack className="h-4 w-4" aria-hidden="true" />
                        </button>

                        <button
                          onClick={() => skip(10)}
                          className="text-white/70 hover:text-white transition-colors p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          aria-label="Forward 10 seconds"
                        >
                          <SkipForward className="h-4 w-4" aria-hidden="true" />
                        </button>

                        <button
                          onClick={restart}
                          className="text-white/70 hover:text-white transition-colors p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          aria-label="Restart video"
                        >
                          <RotateCcw className="h-4 w-4" aria-hidden="true" />
                        </button>

                        <span className="text-white/60 text-xs font-mono ml-2 select-none">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={toggleMute}
                          className="text-white/70 hover:text-white transition-colors p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>

                        <button
                          onClick={goFullscreen}
                          className="text-white/70 hover:text-white transition-colors p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          aria-label="Fullscreen"
                        >
                          <Maximize className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Text + CTAs below video */}
        <AnimatedSection delay={0.15} className="text-center mt-10 max-w-2xl mx-auto">
          <p className="text-stone-600 leading-relaxed mb-8">
            From Level 1 Outpatient to Partial Hospitalization, we meet
            people where they are and help them build a foundation for
            lasting change. We accept Maryland Medicaid and offer support
            for housing, transportation, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/intake"
              className="inline-flex items-center justify-center h-12 px-7 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors duration-150"
            >
              Start Your Intake
            </a>
            <a
              href="/programs"
              className="inline-flex items-center justify-center h-12 px-7 rounded-lg border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-colors duration-150"
            >
              Explore Programs
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
