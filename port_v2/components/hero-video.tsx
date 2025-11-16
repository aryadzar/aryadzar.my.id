"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "framer-motion"

type VideoSource = {
  src: string
  type: string
}

type HeroVideoBackgroundProps = {
  title: string
  subtitle?: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  sources?: VideoSource[]
  poster?: string
  overlayClassName?: string
  className?: string
}

export function HeroVideoBackground({
}: HeroVideoBackgroundProps) {
  const prefersReduced = useReducedMotion()


  return (
    <section
      aria-label="Hero dengan video latar belakang"
      className={cn("relative isolate min-h-[80vh] overflow-hidden bg-background")}
    >
      {/* Video latar (dekoratif) */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source key={s.src} src={s.src} type={s.type} />
        Your browser does not support the video tag.
      </video>

      {/* Overlay untuk keterbacaan teks */}
      <motion.div
        className={cn("absolute inset-0")}
        aria-hidden="true"
        initial={{ opacity: prefersReduced ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Konten */}
      <div className="relative z-10">
        <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center px-4 py-16 md:py-24">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
            {subtitle ? <p className="mt-4 text-pretty text-lg md:text-xl text-muted-foreground">{subtitle}</p> : null}

            {(ctaPrimary || ctaSecondary) && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {ctaPrimary ? (
                  <Button asChild size="lg">
                    <a href={ctaPrimary.href}>{ctaPrimary.label}</a>
                  </Button>
                ) : null}
                {ctaSecondary ? (
                  <Button asChild size="lg" variant="secondary">
                    <a href={ctaSecondary.href}>{ctaSecondary.label}</a>
                  </Button>
                ) : null}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
