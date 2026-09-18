import { urlFor } from "@/sanity/lib/image";
import { projectId, dataset } from "@/sanity/env";
import { PortableTextComponents } from "next-sanity";
import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Loader2 } from "lucide-react";

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

function PortableTextImage({ value }: { value: any }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Close modal on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Gambar kecil (thumbnail)
  const small = urlFor(value).width(900).url();

  // Gambar besar (full)
  const full = urlFor(value).width(1800).url();
  const altText = value.alt || "Image preview";

  const handleOpen = () => {
    setIsLoading(true);
    setOpen(true);
  };

  return (
    <figure className="my-8 flex flex-col items-center">
      {/* Thumbnail with hover animation */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2 }}
        className="relative group cursor-zoom-in overflow-hidden rounded-xl border border-border/70 bg-card/40 shadow-md transition-shadow hover:shadow-xl hover:border-emerald-500/40 max-w-full"
        onClick={handleOpen}
      >
        <img
          src={small}
          alt={altText}
          className="object-cover rounded-xl max-h-[500px] w-auto max-w-full transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        {/* Hover zoom indicator overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
            <ZoomIn className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </motion.div>

      {value.alt && (
        <figcaption className="mt-2.5 text-xs text-center text-muted-foreground font-medium">
          {value.alt}
        </figcaption>
      )}

      {/* Modal fullscreen with Framer Motion spring animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md select-none"
            onClick={() => setOpen(false)}
          >
            {/* Close Button */}
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 shadow-xl transition-all hover:scale-105 cursor-pointer z-10"
              aria-label="Close fullscreen preview"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Modal Image container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 320 }}
              className="relative max-w-5xl max-h-[88vh] flex flex-col items-center justify-center min-w-[280px] min-h-[200px]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Loading Spinner Indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 pointer-events-none">
                  <div className="p-3.5 rounded-2xl bg-zinc-900/85 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center">
                    <Loader2 className="w-7 h-7 text-emerald-400 animate-spin" />
                  </div>
                </div>
              )}

              {/* Blurred thumbnail preview while full-res loads */}
              {isLoading && (
                <img
                  src={small}
                  alt={altText}
                  className="max-w-full max-h-[82vh] w-auto h-auto object-contain rounded-xl blur-md scale-95 opacity-50 transition-opacity"
                />
              )}

              {/* Full resolution Image */}
              <img
                src={full}
                alt={altText}
                onLoad={() => setIsLoading(false)}
                className={`max-w-full max-h-[82vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10 cursor-zoom-out transition-all duration-300 ${
                  isLoading ? "opacity-0 absolute scale-95" : "opacity-100 scale-100 relative"
                }`}
                onClick={() => setOpen(false)}
              />

              {value.alt && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mt-3 text-xs md:text-sm text-zinc-300 text-center bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 max-w-lg truncate"
                >
                  {value.alt}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
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
    image: ({ value }) => <PortableTextImage value={value} />,
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
