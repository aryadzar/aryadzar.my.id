"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "home" },
  { name: "About", href: "about" },
  { name: "Projects", href: "projects" },
  { name: "Experience", href: "experience" },
  { name: "Blog", href: "blog" },
  { name: "Contact", href: "contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHomePage, setIsHomePage] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Check if we're on the home page
    setIsHomePage(window.location.pathname === "/")

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHomePage) return // Don't prevent default if not on home page

    e.preventDefault()
    setIsOpen(false)

    setTimeout(() => {
      const element = document.getElementById(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 300)
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl size-14 mt-5 font-bold text-primary">
              <img src="/icons/logo.svg" alt="" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) =>
                item.name === "Home" ? (
                  <Link
                    key={item.name}
                    href="/"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : item.name === "Blog" || item.name === "Projects" ? (
                  <Link
                    key={item.name}
                    href={`/${item.href}`}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={`#${item.href}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                ),
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`md:hidden transition-all duration-300 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none overflow-hidden"
        }`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/80 backdrop-blur-md">
          {navItems.map((item) =>
            item.name === "Home" ? (
              <Link
                key={item.name}
                href="/"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ) : item.name === "Blog" || item.name === "Projects" ? (
              <Link
                key={item.name}
                href={`/${item.href}`}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={`#${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </a>
            ),
          )}
        </div>
      </motion.div>
    </nav>
  )
}
