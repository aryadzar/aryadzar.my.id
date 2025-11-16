"use client"

import { HeroVideoBackground } from "@/components/hero-video"
import { AboutBrief } from "@/components/about-brief"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { BlogPreview } from "@/components/blog-preview"
import { CertificationsSection } from "@/components/certifications-section"
import { ContactSection } from "@/components/contact-section"

export default function Page() {
  return (
    <main>
      <HeroVideoBackground/>
      <AboutBrief
        photoSrc="/images/profile-hero.jpg"
        name="Nama Anda"
        title="Peran Anda"
        description="Saya seorang profesional yang berfokus pada pembuatan antarmuka yang cepat, aksesibel, dan berpusat pada pengguna. Berpengalaman membangun landing page, dashboard, dan komponen UI yang konsisten dengan performa tinggi."
      />
      <ProjectsShowcase limit={3} />
      <CertificationsSection limit={6} />
      <BlogPreview limit={3} />
      <ContactSection id="contact" />
    </main>
  )
}
