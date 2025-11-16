"use client"
import { motion, useReducedMotion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Project = {
  title: string
  description: string
  image: string
  href?: string
  tags?: string[]
}

export function ProjectsShowcase({
  projects,
  title = "Proyek Terbaru",
  subtitle = "Beberapa proyek pilihan yang pernah saya kerjakan",
  limit = 3,
}: {
  projects?: Project[]
  title?: string
  subtitle?: string
  limit?: number
}) {
  const shouldReduceMotion = useReducedMotion()

  const defaultProjects: Project[] = [
    {
      title: "Portfolio Website",
      description: "Situs pribadi dengan desain modern dan performa cepat.",
      image: "/portfolio-homepage.png",
      href: "#",
      tags: ["Next.js", "Tailwind CSS"],
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard interaktif untuk memantau KPI secara real-time.",
      image: "/analytics-dashboard-ui.png",
      href: "#",
      tags: ["Recharts", "API"],
    },
    {
      title: "E-commerce UI",
      description: "Desain antarmuka belanja yang fokus pada konversi.",
      image: "/ecommerce-product-grid.png",
      href: "#",
      tags: ["UI/UX", "A11y"],
    },
  ]

  const maxItems = Math.min(limit ?? 3, 3)
  const displayed = (projects && projects.length > 0 ? projects : defaultProjects).slice(0, maxItems)

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <section aria-labelledby="projects-title" className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <header className="mb-8 md:mb-10">
          <h2 id="projects-title" className="text-balance text-2xl font-semibold md:text-3xl">
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
          {displayed.map((p, idx) => (
            <motion.div
              key={p.title + idx}
              variants={item}
              whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 250, damping: 24 }}
            >
              <Card
                className="group h-full overflow-hidden border-border bg-card text-card-foreground transition
                           hover:shadow-lg hover:border-foreground/20 focus-within:shadow-lg"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={p.image || "/placeholder.svg?height=360&width=640&query=project cover"}
                    alt={`Gambar proyek ${p.title}`}
                    className="h-full w-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-pretty text-lg">{p.title}</CardTitle>
                  {p.tags && p.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {p.tags.slice(0, 4).map((t) => (
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
                        href={p.href || "#"}
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
      </div>
    </section>
  )
}
