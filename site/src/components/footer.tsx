"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Instagram, ArrowUp, Mail, MapPin, Heart } from "lucide-react"

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative group">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl inline-flex hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-violet-500/25 border border-gray-700 hover:border-violet-500"
        aria-label={label}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-purple-700/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">{icon}</div>
      </a>

      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-gray-700">
        {label}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
      </div>
    </motion.div>
  )
}

function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-white opacity-20 animate-gradient-xy" />

      {/* Gradient Orbs with animation */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-black/20 to-white/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-white/20 to-black/20 rounded-full blur-3xl animate-pulse" />

      {/* Moving gradient waves */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-wave" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  )
}

export default function EnhancedFooter() {
  const customStyles = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes gradient-xy {
    0%, 100% {
      background-size: 400% 400%;
      background-position: left center;
    }
    50% {
      background-size: 200% 200%;
      background-position: right center;
    }
  }
  
  @keyframes wave {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .animate-gradient-xy {
    animation: gradient-xy 8s ease infinite;
  }
  
  .animate-wave {
    animation: wave 6s linear infinite;
  }
`
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { href: "https://github.com/aryadzar", icon: <Github className="w-6 h-6" />, label: "GitHub" },
    { href: "https://x.com/idontknow5_5", icon: <Twitter className="w-6 h-6" />, label: "Twitter" },
    {
      href: "https://www.linkedin.com/in/muhammad-arya-dzaky-arenanto-a60726293/",
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
    },
    { href: "https://instagram.com/aryadzar", icon: <Instagram className="w-6 h-6" />, label: "Instagram" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <footer className="relative py-16 z-0 px-6 bg-gradient-to-br from-gray-950 via-gray-900 to-black border-t border-gray-800/50 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <BackgroundPattern />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <motion.h3
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-black bg-clip-text text-transparent animate-gradient-text bg-[length:200%_200%]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 100 }}
              style={{
                backgroundImage: "linear-gradient(45deg, #ffffff, #000000, #ffffff, #000000)",
                backgroundSize: "400% 400%",
                animation: "gradientShift 3s ease infinite",
              }}
            >
              Arya Dzaky
            </motion.h3>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Full Stack Developer passionate about creating beautiful and functional web experiences.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div
                className="flex items-center gap-3 text-gray-400 hover:text-violet-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">aryadzaky8494@gmail.com</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-gray-400 hover:text-violet-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5" />
                <span className="text-sm">Indonesia</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h4 className="text-xl font-semibold mb-6 text-white">Quick Links</h4>
            <div className="space-y-3">
              {["About", "Projects", "Skills", "Contact"].map((link, index) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-400 hover:text-violet-400 transition-colors text-sm"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h4 className="text-xl font-semibold mb-6 text-white">Connect With Me</h4>
            <motion.div
              className="flex gap-4 flex-wrap"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {socialLinks.map((social) => (
                <motion.div
                  key={social.label}
                  variants={{
                    hidden: { scale: 0, rotate: -180 },
                    visible: {
                      scale: 1,
                      rotate: 0,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      },
                    },
                  }}
                >
                  <SocialLink {...social} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p className="text-gray-400 text-sm flex items-center gap-2" whileHover={{ scale: 1.05 }}>
              © {new Date().getFullYear()} aryadzar.my.id. 
            </motion.p>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="group relative p-4 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl hover:from-violet-500 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-violet-500/25 border border-violet-500/20"
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ArrowUp className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
