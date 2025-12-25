"use client"

import { Button } from "@/components/ui/button"

type Props = {
  total: number
  page: number
  perPage: number
  onPageChange: (p: number) => void
  className?: string
}

export function Pagination({ total, page, perPage, onPageChange, className }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  if (totalPages <= 1) return null

  const go = (p: number) => {
    if (p < 1 || p > totalPages) return
    onPageChange(p)
    // optional: scroll to top of list
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // simple windowed page numbers
  const windowSize = 3
  const start = Math.max(1, page - windowSize)
  const end = Math.min(totalPages, page + windowSize)
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={["flex items-center justify-center gap-2", className].filter(Boolean).join(" ")}
    >
      <Button
        type="button"
        variant="outline"
        className="border-border bg-transparent"
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        Prev
      </Button>

      {start > 1 ? (
        <>
          <Button
            type="button"
            variant={page === 1 ? "default" : "outline"}
            className={page === 1 ? "bg-primary text-primary-foreground" : "border-border"}
            onClick={() => go(1)}
            aria-current={page === 1 ? "page" : undefined}
          >
            1
          </Button>
          <span className="px-2 text-muted-foreground">…</span>
        </>
      ) : null}

      {pages.map((p) => (
        <Button
          key={p}
          type="button"
          variant={page === p ? "default" : "outline"}
          className={page === p ? "bg-primary text-primary-foreground" : "border-border"}
          onClick={() => go(p)}
          aria-current={page === p ? "page" : undefined}
        >
          {p}
        </Button>
      ))}

      {end < totalPages ? (
        <>
          <span className="px-2 text-muted-foreground">…</span>
          <Button
            type="button"
            variant={page === totalPages ? "default" : "outline"}
            className={page === totalPages ? "bg-primary text-primary-foreground" : "border-border"}
            onClick={() => go(totalPages)}
            aria-current={page === totalPages ? "page" : undefined}
          >
            {totalPages}
          </Button>
        </>
      ) : null}

      <Button
        type="button"
        variant="outline"
        className="border-border bg-transparent"
        onClick={() => go(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        Next
      </Button>
    </nav>
  )
}
