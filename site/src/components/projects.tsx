import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { api } from "@/utils/api"
import { extractFirstImage } from "@/utils/thumbnail-ext"
import { generateSlug } from "@/utils/slug-helper"
import Loading from "./loading"
import { Link } from "react-router-dom"
import { decodeHtmlEntities } from "@/utils/header-helper"
// import { Link } from "react-router-dom"

interface Project {
  id: number
  title: string
  excerpt: string
  image: string
  labels: string[]
  slug : string
}


interface ProjectCardProps {
  project: Project
  index: number
  className?: string
}

function ProjectCard({ project, index, className = "" }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl ${className} glow-on-hover`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

      <img
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-110"
      />

      <div className="relative z-20 flex flex-col h-full p-6 justify-end">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.labels.map((tag, i) => (
            <span key={i} className="text-xs bg-violet-600/80 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-4">{project.excerpt}</p>

        <div className="flex gap-3">
          <Link
            to={`/project/${project.slug}`}
            // target="_blank"
            className="flex items-center gap-1 px-3 py-1 bg-violet-600/80 rounded-full hover:bg-violet-500 transition-colors"
          >
            <span className="text-sm">Lihat Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          className="absolute inset-0 border-2 border-violet-500 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await api.get(`/posts`, { 
          params: {
            maxResults: 3,        // Maksimal 3 post
            orderBy: "published", // Urut dari yang terbaru
            labels: "Project"
          }
        });
        const items = res.data.items || [];

        const formattedPosts: any[] = items.map((item: any) => ({
          id: item.id,
          title: item.title,
          image: extractFirstImage(item.content) ?? "/placeholder.svg",
          date: new Date(item.published).toLocaleDateString(),
          labels : item.labels ?? [],
          excerpt: decodeHtmlEntities(item.content.replace(/<[^>]+>/g, "").slice(0, 120) + "..."),
          slug: generateSlug(item.title, item.id), // or create a slug from title if needed
        }));

        console.log(items);

        setProjects(formattedPosts);
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
    <section id="projects" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold glow-on-hover p-2 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My Projects
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/project"
              className="group inline-flex items-center gap-2 text-primary text-gray-400 hover:text-white  transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

