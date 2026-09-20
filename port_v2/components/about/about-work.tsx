"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { RevealGroup, RevealItem } from "./reveal";
import { AboutSection, SectionHead } from "./section";

const HABITS = ["backend", "interfaces", "content", "teaching"] as const;

export function AboutWork() {
  const t = useTranslations("aboutPage.work");

  return (
    <AboutSection labelledBy="about-work-heading">
      <SectionHead
        id="about-work-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <RevealGroup
        className="mt-9 grid grid-cols-1 gap-x-[clamp(28px,5vw,72px)] gap-y-[clamp(36px,5vw,64px)] md:mt-14 min-[700px]:grid-cols-2"
        stagger={0.1}
      >
        {HABITS.map((habit) => {
          const evidence = t.raw(`habits.${habit}.evidence`) as string[];
          return (
            <RevealItem key={habit} as="article" className="relative border-t border-border pt-[22px]">
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-0.5 w-11 bg-linear-to-r from-emerald-500 to-indigo-500"
              />
              <h3 className="text-[1.3rem] font-semibold tracking-tight text-balance">
                {t(`habits.${habit}.title`)}
              </h3>
              <p className="mt-2.5 max-w-[32em] leading-relaxed text-pretty text-muted-foreground">
                {t(`habits.${habit}.description`)}
              </p>
              <ul className="mt-[18px] grid gap-2 font-mono text-[12.5px] leading-[1.45]">
                {evidence.map((line) => (
                  <li key={line} className="grid grid-cols-[14px_1fr] items-start gap-2">
                    <span aria-hidden="true" className="mt-[0.55em] size-[5px] rounded-full bg-emerald-500" />
                    {line}
                  </li>
                ))}
              </ul>
              {habit === "teaching" ? (
                <Link
                  href="/#certifications"
                  className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium underline decoration-foreground/30 underline-offset-4 hover:decoration-emerald-500"
                >
                  {t("moreCerts")}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              ) : null}
            </RevealItem>
          );
        })}
      </RevealGroup>
    </AboutSection>
  );
}
