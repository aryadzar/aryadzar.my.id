import About from "@/components/About/about";
import BlogPreview from "@/components/Blog Preview/blog-preview";
import Experience from "@/components/Experience/experience";
import Hero from "@/components/Hero/hero";
import Projects from "@/components/Projects/projects";
import Skills from "@/components/Skills/skills";
import  Contact  from "@/components/Contact/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-foreground">

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
  );
}
