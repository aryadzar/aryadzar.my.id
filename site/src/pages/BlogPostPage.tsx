import { useParams } from "react-router-dom"
import NotFoundPage from "./ErrorPage"
import Loading from "@/components/loading"
import { extractFirstImage } from "@/utils/thumbnail-ext"
import MetaTags from "@/utils/MetaTags"
import { motion } from "framer-motion"
import ModernTableOfContents from "@/components/table-of-contents"
import GiscusComment from "@/components/giscus"
import { useFetchBloggerPost } from "@/hooks/useFetchBloggerPost"
import { useCodeHighlighter } from "@/hooks/useCodeHighlighter"
import BackToBlog from "@/components/blog/back-to-blog"
import PostHeader from "@/components/blog/post-header"
import PostCover from "@/components/blog/post-cover"
import PostBody from "@/components/blog/post-body"
import { renderWithZoom } from "@/utils/imageHelperBlog"
import { useEffect } from "react"
import PostAuthor from "@/components/post-author"
import { useTranslation } from "react-i18next"


export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const { post, notFound, headings, fallbackMsg } = useFetchBloggerPost(slug, lang);

  useCodeHighlighter(post?.content);

  useEffect(() => {
    if (!post?.content) return;

    // ⏳ Delay agar konten ter-render dulu
    const hash = window.location.hash;
    if (hash) {
      const headingId = hash.slice(1);
      setTimeout(() => {
        const element = document.getElementById(headingId);
        if (element) {
          const yOffset = -120; // offset scroll (misal untuk navbar tinggi 80px)
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, [post?.content]);

  if (notFound) return <NotFoundPage status={404} />
  if (!post) return <Loading />

  return (
    <div className="min-h-screen bg-[#0a0a18] text-white relative overflow-hidden">
      <MetaTags
        title={post.title}
        description={post.content.replace(/<[^>]+>/g, "").slice(0, 120) + "..."}
        image={extractFirstImage(post.content) ?? undefined}
        name={post.title}
      />

      {/* Table of Contents */}
      <ModernTableOfContents headings={headings} />
      <motion.div
        className="relative z-10 max-w-4xl px-6 py-12 mx-auto mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <BackToBlog link="blog" />
        <PostHeader
          title={post.title}
          date={new Date(post.published).toLocaleDateString()}
        />
        {post.author && (
          <PostAuthor
            name={post.author.displayName}
            imageUrl={post.author.image?.url}
            publishedDate={post.published}
          />
        )}
        <PostCover
          image={extractFirstImage(post.content) ?? "/placeholder.svg"}
          title={post.title}
        />
        {fallbackMsg && (
          <div className="flex items-center gap-2 p-4 mb-4 text-sm text-red-600 border border-yellow-600 rounded-lg ">
            <span className="text-lg">⚠️</span>
            <span>{fallbackMsg}</span>
          </div>
        )}{" "}
        <PostBody>{renderWithZoom(post.content)}</PostBody>
        <GiscusComment />
        {/* </TracingBeam> */}
      </motion.div>
    </div>
  );
}
