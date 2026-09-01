"use client";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";
import Image from "next/image";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemType {
  name: string;
  link?: string;
  children?: { name: string; link: string }[];
}

interface NavItemsProps {
  items: NavItemType[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible },
          )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px) saturate(180%)" : "none",
        boxShadow: visible
          ? "0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.06) inset"
          : "none",
        width: visible ? "55%" : "100%",
        y: visible ? 16 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 40,
      }}
      style={{
        minWidth: "780px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-2xl bg-transparent px-5 py-2.5 lg:flex dark:bg-transparent",
        visible &&
        "bg-white/70 dark:bg-neutral-950/75 border border-white/10 dark:border-white/[0.07]",
        className,
      )}
    >
      {/* Subtle glow line on top when visible */}
      {visible && (
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent dark:via-indigo-500/50" />
      )}
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => {
        setHovered(null);
        setDropdownOpen(null);
      }}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isHovered = hovered === idx;
        const isDropdownOpen = dropdownOpen === idx;

        return (
          <div
            key={`link-${idx}`}
            className="relative"
            onMouseEnter={() => {
              setHovered(idx);
              if (item.children) setDropdownOpen(idx);
            }}
            onMouseLeave={() => {
              if (item.children) setDropdownOpen(null);
            }}
          >
            {item.children ? (
              <button className="group relative px-4 py-2 text-neutral-600 transition-colors duration-150 dark:text-neutral-300 flex items-center gap-1">
                {isHovered && (
                  <motion.div
                    layoutId="hovered"
                    className="absolute inset-0 h-full w-full rounded-xl bg-neutral-100 dark:bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-20 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-150">
                  {item.name}
                </span>
                <svg className="w-3 h-3 relative z-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
              <Link
                onClick={onItemClick}
                className="group relative px-4 py-2 text-neutral-600 transition-colors duration-150 dark:text-neutral-300 block"
                href={item.link!}
              >
                {isHovered && (
                  <motion.div
                    layoutId="hovered"
                    className="absolute inset-0 h-full w-full rounded-xl bg-neutral-100 dark:bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-20 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-150">
                  {item.name}
                </span>
              </Link>
            )}

            {item.children && (
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                  >
                    <div className="flex flex-col gap-1 rounded-xl bg-white/90 p-2 shadow-xl border border-neutral-100 dark:bg-neutral-950/90 dark:border-white/[0.07] backdrop-blur-xl min-w-[140px]">
                      {item.children.map((child, cIdx) => (
                        <Link
                          key={cIdx}
                          href={child.link}
                          onClick={() => {
                            setDropdownOpen(null);
                            if (onItemClick) onItemClick();
                          }}
                          className="px-4 py-2 rounded-lg text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.07] hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px) saturate(180%)" : "none",
        boxShadow: visible
          ? "0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.18)"
          : "none",
        width: visible ? "92%" : "100%",
        paddingRight: visible ? "14px" : "0px",
        paddingLeft: visible ? "14px" : "0px",
        borderRadius: visible ? "16px" : "0px",
        y: visible ? 16 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 40,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible &&
        "bg-white/70 dark:bg-neutral-950/75 border border-white/10 dark:border-white/[0.07]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className={cn(
            "absolute inset-x-0 top-[3.75rem] z-50 overflow-visible",
            className,
          )}
        >
          <div className="relative flex flex-col items-start gap-3 rounded-2xl bg-white/90 px-5 py-6 shadow-xl border border-neutral-100 dark:bg-neutral-950/90 dark:border-white/[0.07] backdrop-blur-xl">
            {/* Top accent line */}
            <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent dark:via-indigo-500/40" />
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center w-8 h-8 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.08] transition-colors duration-150"
      aria-label="Toggle menu"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <X size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Menu size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="group relative z-20 flex items-center gap-2.5 px-1 py-1 mr-4"
    >
      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg shadow-md shadow-indigo-500/20 transition-shadow duration-300 group-hover:shadow-indigo-500/50">
        <Image
          src="/logo-2.png"
          alt="logo"
          width={32}
          height={32}
          className="h-full w-full object-cover"
        />
      </div>
      <span className="text-sm font-semibold text-neutral-800 dark:text-white tracking-tight">
        Arya<span className="text-indigo-500">.</span>
      </span>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
  )) => {
  const baseStyles =
    "relative inline-flex items-center justify-center rounded-xl text-sm font-medium cursor-pointer select-none transition-all duration-200 active:scale-[0.97]";

  const variantStyles = {
    primary:
      "bg-white text-neutral-800 border border-neutral-200/80 shadow-sm hover:bg-neutral-50 hover:shadow-md hover:-translate-y-px dark:bg-neutral-800 dark:text-neutral-100 dark:border-white/10 dark:hover:bg-neutral-700",
    secondary:
      "bg-transparent text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
    dark: "bg-neutral-900 text-white border border-white/10 shadow-sm hover:bg-neutral-800 hover:shadow-md hover:-translate-y-px dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
    gradient:
      "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-px dark:shadow-indigo-500/20",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
