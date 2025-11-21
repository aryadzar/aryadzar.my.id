// ./lib/presentation/resolve.ts
import { defineDocuments, defineLocations } from "sanity/presentation";

// Configures the "Used on x pages" banner
export const locations = {
  // Map document types to frontend routes
  blog: defineLocations({
    select: { title: "title", slug: "slug.current", language: "language" },
    resolve: (doc) => ({
      locations: [
        { title: doc?.title, href: `${doc?.language}/blog/${doc?.slug}` },
        { title: "blog Index", href: `/blog` },
      ],
    }),
  }),
  // ...
};

// Configures documents presentation tool should open by default when navigating to an URL
export const mainDocuments = defineDocuments([
  {
    route: "/blog/:slug",
    filter: `_type == "blog" && slug.current == $slug`,
  },
  // ...
]);
