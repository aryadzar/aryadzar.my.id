import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, List, X } from "lucide-react"

interface Heading {
  id: string
  text: string
  level: number
}

interface ModernTableOfContentsProps {
  headings: Heading[]
}

export default function ModernTableOfContents({ headings }: ModernTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0.1,
      },
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsOpen(false)
  }

  if (headings.length === 0) return null

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 right-4 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <List className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Desktop TOC */}
      <motion.div
        className="hidden lg:block fixed top-28 right-6 w-72 z-30"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="relative">
          {/* Glassmorphism Container */}
          <motion.div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <h3 className="text-white font-semibold text-sm">Table of Contents</h3>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto custom-scrollbar p-2">
              <nav className="space-y-1">
                {headings.map((heading, index) => {
                  const isActive = activeId === heading.id
                  const marginLeft = (heading.level - 1) * 12

                  return (
                    <motion.button
                      key={heading.id}
                      onClick={() => handleClick(heading.id)}
                      className={`
                        w-full text-left p-2 rounded-lg transition-all duration-300 group relative overflow-hidden
                        ${
                          isActive
                            ? "bg-blue-500/20 text-white border-l-2 border-blue-400"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }
                      `}
                      style={{ marginLeft: `${marginLeft}px` }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      {/* Active indicator */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            exit={{ scaleY: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </AnimatePresence>

                      <div className="flex items-center gap-2">
                        <ChevronRight
                          className={`w-3 h-3 transition-transform duration-200 ${
                            isActive ? "rotate-90 text-blue-400" : "group-hover:translate-x-1"
                          }`}
                        />
                        <span className="text-xs font-medium line-clamp-2 leading-relaxed">{heading.text}</span>
                      </div>

                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    </motion.button>
                  )
                })}
              </nav>
            </div>

            {/* Progress indicator */}
            <div className="p-3 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                    initial={{ width: "0%" }}
                    animate={{
                      width:
                        headings.findIndex((h) => h.id === activeId) >= 0
                          ? `${((headings.findIndex((h) => h.id === activeId) + 1) / headings.length) * 100}%`
                          : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="whitespace-nowrap">
                  {headings.findIndex((h) => h.id === activeId) + 1}/{headings.length}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile TOC Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile TOC */}
            <motion.div
              className="lg:hidden fixed top-20 right-4 left-4 z-50 max-h-[70vh]"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <h3 className="text-white font-semibold">Table of Contents</h3>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="max-h-[50vh] overflow-y-auto custom-scrollbar p-2">
                  <nav className="space-y-1">
                    {headings.map((heading, index) => {
                      const isActive = activeId === heading.id
                      const marginLeft = (heading.level - 1) * 8

                      return (
                        <motion.button
                          key={heading.id}
                          onClick={() => handleClick(heading.id)}
                          className={`
                            w-full text-left p-3 rounded-lg transition-all duration-300 group
                            ${
                              isActive
                                ? "bg-blue-500/20 text-white border-l-2 border-blue-400"
                                : "text-gray-300 hover:text-white hover:bg-white/10"
                            }
                          `}
                          style={{ marginLeft: `${marginLeft}px` }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.03 }}
                        >
                          <div className="flex items-center gap-2">
                            <ChevronRight
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isActive ? "rotate-90 text-blue-400" : ""
                              }`}
                            />
                            <span className="text-sm font-medium line-clamp-2">{heading.text}</span>
                          </div>
                        </motion.button>
                      )
                    })}
                  </nav>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  )
}
