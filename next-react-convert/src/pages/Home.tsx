import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import BlogPreview from "@/components/blog-preview"
import Experience from "@/components/experience"
import MetaTags from "@/utils/MetaTags"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <MetaTags
        title="Arya Dzaky's portofolio"
        description="This is a test description to show you how to improve SEO in your React web applications!"
        image="url to the image"
        name="FacuDev"
      />
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
      <Footer />
    </main>
  )
}
