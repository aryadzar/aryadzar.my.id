// import { Link } from "react-router-dom"
// import { ArrowLeft } from "lucide-react"
// import BackHome from "@/utils/BackHome"
// import { posts } from "@/post"

// interface BlogPost {
//   id: number
//   title: string
//   excerpt: string
//   date: string
//   image: string
//   slug: string
//   category: string
// }

// const blogPosts: BlogPost[] = [
//   {
//     id: 1,
//     title: "The Future of Web Development in 2025",
//     excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
//     date: "March 15, 2025",
//     image: "/placeholder.svg?height=400&width=600",
//     slug: "future-web-development-2025",
//     category: "Web Development",
//   },
//   {
//     id: 2,
//     title: "Mastering Next.js: Tips and Tricks",
//     excerpt: "Learn advanced techniques to take your Next.js applications to the next level.",
//     date: "February 28, 2025",
//     image: "/placeholder.svg?height=400&width=600",
//     slug: "mastering-nextjs-tips-tricks",
//     category: "Next.js",
//   },
//   {
//     id: 3,
//     title: "Intern UPT TIK bermitra PT PGN GasNet",
//     excerpt: "My experience as an intern at UPT TIK in partnership with PT PGN GasNet.",
//     date: "January 24, 2025",
//     image: "/placeholder.svg?height=400&width=600",
//     slug: "intern-upt-tik-pgn-gasnet",
//     category: "Internship",
//   },
//   {
//     id: 4,
//     title: "The Power of Tailwind CSS",
//     excerpt: "Why Tailwind CSS has become my go-to framework for styling web applications.",
//     date: "January 10, 2025",
//     image: "/placeholder.svg?height=400&width=600",
//     slug: "power-of-tailwind-css",
//     category: "CSS",
//   },
//   {
//     id: 5,
//     title: "Building Accessible Web Applications",
//     excerpt: "Best practices for creating web applications that everyone can use.",
//     date: "December 20, 2024",
//     image: "/placeholder.svg?height=400&width=600",
//     slug: "building-accessible-web-applications",
//     category: "Accessibility",
//   },
//   {
//     id: 6,
//     title: "Getting Started with TypeScript",
//     excerpt: "A beginner's guide to using TypeScript in your JavaScript projects.",
//     date: "December 5, 2024",
//     image: "/placeholder.svg?height=400&width=600",
//     slug: "getting-started-with-typescript",
//     category: "TypeScript",
//   },
// ]

// export default function BlogPage() {
//   return (
//     <div className="min-h-screen bg-black text-white">
//       <div className="max-w-6xl mx-auto px-6 py-12">
//         <div className="mb-8">
//           <BackHome/>
//         </div>

//         <h1 className="text-4xl md:text-5xl font-bold mb-16">Blog</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {posts.map((post) => (
//             <article key={post.id} className="group">
//               <Link to={`/blog/${post.slug}`} className="block">
//                 <div className="relative h-48 mb-4 overflow-hidden rounded-2xl">
//                   <img
//                     src={post.image || "/placeholder.svg"}
//                     alt={post.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                   <div className="absolute top-3 left-3 bg-violet-600 px-3 py-1 rounded-full text-xs font-medium">
//                     {post.categories}
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-400 mb-2">{post.date}</p>
//                 <h2 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">{post.title}</h2>
//                 <p className="text-gray-300">{post.excerpt}</p>
//               </Link>
//             </article>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

