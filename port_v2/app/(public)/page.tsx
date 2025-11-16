"use client";

import { HeroVideoBackground } from "@/components/hero-video";
import { AboutBrief } from "@/components/about-brief";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { BlogPreview } from "@/components/blog-preview";
import { CertificationsSection } from "@/components/certifications-section";
import { ContactSection } from "@/components/contact-section";

export default function Page() {
  return (
    <main>
      <HeroVideoBackground />
      <AboutBrief />
      <ProjectsShowcase limit={3} />
      <CertificationsSection limit={6} />
      <BlogPreview limit={3} />
      <ContactSection id="contact" />
    </main>
  );
}
