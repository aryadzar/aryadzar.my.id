"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getCategoryContent } from "@/lib/getCategory";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { ArrowRight, Calendar, FileText, FolderOpen, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CategoryPage() {
  const prefersReduced = useReducedMotion();
  const [page, setPage] = useState(1);
  const perPage = 6;
  const { locale, slug } = useParams<{ slug: string; locale: string }>();
  const t = useTranslations("categoryPage");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["category", slug, page, locale],
    queryFn: () => getCategoryContent(slug, locale as string, page, perPage),
  });

  const category = data?.category;
  const blogs = data?.blogs ?? [];
  const projects = data?.projects ?? [];
  const totalItems = (data?.totalBlogs ?? 0) + (data?.totalProjects ?? 0);
  const totalPages = data?.totalPages ?? 1;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } as const;

  // Show loading skeleton while loading
  if (isLoading) {
    return (
      <main className="w-full text-foreground">
        <section className="relative w-full overflow-hidden text-foreground">
          <div className="px-4 py-16 mx-auto max-w-7xl md:px-6 md:py-24">
            <div className="mb-12 text-center md:mb-16">
              <Skeleton className="h-12 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-96" />
              <Skeleton className="h-96" />
              <Skeleton className="h-96" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Show error/not found only after loading is complete
  if (isError || !category) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{t("notFound")}</h2>
          <Button asChild className="mt-4">
            <Link href="/blog">{t("backToBlogs")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full text-foreground">
      <section
        aria-labelledby="category-title"
        className="relative w-full overflow-hidden text-foreground"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-primary/5 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 rounded-full w-96 h-96 bg-accent/5 blur-3xl -z-10" />

        <div className="px-4 py-16 mx-auto max-w-7xl md:px-6 md:py-24">
          {/* Header */}
          <header className="mb-12 text-center md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10">
                <Tag className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  {t("categoryLabel")}
                </span>
              </div>
              <h2
                id="category-title"
                className="text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl"
              >
                {category.title}
              </h2>
              {category.description && (
                <p className="max-w-2xl mx-auto mt-4 text-base text-muted-foreground md:text-lg">
                  {category.description}
                </p>
              )}
            </motion.div>
          </header>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm">
                {data?.totalBlogs} {t("blogs")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-accent" />
              <span className="text-sm">
                {data?.totalProjects} {t("projects")}
              </span>
            </div>
          </motion.div>

          {/* Pagination info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-sm text-center text-muted-foreground"
          >
            {t("pagination.summary", { total: totalItems, page, totalPages })}
          </motion.p>

          {/* Content Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {isLoading ? (
              <>
                <Skeleton className="h-96" />
                <Skeleton className="h-96" />
                <Skeleton className="h-96" />
              </>
            ) : (
              <>
                {/* Blogs */}
                {blogs.map((post, idx) => (
                  <motion.article
                    key={`blog-${post._id}`}
                    variants={item}
                    className="h-full group"
                  >
                    <Card className="relative h-full overflow-hidden transition-all duration-300 border-2 border-border/50 bg-card/50 backdrop-blur-sm text-card-foreground hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-2">
                      {/* Blog badge */}
                      <div className="absolute z-10 top-4 left-4">
                        <Badge className="font-semibold shadow-lg bg-primary text-primary-foreground">
                          {t("blog")}
                        </Badge>
                      </div>

                      {/* Image */}
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="block relative aspect-[16/9] w-full overflow-hidden bg-muted"
                      >
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          className="object-cover transition-all duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:opacity-100" />
                      </Link>

                      <CardHeader className="relative pb-4 space-y-3">
                        {/* Date */}
                        {post.publishedAt && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            <time dateTime={post.publishedAt}>
                              {new Date(post.publishedAt).toLocaleDateString(
                                locale || "en",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </time>
                          </div>
                        )}

                        {/* Title */}
                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="block group/title"
                        >
                          <CardTitle className="text-xl font-bold leading-tight transition-colors duration-200 text-pretty group-hover/title:text-primary">
                            {post.title}
                          </CardTitle>
                        </Link>
                      </CardHeader>

                      <CardContent className="relative flex flex-col gap-4 pt-0">
                        {/* Excerpt */}
                        {post.excerpt && (
                          <CardDescription className="text-sm leading-relaxed text-pretty line-clamp-3">
                            {post.excerpt}
                          </CardDescription>
                        )}

                        {/* CTA Button */}
                        <Button
                          asChild
                          variant="default"
                          className="w-full mt-auto transition-all duration-300 shadow-md group/btn bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
                        >
                          <Link
                            href={`/blog/${post.slug.current}`}
                            className="flex items-center justify-center gap-2"
                          >
                            <span>{t("readMore")}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.article>
                ))}

                {/* Projects */}
                {projects.map((project, idx) => (
                  <motion.article
                    key={`project-${project._id}`}
                    variants={item}
                    className="h-full group"
                  >
                    <Card className="relative h-full overflow-hidden transition-all duration-300 border-2 border-border/50 bg-card/50 backdrop-blur-sm text-card-foreground hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/50 hover:-translate-y-2">
                      {/* Project badge */}
                      <div className="absolute z-10 top-4 left-4">
                        <Badge className="font-semibold shadow-lg bg-accent text-accent-foreground">
                          {t("project")}
                        </Badge>
                      </div>

                      {/* Image */}
                      <Link
                        href={`/projects/${project.slug.current}`}
                        className="block relative aspect-[16/9] w-full overflow-hidden bg-muted"
                      >
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover transition-all duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:opacity-100" />
                      </Link>

                      <CardHeader className="relative pb-4 space-y-3">
                        {/* Title */}
                        <Link
                          href={`/projects/${project.slug.current}`}
                          className="block group/title"
                        >
                          <CardTitle className="text-xl font-bold leading-tight transition-colors duration-200 text-pretty group-hover/title:text-accent">
                            {project.title}
                          </CardTitle>
                        </Link>
                      </CardHeader>

                      <CardContent className="relative flex flex-col gap-4 pt-0">
                        {/* Description */}
                        {project.shortDesc && (
                          <CardDescription className="text-sm leading-relaxed text-pretty line-clamp-3">
                            {project.shortDesc}
                          </CardDescription>
                        )}

                        {/* Published date */}
                        {project.publishedAt && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">{t("launched")}</span>{" "}
                            {new Date(project.publishedAt).toLocaleDateString(
                              locale || "en",
                              {
                                year: "numeric",
                                month: "short",
                              },
                            )}
                          </div>
                        )}

                        {/* CTA Button */}
                        <Button
                          asChild
                          variant="default"
                          className="w-full mt-auto transition-all duration-300 shadow-md group/btn bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg"
                        >
                          <Link
                            href={`/projects/${project.slug.current}`}
                            className="flex items-center justify-center gap-2"
                          >
                            <span>{t("viewProject")}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.article>
                ))}
              </>
            )}
          </motion.div>

          {/* Empty state */}
          {!isLoading && blogs.length === 0 && projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-semibold">{t("noContent")}</h3>
              <p className="mb-6 text-muted-foreground">
                {t("noContentDescription")}
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="default">
                  <Link href="/blog">{t("backToBlogs")}</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/projects">{t("backToProjects")}</Link>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Pagination */}
          {totalItems > 0 && (
            <Pagination
              total={totalItems}
              page={page}
              perPage={perPage}
              onPageChange={setPage}
              className="mt-12"
            />
          )}
        </div>
      </section>
    </main>
  );
}
