import { urlFor } from "@/sanity/lib/image";
import { PortableTextComponents } from "next-sanity";

function slugify(text: any) {
  return String(text)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export const components: PortableTextComponents = {
  types: {
    code: ({ value }) => (
      <pre className="p-4 overflow-x-auto text-white bg-black border rounded-lg">
        <code className={`language-${value.language || "javascript"}`}>
          {value.code}
        </code>
      </pre>
    ),
    image: ({ value }) => {
      const imageUrl = urlFor(value).width(1200).url();

      return (
        <div className="my-6">
          <img
            src={imageUrl}
            alt={value.alt || "Blog image"}
            className="w-full h-auto rounded-lg"
            loading="lazy"
          />
        </div>
      );
    },
  },

  block: {
    // H1
    h1: ({ children }) => {
      const id = slugify(children?.toString() || "");
      return <h1 id={id}>{children}</h1>;
    },

    // H2
    h2: ({ children }) => {
      const id = slugify(children?.toString() || "");
      return <h2 id={id}>{children}</h2>;
    },

    // H3
    h3: ({ children }) => {
      const id = slugify(children?.toString() || "");
      return <h3 id={id}>{children}</h3>;
    },

    // H4
    h4: ({ children }) => {
      const id = slugify(children?.toString() || "");
      return <h4 id={id}>{children}</h4>;
    },
  },
};
