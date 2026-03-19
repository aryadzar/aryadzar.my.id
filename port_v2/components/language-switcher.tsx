"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import GB from "country-flag-icons/react/3x2/GB";
import ID from "country-flag-icons/react/3x2/ID";
import DE from "country-flag-icons/react/3x2/DE";
/* ─────────────────────────────────────────
   Locale config — tambah / kurangi sesuai kebutuhan
───────────────────────────────────────── */
type FlagComponent = React.ComponentType<{
  className?: string;
  title?: string;
}>;

const LOCALES: {
  code: string;
  label: string;
  nativeLabel: string;
  Flag: FlagComponent;
}[] = [
  { code: "en", label: "English", nativeLabel: "English", Flag: GB },
  {
    code: "id",
    label: "Indonesian",
    nativeLabel: "Bahasa Indonesia",
    Flag: ID,
  },
  { code: "de", label: "German", nativeLabel: "Deutsch", Flag: DE },
];

type LocaleCode = (typeof LOCALES)[number]["code"];

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function LanguageSwitcher() {
  const locale = useLocale() as LocaleCode;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const changeLocale = (nextLocale: string) => {
    const parts = window.location.pathname.split("/");
    parts[1] = nextLocale;
    window.location.href = parts.join("/") + window.location.search;
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium",
          "transition-all duration-200 select-none cursor-pointer",
          "border-neutral-200 bg-white text-neutral-700 shadow-sm",
          "hover:border-neutral-300 hover:bg-neutral-50 hover:shadow",
          "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300",
          "dark:hover:border-neutral-600 dark:hover:bg-neutral-800",
          open &&
            "border-neutral-300 bg-neutral-50 shadow dark:border-neutral-600 dark:bg-neutral-800",
        )}
      >
        {/* Flag */}
        <span className="text-base leading-none">
          {
            <current.Flag
              className="w-5 h-auto rounded-sm shadow-sm"
              title={current.label}
            />
          }
        </span>

        {/* Code */}
        <span className="text-xs font-semibold tracking-wide uppercase">
          {current.code}
        </span>

        {/* Chevron */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="text-neutral-400 dark:text-neutral-500"
        >
          <ChevronDown size={14} />
        </motion.span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className={cn(
              "absolute right-0 top-[calc(100%+8px)] z-50 min-w-[200px]",
              "rounded-2xl border border-neutral-200/80 bg-white/95 p-1.5",
              "shadow-[0_8px_32px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.04)]",
              "backdrop-blur-xl",
              "dark:border-neutral-700/80 dark:bg-neutral-900/95",
              "dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)]",
            )}
          >
            {/* Header label */}
            <div className="flex items-center gap-1.5 px-3 pb-1.5 pt-1">
              <Globe size={11} className="text-neutral-400" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Language
              </span>
            </div>

            {/* Divider */}
            <div className="mx-2 mb-1.5 h-px bg-neutral-100 dark:bg-neutral-800" />

            {/* Items */}
            {LOCALES.map((l, i) => {
              const isActive = l.code === locale;
              return (
                <motion.button
                  key={l.code}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => {
                    setOpen(false);
                    if (!isActive) changeLocale(l.code);
                  }}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left",
                    "transition-all duration-150 cursor-pointer",
                    isActive
                      ? "bg-neutral-100 dark:bg-neutral-800"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-800/60",
                  )}
                >
                  {/* Flag */}
                  <span className="text-lg leading-none">
                    <l.Flag
                      className="w-5 h-auto rounded-sm shadow-sm"
                      title={l.label}
                    />
                  </span>

                  {/* Labels */}
                  <div className="flex flex-col flex-1">
                    <span
                      className={cn(
                        "text-sm font-medium leading-tight",
                        isActive
                          ? "text-neutral-900 dark:text-white"
                          : "text-neutral-700 dark:text-neutral-300",
                      )}
                    >
                      {l.nativeLabel}
                    </span>
                    <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                      {l.label}
                    </span>
                  </div>

                  {/* Active check */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 28,
                        }}
                        className="flex items-center justify-center w-5 h-5 rounded-full bg-neutral-900 dark:bg-white"
                      >
                        <Check
                          size={10}
                          className="text-white dark:text-neutral-900"
                          strokeWidth={3}
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
