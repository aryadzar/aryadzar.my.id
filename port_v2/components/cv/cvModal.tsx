"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Download, X, FileText, Maximize2, Minimize2 } from "lucide-react";

export function CvModal({ cvLink }: { cvLink: string }) {
  const [open, setOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const t = useTranslations("home.hero");

  const handleDownload = () => {
    window.open(cvLink, "_blank");
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        size="lg"
        className="relative overflow-hidden transition-all shadow-lg cursor-pointer group hover:shadow-xl"
        onClick={() => setOpen(true)}
      >
        <span className="relative z-10 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          {t("buttonCv")}
        </span>
        {/* Shine effect */}
        <span className="absolute inset-0 transition-transform duration-700 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </Button>

      <AnimatePresence mode="wait">
        {open && (
          <>
            {/* Backdrop dengan blur */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                className={`
                  relative w-full bg-background rounded-2xl shadow-2xl overflow-hidden 
                  border border-border/50 pointer-events-auto
                  ${isFullscreen ? "max-w-7xl max-h-[95vh]" : "max-w-5xl max-h-[90vh]"}
                `}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Header dengan kontrol */}
                <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b bg-background/95 backdrop-blur-sm border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">
                        Curriculum Vitae
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        View and download my CV
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Download Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleDownload}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>

                    {/* Fullscreen Toggle */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-0 h-9 w-9"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4" />
                      ) : (
                        <Maximize2 className="w-4 h-4" />
                      )}
                    </Button>

                    {/* Close Button */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setOpen(false)}
                      className="p-0 h-9 w-9 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* PDF Viewer dengan loading state */}
                <div
                  className={`
                    relative bg-muted/30
                    ${isFullscreen ? "h-[calc(95vh-73px)]" : "h-[calc(90vh-73px)]"}
                  `}
                >
                  {/* Loading State */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border-4 rounded-full animate-spin border-primary border-t-transparent" />
                      <p className="text-sm text-muted-foreground">
                        Loading PDF...
                      </p>
                    </div>
                  </div>

                  {/* PDF Embed */}
                  <iframe
                    src={`${cvLink}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                    className="absolute inset-0 w-full h-full rounded-b-2xl"
                    title="CV Preview"
                  />
                </div>

                {/* Footer Helper Text */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/95 to-transparent backdrop-blur-sm">
                  <p className="text-xs text-center text-muted-foreground">
                    Tip: Use the controls above to download or view in
                    fullscreen
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
