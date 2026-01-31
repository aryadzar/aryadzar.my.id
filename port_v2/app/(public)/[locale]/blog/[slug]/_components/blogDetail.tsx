"use client";

import { TableOfContents } from "@/components/table-of-contents";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, useInView, useReducedMotion, useScroll } from "framer-motion";
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
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Share2,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  const { scrollYProgress } = useScroll();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false });

  // Calculate read time (assuming average reading speed of 200 words per minute)
  const calculateReadTime = () => {
    const text = JSON.stringify(result.content);
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [result?.content]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale || "en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <main className="relative w-full text-foreground">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-primary"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient Background */}

        {/* Background Pattern */}
        <div
          className="absolute  opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div
          className="max-w-4xl px-4 py-16 mx-auto md:px-6 md:py-24"
          ref={headerRef}
        >
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-2 transition-all hover:gap-3 group"
            >
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                {t("backButton")}
              </Link>
            </Button>
          </motion.div>

          {/* Header Content */}
          <motion.header
            initial={prefersReduced ? undefined : { opacity: 0, y: 30 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Categories */}
            {result.categories && result.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {result.categories.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="transition-colors rounded-full cursor-pointer bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag.title}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-transparent md:text-5xl lg:text-6xl text-balance bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text">
              {result.title}
            </h1>

            {/* Excerpt */}
            {result.excerpt && (
              <p className="mb-8 text-xl leading-relaxed md:text-2xl text-muted-foreground">
                {result.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 pb-8 text-sm border-b text-muted-foreground border-border">
              <div className="hidden w-px h-6 bg-border sm:block" />

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{formatDate(result.publishedAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{calculateReadTime()}</span>
              </div>
            </div>
          </motion.header>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-10 mx-auto max-w-7xl md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Article Content */}
          <section className="lg:col-span-8">
            <motion.article
              ref={articleRef}
              initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              {/* Featured Image */}
              <div className="relative mb-12 group">
                <div className="absolute transition duration-500 opacity-0 -inset-1 bg-gradient-to-r from-primary/30 via-purple-500/30 to-blue-500/30 rounded-2xl group-hover:opacity-100 blur-xl" />
                <div className="relative overflow-hidden border-2 rounded-2xl border-border">
                  <Image
                    src={result.thumbnail || "/blog-hero.jpg"}
                    alt={t("altImage", { title: result.title })}
                    width={1200}
                    height={675}
                    className="object-cover w-full"
                    priority
                  />
                </div>
              </div>

              {/* Article Body */}
              <div
                className="[&_*]:scroll-mt-24 prose prose-md prose-neutral max-w-none dark:prose-invert
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border
                prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3
                prose-p:leading-relaxed prose-p:text-foreground/80 prose-p:mb-6
                prose-a:text-primary prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary/30 hover:prose-a:border-primary hover:prose-a:bg-primary/5 prose-a:transition-all prose-a:px-1 prose-a:-mx-1
                prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-primary/20
                prose-pre:bg-muted prose-pre:border-2 prose-pre:border-border prose-pre:shadow-xl prose-pre:rounded-xl prose-pre:my-8
                prose-img:rounded-xl prose-img:border-2 prose-img:border-border prose-img:shadow-xl prose-img:my-8
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:my-8 prose-blockquote:not-italic
                prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
                prose-li:text-foreground/80 prose-li:my-2 prose-li:leading-relaxed
                prose-strong:text-foreground prose-strong:font-bold
                prose-em:text-foreground/90
                prose-hr:border-border prose-hr:my-12
                prose-table:border-collapse prose-table:border prose-table:border-border prose-table:rounded-lg prose-table:overflow-hidden
                prose-thead:bg-muted
                prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold
                prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-3
                prose-video:rounded-xl prose-video:shadow-xl prose-video:my-8 prose-video:mx-auto
              "
              >
                <PortableText components={components} value={result.content} />
              </div>

              {/* Article Footer */}
              <div className="pt-8 mt-16 border-t-2 border-border">
                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="gap-2" asChild>
                      <Link href="/blog">
                        <ArrowLeft className="w-4 h-4" />
                        {t("backButton")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.article>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky space-y-6 top-24">
              {/* Table of Contents */}
              <motion.div
                initial={prefersReduced ? undefined : { opacity: 0, x: 20 }}
                animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden lg:block"
              >
                <div className="p-6 border-2 shadow-lg rounded-2xl border-border bg-card/50 backdrop-blur-sm">
                  <TableOfContents
                    contentRef={articleRef}
                    title={t("tocTitle")}
                  />
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
