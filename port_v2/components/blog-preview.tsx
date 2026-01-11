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

export function BlogPreview({ data, limit = 3 }: { data: BlogOverview; limit?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.blog");

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  } as const;

  return (
    <section
      aria-labelledby="blog-title"
      className="w-full bg-background text-foreground"
    >
      <div className="max-w-6xl px-4 py-12 mx-auto md:px-6 md:py-16">
        <header className="mb-8 md:mb-10">
          <h2
            id="blog-title"
            className="text-2xl font-semibold text-balance md:text-3xl"
          >
            {t("h1")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            {t("desc")}
          </p>
        </header>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {data?.blogs.map((post, idx) => (
            <motion.article
              key={post.title + idx}
              variants={item}
              whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 250, damping: 24 }}
              className="h-full"
            >
              <Card className="h-full overflow-hidden transition group border-border bg-card text-card-foreground hover:shadow-lg hover:border-foreground/20 focus-within:shadow-lg">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt={`Gambar blog ${post.title}`}
                    width={640}
                    height={360}
                    className="object-cover w-full h-full transition-transform duration-300 will-change-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-lg text-pretty">
                    {post.title}
                  </CardTitle>
                  {post.publishedAt ? (
                    <p className="text-xs text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  ) : null}
                  {post.categories && post.categories.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {post.categories.slice(0, 4).map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs border rounded-md border-border text-muted-foreground"
                        >
                          {t.title}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <CardDescription className="text-pretty">
                    {post.excerpt}
                  </CardDescription>
                  <div>
                    <Button
                      asChild
                      variant="default"
                      className="bg-primary text-primary-foreground"
                    >
                      <Link
                        href={`/blog/${post.slug.current}` || "#"}
                        aria-label={`Baca selengkapnya: ${post.title}`}
                      >
                        {t("button")}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
