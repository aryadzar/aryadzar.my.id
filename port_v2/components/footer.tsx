"use client";

import { socialMedia } from "@/constants/social-media-const";
import { SpotifyNowPlaying } from "./spotify-now-playing";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer
      className="border-t border-border bg-background text-foreground"
      role="contentinfo"
    >
      <div className="w-full max-w-6xl px-4 py-10 mx-auto md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand + short bio */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Arya Dzaky</h2>
            <p className="text-sm text-muted-foreground text-pretty">
              {t("desc")}
            </p>
            <SpotifyNowPlaying className="mt-4" />
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links" className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <Link
                  href="/about"
                  className="px-2 py-1 text-sm rounded-md hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Tentang
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="px-2 py-1 text-sm rounded-md hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Proyek
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="px-2 py-1 text-sm rounded-md hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Blog
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#contact"
                  className="px-2 py-1 text-sm rounded-md hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Kontak
                </Link>
              </li> */}
            </ul>
          </nav>

          {/* Socials */}
          <nav aria-label="Social media" className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Ikuti Saya
            </h3>
            <ul className="flex flex-wrap items-center gap-3">
              <li>
                <a
                  href={socialMedia.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2 py-1 text-sm rounded-md hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Twitter className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href={socialMedia.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2 py-1 text-sm rounded-md hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2 py-1 text-sm rounded-md hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2 py-1 text-sm rounded-md hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">Instagram</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
