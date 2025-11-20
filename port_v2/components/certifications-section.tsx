"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, BadgeCheck, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCertificate } from "@/lib/getHome";
import { useMemo } from "react";
import { CertificationSkeleton } from "./skeleton";
import { useTranslations } from "next-intl";

export function CertificationsSection({ limit = 6 }: { limit?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.certificate");

  const { data: certificate, isLoading } = useQuery({
    queryKey: ["certificate"],
    queryFn: () => getCertificate(),
  });

  if (isLoading) return <CertificationSkeleton />;
  return (
    <section
      aria-labelledby="certifications-heading"
      className="py-12 md:py-16"
    >
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <BadgeCheck
            className="size-5 text-foreground/80"
            aria-hidden="true"
          />
          <h2
            id="certifications-heading"
            className="text-2xl font-semibold text-pretty text-foreground"
          >
            {t("h1")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {certificate?.map((item, idx) => {
            const MotionDiv = prefersReducedMotion ? "div" : motion.div;
            return (
              <MotionDiv
                key={`${item.title}-${idx}`}
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, y: 12 }
                }
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
                  {/* Hover lift effect via framer-motion on wrapper, and ring on card */}
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
                      <img
                        src={item.logoSrc || "/placeholder.svg"}
                        alt={item.logoAlt}
                        width={48}
                        height={48}
                        className="object-contain w-12 h-12 border rounded-md border-border"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium truncate text-pretty text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm text-foreground/70">
                          {item.issuer}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <div className="inline-flex items-center gap-1 text-sm text-foreground/70">
                            <Calendar className="size-4" aria-hidden="true" />
                            <span>{item.date}</span>
                          </div>
                          {item.id ? (
                            <Badge
                              variant="secondary"
                              className="text-xs rounded-full"
                            >
                              ID: {item.id}
                            </Badge>
                          ) : null}
                        </div>

                        <div className="mt-4">
                          {item.href ? (
                            <Link
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm rounded text-foreground/80 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              aria-label={`View Certificate: ${item.title}`}
                            >
                              <ExternalLink
                                className="size-4"
                                aria-hidden="true"
                              />
                              <span>{t("href")}</span>
                            </Link>
                          ) : (
                            <span className="inline-flex items-center gap-2 text-sm text-foreground/60">
                              <ExternalLink
                                className="size-4"
                                aria-hidden="true"
                              />
                              <span>{t("href")}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </MotionDiv>

                  {/* focus/hover ring using tokens, no hard-coded colors */}
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
