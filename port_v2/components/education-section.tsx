"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BookOpen, Calendar, GraduationCap } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { EducationData } from "@/types/educationType";

export function EducationSection({
  data,
  limit = 6,
}: {
  data: EducationData;
  limit?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.education");

  return (
    <section
      aria-labelledby="education-heading"
      className="relative py-20 overflow-hidden md:py-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-amber-500/10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 rounded-full w-96 h-96 bg-purple-500/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-6xl px-4 mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-card/60 backdrop-blur-md border border-border/80 shadow-sm text-amber-500">
              <GraduationCap
                className="w-5 h-5 text-amber-500"
                aria-hidden="true"
              />
            </div>
            <h2
              id="education-heading"
              className="text-3xl font-extrabold text-transparent md:text-4xl lg:text-5xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text"
            >
              {t("h1")}
            </h2>
          </div>
          <p className="text-muted-foreground ml-12 text-base md:text-lg">
            {t("description")}
          </p>
        </motion.div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data?.education.map((item, idx) => {
            const MotionDiv = prefersReducedMotion ? "div" : motion.div;
            return (
              <MotionDiv
                key={`${item.school}-${idx}`}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx * 0.1,
                }}
              >
                <Card className="relative h-full overflow-hidden transition-all duration-500 group hover:shadow-2xl hover:shadow-amber-500/10 border border-border/70 hover:border-amber-500/40 bg-card/60 backdrop-blur-xl rounded-2xl">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent group-hover:opacity-100" />

                  <div className="relative p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      {/* School Logo */}
                      <motion.div
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : { scale: 1.08, rotate: -3 }
                        }
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex-shrink-0"
                      >
                        <div className="relative w-14 h-14 overflow-hidden transition-colors border border-border/80 shadow-md rounded-2xl group-hover:border-amber-500/50 bg-card p-2 flex items-center justify-center">
                          <Image
                            src={item.logo.src || "/placeholder.svg"}
                            alt={item.logo.alt}
                            width={56}
                            height={56}
                            className="object-contain"
                          />
                        </div>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        {/* Degree */}
                        <h3 className="mb-1 text-lg font-bold transition-colors text-foreground group-hover:text-amber-500 line-clamp-2">
                          {item.degree}
                        </h3>

                        {/* School Name */}
                        <div className="flex items-center gap-1.5 text-foreground/85 text-sm font-medium mb-1">
                          <BookOpen className="flex-shrink-0 w-3.5 h-3.5 text-amber-500" />
                          <span>{item.school}</span>
                        </div>

                        {/* Field of Study */}
                        <p className="text-xs text-muted-foreground">
                          {item.field}
                        </p>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="mt-4 pt-3 border-t border-border/40">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Calendar
                          className="w-3.5 h-3.5 text-amber-500"
                          aria-hidden="true"
                        />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Border Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] transition-transform duration-500 transform scale-x-0 bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0 group-hover:scale-x-100" />
                </Card>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}

