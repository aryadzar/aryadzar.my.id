import { defineType, defineField } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  icon: Newspaper,
  fields: [
    defineField({
      name: "title",
      title: "Certification Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "issuer",
      title: "Issuer",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // Tanggal sertifikat (date)
    defineField({
      name: "date",
      title: "Issued Date",
      type: "date",
      validation: (Rule) => Rule.required(),
      options: { dateFormat: "MMM DD, YYYY" },
    }),

    // ID opsional
    defineField({
      name: "certId",
      title: "Certificate ID",
      type: "string",
    }),

    // Link ke file gambar sertifikat
    // Atau bisa pakai file/pdf, terserah kamu
    defineField({
      name: "certificateFile",
      title: "Certificate File (link)",
      type: "file",
      options: { accept: "image/*,application/pdf" },
      description: "Upload certificate image or PDF. Will be used for href.",
    }),

    // Logo issuer
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      validation: (Rule) => Rule.required(),
      options: { hotspot: true },
    }),
  ],
});
