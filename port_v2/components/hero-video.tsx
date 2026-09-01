"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ArrowDown, Sparkles } from "lucide-react";
import { createDataAttribute } from "next-sanity";
import { STUDIO_SANITY_URL } from "@/constants/studio-constant";
import { CvModal } from "./cv/cvModal";
import Link from "next/link";
import { Hero } from "@/types/homeType";

export function HeroVideoBackground({ data }: { data: Hero }) {
  const prefersReduced = useReducedMotion();
  const t = useTranslations("home.hero");
  const dataAttribute =
    data?._id && data._type
      ? createDataAttribute({
          baseUrl: STUDIO_SANITY_URL,
          id: data._id,
          type: data._type,
        })
      : null;

  return (
    <section
      aria-label={t("ariaLabel")}
      className={cn(
        "relative isolate min-h-screen flex items-center justify-center overflow-hidden bg-background",
      )}
    >
      {/* Video Background dengan parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 object-cover w-full h-full scale-105 opacity-60 dark:opacity-40"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source
            src={data?.videoUrl}
            data-sanity={dataAttribute?.("videoUrl")}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Gradient Overlay - lebih sophisticated */}
      <motion.div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-br from-background/95 via-background/80 to-background/60",
          "dark:from-background/95 dark:via-background/85 dark:to-background/70",
        )}
        aria-hidden="true"
        initial={{ opacity: prefersReduced ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Vignette Effect */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]"
        aria-hidden="true"
      />

      {/* Grid Pattern Overlay (subtle) */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="flex items-center min-h-screen px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="w-full py-24 md:py-32">
            <motion.div
              className="max-w-4xl"
              initial={{
                opacity: prefersReduced ? 1 : 0,
                y: prefersReduced ? 0 : 30,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Badge/Label */}
              <motion.div
                initial={{
                  opacity: prefersReduced ? 1 : 0,
                  y: prefersReduced ? 0 : 20,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-medium border rounded-full bg-card/70 text-foreground backdrop-blur-xl border-border/80 shadow-md shadow-primary/5 hover:border-primary/50 transition-all duration-300">
                  <span className="relative flex w-2.5 h-2.5">
                    <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-500"></span>
                    <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </span>
                  <span>{t("availableForWork")}</span>
                  <span className="text-muted-foreground/60">•</span>
                  <span className="text-primary font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Full-Stack & Cloud
                  </span>
                </div>
              </motion.div>

              {/* Title dengan gradient text */}
              <motion.h1
                className={cn(
                  "text-5xl font-extrabold tracking-tight text-balance",
                  "sm:text-6xl md:text-7xl lg:text-8xl",
                  "bg-gradient-to-br from-foreground via-foreground to-foreground/60",
                  "bg-clip-text text-transparent",
                  "dark:from-white dark:via-white dark:to-neutral-400",
                )}
                initial={{
                  opacity: prefersReduced ? 1 : 0,
                  y: prefersReduced ? 0 : 30,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {data?.title}
              </motion.h1>

              {/* Subtitle dengan better typography */}
              <motion.p
                className={cn(
                  "mt-6 text-lg text-pretty leading-relaxed",
                  "md:text-xl lg:text-2xl",
                  "text-muted-foreground max-w-2xl font-normal",
                )}
                data-sanity={dataAttribute?.("subtitle")}
                initial={{
                  opacity: prefersReduced ? 1 : 0,
                  y: prefersReduced ? 0 : 30,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {data?.subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap items-center gap-4 mt-10"
                initial={{
                  opacity: prefersReduced ? 1 : 0,
                  y: prefersReduced ? 0 : 30,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="relative group p-[1px] rounded-xl bg-gradient-to-r from-primary via-accent to-primary shadow-lg shadow-primary/15 transition-all duration-300 hover:shadow-primary/30">
                  <CvModal
                    cvLink={data?.cvUrl as string}
                    data-sanity={dataAttribute?.("cvUrl")}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute z-10 -translate-x-1/2 bottom-8 left-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <div className="flex flex-col items-center gap-2 px-3 py-1.5 rounded-full bg-card/40 backdrop-blur-md border border-border/40 text-muted-foreground text-xs font-medium hover:text-foreground transition-colors cursor-pointer">
          <span>{t("scrollDown")}</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}

