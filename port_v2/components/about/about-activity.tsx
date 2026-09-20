"use client";

import { useFormatter, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { SHIPPED } from "@/constants/shipped";
import type { Activity } from "@/types/activityType";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { AboutSection, SectionHead } from "./section";
import { ThreeCanvas } from "./three-canvas";
import type { SkylineController, SkylineHover } from "./three/skyline";

const DAY = 86_400_000;
const HEAT = ["bg-foreground/10", "bg-emerald-500/40", "bg-emerald-500/65", "bg-emerald-500"];

function bucket(n: number, max: number): number {
  if (n <= 0 || max <= 0) return 0;
  const f = n / max;
  return f <= 1 / 3 ? 1 : f <= 2 / 3 ? 2 : 3;
}

export function AboutActivity({ activity }: { activity: Activity }) {
  const t = useTranslations("aboutPage.activity");
  const format = useFormatter();
  const [controller, setController] = useState<SkylineController | null>(null);
  const [hover, setHover] = useState<SkylineHover | null>(null);

  const kind = activity.source === "github" ? "Github" : "Repository";
  const { days } = activity;
  const startMs = Date.parse(activity.start + "T00:00:00Z");
  const weeks = Math.ceil(days.length / 7);

  let total = 0;
  let active = 0;
  let max = 0;
  let maxIndex = 0;
  days.forEach((n, i) => {
    total += n;
    if (n > 0) active += 1;
    if (n > max) {
      max = n;
      maxIndex = i;
    }
  });

  const fullDate = (index: number) =>
    format.dateTime(new Date(startMs + index * DAY), { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  const monthYear = (iso: string) =>
    format.dateTime(new Date(iso + "T00:00:00Z"), { month: "short", year: "numeric", timeZone: "UTC" });

  const startLabel = `${t("start")} · ${monthYear(activity.start).toUpperCase()}`;
  useEffect(() => {
    controller?.setStartLabel(startLabel);
  }, [controller, startLabel]);

  const stats = [
    { label: t(`total${kind}`), value: total },
    { label: t("activeDays"), value: active },
    { label: `${t("busiest")} · ${fullDate(maxIndex)}`, value: max },
  ];

  return (
    <AboutSection labelledBy="about-activity-heading">
      <SectionHead
        id="about-activity-heading"
        eyebrow={t("eyebrow")}
        title={t(`title${kind}`)}
        subtitle={t(`subtitle${kind}`, { weeks })}
      />

      <div className="mt-7 grid grid-cols-1 items-center gap-[clamp(24px,4vw,56px)] md:mt-11 min-[1000px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Reveal className="order-first min-w-0 min-[1000px]:order-none min-[1000px]:-ml-[clamp(8px,3vw,32px)]">
          <ThreeCanvas<SkylineController>
            className="relative h-[clamp(360px,46vw,540px)]"
            label={t("sceneLabel")}
            onReady={setController}
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="grid w-full grid-flow-col grid-rows-7 gap-0.5 p-4"
                >
                  {days.map((n, i) => (
                    <i key={i} className={"aspect-square rounded-[2px] " + HEAT[bucket(n, max)]} />
                  ))}
                </div>
              </div>
            }
            create={async (ctx) => {
              const { createSkylineScene } = await import("./three/skyline");
              return createSkylineScene(ctx.canvas, ctx.container, {
                reduce: ctx.reduce,
                dark: ctx.dark,
                days,
                startLabel,
                onHover: setHover,
              });
            }}
          >
            <div
              role="status"
              style={hover ? { left: hover.x, top: hover.y } : undefined}
              className={
                "pointer-events-none absolute top-0 left-0 z-[4] -translate-x-1/2 -translate-y-[120%] rounded-[10px] border border-border bg-card px-3 py-2 font-mono text-xs leading-snug font-medium whitespace-nowrap shadow-lg transition-opacity duration-100 " +
                (hover ? "opacity-100" : "opacity-0")
              }
            >
              {hover ? (
                <>
                  <b className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {t(`tip${kind}`, { count: days[hover.index] ?? 0 })}
                  </b>
                  {" · "}
                  {fullDate(hover.index)}
                </>
              ) : null}
            </div>
          </ThreeCanvas>
        </Reveal>

        <div className="min-w-0">
          <RevealGroup as="dl" className="mb-7 grid grid-cols-1 border-y border-border min-[480px]:grid-cols-3" stagger={0.1}>
            {stats.map((s) => (
              <RevealItem
                key={s.label}
                className="border-border py-4 pr-4 max-[479px]:border-b max-[479px]:last:border-b-0 min-[480px]:not-first:border-l min-[480px]:not-first:pl-4"
              >
                <dd className="font-mono text-[clamp(1.6rem,3vw,2.25rem)] leading-none font-semibold tracking-tight tabular-nums">
                  {s.value}
                </dd>
                <dt className="mt-2 text-[12.5px] leading-snug text-muted-foreground">{s.label}</dt>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <h3 className="mb-1.5 font-mono text-xs leading-none font-medium tracking-[0.09em] text-muted-foreground uppercase">
              {t("shippedTitle")}
            </h3>
          </Reveal>
          <RevealGroup as="ol" stagger={0.06}>
            {SHIPPED.map((row) => (
              <RevealItem
                key={row.key}
                as="li"
                y={12}
                className="grid grid-cols-[64px_1fr] gap-3 border-b border-border py-3 text-[14.5px] leading-snug min-[480px]:grid-cols-[78px_1fr] min-[480px]:gap-4"
              >
                <time dateTime={row.date} className="font-mono text-xs leading-[1.7] whitespace-nowrap text-muted-foreground">
                  {monthYear(row.date)}
                </time>
                <span>{t(`shipped.${row.key}`)}</span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <p className="mt-3.5 font-mono text-xs leading-normal text-muted-foreground">
              {t(`source${kind}`)}{" "}
              <span aria-hidden="true" className="inline-flex gap-[3px] align-middle">
                <i className="size-2.5 rounded-[2px] bg-foreground/15" />
                <i className="size-2.5 rounded-[2px] bg-[#0f7a55]" />
                <i className="size-2.5 rounded-[2px] bg-[#00a870]" />
                <i className="size-2.5 rounded-[2px] bg-[#00d492]" />
                <i className="size-2.5 rounded-[2px] bg-[#5eeab8]" />
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </AboutSection>
  );
}
