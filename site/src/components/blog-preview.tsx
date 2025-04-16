"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
    date: "March 15, 2025",
    image: "/placeholder.svg?height=400&width=600",
    slug: "future-web-development-2025",
  },
  {
    id: 2,
    title: "Mastering Next.js: Tips and Tricks",
    excerpt: "Learn advanced techniques to take your Next.js applications to the next level.",
    date: "February 28, 2025",
    image: "/placeholder.svg?height=400&width=600",
    slug: "mastering-nextjs-tips-tricks",
  },
  {
    id: 3,
    title: "Intern UPT TIK bermitra PT PGN GasNet",
    excerpt: "My experience as an intern at UPT TIK in partnership with PT PGN GasNet.",
    date: "January 24, 2025",
    image: "/placeholder.svg?height=400&width=600",
    slug: "intern-upt-tik-pgn-gasnet",
  },
]

interface BlogPostCardProps {
  post: BlogPost
  index: number
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
          <p className="text-gray-300">{post.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  )
}

export default function BlogPreview() {
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
              className="group inline-flex items-center gap-2 text-primary hover:text-primary-foreground transition-colors"
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

