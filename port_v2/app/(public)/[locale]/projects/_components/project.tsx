"use client";

import { useEffect, useMemo, useState } from "react";
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
import { getProjects } from "@/lib/getProject";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";

export default function ProjectsPage() {
  const prefersReduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  // ⏳ Debounce 400ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1); // reset page
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects", page, debouncedQuery],
    queryFn: () => getProjects("en", page, perPage, debouncedQuery),
  });

  const projects = data?.projects ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReduced ? 0 : 0.06 } },
  };
  const item = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  } as const;

  if (isLoading) {
    return (
      <main className="w-full bg-background text-foreground">
        <div className="max-w-6xl px-4 py-12 mx-auto md:px-6 md:py-16">
          <header className="mb-6 md:mb-8">
            <Skeleton className="w-1/2 h-10" />
            <Skeleton className="w-3/4 h-5 mt-2" />
          </header>
          <div className="mb-6">
            <Skeleton className="w-full h-12" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="aspect-[16/9] w-full" />
                <CardHeader>
                  <Skeleton className="w-3/4 h-6" />
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Skeleton className="w-16 h-5" />
                    <Skeleton className="w-20 h-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-5/6 h-4 mt-2" />
                  <Skeleton className="w-32 h-10 mt-6" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading projects. Please try again later.
      </div>
    );
  }

  return (
    <main className="w-full bg-background text-foreground">
      <div className="max-w-6xl px-4 py-12 mx-auto md:px-6 md:py-16">
        <header className="mb-6 md:mb-8">
          <h1 className="text-3xl font-semibold text-balance md:text-4xl">
            Semua Proyek
          </h1>
          <p className="mt-2 text-muted-foreground">
            Pencarian dan pagination untuk menjelajah proyek saya.
          </p>
        </header>

        <div className="mb-6">
          <SearchBar
            value={query}
            onChange={(v) => {
              setQuery(v);
            }}
            placeholder="Cari proyek berdasarkan judul, deskripsi, atau tag…"
          />
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          {total} hasil • halaman {page}/{totalPages}
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={prefersReduced ? undefined : { y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 250, damping: 24 }}
            >
              <Card className="h-full overflow-hidden transition group border-border bg-card text-card-foreground hover:shadow-lg hover:border-foreground/20">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={p.thumbnail}
                    alt={`Gambar proyek ${p.title}`}
                    width={640}
                    height={360}
                    className="object-cover w-full h-full transition-transform duration-300 will-change-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-lg text-pretty">
                    {p.title}
                  </CardTitle>
                  {p.categories && p.categories.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {p.categories.slice(0, 6).map((t, i) => (
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
                    {p.shortDesc}
                  </CardDescription>
                  <div>
                    <Button
                      asChild
                      variant="default"
                      className="bg-primary text-primary-foreground"
                    >
                      <Link
                        href={`/projects/${p.slug.current}`}
                        aria-label={`Lihat detail proyek ${p.title}`}
                      >
                        Lihat Detail
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Pagination
          total={total}
          page={page}
          perPage={perPage}
          onPageChange={setPage}
          className="mt-8"
        />
      </div>
    </main>
  );
}
