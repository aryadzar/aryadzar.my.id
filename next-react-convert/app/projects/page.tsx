"use client"

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
    id: 5,
    title: "SIM-APK (Sistem Infomarsi Manajement Armada Pesawat Komersial) ADSI (Analisis Desain Sistem Informasi)",
    description: "Membuat alur bisnis dan implementasi dari sistem informasi",
    image: "/projects/sim-apk.png",
    tags: ["HTML", "Bootstrap", "JQuery", "PHP Native", "CRUD", "MariaDB"],
    github: "https://github.com/aryadzar/SIM-APK",
    demo: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Halaman Blokir dengan WiFI Unila",
    description: "Membuat halaman yang diblokir oleh Unila (UPT TIK Unila)",
    image: "/projects/halaman_blokir.png",
    tags: ["HTML", "Tailwind CSS", "PHP Native"],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    id: 7,
    title: "First Portofolio",
    description: "Membuat Portofolio First Time",
    image: "/projects/first_port.png",
    tags: ["HTML", "CSS Native"],
    github: "https://github.com/aryadzar/UTP-PEMWEB",
    demo: "https://old-portofolio.aryadzar.my.id",
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
