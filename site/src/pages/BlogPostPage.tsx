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


export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { post, notFound, headings } = useFetchBloggerPost(slug, "");
  useCodeHighlighter(post?.content);

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
        className="relative mt-10 z-10 max-w-4xl mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
          <BackToBlog />
          <PostHeader title={post.title} date={new Date(post.published).toLocaleDateString()} />
          <PostCover image={extractFirstImage(post.content) ?? "/placeholder.svg"} title={post.title} />
          <PostBody>{renderWithZoom(post.content)}</PostBody>
          <GiscusComment/>
        {/* </TracingBeam> */}
      </motion.div>
    </div>
  )
}
