// import { Link } from "react-router-dom"
import { Github, ArrowUpRight } from "lucide-react"
import BackHome from "@/utils/BackHome"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo: string
  featured: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online store with payment integration",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "Tailwind CSS", "Stripe"],
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Chart.js", "Firebase"],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative task management application",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["TypeScript", "Redux", "MongoDB"],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Weather Forecast App",
    description: "Real-time weather updates with location tracking",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React Native", "OpenWeather API"],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Personal portfolio website with modern UI",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    id: 6,
    title: "AI-Powered Chatbot",
    description: "Intelligent chatbot for customer support",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "TensorFlow", "NLP"],
    github: "#",
    demo: "#",
    featured: false,
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <BackHome />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-16">My Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article key={project.id} className="group bg-gray-900 rounded-2xl overflow-hidden">
              <div className="relative h-48 mb-4">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
                  {project.title}
                </h2>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-violet-600/80 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href={project.github} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-1 px-3 py-1 bg-violet-600 rounded-full hover:bg-violet-500 transition-colors"
                  >
                    <span className="text-sm">Live Demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
