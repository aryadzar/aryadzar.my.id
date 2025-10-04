"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FlipWords } from "./ui/flip-words";
import HeroWithPortfolioBg from "./animate-mockup/Mockup";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const words = ["Fullstack", "Backend"];
  const name = ["Muhammad Arya", "Dzaky Arenanto"];
  const { t } = useTranslation();
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      {/* <div className="absolute inset-0 pointer-events-none  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" /> */}
      <HeroWithPortfolioBg />
      {/* <div className="absolute inset-0 w-full h-full">
        <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 object-cover w-full h-full">
          <source
            src="video/video_bg_2.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-background/50" />
      </div> */}

      {/* Lamp effect */}
      <div
        className="absolute inset-0 z-30 transition duration-300 pointer-events-none"
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
      <div className="relative z-10 max-w-4xl px-6 text-center">
        <motion.h1
          className="mb-6 text-5xl font-bold text-transparent md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FlipWords className="text-white " words={name} />
        </motion.h1>
        <motion.p
          className="mb-8 text-xl md:text-2xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FlipWords className="text-white" words={words} /> Developer
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* <a
            href="/CV_Muhammad_Arya_Dzaky_Arenanto_New.pdf"
            target="_blank"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

            <span className="inline-flex items-center justify-center w-full h-full px-3 py-1 text-sm font-medium text-white rounded-full cursor-pointer bg-slate-950 backdrop-blur-3xl">View My Curiculum Vitae</span>
            <motion.span animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </a> */}
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
            <span className="relative inline-flex items-center justify-center w-full h-full gap-2 px-4 py-1 font-medium text-white transition-all duration-300 rounded-full bg-slate-950 backdrop-blur-3xl group-hover:bg-slate-900">
              <span>{t("home.hero.button_cv")}</span>
              <motion.span
                animate={{
                  x: isHovered ? 2 : 0,
                  y: isHovered ? -2 : 0,
                  rotate: isHovered ? -10 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.span>
            </span>

            {/* Shine effect */}
            <motion.span
              className="absolute inset-0 rounded-full opacity-0 bg-gradient-to-r from-transparent via-white to-transparent"
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
  );
}
