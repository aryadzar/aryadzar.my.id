import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",

  fields: [
    // Title
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // Subtitle
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),

    // Upload Video (Single File)
    defineField({
      name: "video",
      title: "Background Video",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (Rule) => Rule.required(),
    }),

    // CTA Primary → Upload PDF only
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
      title: "title",
      subtitle: "subtitle",
    },
    prepare(selection) {
      return {
        title: selection.title || "Hero Video Background",
        subtitle: selection.subtitle,
      };
    },
  },
});
