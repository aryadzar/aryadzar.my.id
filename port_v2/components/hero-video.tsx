"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
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
        "relative isolate min-h-screen overflow-hidden bg-background",
      )}
    >
      {/* Video Background dengan parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 object-cover w-full h-full scale-105"
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
          "bg-gradient-to-br from-background/90 via-background/70 to-background/50",
          "dark:from-background/95 dark:via-background/80 dark:to-background/60",
        )}
        aria-hidden="true"
        initial={{ opacity: prefersReduced ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Vignette Effect */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]"
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
      <div className="relative z-10">
        <div className="flex items-center min-h-screen px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="w-full py-20 md:py-32">
            <motion.div
              className="max-w-4xl"
              initial={{
                opacity: prefersReduced ? 1 : 0,
                y: prefersReduced ? 0 : 30,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Badge/Label (optional) */}
              <motion.div
                initial={{
                  opacity: prefersReduced ? 1 : 0,
                  y: prefersReduced ? 0 : 20,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full bg-primary/10 text-primary backdrop-blur-sm border-primary/20">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary"></span>
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-primary"></span>
                  </span>
                  {t("availableForWork")}
                </span>
              </motion.div>

              {/* Title dengan gradient text */}
              <motion.h1
                className={cn(
                  "text-5xl font-bold tracking-tight text-balance",
                  "sm:text-6xl md:text-7xl lg:text-8xl",
                  "bg-gradient-to-br from-foreground via-foreground to-foreground/70",
                  "bg-clip-text text-transparent",
                  "dark:from-white dark:via-white dark:to-white/70",
                )}
                data-sanity={data._id}
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
                  "text-muted-foreground max-w-2xl",
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
                <CvModal
                  cvLink={data?.cvUrl as string}
                  data-sanity={dataAttribute?.("cvUrl")}
                />
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
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm font-medium">{t("scrollDown")}</span>
          <ArrowDown className="w-5 h-5" />
        </div>
      </motion.div>
    </section>
  );
}
