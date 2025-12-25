import { urlFor } from "@/sanity/lib/image";
import { PortableTextComponents } from "next-sanity";
import { useState } from "react";

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
      const [open, setOpen] = useState(false);

      // Gambar kecil (thumbnail)
      const small = urlFor(value).width(500).url();

      // Gambar besar (full)
      const full = urlFor(value).width(1600).url();

      return (
        <>
          {/* Thumbnail */}
          <div className="flex justify-center my-6">
            <img
              src={small}
              alt={value.alt || "Blog Image"}
              className="object-cover rounded-lg cursor-zoom-in max-h-lvw"
              onClick={() => setOpen(true)}
              loading="lazy"
            />
          </div>

          {/* Modal fullscreen */}
          {open && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            >
              <img
                src={full}
                alt={value.alt || "Full Image"}
                className="max-w-full max-h-full rounded-lg cursor-zoom-out"
              />
            </div>
          )}
        </>
      );
    },
    embed: ({ value }) => (
      <div
        className="w-full mx-auto aspect-video"
        dangerouslySetInnerHTML={{ __html: value?.html }}
      />
    ),
    videoBlock: ({ value }) => {
      if (!value.url) return null;

      return (
        <div className="my-6">
          <video
            src={value.url}
            controls
            className="w-full border rounded-lg border-border"
          />
          {value.caption && (
            <p className="mt-2 text-sm text-center text-muted-foreground">
              {value.caption}
            </p>
          )}
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
