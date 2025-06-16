"use server"

import { notFound } from "next/navigation"
import { extractFirstImage } from "@/src/utils/thumbnail-ext"
import { api } from "@/src/utils/api"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { extractIdFromSlug } from "@/src/utils/slug-helper"
import BlogClient from "@/components/BlogContentPage"
import preprocessHtmlWithZoomWrapper from "@/src/utils/imageHelperBlog.server"
import { addIdsToHeadings, extractHeadingsFromHtml } from "@/src/utils/header-helper.server"

type BloggerPost = {
  id: string
  title: string
  content: string
  published: string
}

async function fetchPost(slug: string): Promise<BloggerPost | null> {

  try {
    const res = await api.get(`/posts/${extractIdFromSlug(slug)}`, {
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
    const { slug } =  params

  const post = await fetchPost(slug)

  if (!post) notFound()
  const contentWithZoomWrapper = preprocessHtmlWithZoomWrapper(post.content);
  const contentWithIds = addIdsToHeadings(contentWithZoomWrapper);
  // console.log(extractHeadingsFromHtml(contentWithIds))
  // console.log(contentWithIds)
  return <BlogClient
        title={post.title}
        content={post.content}
        published={post.published}
        image={extractFirstImage(post.content) ?? '/placeholder.svg'}
        // headings={extractHeadingsFromHtml(contentWithIds)}
      />
}
