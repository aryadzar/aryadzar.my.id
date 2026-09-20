import { defineType, defineField } from "sanity";
import { Images } from "lucide-react";

// One document per photo on the /photos board. Photos are not translated:
// write the caption in whatever language suits the moment.
export default defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  icon: Images,
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
          description: "Describe the photo for people who can't see it. Falls back to the caption.",
        }),
      ],
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: 'A short, casual line, e.g. "jumping in thailand"',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "date",
      title: "Date taken",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Optional. Shown when the photo is opened.",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "caption", subtitle: "date", media: "image" },
  },
});
