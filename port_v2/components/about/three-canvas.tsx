"use client";

import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { SceneController } from "./three/core";

export interface SceneContext {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  reduce: boolean;
  dark: boolean;
}

interface ThreeCanvasProps<T extends SceneController> {
  /**
   * Builds the scene. Import the scene module inside this function so three.js
   * is only downloaded when the canvas is about to be seen. Return null when
   * WebGL is unavailable.
   */
  create: (ctx: SceneContext) => Promise<T | null>;
  /** Called with the controller once the scene exists, and with null when it is torn down. */
  onReady?: (controller: T | null) => void;
  /** Accessible description of the scene. */
  label: string;
  /** Shown instead of the canvas when WebGL is missing or the scene fails to load. */
  fallback?: ReactNode;
  className?: string;
  /** Overlays such as hints and tooltips, drawn above the canvas. */
  children?: ReactNode;
}

/**
 * Hosts one three.js scene: creates it when the container nears the viewport,
 * follows the site theme, and disposes it on unmount.
 */
export function ThreeCanvas<T extends SceneController>({
  create,
  onReady,
  label,
  fallback,
  className,
  children,
}: ThreeCanvasProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<T | null>(null);
  const [failed, setFailed] = useState(false);

  const { resolvedTheme } = useTheme();
  const reduce = useReducedMotion() ?? false;
  const dark = resolvedTheme !== "light";

  // Latest values for the one-time creation effect below.
  const latest = useRef({ create, onReady, reduce, dark });
  useEffect(() => {
    latest.current = { create, onReady, reduce, dark };
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let cancelled = false;
    let started = false;

    const start = async () => {
      if (started) return;
      started = true;
      try {
        const { create: build, reduce: r, dark: d } = latest.current;
        const controller = await build({ canvas, container, reduce: r, dark: d });
        if (cancelled) {
          controller?.dispose();
          return;
        }
        if (!controller) {
          setFailed(true);
          return;
        }
        controllerRef.current = controller;
        controller.setDark(latest.current.dark);
        latest.current.onReady?.(controller);
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          void start();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
      const controller = controllerRef.current;
      controllerRef.current = null;
      if (controller) {
        latest.current.onReady?.(null);
        controller.dispose();
      }
    };
  }, []);

  useEffect(() => {
    controllerRef.current?.setDark(dark);
  }, [dark]);

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        className={failed ? "hidden" : "absolute inset-0 block size-full touch-pan-y"}
      />
      {failed ? fallback : null}
      {children}
    </div>
  );
}
