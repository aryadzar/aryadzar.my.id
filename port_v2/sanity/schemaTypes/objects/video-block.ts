import { defineType, defineField } from "sanity";

export default defineType({
  name: "videoBlock",
  title: "Video Upload",
  type: "object",
  fields: [
    defineField({
      name: "video",
      title: "Upload Video",
      type: "file",
      options: {
        accept: "video/*", // Hanya terima file video
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption (Opsional)",
      type: "string",
    }),
  ],
  preview: {
    select: {
      caption: "caption",
    },
    prepare(selection) {
      return {
        title: selection.caption || "Video Upload",
      };
    },
  },
});
