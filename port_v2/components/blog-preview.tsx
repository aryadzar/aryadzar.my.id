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
import { ArrowRight, Calendar, Tag } from "lucide-react";
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
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30, scale: 0.95 },
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

  const imageVariants = {
    hover: {
      scale: 1.08,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  } as const;

  const displayedBlogs = data?.blogs.slice(0, limit) || [];

  return (
    <section
      aria-labelledby="blog-title"
      className="relative w-full overflow-hidden text-foreground"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 rounded-full w-96 h-96 bg-accent/5 blur-3xl -z-10" />

      <div className="px-4 py-16 mx-auto max-w-7xl md:px-6 md:py-24">
        {/* Header with enhanced styling */}
        <header className="mb-12 text-center md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              id="blog-title"
              className="text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl"
            >
              {t("h1")}
            </h2>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary to-accent" />
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
              <Card className="relative h-full overflow-hidden transition-all duration-300 border-2 border-border/50 bg-card/50 backdrop-blur-sm text-card-foreground hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-2">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-br from-primary/5 to-accent/5 group-hover:opacity-100" />

                {/* Image container with enhanced effects */}
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="block relative aspect-[16/9] w-full overflow-hidden bg-muted"
                >
                  <motion.div
                    whileHover={prefersReducedMotion ? undefined : "hover"}
                    variants={imageVariants}
                    className="w-full h-full"
                  >
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover transition-all duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:opacity-100" />

                  {/* Featured badge if it's the first post */}
                  {idx === 0 && (
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="outline"
                        className="font-semibold shadow-lg bg-primary text-primary-foreground"
                      >
                        {t("featured")}
                      </Badge>
                    </div>
                  )}
                </Link>

                <CardHeader className="relative pb-4 space-y-3">
                  {/* Date */}
                  {post.publishedAt && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString(
                          "id-ID",
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

                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.categories.slice(0, 3).map((category) => (
                        <Badge
                          key={category._id}
                          variant="outline"
                          className="text-xs font-normal transition-colors cursor-pointer hover:bg-primary/10"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {category.title}
                        </Badge>
                      ))}
                      {post.categories.length > 3 && (
                        <Badge className="text-xs" variant="outline">
                          +{post.categories.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
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
                      aria-label={t("ariaLabel", { title: post.title })}
                      className="flex items-center justify-center gap-2"
                    >
                      <span>{t("button")}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
