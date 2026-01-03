// /schemas/education.ts

import { defineField, defineType } from "sanity";
import { GraduationCap } from "lucide-react";

export default defineType({
  name: "education",
  title: "Education",
  type: "document",
  icon: GraduationCap,
  fields: [
    defineField({
      name: "degree",
      title: "Degree",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "school",
      title: "School / University",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "field",
      title: "Field of Study",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "date",
      title: "Date (ex: 2020 - 2024)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "logo",
      title: "Logo",
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
