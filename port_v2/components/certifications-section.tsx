"use client"
import { motion, useReducedMotion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, BadgeCheck, ExternalLink } from "lucide-react"
import Link from "next/link"

type Certification = {
  title: string
  issuer: string
  date: string
  id?: string
  href?: string
  logoAlt: string
  logoSrc: string
}

export function CertificationsSection({
  certs,
  limit = 6,
  title = "Certifications",
}: {
  certs?: Certification[]
  limit?: number
  title?: string
}) {
  const prefersReducedMotion = useReducedMotion()

  const defaultCerts: Certification[] = [
    {
      title: "Fundamental DevOps",
      issuer: "Inixindo Bandung",
      date: "Dec 6, 2024",
      id: "024475",
      href: "#",
      logoAlt: "Inixindo Logo",
      logoSrc: "/inixindo-logo.jpg",
    },
    {
      title: "Building REST API with Golang",
      issuer: "Sinau Jogja",
      date: "Dec 16, 2022",
      href: "#",
      logoAlt: "Sinau Jogja Logo",
      logoSrc: "/sinau-jogja-logo.jpg",
    },
    {
      title: "Android Application for Beginners",
      issuer: "Dicoding Academy",
      date: "Dec 2, 2019",
      href: "#",
      logoAlt: "Dicoding Logo",
      logoSrc: "/dicoding-logo.jpg",
    },
    {
      title: "Web Programming",
      issuer: "Dicoding Academy",
      date: "Oct 14, 2019",
      href: "#",
      logoAlt: "Dicoding Logo",
      logoSrc: "/dicoding-logo.jpg",
    },
    {
      title: "MikroTik Certified Network Associate (MTCNA)",
      issuer: "MikroTik",
      date: "Jun 28, 2019",
      id: "1906NA6920",
      href: "#",
      logoAlt: "MikroTik Logo",
      logoSrc: "/mikrotik-logo.jpg",
    },
    {
      title: "Sertifikat Kompetensi",
      issuer: "SMK Negeri 4 Bandar Lampung",
      date: "May 22, 2017",
      id: "TKJ.2005201700148",
      href: "#",
      logoAlt: "Sekolah Logo",
      logoSrc: "/generic-school-logo.png",
    },
  ]

  const items = (certs?.length ? certs : defaultCerts).slice(0, limit)

  return (
    <section aria-labelledby="certifications-heading" className="py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center gap-2">
          <BadgeCheck className="size-5 text-foreground/80" aria-hidden="true" />
          <h2 id="certifications-heading" className="text-pretty text-2xl font-semibold text-foreground">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item, idx) => {
            const MotionDiv = prefersReducedMotion ? "div" : motion.div
            return (
              <MotionDiv
                key={`${item.title}-${idx}`}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.05 }}
              >
                <Card className="group relative overflow-hidden rounded-xl border-border bg-card p-5 transition-shadow">
                  {/* Hover lift effect via framer-motion on wrapper, and ring on card */}
                  <MotionDiv
                    whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                    transition={{ type: "spring", stiffness: 350, damping: 26, mass: 0.6 }}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={item.logoSrc || "/placeholder.svg"}
                        alt={item.logoAlt}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-md border border-border object-contain"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-pretty text-lg font-medium text-foreground">{item.title}</h3>
                        <p className="text-sm text-foreground/70">{item.issuer}</p>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <div className="inline-flex items-center gap-1 text-sm text-foreground/70">
                            <Calendar className="size-4" aria-hidden="true" />
                            <span>{item.date}</span>
                          </div>
                          {item.id ? (
                            <Badge variant="secondary" className="rounded-full text-xs">
                              ID: {item.id}
                            </Badge>
                          ) : null}
                        </div>

                        <div className="mt-4">
                          {item.href ? (
                            <Link
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm text-foreground/80 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                              aria-label={`View Certificate: ${item.title}`}
                            >
                              <ExternalLink className="size-4" aria-hidden="true" />
                              <span>View Certificate</span>
                            </Link>
                          ) : (
                            <span className="inline-flex items-center gap-2 text-sm text-foreground/60">
                              <ExternalLink className="size-4" aria-hidden="true" />
                              <span>View Certificate</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </MotionDiv>

                  {/* focus/hover ring using tokens, no hard-coded colors */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-ring transition-[ring-width] group-hover:ring-1 group-focus-within:ring-1" />
                </Card>
              </MotionDiv>
            )
          })}
        </div>
      </div>
    </section>
  )
}
