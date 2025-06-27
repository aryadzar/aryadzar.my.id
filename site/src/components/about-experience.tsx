"use client"

import { useGoogleSheetData } from "@/hooks/useGoogleSheets"
import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin } from "lucide-react"

export default function AboutExperience() {
    const { data } = useGoogleSheetData("Experience")
    const experiences = data?.map((item) => ({
        ...item,
        description: item.description
            ? item.description.split(";").map((desc: string) => desc.trim())
            : [],

        technologies: item.technologies
            ? item.technologies.split(";").map((tech: string) => tech.trim())
            : [],
    }))
    
    return (
        <section className="mb-20">
            <motion.h2
                className="text-3xl font-bold mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Work Experience
            </motion.h2>

            <div className="space-y-8">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        className="bg-secondary p-6 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-1">{exp.title}</h3>
                                <p className="text-lg font-medium mb-2">{exp.company}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>{exp.period}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{exp.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Briefcase className="w-4 h-4" />
                                        <span>{exp.type}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-2 mb-4">
                            {exp.description.map((item : string, itemIndex : number) => (
                                <li key={itemIndex} className="text-muted-foreground flex items-start">
                                    <span className="text-primary mr-2">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech : string, techIndex : number) => (
                                <span key={techIndex} className="px-3 py-1 bg-muted text-sm rounded-full">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
