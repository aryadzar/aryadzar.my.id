import Link from "next/link";
import { AboutBrief } from "@/components/about-brief";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CertificationsSection } from "@/components/certifications-section";

export const metadata = {
  title: "About Arya Dzaky",
  description:
    "Tentang saya, keahlian, dan bagaimana Anda dapat menghubungi saya.",
};

const skills: string[] = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Framer Motion",
  "Shadcn UI",
  "Node.js",
  "REST/GraphQL",
];

export default function AboutPage() {
  return (
    <main className="min-h-[60vh]">
      {/* Header */}
      <header className="max-w-5xl px-4 pt-10 mx-auto md:px-6 md:pt-14">
        <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Tentang Saya
        </h1>
        <p className="mt-2 text-pretty text-muted-foreground">
          Ringkasan profil, keahlian utama, dan cara terbaik untuk berkolaborasi
          dengan saya.
        </p>
      </header>

      {/* About Brief */}
      <AboutBrief
        photoSrc="/images/profile-hero.jpg"
        name="Nama Anda"
        title="Front-end Developer"
        description="Saya berfokus pada pengembangan antarmuka modern yang cepat, aksesibel, dan mudah dirawat. Saya senang membangun pengalaman yang halus dengan Next.js, memanfaatkan animasi secukupnya dengan framer-motion, serta menerapkan praktik terbaik untuk performa dan SEO."
        actions={
          <>
            <Button asChild size="sm">
              <Link href="/cv.pdf" download>
                Download CV
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="#certifications">Lihat Sertifikat</Link>
            </Button>
          </>
        }
      />

      {/* Keahlian */}
      <section aria-labelledby="skills-heading" className="py-10 md:py-14">
        <div className="max-w-5xl px-4 mx-auto md:px-6">
          <h2
            id="skills-heading"
            className="text-2xl font-semibold tracking-tight text-balance"
          >
            Keahlian
          </h2>
          <div className="flex flex-wrap gap-2 mt-5">
            {skills.map((s) => (
              <Badge key={s} variant="secondary" className="rounded-md">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications on About page */}
      <div id="certifications">
        <CertificationsSection limit={6} title="Certifications" />
      </div>

      {/* CTA */}
      <section aria-labelledby="cta-heading" className="pb-16 md:pb-20">
        <div className="max-w-5xl px-4 mx-auto md:px-6">
          <h2 id="cta-heading" className="sr-only">
            Aksi
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/#contact">Hubungi Saya</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">Lihat Semua Proyek</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
