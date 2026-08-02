import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import beautySheetUrl from "../../work/r07_character_depth/fram-r07-character-direction.png?url";
import r08BaselineUrl from "../../work/r08_character_art/r08-unified-05-1280x720.png?url";
import r05BaselineUrl from "./assets/fram-r05-baseline.png?url";
import {
  createF01Character,
  type ForgeMotion,
  type ForgeView,
} from "./F01Character";
import "./styles.css";

const buildSheetUrl = `${import.meta.env.BASE_URL}forge/f01-build-sheet.jpg`;

interface ReferenceItem {
  readonly id: "build" | "beauty" | "r05" | "r08";
  readonly label: string;
  readonly eyebrow: string;
  readonly detail: string;
  readonly url: string;
}

const REFERENCES: readonly ReferenceItem[] = [
  {
    id: "build",
    label: "Build Sheet",
    eyebrow: "GEOMETRY INPUT",
    detail: "同一人物を正面・左右・背面と部位別に整理した制作図。3D正本は、この原画から開発時に生成した検証済みデータで起動します。",
    url: buildSheetUrl,
  },
  {
    id: "beauty",
    label: "Beauty Sheet",
    eyebrow: "IDENTITY TARGET",
    detail: "可愛さ、顔、髪、衣装、SF素材感のNorth Star。制作シートより優先する人物同一性の基準です。",
    url: beautySheetUrl,
  },
  {
    id: "r05",
    label: "R05",
    eyebrow: "PREVIOUS BASELINE",
    detail: "旧アバター基盤。外部3Dからボクセル化したが、主人公の固有造形と顔の再現が弱い比較対象です。",
    url: r05BaselineUrl,
  },
  {
    id: "r08",
    label: "R08",
    eyebrow: "LATEST HAND-AUTHORED",
    detail: "コードで意味セルを増築した比較対象。情報量は増えたが、シートを立体正本へ変換する工程ではありません。",
    url: r08BaselineUrl,
  },
] as const;

function button(label: string, value: string, group: string, active = false): string {
  return `<button type="button" class="forge-segment${active ? " is-active" : ""}" data-${group}="${value}" aria-pressed="${active}">${label}</button>`;
}

function referenceTabs(): string {
  return REFERENCES.map(
    (reference, index) =>
      `<button type="button" class="forge-reference-tab${index === 0 ? " is-active" : ""}" data-reference="${reference.id}" aria-pressed="${index === 0}">${reference.label}</button>`,
  ).join("");
}

function layout(): string {
  return `
    <div class="forge-shell">
      <header class="forge-header">
        <a class="forge-brand" href="../../" aria-label="F.R.A.M. prototype catalog">
          <span class="forge-mark" aria-hidden="true"></span>
          <span><strong>F.R.A.M.</strong><small>FRONTIER RELICS ARCHIVE MODULE</small></span>
        </a>
        <div class="forge-title">
          <span>CHARACTER FORGE</span>
          <strong>F-01 / THE ARCHIVIST</strong>
        </div>
        <div class="forge-build-state"><span></span>REPRODUCIBLE RECONSTRUCTION</div>
      </header>

      <main class="forge-workspace">
        <section class="forge-stage" aria-label="F-01 real-time 3D preview">
          <div class="forge-loading" data-loading>
            <span class="forge-loader"></span>
            <strong>LOADING F-01</strong>
            <small>検証済みの立体セルとrigを展開しています</small>
          </div>
          <div class="forge-stage-meta">
            <span class="forge-live"><i></i>REAL-TIME 3D</span>
            <span>DRAG TO ORBIT · WHEEL TO ZOOM</span>
          </div>
          <div class="forge-character-tag">
            <small>CANONICAL ACTOR</small>
            <strong>THE ARCHIVIST</strong>
            <span>3.7 HEADS · HIGH-DENSITY VOXEL</span>
          </div>
          <div class="forge-scale" aria-hidden="true"><span>92 CELL HEIGHT</span></div>
          <div class="forge-controls" aria-label="Character controls">
            <div class="forge-control-group">
              <small>MOTION</small>
              <div class="forge-segments">
                ${button("IDLE", "idle", "motion", true)}
                ${button("RUN", "run", "motion")}
                ${button("HIT", "hit", "motion")}
              </div>
            </div>
            <div class="forge-control-group forge-control-view">
              <small>VIEW</small>
              <div class="forge-segments">
                ${button("3/4", "three-quarter", "view", true)}
                ${button("F", "front", "view")}
                ${button("L", "left", "view")}
                ${button("B", "back", "view")}
                ${button("R", "right", "view")}
              </div>
            </div>
            <div class="forge-control-group forge-control-toggle">
              <small>INSPECT</small>
              <div class="forge-segments">
                ${button("GAME", "game", "distance")}
                ${button("CLOSE", "close", "distance", true)}
                ${button("GRID", "wireframe", "toggle")}
                ${button("TURN", "turntable", "toggle")}
              </div>
            </div>
          </div>
        </section>

        <aside class="forge-inspector" aria-label="Source and comparison inspector">
          <div class="forge-inspector-heading">
            <div><small>SOURCE / EVIDENCE</small><strong data-reference-eyebrow>GEOMETRY INPUT</strong></div>
            <span>01</span>
          </div>
          <div class="forge-reference-tabs">${referenceTabs()}</div>
          <figure class="forge-reference-frame">
            <img data-reference-image src="${buildSheetUrl}" alt="F-01 production Build Sheet" />
            <figcaption><strong data-reference-title>Build Sheet</strong><span data-reference-detail>${REFERENCES[0]?.detail ?? ""}</span></figcaption>
          </figure>

          <section class="forge-metrics" aria-label="Reconstruction metrics">
            <div><small>RENDER CELLS</small><strong data-cell-count>—</strong></div>
            <div><small>SOURCE VOLUME</small><strong data-volume-count>—</strong></div>
            <div><small>RIG</small><strong data-rig-count>—</strong></div>
            <div><small>MATERIALS</small><strong data-material-count>—</strong></div>
          </section>

          <section class="forge-pipeline">
            <small>AI-NATIVE ASSET CHAIN</small>
            <ol>
              <li class="is-complete"><span>01</span><div><strong>BEAUTY SHEET</strong><small>identity + art direction</small></div></li>
              <li class="is-complete"><span>02</span><div><strong>BUILD SHEET</strong><small>orthographic + modules</small></div></li>
              <li class="is-active"><span>03</span><div><strong>SURFACE PACK</strong><small>validated 4-view reconstruction</small></div></li>
              <li class="is-complete"><span>04</span><div><strong>SEMANTIC RIG</strong><small>idle / run / hit</small></div></li>
            </ol>
          </section>
        </aside>
      </main>

      <footer class="forge-footer">
        <span><b>F-01</b> PRODUCTION EXPERIMENT</span>
        <span>IMAGE → FOUR-VIEW VOLUME → SEMANTIC PARTS → REAL-TIME RIG</span>
        <span data-renderer>WEBGL / PC ULTRA</span>
      </footer>
    </div>
  `;
}

function query<T extends Element>(root: ParentNode, selector: string): T {
  const element = root.querySelector<T>(selector);
  if (element === null) throw new Error(`Character Forge UI is missing ${selector}`);
  return element;
}

function setActiveButton(
  root: ParentNode,
  selector: string,
  activeButton: HTMLButtonElement,
): void {
  root.querySelectorAll<HTMLButtonElement>(selector).forEach((candidate) => {
    const active = candidate === activeButton;
    candidate.classList.toggle("is-active", active);
    candidate.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function setCameraView(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  view: ForgeView,
  distance: "game" | "close",
): void {
  const radius = distance === "game" ? 12.8 : 9.1;
  const height = distance === "game" ? 4.3 : 3.45;
  const positions: Readonly<Record<ForgeView, readonly [number, number, number]>> = {
    "three-quarter": [radius * 0.43, height, radius * 0.9],
    front: [0, height, radius],
    left: [-radius, height, 0],
    back: [0, height, -radius],
    right: [radius, height, 0],
  };
  const position = positions[view];
  camera.position.set(...position);
  controls.target.set(0, 2.55, 0);
  controls.update();
}

function createScene(
  stage: HTMLElement,
): {
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly renderer: THREE.WebGLRenderer;
  readonly composer: EffectComposer;
  readonly controls: OrbitControls;
  readonly grid: THREE.GridHelper;
  resize(): void;
  dispose(): void;
} {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x59605c);
  scene.fog = new THREE.FogExp2(0x59605c, 0.016);
  const camera = new THREE.PerspectiveCamera(29, 1, 0.1, 80);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.84;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.className = "forge-canvas";
  renderer.domElement.setAttribute("aria-label", "F-01 real-time voxel character");
  stage.prepend(renderer.domElement);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  scene.environment = pmrem.fromScene(room, 0.03).texture;
  room.dispose();
  pmrem.dispose();

  const hemisphere = new THREE.HemisphereLight(0xe8f5ec, 0x252a27, 1.25);
  scene.add(hemisphere);
  const key = new THREE.DirectionalLight(0xfff5df, 2.25);
  key.position.set(4.8, 8.4, 5.8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 0.1;
  key.shadow.camera.far = 30;
  key.shadow.camera.left = -5;
  key.shadow.camera.right = 5;
  key.shadow.camera.top = 7;
  key.shadow.camera.bottom = -2;
  key.shadow.bias = -0.00035;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x88e9df, 1.15);
  rim.position.set(-5.2, 5.5, -6.6);
  scene.add(rim);
  const face = new THREE.DirectionalLight(0xffddd0, 0.62);
  face.position.set(-1, 3.8, 6.6);
  scene.add(face);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(9, 96),
    new THREE.MeshPhysicalMaterial({
      color: 0x4e5551,
      roughness: 0.82,
      metalness: 0.03,
      clearcoat: 0.08,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  const grid = new THREE.GridHelper(14, 28, 0xb4beb4, 0x8a918b);
  grid.position.y = 0.006;
  grid.material.transparent = true;
  grid.material.opacity = 0.18;
  grid.visible = false;
  scene.add(grid);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 6.3;
  controls.maxDistance = 16;
  controls.minPolarAngle = Math.PI * 0.24;
  controls.maxPolarAngle = Math.PI * 0.56;
  controls.target.set(0, 2.55, 0);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.07, 0.22, 1.42);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const resize = (): void => {
    const width = Math.max(1, stage.clientWidth);
    const height = Math.max(1, stage.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
  };

  return {
    scene,
    camera,
    renderer,
    composer,
    controls,
    grid,
    resize,
    dispose() {
      controls.dispose();
      composer.dispose();
      renderer.dispose();
      floor.geometry.dispose();
      (floor.material as THREE.Material).dispose();
      grid.geometry.dispose();
      grid.material.dispose();
    },
  };
}

export async function startCharacterForge(applicationRoot: HTMLElement): Promise<void> {
  document.title = "F.R.A.M. Character Forge F-01";
  applicationRoot.className = "forge-app";
  applicationRoot.innerHTML = layout();
  const stage = query<HTMLElement>(applicationRoot, ".forge-stage");
  const loading = query<HTMLElement>(applicationRoot, "[data-loading]");
  const sceneState = createScene(stage);
  setCameraView(sceneState.camera, sceneState.controls, "three-quarter", "close");
  const character = createF01Character();
  sceneState.scene.add(character.root);
  character.root.rotation.y = -0.09;
  loading.classList.add("is-complete");
  const navigationStartedAt = Number(
    document.documentElement.dataset.framNavigationStart,
  );
  if (Number.isFinite(navigationStartedAt)) {
    applicationRoot.dataset.readyMs = Math.round(
      performance.now() - navigationStartedAt,
    ).toString();
  }

  query<HTMLElement>(applicationRoot, "[data-cell-count]").textContent =
    character.stats.renderedSurfaceCells.toLocaleString("en-US");
  query<HTMLElement>(applicationRoot, "[data-volume-count]").textContent =
    character.stats.sourceVoxels.toLocaleString("en-US");
  query<HTMLElement>(applicationRoot, "[data-rig-count]").textContent =
    `${character.stats.rigParts} PARTS`;
  query<HTMLElement>(applicationRoot, "[data-material-count]").textContent =
    `${character.stats.materialCount} TYPES`;

  let motion: ForgeMotion = "idle";
  let motionStartedAt = performance.now() / 1000;
  let view: ForgeView = "three-quarter";
  let distance: "game" | "close" = "close";
  let turntable = false;
  let wireframe = false;

  applicationRoot
    .querySelectorAll<HTMLButtonElement>("[data-motion]")
    .forEach((motionButton) => {
      motionButton.addEventListener("click", () => {
        setActiveButton(applicationRoot, "[data-motion]", motionButton);
        motion = motionButton.dataset.motion as ForgeMotion;
        motionStartedAt = performance.now() / 1000;
      });
    });

  applicationRoot
    .querySelectorAll<HTMLButtonElement>("[data-view]")
    .forEach((viewButton) => {
      viewButton.addEventListener("click", () => {
        setActiveButton(applicationRoot, "[data-view]", viewButton);
        view = viewButton.dataset.view as ForgeView;
        setCameraView(sceneState.camera, sceneState.controls, view, distance);
      });
    });

  applicationRoot
    .querySelectorAll<HTMLButtonElement>("[data-distance]")
    .forEach((distanceButton) => {
      distanceButton.addEventListener("click", () => {
        setActiveButton(applicationRoot, "[data-distance]", distanceButton);
        distance = distanceButton.dataset.distance as "game" | "close";
        setCameraView(sceneState.camera, sceneState.controls, view, distance);
      });
    });

  applicationRoot
    .querySelectorAll<HTMLButtonElement>("[data-toggle]")
    .forEach((toggleButton) => {
      toggleButton.addEventListener("click", () => {
        const toggle = toggleButton.dataset.toggle;
        if (toggle === "wireframe") {
          wireframe = !wireframe;
          character.setWireframe(wireframe);
          sceneState.grid.visible = wireframe;
          toggleButton.classList.toggle("is-active", wireframe);
          toggleButton.setAttribute("aria-pressed", wireframe ? "true" : "false");
        }
        if (toggle === "turntable") {
          turntable = !turntable;
          toggleButton.classList.toggle("is-active", turntable);
          toggleButton.setAttribute("aria-pressed", turntable ? "true" : "false");
        }
      });
    });

  const referenceImage = query<HTMLImageElement>(applicationRoot, "[data-reference-image]");
  const referenceTitle = query<HTMLElement>(applicationRoot, "[data-reference-title]");
  const referenceEyebrow = query<HTMLElement>(applicationRoot, "[data-reference-eyebrow]");
  const referenceDetail = query<HTMLElement>(applicationRoot, "[data-reference-detail]");
  applicationRoot
    .querySelectorAll<HTMLButtonElement>("[data-reference]")
    .forEach((referenceButton) => {
      referenceButton.addEventListener("click", () => {
        const selected = REFERENCES.find(
          (item) => item.id === referenceButton.dataset.reference,
        );
        if (selected === undefined) return;
        setActiveButton(applicationRoot, "[data-reference]", referenceButton);
        referenceImage.src = selected.url;
        referenceImage.alt = selected.label;
        referenceTitle.textContent = selected.label;
        referenceEyebrow.textContent = selected.eyebrow;
        referenceDetail.textContent = selected.detail;
      });
    });

  const resizeObserver = new ResizeObserver(() => sceneState.resize());
  resizeObserver.observe(stage);
  sceneState.resize();
  let disposed = false;
  let animationFrame = 0;
  const render = (timestamp: number): void => {
    if (disposed) return;
    const timeSeconds = timestamp / 1000;
    if (motion === "hit" && timeSeconds - motionStartedAt > 0.72) {
      motion = "idle";
      const idleButton = query<HTMLButtonElement>(applicationRoot, '[data-motion="idle"]');
      setActiveButton(applicationRoot, "[data-motion]", idleButton);
    }
    character.update(motion, timeSeconds, motionStartedAt);
    if (turntable) character.root.rotation.y += 0.0042;
    sceneState.controls.update();
    sceneState.composer.render();
    animationFrame = requestAnimationFrame(render);
  };
  animationFrame = requestAnimationFrame(render);

  window.addEventListener(
    "pagehide",
    () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      character.dispose();
      sceneState.dispose();
    },
    { once: true },
  );
}
