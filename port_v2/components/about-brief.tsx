"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

type AboutBriefProps = {
  photoSrc: string
  name: string
  title?: string
  description: string
  actions?: ReactNode // new optional prop for buttons/links
}

export function AboutBrief({ photoSrc, name, title, description, actions }: AboutBriefProps) {
  const prefersReduced = useReducedMotion()
  return (
    <section id="about" aria-labelledby="about-heading" className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <h2 id="about-heading" className="text-balance text-2xl font-semibold tracking-tight">
          Tentang Saya
        </h2>
        <div className="mt-6 flex flex-col items-start gap-6 md:mt-8 md:flex-row md:gap-8">
          <motion.img
            src={photoSrc || "/placeholder.svg?height=300&width=300&query=profile photo placeholder"}
            alt={`Foto ${name}`}
            width={300}
            height={300}
            className="h-56 w-56 rounded-xl object-cover ring-1 ring-border"
            loading="lazy"
            initial={{ opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={prefersReduced ? undefined : { scale: 1.02 }}
          />
          <motion.div
            className="flex-1"
            initial={{ opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: prefersReduced ? 0 : 0.05 }}
          >
            <div className="mb-2">
              <p className="text-pretty text-xl font-medium">{name}</p>
              {title ? <p className="text-pretty text-muted-foreground">{title}</p> : null}
            </div>
            <p className="text-pretty leading-relaxed text-foreground/90">{description}</p>
            {actions ? <div className="mt-4 flex flex-wrap gap-3">{actions}</div> : null}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
