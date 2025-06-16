"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { FlipWords } from "./ui/flip-words"

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const words = ["Fullstack", "Backend"];
  const name = ["Muhammad Arya", "Dzaky Arenanto"]
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
          <source
            src="video/video_bg_2.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay with opacity */}
        <div className="absolute inset-0 bg-background/50" />
      </div>

      {/* Lamp effect */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            initial={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0.1,
            }}
            animate={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >       
          <FlipWords className=" text-white" words={name}/>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FlipWords className="text-white" words={words}/> Developer
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
              <motion.a
                href="/CV_Muhammad_Arya_Dzaky_Arenanto_New.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => setIsPressed(false)}
                className={`group relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 `}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Outer glow effect */}
                <motion.span
                  className="absolute inset-0 rounded-full opacity-70 blur-md"
                  animate={{
                    background: isHovered
                      ? [
                          "linear-gradient(90deg, #E2CBFF 0%, #393BB2 50%, #E2CBFF 100%)",
                          "linear-gradient(180deg, #E2CBFF 0%, #393BB2 50%, #E2CBFF 100%)",
                          "linear-gradient(270deg, #E2CBFF 0%, #393BB2 50%, #E2CBFF 100%)",
                          "linear-gradient(360deg, #E2CBFF 0%, #393BB2 50%, #E2CBFF 100%)",
                          "linear-gradient(90deg, #E2CBFF 0%, #393BB2 50%, #E2CBFF 100%)",
                        ]
                      : "linear-gradient(90deg, #E2CBFF 0%, #393BB2 50%, #E2CBFF 100%)",
                  }}
                  transition={{
                    duration: isHovered ? 2 : 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />

                {/* Main spinning gradient border */}
                <motion.span
                  className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: isHovered ? 3 : 8,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  style={{
                    scale: isHovered ? 1.5 : 1,
                  }}
                />

                {/* Inner pulsing gradient */}
                <motion.span
                  className="absolute inset-0 rounded-full opacity-50"
                  animate={{
                    background: [
                      "radial-gradient(circle at 30% 30%, rgba(226, 203, 255, 0.5) 0%, rgba(57, 59, 178, 0.2) 50%, transparent 100%)",
                      "radial-gradient(circle at 70% 70%, rgba(226, 203, 255, 0.5) 0%, rgba(57, 59, 178, 0.2) 50%, transparent 100%)",
                      "radial-gradient(circle at 30% 70%, rgba(226, 203, 255, 0.5) 0%, rgba(57, 59, 178, 0.2) 50%, transparent 100%)",
                      "radial-gradient(circle at 70% 30%, rgba(226, 203, 255, 0.5) 0%, rgba(57, 59, 178, 0.2) 50%, transparent 100%)",
                      "radial-gradient(circle at 30% 30%, rgba(226, 203, 255, 0.5) 0%, rgba(57, 59, 178, 0.2) 50%, transparent 100%)",
                    ],
                    scale: isPressed ? [1, 1.2, 1] : [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />

                {/* Button content */}
                <span className="relative inline-flex h-full w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-1  font-medium text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-slate-900">
                  <span>View My Curiculum Vitae</span>
                  <motion.span
                    animate={{
                      x: isHovered ? 2 : 0,
                      y: isHovered ? -2 : 0,
                      rotate: isHovered ? -10 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </motion.span>
                </span>

                {/* Shine effect */}
                <motion.span
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                  animate={{
                    opacity: isHovered ? [0, 0.1, 0] : 0,
                    left: isHovered ? ["-100%", "100%", "100%"] : "-100%",
                  }}
                  transition={{
                    duration: 1,
                    repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                    repeatDelay: 1,
                  }}
                />
              </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

