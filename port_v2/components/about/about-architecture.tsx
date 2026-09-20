"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ARCH_EDGES, ARCH_NODES, CONTENT_TYPES, type ArchNodeId } from "@/constants/architecture";
import { routing } from "@/i18n/routing";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { AboutSection, SectionHead } from "./section";
import { ThreeCanvas } from "./three-canvas";
import type { ArchitectureController } from "./three/architecture";

const css = (color: number) => "#" + color.toString(16).padStart(6, "0");
const nodeById = (id: ArchNodeId) => ARCH_NODES.find((n) => n.id === id)!;

export function AboutArchitecture({ commitTotal }: { commitTotal: number }) {
  const t = useTranslations("aboutPage.architecture");
  const [selected, setSelected] = useState<ArchNodeId>("next");
  const [controller, setController] = useState<ArchitectureController | null>(null);

  const kinds = useMemo(
    () =>
      Object.fromEntries(ARCH_NODES.map((n) => [n.id, t(`nodes.${n.id}.kind`)])) as Record<ArchNodeId, string>,
    [t],
  );

  useEffect(() => {
    controller?.setSelected(selected);
  }, [controller, selected]);

  useEffect(() => {
    controller?.setKinds(kinds);
  }, [controller, kinds]);

  const node = nodeById(selected);
  const from = ARCH_EDGES.filter(([, to]) => to === selected).map(([f]) => nodeById(f).name);
  const to = ARCH_EDGES.filter(([f]) => f === selected).map(([, dest]) => nodeById(dest).name);
  const decisions = t.raw("decisions") as string[];

  const outcome = [
    { key: "commits", value: commitTotal },
    { key: "languages", value: routing.locales.length },
    { key: "types", value: CONTENT_TYPES },
  ];

  return (
    <AboutSection labelledBy="about-architecture-heading">
      <SectionHead
        id="about-architecture-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mt-8 grid grid-cols-1 items-stretch gap-[clamp(20px,3vw,40px)] md:mt-12 min-[1000px]:grid-cols-[minmax(0,1fr)_340px]">
        <Reveal className="min-w-0" y={28}>
          <ThreeCanvas<ArchitectureController>
            className="relative h-[min(590px,150vw)] overflow-hidden rounded-2xl border border-border/80 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,color-mix(in_oklab,var(--card)_80%,transparent),color-mix(in_oklab,var(--card)_25%,transparent))] min-[700px]:h-[clamp(400px,40vw,480px)]"
            label={t("sceneLabel")}
            onReady={setController}
            fallback={
              <p className="absolute inset-0 grid place-content-center p-6 text-center font-mono text-[13px] leading-relaxed text-muted-foreground">
                {t("fallback")}
              </p>
            }
            create={async (ctx) => {
              const { createArchitectureScene } = await import("./three/architecture");
              return createArchitectureScene(ctx.canvas, ctx.container, {
                reduce: ctx.reduce,
                dark: ctx.dark,
                selected,
                kinds,
                onSelect: setSelected,
              });
            }}
          />
        </Reveal>

        <Reveal className="flex min-w-0 flex-col gap-[18px]" delay={0.1}>
          <ul className="flex flex-wrap gap-2" aria-label={t("nodesLabel")}>
            {ARCH_NODES.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  aria-pressed={n.id === selected}
                  onClick={() => setSelected(n.id)}
                  style={{ "--k": css(n.color) } as CSSProperties}
                  className="inline-flex h-[34px] cursor-pointer items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 text-[13px] leading-none font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground aria-pressed:border-(--k) aria-pressed:bg-card aria-pressed:text-foreground aria-pressed:shadow-[0_0_0_3px_color-mix(in_oklab,var(--k)_16%,transparent)]"
                >
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-(--k)" />
                  {n.name}
                </button>
              </li>
            ))}
          </ul>

          <div
            aria-live="polite"
            style={{ "--k": css(node.color) } as CSSProperties}
            className="flex-1 rounded-2xl border border-border/70 bg-card/60 px-[22px] pt-[22px] pb-6 shadow-lg backdrop-blur-lg"
          >
            <p className="font-mono text-[11px] leading-none font-medium tracking-[0.09em] text-(--k) uppercase">
              {t(`nodes.${selected}.kind`)}
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight">{node.name}</h3>
            <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">
              {t(`nodes.${selected}.description`)}
            </p>
            {from.length + to.length > 0 ? (
              <ul className="mt-[18px] flex flex-wrap gap-1.5 border-t border-border pt-4 font-mono text-xs leading-none text-muted-foreground">
                {from.length > 0 ? <li className="py-1.5">{t("from")}</li> : null}
                {from.map((name) => (
                  <li key={`in-${name}`} className="rounded-lg bg-foreground/[0.06] px-2 py-1.5 text-foreground">
                    {name}
                  </li>
                ))}
                {to.length > 0 ? <li className="py-1.5">{t("to")}</li> : null}
                {to.map((name) => (
                  <li key={`out-${name}`} className="rounded-lg bg-foreground/[0.06] px-2 py-1.5 text-foreground">
                    {name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Reveal>
      </div>

      <RevealGroup
        className="mt-10 grid grid-cols-1 gap-[clamp(28px,4vw,56px)] md:mt-16 min-[900px]:grid-cols-3"
        stagger={0.12}
      >
        <RevealItem>
          <h3 className="mb-3.5 font-mono text-xs leading-none font-medium tracking-[0.09em] text-muted-foreground uppercase">
            {t("problemLabel")}
          </h3>
          <p className="leading-relaxed text-pretty">{t("problem")}</p>
        </RevealItem>

        <RevealItem>
          <h3 className="mb-3.5 font-mono text-xs leading-none font-medium tracking-[0.09em] text-muted-foreground uppercase">
            {t("decisionsLabel")}
          </h3>
          <ul className="grid gap-3">
            {decisions.map((d) => (
              <li key={d} className="grid grid-cols-[20px_1fr] gap-1.5 leading-normal">
                <Check className="mt-[3px] size-4 text-emerald-700 dark:text-emerald-400" strokeWidth={2.2} aria-hidden="true" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </RevealItem>

        <RevealItem>
          <h3 className="mb-3.5 font-mono text-xs leading-none font-medium tracking-[0.09em] text-muted-foreground uppercase">
            {t("outcomeLabel")}
          </h3>
          <dl>
            {outcome.map((o) => (
              <div
                key={o.key}
                className="flex items-baseline justify-between gap-4 border-b border-border py-3 first:pt-0"
              >
                <dt className="text-sm text-muted-foreground">{t(`outcomes.${o.key}`)}</dt>
                <dd className="text-right font-mono text-[22px] leading-none font-semibold tracking-tight tabular-nums">
                  {o.value}
                </dd>
              </div>
            ))}
          </dl>
        </RevealItem>
      </RevealGroup>
    </AboutSection>
  );
}
