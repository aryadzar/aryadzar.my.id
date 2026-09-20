import * as THREE from "three";
import { createStage, type SceneController } from "./core";
import { LOGO_PATHS } from "@/constants/logo";
import { SANS, canvasTex, dustPoints, hexCss, plateBg, rad, slab, svgShape } from "./shapes";

const ACCENTS = [0x00d492, 0x7c86ff];

export interface IdentityOptions {
  reduce: boolean;
  dark: boolean;
  /** Names on the plaques that orbit the monogram (about six fit well). */
  plaques: string[];
}

export function createIdentityScene(canvas: HTMLCanvasElement, container: HTMLElement, opts: IdentityOptions): SceneController | null {
  const stage = createStage(canvas, container, { fov: 30, reduce: opts.reduce, dark: opts.dark });
  if (!stage) return null;
  const { rig, camera } = stage;

  stage.place = (c, a) => {
    const tanV = Math.tan(rad(c.fov / 2));
    const fw = 7.9;
    const fh = 5.8;
    const d = Math.max(fh / 2 / tanV, fw / 2 / (tanV * a));
    c.position.set(0.1, 3.3 + d * 0.06, d);
    c.lookAt(0, 0.7, 0);
  };

  /* pedestal */
  const podMat = new THREE.MeshPhysicalMaterial({ color: 0x101317, metalness: 0.6, roughness: 0.42, clearcoat: 0.4, clearcoatRoughness: 0.35, envMapIntensity: 0.55 });
  const pod = new THREE.Group();
  pod.position.y = -1.3;
  rig.add(pod);
  ([[2.7, 0], [2.2, 0.12]] as const).forEach(([r, y]) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r + 0.06, 0.12, 72), podMat);
    m.position.y = y;
    pod.add(m);
  });
  const podRing = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.02, 8, 160), new THREE.MeshBasicMaterial({ color: 0x00d492, toneMapped: false }));
  podRing.rotation.x = Math.PI / 2;
  podRing.position.y = 0.19;
  pod.add(podRing);
  const podRing2 = new THREE.Mesh(new THREE.TorusGeometry(2.78, 0.012, 8, 160), new THREE.MeshBasicMaterial({ color: 0x7c86ff, toneMapped: false, transparent: true, opacity: 0.7 }));
  podRing2.rotation.x = Math.PI / 2;
  podRing2.position.y = 0.07;
  pod.add(podRing2);

  /* badge: dark slab carrying the extruded monogram */
  const badge = new THREE.Group();
  badge.position.y = 1.55;
  badge.scale.setScalar(1.1);
  rig.add(badge);
  const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0x0b0d10, metalness: 0.3, roughness: 0.55, clearcoat: 0.12, clearcoatRoughness: 0.4, envMapIntensity: 0.16 });
  badge.add(slab(3.3, 2.2, 0.3, 0.34, bodyMat));
  const k = 2.35 / 148.7;
  const logoMat = new THREE.MeshPhysicalMaterial({ color: 0xf3f4f6, metalness: 0.25, roughness: 0.34, emissive: 0x9aa0aa, emissiveIntensity: 0.22, clearcoat: 0.4, envMapIntensity: 0.8 });
  const shapes = LOGO_PATHS.map((d) => svgShape(d, k, 88.3, 90.2));
  const logo = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shapes, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3, curveSegments: 14 }),
    logoMat,
  );
  logo.position.z = 0.19;
  badge.add(logo);
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 0.02), new THREE.MeshBasicMaterial({ color: 0x00d492, toneMapped: false, transparent: true, opacity: 0.9 }));
  glow.position.set(0, -0.96, 0.19);
  badge.add(glow);

  /* orbiting name plaques */
  const plateMat = new THREE.MeshPhysicalMaterial({ color: 0x0d0f12, metalness: 0.4, roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.3, envMapIntensity: 0.4 });
  const redraws: (() => void)[] = [];
  const names = opts.plaques.length > 0 ? opts.plaques : ["Next.js", "Node.js", "Go", "PostgreSQL", "Docker", "Kubernetes"];
  const plaques = names.map((name, i) => {
    const g = new THREE.Group();
    const w = 1.5;
    const h = 0.54;
    g.add(slab(w, h, 0.12, 0.18, plateMat, 0.02));
    const accent = ACCENTS[i % ACCENTS.length];
    const tex = canvasTex(512, 184, (c, cw, ch) => {
      plateBg(c, cw, ch, 46);
      c.fillStyle = hexCss(accent);
      c.beginPath();
      c.arc(56, ch / 2, 13, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#f5f5f5";
      c.font = "600 62px " + SANS;
      c.textBaseline = "middle";
      c.fillText(name, 90, ch / 2 + 3, cw - 110);
    });
    redraws.push(tex.redraw);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.06, h - 0.06), new THREE.MeshBasicMaterial({ map: tex.texture, transparent: true, toneMapped: false }));
    face.position.z = 0.09;
    g.add(face);
    rig.add(g);
    return { g, a: (i / names.length) * Math.PI * 2 };
  });
  const orbitG = new THREE.Group();
  orbitG.position.y = -0.35;
  orbitG.scale.set(1, 1, 0.62);
  const orbit = new THREE.Mesh(new THREE.TorusGeometry(3.05, 0.011, 8, 240), new THREE.MeshBasicMaterial({ color: 0x00d492, transparent: true, opacity: 0.55, toneMapped: false }));
  orbit.rotation.x = Math.PI / 2;
  orbitG.add(orbit);
  rig.add(orbitG);

  const dust = dustPoints(200, [4.2, 3.4]);
  rig.add(dust.points);

  stage.applyTheme = () => {
    const d = stage.dark;
    dust.material.color.setHex(d ? 0xa3a3a3 : 0x525252);
    dust.material.opacity = d ? 0.7 : 0.55;
    stage.renderer.toneMappingExposure = d ? 1.12 : 1.0;
  };
  stage.tick = (t) => {
    rig.rotation.y = stage.px * 0.3 + Math.sin(t * 0.3) * 0.08;
    rig.rotation.x = stage.py * 0.1;
    badge.position.y = 1.55 + Math.sin(t * 0.9) * 0.06;
    badge.rotation.y = Math.sin(t * 0.5) * 0.22;
    rig.updateMatrixWorld(true);
    plaques.forEach((p) => {
      const a = p.a + t * 0.16;
      p.g.position.set(Math.cos(a) * 3.05, -0.35 + Math.sin(a * 2 + p.a) * 0.06, Math.sin(a) * 3.05 * 0.62);
      p.g.lookAt(camera.position);
    });
  };

  document.fonts?.ready.then(() => {
    redraws.forEach((f) => f());
    stage.frame();
  });
  stage.applyTheme();
  stage.resize();
  stage.start();

  return { dispose: stage.dispose, setDark: stage.setDark };
}
