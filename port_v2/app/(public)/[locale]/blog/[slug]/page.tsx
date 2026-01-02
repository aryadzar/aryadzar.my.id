import BlogDetailView from "./_components/blogDetail";
import { getBlog } from "@/lib/getBlogs";
import { createMetadata } from "@/lib/metadata";
import { getBlogSSR } from "@/lib/ssr/getBlogSSR";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug: slugs, locale } = await params;
  const blog = await getBlogSSR(slugs, locale);
  const t = await getTranslations({
    locale,
    namespace: "metadata.blogNotFound",
  });

  if (!blog) {
    return createMetadata({
      title: t("title"),
      description: t("description"),
      url: `/blog/${slugs}`,
    });
  }

  const { title, excerpt, thumbnail, slug } = blog;

  return createMetadata({
    title: title,
    description: excerpt ?? title,
    image: typeof thumbnail === "string" ? thumbnail : undefined,
    url: `/blog/${slug.current}`,
    keywords: blog.categories?.map((c: any) => c.title) ?? [],
    locale: locale,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  return <BlogDetailView />;
}
