"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TableOfContents } from "@/components/table-of-contents";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getProject } from "@/lib/getProject";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import "prism-themes/themes/prism-duotone-space.css";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup";
import { PortableText, PortableTextComponents } from "next-sanity";

function slugify(text: any) {
  return String(text)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default function ProjectDetail() {
  const articleRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { locale, slug } = useParams();

  const {
    data: result,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProject(slug as string, locale as string),
    enabled: !!slug,
  });

  useEffect(() => {
    Prism.highlightAll();
  }, [result?.project.description]);

  const components: PortableTextComponents = {
    types: {
      code: ({ value }) => (
        <pre className="p-4 overflow-x-auto text-white bg-black border rounded-lg">
          <code className={`language-${value.language || "javascript"}`}>
            {value.code}
          </code>
        </pre>
      ),
    },

    block: {
      // H1
      h1: ({ children }) => {
        const id = slugify(children?.toString() || "");
        return <h1 id={id}>{children}</h1>;
      },

      // H2
      h2: ({ children }) => {
        const id = slugify(children?.toString() || "");
        return <h2 id={id}>{children}</h2>;
      },

      // H3
      h3: ({ children }) => {
        const id = slugify(children?.toString() || "");
        return <h3 id={id}>{children}</h3>;
      },

      // H4
      h4: ({ children }) => {
        const id = slugify(children?.toString() || "");
        return <h4 id={id}>{children}</h4>;
      },
    },
  };

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
            {result.project.title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {result.project.shortDesc}
          </p>
          {result.project.categories &&
            result.project.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {result.project.categories.map((tag, i) => (
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
                src={result.project.thumbnail || "/project-hero.jpg"}
                alt={`Cover image for ${result.project.title}`}
                width={1200}
                height={675}
                className="w-full mb-6 border rounded-lg border-border"
                priority
              />

              <PortableText
                components={components}
                value={result.project.description}
              />

              <div className="flex flex-wrap gap-3 mt-8">
                <Button
                  variant="default"
                  className="bg-primary text-primary-foreground"
                  asChild
                >
                  <Link href="/projects">Kembali ke Proyek</Link>
                </Button>
                {result.project.repoUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={result.project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat di GitHub
                    </a>
                  </Button>
                )}
                {result.project.liveUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={result.project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat Demo
                    </a>
                  </Button>
                )}
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
