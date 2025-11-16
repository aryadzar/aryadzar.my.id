"use client"

import type React from "react"

import useSWR from "swr"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

type NowPlaying = {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
}

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) {
    // When API is missing or failed, return a safe fallback
    return { isPlaying: false } as NowPlaying
  }
  return (await res.json()) as NowPlaying
}

export function SpotifyNowPlaying({
  className,
}: {
  className?: string
}) {
  const { data, isLoading } = useSWR<NowPlaying>("/api/spotify-now-playing", fetcher, {
    revalidateOnFocus: false,
  })

  const prefersReducedMotion = useReducedMotion()

  const isPlaying = data?.isPlaying
  const albumArt = data?.albumImageUrl || "/abstract-soundscape.png"
  const title = data?.title || "Not playing"
  const artist = data?.artist || "Spotify"
  const href = isPlaying && data?.songUrl ? data.songUrl : undefined

  if (isLoading) {
    return (
      <div
        className={[
          "flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-card-foreground",
          "transition-colors",
          className || "",
        ].join(" ")}
        aria-live="polite"
        aria-busy="true"
      >
        <div className="shrink-0">
          <div className="h-12 w-12 rounded-md ring-1 ring-border bg-muted animate-pulse" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
          <div className="h-3 w-1/3 rounded bg-muted animate-pulse" />
        </div>
        <div className="ml-auto text-xs text-muted-foreground">Loading…</div>
      </div>
    )
  }

  return (
    <div
      className={[
        "flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-card-foreground",
        "transition-colors",
        className || "",
      ].join(" ")}
      aria-live="polite"
      aria-busy="false"
      style={
        {
          // local token for spotify green (HSL) without hard-coding utility classes
          ["--spotify-green" as any]: "141 73% 42%",
        } as React.CSSProperties
      }
    >
      <div className="relative shrink-0">
        <motion.div
          aria-hidden="true"
          animate={isPlaying && !prefersReducedMotion ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isPlaying && !prefersReducedMotion
              ? { repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "linear" }
              : undefined
          }
          className="rounded-md ring-1 ring-border"
        >
          <Image
            src={albumArt || "/placeholder.svg"}
            alt={isPlaying ? `Album art for ${title}` : "Album art placeholder"}
            width={48}
            height={48}
            className="rounded-md"
          />
        </motion.div>
      </div>

      <div className="min-w-0 flex-1">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            {title}
          </a>
        ) : (
          <p className="truncate font-medium">{title}</p>
        )}
        <p className="truncate text-sm text-muted-foreground">{artist}</p>
      </div>

      <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
        <span className="hidden sm:inline">Now Playing</span>
        {!prefersReducedMotion && isPlaying ? (
          <div className="flex items-end gap-0.5" aria-label="Audio playing visualization" aria-hidden="true">
            {[
              { d: 0, h: 8 },
              { d: 0.15, h: 12 },
              { d: 0.3, h: 9 },
            ].map((bar, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0.6 }}
                animate={{ scaleY: [0.5, 1, 0.6] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.2,
                  ease: "easeInOut",
                  delay: bar.d,
                }}
                className="w-1 rounded-[1px] bg-[hsl(var(--spotify-green))]"
                style={{ height: bar.h }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SpotifyNowPlaying
