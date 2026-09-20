"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-in entrance for the About page: fade + rise, played once when the
 * element enters the viewport. Reduced-motion users get the fade only, with no
 * travel and no delay.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -80px 0px" } as const;

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  dl: motion.dl,
  p: motion.p,
} as const;

type Tag = keyof typeof TAGS;

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Seconds to wait before playing. */
  delay?: number;
  /** Pixels to travel upward while fading in. */
  y?: number;
}

export function Reveal({ children, className, as = "div", delay = 0, y = 24 }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = TAGS[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? 0.01 : 0.7, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

interface GroupProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Seconds between one child and the next. */
  stagger?: number;
  delay?: number;
}

/** Wraps a set of <RevealItem>s so they play one after another. */
export function RevealGroup({ children, className, as = "div", stagger = 0.09, delay = 0 }: GroupProps) {
  const reduce = useReducedMotion();
  const Component = TAGS[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delay } },
  };
  return (
    <Component className={className} variants={variants} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {children}
    </Component>
  );
}

interface ItemProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  y?: number;
}

export function RevealItem({ children, className, as = "div", y = 20 }: ItemProps) {
  const reduce = useReducedMotion();
  const Component = TAGS[as];
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.01 : 0.6, ease: EASE } },
  };
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
