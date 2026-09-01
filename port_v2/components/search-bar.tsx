"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Cari…",
  className,
  autoFocus,
}: Props) {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoFocus && ref.current) ref.current.focus();
  }, [autoFocus]);

  // Handle ESC key to clear
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && value) {
        onChange("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [value, onChange]);

  return (
    <div
      className={[
        "relative flex w-full items-center transition-all duration-300 max-w-2xl mx-auto",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="absolute left-3.5 flex items-center pointer-events-none text-muted-foreground">
        <Search className="w-4 h-4 transition-colors group-focus-within:text-primary" />
      </div>

      <Input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="w-full pl-10 pr-20 h-11 rounded-xl bg-card/60 backdrop-blur-md border border-border/60 text-foreground placeholder:text-muted-foreground/70 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/50"
      />

      {value && (
        <div className="absolute right-2.5 flex items-center gap-1.5">
          <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/40">
            ESC
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            onClick={() => {
              onChange("");
              ref.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}

