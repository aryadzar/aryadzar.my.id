import { createMetadata } from "@/lib/metadata";
import ProjectDetail from "./_components/project-detail";
import { getProjectSSR } from "@/lib/ssr/getProjectSSR";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug: slugs, locale } = await params;
  const project = await getProjectSSR(slugs, locale);
  const t = await getTranslations({
    locale,
    namespace: "metadata.projectNotFound",
  });

  if (!project) {
    return createMetadata({
      title: t("title"),
      description: t("description"),
      url: `/projects/${slugs}`,
    });
  }

  const { title, shortDesc, thumbnail, slug } = project;

  return createMetadata({
    title: title,
    description: shortDesc ?? title,
    image: typeof thumbnail === "string" ? thumbnail : undefined,
    url: `/projects/${slug.current}`,
    keywords: project.categories?.map((c: any) => c.title) ?? [],
    locale: locale,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ProjectDetail />;
}
