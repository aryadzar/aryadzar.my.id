"use client";

import { TableOfContents } from "@/components/table-of-contents";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getBlog } from "@/lib/getBlogs";
import { PortableText, PortableTextComponents } from "next-sanity";
import "prism-themes/themes/prism-duotone-space.css";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup";
import { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/constants/components-portable-text-constant";

function slugify(text: any) {
  return String(text)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default function BlogDetailView() {
  const articleRef = useRef<HTMLElement>(null!);
  const prefersReduced = useReducedMotion();
  const { locale, slug } = useParams<{ slug: string; locale: string }>();

  const {
    data: result,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", slug, locale],
    queryFn: () => getBlog(slug, locale as string),
    enabled: Boolean(locale && slug),
  });

  useEffect(() => {
    Prism.highlightAll();
  }, [result?.blog.content]);

  if (isLoading) {
    return (
      <main className="w-full bg-background text-foreground">
        <div className="max-w-6xl px-4 py-10 mx-auto md:px-6 md:py-16">
          <header className="mb-8 md:mb-10">
            <Skeleton className="w-3/4 h-10" />
            <Skeleton className="w-1/2 h-5 mt-3" />
          </header>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <section className="md:col-span-8 lg:col-span-9">
              <Skeleton className="w-full rounded-lg aspect-video" />
              <div className="mt-8 prose prose-neutral max-w-none dark:prose-invert">
                <Skeleton className="w-1/3 h-8" />
                <Skeleton className="w-full h-5 mt-4" />
                <Skeleton className="w-5/6 h-5 mt-2" />
                <Skeleton className="w-1/4 h-8 mt-8" />
                <Skeleton className="w-full h-5 mt-4" />
                <Skeleton className="w-full h-5 mt-2" />
                <Skeleton className="w-3/4 h-5 mt-2" />
              </div>
            </section>
            <aside className="md:col-span-4 lg:col-span-3">
              <Skeleton className="w-full h-64" />
            </aside>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !result) {
    notFound();
  }

  return (
    <main className="w-full bg-background text-foreground">
      <div className="max-w-6xl px-4 py-10 mx-auto md:px-6 md:py-16">
        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl font-semibold text-balance md:text-4xl">
            {result.blog.title}
          </h1>
          <p className="mt-2 text-muted-foreground">{result.blog.title}</p>
          {result.blog.categories && result.blog.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {result.blog.categories.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs border rounded-md border-border text-muted-foreground"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          )}
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
              <Image
                src={(result.blog.thumbnail as string) || "/project-hero.jpg"}
                alt={`Cover image for ${result.blog.title}`}
                width={1200}
                height={675}
                className="w-full mb-6 border rounded-lg border-border"
                priority
              />

              <PortableText
                components={components}
                value={result.blog.content}
              />

              <div className="flex flex-wrap gap-3 mt-8">
                <Button
                  variant="default"
                  className="bg-primary text-primary-foreground"
                  asChild
                >
                  <Link href="/blog">Kembali ke Blog</Link>
                </Button>
              </div>
            </motion.article>
          </section>

          <aside className="sticky self-start hidden top-24 h-fit md:col-span-4 md:block lg:col-span-3">
            <TableOfContents contentRef={articleRef} title="Daftar Isi" />
          </aside>
        </div>
      </div>
    </main>
  );
}
