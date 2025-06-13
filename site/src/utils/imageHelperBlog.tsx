import parse, { DOMNode, Element as DomElement } from 'html-react-parser';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from "react-dom";
import { X } from 'lucide-react';
// import Loading from '@/components/loading';

const ZoomImage = ({ thumbSrc, fullSrc }: { thumbSrc: string; fullSrc: string }) => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Optional: Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <img
        src={thumbSrc}
        alt=""
        className="rounded-xl object-contain cursor-zoom-in transition duration-300 ease-in-out"
        onClick={() => {
          setOpen(true);
          setLoaded(false);
        }}
      />

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                className="relative w-full h-full max-w-6xl max-h-[90vh] p-4"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Tombol Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Spinner saat iframe belum load */}
                {!loaded && (
                  <div className="absolute inset-0 flex items-center bg-transparent justify-center z-10">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    {/* <Loading/> */}
                  </div>
                )}

                {/* iframe gambar resolusi penuh */}
                <iframe
                  src={fullSrc}
                  className={`w-full h-full rounded-xl border-none transition-opacity duration-300 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setLoaded(true)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
export default function preprocessHtmlWithZoomWrapper(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;

  // Gambar di dalam <a href="...">
  div.querySelectorAll('a').forEach((a) => {
    const img = a.querySelector('img');
    const href = a.getAttribute('href');
    if (img && href) {
      const thumbSrc = img.getAttribute('src') || href;
      const zoomWrapper = document.createElement('zoom-wrapper');
      zoomWrapper.setAttribute('data-src', href);      // full-resolution
      zoomWrapper.setAttribute('data-thumb', thumbSrc); // thumbnail
      a.replaceWith(zoomWrapper);
    }
  });

  // Gambar standalone
  div.querySelectorAll('img').forEach((img) => {
    const parent = img.parentElement;
    const src = img.getAttribute('src');
    if (src && parent?.tagName !== 'A') {
      const zoomWrapper = document.createElement('zoom-wrapper');
      zoomWrapper.setAttribute('data-src', src); // no better resolution, fallback
      zoomWrapper.setAttribute('data-thumb', src);
      img.replaceWith(zoomWrapper);
    }
  });

  return div.innerHTML;
}


export function renderWithZoom(html: string) {
  return parse(html, {
    replace: (domNode: DOMNode) => {
      if (
        domNode instanceof DomElement &&
        domNode.tagName === 'zoom-wrapper'
      ) {
        const fullSrc = domNode.attribs['data-src'];
        const thumbSrc = domNode.attribs['data-thumb'] || fullSrc;
        if (!fullSrc) return null;

        return <ZoomImage thumbSrc={thumbSrc} fullSrc={fullSrc} />;
      }
    },
  });

};
