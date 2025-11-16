// /sanity/schema/about.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "about",
  title: "About Section",
  type: "document",
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
