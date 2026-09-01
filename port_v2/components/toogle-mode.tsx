"use client";

import * as React from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const THEMES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

type ThemeValue = (typeof THEMES)[number]["value"];

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  /* Close on outside click */
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = THEMES.find((t) => t.value === theme) ?? THEMES[0];

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-xl border",
          "transition-all duration-200 cursor-pointer select-none",
          "border-neutral-200 bg-white text-neutral-700 shadow-sm",
          "hover:border-neutral-300 hover:bg-neutral-50 hover:shadow",
          "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300",
          "dark:hover:border-neutral-600 dark:hover:bg-neutral-800",
          open &&
            "border-neutral-300 bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800",
        )}
        aria-label="Toggle theme"
      >
        {/* Sun ↔ Moon swap */}
        <AnimatePresence mode="wait" initial={false}>
          {mounted && (
            <motion.span
              key={theme}
              initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className="flex items-center justify-center"
            >
              <current.icon size={16} strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>
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
              "absolute right-0 top-[calc(100%+8px)] z-50 min-w-[148px]",
              "rounded-2xl border border-neutral-200/80 bg-white/95 p-1.5",
              "shadow-[0_8px_32px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.04)]",
              "backdrop-blur-xl",
              "dark:border-neutral-700/80 dark:bg-neutral-900/95",
              "dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)]",
            )}
          >
            {THEMES.map(({ value, label, icon: Icon }, i) => {
              const isActive = theme === value;
              return (
                <motion.button
                  key={value}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}
                  onClick={() => {
                    setTheme(value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left",
                    "transition-all duration-150 cursor-pointer",
                    isActive
                      ? "bg-neutral-100 dark:bg-neutral-800"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-800/60",
                  )}
                >
                  {/* Icon bubble */}
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-lg",
                      isActive
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                        : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
                    )}
                  >
                    <Icon size={12} strokeWidth={2.2} />
                  </span>

                  {/* Label */}
                  <span
                    className={cn(
                      "flex-1 text-sm font-medium",
                      isActive
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-600 dark:text-neutral-400",
                    )}
                  >
                    {label}
                  </span>

                  {/* Checkmark */}
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
                      >
                        <Check
                          size={13}
                          className="text-neutral-900 dark:text-white"
                          strokeWidth={2.5}
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
