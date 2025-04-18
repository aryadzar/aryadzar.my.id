"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Github, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

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
    id: 3,
    title: "Task Management App",
    description: "Collaborative task management application",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["TypeScript", "Redux", "MongoDB"],
    github: "#",
    demo: "#",
    featured: false,
  },
  // Keep only 3 projects for the main page preview
]

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

      {/* <img
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
      /> */}

      <div className="relative z-20 flex flex-col h-full p-6 justify-end">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-violet-600/80 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-4">{project.description}</p>

        <div className="flex gap-3">
          <a href={project.github} className="p-2 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a
            href={project.demo}
            className="flex items-center gap-1 px-3 py-1 bg-violet-600/80 rounded-full hover:bg-violet-500 transition-colors"
          >
            <span className="text-sm">Live Demo</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
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
              to="/projects"
              className="group inline-flex items-center gap-2 text-primary hover:text-primary-foreground transition-colors"
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

