import { getTranslations, setRequestLocale } from "next-intl/server";
import SkillsPage from "./_components/skills-page";
import { createMetadata } from "@/lib/metadata";
import { getSkills } from "@/lib/getHome";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "metadata.skills",
  });
  return createMetadata({
    title: t("title"),
    description: t("description"),
    url: `/skills`,
    locale: locale,
  });
}

export default async function SkillsPageIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const skillsData = await getSkills();
  return <SkillsPage skillsData={skillsData} locale={locale} />;
}
