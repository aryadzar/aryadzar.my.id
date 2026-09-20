"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  BadgeCheck,
  ExternalLink,
  Shield,
  Award,
  Eye,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Certificate } from "@/types/certificateType";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function CertificationsSection({
  data,
  limit = 6,
}: {
  data: Certificate[];
  limit?: number;
}) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.certificate");

  const isPdf = Boolean(
    selectedCert?.href &&
      (selectedCert.href.toLowerCase().includes(".pdf") ||
        selectedCert.href.toLowerCase().includes("/files/"))
  );

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative py-20 overflow-hidden md:py-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 rounded-full right-1/4 w-96 h-96 bg-emerald-500/10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 rounded-full left-1/4 w-96 h-96 bg-blue-500/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
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
            <div className="p-2 rounded-xl bg-card/60 backdrop-blur-md border border-border/80 shadow-sm text-emerald-500">
              <BadgeCheck
                className="w-5 h-5 text-emerald-500"
                aria-hidden="true"
              />
            </div>
            <h2
              id="certifications-heading"
              className="text-3xl font-extrabold text-transparent md:text-4xl lg:text-5xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text"
            >
              {t("h1")}
            </h2>
          </div>
          <p className="text-muted-foreground ml-12 text-base md:text-lg">
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
                <Card className="relative h-full overflow-hidden transition-all duration-500 group hover:shadow-2xl hover:shadow-emerald-500/10 border border-border/70 hover:border-emerald-500/40 bg-card/60 backdrop-blur-xl rounded-2xl">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent group-hover:opacity-100" />

                  {/* Verified Badge Icon */}
                  <div className="absolute transition-opacity duration-300 opacity-0 top-4 right-4 group-hover:opacity-100">
                    <div className="p-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 shadow-md">
                      <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                  </div>

                  <div className="relative p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      {/* Certificate Logo */}
                      <motion.div
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : { scale: 1.08, rotate: 3 }
                        }
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex-shrink-0"
                      >
                        <div className="relative w-14 h-14 overflow-hidden transition-colors border border-border/80 shadow-md rounded-2xl group-hover:border-emerald-500/50 bg-card p-2 flex items-center justify-center">
                          <img
                            src={item.logoSrc || "/placeholder.svg"}
                            alt={item.logoAlt}
                            width={56}
                            height={56}
                            className="object-contain"
                          />
                        </div>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        {/* Certificate Title */}
                        <h3 className="mb-1 text-lg font-bold transition-colors text-foreground group-hover:text-emerald-500 line-clamp-2">
                          {item.title}
                        </h3>

                        {/* Issuer */}
                        <div className="flex items-center gap-1.5 text-foreground/80 mb-3 text-sm font-medium">
                          <Award className="flex-shrink-0 w-3.5 h-3.5 text-emerald-500" />
                          <span>{item.issuer}</span>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                            <Calendar
                              className="w-3.5 h-3.5 text-emerald-500"
                              aria-hidden="true"
                            />
                            <span>{item.date}</span>
                          </div>

                          {item.id && (
                            <Badge
                              variant="secondary"
                              className="text-[11px] font-mono rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5"
                            >
                              ID: {item.id}
                            </Badge>
                          )}
                        </div>

                        {/* View Certificate Modal Trigger */}
                        <div>
                          {item.href ? (
                            <button
                              type="button"
                              onClick={() => setSelectedCert(item)}
                              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold transition-all rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/25 group/btn cursor-pointer hover:shadow-sm"
                              aria-label={`View Certificate: ${item.title}`}
                            >
                              <Eye
                                className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform"
                                aria-hidden="true"
                              />
                              <span>{t("href")}</span>
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-xl cursor-not-allowed bg-muted/50 text-muted-foreground border border-border/40">
                              <Eye
                                className="w-3.5 h-3.5"
                                aria-hidden="true"
                              />
                              <span>{t("href")}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Border Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] transition-transform duration-500 transform scale-x-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0 group-hover:scale-x-100" />
                </Card>
              </MotionDiv>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal Dialog */}
      <Dialog
        open={Boolean(selectedCert)}
        onOpenChange={(open) => {
          if (!open) setSelectedCert(null);
        }}
      >
        <DialogContent className="sm:max-w-5xl lg:max-w-6xl w-[96vw] h-[90vh] max-h-[92vh] flex flex-col p-0 gap-0 overflow-hidden border border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl rounded-2xl">
          {selectedCert && (
            <>
              {/* Modal Header */}
              <DialogHeader className="p-5 md:p-6 pb-4 border-b border-border/60 text-left shrink-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <Award className="w-3.5 h-3.5" />
                    {selectedCert.issuer}
                  </span>
                  {selectedCert.id && (
                    <Badge
                      variant="secondary"
                      className="text-[11px] font-mono rounded-md bg-muted/60 text-muted-foreground border border-border/60 px-2 py-0.5"
                    >
                      ID: {selectedCert.id}
                    </Badge>
                  )}
                </div>
                <DialogTitle className="text-xl md:text-2xl font-bold text-foreground line-clamp-2">
                  {selectedCert.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{selectedCert.date}</span>
                </DialogDescription>
              </DialogHeader>

              {/* Modal Certificate Preview Body */}
              <div className="flex-1 min-h-0 p-3 md:p-5 overflow-auto bg-muted/10 flex items-center justify-center">
                {isPdf ? (
                  <iframe
                    src={`${selectedCert.href}#toolbar=0`}
                    title={selectedCert.title}
                    className="w-full h-full min-h-[500px] rounded-xl border border-border/60 bg-white dark:bg-zinc-900 shadow-inner"
                  />
                ) : selectedCert.href ? (
                  <div className="relative flex items-center justify-center w-full h-full min-h-0 overflow-auto rounded-xl bg-muted/20 border border-border/40 p-2">
                    <img
                      src={selectedCert.href}
                      alt={selectedCert.title}
                      className="max-h-full max-w-full w-auto object-contain rounded-lg shadow-md"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground text-sm">
                    <Award className="w-12 h-12 mb-3 text-muted-foreground/30 stroke-1" />
                    <p>{t("noPreview")}</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <DialogFooter className="p-4 md:px-6 py-3.5 border-t border-border/60 bg-card/60 flex flex-row items-center justify-between sm:justify-between gap-3 shrink-0">
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {selectedCert.id ? `ID: ${selectedCert.id}` : selectedCert.issuer}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {selectedCert.href && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 rounded-lg gap-1.5 border-border/70 hover:bg-muted"
                      asChild
                    >
                      <a
                        href={selectedCert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{t("openNewTab")}</span>
                      </a>
                    </Button>
                  )}
                  <DialogClose asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-xs h-8 rounded-lg"
                    >
                      {t("close")}
                    </Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

