import { defineType, defineField } from "sanity";
import { Monitor } from "lucide-react";

export default defineType({
  name: "uses",
  title: "Uses / Setup",
  type: "document",
  icon: Monitor,
  fields: [
    defineField({
      name: "name",
      title: "Tool / App Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g. VS Code, Docker, Figma",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Short description of how/why you use this tool",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Workstation", value: "workstation" },
          { title: "Furniture", value: "furniture" },
          { title: "Accessories", value: "accessories" },
          { title: "Applications", value: "applications" },
          { title: "Subscriptions", value: "subscriptions" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "specs",
      title: "Specs",
      type: "string",
      description: 'Optional line under the name, e.g. \'14" M3 Pro, 36GB, 1TB SSD\'',
    }),

    defineField({
      name: "image",
      title: "Photo / Screenshot",
      type: "image",
      options: { hotspot: true },
      description: "Shown next to the description. A product photo or a screenshot of the app.",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "icon",
      title: "Tool Icon / Logo",
      type: "image",
      options: { hotspot: true },
      description: "Upload the tool logo/icon",
    }),

    defineField({
      name: "link",
      title: "Website URL",
      type: "url",
      description: "Link to the tool's official website",
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
