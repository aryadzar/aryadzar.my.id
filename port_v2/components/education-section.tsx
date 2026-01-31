"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      className="relative py-16 overflow-hidden md:py-24"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-amber-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 rounded-full w-96 h-96 bg-purple-500/5 blur-3xl" />
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
            <div className="p-2 rounded-lg bg-amber-500/10">
              <GraduationCap
                className="w-5 h-5 text-amber-600 dark:text-amber-500"
                aria-hidden="true"
              />
            </div>
            <h2
              id="education-heading"
              className="text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text"
            >
              {t("h1")}
            </h2>
          </div>
          <p className="text-muted-foreground ml-14">
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
                <Card className="relative h-full overflow-hidden transition-all duration-300 group hover:shadow-xl hover:shadow-amber-500/5 border-border/50 hover:border-amber-500/30 dark:hover:border-amber-600/30">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent group-hover:opacity-100" />

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {/* School Logo */}
                      <motion.div
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : { scale: 1.1, rotate: -5 }
                        }
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative w-16 h-16 overflow-hidden transition-colors border-2 shadow-lg rounded-xl border-border group-hover:border-amber-500/50 bg-background">
                          <Image
                            src={item.logo.src || "/placeholder.svg"}
                            alt={item.logo.alt}
                            width={64}
                            height={64}
                            className="object-contain p-2"
                          />
                        </div>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        {/* Degree */}
                        <h3 className="mb-1 text-lg font-bold transition-colors text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-500 line-clamp-2">
                          {item.degree}
                        </h3>

                        {/* School Name */}
                        <div className="flex items-center gap-1.5 text-foreground/80 mb-1">
                          <BookOpen className="flex-shrink-0 w-4 h-4 text-amber-600 dark:text-amber-500" />
                          <span className="font-medium">{item.school}</span>
                        </div>

                        {/* Field of Study */}
                        <p className="text-sm text-muted-foreground">
                          {item.field}
                        </p>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar
                          className="w-4 h-4 text-amber-600 dark:text-amber-500"
                          aria-hidden="true"
                        />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Border Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 transition-transform duration-500 transform scale-x-0 bg-gradient-to-r from-amber-500/0 via-amber-600 to-amber-500/0 group-hover:scale-x-100" />
                </Card>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
