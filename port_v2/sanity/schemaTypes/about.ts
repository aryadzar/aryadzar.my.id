// /sanity/schema/about.ts
import { defineType, defineField } from "sanity";
import { FileUser } from "lucide-react";

export default defineType({
  name: "about",
  title: "About Section",
  type: "document",
  icon: FileUser,
  fields: [
    defineField({
      name: "profileImage",
      title: "Foto Profil",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "name",
      title: "Nama",
      type: "string",

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "jobTitle",
      title: "Job Title / Position",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),

    // ---- Fields used by the About page (all optional; the page falls back to translations) ----
    defineField({
      name: "headlineA",
      title: "Headline, first line",
      type: "string",
      description: "e.g. Backends that hold up.",
    }),

    defineField({
      name: "headlineB",
      title: "Headline, second line (shown softer)",
      type: "string",
      description: "e.g. Interfaces that stay out of the way.",
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. Bandar Lampung, Indonesia",
    }),

    defineField({
      name: "timezone",
      title: "Time zone",
      type: "string",
      description: "e.g. UTC+7 (WIB)",
    }),

    defineField({
      name: "coreStack",
      title: "Core stack",
      type: "array",
      of: [{ type: "string" }],
      description: "Shown in the facts grid, e.g. React, Next.js, Node.js, Go",
    }),

    defineField({
      name: "infrastructure",
      title: "Infrastructure",
      type: "array",
      of: [{ type: "string" }],
      description: "Shown in the facts grid, e.g. Docker, Kubernetes, Keycloak",
    }),

    defineField({
      name: "cvFile",
      title: "Upload CV (PDF)",
      type: "file",
      options: {
        accept: "application/pdf",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "jobTitle",
      media: "profileImage",
    },
  },
});
