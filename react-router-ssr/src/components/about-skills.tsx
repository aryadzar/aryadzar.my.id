import { motion } from "framer-motion"

const skillCategories = [
  {
    category: "Programming Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C++"],
  },
  {
    category: "Frontend Technologies",
    skills: ["React", "Next.js", "Vue.js", "Angular", "HTML5", "CSS3", "SASS/SCSS", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "Backend Technologies",
    skills: ["Node.js", "Express.js", "Django", "Flask", "Laravel", "Spring Boot"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Supabase"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Vercel", "Netlify"],
  },
  {
    category: "Design & Tools",
    skills: ["Figma", "Adobe XD", "Photoshop", "Git", "VS Code", "Postman", "Jira", "Slack"],
  },
  {
    category: "Soft Skills",
    skills: ["Team Leadership", "Project Management", "Problem Solving", "Communication", "Mentoring", "Agile/Scrum"],
  },
]

export default function AboutSkills() {
  return (
    <section className="mb-20">
      <motion.h2
        className="text-3xl font-bold mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Skills & Expertise
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            className="bg-secondary p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          >
            <h3 className="text-lg font-bold mb-4 text-primary">{category.category}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1 bg-muted text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
