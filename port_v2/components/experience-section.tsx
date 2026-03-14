"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase, Clock, Building2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExperienceData } from "@/types/experienceType";

export function ExperienceSection({
  data,
  limit = 6,
}: {
  data: ExperienceData;
  limit?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.experience");

  return (
    <section
      aria-labelledby="experience-heading"
      className="relative py-16 overflow-hidden md:py-24"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 rounded-full w-96 h-96 bg-blue-500/5 blur-3xl" />
      </div>

      <div className="max-w-6xl px-4 mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Briefcase className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <h2
              id="experience-heading"
              className="text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text"
            >
              {t("h1")}
            </h2>
          </div>
          <p className="text-muted-foreground ml-14">
            {t("description")}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-0 bottom-0 hidden w-px left-6 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent md:block" />

          <div className="grid grid-cols-1 gap-6">
            {data?.experience.map((item, idx) => {
              const MotionDiv = prefersReducedMotion ? "div" : motion.div;
              return (
                <MotionDiv
                  key={`${item.company}-${idx}`}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                  whileInView={
                    prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                  }
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: idx * 0.1,
                  }}
                >
                  <div className="relative md:ml-16">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[4.5rem] top-8 hidden md:block">
                      <div className="relative">
                        <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                        <div className="absolute inset-0 w-4 h-4 rounded-full opacity-75 bg-primary animate-ping" />
                      </div>
                    </div>

                    <Card className="relative overflow-hidden transition-all duration-300 group hover:shadow-xl hover:shadow-primary/5 border-border/50 hover:border-primary/30">
                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent group-hover:opacity-100" />

                      <div className="relative p-6">
                        <div className="flex items-start gap-5">
                          {/* Company Logo */}
                          <motion.div
                            whileHover={
                              prefersReducedMotion
                                ? undefined
                                : { scale: 1.1, rotate: 5 }
                            }
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="relative overflow-hidden transition-colors border-2 shadow-lg w-14 h-14 rounded-xl border-border group-hover:border-primary/50 bg-background">
                              <Image
                                src={item.logo.src || "/placeholder.svg"}
                                alt={item.logo.alt}
                                width={56}
                                height={56}
                                className="object-contain p-2"
                              />
                            </div>
                          </motion.div>

                          <div className="flex-1 min-w-0">
                            {/* Header Info */}
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                              <div className="flex-1 min-w-0">
                                <h3 className="mb-1 text-xl font-bold transition-colors text-foreground group-hover:text-primary">
                                  {item.title}
                                </h3>
                                <div className="flex items-center gap-2 text-base text-foreground/80">
                                  <Building2 className="w-4 h-4 text-primary/70" />
                                  <span className="font-medium">
                                    {item.company}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Calendar
                                  className="w-4 h-4 text-primary/70"
                                  aria-hidden="true"
                                />
                                <span>{item.duration}</span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="mb-4 leading-relaxed text-foreground/80">
                              {item.description}
                            </p>

                            {/* Skills */}
                            {item.skills && item.skills.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {item.skills.map((skill) => (
                                  <Badge
                                    key={skill._id}
                                    variant="secondary"
                                    className="text-xs transition-colors rounded-full cursor-default hover:bg-primary/20 hover:text-primary"
                                  >
                                    {skill.title}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Border Effect */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 transition-transform duration-500 transform scale-x-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 group-hover:scale-x-100" />
                    </Card>
                  </div>
                </MotionDiv>
              );
            })}
          </div>
        </div>

        {/* View More Button (if needed) */}
        {data?.experience.length > limit && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <button className="px-6 py-3 font-medium transition-all border rounded-xl border-border hover:border-primary/50 hover:bg-primary/5 group">
              <span className="flex items-center gap-2">
                {t("viewAll")}
                <Clock className="w-4 h-4 transition-transform group-hover:rotate-12" />
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
