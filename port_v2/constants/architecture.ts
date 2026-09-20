// Topology of the "This site, taken apart" diagram on the About page.
// Positions, colors and edges are tied to the 3D scene, so they live in code.
// The visible text (kind, description) lives in messages/*.json under
// aboutPage.architecture.nodes.<id>.

export type ArchNodeId =
  | "sanity"
  | "spotify"
  | "next"
  | "browser"
  | "vercel"
  | "sentry";

export interface ArchNode {
  id: ArchNodeId;
  name: string; // product name, not translated
  sub: string; // short mono caption, not translated
  color: number; // accent used for the dot, halo and data pulses
  /** [x, y] when the diagram is wide (landscape) and when it is narrow (portrait). */
  landscape: [number, number];
  portrait: [number, number];
  size: [number, number]; // plate width, height
}

const SMALL: [number, number] = [2.9, 1.35];

export const ARCH_NODES: ArchNode[] = [
  { id: "sanity", name: "Sanity CMS", sub: "GROQ · live preview", color: 0x00bc7d, landscape: [-4.7, 1.55], portrait: [-1.8, 5.0], size: SMALL },
  { id: "spotify", name: "Spotify API", sub: "now-playing route", color: 0x00bc7d, landscape: [-4.7, -1.65], portrait: [1.8, 5.0], size: SMALL },
  { id: "next", name: "Next.js 16", sub: "App Router · SSR · i18n", color: 0x00d492, landscape: [-0.2, 0], portrait: [0, 2.1], size: [3.6, 1.8] },
  { id: "browser", name: "Browser", sub: "client components", color: 0x7c86ff, landscape: [4.6, 1.55], portrait: [-1.8, -1.0], size: SMALL },
  { id: "vercel", name: "Vercel", sub: "hosting · analytics", color: 0x7c86ff, landscape: [-0.2, -3.0], portrait: [1.8, -1.0], size: SMALL },
  { id: "sentry", name: "Sentry", sub: "error tracking", color: 0x7c86ff, landscape: [4.6, -1.65], portrait: [0, -3.5], size: SMALL },
];

/** [from, to]: the direction data flows in. */
export const ARCH_EDGES: [ArchNodeId, ArchNodeId][] = [
  ["sanity", "next"],
  ["spotify", "next"],
  ["next", "browser"],
  ["next", "vercel"],
  ["browser", "sentry"],
  ["next", "sentry"],
];

/** Document types an editor can change in Studio (sanity/schemaTypes, without the two embedded object types). */
export const CONTENT_TYPES = 10;
