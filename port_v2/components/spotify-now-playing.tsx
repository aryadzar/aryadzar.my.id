"use client";

import type React from "react";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "@/lib/getNowPlaying";
import { cn } from "@/lib/utils";

export function SpotifyNowPlaying({ className }: { className?: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["spotify"],
    queryFn: () => getNowPlaying(),
  });

  const prefersReducedMotion = useReducedMotion();

  const isPlaying = data?.isPlaying;
  const albumArt = data?.albumImageUrl || "/placeholder.svg";
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
      className={cn(
        "group relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 p-3",
        "bg-white/5 backdrop-blur-md dark:bg-black/20",
        "transition-all duration-300 hover:border-green-500/50 hover:bg-white/10 dark:hover:bg-black/40",
        className
      )}
      aria-live="polite"
      aria-busy="false"
    >
      {isPlaying && !prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-20">
          <motion.div
            animate={{
              x: ["-100%", "0%"],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute inset-0 w-[200%] bg-[linear-gradient(90deg,transparent_0%,rgba(34,197,94,0.3)_50%,transparent_100%)]"
          />
        </div>
      )}

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
          className="overflow-hidden rounded-lg ring-1 ring-white/10"
        >
          <Image
            src={albumArt || "/placeholder.svg"}
            alt={isPlaying ? `Album art for ${title}` : "Album art placeholder"}
            width={48}
            height={48}
            className="object-cover rounded-lg"
          />
        </motion.div>
        {isPlaying && (
          <div className="absolute w-3 h-3 bg-green-500 rounded-full -bottom-1 -right-1 ring-2 ring-background animate-pulse" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-medium truncate transition-colors rounded text-foreground hover:text-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
          >
            {title}
          </a>
        ) : (
          <p className="font-medium truncate text-foreground">{title}</p>
        )}
        <p className="text-xs truncate text-muted-foreground">{artist}</p>
      </div>

      <div className="flex items-center gap-2 ml-auto text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        <span className="hidden sm:inline">Now Playing</span>
        {!prefersReducedMotion && isPlaying ? (
          <div
            className="flex items-end gap-0.5 h-3"
            aria-label="Audio playing visualization"
            aria-hidden="true"
          >
            {[
              { d: 0, h: "60%" },
              { d: 0.2, h: "100%" },
              { d: 0.4, h: "75%" },
              { d: 0.6, h: "90%" },
            ].map((bar, i) => (
              <motion.div
                key={i}
                animate={{
                  height: ["20%", "100%", "20%"],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 0.8 + Math.random() * 0.4,
                  ease: "easeInOut",
                  delay: bar.d,
                }}
                className="w-1 bg-green-500 rounded-full"
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SpotifyNowPlaying;
