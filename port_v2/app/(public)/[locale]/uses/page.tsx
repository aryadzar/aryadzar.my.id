import { getTranslations } from "next-intl/server";
import UsesPage from "./_components/uses-page";
import { createMetadata } from "@/lib/metadata";
import { getUses } from "@/lib/getHome";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "metadata.uses",
  });
  return createMetadata({
    title: t("title"),
    description: t("description"),
    url: `/uses`,
    locale: locale,
  });
}

export default async function UsesPageIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const usesData = await getUses(locale);
  return <UsesPage usesData={usesData} locale={locale} />;
}
