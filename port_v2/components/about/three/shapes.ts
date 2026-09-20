import * as THREE from "three";

export const SANS = 'ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif';
export const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

export function hexCss(h: number): string {
  return "#" + ("000000" + h.toString(16)).slice(-6);
}

export function roundedRect(w: number, h: number, r: number): THREE.Shape {
  const x = -w / 2;
  const y = -h / 2;
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

/** A rounded slab of depth `d`, centred on the origin. */
export function slab(w: number, h: number, d: number, r: number, mat: THREE.Material, bevel = 0.03): THREE.Mesh {
  const g = new THREE.ExtrudeGeometry(roundedRect(w, h, r), {
    depth: d,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 14,
  });
  g.translate(0, 0, -d / 2);
  return new THREE.Mesh(g, mat);
}

export function rrPath(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

/** Opaque dark rounded background so plate text never depends on the lighting. */
export function plateBg(c: CanvasRenderingContext2D, cw: number, ch: number, rpx: number): void {
  c.fillStyle = "#0d0f12";
  rrPath(c, 0, 0, cw, ch, rpx);
  c.fill();
  c.strokeStyle = "rgba(255,255,255,.09)";
  c.lineWidth = 3;
  rrPath(c, 2, 2, cw - 4, ch - 4, rpx - 2);
  c.stroke();
}

export interface CanvasTex {
  texture: THREE.CanvasTexture;
  redraw: () => void;
}

/** A canvas-backed texture whose drawing can be re-run (fonts loaded, text changed). */
export function canvasTex(
  cw: number,
  ch: number,
  draw: (g: CanvasRenderingContext2D, cw: number, ch: number) => void,
): CanvasTex {
  const c = document.createElement("canvas");
  c.width = cw;
  c.height = ch;
  const texture = new THREE.CanvasTexture(c);
  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = 8;
  const redraw = () => {
    const g = c.getContext("2d");
    if (!g) return;
    g.clearRect(0, 0, cw, ch);
    draw(g, cw, ch);
    texture.needsUpdate = true;
  };
  redraw();
  return { texture, redraw };
}

export function dustPoints(n: number, spread: [number, number]): { points: THREE.Points; material: THREE.PointsMaterial } {
  const pos = new Float32Array(n * 3);
  for (let p = 0; p < n; p++) {
    const r = spread[0] + Math.random() * spread[1];
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    pos[p * 3] = r * Math.sin(ph) * Math.cos(th);
    pos[p * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
    pos[p * 3 + 2] = r * Math.cos(ph) * 0.7 - 1;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const material = new THREE.PointsMaterial({ size: 0.055, color: 0xa3a3a3, transparent: true, opacity: 0.7, sizeAttenuation: true, depthWrite: false });
  return { points: new THREE.Points(g, material), material };
}

/**
 * Builds a THREE.Shape from an SVG path made of absolute M, L, H, V, C, Z
 * commands (the site's monogram uses only these). y is flipped.
 */
export function svgShape(d: string, k: number, cx: number, cy: number): THREE.Shape {
  const t = d.match(/[MLHVCZ]|-?\d*\.?\d+/g) ?? [];
  const s = new THREE.Shape();
  const X = (v: number) => (v - cx) * k;
  const Y = (v: number) => -(v - cy) * k;
  let i = 0;
  let x = 0;
  let y = 0;
  let cmd = "";
  const num = () => parseFloat(t[i++]);
  while (i < t.length) {
    if (/^[MLHVCZ]$/.test(t[i])) {
      cmd = t[i++];
      if (cmd === "Z") continue;
    }
    if (cmd === "M") {
      x = num();
      y = num();
      s.moveTo(X(x), Y(y));
      cmd = "L";
    } else if (cmd === "L") {
      x = num();
      y = num();
      s.lineTo(X(x), Y(y));
    } else if (cmd === "H") {
      x = num();
      s.lineTo(X(x), Y(y));
    } else if (cmd === "V") {
      y = num();
      s.lineTo(X(x), Y(y));
    } else if (cmd === "C") {
      const q = [num(), num(), num(), num(), num(), num()];
      s.bezierCurveTo(X(q[0]), Y(q[1]), X(q[2]), Y(q[3]), X(q[4]), Y(q[5]));
      x = q[4];
      y = q[5];
    } else break;
  }
  return s;
}

export const rad = (d: number) => (d * Math.PI) / 180;
