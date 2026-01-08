"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, GraduationCap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getEducation } from "@/lib/getHome";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExEdSkeleton } from "./skeleton";

type Education = {
  degree: string;
  school: string;
  field: string;
  date: string;
  id?: string;
  logoAlt: string;
  logoSrc: string;
};

export function EducationSection({
  educations,
  limit = 6,
}: {
  educations?: Education[];
  limit?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.education");

  const { locale } = useParams<{ locale: string }>();

  const { data: items, isLoading } = useQuery({
    queryKey: ["education"],
    queryFn: () => getEducation(locale),
  });

  return (
    <section aria-labelledby="education-heading" className="py-10 md:py-12">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap
            className="size-5 text-foreground/80"
            aria-hidden="true"
          />
          <h2
            id="education-heading"
            className="text-2xl font-semibold text-pretty text-foreground"
          >
            {t("h1")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {isLoading ? (
            <ExEdSkeleton />
          ) : (
            items?.education.map((item, idx) => {
              const MotionDiv = prefersReducedMotion ? "div" : motion.div;
              return (
                <MotionDiv
                  key={`${item.school}-${idx}`}
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
                          <h3 className="text-lg font-medium truncate text-pretty text-foreground">
                            {item.degree}
                          </h3>
                          <p className="text-sm text-foreground/70">
                            {item.school}
                          </p>
                          <p className="text-sm text-foreground/60">
                            {item.field}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            <div className="inline-flex items-center gap-1 text-sm text-foreground/70">
                              <Calendar className="size-4" aria-hidden="true" />
                              <span>{item.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </MotionDiv>

                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-ring transition-[ring-width] group-hover:ring-1 group-focus-within:ring-1" />
                  </Card>
                </MotionDiv>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
