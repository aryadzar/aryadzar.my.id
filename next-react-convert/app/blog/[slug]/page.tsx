"use server"

import { notFound } from "next/navigation"
import { extractFirstImage } from "@/src/utils/thumbnail-ext"
import { api } from "@/src/utils/api"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type BloggerPost = {
  id: string
  title: string
  content: string
  published: string
}

async function fetchPost(slug: string): Promise<BloggerPost | null> {
  try {
    const res = await api.get(`/posts/${slug}`, {
      params: {
        key: process.env.NEXT_PUBLIC_API_BLOG_KEY,
      },
    })

    return res.data
  } catch (error) {
    console.error("Fetch error:", error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug)
  if (!post) return {}

  const cleanContent = post.content.replace(/<[^>]+>/g, "")
  return {
    title: post.title,
    description: cleanContent.slice(0, 120) + "...",
    openGraph: {
      title: post.title,
      description: cleanContent.slice(0, 120) + "...",
      images: [extractFirstImage(post.content) ?? "/placeholder.svg"],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug)

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-[#0a0a18] text-white relative overflow-hidden">
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
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Go back</span>
        </Link>

        <div className="mt-10">
          <p className="text-gray-400">{new Date(post.published).toLocaleDateString()}</p>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-8">{post.title}</h1>
        </div>

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
          prose-img:mx-auto
          prose-img:object-cover
          max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  )
}
