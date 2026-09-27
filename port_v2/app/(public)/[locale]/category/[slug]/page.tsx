import { getTranslations, setRequestLocale } from "next-intl/server";
import CategoryPage from "./_components/category";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "metadata.category",
  });
  return createMetadata({
    title: t("title"),
    description: t("description"),
    url: `/`,
    locale: locale,
  });
}

// Rendered on first visit, then cached (no slugs are known at build time).
export function generateStaticParams() {
  return [];
}

export default async function CategoryIndexPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CategoryPage />;
}
