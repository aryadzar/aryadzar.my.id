"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TableOfContents } from "@/components/table-of-contents";
import { Button } from "@/components/ui/button";

export default function BlogPostPage() {
  const articleRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  return (
    <main className="w-full bg-background text-foreground">
      <div className="max-w-6xl px-4 py-10 mx-auto md:px-6 md:py-16">
        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl font-semibold text-balance md:text-4xl">
            Mendesain Hero Video yang Aksesibel
          </h1>
          <p className="mt-2 text-muted-foreground">
            Panduan praktik terbaik untuk performa dan aksesibilitas.
          </p>
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
                src="/hero-video-cover.jpg"
                alt="Ilustrasi hero video"
                className="w-full mb-6 border rounded-lg border-border"
              />

              <h2 id="pengantar">Pengantar</h2>
              <p>
                Hero video dapat meningkatkan kesan pertama, namun perlu
                diperhatikan aspek aksesibilitas, kontras, dan performa agar
                pengalaman tetap cepat dan nyaman.
              </p>

              <h2 id="praktik-terbaik">Praktik Terbaik</h2>
              <h3 id="autoplay-muted-playsinline">
                Autoplay, muted, dan playsInline
              </h3>
              <p>
                Untuk kompatibilitas mobile, pastikan atribut <code>muted</code>{" "}
                serta <code>playsInline</code> digunakan, dan sediakan{" "}
                <em>poster</em> agar first-paint tetap cepat.
              </p>

              <h3 id="overlay-dan-kontras">Overlay dan kontras</h3>
              <p>
                Tambahkan overlay berbasis token tema agar teks tetap terbaca
                pada berbagai footage. Uji rasio kontras untuk heading dan body
                text.
              </p>

              <h2 id="performa">Performa</h2>
              <p>
                Kompresi video, batasi durasi, dan gunakan format modern.
                Sediakan fallback gambar untuk koneksi lambat.
              </p>

              <h2 id="penutup">Penutup</h2>
              <p>
                Dengan pengaturan tepat, hero video bisa tampil memukau tanpa
                mengorbankan aksesibilitas maupun performa.
              </p>

              <div className="flex gap-3 mt-8">
                <Button
                  variant="default"
                  className="bg-primary text-primary-foreground"
                  asChild
                >
                  <a href="/blog">Kembali ke Blog</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/projects">Lihat Proyek Terkait</a>
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
  );
}
