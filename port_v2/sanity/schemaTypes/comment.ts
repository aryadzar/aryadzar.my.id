import { defineType, defineField } from "sanity";
import { MessageSquare } from "lucide-react";

export default defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  icon: MessageSquare,
  fields: [
    defineField({
      name: "relatedPost",
      title: "Related Post",
      type: "reference",
      to: [{ type: "blog" }, { type: "project" }],
      validation: (Rule) => Rule.required(),
      description: "Reference to the blog or project this comment belongs to",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      fields: [
        defineField({
          name: "sub",
          title: "User ID (Keycloak)",
          type: "string",
          description: "Unique user ID from Keycloak",
        }),
        defineField({
          name: "name",
          title: "Display Name",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
        defineField({
          name: "preferred_username",
          title: "Preferred Username",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Comment Content",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().min(1).max(5000),
    }),
    defineField({
      name: "parentId",
      title: "Parent Comment (for replies)",
      type: "reference",
      to: [{ type: "comment" }],
      description: "If this is a reply, reference the parent comment",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: "isDeleted",
      title: "Is Deleted",
      type: "boolean",
      initialValue: false,
      description: "Soft delete - comment will be hidden but preserved",
    }),
  ],
  orderings: [
    {
      title: "Created At (Newest First)",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
    {
      title: "Created At (Oldest First)",
      name: "createdAtAsc",
      by: [{ field: "createdAt", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      content: "content",
      authorName: "author.name",
      createdAt: "createdAt",
    },
    prepare(selection) {
      const { content, authorName, createdAt } = selection;
      const truncatedContent =
        content?.length > 50 ? content.substring(0, 50) + "..." : content;

      return {
        title: truncatedContent || "Untitled Comment",
        subtitle: `${authorName || "Unknown"} • ${new Date(
          createdAt
        ).toLocaleDateString()}`,
      };
    },
  },
});
