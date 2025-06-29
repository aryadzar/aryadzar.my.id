"use client"

import { useGoogleSheetData } from "@/hooks/useGoogleSheets"
import { motion } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"
import Loading from "./loading"

interface Experience {
  title: string
  company: string
  period: string
  description: string
  type: "work" | "education"
  logo : string
}

export default function Experience() {

  const {data: experiences, loading} = useGoogleSheetData("Exp & Edu");

  if(loading){
    return <Loading/>
  }

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
                  <div className="flex items-start gap-4 mb-4">
                    {/* Institution Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white p-1 shadow-sm">
                        <img
                          src={exp.logo || "/placeholder.svg"}
                          alt={`${exp.company} logo`}
                          width={40}
                          height={40}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                      <p className="text-muted-foreground mb-2 font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-3  bg-muted  rounded-md inline-block">
                        {exp.period}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}