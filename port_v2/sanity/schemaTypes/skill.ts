import { defineType, defineField } from "sanity";
import { Cpu } from "lucide-react";

export default defineType({
  name: "skill",
  title: "Skill / Tech Stack",
  type: "document",
  icon: Cpu,
  fields: [
    defineField({
      name: "name",
      title: "Technology Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g. Next.js, Laravel, PostgreSQL",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Database", value: "database" },
          { title: "Tools", value: "tools" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "icon",
      title: "Technology Icon / Logo",
      type: "image",
      options: { hotspot: true },
      description: "Upload the technology logo/icon (SVG or PNG preferred)",
    }),

    defineField({
      name: "color",
      title: "Brand Color (Hex)",
      type: "string",
      description: "e.g. #61DAFB for React, #000000 for Next.js",
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          name: "hex color",
          invert: false,
        }),
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "icon",
    },
  },
});
