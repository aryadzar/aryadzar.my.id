"use client";

import type React from "react";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type ContactSectionProps = {
  id?: string;
  email?: string;
  heading?: string;
  subheading?: string;
};

export function ContactSection({
  id = "contact",
  email = "you@example.com",
  heading = "Contact Me",
  subheading = "Punya proyek atau kolaborasi? Kirim pesan singkat—saya akan membalas secepatnya.",
}: ContactSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = useMemo(
    () =>
      ({
        initial: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }) as const,
    [prefersReducedMotion]
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const replyTo = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");
    const subject = encodeURIComponent(`New message from ${name}`);
    const body = encodeURIComponent(
      `From: ${name}\nEmail: ${replyTo}\n\n${message}`
    );
    // Simple mailto fallback so it works without backend
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-t border-border bg-background"
    >
      <div className="w-full max-w-6xl px-4 py-12 mx-auto md:py-16">
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div {...fadeUp} className="space-y-3">
            <h2
              id={`${id}-title`}
              className="text-2xl font-semibold tracking-tight text-balance md:text-3xl"
            >
              {heading}
            </h2>
            <p className="text-sm text-pretty text-muted-foreground md:text-base">
              {subheading}
            </p>

            <div className="p-4 mt-4 border rounded-lg border-border">
              <p className="text-xs text-muted-foreground">
                Prefer email langsung?{" "}
                <a
                  href={`mailto:${email}`}
                  className="underline rounded underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {email}
                </a>
              </p>
            </div>
          </motion.div>

          <motion.form
            {...fadeUp}
            onSubmit={onSubmit}
            className="p-4 border shadow-sm rounded-xl border-border bg-card md:p-6"
            aria-describedby={`${id}-helper`}
          >
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <label htmlFor={`${id}-name`} className="text-sm font-medium">
                  Nama
                </label>
                <Input
                  id={`${id}-name`}
                  name="name"
                  required
                  placeholder="Nama Anda"
                  className="w-full h-10 px-3 text-sm border rounded-md outline-none border-border bg-background text-foreground ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor={`${id}-email`} className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full h-10 px-3 text-sm border rounded-md outline-none border-border bg-background text-foreground ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="grid gap-1.5">
                <label
                  htmlFor={`${id}-message`}
                  className="text-sm font-medium"
                >
                  Pesan
                </label>
                <Textarea
                  id={`${id}-message`}
                  name="message"
                  required
                  rows={5}
                  placeholder="Tulis pesan Anda..."
                  className="w-full p-3 text-sm border rounded-md outline-none border-border bg-background text-foreground ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="pt-1">
                <Button type="submit" className="w-full md:w-auto">
                  Kirim Pesan
                </Button>
              </div>

              <p id={`${id}-helper`} className="text-xs text-muted-foreground">
                Data tidak disimpan di server. Form ini akan membuka aplikasi
                email Anda dengan isi pesan yang sudah terisi.
              </p>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
