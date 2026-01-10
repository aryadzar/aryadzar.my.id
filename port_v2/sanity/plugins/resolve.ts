// ./sanity/plugins/resolve.ts
import { defineDocuments, defineLocations } from "sanity/presentation";

// Configures the "Used on x pages" banner
export const locations = {
  // Blog posts
  blog: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
      language: "language",
    },
    resolve: (doc) => ({
      locations: [
        { title: doc?.title, href: `/${doc?.language || "en"}/blog/${doc?.slug}` },
        { title: "Blog Index", href: `/blog` },
      ],
    }),
  }),

  // Projects
  project: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
      language: "language",
    },
    resolve: (doc) => ({
      locations: [
        { title: doc?.title, href: `/${doc?.language || "en"}/projects/${doc?.slug}` },
        { title: "Projects Index", href: `/projects` },
      ],
    }),
  }),

  // Hero section (homepage)
  hero: defineLocations({
    select: {
      title: "title",
      language: "language",
    },
    resolve: (doc) => ({
      locations: [
        { title: `Hero (${doc?.language || "en"})`, href: `/${doc?.language || "en"}` },
      ],
    }),
  }),

  // About section (homepage & about page)
  about: defineLocations({
    select: {
      name: "name",
      language: "language",
    },
    resolve: (doc) => ({
      locations: [
        { title: `About (${doc?.language || "en"})`, href: `/${doc?.language || "en"}/about` },
        { title: `Homepage (${doc?.language || "en"})`, href: `/${doc?.language || "en"}` },
      ],
    }),
  }),

  // Education (displayed on homepage)
  education: defineLocations({
    select: {
      degree: "degree",
      school: "school",
      language: "language",
    },
    resolve: (doc) => ({
      locations: [
        {
          title: `${doc?.degree} at ${doc?.school}`,
          href: `/${doc?.language || "en"}`,
        },
      ],
    }),
  }),

  // Experience (displayed on homepage)
  experience: defineLocations({
    select: {
      title: "title",
      company: "company",
      language: "language",
    },
    resolve: (doc) => ({
      locations: [
        {
          title: `${doc?.title} at ${doc?.company}`,
          href: `/${doc?.language || "en"}`,
        },
      ],
    }),
  }),

  // Certifications (no language field, shared across locales on homepage)
  certification: defineLocations({
    select: {
      title: "title",
      issuer: "issuer",
    },
    resolve: (doc) => ({
      locations: [
        { title: `${doc?.title} - ${doc?.issuer}`, href: `/en` },
        { title: `${doc?.title} - ${doc?.issuer}`, href: `/id` },
      ],
    }),
  }),
};

// Configures documents presentation tool should open by default when navigating to an URL
export const mainDocuments = defineDocuments([
  {
    route: "/blog/:slug",
    filter: `_type == "blog" && slug.current == $slug`,
  },
  {
    route: "/projects/:slug",
    filter: `_type == "project" && slug.current == $slug`,
  },
  {
    route: "/:locale?",
    filter: `_type == "hero" && language == $locale`,
  },
  {
    route: "/about",
    filter: `_type == "about" && language == $locale`,
  },
]);
