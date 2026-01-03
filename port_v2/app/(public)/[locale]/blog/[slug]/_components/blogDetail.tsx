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
import Prism from "@/lib/prism";
// theme (boleh global atau di sini)

import { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/constants/components-portable-text-constant";
import { useTranslations } from "next-intl";
import { Blog, BlogDetail } from "@/types/blogDetailTypes";

function slugify(text: any) {
  return String(text)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default function BlogDetailView({ result }: { result: Blog }) {
  const articleRef = useRef<HTMLElement>(null!);
  const prefersReduced = useReducedMotion();
  const { locale, slug } = useParams<{ slug: string; locale: string }>();
  const t = useTranslations("blogDetail");

  useEffect(() => {
    Prism.highlightAll();
  }, [result?.content]);

  return (
    <main className="w-full bg-background text-foreground">
      <div className="max-w-6xl px-4 py-10 mx-auto md:px-6 md:py-16">
        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl font-semibold text-balance md:text-4xl">
            {/* {result.blog.title} */}
            {result.title}
          </h1>
          <p className="mt-2 text-muted-foreground">{result.title}</p>
          {result.categories && result.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {/* {result.blog.categories.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs border rounded-md border-border text-muted-foreground"
                >
                  {tag.title}
                </span>
              ))} */}
              {result.categories.map((tag, i) => (
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
              className="[&_*]:scroll-mt-24 prose prose-neutral prose-video:mx-auto max-w-none dark:prose-invert"
            >
              {/* <Image
                src={(result.blog.thumbnail as string) || "/project-hero.jpg"}
                alt={t("altImage", { title: result.blog.title })}
                width={1200}
                height={675}
                className="w-full mb-6 border rounded-lg border-border"
                priority
              /> */}
              <Image
                src={(result.thumbnail as string) || "/project-hero.jpg"}
                alt={t("altImage", { title: result.title })}
                width={1200}
                height={675}
                className="w-full mb-6 border rounded-lg border-border"
                priority
              />

              <PortableText components={components} value={result.content} />

              <div className="flex flex-wrap gap-3 mt-8">
                <Button
                  variant="default"
                  className="bg-primary text-primary-foreground"
                  asChild
                >
                  <Link href="/blog">{t("backButton")}</Link>
                </Button>
              </div>
            </motion.article>
          </section>

          <aside className=" sticky top-24 hidden md:block md:col-span-4 lg:col-span-3 h-[calc(100vh-6rem)] overflow-hidden">
            <TableOfContents contentRef={articleRef} title={t("tocTitle")} />
          </aside>
        </div>
      </div>
    </main>
  );
}
