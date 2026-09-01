"use client";
import { motion, useReducedMotion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BlogOverview } from "@/types/blogOverviewTypes";
import { ArrowRight, Calendar, Clock, Sparkles, Tag } from "lucide-react";
import { Badge } from "./ui/badge";

export function BlogPreview({
  data,
  limit = 3,
}: {
  data: BlogOverview;
  limit?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.blog");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 35, scale: 0.95 },
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

  const displayedBlogs = data?.blogs.slice(0, limit) || [];

  return (
    <section
      aria-labelledby="blog-title"
      className="relative w-full overflow-hidden text-foreground py-16 md:py-28"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-primary/10 blur-3xl animate-pulse-glow -z-10" />
      <div
        className="absolute bottom-0 left-0 rounded-full w-96 h-96 bg-accent/10 blur-3xl animate-pulse-glow -z-10"
        style={{ animationDelay: "2s" }}
      />

      <div className="px-4 mx-auto max-w-7xl md:px-6">
        {/* Header with enhanced styling */}
        <header className="mb-14 text-center md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 border rounded-full bg-card/60 backdrop-blur-md border-border/80 text-primary text-xs sm:text-sm font-medium shadow-sm">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-semibold tracking-wider uppercase">
                {t("featured")}
              </span>
            </div>
            <h2
              id="blog-title"
              className="text-3xl font-extrabold tracking-tight text-balance md:text-4xl lg:text-5xl"
            >
              {t("h1")}
            </h2>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-4 text-base text-muted-foreground md:text-lg"
          >
            {t("desc")}
          </motion.p>
        </header>

        {/* Blog cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {displayedBlogs.map((post, idx) => (
            <motion.article
              key={post._id}
              variants={item}
              className="h-full group"
            >
              <Card className="relative h-full overflow-hidden transition-all duration-500 border border-border/70 bg-card/60 backdrop-blur-xl text-card-foreground hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/50 hover:-translate-y-1.5 rounded-2xl flex flex-col justify-between">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none bg-gradient-to-br from-primary/5 to-accent/5 group-hover:opacity-100" />

                <div>
                  {/* Image container with enhanced effects */}
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="block relative aspect-[16/10] w-full overflow-hidden bg-muted/80"
                  >
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:opacity-100" />

                    {/* Featured badge for first post */}
                    {idx === 0 && (
                      <div className="absolute top-3.5 left-3.5">
                        <Badge
                          variant="secondary"
                          className="font-semibold shadow-lg bg-primary text-primary-foreground text-xs px-2.5 py-1 rounded-lg"
                        >
                          {t("featured")}
                        </Badge>
                      </div>
                    )}
                  </Link>

                  <CardHeader className="relative pb-3 space-y-2.5 pt-5">
                    {/* Meta info: Date and Read time */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {post.publishedAt && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-primary/80" />
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString(
                              "id-ID",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </time>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="block group/title"
                    >
                      <CardTitle className="text-xl font-bold leading-snug transition-colors duration-200 text-pretty group-hover/title:text-primary">
                        {post.title}
                      </CardTitle>
                    </Link>

                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.categories.slice(0, 3).map((category) => (
                          <Link
                            key={category._id}
                            href={`/category/${category.slug.current}`}
                            className="inline-block"
                          >
                            <Badge
                              variant="secondary"
                              className="text-[11px] font-normal transition-colors cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg px-2 py-0.5"
                            >
                              <Tag className="w-2.5 h-2.5 mr-1" />
                              {category.title}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                </div>

                <CardContent className="relative flex flex-col gap-4 pt-0">
                  {/* Excerpt */}
                  {post.excerpt && (
                    <CardDescription className="text-sm leading-relaxed text-pretty line-clamp-3 text-muted-foreground">
                      {post.excerpt}
                    </CardDescription>
                  )}

                  {/* CTA Button */}
                  <Button
                    asChild
                    variant="default"
                    className="w-full mt-2 rounded-xl transition-all duration-300 shadow-md group/btn bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg text-xs font-semibold py-2.5"
                  >
                    <Link
                      href={`/blog/${post.slug.current}`}
                      aria-label={t("ariaLabel", { title: post.title })}
                      className="flex items-center justify-center gap-2"
                    >
                      <span>{t("button")}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Blogs Button */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-sm font-semibold border-border/80 bg-card/60 backdrop-blur-md hover:bg-card/90 hover:border-primary/50 shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group"
          >
            <Link href="/blog" className="flex items-center gap-2">
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

