import { useEffect, useRef, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Menu, Pause, Play, X } from "lucide-react"
import { motion } from "framer-motion"
import NavItem from "./NavItem"

const navItems = [
  { name: "Home", href: "/", type: "route" },
  { name: "About", href: "about", type: "scroll" },
  { name: "Projects", href: "projects", type: "scroll" },
  { name: "Experience", href: "experience", type: "scroll" },
  { name: "Blog", href: "/blog", type: "route" },
  { name: "Contact", href: "contact", type: "scroll" },
  { name: "Gallery", href: "/gallery", type: "route" },
] as const

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(new Audio("https://res.cloudinary.com/din8s15ri/video/upload/v1749043736/%E7%9E%AC%E3%81%8D_Instrumental_rd5qy7.mp3"))

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const handleEnded = () => setIsPlaying(false)
    audio.addEventListener("ended", handleEnded)
    return () => audio.removeEventListener("ended", handleEnded)
  }, [])

  useEffect(() => {
    const handleFirstClick = () => {
      const audio = audioRef.current
      if (!audio) return

      audio.preload = "auto"
      audio.volume = 0.5

      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.warn("Autoplay blocked:", error)
        })
      }

      // Listener hanya sekali
      document.removeEventListener("click", handleFirstClick)
    }

    document.addEventListener("click", handleFirstClick, { once: true })

    return () => {
      document.removeEventListener("click", handleFirstClick)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    isPlaying ? audio.pause() : audio.play()
    setIsPlaying(!isPlaying)
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <RouterLink to="/" className="text-2xl size-14 mt-5 font-bold text-primary">
              <img src="/icons/logo.svg" alt="Logo" />
            </RouterLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                {...item}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              />
            ))}
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
            </button>
          </div>

          {/* Mobile Menu Toggle + Audio Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Items */}
      <motion.div
        className={`md:hidden transition-all duration-300 ${isOpen ? "pointer-events-auto" : "pointer-events-none overflow-hidden"}`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/80 backdrop-blur-md">
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              {...item}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            />
          ))}
        </div>
      </motion.div>
    </nav>
  )
}