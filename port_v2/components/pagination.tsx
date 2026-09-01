"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  total: number;
  page: number;
  perPage: number;
  onPageChange: (p: number) => void;
  className?: string;
};

export function Pagination({
  total,
  page,
  perPage,
  onPageChange,
  className,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  if (totalPages <= 1) return null;

  const go = (p: number) => {
    if (p < 1 || p > totalPages) return;
    onPageChange(p);
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const windowSize = 2;
  const start = Math.max(1, page - windowSize);
  const end = Math.min(totalPages, page + windowSize);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={[
        "inline-flex items-center justify-center p-1.5 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-lg mx-auto gap-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-9 px-3 rounded-xl gap-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 disabled:opacity-40"
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Prev</span>
      </Button>

      {start > 1 ? (
        <>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={`h-9 w-9 p-0 rounded-xl text-xs font-medium transition-all ${
              page === 1
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
            onClick={() => go(1)}
            aria-current={page === 1 ? "page" : undefined}
          >
            1
          </Button>
          {start > 2 && (
            <span className="px-1 text-xs text-muted-foreground/60 select-none">
              •••
            </span>
          )}
        </>
      ) : null}

      {pages.map((p) => (
        <Button
          key={p}
          type="button"
          variant="ghost"
          size="sm"
          className={`h-9 w-9 p-0 rounded-xl text-xs font-semibold transition-all ${
            page === p
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          }`}
          onClick={() => go(p)}
          aria-current={page === p ? "page" : undefined}
        >
          {p}
        </Button>
      ))}

      {end < totalPages ? (
        <>
          {end < totalPages - 1 && (
            <span className="px-1 text-xs text-muted-foreground/60 select-none">
              •••
            </span>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={`h-9 w-9 p-0 rounded-xl text-xs font-medium transition-all ${
              page === totalPages
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
            onClick={() => go(totalPages)}
            aria-current={page === totalPages ? "page" : undefined}
          >
            {totalPages}
          </Button>
        </>
      ) : null}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-9 px-3 rounded-xl gap-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 disabled:opacity-40"
        onClick={() => go(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </Button>
    </nav>
  );
}

