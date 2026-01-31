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
import { ExternalLink, Github, Sparkles, Tag } from "lucide-react";
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40, scale: 0.9 },
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

  const imageHover = {
    scale: 1.1,
    rotate: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  } as const;

  const displayedProjects = data?.projects.slice(0, limit) || [];

  return (
    <section
      aria-labelledby="projects-title"
      className="relative w-full overflow-hidden text-foreground"
    >
      {/* Animated background elements */}
      <div className="absolute left-0 rounded-full top-1/4 w-96 h-96 bg-primary/10 blur-3xl animate-pulse -z-10" />
      <div
        className="absolute right-0 rounded-full bottom-1/4 w-96 h-96 bg-accent/10 blur-3xl animate-pulse -z-10"
        style={{ animationDelay: "1s" }}
      />

      <div className="px-4 py-16 mx-auto max-w-7xl md:px-6 md:py-24">
        {/* Enhanced header */}
        <header className="mb-12 text-center md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-sm font-semibold tracking-wider uppercase text-primary">
              {t("portfolio")}
            </span>
          </motion.div>

          <motion.h2
            id="projects-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl"
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
              <Card className="relative h-full overflow-hidden transition-all duration-500 border-2 group border-border/50 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm text-card-foreground hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/60">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none bg-gradient-to-br from-primary/10 via-accent/10 to-transparent group-hover:opacity-100" />

                {/* Shine effect */}
                <div className="absolute inset-0 transition-opacity duration-700 opacity-0 pointer-events-none group-hover:opacity-100">
                  <div className="absolute top-0 w-1/2 h-full skew-x-12 -left-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine" />
                </div>

                {/* Image section */}
                <Link
                  href={`/projects/${project.slug.current}`}
                  className="block relative aspect-[16/9] w-full overflow-hidden bg-muted"
                >
                  <motion.div
                    whileHover={shouldReduceMotion ? undefined : imageHover}
                    className="w-full h-full"
                  >
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100" />

                  {/* Project number badge */}
                  <div className="absolute flex items-center justify-center w-12 h-12 font-bold rounded-full shadow-lg top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  {/* Quick view button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border rounded-full bg-white/10 backdrop-blur-md border-white/20">
                      <ExternalLink className="w-4 h-4" />
                      <span>{t("viewDetail")}</span>
                    </div>
                  </div>
                </Link>

                <CardHeader className="relative pb-4 space-y-3">
                  {/* Title */}
                  <Link
                    href={`/projects/${project.slug.current}`}
                    className="block group/title"
                  >
                    <CardTitle className="text-xl font-bold leading-tight transition-colors duration-200 text-pretty group-hover/title:text-primary">
                      {project.title}
                    </CardTitle>
                  </Link>

                  {/* Categories */}
                  {project.categories && project.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.categories.slice(0, 4).map((category) => (
                        <Badge
                          key={category._id}
                          variant="outline"
                          className="text-xs font-normal transition-colors cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {category.title}
                        </Badge>
                      ))}
                      {/* {project.categories.length > 4 && (
                        <Badge className="text-xs border-primary/30 text-primary">
                          +{project.categories.length - 4}
                        </Badge>
                      )} */}
                    </div>
                  )}
                </CardHeader>

                <CardContent className="relative flex flex-col gap-4 pt-0">
                  {/* Description */}
                  {project.shortDesc && (
                    <CardDescription className="text-sm leading-relaxed transition-colors text-pretty line-clamp-3 group-hover:text-foreground/80">
                      {project.shortDesc}
                    </CardDescription>
                  )}

                  {/* Published date */}
                  {project.publishedAt && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">{t("launched")}</span>{" "}
                      {new Date(project.publishedAt).toLocaleDateString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "short",
                        },
                      )}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-2 mt-auto">
                    <Button
                      asChild
                      className="flex-1 transition-all duration-300 shadow-lg group/btn bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl"
                    >
                      <Link
                        href={`/projects/${project.slug.current}`}
                        aria-label={t("ariaLabel", { title: project.title })}
                        className="flex items-center justify-center gap-2"
                      >
                        <span>{t("button")}</span>
                        <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>

                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-20 h-20 transition-opacity duration-500 rounded-tl-full opacity-0 bg-gradient-to-tl from-primary/5 to-transparent group-hover:opacity-100" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add this to your global CSS for the shine animation */}
      <style jsx>{`
        @keyframes shine {
          to {
            left: 150%;
          }
        }
        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
      `}</style>
    </section>
  );
}
