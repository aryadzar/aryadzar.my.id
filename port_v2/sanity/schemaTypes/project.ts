import { defineType, defineField } from "sanity";
import { GitPullRequestCreate } from "lucide-react";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: GitPullRequestCreate,
  fields: [
    defineField({
      name: "title",
      title: "Judul Project / Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail / Cover Image",
      type: "image",
      options: { hotspot: true, accept: "image/*" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDesc",
      title: "Deskripsi Singkat / Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Deskripsi Lengkap / Full Description",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        { type: "code" },
        { type: "embed" },
        { type: "videoBlock" },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "liveUrl",
      title: "URL Live / Demo",
      type: "url",
    }),
    defineField({
      name: "repoUrl",
      title: "Repository URL (GitHub, GitLab, dll)",
      type: "url",
    }),
    defineField({
      name: "publishedAt",
      title: "Tanggal Publikasi / Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
