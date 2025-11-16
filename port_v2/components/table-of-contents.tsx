"use client"

import { useEffect, useRef, useState } from "react"
import type { RefObject } from "react"
import { cn } from "@/lib/utils"

type TOCItem = { id: string; text: string; level: number }

export function TableOfContents({
  contentRef,
  className,
  title = "On this page",
}: {
  contentRef: RefObject<HTMLElement>
  className?: string
  title?: string
}) {
  const [items, setItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const headings = Array.from(contentRef.current.querySelectorAll<HTMLElement>("h2, h3"))
    const mapped = headings.map((el) => {
      // ensure id
      if (!el.id) {
        const slug = el.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
        if (slug) el.id = slug
      }
      return {
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      }
    })
    setItems(mapped)

    // observe visibility
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop)
        if (visible[0]?.target) {
          setActiveId((visible[0].target as HTMLElement).id)
        }
      },
      {
        // Trigger a bit before reaching the top
        rootMargin: "0px 0px -70% 0px",
        threshold: [0, 1],
      },
    )
    headings.forEach((h) => observerRef.current?.observe(h))

    return () => observerRef.current?.disconnect()
  }, [contentRef])

  if (!items.length) {
    return (
      <aside
        aria-label="Table of contents"
        className={cn("rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground", className)}
      >
        <p className="m-0">Tidak ada heading pada halaman ini.</p>
      </aside>
    )
  }

  return (
    <aside
      aria-label="Table of contents"
      className={cn("rounded-lg border border-border bg-card p-4", "sticky top-24 h-max", className)}
    >
      <p className="mb-3 text-sm font-medium text-foreground">{title}</p>
      <nav className="space-y-2">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={cn(
              "block rounded-md px-2 py-1.5 text-sm transition-colors",
              it.level === 3 && "ml-3",
              activeId === it.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
            )}
          >
            {it.text}
          </a>
        ))}
      </nav>
    </aside>
  )
}
