"use client"

import { useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { TableOfContents } from "@/components/table-of-contents"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ProjectDetailPage() {
  const articleRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  return (
    <main className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
        <header className="mb-8 md:mb-10">
          <h1 className="text-balance text-3xl font-semibold md:text-4xl">Portfolio Website</h1>
          <p className="mt-2 text-muted-foreground">Situs pribadi modern menampilkan karya dan tulisan.</p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <section className="md:col-span-8 lg:col-span-9">
            <motion.article
              ref={articleRef}
              initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
              animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="[&_*]:scroll-mt-24 prose prose-neutral max-w-none dark:prose-invert"
            >
              <img
                src="/project-hero.jpg"
                alt="Cover proyek"
                className="mb-6 w-full rounded-lg border border-border"
              />

              <h2 id="ringkasan">Ringkasan</h2>
              <p>
                Proyek ini menampilkan landing page dengan hero video, section About, Proyek, Blog, Sertifikasi, Spotify
                Now Playing, dan footer lengkap.
              </p>

              <h2 id="stack-teknologi">Stack Teknologi</h2>
              <ul>
                <li>Next.js App Router</li>
                <li>Tailwind v4 + shadcn/ui</li>
                <li>framer-motion untuk animasi</li>
              </ul>

              <h2 id="fitur-utama">Fitur Utama</h2>
              <ul>
                <li>Hero video aksesibel (autoplay muted playsInline + poster)</li>
                <li>TOC otomatis untuk halaman detail</li>
                <li>Pagination, pencarian, dan hover yang halus</li>
              </ul>

              <h2 id="galeri">Galeri</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card className="overflow-hidden">
                  <img
                    src="/modern-homepage.png"
                    alt="Tangkapan layar homepage"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </Card>
                <Card className="overflow-hidden">
                  <img
                    src="/projects-grid.jpg"
                    alt="Tangkapan layar grid proyek"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </Card>
              </div>

              <h2 id="tantangan">Tantangan</h2>
              <p>
                Menjaga aksesibilitas saat menggunakan video dan animasi. Solusi meliputi overlay token,
                prefers-reduced-motion, dan fallback poster.
              </p>

              <div className="mt-8 flex gap-3">
                <Button variant="default" className="bg-primary text-primary-foreground" asChild>
                  <a href="/projects">Kembali ke Proyek</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/blog">Baca Blog Terkait</a>
                </Button>
              </div>
            </motion.article>
          </section>

          <aside className="md:col-span-4 lg:col-span-3">
            <TableOfContents contentRef={articleRef} title="Daftar Isi" />
          </aside>
        </div>
      </div>
    </main>
  )
}
