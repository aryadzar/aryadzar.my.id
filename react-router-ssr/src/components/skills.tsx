"use client"

import { motion } from "framer-motion"

interface Skill {
  name: string
  level: number
}

const skills: Skill[] = [
  { name: "HTML/CSS", level: 95 },
  { name: "JavaScript", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "React", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Tailwind CSS", level: 90 },
  { name: "UI/UX Design", level: 75 },
  { name: "GraphQL", level: 70 },
  { name: "MongoDB", level: 75 },
  { name: "PostgreSQL", level: 70 },
  { name: "Docker", level: 65 },
]

interface SkillBarProps {
  skill: Skill
  index: number
}

function SkillBar({ skill, index }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex justify-between mb-1">
        <span className="font-medium">{skill.name}</span>
        <span className="text-gray-400">{skill.level}%</span>
      </div>
      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-600 to-purple-400 group-hover:from-violet-500 group-hover:to-purple-300 transition-all duration-300"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Technical Proficiency</h3>
            <p className="text-gray-300 mb-8">
              With a strong foundation in both frontend and backend technologies, I create seamless, responsive, and
              user-friendly applications. I'm constantly expanding my skill set to stay at the forefront of web
              development.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.slice(0, 6).map((skill, index) => (
                <SkillBar key={index} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.slice(6).map((skill, index) => (
                <SkillBar key={index + 6} skill={skill} index={index + 6} />
              ))}
            </div>

            <div className="mt-12 p-6 bg-gray-800 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Additional Skills</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Git",
                  "Figma",
                  "Responsive Design",
                  "SEO",
                  "Performance Optimization",
                  "Agile/Scrum",
                  // "CI/CD",
                  "Testing",
                  // "AWS",
                  // "Firebase",
                  "Laravel",
                  "MySQL"
                ].map((skill, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm hover:bg-violet-600 transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

