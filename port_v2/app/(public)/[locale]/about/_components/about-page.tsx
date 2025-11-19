"use client";

import { AboutBrief } from "@/components/about-brief";
import { CertificationsSection } from "@/components/certifications-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
const skills: string[] = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Framer Motion",
  "Shadcn UI",
  "Node.js",
  "REST/GraphQL",
];

export default function AboutPage() {
  const t = useTranslations("aboutPage");

  return (
    <main className="min-h-[60vh]">
      {/* Header */}
      <header className="max-w-5xl px-4 pt-10 mx-auto md:px-6 md:pt-14">
        <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-pretty text-muted-foreground">
          {t("description")}
        </p>
      </header>

      {/* About Brief */}
      <AboutBrief />

      {/* Keahlian */}
      <section aria-labelledby="skills-heading" className="py-10 md:py-14">
        <div className="max-w-5xl px-4 mx-auto md:px-6">
          <h2
            id="skills-heading"
            className="text-2xl font-semibold tracking-tight text-balance"
          >
            {t("skillsTitle")}
          </h2>
          <div className="flex flex-wrap gap-2 mt-5">
            {skills.map((s) => (
              <Badge key={s} variant="secondary" className="rounded-md">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications on About page */}
      <div id="certifications">
        <CertificationsSection limit={6} />
      </div>

      {/* CTA */}
      <section aria-labelledby="cta-heading" className="pb-16 md:pb-20">
        <div className="max-w-5xl px-4 mx-auto md:px-6">
          <h2 id="cta-heading" className="sr-only">
            {t("headingAction")}
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/#contact">{t("contact")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">{t("viewProjects")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
