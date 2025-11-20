import BlogDetailView from "./_components/blogDetail";
import { getBlog } from "@/lib/getBlogs";
import { createMetadata } from "@/lib/metadata";
import { getBlogSSR } from "@/lib/ssr/getBlogSSR";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug: slugs, locale } = await params;
  const blog = await getBlogSSR(slugs, locale);

  if (!blog) {
    return createMetadata({
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
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
