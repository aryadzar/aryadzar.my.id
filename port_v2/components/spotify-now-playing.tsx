"use client";

import type React from "react";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "@/lib/getNowPlaying";
import { cn } from "@/lib/utils";
import { Disc3, ExternalLink, Music, Play } from "lucide-react";

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
        className={cn(
          "relative flex items-center gap-3 rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 p-4 backdrop-blur-md",
          "transition-all duration-300",
          className,
        )}
        aria-live="polite"
        aria-busy="true"
      >
        <div className="shrink-0">
          <div className="w-14 h-14 rounded-xl bg-muted/50 animate-pulse ring-1 ring-border/50" />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="w-3/4 h-4 rounded-md bg-muted/50 animate-pulse" />
          <div className="w-1/2 h-3 rounded-md bg-muted/50 animate-pulse" />
        </div>
        <div className="ml-auto">
          <div className="w-6 h-6 rounded-full bg-muted/50 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4",
        "transition-all duration-500",
        isPlaying
          ? "border-green-500/30 bg-gradient-to-br from-green-500/5 via-card/80 to-card/40 shadow-lg shadow-green-500/5"
          : "border-border/50 bg-gradient-to-br from-card/80 to-card/40",
        "hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10",
        "backdrop-blur-md",
        className,
      )}
      aria-live="polite"
      aria-busy="false"
    >
      {/* Animated background gradient for playing state */}
      {isPlaying && !prefersReducedMotion && (
        <>
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute inset-0 w-[200%] bg-[linear-gradient(90deg,transparent_0%,rgba(34,197,94,0.4)_50%,transparent_100%)]"
            />
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 group-hover:opacity-100" />
        </>
      )}

      {/* Album Art Section */}
      <div className="relative shrink-0">
        <motion.div
          aria-hidden="true"
          animate={
            isPlaying && !prefersReducedMotion
              ? { rotate: [0, 360] }
              : { rotate: 0 }
          }
          transition={
            isPlaying && !prefersReducedMotion
              ? {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 10,
                  ease: "linear",
                }
              : undefined
          }
          className={cn(
            "relative overflow-hidden rounded-xl ring-1 transition-all duration-300",
            isPlaying
              ? "ring-green-500/30 shadow-lg shadow-green-500/20"
              : "ring-border/50",
          )}
        >
          <Image
            src={albumArt}
            alt={isPlaying ? `Album art for ${title}` : "Album art placeholder"}
            width={56}
            height={56}
            className="object-cover w-14 h-14 rounded-xl"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
        </motion.div>

        {/* Playing indicator badge */}
        {isPlaying ? (
          <div className="absolute flex items-center gap-1 -bottom-1 -right-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut",
              }}
              className="w-3 h-3 bg-green-500 rounded-full shadow-lg ring-2 ring-background shadow-green-500/50"
            />
          </div>
        ) : (
          <div className="absolute -bottom-1 -right-1">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted/80 backdrop-blur-sm ring-2 ring-background">
              <Music className="w-3 h-3 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* Song Info Section */}
      <div className="flex-1 min-w-0">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block space-y-1 group/link"
          >
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold truncate transition-colors text-foreground group-hover/link:text-green-500 line-clamp-1">
                {title}
              </p>
              <ExternalLink className="w-3 h-3 text-green-500 transition-opacity opacity-0 shrink-0 group-hover/link:opacity-100" />
            </div>
            <p className="text-xs truncate text-muted-foreground line-clamp-1">
              {artist}
            </p>
          </a>
        ) : (
          <div className="space-y-1">
            <p className="text-sm font-semibold truncate text-foreground line-clamp-1">
              {title}
            </p>
            <p className="text-xs truncate text-muted-foreground line-clamp-1">
              {artist}
            </p>
          </div>
        )}

        {/* Status text */}
        <div className="flex items-center gap-1.5 mt-1">
          <Disc3
            className={cn(
              "w-3 h-3 transition-colors",
              isPlaying ? "text-green-500" : "text-muted-foreground",
            )}
          />
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {isPlaying ? "Now Playing" : "Offline"}
          </span>
        </div>
      </div>

      {/* Audio Visualizer */}
      <div className="flex items-center gap-2 ml-auto">
        {!prefersReducedMotion && isPlaying ? (
          <div
            className="flex items-end h-8 gap-1 px-2"
            aria-label="Audio playing visualization"
            aria-hidden="true"
          >
            {[
              { d: 0, h: "60%" },
              { d: 0.15, h: "100%" },
              { d: 0.3, h: "75%" },
              { d: 0.45, h: "90%" },
              { d: 0.6, h: "65%" },
            ].map((bar, i) => (
              <motion.div
                key={i}
                animate={{
                  height: ["30%", "100%", "30%"],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1 + Math.random() * 0.5,
                  ease: "easeInOut",
                  delay: bar.d,
                }}
                className="w-1 rounded-full shadow-sm bg-gradient-to-t from-green-500 to-green-400 shadow-green-500/50"
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/30">
            {isPlaying ? (
              <Play className="w-4 h-4 text-green-500 fill-green-500" />
            ) : (
              <Music className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        )}
      </div>

      {/* Spotify logo watermark */}
      <div className="absolute transition-opacity duration-300 opacity-0 bottom-2 right-2 group-hover:opacity-100">
        <svg
          className="w-4 h-4 text-green-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      </div>
    </div>
  );
}

export default SpotifyNowPlaying;
