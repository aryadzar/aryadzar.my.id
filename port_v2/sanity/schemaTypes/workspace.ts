import { defineType, defineField } from "sanity";
import { Armchair } from "lucide-react";

// The workspace photo at the top of the Uses page. One document per language,
// so the caption can be translated.
export default defineType({
  name: "workspace",
  title: "Workspace photo",
  type: "document",
  icon: Armchair,
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: 'e.g. "My desk in Bandar Lampung, 2026"',
    }),
  ],
  preview: {
    select: { title: "caption", media: "image", subtitle: "language" },
    prepare: ({ title, media, subtitle }) => ({
      title: title || "Workspace photo",
      subtitle,
      media,
    }),
  },
});
