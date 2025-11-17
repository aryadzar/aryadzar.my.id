import BlogDetailView from "./_components/blogDetail";
import { getBlog } from "@/lib/getBlogs";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: slugs } = await params;
  const blog = await getBlog(slugs, "en");

  if (!blog?.blog) {
    return createMetadata({
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
      url: `/blog/${slugs}`,
    });
  }

  const { title, excerpt, thumbnail, slug } = blog.blog;

  return createMetadata({
    title: title,
    description: excerpt ?? title,
    image: typeof thumbnail === "string" ? thumbnail : undefined,
    url: `/blog/${slug.current}`,
    keywords: blog.blog.categories?.map((c: any) => c.title) ?? [],
    locale: "en",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <BlogDetailView slug={slug} />;
}
