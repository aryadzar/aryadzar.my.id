"use client";

import { getAbout } from "@/lib/getHome";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import { AboutSkeleton } from "./skeleton";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export function AboutBrief() {
  const prefersReduced = useReducedMotion();
  const { locale } = useParams();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["about", locale],
    queryFn: () => getAbout(locale as string),
  });

  const t = useTranslations("home.about");

  let name = data?.name;
  let title = data?.jobTitle;
  let description = data?.description;
  let photo = data?.imageUrl;

  if (isLoading) return <AboutSkeleton />;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-12 md:py-16"
    >
      <div className="max-w-5xl px-4 mx-auto md:px-6">
        <h2
          id="about-heading"
          className="text-2xl font-semibold tracking-tight text-balance"
        >
          {t("h1")}
        </h2>
        <div className="flex flex-col items-start gap-6 mt-6 md:mt-8 md:flex-row md:gap-8">
          <motion.img
            src={photo}
            alt={`Foto ${name}`}
            width={300}
            height={300}
            className="object-cover w-56 h-56 rounded-xl ring-1 ring-border"
            loading="lazy"
            initial={{
              opacity: prefersReduced ? 1 : 0,
              x: prefersReduced ? 0 : -16,
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={prefersReduced ? undefined : { scale: 1.02 }}
          />
          <motion.div
            className="flex-1"
            initial={{
              opacity: prefersReduced ? 1 : 0,
              x: prefersReduced ? 0 : 16,
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: prefersReduced ? 0 : 0.05,
            }}
          >
            <div className="mb-2">
              <p className="text-xl font-medium text-pretty">{name}</p>
              {title ? (
                <p className="text-pretty text-muted-foreground">{title}</p>
              ) : null}
            </div>
            <p className="leading-relaxed text-pretty text-foreground/90">
              {description}
            </p>
            {/* {actions ? <div className="flex flex-wrap gap-3 mt-4">{actions}</div> : null} */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
