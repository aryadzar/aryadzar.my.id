"use client";

import { socialMedia } from "@/constants/social-media-const";
import { SpotifyNowPlaying } from "./spotify-now-playing";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Heart,
  Mail,
  ExternalLink,
  MapPin,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useNavItems } from "@/constants/nav-constant";
import { cn } from "@/lib/utils";
import { use } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./ui/button";

export default function Footer() {
  const t = useTranslations("footer");
  const navItems = useNavItems();
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  } as const;

  return (
    <footer
      className="relative mt-32 overflow-hidden border-t border-border/50 bg-gradient-to-b from-background via-background to-muted/20"
      role="contentinfo"
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-0 rounded-full left-1/4 w-96 h-96 bg-primary/5 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 rounded-full right-1/4 w-96 h-96 bg-green-500/5 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* SVG wave pattern */}
        <div className="absolute inset-x-0 bottom-0 h-32 opacity-[0.03] dark:opacity-[0.05]">
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

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Scroll to top button */}

      <div className="w-full px-6 py-16 mx-auto max-w-7xl md:py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {/* Brand Section - Enhanced */}
          <motion.div variants={item} className="space-y-6 lg:col-span-1">
            <div className="space-y-3">
              <Link href="/" className="inline-block group">
                <h2 className="text-2xl font-bold tracking-tight text-transparent transition-all bg-gradient-to-r from-foreground via-primary to-green-500 bg-clip-text group-hover:scale-105">
                  Arya Dzaky
                </h2>
              </Link>
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-green-500" />
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
              {t("desc")}
            </p>

            {/* Location badge */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-4 h-4 text-green-500" />
              <span>Bandar Lampung, Indonesia</span>
            </div>

            {/* Contact email */}
            <a
              href="mailto:contact@aryadzaky.com"
              className="inline-flex items-center gap-2 text-sm transition-colors text-muted-foreground hover:text-green-500 group"
            >
              <Mail className="w-4 h-4" />
              <span className="group-hover:underline">
                contact@aryadzaky.com
              </span>
              <ExternalLink className="w-3 h-3 transition-opacity opacity-0 group-hover:opacity-100" />
            </a>
          </motion.div>

          {/* Quick Links */}
          <motion.nav
            variants={item}
            aria-label="Quick links"
            className="space-y-5"
          >
            <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-foreground/80">
              <span className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
              {t("links")}
            </h3>
            <ul className="space-y-3">
              {navItems.map((nav, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={nav.link}
                    className="relative inline-flex items-center text-sm transition-all group text-muted-foreground hover:text-green-500 hover:translate-x-1"
                  >
                    <span className="absolute left-0 w-0 h-px -ml-5 transition-all bg-green-500 group-hover:w-4" />
                    <span className="transition-colors">{nav.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Social Media */}
          <motion.nav
            variants={item}
            aria-label="Social media"
            className="space-y-5"
          >
            <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-foreground/80">
              <span className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
              {t("follow")}
            </h3>
            <ul className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: Twitter,
                  href: socialMedia.x,
                  label: "Twitter",
                  color:
                    "hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/50 hover:text-[#1DA1F2]",
                },
                {
                  icon: Github,
                  href: socialMedia.github,
                  label: "GitHub",
                  color:
                    "hover:bg-foreground/10 hover:border-foreground/50 hover:text-foreground",
                },
                {
                  icon: Linkedin,
                  href: socialMedia.linkedin,
                  label: "LinkedIn",
                  color:
                    "hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/50 hover:text-[#0A66C2]",
                },
                {
                  icon: Instagram,
                  href: socialMedia.instagram,
                  label: "Instagram",
                  color:
                    "hover:bg-[#E4405F]/10 hover:border-[#E4405F]/50 hover:text-[#E4405F]",
                },
              ].map((social, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group relative flex items-center gap-3 p-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300",
                      social.color,
                    )}
                  >
                    <social.icon
                      className="w-5 h-5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-medium truncate">
                      {social.label}
                    </span>
                    <span className="sr-only">{social.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Spotify Now Playing */}
          <motion.div variants={item} className="space-y-5">
            <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-foreground/80">
              <span className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
              Now Playing
            </h3>
            <SpotifyNowPlaying />
          </motion.div>
        </motion.div>

        {/* Divider with decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-16 mb-8"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute px-4 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-background">
            <Heart className="w-4 h-4 text-green-500 fill-green-500 animate-pulse" />
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-between gap-4 md:flex-row"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()}</span>
            <span className="font-semibold text-foreground">Arya Dzaky</span>
            <span>•</span>
            <span>All rights reserved</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
