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
import { useQuery } from "@tanstack/react-query";
import { getProjectOverview } from "@/lib/getHome";
import Image from "next/image";
import Link from "next/link";
import { ProjectsShowcaseSkeleton } from "./skeleton";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

type Project = {
  title: string;
  description: string;
  image: string;
  href?: string;
  tags?: string[];
};

export function ProjectsShowcase({
  projects,
  title = "Proyek Terbaru",
  subtitle = "Beberapa proyek pilihan yang pernah saya kerjakan",
  limit = 3,
}: {
  projects?: Project[];
  title?: string;
  subtitle?: string;
  limit?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const { locale } = useParams();

  const { data: result, isLoading } = useQuery({
    queryKey: ["projectOver", locale],
    queryFn: () => getProjectOverview(locale as string),
  });

  const t = useTranslations("home.project");

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  } as const;

  if (isLoading) return <ProjectsShowcaseSkeleton />;

  return (
    <section
      aria-labelledby="projects-title"
      className="w-full bg-background text-foreground"
    >
      <div className="max-w-6xl px-4 py-12 mx-auto md:px-6 md:py-16">
        <header className="mb-8 md:mb-10">
          <h2
            id="projects-title"
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
          // initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {result?.projects.map((p, idx) => (
            <motion.div
              key={p.title + idx}
              variants={item}
              whileHover={
                shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }
              }
              transition={{ type: "spring", stiffness: 250, damping: 24 }}
            >
              <Card className="h-full overflow-hidden transition group border-border bg-card text-card-foreground hover:shadow-lg hover:border-foreground/20 focus-within:shadow-lg">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={
                      p.thumbnail ||
                      "/placeholder.svg?height=360&width=640&query=project cover"
                    }
                    alt={`Gambar proyek ${p.title}`}
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
                      {p.categories.slice(0, 4).map((t) => (
                        <span
                          key={t._id}
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
                        href={`/projects/${p.slug.current}` || "#"}
                        aria-label={`Lihat detail proyek ${p.title}`}
                      >
                        {t("button")}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
