'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface YouTubeEmbedProps {
  videoId: string
  title: string
  role?: string
  description?: string
  className?: string
}

/**
 * Thumbnail card that opens the video in a popup player with a
 * description below. Only the thumbnail loads until clicked, so a
 * page full of videos stays fast.
 */
export function YouTubeEmbed({ videoId, title, role, description, className }: YouTubeEmbedProps) {
  const [thumbFallback, setThumbFallback] = useState(false)

  const thumbnail = thumbFallback
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Play video: ${title}`}
          className={cn(
            'group relative block w-full aspect-video rounded-2xl overflow-hidden bg-stone-900 ring-1 ring-black/10 shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/60',
            className
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            onError={() => setThumbFallback(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Play className="h-6 w-6 sm:h-7 sm:w-7 text-primary translate-x-0.5" fill="currentColor" />
            </span>
          </span>
        </button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          'w-[calc(100%-2rem)] max-w-3xl sm:max-w-3xl p-0 gap-0 overflow-hidden rounded-2xl',
          '[&>button]:bg-white/90 [&>button]:rounded-full [&>button]:p-2 [&>button]:opacity-100 [&>button]:shadow-md [&>button:hover]:bg-white'
        )}
      >
        <div className="aspect-video w-full bg-stone-900">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-6 sm:p-7">
          <DialogTitle className="font-display text-xl sm:text-2xl font-bold text-stone-900">
            {title}
          </DialogTitle>
          {role && <p className="text-primary text-sm font-medium mt-1">{role}</p>}
          {description && (
            <DialogDescription className="text-stone-600 text-sm sm:text-base leading-relaxed mt-3">
              {description}
            </DialogDescription>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
