"use client"

import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { Pagination } from "@/components/pagination"

type Project = {
  title: string
  description: string
  image?: string
  href?: string
  tags?: string[]
}

const ALL_PROJECTS: Project[] = [
  {
    title: "Portfolio Website",
    description: "Situs pribadi modern.",
    image: "/creative-portfolio-layout.png",
    tags: ["Next.js", "Tailwind"],
    href: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Pantau KPI secara real-time.",
    image: "/general-data-dashboard.png",
    tags: ["Recharts", "API"],
    href: "#",
  },
  {
    title: "E-commerce UI",
    description: "Fokus konversi & aksesibilitas.",
    image: "/ecommerce-concept.png",
    tags: ["UI/UX", "A11y"],
    href: "#",
  },
  {
    title: "Chat App",
    description: "Real-time chat dengan AI reply.",
    image: "/modern-chat-app.png",
    tags: ["AI", "WebSocket"],
    href: "#",
  },
  {
    title: "Docs Site",
    description: "Dokumentasi yang rapi & cepat.",
    image: "/docs-site.jpg",
    tags: ["MDX", "Search"],
    href: "#",
  },
  {
    title: "Landing SaaS",
    description: "Landing page untuk SaaS.",
    image: "/saas-landing.jpg",
    tags: ["Marketing"],
    href: "#",
  },
  {
    title: "Photo Gallery",
    description: "Galeri responsif & cepat.",
    image: "/art-gallery.png",
    tags: ["Images"],
    href: "#",
  },
  {
    title: "Task Manager",
    description: "Produktivitas harian.",
    image: "/tasks-list.png",
    tags: ["State"],
    href: "#",
  },
  {
    title: "Finance Tracker",
    description: "Kelola pengeluaran/pendapatan.",
    image: "/finance-growth.png",
    tags: ["Charts"],
    href: "#",
  },
  {
    title: "Blog Engine",
    description: "Mesin blog minimalis.",
    image: "/blog-engine.jpg",
    tags: ["Content"],
    href: "#",
  },
  {
    title: "Booking App",
    description: "Reservasi waktu slot.",
    image: "/online-booking-concept.png",
    tags: ["Calendar"],
    href: "#",
  },
  {
    title: "Maps Explorer",
    description: "Eksplorasi peta & tempat.",
    image: "/maps.jpg",
    tags: ["Maps"],
    href: "#",
  },
]

export default function ProjectsIndexPage() {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 6
  const prefersReduced = useReducedMotion()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_PROJECTS
    return ALL_PROJECTS.filter((p) => {
      const inTitle = p.title.toLowerCase().includes(q)
      const inDesc = p.description.toLowerCase().includes(q)
      const inTags = (p.tags || []).some((t) => t.toLowerCase().includes(q))
      return inTitle || inDesc || inTags
    })
  }, [query])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const current = Math.min(page, totalPages)
  const startIndex = (current - 1) * perPage
  const pageItems = filtered.slice(startIndex, startIndex + perPage)

  const container = { hidden: {}, show: { transition: { staggerChildren: prefersReduced ? 0 : 0.06 } } }
  const item = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  }

  return (
    <main className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <header className="mb-6 md:mb-8">
          <h1 className="text-balance text-3xl font-semibold md:text-4xl">Semua Proyek</h1>
          <p className="mt-2 text-muted-foreground">Pencarian dan pagination untuk menjelajah proyek saya.</p>
        </header>

        <div className="mb-6">
          <SearchBar
            value={query}
            onChange={(v) => {
              setQuery(v)
              setPage(1)
            }}
            placeholder="Cari proyek berdasarkan judul, deskripsi, atau tag…"
          />
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          {total} hasil • halaman {current}/{totalPages}
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {pageItems.map((p, idx) => (
            <motion.div
              key={p.title + idx}
              variants={item}
              whileHover={prefersReduced ? undefined : { y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 250, damping: 24 }}
            >
              <Card className="group h-full overflow-hidden border-border bg-card text-card-foreground transition hover:shadow-lg hover:border-foreground/20">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={p.image || "/placeholder.svg?height=360&width=640&query=project%20cover"}
                    alt={`Gambar proyek ${p.title}`}
                    className="h-full w-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-pretty text-lg">{p.title}</CardTitle>
                  {p.tags && p.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {p.tags.slice(0, 6).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <CardDescription className="text-pretty">{p.description}</CardDescription>
                  <div>
                    <Button asChild variant="default" className="bg-primary text-primary-foreground">
                      <a
                        href={
                          p.href ||
                          `/projects/${encodeURIComponent(
                            p.title
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")
                              .replace(/(^-|-$)/g, ""),
                          )}`
                        }
                        target={p.href ? "_blank" : undefined}
                        rel={p.href ? "noopener noreferrer" : undefined}
                        aria-label={`Lihat detail proyek ${p.title}`}
                      >
                        Lihat Detail
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Pagination total={total} page={current} perPage={perPage} onPageChange={setPage} className="mt-8" />
      </div>
    </main>
  )
}
