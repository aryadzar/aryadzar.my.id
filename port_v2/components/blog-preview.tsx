"use client"
import { motion, useReducedMotion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type BlogPost = {
  title: string
  excerpt: string
  image?: string
  date?: string
  href?: string
  tags?: string[]
}

export function BlogPreview({
  posts,
  title = "Blog Terbaru",
  subtitle = "Tiga tulisan terakhir yang saya publikasikan",
  limit = 3,
}: {
  posts?: BlogPost[]
  title?: string
  subtitle?: string
  limit?: number
}) {
  const prefersReduced = useReducedMotion()

  const defaults: BlogPost[] = [
    {
      title: "Mendesain Hero Video yang Aksesibel",
      excerpt:
        "Praktik terbaik agar hero video tetap cepat, dapat diakses, dan pesan tetap terbaca di semua perangkat.",
      image: "/blog-accessibility.jpg",
      date: "2025-09-14",
      href: "#",
      tags: ["A11y", "Performance"],
    },
    {
      title: "Bento Grid untuk Landing Page Modern",
      excerpt: "Menggunakan grid responsif untuk menyajikan konten yang kaya tanpa mengorbankan keterbacaan.",
      image: "/bento-grid-ui.jpg",
      date: "2025-08-02",
      href: "#",
      tags: ["UI", "Layout"],
    },
    {
      title: "Optimasi Gambar dengan Token Warna",
      excerpt: "Mengapa penting menjaga konsistensi tema dan kontras ketika menampilkan gambar di komponen kartu.",
      image: "/design-tokens.jpg",
      date: "2025-07-10",
      href: "#",
      tags: ["Design System"],
    },
  ]

  const maxItems = Math.min(limit ?? 3, 3)
  const displayed = (posts && posts.length > 0 ? posts : defaults).slice(0, maxItems)

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReduced ? 0 : 0.08 } },
  }

  const item = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <section aria-labelledby="blog-title" className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <header className="mb-8 md:mb-10">
          <h2 id="blog-title" className="text-balance text-2xl font-semibold md:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">{subtitle}</p>
        </header>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {displayed.map((post, idx) => (
            <motion.article
              key={post.title + idx}
              variants={item}
              whileHover={prefersReduced ? undefined : { y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 250, damping: 24 }}
              className="h-full"
            >
              <Card className="group h-full overflow-hidden border-border bg-card text-card-foreground transition hover:shadow-lg hover:border-foreground/20 focus-within:shadow-lg">
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
                      {post.tags.slice(0, 4).map((t) => (
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
                        href={post.href || "#"}
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
      </div>
    </section>
  )
}
