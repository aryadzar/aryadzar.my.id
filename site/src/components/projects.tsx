"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
// import { Link } from "react-router-dom"

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
    title: "Presensi UPT TIK",
    description: "Pembuatan Aplikasi Presensi untuk khusus pegawai UPT TIK seperti EOS dsb ",
    image: "/projects/presensi_upttik.png",
    tags: ["Laravel", "Tailwind CSS", "Backend", "PostgreSQL", "PHP"],
    github: "https://github.com/aryadzar/absensi-project",
    demo: "https://presensi.unila.ac.id",
    featured: true,
  },
  {
    id: 2,
    title: "Hospitality Plus",
    description: "Pemesanan hotel dengan framework javafx",
    image: "/projects/javafx.png",
    tags: ["Java", "JavaFx", "MariaDB", "MySQL"],
    github: "https://github.com/aryadzar/project-uas-pbo",
    demo: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Taskete Project",
    description: "To Do List App dengan PHP MySQL",
    image: "/projects/taskete.png",
    tags: ["PHP", "Bootstrap", "MySQL", "Native"],
    github: "#",
    demo: "https://taskete.aryadzar.my.id",
    featured: true,
  },
  {
    id: 4,
    title: "Halaman Login SSO Unila",
    description: "Membuat tampilan halaman login SSO WiFi Unila dengan modern",
    image: "/projects/login_sso.png",
    tags: ["HTML", "Tailwind CSS", "Fortigate"],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    id: 4,
    title: "SIM-APK (Sistem Infomarsi Manajement Armada Pesawat Komersial) ADSI (Analisis Desain Sistem Informasi)",
    description: "Membuat alur bisnis dan implementasi dari sistem informasi",
    image: "/projects/sim-apk.png",
    tags: ["HTML", "Bootstrap", "JQuery", "PHP Native", "CRUD", "MariaDB"],
    github: "https://github.com/aryadzar/SIM-APK",
    demo: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Halaman Blokir dengan WiFI Unila",
    description: "Membuat halaman yang diblokir oleh Unila (UPT TIK Unila)",
    image: "/projects/halaman_blokir.png",
    tags: ["HTML", "Tailwind CSS", "PHP Native"],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    id: 4,
    title: "First Portofolio",
    description: "Membuat Portofolio First Time",
    image: "/projects/first_port.png",
    tags: ["HTML", "CSS Native"],
    github: "https://github.com/aryadzar/UTP-PEMWEB",
    demo: "https://old-portofolio.aryadzar.my.id",
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

      <img
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-110"
      />

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
            target="_blank"
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
            {/* <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-primary hover:text-primary-foreground transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link> */}
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

