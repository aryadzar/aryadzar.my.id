"use client";

import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A masonry board where a click opens the photo with a shared-layout
 * animation: the card grows out of its slot into a centred view and shrinks
 * back on close. Inspired by Aceternity UI's Layout Grid, but the opened photo
 * is fixed to the viewport (so it is centred wherever you scrolled to), keeps
 * its own aspect ratio, and can be closed or stepped through by keyboard.
 */

export interface LayoutGridCard {
  id: string;
  thumbnail: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
  /** Shown under the photo in the grid. */
  caption?: ReactNode;
  /** Shown over the photo once it is opened. */
  content?: ReactNode;
  /** Value for `data-sanity`, so Sanity's Presentation tool can open the photo's image field. */
  dataSanity?: string;
}

interface LayoutGridProps {
  cards: LayoutGridCard[];
  labels: { close: string; previous: string; next: string };
  className?: string;
}

/** Grid cells snap to one of three ratios so the board reads as a tidy collage. */
function cellRatio(card: LayoutGridCard): number {
  const r = card.width / card.height;
  if (r > 1.15) return 4 / 3;
  if (r < 0.87) return 3 / 4;
  return 1;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function LayoutGrid({ cards, labels, className }: LayoutGridProps) {
  const groupId = useId();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  /** The card that was opened from the grid; only it shares layout with its slot. */
  const [sharedId, setSharedId] = useState<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const index = selectedId ? cards.findIndex((c) => c.id === selectedId) : -1;
  const selected = index >= 0 ? cards[index] : null;

  const open = (card: LayoutGridCard, trigger: HTMLElement) => {
    opener.current = trigger;
    setSharedId(card.id);
    setSelectedId(card.id);
  };

  const close = useCallback(() => setSelectedId(null), []);

  const go = useCallback(
    (delta: number) => {
      if (index < 0 || cards.length < 2) return;
      const next = cards[(index + delta + cards.length) % cards.length];
      setSharedId(null);
      setSelectedId(next.id);
    },
    [cards, index],
  );

  // While open: lock page scroll and move focus into the dialog.
  const isOpen = selected !== null;
  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const wasLocked = body.classList.contains("overflow-hidden");
    body.classList.add("overflow-hidden");
    closeRef.current?.focus();
    const trigger = opener.current;
    return () => {
      if (!wasLocked) body.classList.remove("overflow-hidden");
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      close();
    } else if (e.key === "ArrowLeft") {
      go(-1);
    } else if (e.key === "ArrowRight") {
      go(1);
    } else if (e.key === "Tab") {
      // Keep focus inside the dialog.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const layoutId = (id: string) => `layout-grid-${groupId}-${id}`;

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id={groupId}>
        <div className={cn("columns-2 gap-3 md:columns-3 md:gap-4 lg:gap-5", className)}>
          {cards.map((card, i) => {
            const ratio = cellRatio(card);
            const lifted = sharedId === card.id && selectedId === card.id;
            return (
              <motion.div
                key={card.id}
                className="mb-3 break-inside-avoid md:mb-4 lg:mb-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.07 }}
              >
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(e) => open(card, e.currentTarget)}
                  className="group block w-full cursor-zoom-in rounded-xl text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <div className="relative w-full" style={{ aspectRatio: ratio }}>
                    {lifted ? null : (
                      <motion.div
                        layoutId={layoutId(card.id)}
                        className="absolute inset-0 overflow-hidden rounded-xl bg-muted shadow-sm ring-1 ring-border/60"
                        style={{ borderRadius: 12 }}
                        data-sanity={card.dataSanity}
                      >
                        <Image
                          src={card.thumbnail}
                          alt={card.alt}
                          fill
                          sizes="(min-width: 768px) 33vw, 50vw"
                          placeholder={card.blurDataURL ? "blur" : "empty"}
                          blurDataURL={card.blurDataURL}
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                      </motion.div>
                    )}
                  </div>
                  {card.caption ? <div className="mt-2 px-0.5">{card.caption}</div> : null}
                </button>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {selected ? (
            <motion.div
              key="layout-grid-dialog"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={selected.alt}
              onKeyDown={onKeyDown}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div aria-hidden="true" onClick={close} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

              <motion.figure
                key={selected.id}
                layoutId={sharedId === selected.id ? layoutId(selected.id) : undefined}
                initial={sharedId === selected.id ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="relative m-0 overflow-hidden bg-muted shadow-2xl ring-1 ring-white/10"
                data-sanity={selected.dataSanity}
                style={{
                  aspectRatio: selected.width / selected.height,
                  width: `min(92vw, calc(82vh * ${selected.width / selected.height}))`,
                  borderRadius: 16,
                }}
              >
                <Image
                  src={selected.thumbnail}
                  alt={selected.alt}
                  fill
                  priority
                  sizes="92vw"
                  placeholder={selected.blurDataURL ? "blur" : "empty"}
                  blurDataURL={selected.blurDataURL}
                  className="object-cover"
                />
                {selected.content ? (
                  <motion.figcaption
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.2, ease: EASE }}
                    className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent px-5 pt-16 pb-4 text-white md:px-7 md:pb-5"
                  >
                    {selected.content}
                  </motion.figcaption>
                ) : null}
              </motion.figure>

              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={labels.close}
                className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none md:top-6 md:right-6"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
              {cards.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label={labels.previous}
                    className="absolute top-1/2 left-3 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none md:left-6"
                  >
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label={labels.next}
                    className="absolute top-1/2 right-3 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none md:right-6"
                  >
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </button>
                </>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </LayoutGroup>
    </MotionConfig>
  );
}
