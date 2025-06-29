"use client"

import { api } from "@/utils/api"
import { extractFirstImage } from "@/utils/thumbnail-ext"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loading from "./loading"
import { generateSlug } from "@/utils/slug-helper"
import { decodeHtmlEntities } from "@/utils/header-helper"



export interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    image?: string;
    date: string;
    excerpt: string;
    slug: string;
  };
  index: number;
}

function BlogPostCard({ post, index }: BlogPostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group glow-on-hover rounded-2xl overflow-hidden"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative h-48 mb-4 overflow-hidden rounded-t-lg">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-400 mb-2">{post.date}</p>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
          <p className="text-gray-300" dangerouslySetInnerHTML={{ 
            __html : post.excerpt
           }}>{}</p>
        </div>
      </Link>
    </motion.article>
  )
}



export default function BlogPreview() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await api.get(`/posts`, { 
          params: {
            maxResults: 3,        // Maksimal 3 post
            orderBy: "published", // Urut dari yang terbaru
          }
        });
        const items = res.data.items || [];
        const filteredItems = items.filter((item: any) => {
          return !item.labels?.includes("Project");
        });
        const formattedPosts: any[] = filteredItems.map((item: any) => ({
          id: item.id,
          title: item.title,
          image: extractFirstImage(item.content) ?? "/placeholder.svg",
          date: new Date(item.published).toLocaleDateString(),
          excerpt: decodeHtmlEntities(item.content.replace(/<[^>]+>/g, "").slice(0, 120) + "..."),
          slug: generateSlug(item.title, item.id), // or create a slug from title if needed
        }));

        console.log(items);

        setBlogPosts(formattedPosts);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
      }finally{
        setIsLoading(false)
      }
    }

    fetchPosts();
  }, []);
  if (isLoading){
    return <Loading/>
  } 
  return (
    <section id="blog" className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold glow-on-hover p-2 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Latest Blog Posts
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-primary text-gray-400 hover:text-white transition-colors "
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

