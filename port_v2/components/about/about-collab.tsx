"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CONTACT_HREF } from "@/constants/contact";
import { Link } from "@/i18n/navigation";
import type { About } from "@/types/aboutType";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { AboutSection, CTA_FRAME, CTA_OUTLINE, SectionHead } from "./section";

const STEPS = ["brief", "build", "ship"] as const;

export function AboutCollab({ about }: { about?: About }) {
  const t = useTranslations("aboutPage.collab");
  const tIntro = useTranslations("aboutPage.intro");
  const fit = t.raw("fit") as string[];
  const location = about?.location ?? tIntro("locationDefault");
  const timezone = about?.timezone ?? tIntro("timezoneDefault");

  return (
    <AboutSection labelledBy="about-collab-heading">
      <SectionHead
        id="about-collab-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <RevealGroup
        as="ol"
        className="mt-9 grid grid-cols-1 gap-9 md:mt-14 min-[900px]:grid-cols-3 min-[900px]:gap-[clamp(24px,4vw,56px)]"
        stagger={0.12}
      >
        {STEPS.map((step, i) => (
          <RevealItem key={step} as="li" className="relative pt-14">
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 grid size-9 place-items-center rounded-full border border-border bg-card font-mono text-[13px] leading-none font-medium"
            >
              {i + 1}
            </span>
            {i < STEPS.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-[18px] left-[46px] hidden h-px bg-linear-to-r from-emerald-500/60 to-indigo-500/60 min-[900px]:block min-[900px]:right-[calc(-1*clamp(24px,4vw,56px)+10px)]"
              />
            ) : null}
            <h3 className="text-xl font-semibold tracking-tight">{t(`steps.${step}.title`)}</h3>
            <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
              {t(`steps.${step}.description`)}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal>
        <ul className="mt-7 flex flex-wrap gap-2" aria-label={t("fitLabel")}>
          {fit.map((f) => (
            <li
              key={f}
              className="rounded-full border border-border bg-card/60 px-3.5 py-2 text-[13.5px] leading-none font-medium"
            >
              {f}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal
        className="relative mt-10 grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-[clamp(24px,3.5vw,40px)] shadow-lg backdrop-blur-xl md:mt-16 min-[700px]:grid-cols-[minmax(0,1fr)_auto]"
        y={28}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-[8%] top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent"
        />
        <div>
          <h3 className="text-[clamp(1.4rem,2.6vw,2rem)] leading-tight font-bold tracking-tight text-balance">
            {t("ctaTitle")}
          </h3>
          <ul className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12.5px] leading-tight text-muted-foreground">
            <li className="inline-flex items-center gap-2">
              <span className="relative flex size-2.5" aria-hidden="true">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
                <span className="absolute inset-0 rounded-full bg-emerald-500" />
              </span>
              {tIntro("available")}
            </li>
            <li>
              {location} · {timezone}
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className={CTA_FRAME}>
            <Button asChild size="lg" className="h-10 rounded-[10px] px-6 shadow-lg">
              <a href={CONTACT_HREF}>
                {tIntro("contact")}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
          <Button asChild variant="outline" size="lg" className={CTA_OUTLINE}>
            <Link href="/#certifications">{t("certifications")}</Link>
          </Button>
        </div>
      </Reveal>
    </AboutSection>
  );
}
