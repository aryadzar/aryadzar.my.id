"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { About } from "@/types/aboutType";
import { useRef } from "react";
import {
  Award,
  Code2,
  Coffee,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";
import Image from "next/image";

const skillHighlights = [
  {
    icon: Code2,
    label: "Full-stack Development",
    desc: "React, Next.js, Node.js & Go",
    color: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
    border: "group-hover:border-blue-500/40",
  },
  {
    icon: Palette,
    label: "UI/UX & Design Systems",
    desc: "Tailwind, Motion & Clean Systems",
    color: "text-purple-500 dark:text-purple-400",
    bg: "bg-purple-500/10 dark:bg-purple-500/15",
    border: "group-hover:border-purple-500/40",
  },
  {
    icon: Zap,
    label: "Cloud & Microservices",
    desc: "Docker, Kubernetes & Keycloak",
    color: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    border: "group-hover:border-amber-500/40",
  },
  {
    icon: Award,
    label: "Problem Solving",
    desc: "Scalable & maintainable code",
    color: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    border: "group-hover:border-emerald-500/40",
  },
];

export function AboutBrief({ data }: { data?: About }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const name = data?.name;
  const title = data?.jobTitle;
  const description = data?.description;
  const photo = data?.imageUrl;
  const t = useTranslations("home.about");

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative py-20 overflow-hidden md:py-32"
    >
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute rounded-full top-20 -left-20 w-80 h-80 bg-purple-500/10 blur-3xl animate-pulse-glow" />
        <div
          className="absolute rounded-full bottom-20 -right-20 w-96 h-96 bg-blue-500/10 blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="px-4 mx-auto max-w-7xl md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 border rounded-full bg-card/60 backdrop-blur-md border-border/80 text-primary text-xs sm:text-sm font-medium shadow-sm">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span>{t("aboutMe")}</span>
          </div>
          <h2
            id="about-heading"
            className="text-4xl font-extrabold tracking-tight text-transparent md:text-5xl lg:text-6xl bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text"
          >
            {t("h1")}
          </h2>
          <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary" />
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column - Image & Quick Profile Card */}
          <motion.div
            className="space-y-6 lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Profile Image with modern frame & floating badges */}
            <div className="relative group">
              <div className="absolute transition duration-700 opacity-30 -inset-2 bg-gradient-to-r from-purple-600 via-primary to-blue-600 rounded-3xl group-hover:opacity-60 blur-xl" />
              <div className="relative p-2 rounded-3xl bg-card/70 backdrop-blur-xl border border-border/80 shadow-2xl">
                {photo ? (
                  <img
                    src={photo}
                    alt={`Foto ${name || "Profile"}`}
                    className="relative object-cover w-full aspect-square rounded-2xl ring-1 ring-border/50 transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full aspect-square rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                    Photo
                  </div>
                )}

                {/* Floating Coffee & Code Badge */}
                <div className="absolute p-3.5 border shadow-xl -bottom-4 -right-4 bg-card/90 backdrop-blur-xl rounded-2xl border-border/80 group-hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/15 text-amber-500">
                      <Coffee className="w-5 h-5 animate-bounce" style={{ animationDuration: "3s" }} />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        {t("poweredBy")}
                      </p>
                      <p className="text-sm font-bold text-foreground">
                        {t("coffeeAndCode")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content & Bento Grid */}
          <motion.div
            className="space-y-8 lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Name & Title */}
            <div>
              <h3 className="mb-2 text-3xl font-extrabold md:text-4xl text-foreground">
                {name}
              </h3>
              <p className="text-xl font-semibold text-primary">{title}</p>
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <p className="leading-relaxed text-foreground/85 text-base md:text-lg">
                {description}
              </p>
            </div>

            {/* Skill Highlights Bento */}
            <div>
              <h4 className="mb-4 text-xs font-bold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                {t("coreExpertise")}
              </h4>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {skillHighlights.map((skill, index) => (
                  <motion.div
                    key={skill.label}
                    className={`flex items-start gap-3.5 p-4 transition-all duration-300 border rounded-2xl bg-card/60 backdrop-blur-md border-border/70 hover:shadow-xl hover:shadow-primary/5 group cursor-default ${skill.border}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -3, scale: 1.01 }}
                  >
                    <div className={`p-2.5 rounded-xl ${skill.bg} ${skill.color} transition-transform duration-300 group-hover:scale-110 flex-shrink-0 mt-0.5`}>
                      <skill.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm transition-colors text-foreground group-hover:text-primary">
                        {skill.label}
                      </h5>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {skill.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quote or Philosophy Card */}
            <motion.div
              className="relative p-6 border rounded-2xl bg-card/60 backdrop-blur-xl border-border/80 shadow-md overflow-hidden group hover:border-primary/40 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10" />
              <div className="absolute font-serif text-7xl font-bold leading-none top-2 left-4 text-primary/15 select-none pointer-events-none">
                “
              </div>
              <p className="relative pl-8 text-base md:text-lg italic text-foreground/90 leading-relaxed font-serif">
                {t("philosophyText")}
              </p>
              <div className="flex items-center gap-3 pl-8 mt-4">
                <div className="w-8 h-[2px] bg-primary/40 rounded-full" />
                <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                  {t("myPhilosophy")}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

