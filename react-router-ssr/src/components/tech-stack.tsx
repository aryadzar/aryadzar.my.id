import { motion } from "framer-motion"

const techCategories = [
  {
    category: "Frontend",
    technologies: [
      { name: "React", level: 95, color: "bg-blue-500" },
      { name: "Next.js", level: 90, color: "bg-gray-800" },
      { name: "TypeScript", level: 85, color: "bg-blue-600" },
      { name: "Tailwind CSS", level: 90, color: "bg-cyan-500" },
    //   { name: "Vue.js", level: 75, color: "bg-green-500" },
    ],
  },
  {
    category: "Backend",
    technologies: [
      { name: "Node.js", level: 85, color: "bg-green-600" },
    //   { name: "Express.js", level: 80, color: "bg-gray-700" },
      { name: "Python", level: 75, color: "bg-yellow-500" },
      { name: "PostgreSQL", level: 80, color: "bg-blue-700" },
      { name: "MongoDB", level: 75, color: "bg-green-700" },
      { name: "Laravel", level: 90, color: "bg-red-700" },
    ],
  },
  {
    category: "Tools & Others",
    technologies: [
      { name: "Git", level: 90, color: "bg-orange-500" },
      { name: "Docker", level: 70, color: "bg-blue-400" },
      { name: "AWS", level: 65, color: "bg-orange-400" },
    //   { name: "Figma", level: 85, color: "bg-purple-500" },
      { name: "Firebase", level: 80, color: "bg-yellow-600" },
    ],
  },
]

export default function TechStack() {
  return (
    <section className="mb-20">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Tech Stack
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {techCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            className="bg-secondary p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 text-primary">{category.category}</h3>
            <div className="space-y-4">
              {category.technologies.map((tech, techIndex) => (
                <div key={tech.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{tech.name}</span>
                    <span className="text-sm text-muted-foreground">{tech.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${tech.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: techIndex * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
