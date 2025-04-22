"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react"

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <motion.div whileHover={{ y: -3 }} whileTap={{ y: 0 }}>
      <a href={href} target="_blank" className="p-3 bg-gray-800 rounded-full inline-flex hover:bg-violet-600 transition-colors">
        {icon}
      </a>
    </motion.div>
  )
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 px-6 bg-gray-950 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Arya Dzaky</h3>
            <p className="text-gray-400">Full Stack Developer</p>
          </div>

          <div className="flex gap-4">
            <SocialLink href="https://github.com/aryadzar" icon={<Github className="w-5 h-5" />} />
            <SocialLink href="https://x.com/idontknow5_5" icon={<Twitter className="w-5 h-5" />} />
            <SocialLink href="https://www.linkedin.com/in/muhammad-arya-dzaky-arenanto-a60726293/" icon={<Linkedin className="w-5 h-5" />} />
            <SocialLink href="https://instagram.com/aryadzar" icon={<Instagram className="w-5 h-5" />} />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} aryadzar.my.id. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            className="p-3 bg-gray-800 rounded-full hover:bg-violet-600 transition-colors"
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

