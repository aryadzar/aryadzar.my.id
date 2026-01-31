"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { TableOfContents } from "@/components/table-of-contents";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getProject } from "@/lib/getProject";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import Prism from "@/lib/prism";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup";
import { PortableText, PortableTextComponents } from "next-sanity";
import { components } from "@/constants/components-portable-text-constant";
import { useTranslations } from "next-intl";
import { Project } from "@/types/projectDetailType";
import { ArrowLeft, Calendar, ExternalLink, Github, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetail({ result }: { result: Project }) {
  const articleRef = useRef<HTMLElement>(null!);
  const prefersReduced = useReducedMotion();
  const { locale, slug } = useParams();
  const t = useTranslations("projectDetail");

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    Prism.highlightAll();
  }, [result?.description]);

  return (
    <main className="relative w-full bg-background text-foreground">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-primary"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section with Parallax */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        {/* Background Pattern */}
        <div
          className="absolute opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-6xl px-4 py-16 mx-auto md:px-6 md:py-24">
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
              <Link href="/projects">
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
            className="max-w-4xl"
          >
            {/* Categories */}
            {result.categories && result.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {result.categories.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="transition-colors rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag.title}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl text-balance bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text">
              {result.title}
            </h1>

            {/* Description */}
            <p className="mb-8 text-xl leading-relaxed md:text-2xl text-muted-foreground">
              {result.shortDesc}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              {result.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>
                    {" "}
                    {new Date(result.publishedAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="z-50 flex flex-wrap gap-3 mt-8">
              {result.repoUrl && (
                <Button
                  variant="default"
                  size="lg"
                  className="gap-2 group"
                  asChild
                >
                  <a
                    href={result.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 transition-transform group-hover:rotate-12" />
                    {t("githubButton")}
                  </a>
                </Button>
              )}
              {result.liveUrl && (
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 group"
                  asChild
                >
                  <a
                    href={result.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    {t("demoButton")}
                  </a>
                </Button>
              )}
            </div>
          </motion.header>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl px-4 py-10 mx-auto md:px-6 md:py-16">
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
                <div className="absolute transition duration-500 opacity-0 -inset-1 bg-gradient-to-r from-primary/30 via-purple-500/30 to-blue-500/30 rounded-2xl group-hover:opacity-100 blur" />
                <div className="relative overflow-hidden border-2 rounded-2xl border-border">
                  <Image
                    src={result.thumbnail || "/project-hero.jpg"}
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
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:leading-relaxed prose-p:text-foreground/80
                prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
                prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:shadow-lg
                prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:shadow-lg
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                prose-ul:list-disc prose-ul:pl-6
                prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-foreground/80
                prose-strong:text-foreground prose-strong:font-semibold
              "
              >
                <PortableText
                  components={components}
                  value={result.description}
                />
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-6 pt-8 mt-16 border-t border-border">
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="gap-2" asChild>
                    <Link href="/projects">
                      <ArrowLeft className="w-4 h-4" />
                      {t("backButton")}
                    </Link>
                  </Button>
                  {result.repoUrl && (
                    <Button variant="outline" className="gap-2" asChild>
                      <a
                        href={result.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4" />
                        {t("githubButton")}
                      </a>
                    </Button>
                  )}
                  {result.liveUrl && (
                    <Button variant="outline" className="gap-2" asChild>
                      <a
                        href={result.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t("demoButton")}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.article>
          </section>

          {/* Sidebar with TOC */}
          <aside className="lg:col-span-4">
            <div className="sticky space-y-6 top-24">
              {/* Table of Contents */}
              <motion.div
                initial={prefersReduced ? undefined : { opacity: 0, x: 20 }}
                animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden lg:block"
              >
                <div className="p-6 border rounded-2xl border-border bg-card/50 backdrop-blur-sm">
                  <TableOfContents
                    contentRef={articleRef}
                    title={t("tocTitle")}
                  />
                </div>
              </motion.div>

              {/* Quick Info Card */}
              <motion.div
                initial={prefersReduced ? undefined : { opacity: 0, x: 20 }}
                animate={prefersReduced ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="hidden lg:block"
              >
                <div className="p-6 border rounded-2xl border-border bg-gradient-to-br from-primary/5 to-purple-500/5">
                  <h3 className="mb-4 text-lg font-bold">{t("quickLinks")}</h3>
                  <div className="space-y-3">
                    {result.repoUrl && (
                      <a
                        href={result.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm transition-colors text-foreground/80 hover:text-primary group"
                      >
                        <div className="p-2 transition-colors rounded-lg bg-background group-hover:bg-primary/10">
                          <Github className="w-4 h-4" />
                        </div>
                        <span>{t("viewSource")}</span>
                      </a>
                    )}
                    {result.liveUrl && (
                      <a
                        href={result.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm transition-colors text-foreground/80 hover:text-primary group"
                      >
                        <div className="p-2 transition-colors rounded-lg bg-background group-hover:bg-primary/10">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <span>{t("liveDemo")}</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
