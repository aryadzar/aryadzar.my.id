"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden">
              <img src="/placeholder.svg?height=400&width=400" alt="John Doe" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 h-40 w-40 bg-violet-600 rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Hello, I'm John</h3>
            <p className="text-gray-300 mb-6">
              I'm a passionate Full Stack Developer with 5 years of experience creating beautiful, functional, and
              user-centered digital experiences. I am constantly exploring new technologies and techniques to push the
              boundaries of web development.
            </p>
            <p className="text-gray-300 mb-6">
              When I'm not coding, you can find me exploring nature, reading about new tech trends, or experimenting
              with digital art. I believe in continuous learning and sharing knowledge with the developer community.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold text-violet-400">5+</h4>
                <p className="text-sm text-gray-400">Years Experience</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold text-violet-400">50+</h4>
                <p className="text-sm text-gray-400">Projects Completed</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold text-violet-400">20+</h4>
                <p className="text-sm text-gray-400">Happy Clients</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold text-violet-400">10+</h4>
                <p className="text-sm text-gray-400">Awards Won</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

