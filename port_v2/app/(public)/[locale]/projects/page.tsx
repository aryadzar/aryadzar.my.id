import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import ProjectsPage from "./_components/project";
import { createMetadata } from "@/lib/metadata";
import { BlogSkeleton } from "@/components/skeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "metadata.projects",
  });
  return createMetadata({
    title: t("title"),
    description: t("description"),
    url: `/`,
    locale: locale,
  });
}

export default function ProjectsIndexPage() {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <ProjectsPage />
    </Suspense>
  );
}

