"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExperienceData } from "@/types/experienceType";

export function ExperienceSection({ data, limit = 6 }: { data: ExperienceData; limit?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.experience");

  return (
    <section aria-labelledby="experience-heading" className="py-10 md:py-12">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="size-5 text-foreground/80" aria-hidden="true" />
          <h2
            id="experience-heading"
            className="text-2xl font-semibold text-pretty text-foreground"
          >
            {t("h1")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {data?.experience.map((item, idx) => {
            const MotionDiv = prefersReducedMotion ? "div" : motion.div;
            return (
              <MotionDiv
                key={`${item.company}-${idx}`}
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                  delay: idx * 0.05,
                }}
              >
                <Card className="relative p-5 overflow-hidden transition-shadow group rounded-xl border-border bg-card">
                  <MotionDiv
                    whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 26,
                      mass: 0.6,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={item.logo.src || "/placeholder.svg"}
                        alt={item.logo.alt}
                        width={48}
                        height={48}
                        className="object-contain w-12 h-12 border rounded-md border-border"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-pretty text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm text-foreground/70">
                          {item.company}
                        </p>

                        <div className="inline-flex items-center gap-1 mt-2 text-sm text-foreground/70">
                          <Calendar className="size-4" aria-hidden="true" />
                          <span>{item.duration}</span>
                        </div>

                        <p className="mt-3 text-sm text-foreground/70">
                          {item.description}
                        </p>

                        {item.skills && item.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.skills.map((skill, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="text-xs rounded-full"
                              >
                                {skill.title}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </MotionDiv>

                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-ring transition-[ring-width] group-hover:ring-1 group-focus-within:ring-1" />
                </Card>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
