"use client";

import { socialMedia } from "@/constants/social-media-const";
import { SpotifyNowPlaying } from "./spotify-now-playing";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useNavItems } from "@/constants/nav-constant";
import { cn } from "@/lib/utils";
import { use } from "react";

export default function Footer() {
  const t = useTranslations("footer");
  const navItems = useNavItems();

  return (
    <footer
      className="relative mt-20 overflow-hidden border-t border-border bg-background"
      role="contentinfo"
    >
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 opacity-[0.03] dark:opacity-[0.05]">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="w-full max-w-6xl px-6 py-12 mx-auto">
        <div className="grid gap-12 md:grid-cols-3 lg:gap-16">
          {/* Brand + short bio */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Arya Dzaky
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
              {t("desc")}
            </p>
            <SpotifyNowPlaying className="mt-6" />
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links" className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground/70">
              {t("links")}
            </h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {navItems.map((nav, i) => (
                <li key={i}>
                  <Link
                    href={nav.link}
                    className="flex items-center text-sm transition-colors group text-muted-foreground hover:text-green-500"
                  >
                    <span className="w-0 h-px mr-2 transition-all bg-green-500 group-hover:w-3" />
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <nav aria-label="Social media" className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground/70">
              {t("follow")}
            </h3>
            <ul className="flex flex-wrap items-center gap-4">
              {[
                { icon: Twitter, href: socialMedia.x, label: "Twitter" },
                { icon: Github, href: socialMedia.github, label: "GitHub" },
                {
                  icon: Linkedin,
                  href: socialMedia.linkedin,
                  label: "LinkedIn",
                },
                {
                  icon: Instagram,
                  href: socialMedia.instagram,
                  label: "Instagram",
                },
              ].map((social, i) => (
                <li key={i}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300",
                      "hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                    )}
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-16 text-xs border-t border-border md:flex-row text-muted-foreground">
          <p>© {new Date().getFullYear()} Arya Dzaky. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
