"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type TOCItem = { id: string; text: string; level: number };

function buildTocTree(items: TOCItem[]) {
  const root: any[] = [];
  const stack: any[] = [];

  items.forEach((item) => {
    const newItem = { ...item, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(newItem);
      stack.push(newItem);
    } else {
      stack[stack.length - 1].children.push(newItem);
      stack.push(newItem);
    }
  });

  return root;
}

function renderTocTree(nodes: any[], activeId: string | null) {
  return (
    <ul className="space-y-1">
      {nodes.map((node) => (
        <li key={node.id}>
          <a
            href={`#${node.id}`}
            className={cn(
              "block rounded-md px-2 py-1.5 text-sm transition-colors",
              activeId === node.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
            )}
          >
            {node.text}
          </a>

          {node.children.length > 0 && (
            <div className="ml-4">{renderTocTree(node.children, activeId)}</div>
          )}
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({
  contentRef,
  className,
  title = "Daftar Isi", // default title in Indonesian
}: {
  contentRef: RefObject<HTMLElement>;
  className?: string;
  title?: string;
}) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!contentRef.current) return;

      const headings = Array.from(
        contentRef.current.querySelectorAll<HTMLElement>("h1, h2, h3, h4")
      );

      const mapped = headings.map((el) => {
        if (!el.id) {
          const slug = el.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          if (slug) el.id = slug;
        }

        return {
          id: el.id,
          text: el.textContent?.trim() || "Untitled",
          level: Number(el.tagName.replace("H", "")),
        };
      });

      setItems(mapped);

      // Intersection Observer
      observerRef.current?.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => {
              return (
                (a.target as HTMLElement).offsetTop -
                (b.target as HTMLElement).offsetTop
              );
            });

          if (visible[0]?.target) {
            setActiveId((visible[0].target as HTMLElement).id);
          }
        },
        {
          rootMargin: "0px 0px -60% 0px",
          threshold: 0.1,
        }
      );

      headings.forEach((h) => observerRef.current?.observe(h));
    }, 0);

    return () => {
      clearTimeout(timeout);
      observerRef.current?.disconnect();
    };
  }, [contentRef]);

  if (!items.length) {
    return (
      <aside
        aria-label="Table of contents"
        className={cn(
          "rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground",
          className
        )}
      >
        <p className="m-0">Tidak ada heading pada halaman ini.</p>
      </aside>
    );
  }
  const tocTree = buildTocTree(items);

  return (
    <aside
      aria-label="Table of contents"
      className={cn(
        "rounded-lg border border-border bg-card p-4",
        "sticky top-24 max-h-[calc(100vh-8rem)] flex flex-col", // added sticky and max-height for scrolling
        className
      )}
    >
      <p className="mb-3 text-sm font-medium text-foreground shrink-0">
        {title}
      </p>

      <ScrollArea className="flex-1 px-2 -mx-2">
        {" "}
        {/* Added ScrollArea to make it scrollable if long */}
        <nav className="pb-2">{renderTocTree(tocTree, activeId)}</nav>
      </ScrollArea>
    </aside>
  );
}
