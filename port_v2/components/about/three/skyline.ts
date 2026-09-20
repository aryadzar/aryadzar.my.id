import * as THREE from "three";
import { createStage, type SceneController } from "./core";
import { MONO, canvasTex, dustPoints, rad } from "./shapes";

export interface SkylineHover {
  index: number;
  /** Pixel position of the top of the hovered bar, relative to the container. */
  x: number;
  y: number;
}

export interface SkylineOptions {
  reduce: boolean;
  dark: boolean;
  days: number[];
  startLabel: string;
  onHover: (h: SkylineHover | null) => void;
}

export interface SkylineController extends SceneController {
  setStartLabel: (label: string) => void;
}

const PALETTE = {
  dark: [0x0f7a55, 0x00a870, 0x00d492, 0x5eeab8],
  light: [0x0a6b4b, 0x078a5f, 0x009e69, 0x00b47a],
};

export function createSkylineScene(canvas: HTMLCanvasElement, container: HTMLElement, opts: SkylineOptions): SkylineController | null {
  const stage = createStage(canvas, container, { fov: 32, reduce: opts.reduce, dark: opts.dark });
  if (!stage) return null;
  const { rig, camera } = stage;

  const days = opts.days;
  const N = days.length;
  const WEEKS = Math.max(1, Math.ceil(N / 7));
  const max = Math.max(1, ...days);
  const unit = Math.min(0.3, 2.6 / max);
  const tangent = Math.min(0.2, ((Math.PI * 2 * 2.55) / WEEKS) * 0.78);

  stage.place = (c, a) => {
    const tanV = Math.tan(rad(c.fov / 2));
    const d = Math.max(4.4 / tanV, 5.0 / (tanV * a)) * 1.12;
    const el = rad(36);
    c.position.set(0, Math.sin(el) * d, Math.cos(el) * d);
    c.lookAt(0, 0.35, 0);
  };

  const geo = new THREE.BoxGeometry(1, 1, 1);
  geo.translate(0, 0.5, 0);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0.1, envMapIntensity: 0.45 });
  const mesh = new THREE.InstancedMesh(geo, mat, N);
  rig.add(mesh);

  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const pos = new THREE.Vector3();
  const scl = new THREE.Vector3();
  const tmp = new THREE.Color();
  const zero = new THREE.Color(0x24282e);
  const heights: number[] = [];
  const bucket: number[] = [];
  for (let i = 0; i < N; i++) {
    const w = Math.floor(i / 7);
    const d = i % 7;
    const th = (w / WEEKS) * Math.PI * 2;
    const r = 2.55 + d * 0.25;
    const h = days[i] ? 0.18 + days[i] * unit : 0.035;
    pos.set(Math.sin(th) * r, 0, Math.cos(th) * r);
    e.set(0, th, 0);
    q.setFromEuler(e);
    scl.set(tangent, h, 0.2);
    m4.compose(pos, q, scl);
    mesh.setMatrixAt(i, m4);
    heights.push(h);
    bucket.push(days[i] ? Math.min(4, Math.max(1, Math.ceil((days[i] / max) * 4))) : 0);
  }
  const barHex = (i: number) => (bucket[i] ? PALETTE[stage.dark ? "dark" : "light"][bucket[i] - 1] : 0);
  const colorOf = (i: number) => (bucket[i] ? tmp.setHex(barHex(i)) : zero);
  const paint = () => {
    for (let i = 0; i < N; i++) mesh.setColorAt(i, colorOf(i));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  };
  paint();

  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.02, 8, 160), new THREE.MeshBasicMaterial({ color: 0x00d492, toneMapped: false }));
  ring1.rotation.x = Math.PI / 2;
  ring1.position.y = 0.01;
  rig.add(ring1);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.35, 0.012, 8, 200), new THREE.MeshBasicMaterial({ color: 0x7c86ff, toneMapped: false, transparent: true, opacity: 0.7 }));
  ring2.rotation.x = Math.PI / 2;
  ring2.position.y = 0.01;
  rig.add(ring2);

  const cube = new THREE.Group();
  const cg = new THREE.BoxGeometry(0.9, 0.9, 0.9);
  cube.add(new THREE.Mesh(cg, new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.06, transparent: true, opacity: 0.22, clearcoat: 1, envMapIntensity: 1.5, depthWrite: false })));
  cube.add(new THREE.LineSegments(new THREE.EdgesGeometry(cg), new THREE.LineBasicMaterial({ color: 0x00d492, transparent: true, opacity: 0.95 })));
  cube.position.y = 0.9;
  rig.add(cube);
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.18, 20, 14), new THREE.MeshBasicMaterial({ color: 0x7c86ff, toneMapped: false }));
  core.position.y = 0.9;
  rig.add(core);

  let startLabel = opts.startLabel;
  const startTex = canvasTex(512, 96, (c, cw, ch) => {
    c.font = "500 40px " + MONO;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = stage.dark ? "#d4d4d8" : "#3f3f46";
    c.fillText(startLabel, cw / 2, ch / 2, cw - 20);
  });
  const startSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: startTex.texture, transparent: true, depthWrite: false, toneMapped: false }));
  startSprite.scale.set(2.4, 0.45, 1);
  startSprite.position.set(0, 0.25, 4.95);
  rig.add(startSprite);

  const dust = dustPoints(140, [5.2, 3]);
  dust.points.position.y = 1.4;
  rig.add(dust.points);

  stage.applyTheme = () => {
    const d = stage.dark;
    zero.setHex(d ? 0x24282e : 0xc3c6cc);
    paint();
    dust.material.color.setHex(d ? 0xa3a3a3 : 0x525252);
    dust.material.opacity = d ? 0.6 : 0.5;
    stage.renderer.toneMappingExposure = d ? 1.12 : 1.0;
    startTex.redraw();
  };

  let spin = 0.3;
  let last = 0;
  let hoverId = -1;
  const raycaster = new THREE.Raycaster();
  const setHover = (id: number) => {
    if (id === hoverId) return;
    if (hoverId >= 0) mesh.setColorAt(hoverId, colorOf(hoverId));
    hoverId = id;
    if (id >= 0) mesh.setColorAt(id, tmp.setHex(stage.dark ? 0xffffff : 0x111111));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  };
  const report = () => {
    if (hoverId < 0) {
      opts.onHover(null);
      return;
    }
    mesh.getMatrixAt(hoverId, m4);
    pos.setFromMatrixPosition(m4);
    pos.y += heights[hoverId];
    mesh.localToWorld(pos);
    pos.project(camera);
    opts.onHover({ index: hoverId, x: (pos.x * 0.5 + 0.5) * container.clientWidth, y: (-pos.y * 0.5 + 0.5) * container.clientHeight });
  };

  stage.onPointer = () => {
    if (stage.reduce) stage.frame();
  };
  stage.onLeave = () => {
    setHover(-1);
    report();
    if (stage.reduce) stage.frame();
  };
  stage.tick = (t) => {
    const dt = Math.min(0.1, t - last);
    last = t;
    if (!stage.ptr.inside && !stage.reduce) spin += dt * 0.09;
    rig.rotation.y = spin;
    rig.rotation.x = stage.py * 0.05;
    cube.rotation.y = t * 0.5;
    cube.rotation.x = t * 0.3;
    cube.position.y = 0.9 + Math.sin(t * 0.8) * 0.08;
    core.position.y = cube.position.y;
    if (stage.ptr.inside) {
      raycaster.setFromCamera(new THREE.Vector2(stage.ptr.x, stage.ptr.y), camera);
      rig.updateMatrixWorld(true);
      const h = raycaster.intersectObject(mesh, false)[0];
      setHover(h && h.instanceId != null ? h.instanceId : -1);
    }
    report();
  };

  document.fonts?.ready.then(() => {
    startTex.redraw();
    stage.frame();
  });
  stage.applyTheme();
  stage.resize();
  stage.start();

  return {
    dispose: () => {
      opts.onHover(null);
      stage.dispose();
    },
    setDark: stage.setDark,
    setStartLabel: (label) => {
      startLabel = label;
      startTex.redraw();
      stage.frame();
    },
  };
}
