import { HeroVideoBackground } from "@/components/hero-video";
import { AboutBrief } from "@/components/about-brief";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { BlogPreview } from "@/components/blog-preview";
import { CertificationsSection } from "@/components/certifications-section";
import { ContactSection } from "@/components/contact-section";
import { EducationSection } from "@/components/education-section";
import { ExperienceSection } from "@/components/experience-section";
import {
  getHero,
  getAbout,
  getCertificate,
  getProjectOverview,
  getBlogOverview,
  getExperience,
  getEducation,
} from "@/lib/getHome";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch all data server-side for SEO
  const [
    heroData,
    aboutData,
    certificateData,
    projectData,
    blogData,
    experienceData,
    educationData,
  ] = await Promise.all([
    getHero(locale),
    getAbout(locale),
    getCertificate(6),
    getProjectOverview(locale, 1, 3),
    getBlogOverview(locale, 1, 3),
    getExperience(locale),
    getEducation(locale),
  ]);

  return (
    <main>
      <HeroVideoBackground data={heroData} />
      <AboutBrief data={aboutData} />
      <ProjectsShowcase data={projectData} limit={3} />
      <EducationSection data={educationData} />
      <ExperienceSection data={experienceData} />
      <CertificationsSection data={certificateData} limit={6} />
      <BlogPreview data={blogData} limit={3} />
      {/* <ContactSection id="contact" /> */}
    </main>
  );
}
