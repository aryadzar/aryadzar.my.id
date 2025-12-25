// /schemas/experience.ts

import { defineField, defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "duration",
      title: "Duration (ex: 2023 - Present)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }], // sesuai permintaan
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
