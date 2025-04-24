import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import BlogPreview from "@/components/blog-preview"
import Experience from "@/components/experience"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="blog">
        <BlogPreview />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  )
}
