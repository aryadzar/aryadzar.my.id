"use client";

import Image from "next/image";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { stegaClean } from "next-sanity";
import { Button } from "@/components/ui/button";
import { CONTACT_HREF } from "@/constants/contact";
import type { About } from "@/types/aboutType";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { CTA_FRAME, CTA_OUTLINE } from "./section";
import { ThreeCanvas } from "./three-canvas";

const CORE_FALLBACK = ["React", "Next.js", "Node.js", "Go"];
const INFRA_FALLBACK = ["Docker", "Kubernetes", "Keycloak"];

function LogoFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square w-[min(56%,240px)] overflow-hidden rounded-[22%] border border-border/40 bg-card/80 p-3 shadow-[0_0_0_10px_color-mix(in_oklab,var(--color-emerald-500)_10%,transparent),0_0_0_22px_color-mix(in_oklab,var(--color-indigo-500)_8%,transparent)] backdrop-blur-md">
        <Image
          src="/kabukimono.png"
          alt="Scaramouche Chibi"
          fill
          className="object-contain p-2"
          priority
        />
      </div>
    </div>
  );
}

export function AboutIntro({ about, plaques }: { about?: About; plaques: string[] }) {
  const t = useTranslations("aboutPage.intro");

  const name = about?.name ?? "Arya Dzaky";
  const location = about?.location ?? t("locationDefault");
  const timezone = about?.timezone ?? t("timezoneDefault");
  const core = (about?.coreStack?.length ? about.coreStack : CORE_FALLBACK).map(stegaClean);
  const infra = (about?.infrastructure?.length ? about.infrastructure : INFRA_FALLBACK).map(stegaClean);

  const facts = [
    { key: "role", label: t("roleLabel"), value: about?.jobTitle ?? t("roleDefault") },
    { key: "based", label: t("basedLabel"), value: `${location} · ${timezone}` },
    { key: "core", label: t("coreLabel"), value: core.join(" · ") },
    { key: "infra", label: t("infraLabel"), value: infra.join(" · ") },
  ];

  return (
    <section
      aria-labelledby="about-heading"
      className="relative z-[2] mx-auto grid w-full max-w-[1200px] items-center gap-2 px-4 pt-28 pb-14 md:px-6 md:pt-32 min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] min-[900px]:gap-10 min-[900px]:pb-[72px] lg:px-8"
    >
      <RevealGroup className="relative z-[3] flex flex-col items-start" stagger={0.08}>
        <RevealItem as="p" className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-border/80 bg-card/70 px-4 py-2 text-[13px] font-medium shadow-md backdrop-blur-xl">
          <span className="relative flex size-2.5" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
            <span className="absolute inset-0 rounded-full bg-emerald-500" />
          </span>
          {t("available")}
          <span aria-hidden="true" className="text-muted-foreground">
            &bull;
          </span>
          <span className="inline-flex items-center gap-1 font-semibold">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {t("tag")}
          </span>
        </RevealItem>

        <RevealItem as="div">
          <h1
            id="about-heading"
            className="mt-6 text-[clamp(2.25rem,4.6vw,3.6rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance"
          >
            <span>{about?.headlineA ?? t("headlineA")}</span>{" "}
            <span className="bg-linear-to-br from-muted-foreground to-muted-foreground/55 bg-clip-text text-transparent">
              {about?.headlineB ?? t("headlineB")}
            </span>
          </h1>
        </RevealItem>

        <RevealItem as="p" className="mt-5 max-w-[33em] text-[clamp(1.02rem,1.6vw,1.2rem)] leading-[1.65] text-pretty text-muted-foreground">
          {t.rich("lead", {
            name,
            location,
            strong: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong>,
          })}
        </RevealItem>

        <RevealItem as="dl" className="mt-8 grid w-full max-w-[34em] grid-cols-1 border-t border-border min-[480px]:grid-cols-2">
          {facts.map((f) => (
            <div key={f.key} className="border-b border-border py-3.5 pr-4 min-[480px]:even:border-l min-[480px]:even:pl-4">
              <dt className="font-mono text-[11px] leading-none font-medium tracking-[0.08em] text-muted-foreground uppercase">
                {f.label}
              </dt>
              <dd className="mt-2 text-[14.5px] leading-snug font-medium">{f.value}</dd>
            </div>
          ))}
        </RevealItem>

        <RevealItem className="mt-7 flex flex-wrap items-center gap-3">
          {about?.cvUrl ? (
            <div className={CTA_FRAME}>
              <Button asChild size="lg" className="h-10 rounded-[10px] px-6 shadow-lg">
                <a href={stegaClean(about.cvUrl)} target="_blank" rel="noopener noreferrer">
                  <FileText aria-hidden="true" />
                  {t("cv")}
                </a>
              </Button>
            </div>
          ) : null}
          <Button asChild variant="outline" size="lg" className={CTA_OUTLINE}>
            <a href={CONTACT_HREF}>
              {t("contact")}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </RevealItem>
      </RevealGroup>

      <Reveal
        delay={0.15}
        y={0}
        className="relative z-[1] mt-2 h-[clamp(320px,62vw,460px)] min-w-0 min-[900px]:mt-0 min-[900px]:h-auto min-[900px]:min-h-[clamp(440px,44vw,600px)] min-[900px]:self-stretch min-[900px]:-mr-[clamp(8px,3vw,32px)]"
      >
        <ThreeCanvas
          className="absolute inset-0"
          label={t("sceneLabel")}
          fallback={<LogoFallback />}
          create={async (ctx) => {
            const { createIdentityScene } = await import("./three/identity");
            return createIdentityScene(ctx.canvas, ctx.container, {
              reduce: ctx.reduce,
              dark: ctx.dark,
              plaques,
            });
          }}
        >
          <p className="pointer-events-none absolute right-2 bottom-0 font-mono text-xs leading-none text-muted-foreground">
            {t("hint")}
          </p>
        </ThreeCanvas>
      </Reveal>
    </section>
  );
}
