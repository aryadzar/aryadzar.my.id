"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { LinkPreview } from "./ui/link-preview"

export default function About() {
  const containerRef = useRef(null)
  // const imageRef = useRef<HTMLDivElement>(null)
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ["start end", "end start"],
  // })

  // const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  // const handleMouseMove = (e : React.MouseEvent) => {
  //   if (!imageRef.current) return

  //   const rect = imageRef.current.getBoundingClientRect()
  //   const x = (e.clientX - rect.left) / rect.width - 0.5
  //   const y = (e.clientY - rect.top) / rect.height - 0.5

  //   setMousePosition({ x, y })
  // }

  // const handleMouseLeave = () => {
  //   setMousePosition({ x: 0, y: 0 })
  // }

  return (
    <section id="about" className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-0"
          >
            <img
              src="https://res.cloudinary.com/din8s15ri/image/upload/c_thumb,g_face,h_500,w_500/v1750168114/ChatGPT_Image_Jun_17__2025__08_43_00_PM-removebg-preview_murbcm.png"
              alt="Arya Dzaky"
              className=""
            />
            {/* <motion.div
              ref={imageRef}
              className="relative h-[400px] w-full rounded-2xl overflow-hidden cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="w-full h-full relative"
                style={{
                  rotateY: mousePosition.x * 20, // More pronounced X rotation
                  rotateX: mousePosition.y * -20, // More pronounced Y rotation
                  transformStyle: "preserve-3d",
                  transition: "transform 0.1s ease-out",
                }}
                whileHover={{
                  boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className="absolute inset-0 h-[120%] w-full"
                  style={{
                    y: imageY,
                    transformStyle: "preserve-3d",
                    transform: "translateZ(0px)",
                  }}
                >
                  
                </motion.div>

                <motion.div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: `linear-gradient(
                      ${105 + mousePosition.x * 30}deg, 
                      rgba(255, 255, 255, 0) 0%, 
                      rgba(255, 255, 255, ${0.15 + mousePosition.y * 0.1}) 40%, 
                      rgba(255, 255, 255, 0) 60%
                    )`,
                    transform: "translateZ(1px)",
                    pointerEvents: "none",
                  }}
                />

                <motion.div
                  className="absolute inset-0 border-2 border-white/10 rounded-2xl"
                  style={{
                    transform: "translateZ(2px)",
                    boxShadow: "inset 0 0 20px rgba(124, 58, 237, 0.3)",
                  }}
                />
              </motion.div> */}
          </motion.div>

          {/* Box ungu di belakang gambar */}
          {/* <motion.div
              className="absolute -bottom-9 -right-9 h-40 w-40 bg-violet-600 rounded-2xl -z-10"
              animate={{
                rotate: mousePosition.x * 8,
                x: mousePosition.x * 15,
                y: mousePosition.y * 15,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            /> */}
          {/* </motion.div> */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Hello, {" "}
              <LinkPreview url=" " 
              imageSrc="https://res.cloudinary.com/din8s15ri/image/upload/v1750426101/1721309054-6699177e1bdd4-1721308982-669917367da08-20240424_052236_ruwhms.jpg" 
              className=" font-extrabold bg-gradient-to-r from-purple-800 via-purple-500 to-purple-300 text-transparent bg-clip-text animate-gradient" 
              isStatic>I'm Arya Dzaky
              </LinkPreview> 
            </h3>
            <p className="text-gray-300 mb-6">
              I'm a passionate Full Stack Developer with 1 years of experience creating beautiful, functional, and
              user-centered digital experiences. I am constantly exploring new technologies and techniques to push the
              boundaries of web development.
            </p>
            <p className="text-gray-300 mb-6">
              When I'm not coding, you can find me exploring nature, reading about new tech trends, or experimenting
              with digital art. I believe in continuous learning and sharing knowledge with the developer community.
            </p>

            {/* <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-2xl">
                <h4 className="font-bold text-violet-400">5+</h4>
                <p className="text-sm text-gray-400">Years Experience</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-2xl">
                <h4 className="font-bold text-violet-400">50+</h4>
                <p className="text-sm text-gray-400">Projects Completed</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-2xl">
                <h4 className="font-bold text-violet-400">20+</h4>
                <p className="text-sm text-gray-400">Happy Clients</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-2xl">
                <h4 className="font-bold text-violet-400">10+</h4>
                <p className="text-sm text-gray-400">Awards Won</p>
              </div>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
