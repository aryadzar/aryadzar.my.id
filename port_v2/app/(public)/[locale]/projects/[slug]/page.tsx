import { createMetadata } from "@/lib/metadata";
import ProjectDetail from "./_components/project-detail";
import { getProject } from "@/lib/getProject";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: slugs } = await params;
  const project = await getProject(slugs, "en");

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
    locale: "en",
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProjectDetail slug={slug} />;
}
