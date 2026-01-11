import { getTranslations } from "next-intl/server";
import AboutPage from "./_components/about-page";
import { createMetadata } from "@/lib/metadata";
import { getAbout, getCertificate } from "@/lib/getHome";

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
  const [aboutData, certificateData] = await Promise.all([
    getAbout(locale),
    getCertificate(6),
  ]);
  return <AboutPage aboutData={aboutData} certificateData={certificateData} />;
}
