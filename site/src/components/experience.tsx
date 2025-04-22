"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"

interface Experience {
  title: string
  company: string
  period: string
  description: string
  type: "work" | "education"
}

const experiences: Experience[] = [
  {
    title: "Asistant Lecturer of Object Oriented Programming",
    company: "Web Solutions Co.",
    period: "Sept 2024 -  Dec 2024",
    description:
      "Teaching a student with Java and create the application with java",
    type: "work",
  },
  {
    title: "Asistant Lecturer of Structured Programming",
    company: "Web Solutions Co.",
    period: "Sept 2024 -  Dec 2024",
    description:
      "Teaching a student with Java and how to write a clean code using C++",
    type: "work",
  },
  {
    title: "Fullstack Developer",
    company: "UPT TIK Unila",
    period: "Sept 2024 - Jan 2025",
    description: "Doing Internship as a fullstack developer",
    type: "work",
  },
  {
    title: "Bachelor of Science in Computer Science",
    company: "Lampung University",
    period: "2022 - Now",
    description: "Specialized in Web Technologies and Human-Computer Interaction.",
    type: "education",
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center glow-on-hover p-2 rounded-2xl inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Experience & Education
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-12"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Icon */}
                <div className="absolute left-0 p-2 bg-secondary rounded-2xl">
                  {exp.type === "work" ? (
                    <Briefcase className="w-5 h-5 text-primary" />
                  ) : (
                    <GraduationCap className="w-5 h-5 text-primary" />
                  )}
                </div>

                {/* Content */}
                <div className="bg-secondary p-6 rounded-2xl glow-on-hover">
                  <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                  <p className="text-muted-foreground mb-2">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-4">{exp.period}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

