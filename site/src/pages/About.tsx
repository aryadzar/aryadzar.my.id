import AboutEducation from "@/components/about-education";
import AboutExperience from "@/components/about-experience";
import AboutSkills from "@/components/about-skills";
import TechStack from "@/components/tech-stack";
import MetaTags from "@/utils/MetaTags";
import {  Calendar, Download, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="min-h-screen bg-background text-foreground mt-10">
            <MetaTags
                title="About Arya Dzaky"
                description="Portofolio Arya Dzaky"
                image="/foto_profile.jpg"
                name="About Arya Dzaky"
            />
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="mb-8">

                </div>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                    <div className="lg:col-span-1">
                        <div className="relative">
                            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden">
                                <img src="https://res.cloudinary.com/din8s15ri/image/upload/v1750426101/1721309054-6699177e1bdd4-1721308982-669917367da08-20240424_052236_ruwhms.jpg" alt="John Doe" className="object-cover" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 h-40 w-40 bg-primary rounded-2xl -z-10" />
                        </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col justify-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">About Me</h1>
                        <p className="text-xl text-muted-foreground mb-6">Full Stack Developer & Backend Developer</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-primary" />
                                <span>Lampung, Indonesia</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span>1+ Years Experience</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary" />
                                <span>aryadzaky8494@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary" />
                                <span>+62 82186796121</span>
                            </div>
                        </div>

                        <Link to="/CV_Muhammad_Arya_Dzaky_Arenanto_New.pdf" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors w-fit">
                            <Download className="w-4 h-4" />
                            Download CV
                        </Link>
                    </div>
                </div>

                {/* About Description */}
                <div className="mb-20">
                    <div className="max-w-4xl">
                        <h2 className="text-3xl font-bold mb-8">Who I Am</h2>
                        <div className="space-y-6 text-lg text-muted-foreground">
                            <p>
                                Hello! I'm Arya Dzaky, a passionate Full Stack Developer and Backend Developer based in Lampung, Indonesia.
                                With over 1 years of experience in the tech industry, I specialize in creating beautiful, functional,
                                and user-centered digital experiences.
                            </p>
                            <p>
                                My journey in web development started during my college years, and since then, I've been constantly
                                exploring new technologies and techniques to push the boundaries of what's possible on the web. I
                                believe in writing clean, maintainable code and creating intuitive user interfaces that solve real
                                problems.
                            </p>
                            <p>
                                When I'm not coding, you can find me exploring nature, reading about new tech trends, or experimenting
                                with digital art. I'm also passionate about sharing knowledge with the developer community through blog
                                posts and open-source contributions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <TechStack />

                {/* Experience */}
                <AboutExperience />

                {/* Education */}
                <AboutEducation />

                {/* Skills */}
                <AboutSkills />
            </div>
        </div>
    )
}
