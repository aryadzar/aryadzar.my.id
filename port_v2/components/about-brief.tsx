"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { About } from "@/types/aboutType";
import { useRef } from "react";
import {
  Award,
  Badge,
  Calendar,
  Code2,
  Coffee,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Palette,
  Rocket,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const skillHighlights = [
  { icon: Code2, label: "Full-stack Development", color: "text-blue-500" },
  { icon: Palette, label: "UI/UX Design", color: "text-purple-500" },
  { icon: Sparkles, label: "Creative Coding", color: "text-amber-500" },
  { icon: Award, label: "Problem Solving", color: "text-emerald-500" },
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
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute rounded-full top-20 -left-20 w-72 h-72 bg-purple-500/10 blur-3xl" />
        <div className="absolute rounded-full bottom-20 -right-20 w-96 h-96 bg-blue-500/10 blur-3xl" />
      </div>

      <div className="px-4 mx-auto max-w-7xl md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-primary/10 border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {t("aboutMe")}
            </span>
          </div>
          <h2
            id="about-heading"
            className="text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text"
          >
            {t("h1")}
          </h2>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column - Image & Quick Stats */}
          <motion.div
            className="space-y-6 lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Profile Image */}
            <div className="relative group">
              <div className="absolute transition duration-500 opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl group-hover:opacity-40 blur" />
              <div className="relative">
                <img
                  src={photo}
                  alt={`Foto ${name}`}
                  className="relative object-cover w-full shadow-2xl aspect-square rounded-2xl ring-1 ring-border"
                  loading="lazy"
                />
                {/* Floating Badge */}
                <div className="absolute p-4 border shadow-xl -bottom-4 -right-4 bg-background rounded-xl border-border">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t("poweredBy")}
                      </p>
                      <p className="text-sm font-semibold">
                        {t("coffeeAndCode")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            {/* <div className="p-6 space-y-3 border bg-card rounded-xl border-border">
              <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-muted-foreground">
                {t("getInTouch")}
              </h3>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center justify-center rounded-lg h-9 w-9 bg-primary/10">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t("locationLabel")}
                  </p>
                  <p className="font-medium">
                    {data?.location || "Jakarta, Indonesia"}
                  </p>
                </div>
              </div>
            </div> */}
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            className="space-y-8 lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Name & Title */}
            <div>
              <h3 className="mb-2 text-3xl font-bold md:text-4xl text-foreground">
                {name}
              </h3>
              <p className="text-xl font-medium text-primary">{title}</p>
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <p className="leading-relaxed text-foreground/90">
                {description}
              </p>
            </div>

            {/* Skill Highlights */}
            <div>
              <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase text-muted-foreground">
                {t("coreExpertise")}
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                {skillHighlights.map((skill, index) => (
                  <motion.div
                    key={skill.label}
                    className="flex items-center gap-3 p-4 transition-all border cursor-pointer rounded-xl bg-card border-border hover:border-primary/50 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className={`p-2 rounded-lg bg-background/50 ${skill.color}`}
                    >
                      <skill.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium transition-colors text-foreground group-hover:text-primary">
                      {skill.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quote or Philosophy */}
            <motion.div
              className="relative p-6 border rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="absolute font-serif text-6xl leading-none top-4 left-4 text-primary/20">
                "
              </div>
              <p className="relative pl-8 text-lg italic text-foreground/90">
                {t("philosophyText")}
              </p>
              <div className="flex items-center gap-2 pl-8 mt-3">
                <div className="flex-1 h-px bg-primary/20" />
                <span className="text-sm text-muted-foreground">
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
