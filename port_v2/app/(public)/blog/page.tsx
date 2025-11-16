"use client"

import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { Pagination } from "@/components/pagination"

type Post = {
  title: string
  excerpt: string
  image?: string
  date?: string
  href?: string
  tags?: string[]
}

const ALL_POSTS: Post[] = [
  {
    title: "Mendesain Hero Video yang Aksesibel",
    excerpt: "Best practice hero video yang cepat dan terbaca.",
    image: "/hero-video.jpg",
    date: "2025-09-14",
    tags: ["A11y", "Performance"],
    href: "#",
  },
  {
    title: "Bento Grid untuk Landing Page Modern",
    excerpt: "Grid responsif untuk konten kaya.",
    image: "/bento-grid.jpg",
    date: "2025-08-02",
    tags: ["UI", "Layout"],
    href: "#",
  },
  {
    title: "Optimasi Gambar dengan Token Warna",
    excerpt: "Konsistensi tema dan kontras di kartu.",
    image: "/design-tokens.jpg",
    date: "2025-07-10",
    tags: ["Design System"],
    href: "#",
  },
  {
    title: "Tips Performance Next.js",
    excerpt: "Teknik sederhana tingkatkan Lighthouse.",
    image: "/stage-performance.png",
    date: "2025-06-11",
    tags: ["Next.js", "Perf"],
    href: "#",
  },
  {
    title: "UI yang Ramah Pembaca",
    excerpt: "Line-length dan leading yang ideal.",
    image: "/typography-collage.png",
    date: "2025-05-16",
    tags: ["Typography"],
    href: "#",
  },
  {
    title: "Aksesibilitas Dasar",
    excerpt: "Mulai dari alt text dan fokus states.",
    image: "/accessibility.jpg",
    date: "2025-04-03",
    tags: ["A11y"],
    href: "#",
  },
  {
    title: "Arsitektur App Router",
    excerpt: "Pola halaman, RSC, dan actions.",
    image: "/app-router.jpg",
    date: "2025-03-14",
    tags: ["Next.js"],
    href: "#",
  },
  {
    title: "SWR untuk Data Client",
    excerpt: "Cache dan revalidate dengan elegan.",
    image: "/swr.jpg",
    date: "2025-02-10",
    tags: ["SWR"],
    href: "#",
  },
  {
    title: "Recharts di shadcn",
    excerpt: "Chart yang serasi dengan tema.",
    image: "/charts.jpg",
    date: "2024-12-21",
    tags: ["Charts"],
    href: "#",
  },
  {
    title: "Form UX Cepat",
    excerpt: "Validasi dan affordance yang jelas.",
    image: "/forms.jpg",
    date: "2024-11-08",
    tags: ["Forms"],
    href: "#",
  },
  {
    title: "Pattern Layout Grid",
    excerpt: "Kapan pakai Flex vs Grid.",
    image: "/abstract-geometric-layout.png",
    date: "2024-10-01",
    tags: ["Layout"],
    href: "#",
  },
  {
    title: "Dark Mode yang Mantap",
    excerpt: "Kontras dan token warna.",
    image: "/dark-mode.jpg",
    date: "2024-09-12",
    tags: ["Theme"],
    href: "#",
  },
]

export default function BlogIndexPage() {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 6
  const prefersReduced = useReducedMotion()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_POSTS
    return ALL_POSTS.filter((p) => {
      const inTitle = p.title.toLowerCase().includes(q)
      const inExcerpt = p.excerpt.toLowerCase().includes(q)
      const inTags = (p.tags || []).some((t) => t.toLowerCase().includes(q))
      return inTitle || inExcerpt || inTags
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
          <h1 className="text-balance text-3xl font-semibold md:text-4xl">Semua Blog</h1>
          <p className="mt-2 text-muted-foreground">Cari artikel dan jelajahi arsip tulisan saya.</p>
        </header>

        <div className="mb-6">
          <SearchBar
            value={query}
            onChange={(v) => {
              setQuery(v)
              setPage(1)
            }}
            placeholder="Cari blog berdasarkan judul, ringkas, atau tag…"
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
          {pageItems.map((post, idx) => (
            <motion.article
              key={post.title + idx}
              variants={item}
              whileHover={prefersReduced ? undefined : { y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 250, damping: 24 }}
            >
              <Card className="group h-full overflow-hidden border-border bg-card text-card-foreground transition hover:shadow-lg hover:border-foreground/20">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg?height=360&width=640&query=blog%20cover"}
                    alt={`Gambar untuk ${post.title}`}
                    className="h-full w-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-pretty text-lg">{post.title}</CardTitle>
                  {post.date ? (
                    <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
                  ) : null}
                  {post.tags && post.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 6).map((t) => (
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
                  <CardDescription className="text-pretty">{post.excerpt}</CardDescription>
                  <div>
                    <Button asChild variant="default" className="bg-primary text-primary-foreground">
                      <a
                        href={
                          post.href ||
                          `/blog/${encodeURIComponent(
                            post.title
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")
                              .replace(/(^-|-$)/g, ""),
                          )}`
                        }
                        target={post.href ? "_blank" : undefined}
                        rel={post.href ? "noopener noreferrer" : undefined}
                        aria-label={`Baca selengkapnya: ${post.title}`}
                      >
                        Baca Selengkapnya
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>

        <Pagination total={total} page={current} perPage={perPage} onPageChange={setPage} className="mt-8" />
      </div>
    </main>
  )
}
