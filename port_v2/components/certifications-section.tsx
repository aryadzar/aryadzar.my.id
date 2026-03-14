"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  BadgeCheck,
  ExternalLink,
  Shield,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Certificate } from "@/types/certificateType";

export function CertificationsSection({
  data,
  limit = 6,
}: {
  data: Certificate[];
  limit?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.certificate");

  return (
    <section
      aria-labelledby="certifications-heading"
      className="relative py-16 overflow-hidden md:py-24"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 rounded-full right-1/4 w-96 h-96 bg-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-0 rounded-full left-1/4 w-96 h-96 bg-blue-500/5 blur-3xl" />
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
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <BadgeCheck
                className="w-5 h-5 text-emerald-600 dark:text-emerald-500"
                aria-hidden="true"
              />
            </div>
            <h2
              id="certifications-heading"
              className="text-3xl font-bold text-transparent md:text-4xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text"
            >
              {t("h1")}
            </h2>
          </div>
          <p className="text-muted-foreground ml-14">
            {t("description")}
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data?.map((item, idx) => {
            const MotionDiv = prefersReducedMotion ? "div" : motion.div;
            return (
              <MotionDiv
                key={item._id || `${item.title}-${idx}`}
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
                <Card className="relative h-full overflow-hidden transition-all duration-300 group hover:shadow-xl hover:shadow-emerald-500/5 border-border/50 hover:border-emerald-500/30">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent group-hover:opacity-100" />

                  {/* Verified Badge Icon */}
                  <div className="absolute transition-opacity duration-300 opacity-0 top-4 right-4 group-hover:opacity-100">
                    <div className="p-1.5 rounded-full bg-emerald-500/10">
                      <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                    </div>
                  </div>

                  <MotionDiv
                    whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 26,
                      mass: 0.6,
                    }}
                    className="relative p-6"
                  >
                    <div className="flex items-start gap-4">
                      {/* Certificate Logo */}
                      <motion.div
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : { scale: 1.1, rotate: 5 }
                        }
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative w-16 h-16 overflow-hidden transition-colors border-2 shadow-lg rounded-xl border-border group-hover:border-emerald-500/50 bg-background">
                          <img
                            src={item.logoSrc || "/placeholder.svg"}
                            alt={item.logoAlt}
                            width={64}
                            height={64}
                            className="object-contain p-2"
                          />
                        </div>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        {/* Certificate Title */}
                        <h3 className="mb-1 text-lg font-bold transition-colors text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-500 line-clamp-2">
                          {item.title}
                        </h3>

                        {/* Issuer */}
                        <div className="flex items-center gap-1.5 text-foreground/80 mb-3">
                          <Award className="flex-shrink-0 w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                          <span className="text-sm font-medium">
                            {item.issuer}
                          </span>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Calendar
                              className="w-4 h-4 text-emerald-600 dark:text-emerald-500"
                              aria-hidden="true"
                            />
                            <span>{item.date}</span>
                          </div>

                          {item.id && (
                            <Badge
                              variant="secondary"
                              className="text-xs rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                            >
                              ID: {item.id}
                            </Badge>
                          )}
                        </div>

                        {/* View Certificate Link */}
                        <div>
                          {item.href ? (
                            <Link
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 group/link"
                              aria-label={`View Certificate: ${item.title}`}
                            >
                              <ExternalLink
                                className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                                aria-hidden="true"
                              />
                              <span>{t("href")}</span>
                            </Link>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg cursor-not-allowed bg-muted/50 text-muted-foreground">
                              <ExternalLink
                                className="w-4 h-4"
                                aria-hidden="true"
                              />
                              <span>{t("href")}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </MotionDiv>

                  {/* Bottom Border Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 transition-transform duration-500 transform scale-x-0 bg-gradient-to-r from-emerald-500/0 via-emerald-600 to-emerald-500/0 group-hover:scale-x-100" />
                </Card>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
