import { defineType } from "sanity";

export default defineType({
  name: "embed",
  title: "Embed HTML",
  type: "object",
  fields: [
    {
      name: "html",
      title: "Raw HTML",
      type: "text",
      description: "Paste embed HTML (YouTube iframe, etc)",
    },
  ],
});
