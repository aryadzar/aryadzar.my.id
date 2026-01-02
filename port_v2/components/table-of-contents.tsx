"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    <ul className="ml-1 space-y-1 border-l border-border/40">
      {nodes.map((node) => (
        <li key={node.id} className="relative">
          {activeId === node.id && (
            <div className="absolute -left-px top-1 h-[calc(100%-8px)] w-[2px] bg-primary z-10 rounded-full" />
          )}
          <a
            href={`#${node.id}`}
            className={cn(
              "block py-1 pl-4 pr-2 text-[13px] leading-tight transition-all duration-200 ease-in-out",
              activeId === node.id
                ? "text-primary font-medium bg-primary/5"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(node.id);
              if (!el) return;

              // update URL hash
              history.pushState(null, "", `#${node.id}`);

              el.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            {node.text}
          </a>

          {node.children.length > 0 && (
            <div className="mt-1">{renderTocTree(node.children, activeId)}</div>
          )}
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({
  contentRef,
  className,
  title = "Daftar Isi",
}: {
  contentRef: RefObject<HTMLElement | null>; // Updated type to handle null
  className?: string;
  title?: string;
}) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!contentRef || !contentRef.current) return;

    const timeout = setTimeout(() => {
      if (!contentRef.current) return;

      const headings = Array.from(
        contentRef.current.querySelectorAll<HTMLElement>(
          "h1, h2, h3, h4, h5, h6"
        )
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
          rootMargin: "-100px 0px -66% 0px",
          threshold: 0,
        }
      );

      headings.forEach((h) => observerRef.current?.observe(h));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observerRef.current?.disconnect();
    };
  }, [contentRef]);

  if (!items.length) return null;

  const tocTree = buildTocTree(items);

  return (
    <nav
      aria-label="Table of contents"
      className={cn("flex flex-col gap-4 py-2", "h-[500px] min-h-0", className)}
    >
      <div className="flex items-center gap-2 px-1">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60">
          {title}
        </h2>
      </div>

      <ScrollArea className="flex-1 min-h-0 pr-4">
        <div className="py-2">{renderTocTree(tocTree, activeId)}</div>
      </ScrollArea>
    </nav>
  );
}
