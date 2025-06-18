import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { api } from "@/utils/api"  // Axios instance kamu
import NotFoundPage from "./ErrorPage"
import Loading from "@/components/loading"
import { extractFirstImage } from "@/utils/thumbnail-ext"
import MetaTags from "@/utils/MetaTags"
import { extractIdFromSlug } from "@/utils/slug-helper"
import { motion } from "framer-motion"
import ModernTableOfContents from "@/components/table-of-contents"
import { addIdsToHeadings, extractHeadingsFromHtml } from "@/utils/header-helper"
// import { TracingBeam } from "@/components/ui/tracing-beam"
import hljs from 'highlight.js';
import preprocessHtmlWithZoomWrapper, { renderWithZoom } from "@/utils/imageHelperBlog"
import GiscusComment from "@/components/giscus"


type BloggerPost = {
  id: string
  title: string
  content: string
  published: string
}


export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BloggerPost | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])

  useEffect(() => {
    if (!slug) return;

    const id = extractIdFromSlug(slug);
    async function fetchPost() {
      try {
        const res = await api.get(`/posts/${id}`, {
          params: {
            key: import.meta.env.VITE_API_BLOG_KEY,
          },
        });
        const labels = res.data.labels ?? []

        if(labels.includes("Project")){
            setNotFound(true)
            return
        }
        const contentWithZoomWrapper = preprocessHtmlWithZoomWrapper(res.data.content);
        // console.log(contentWithZoomWrapper);
        const contentWithIds = addIdsToHeadings(contentWithZoomWrapper);
        setHeadings(extractHeadingsFromHtml(contentWithIds));

        setPost({
          ...res.data,
          content: contentWithIds,
        });

        // Scroll ke #id jika ada hash setelah konten dimuat
        const hash = window.location.hash;
        if (hash) {
          const headingId = hash.slice(1);
          setTimeout(() => {
            const element = document.getElementById(headingId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 100);
        }
      } catch (err) {
        console.error("Post not found:", err);
        setNotFound(true);
      }
    }

    fetchPost();
  }, [slug]); // ✅ hanya slug

  useEffect(() => {
    if (!post?.content) return;

    const container = document.querySelector('.post-content');
    if (!container) return;

    container.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);

      const pre = block.parentElement;
      if (!pre || pre.querySelector('.copy-button')) return;

      const button = document.createElement('button');
      button.textContent = 'Copy';
      button.className =
        'copy-button absolute top-2 right-2 px-2 py-1 text-xs bg-gray-800 text-white rounded z-10';
      button.onclick = () => {
        navigator.clipboard.writeText((block as HTMLElement).innerText);
        button.textContent = 'Copied!';
        setTimeout(() => (button.textContent = 'Copy'), 1500);
      };

      pre.style.position = 'relative';
      pre.appendChild(button);
    });
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

      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Table of Contents */}
      <ModernTableOfContents headings={headings} />
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center mt-5 gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <motion.div whileHover={{ x: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            <span>Go back</span>
          </Link>
        </motion.div>
        {/* <TracingBeam> */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-400">{new Date(post.published).toLocaleDateString()}</p>
            <motion.h1
              className="text-3xl md:text-5xl font-bold mt-2 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {post.title}
            </motion.h1>
          </motion.div>

          <motion.div
            className="relative h-[300px] md:h-[400px] mb-12 rounded-2xl overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.img
              src={extractFirstImage(post.content) ?? "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          <motion.div
            className="post-content prose prose-invert max-w-none prose-p:mx-auto 
             prose-img:object-contain
              prose-img:mx-auto prose-video:mx-auto prose-iframe:mx-auto
              prose-img:rounded-xl prose-video:rounded-xl prose-iframe:rounded-xl
              prose-a:hover:text-gray-500 "
            // dangerouslySetInnerHTML={{ __html: post.content }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {renderWithZoom(post.content)}
          </motion.div>
          <GiscusComment/>
        {/* </TracingBeam> */}
      </motion.div>
    </div>
  )
}
