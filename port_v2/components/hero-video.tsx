"use client";

import { Button } from "@/components/ui/button";
import { getHero } from "@/lib/getHome";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { HeroSkeleton } from "./skeleton";
import CvModal from "./cv/cvModal";

export function HeroVideoBackground() {
  const prefersReduced = useReducedMotion();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["hero", "en"],
    queryFn: () => getHero("en"),
  });

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <section
      aria-label="Hero dengan video latar belakang"
      className={cn(
        "relative isolate min-h-[80vh] overflow-hidden bg-background"
      )}
    >
      {/* Video latar (dekoratif) */}
      <video
        className="absolute inset-0 object-cover w-full h-full"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={data?.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay untuk keterbacaan teks */}
      <motion.div
        className={cn("absolute inset-0 bg-background/70")}
        aria-hidden="true"
        initial={{ opacity: prefersReduced ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Konten */}
      <div className="relative z-10">
        <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center px-4 py-16 md:py-24">
          <motion.div
            className="max-w-2xl"
            initial={{
              opacity: prefersReduced ? 1 : 0,
              y: prefersReduced ? 0 : 16,
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              {data?.title}
            </h1>
            <p className="mt-4 text-lg text-pretty md:text-xl text-muted-foreground">
              {data?.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <CvModal cvLink={data?.cvUrl as string} />

              {/* <Button asChild size="lg" variant="secondary">
                <a href="">Coba</a>
              </Button> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
