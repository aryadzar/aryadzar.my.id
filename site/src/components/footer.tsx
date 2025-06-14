"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Instagram, ArrowUp, Mail, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"

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
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-gray-700">
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
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-white opacity-20 animate-gradient-xy" />

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

interface SpotifyTrack {
  name: string
  artist: string
  album: string
  image: string
  isPlaying: boolean
  previewUrl?: string
  externalUrl?: string
}

function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL_API_SPOTIFY_NOW_PLAYING}`)
        const data = response.data

        const newTrack: SpotifyTrack = {
          name: data.title,
          artist: data.artist,
          album: data.album,
          image: data.albumImageUrl,
          isPlaying: data.isPlaying,
          externalUrl: data.songUrl,
        }

        setTrack(newTrack)
      } catch (error) {
        console.error("Gagal mengambil data Spotify:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrack()
  }, [])

  if (isLoading) {
    return (
      <motion.div
        className="flex items-center gap-3 p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-12 h-12 bg-gray-700 rounded-lg animate-pulse" />
        <div className="flex-1">
          <div className="h-4 bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-3 bg-gray-700 rounded animate-pulse w-2/3" />
        </div>
      </motion.div>
    )
  }

  if (!track) return null

  return (
    <motion.div
      className="group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.a
        href={track.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-900/20 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-green-500/20 hover:border-green-500/50 transition-all duration-300 group-hover:scale-[1.02]"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Album Art */}
        <div className="relative">
          <motion.img
            src={track.image}
            alt={track.album}
            className="w-12 h-12 rounded-lg object-cover"
            animate={{ rotate: track.isPlaying ? [0, 360] : 0 }}
            transition={{
              duration: 10,
              repeat: track.isPlaying ? Number.POSITIVE_INFINITY : 0,
              ease: "linear",
            }}
          />
          {track.isPlaying && (
            <motion.div
              className="absolute -inset-1 bg-green-500/20 rounded-lg blur-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              className="flex gap-1"
              animate={{ opacity: track.isPlaying ? [0.5, 1, 0.5] : 1 }}
              transition={{ duration: 1.5, repeat: track.isPlaying ? Number.POSITIVE_INFINITY : 0 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-green-500 rounded-full"
                  animate={{
                    height: track.isPlaying ? [4, 12, 4] : 4,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: track.isPlaying ? Number.POSITIVE_INFINITY : 0,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
            <span className="text-xs text-green-400 font-medium">
              {track.isPlaying ? "Now Playing" : "Last Played"}
            </span>
          </div>

          <h4 className="text-white font-medium text-sm truncate group-hover:text-green-400 transition-colors">
            {track.name}
          </h4>
          <p className="text-gray-400 text-xs truncate">by {track.artist}</p>
        </div>

        {/* Spotify Icon */}
        <motion.div
          className="text-green-500"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </motion.div>
      </motion.a>

      {/* Animated background waves */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent"
          animate={{
            x: track.isPlaying ? ["-100%", "100%"] : "-100%",
          }}
          transition={{
            duration: 3,
            repeat: track.isPlaying ? Number.POSITIVE_INFINITY : 0,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
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
    <footer className="relative py-16 px-6 bg-gradient-to-br from-gray-950 via-gray-900 to-black border-t border-gray-800/50 overflow-hidden">
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
              transition={{ type: "spring", stiffness: 300 }}
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
            <div className="space-y-3 mb-6">
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

            {/* Spotify Now Playing */}
            <SpotifyNowPlaying />
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
              © {new Date().getFullYear()} aryadzar.my.id
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
