"use client";

import type React from "react";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "@/lib/getNowPlaying";

export function SpotifyNowPlaying({ className }: { className?: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["spotify"],
    queryFn: () => getNowPlaying(),
  });

  const prefersReducedMotion = useReducedMotion();

  const isPlaying = data?.isPlaying;
  const albumArt = data?.albumImageUrl || "/abstract-soundscape.png";
  const title = data?.title || "Not playing";
  const artist = data?.artist || "Spotify";
  const href = isPlaying && data?.songUrl ? data.songUrl : undefined;

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
          <div className="w-12 h-12 rounded-md ring-1 ring-border bg-muted animate-pulse" />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="w-2/3 h-4 rounded bg-muted animate-pulse" />
          <div className="w-1/3 h-3 rounded bg-muted animate-pulse" />
        </div>
        <div className="ml-auto text-xs text-muted-foreground">Loading…</div>
      </div>
    );
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
          animate={
            isPlaying && !prefersReducedMotion ? { rotate: 360 } : { rotate: 0 }
          }
          transition={
            isPlaying && !prefersReducedMotion
              ? {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 8,
                  ease: "linear",
                }
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

      <div className="flex-1 min-w-0">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-medium truncate rounded hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {title}
          </a>
        ) : (
          <p className="font-medium truncate">{title}</p>
        )}
        <p className="text-sm truncate text-muted-foreground">{artist}</p>
      </div>

      <div className="flex items-center gap-2 ml-auto text-xs text-muted-foreground">
        <span className="hidden sm:inline">Now Playing</span>
        {!prefersReducedMotion && isPlaying ? (
          <div
            className="flex items-end gap-0.5"
            aria-label="Audio playing visualization"
            aria-hidden="true"
          >
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
  );
}

export default SpotifyNowPlaying;
