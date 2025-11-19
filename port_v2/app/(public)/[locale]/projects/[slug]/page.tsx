import { createMetadata } from "@/lib/metadata";
import ProjectDetail from "./_components/project-detail";
import { getProjectSSR } from "@/lib/ssr/getProjectSSR";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug: slugs, locale } = await params;
  const project = await getProjectSSR(slugs, locale);

  if (!project?.project) {
    return createMetadata({
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
      url: `/projects/${slugs}`,
    });
  }

  const { title, shortDesc, thumbnail, slug } = project.project;

  return createMetadata({
    title: title,
    description: shortDesc ?? title,
    image: typeof thumbnail === "string" ? thumbnail : undefined,
    url: `/projects/${slug.current}`,
    keywords: project.project.categories?.map((c: any) => c.title) ?? [],
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
