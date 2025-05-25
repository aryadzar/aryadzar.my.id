import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { api } from "@/utils/api"  // Axios instance kamu
import NotFoundPage from "./ErrorPage" 
import Loading from "@/components/loading"
import { extractFirstImage } from "@/utils/thumbnail-ext"
import MetaTags from "@/utils/MetaTags"
import { extractIdFromSlug } from "@/utils/slug-helper"

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

  useEffect(() => {
    if (!slug) return

    const id = extractIdFromSlug(slug ?? '')
    async function fetchPost() {
      try {
        const res = await api.get(`/posts/${id}`, {
          params: {
            key: import.meta.env.VITE_API_BLOG_KEY,
          },
        })
        setPost(res.data)
      } catch (err) {
        console.error("Post not found:", err)
        setNotFound(true)
      }
    }

    fetchPost()
  }, [slug])

  if (notFound) return <NotFoundPage status={404} />
  if (!post){
    return <Loading 
    // done={false}
    />
  } 

  return (
    <div className="min-h-screen bg-[#0a0a18] text-white relative overflow-hidden">
      {/* Stars background */}
      <MetaTags
          title={post.title}
          description={post.content.replace(/<[^>]+>/g, "").slice(0, 120) + "..."}
          image={ extractFirstImage(post.content) ?? undefined }
          name={post.title}
      />
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center mt-5 gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go back</span>
          </Link>
        </div>

        <div className="mb-6">
          <p className="text-gray-400">
            {new Date(post.published).toLocaleDateString()}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-8">
            {post.title}
          </h1>
        </div>

        {/* Optional: ambil gambar pertama dari content */}
        <div className="relative h-[300px] md:h-[400px] mb-12 rounded-2xl overflow-hidden">
          <img
            src={extractFirstImage(post.content) ?? "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="prose prose-invert prose-img:mx-auto 
             prose-video:mx-auto 
             prose-iframe:mx-auto 
             prose-img:rounded-xl 
             prose-video:rounded-xl
             prose-iframe:rounded-xl
             prose-a:hover:text-gray-500
             prose-img:object-cover
             max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  )
}
