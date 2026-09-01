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
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProjectOverview } from "@/types/projectOverviewType";
import { ArrowRight, ExternalLink, Sparkles, Tag } from "lucide-react";
import { Badge } from "./ui/badge";

export function ProjectsShowcase({
  data,
  limit = 3,
}: {
  data: ProjectOverview;
  limit?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("home.project");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: 0.1,
      },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } as const;

  const cardHover = {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  } as const;

  const displayedProjects = data?.projects.slice(0, limit) || [];

  return (
    <section
      aria-labelledby="projects-title"
      className="relative w-full overflow-hidden text-foreground py-16 md:py-28"
    >
      {/* Animated ambient background elements */}
      <div className="absolute left-0 rounded-full top-1/4 w-96 h-96 bg-primary/10 blur-3xl animate-pulse-glow -z-10" />
      <div
        className="absolute right-0 rounded-full bottom-1/4 w-96 h-96 bg-accent/10 blur-3xl animate-pulse-glow -z-10"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="px-4 mx-auto max-w-7xl md:px-6">
        {/* Enhanced header */}
        <header className="mb-14 text-center md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 border rounded-full bg-card/60 backdrop-blur-md border-border/80 text-primary text-xs sm:text-sm font-medium shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="font-semibold tracking-wider uppercase">
              {t("portfolio")}
            </span>
          </motion.div>

          <motion.h2
            id="projects-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-balance md:text-4xl lg:text-5xl"
          >
            {t("h1")}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto mt-4 text-base text-muted-foreground md:text-lg"
          >
            {t("desc")}
          </motion.p>
        </header>

        {/* Projects grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {displayedProjects.map((project, idx) => (
            <motion.div
              key={project._id}
              variants={item}
              whileHover={shouldReduceMotion ? undefined : cardHover}
              className="h-full"
            >
              <Card className="relative h-full overflow-hidden transition-all duration-500 border border-border/70 group bg-card/60 backdrop-blur-xl text-card-foreground hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/50 flex flex-col rounded-2xl">
                {/* Ambient glow behind card on hover */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none bg-gradient-to-br from-primary/10 via-accent/5 to-transparent group-hover:opacity-100 -z-10" />

                {/* Image section */}
                <Link
                  href={`/projects/${project.slug.current}`}
                  className="block relative aspect-[16/10] w-full overflow-hidden bg-muted/80"
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:opacity-100" />

                  {/* Project number badge */}
                  <div className="absolute flex items-center justify-center w-10 h-10 font-bold rounded-xl shadow-lg top-3.5 right-3.5 bg-card/85 backdrop-blur-md text-foreground border border-border/60 text-xs tracking-wider">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  {/* Quick view button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white border rounded-full bg-white/15 backdrop-blur-md border-white/25 shadow-xl">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t("viewDetail")}</span>
                    </div>
                  </div>
                </Link>

                <CardHeader className="relative pb-3 space-y-3 pt-5">
                  {/* Categories */}
                  {project.categories && project.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.categories.slice(0, 3).map((category) => (
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

                  {/* Title */}
                  <Link
                    href={`/projects/${project.slug.current}`}
                    className="block group/title"
                  >
                    <CardTitle className="text-xl font-bold leading-snug transition-colors duration-200 text-pretty group-hover/title:text-primary">
                      {project.title}
                    </CardTitle>
                  </Link>
                </CardHeader>

                <CardContent className="relative flex flex-col gap-4 pt-0 flex-1 justify-between">
                  {/* Description */}
                  {project.shortDesc && (
                    <CardDescription className="text-sm leading-relaxed transition-colors text-pretty line-clamp-3 text-muted-foreground">
                      {project.shortDesc}
                    </CardDescription>
                  )}

                  <div className="space-y-3 pt-2 mt-auto">
                    {/* Published date */}
                    {project.publishedAt && (
                      <div className="text-xs text-muted-foreground/80 flex items-center justify-between border-t border-border/40 pt-3">
                        <span className="font-medium">{t("launched")}</span>
                        <span>
                          {new Date(project.publishedAt).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "short",
                            },
                          )}
                        </span>
                      </div>
                    )}

                    {/* Action button */}
                    <Button
                      asChild
                      className="w-full rounded-xl transition-all duration-300 shadow-md group/btn bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
                    >
                      <Link
                        href={`/projects/${project.slug.current}`}
                        aria-label={t("ariaLabel", { title: project.title })}
                        className="flex items-center justify-center gap-2 text-xs font-semibold py-2.5"
                      >
                        <span>{t("button")}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
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
            <Link href="/projects" className="flex items-center gap-2">
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

