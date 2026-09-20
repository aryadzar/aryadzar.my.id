import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/** Page-width section with a hairline on top, shared by every block of the About page. */
export function AboutSection({
  id,
  labelledBy,
  children,
}: {
  id?: string;
  labelledBy: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className="relative z-[2] mx-auto w-full max-w-[1200px] px-4 py-16 md:px-6 md:py-24 lg:px-8"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-foreground/20 to-transparent md:inset-x-6 lg:inset-x-8"
      />
      {children}
    </section>
  );
}

export function SectionHead({
  id,
  eyebrow,
  title,
  subtitle,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="flex flex-col items-start">
      <p className="inline-flex items-center gap-2.5 font-mono text-xs leading-none font-medium tracking-[0.09em] text-muted-foreground uppercase">
        <span aria-hidden="true" className="h-px w-[18px] bg-linear-to-r from-emerald-500 to-indigo-500" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3.5 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.08] font-bold tracking-tight text-balance"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-[40em] text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed text-pretty text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Gradient hairline frame around the primary call to action. */
export const CTA_FRAME =
  "rounded-2xl bg-linear-to-r from-primary via-accent to-primary p-px shadow-lg shadow-primary/15";

export const CTA_OUTLINE =
  "h-[42px] rounded-full border-border bg-card/60 px-6 backdrop-blur-md hover:-translate-y-px hover:bg-card";
