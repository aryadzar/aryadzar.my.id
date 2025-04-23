// "use client"

// import { useParams, Link } from "react-router-dom"
// import { ArrowLeft } from "lucide-react"
// import NotFoundPage from "./ErrorPage"
// import { posts } from "@/post"

// // This would typically come from a database or CMS
// const blogPosts = {
//   "intern-upt-tik-pgn-gasnet": {
//     title: "Intern UPT TIK bermitra PT PGN GasNet",
//     date: "Friday, January 24, 2025",
//     image: "/placeholder.svg?height=600&width=1200",
//     content: [
//       {
//         heading: "Latar Belakang Perusahaan",
//         paragraphs: [
//           "PT PGN GasNet",
//           "Perusahaan yang menjadi mitra penulis adalah PT PGN Gasnet, yang merupakan bagian dari PGN Group, pemain utama dalam bisnis gas di Indonesia. Gasnet didirikan pada tahun 2013 sebagai diversifikasi layanan PGN untuk menyediakan solusi teknologi informasi yang terintegrasi.",
//           "Selama magang, saya berkesempatan untuk bekerja dengan tim pengembangan web yang bertanggung jawab untuk membangun dan memelihara aplikasi internal perusahaan. Pengalaman ini memberikan wawasan berharga tentang bagaimana teknologi informasi diimplementasikan dalam industri energi.",
//         ],
//       },
//       {
//         heading: "Kegiatan Magang",
//         paragraphs: [
//           "Selama program magang 3 bulan di UPT TIK yang bermitra dengan PT PGN GasNet, saya terlibat dalam berbagai proyek pengembangan web. Tugas utama saya meliputi:",
//           "1. Pengembangan antarmuka pengguna menggunakan React.js dan Next.js",
//           "2. Implementasi API untuk komunikasi dengan sistem backend",
//           "3. Pengujian dan debugging aplikasi web",
//           "4. Kolaborasi dengan tim desain untuk mengimplementasikan UI/UX",
//         ],
//       },
//       {
//         heading: "Hasil dan Pembelajaran",
//         paragraphs: [
//           "Program magang ini memberikan banyak pembelajaran berharga, terutama dalam pengembangan aplikasi web enterprise. Saya mendapatkan pengalaman langsung bekerja dengan teknologi modern seperti Next.js, TypeScript, dan sistem manajemen database.",
//           "Selain keterampilan teknis, saya juga belajar tentang proses pengembangan software dalam lingkungan perusahaan, termasuk metodologi agile, kontrol versi dengan Git, dan praktik code review.",
//         ],
//       },
//     ],
//   },
//   "future-web-development-2025": {
//     title: "The Future of Web Development in 2025",
//     date: "Wednesday, March 15, 2025",
//     image: "/placeholder.svg?height=600&width=1200",
//     content: [
//       {
//         heading: "Introduction",
//         paragraphs: [
//           "As we move further into 2025, the landscape of web development continues to evolve at a rapid pace. New technologies, frameworks, and methodologies are emerging, changing how we build and interact with the web.",
//           "In this article, we'll explore the most significant trends that are shaping the future of web development and what skills developers should focus on to stay relevant in this ever-changing field.",
//         ],
//       },
//       {
//         heading: "AI-Driven Development",
//         paragraphs: [
//           "Artificial Intelligence is no longer just a buzzword but an integral part of modern web development. AI-powered tools are now assisting developers in writing code, debugging, and even designing user interfaces.",
//           "These tools can analyze patterns in code, suggest optimizations, and automate repetitive tasks, allowing developers to focus on more creative and complex aspects of their projects.",
//         ],
//       },
//     ],
//   },
//   // Add other blog posts as needed
// }

// export default function BlogPostPage() {
//   const { slug } = useParams<{ slug: string }>()
//   const post = posts.find((p) => p.slug === slug);

//   if (!post) {
//     return <NotFoundPage status={404}/>
//   }
//   const Component = post.component;

//   return (
//     <div className="min-h-screen bg-[#0a0a18] text-white relative overflow-hidden">
//       {/* Stars background */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(100)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full bg-white"
//             style={{
//               width: `${Math.random() * 2 + 1}px`,
//               height: `${Math.random() * 2 + 1}px`,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               opacity: Math.random() * 0.7 + 0.3,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
//         <div className="mb-8">
//           <Link to="/blog" className="inline-flex items-center mt-5 gap-2 text-gray-400 hover:text-white transition-colors">
//             <ArrowLeft className="w-4 h-4" />
//             <span>Go back</span>
//           </Link>
//         </div>

//         <div className="mb-6">
//           <p className="text-gray-400">{post.date}</p>
//           <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-8">{post.title}</h1>
//         </div>

//         <div className="relative h-[300px] md:h-[400px] mb-12 rounded-2xl overflow-hidden">
//           <img src={ "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
//         </div>

//         <div className="prose prose-invert max-w-none">
//           {/* {post.content.map((section, index) => (
//             <div key={index} className="mb-12">
//               <h2 className="text-2xl md:text-3xl font-bold mb-6">{section.heading}</h2>
//               {section.paragraphs.map((paragraph, pIndex) => (
//                 <p key={pIndex} className="text-gray-300 mb-4 leading-relaxed">
//                   {paragraph}
//                 </p>
//               ))}
//             </div>
//           ))} */}
//           <Component/>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { api } from "@/utils/api"  // Axios instance kamu
import NotFoundPage from "./ErrorPage" 
import Loading from "@/components/loading"
import { extractFirstImage } from "@/utils/thumbnail-ext"
import MetaTags from "@/utils/MetaTags"

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

    async function fetchPost() {
      try {
        const res = await api.get(`/posts/${slug}`, {
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
    return <Loading/>
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
             prose-img:mx-auto
             prose-img:object-cover
             max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  )
}
