import { urlFor } from "@/sanity/lib/image";
import { projectId, dataset } from "@/sanity/env";
import { PortableTextComponents } from "next-sanity";
import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";
import { useState } from "react";

function slugify(text: string): string {
  return text
    .normalize("NFKD")               // decompose accented chars (é → e + ́)
    .replace(/[\u0300-\u036f]/g, "") // strip combining diacritical marks
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")        // remove non-word chars (keeps letters, digits, _, -, space)
    .replace(/[\s_]+/g, "-")         // spaces/underscores → dash
    .replace(/-{2,}/g, "-")          // collapse multiple dashes
    .replace(/^-+|-+$/g, "");        // trim leading/trailing dashes
}

/** Extract plain text from a Sanity PortableText block value */
function blockText(value: PortableTextBlock): string {
  return value.children
    .map((child) => ("text" in child ? (child as PortableTextSpan).text : ""))
    .join("");
}

/** Robust helper to extract or reconstruct the video URL from Sanity block values */
function getVideoUrl(value: any): string | null {
  if (value?.url) return value.url;
  if (value?.video?.asset?.url) return value.video.asset.url;

  const ref = value?.video?.asset?._ref || value?.video?.asset?._id;
  if (ref && typeof ref === "string") {
    // Sanity file asset _ref format: "file-<assetId>-<extension>"
    const parts = ref.split("-");
    if (parts.length >= 3 && parts[0] === "file") {
      const assetId = parts[1];
      const extension = parts.slice(2).join("-");
      return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${extension}`;
    }
  }
  return null;
}

export const components: PortableTextComponents = {
  types: {
    code: ({ value }) => (
      <pre className="p-4 overflow-x-auto text-white bg-black border rounded-lg">
        <code
          data-sanity={value._key}
          key={value._key}
          className={`language-${value.language || "javascript"}`}
        >
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
      const videoUrl = getVideoUrl(value);
      if (!videoUrl) return null;

      return (
        <figure className="my-8 overflow-hidden rounded-2xl border border-border/80 bg-card/60 shadow-lg">
          <video
            src={videoUrl}
            controls
            playsInline
            preload="metadata"
            className="w-full rounded-t-2xl aspect-video bg-black object-contain"
          />
          {value.caption && (
            <figcaption className="p-3 text-xs text-center text-muted-foreground border-t border-border/40 font-medium">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  block: {
    // H1
    h1: ({ children, value }) => {
      const id = slugify(blockText(value));
      return (
        <h1 data-sanity={value._key} id={id}>
          {children}
        </h1>
      );
    },

    // H2
    h2: ({ children, value }) => {
      const id = slugify(blockText(value));
      return (
        <h2 data-sanity={value._key} id={id}>
          {children}
        </h2>
      );
    },

    // H3
    h3: ({ children, value }) => {
      const id = slugify(blockText(value));
      return (
        <h3 data-sanity={value._key} id={id}>
          {children}
        </h3>
      );
    },

    // H4
    h4: ({ children, value }) => {
      const id = slugify(blockText(value));
      return (
        <h4 data-sanity={value._key} id={id}>
          {children}
        </h4>
      );
    },
  },
};
