"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/lib/getBlogs";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { BlogSkeleton } from "@/components/skeleton";
import Image from "next/image";
import { ArrowRight, BookOpen, Calendar, Sparkles, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  const prefersReduced = useReducedMotion();
  const { locale } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial values from URL search params
  const initialPageParam = parseInt(searchParams.get("page") || "1", 10);
  const initialPage = Number.isNaN(initialPageParam) || initialPageParam < 1 ? 1 : initialPageParam;
  const initialQuery = searchParams.get("search") || searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const perPage = 6;

  // Helper function to update URL query parameters
  const updateUrlParams = useCallback(
    (newPage: number, newQuery: string) => {
      const params = new URLSearchParams();
      if (newQuery.trim()) {
        params.set("search", newQuery.trim());
      }
      if (newPage > 1) {
        params.set("page", String(newPage));
      }
      const queryString = params.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(targetUrl, { scroll: false });
    },
    [pathname, router]
  );

  // Sync state when browser navigates (Back/Forward buttons)
  useEffect(() => {
    const p = parseInt(searchParams.get("page") || "1", 10);
    const q = searchParams.get("search") || searchParams.get("q") || "";
    const validPage = Number.isNaN(p) || p < 1 ? 1 : p;

    if (validPage !== page) {
      setPage(validPage);
    }
    if (q !== query) {
      setQuery(q);
      setDebouncedQuery(q);
    }
  }, [searchParams]);

  // ⏳ Debounce 400ms when user types in search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      const currentUrlQuery = searchParams.get("search") || searchParams.get("q") || "";
      if (query !== currentUrlQuery) {
        setPage(1);
        updateUrlParams(1, query);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [query, searchParams, updateUrlParams]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrlParams(newPage, debouncedQuery);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs", page, debouncedQuery, locale],
    queryFn: () => getBlogs(locale as string, page, perPage, debouncedQuery),
  });

  const blogs = data?.blogs ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const t = useTranslations("blogPage");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.1,
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

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center p-4">
        <div className="p-8 rounded-2xl bg-card/60 backdrop-blur-xl border border-destructive/30 max-w-md">
          <p className="text-destructive font-medium">Failed to load blogs. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div
        className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      <section
        aria-labelledby="blog-title"
        className="relative w-full overflow-hidden text-foreground py-16 md:py-24"
      >
        <div className="px-4 mx-auto max-w-7xl md:px-6">
          {/* Header with enhanced styling */}
          <header className="mb-12 text-center md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 border rounded-full bg-card/60 backdrop-blur-md border-border/80 text-primary text-xs sm:text-sm font-medium shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-semibold tracking-wider uppercase">
                Articles & Thoughts
              </span>
            </motion.div>

            <motion.h1
              id="blog-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight text-balance md:text-5xl lg:text-6xl"
            >
              {t("title")}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto mt-4 text-base text-muted-foreground md:text-lg"
            >
              {t("description")}
            </motion.p>
          </header>

          {/* Search bar & Live count indicator */}
          <div className="mb-10 space-y-4">
            <SearchBar
              value={query}
              onChange={(v) => {
                setQuery(v);
              }}
              placeholder={t("searchPlaceholder")}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-card/60 border border-border/60 backdrop-blur-sm">
                {t("pagination.summary", { total, page, totalPages })}
              </span>
            </motion.div>
          </div>

          {/* Blog grid or Empty State */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <BlogSkeleton />
            </div>
          ) : blogs.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-card/40 backdrop-blur-xl border border-border/60 max-w-lg mx-auto my-12 shadow-lg"
            >
              <div className="p-4 rounded-2xl bg-primary/10 text-primary mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">No articles found</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                We couldn't find any articles matching &ldquo;{debouncedQuery}&rdquo;. Try another keyword or clear search.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setDebouncedQuery("");
                  setPage(1);
                  updateUrlParams(1, "");
                }}
                className="rounded-xl px-6"
              >
                Reset Search
              </Button>
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {blogs.map((post, idx) => (
                <motion.article
                  key={post._id || post.title + idx}
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
                          alt={t("altImage", { title: post.title })}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:opacity-100" />

                        {/* Featured badge if it's the first post */}
                        {idx === 0 && page === 1 && (
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
                        {/* Date */}
                        {post.publishedAt && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5 text-primary/80" />
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
                            {post.categories.length > 3 && (
                              <Badge className="text-[10px] rounded-lg px-1.5" variant="outline">
                                +{post.categories.length - 3}
                              </Badge>
                            )}
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
          )}

          {/* Pagination */}
          <div className="mt-14 flex justify-center">
            <Pagination
              total={total}
              page={page}
              perPage={perPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

