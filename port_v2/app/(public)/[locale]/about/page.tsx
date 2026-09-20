import { getTranslations } from "next-intl/server";
import { stegaClean } from "next-sanity";
import AboutPage from "./_components/about-page";
import { createMetadata } from "@/lib/metadata";
import { getAbout, getSkills } from "@/lib/getHome";
import { getActivity, REPOSITORY_COMMITS } from "@/lib/getActivity";

// Names shown on the 3D badge until skills are rated "Daily" in Sanity.
const FALLBACK_PLAQUES = ["Next.js", "Node.js", "Go", "PostgreSQL", "Docker", "Kubernetes"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "metadata.about",
  });
  return createMetadata({
    title: t("title"),
    description: t("description"),
    url: `/`,
    locale: locale,
  });
}

export default async function AboutPageIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [aboutData, skillsData, activity] = await Promise.all([
    getAbout(locale),
    getSkills(),
    getActivity(),
  ]);

  const daily = (skillsData ?? [])
    .filter((s) => s.level === 3)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((s) => stegaClean(s.name))
    .slice(0, 6);

  return (
    <AboutPage
      aboutData={aboutData}
      skillsData={skillsData ?? []}
      activity={activity}
      commitTotal={REPOSITORY_COMMITS}
      plaques={daily.length >= 3 ? daily : FALLBACK_PLAQUES}
    />
  );
}
