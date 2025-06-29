import { useGoogleSheetData } from "@/hooks/useGoogleSheets"
import { motion } from "framer-motion"
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react"


export default function AboutEducation() {
    const { data } = useGoogleSheetData("Education")
    // console.log(data);
    const education = data?.map((item) => ({
        ...item,
        description : item.description
        .split(";")
        .map((desc : string) => desc.trim()),

        achievements : item.achievements
        .split(";")
        .map((achievement : string) => achievement.trim()),

        coursework : item.coursework
        .split(";")
        .map((course : string) => course.trim()),

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
        Education
      </motion.h2>

      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            className="bg-secondary p-6 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-primary mb-1">{edu.degree}</h3>
                <p className="text-lg font-medium mb-2">{edu.school}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>GPA: {edu.gpa}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{edu.description}</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                Achievements
              </h4>
              <ul className="space-y-1">
                {edu.achievements.map((achievement : string, achievementIndex : number) => (
                  <li key={achievementIndex} className="text-muted-foreground flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Relevant Coursework</h4>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((course : string, courseIndex : number) => (
                  <span key={courseIndex} className="px-3 py-1 bg-muted text-sm rounded-full">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
