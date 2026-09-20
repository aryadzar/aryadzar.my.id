"use client";

import { useTranslations } from "next-intl";
import { stegaClean } from "next-sanity";
import { CATEGORY_ORDER, fallbackSkills } from "@/constants/skills-data";
import type { Skill } from "@/types/skillType";
import { RevealGroup, RevealItem } from "./reveal";
import { AboutSection, SectionHead } from "./section";

type Level = 1 | 2 | 3;

function Dots({ level, label }: { level: Level; label: string }) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className="inline-flex flex-none gap-1"
    >
      {([1, 2, 3] as const).map((n) => (
        <i
          key={n}
          className={
            "size-2 rounded-full " +
            (n <= level ? (level === 1 ? "bg-indigo-500" : "bg-emerald-500") : "bg-foreground/15")
          }
        />
      ))}
    </span>
  );
}

export function AboutSkills({ skills }: { skills: Skill[] }) {
  const t = useTranslations("aboutPage.skills");
  const tGroups = useTranslations("skillsPage");

  const items = (
    skills.length
      ? skills.map((s) => ({
          name: stegaClean(s.name),
          category: stegaClean(s.category),
          level: s.level,
          order: s.order ?? 0,
        }))
      : fallbackSkills.map((s, i) => ({ name: s.name, category: s.category, level: undefined, order: i }))
  ) as { name: string; category: string; level?: Level; order: number }[];

  // Levels are optional in Sanity. Until they are filled in, show plain names rather than invent a rating.
  const hasLevels = items.some((s) => s.level);

  const groups = CATEGORY_ORDER.map((cat) => ({
    key: cat,
    label: tGroups(cat),
    items: items.filter((s) => s.category === cat).sort((a, b) => a.order - b.order),
  })).filter((g) => g.items.length > 0);

  return (
    <AboutSection labelledBy="about-skills-heading">
      <SectionHead
        id="about-skills-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <RevealGroup
        className="mt-9 grid grid-cols-1 gap-[clamp(24px,3vw,44px)] md:mt-14 min-[480px]:grid-cols-2 min-[1000px]:grid-cols-4"
        stagger={0.1}
      >
        {groups.map((g) => (
          <RevealItem key={g.key}>
            <h3 className="border-b border-foreground pb-3 font-mono text-xs leading-none font-medium tracking-[0.09em] uppercase">
              {g.label}
            </h3>
            <ul>
              {g.items.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center justify-between gap-3 border-b border-border py-[11px] text-[15px] font-medium"
                >
                  <span>{s.name}</span>
                  {hasLevels && s.level ? <Dots level={s.level} label={t(`levels.${s.level}`)} /> : null}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      {hasLevels ? (
        <RevealGroup
          className="mt-7 flex flex-wrap items-center gap-x-[22px] gap-y-2 font-mono text-xs leading-none text-muted-foreground"
          delay={0.2}
        >
          {([3, 2, 1] as const).map((n) => (
            <RevealItem key={n} className="inline-flex items-center gap-2" y={8}>
              <Dots level={n} label="" />
              {t(`levels.${n}`)}
            </RevealItem>
          ))}
        </RevealGroup>
      ) : null}
    </AboutSection>
  );
}
