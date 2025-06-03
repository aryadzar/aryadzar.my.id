import { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Menu, X } from "lucide-react"
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <RouterLink to="/" className="text-2xl size-14 mt-5 font-bold text-primary">
              <img src="/icons/logo.svg" alt="Logo" />
            </RouterLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavItem
                  key={item.name}
                  {...item}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                />
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
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
