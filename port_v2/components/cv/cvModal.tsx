"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CvModal({ cvLink }: { cvLink: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        className="cursor-pointer "
        onClick={() => setOpen(true)}
      >
        Lihat CV
      </Button>

      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* MODAL */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-4xl max-h-[85vh] bg-background rounded-xl shadow-xl overflow-hidden border">
                {/* Tombol Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 z-50 px-3 py-1.5 text-sm rounded-md bg-black/70 text-white hover:bg-black/90 transition"
                >
                  ✕
                </button>

                {/* PDF embed */}
                <div className="w-full h-[85vh]">
                  <embed
                    src={`${cvLink}#toolbar=1&navpanes=0&scrollbar=1`}
                    type="application/pdf"
                    className="w-full h-full rounded-b-xl"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
