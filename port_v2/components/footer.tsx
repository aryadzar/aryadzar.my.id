import { SpotifyNowPlaying } from "./spotify-now-playing"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground" role="contentinfo">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand + short bio */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Portfolio</h2>
            <p className="text-sm text-muted-foreground text-pretty">
              Desainer/Developer yang fokus pada pengalaman antarmuka yang rapi, cepat, dan dapat diakses.
            </p>
            <SpotifyNowPlaying className="mt-4" />
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links" className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <Link
                  href="#about"
                  className="rounded-md px-2 py-1 text-sm hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Tentang
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="rounded-md px-2 py-1 text-sm hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Proyek
                </Link>
              </li>
              <li>
                <Link
                  href="#blog"
                  className="rounded-md px-2 py-1 text-sm hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="rounded-md px-2 py-1 text-sm hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </nav>

          {/* Socials */}
          <nav aria-label="Social media" className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Ikuti Saya</h3>
            <ul className="flex flex-wrap items-center gap-3">
              <li>
                <a
                  href="https://twitter.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Twitter className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Instagram</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p>
            Dibangun dengan <span className="font-mono">Next.js + shadcn</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
