import * as THREE from "three";

export interface SceneController {
  dispose: () => void;
  setDark: (dark: boolean) => void;
}

export interface StageOptions {
  fov?: number;
  reduce: boolean;
  dark: boolean;
}

/**
 * A small render harness shared by the About page's three scenes: renderer,
 * code-built studio lighting, resize handling, pause when off-screen or the
 * tab is hidden, pointer parallax, and a single dispose().
 */
export interface Stage {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** Everything the pointer parallax moves. */
  rig: THREE.Group;
  dark: boolean;
  reduce: boolean;
  /** Smoothed pointer position over the window, -1..1. */
  px: number;
  py: number;
  /** Pointer position over this container, -1..1 (y up). */
  ptr: { x: number; y: number; inside: boolean };
  /** Called every frame with elapsed seconds. */
  tick?: (t: number) => void;
  /** Positions the camera; called after every resize. */
  place?: (camera: THREE.PerspectiveCamera, aspect: number) => void;
  /** Called on resize before place(). */
  onResize?: (aspect: number) => void;
  onPointer?: () => void;
  onLeave?: () => void;
  applyTheme?: () => void;
  frame: () => void;
  resize: () => void;
  start: () => void;
  setDark: (dark: boolean) => void;
  /** Register a cleanup that runs in dispose(). */
  onDispose: (fn: () => void) => void;
  dispose: () => void;
}

let webglSupport: boolean | undefined;

/** Probes once, on a throwaway canvas, so a missing WebGL never reaches three.js (which logs an error). */
function hasWebGL(): boolean {
  if (webglSupport === undefined) {
    try {
      const probe = document.createElement("canvas");
      const gl = (probe.getContext("webgl2") || probe.getContext("webgl")) as WebGLRenderingContext | null;
      webglSupport = !!gl;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

export function createStage(canvas: HTMLCanvasElement, container: HTMLElement, opts: StageOptions): Stage | null {
  if (!hasWebGL()) return null;
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  if (!renderer.getContext()) return null;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(opts.fov ?? 32, 1, 0.1, 120);
  const rig = new THREE.Group();
  scene.add(rig);

  /* image-based lighting from a tiny studio built in code */
  const studio = new THREE.Scene();
  studio.add(new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), new THREE.MeshBasicMaterial({ color: 0x1b1d22, side: THREE.BackSide })));
  const panel = (w: number, h: number, col: number, k: number, x: number, y: number, z: number) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(k), side: THREE.DoubleSide }),
    );
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    studio.add(m);
  };
  panel(10, 4, 0xffffff, 2.6, 0, 9, 4);
  panel(5, 8, 0xffffff, 1.6, -9, 1, 3);
  panel(4, 8, 0x00bc7d, 3.2, -8, -1, 5);
  panel(4, 8, 0x615fff, 3.2, 9, 0, -3);
  panel(8, 3, 0xffffff, 0.8, 0, -8, 5);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(studio, 0.03);
  scene.environment = envTarget.texture;
  pmrem.dispose();
  studio.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) {
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    }
  });

  scene.add(new THREE.HemisphereLight(0xffffff, 0x222634, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 0.8);
  key.position.set(3, 6, 8);
  scene.add(key);
  const lg = new THREE.PointLight(0x00bc7d, 2.2, 26);
  lg.position.set(-6, 1.5, 5);
  scene.add(lg);
  const li = new THREE.PointLight(0x615fff, 2.4, 26);
  li.position.set(6.5, -1.5, 3);
  scene.add(li);

  const cleanups: (() => void)[] = [];
  let raf = 0;
  let visible = true;
  let disposed = false;
  const t0 = performance.now();

  const stage: Stage = {
    canvas,
    container,
    renderer,
    scene,
    camera,
    rig,
    dark: opts.dark,
    reduce: opts.reduce,
    px: 0,
    py: 0,
    ptr: { x: 0, y: 0, inside: false },
    frame: () => {
      if (disposed) return;
      update(performance.now());
      renderer.render(scene, camera);
    },
    resize: () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h || disposed) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      stage.onResize?.(w / h);
      stage.place?.(camera, w / h);
      camera.updateProjectionMatrix();
      stage.frame();
    },
    start: () => {
      if (!stage.reduce && !raf && visible && !document.hidden && !disposed) raf = requestAnimationFrame(loop);
    },
    setDark: (dark: boolean) => {
      stage.dark = dark;
      stage.applyTheme?.();
      stage.frame();
    },
    onDispose: (fn) => cleanups.push(fn),
    dispose: () => {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mats = m.material ? (Array.isArray(m.material) ? m.material : [m.material]) : [];
        mats.forEach((mat) => {
          const mm = mat as THREE.Material & { map?: THREE.Texture | null };
          mm.map?.dispose();
          mat.dispose();
        });
      });
      envTarget.dispose();
      renderer.dispose();
    },
  };

  let tx = 0;
  let ty = 0;
  function update(now: number) {
    stage.px += (tx - stage.px) * 0.06;
    stage.py += (ty - stage.py) * 0.06;
    stage.tick?.((now - t0) / 1000);
  }
  function loop(now: number) {
    raf = 0;
    if (!visible || document.hidden || disposed) return;
    update(now);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  }

  const ro = new ResizeObserver(stage.resize);
  ro.observe(container);
  const io = new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    stage.start();
  });
  io.observe(container);
  const onVis = () => stage.start();
  document.addEventListener("visibilitychange", onVis);
  const onWindowMove = (e: PointerEvent) => {
    tx = (e.clientX / window.innerWidth) * 2 - 1;
    ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onWindowMove);
  const onMove = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    stage.ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    stage.ptr.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    stage.ptr.inside = true;
    stage.onPointer?.();
  };
  const onLeave = () => {
    stage.ptr.inside = false;
    stage.onLeave?.();
  };
  container.addEventListener("pointermove", onMove);
  container.addEventListener("pointerleave", onLeave);
  cleanups.push(() => {
    ro.disconnect();
    io.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    window.removeEventListener("pointermove", onWindowMove);
    container.removeEventListener("pointermove", onMove);
    container.removeEventListener("pointerleave", onLeave);
  });

  return stage;
}
