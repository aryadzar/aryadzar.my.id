import * as THREE from "three";
import { ARCH_EDGES, ARCH_NODES, type ArchNodeId } from "@/constants/architecture";
import { createStage, type SceneController } from "./core";
import { MONO, SANS, canvasTex, hexCss, plateBg, rad, slab } from "./shapes";

export interface ArchitectureOptions {
  reduce: boolean;
  dark: boolean;
  selected: ArchNodeId;
  /** Translated kind label per node, e.g. "Content", "Hosting". */
  kinds: Record<ArchNodeId, string>;
  onSelect: (id: ArchNodeId) => void;
}

export interface ArchitectureController extends SceneController {
  setSelected: (id: ArchNodeId) => void;
  setKinds: (kinds: Record<ArchNodeId, string>) => void;
}

type Mode = "landscape" | "portrait";

interface NodeView {
  group: THREE.Group;
  halo: THREE.Mesh;
  glow: number;
  scale: number;
  redraw: () => void;
}

interface EdgeView {
  from: ArchNodeId;
  to: ArchNodeId;
  curve: THREE.CubicBezierCurve3;
  tube: THREE.Mesh;
  material: THREE.MeshBasicMaterial;
  pulses: THREE.Mesh[];
  phase: number;
}

export function createArchitectureScene(canvas: HTMLCanvasElement, container: HTMLElement, opts: ArchitectureOptions): ArchitectureController | null {
  const stage = createStage(canvas, container, { fov: 30, reduce: opts.reduce, dark: opts.dark });
  if (!stage) return null;
  const { rig, camera } = stage;
  const isDark = () => stage.dark;

  let mode: Mode = "landscape";
  let fitW = 12.9;
  let fitH = 7.6;
  let camY = -0.2;
  let selected = opts.selected;
  let hover: ArchNodeId | null = null;
  let kinds = opts.kinds;
  const raycaster = new THREE.Raycaster();
  const pick: THREE.Object3D[] = [];
  const nodes = {} as Record<ArchNodeId, NodeView>;
  let edges: EdgeView[] = [];

  const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0x0d0f12, metalness: 0.4, roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.3, envMapIntensity: 0.4 });
  const accentOf = (n: (typeof ARCH_NODES)[number]) => n.color;

  ARCH_NODES.forEach((n) => {
    const group = new THREE.Group();
    const [w, h] = n.size;
    const big = n.id === "next";
    const body = slab(w, h, 0.26, 0.2, bodyMat, 0.03);
    body.userData.id = n.id;
    group.add(body);
    pick.push(body);

    const tex = canvasTex(640, Math.round((640 * h) / w), (c, cw, ch) => {
      c.textBaseline = "alphabetic";
      plateBg(c, cw, ch, Math.round(cw * 0.064));
      c.fillStyle = hexCss(accentOf(n));
      c.beginPath();
      c.arc(cw * 0.085, ch * 0.2, 10, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#a1a6ae";
      c.font = "500 " + Math.round(Math.min(ch * 0.135, cw * 0.05)) + "px " + MONO;
      c.fillText((kinds[n.id] ?? "").toUpperCase(), cw * 0.085 + 26, ch * 0.2 + 10);
      c.fillStyle = "#f5f5f5";
      c.font = "700 " + Math.round(ch * (big ? 0.27 : 0.25)) + "px " + SANS;
      c.fillText(n.name, cw * 0.06, ch * 0.62, cw * 0.88);
      c.fillStyle = "#a1a6ae";
      c.font = "400 " + Math.round(Math.min(ch * 0.14, cw * 0.056)) + "px " + MONO;
      c.fillText(n.sub, cw * 0.06, ch * 0.86, cw * 0.88);
    });
    const face = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.08, h - 0.08), new THREE.MeshBasicMaterial({ map: tex.texture, transparent: true, toneMapped: false }));
    face.position.z = 0.165;
    face.userData.id = n.id;
    group.add(face);
    pick.push(face);

    const halo = slab(
      w + 0.16,
      h + 0.16,
      0.2,
      0.26,
      new THREE.MeshBasicMaterial({ color: n.id === "next" ? 0x00d492 : n.color, transparent: true, opacity: 0, toneMapped: false, depthWrite: false }),
      0.01,
    );
    halo.position.z = -0.04;
    group.add(halo);
    rig.add(group);
    nodes[n.id] = { group, halo, glow: 0, scale: 1, redraw: tex.redraw };
  });

  const pulseGeo = new THREE.SphereGeometry(0.085, 14, 10);

  function buildEdges() {
    edges.forEach((e) => {
      rig.remove(e.tube);
      e.tube.geometry.dispose();
      e.material.dispose();
      e.pulses.forEach((p) => {
        rig.remove(p);
        (p.material as THREE.Material).dispose();
      });
    });
    edges = ARCH_EDGES.map(([from, to]) => {
      const a = nodes[from].group.position;
      const b = nodes[to].group.position;
      const z = -0.24;
      const A = new THREE.Vector3(a.x, a.y, z);
      const B = new THREE.Vector3(b.x, b.y, z);
      let c1: THREE.Vector3;
      let c2: THREE.Vector3;
      if (mode === "landscape") {
        const dx = (B.x - A.x) * 0.5;
        c1 = new THREE.Vector3(A.x + dx, A.y, z);
        c2 = new THREE.Vector3(B.x - dx, B.y, z);
      } else {
        const dy = (B.y - A.y) * 0.5;
        c1 = new THREE.Vector3(A.x, A.y + dy, z);
        c2 = new THREE.Vector3(B.x, B.y - dy, z);
      }
      const curve = new THREE.CubicBezierCurve3(A, c1, c2, B);
      const material = new THREE.MeshBasicMaterial({ color: isDark() ? 0x8b919a : 0x6b7280, transparent: true, opacity: 0.3, toneMapped: false });
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 72, 0.028, 8, false), material);
      rig.add(tube);
      const src = ARCH_NODES.find((n) => n.id === from)!;
      const col = from === "next" ? 0x00d492 : src.color;
      const pulses = [0, 1].map(() => {
        const p = new THREE.Mesh(pulseGeo, new THREE.MeshBasicMaterial({ color: col, toneMapped: false }));
        rig.add(p);
        return p;
      });
      return { from, to, curve, tube, material, pulses, phase: Math.random() };
    });
  }

  function layout(m: Mode) {
    mode = m;
    ARCH_NODES.forEach((n) => {
      const p = m === "landscape" ? n.landscape : n.portrait;
      nodes[n.id].group.position.set(p[0], p[1], n.id === "next" ? 0.12 : 0);
    });
    if (m === "landscape") {
      fitW = 12.9;
      fitH = 7.6;
      camY = -0.2;
    } else {
      fitW = 7.3;
      fitH = 10.6;
      camY = 0.75;
    }
    buildEdges();
  }
  layout("landscape");

  stage.onResize = (a) => {
    const m: Mode = a < 1.15 ? "portrait" : "landscape";
    if (m !== mode) layout(m);
  };
  stage.place = (c, a) => {
    const tanV = Math.tan(rad(c.fov / 2));
    const d = Math.max(fitH / 2 / tanV, fitW / 2 / (tanV * a));
    c.position.set(0, camY, d);
    c.lookAt(0, camY, 0);
  };
  stage.applyTheme = () => {
    stage.renderer.toneMappingExposure = stage.dark ? 1.12 : 1.0;
    edges.forEach((e) => e.material.color.setHex(stage.dark ? 0x8b919a : 0x6b7280));
  };

  const hit = (): ArchNodeId | null => {
    raycaster.setFromCamera(new THREE.Vector2(stage.ptr.x, stage.ptr.y), camera);
    rig.updateMatrixWorld(true);
    const h = raycaster.intersectObjects(pick, false)[0];
    return h ? (h.object.userData.id as ArchNodeId) : null;
  };
  stage.onPointer = () => {
    const id = hit();
    if (id !== hover) {
      hover = id;
      canvas.style.cursor = id ? "pointer" : "default";
      if (stage.reduce) stage.frame();
    }
  };
  stage.onLeave = () => {
    hover = null;
    canvas.style.cursor = "default";
    if (stage.reduce) stage.frame();
  };
  const onClick = (e: MouseEvent) => {
    const r = container.getBoundingClientRect();
    stage.ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    stage.ptr.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    const id = hit();
    if (id) opts.onSelect(id);
  };
  container.addEventListener("click", onClick);
  stage.onDispose(() => container.removeEventListener("click", onClick));

  stage.tick = (t) => {
    rig.rotation.y = stage.px * 0.2 + Math.sin(t * 0.3) * 0.05;
    rig.rotation.x = stage.py * 0.09;
    (Object.keys(nodes) as ArchNodeId[]).forEach((id) => {
      const n = nodes[id];
      const target = id === selected ? 0.95 : id === hover ? 0.5 : 0;
      const s = id === selected ? 1.035 : id === hover ? 1.02 : 1;
      n.glow += (target - n.glow) * 0.14;
      n.scale += (s - n.scale) * 0.14;
      (n.halo.material as THREE.MeshBasicMaterial).opacity = n.glow;
      n.group.scale.setScalar(n.scale);
      n.group.position.z = (id === "next" ? 0.12 : 0) + n.glow * 0.12;
    });
    edges.forEach((e) => {
      const linked = e.from === selected || e.to === selected;
      e.material.opacity += ((linked ? 0.95 : 0.3) - e.material.opacity) * 0.14;
      e.pulses.forEach((p, j) => {
        const u = ((((t * (linked ? 0.32 : 0.16) + e.phase + j * 0.5) % 1) + 1) % 1);
        p.position.copy(e.curve.getPointAt(u));
        p.position.z += 0.02;
        p.scale.setScalar(linked ? 1.25 : 0.8);
      });
    });
  };

  document.fonts?.ready.then(() => {
    (Object.keys(nodes) as ArchNodeId[]).forEach((id) => nodes[id].redraw());
    stage.frame();
  });
  stage.applyTheme();
  stage.resize();
  stage.start();

  return {
    dispose: stage.dispose,
    setDark: stage.setDark,
    setSelected: (id) => {
      selected = id;
      if (stage.reduce) stage.frame();
    },
    setKinds: (next) => {
      kinds = next;
      (Object.keys(nodes) as ArchNodeId[]).forEach((id) => nodes[id].redraw());
      stage.frame();
    },
  };
}
