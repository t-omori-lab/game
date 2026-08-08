import "../styles.css";
import {
  PROTOTYPE_B_RUN_SEED,
  startPrototypeB,
} from "../prototypeB/app";
import { createPrototypeBState } from "../prototypeB/sim";
import {
  createWorldMemoryRepository,
  loadWorldMemory,
  saveWorldMemory,
} from "../prototypeB/worldMemory";
import {
  IndexedDbStorageBackend,
  MemoryStorageBackend,
  ResilientStorageBackend,
  type StorageBackend,
} from "../platform/storageBackend";
import { loadR09HeroAsset } from "./loadR09HeroAsset";

const root = document.querySelector<HTMLElement>("#app");

if (root === null) {
  throw new Error("F.R.A.M. R09 application root was not found.");
}

const navigationStartedAt = performance.now();
const worldSeed = createPrototypeBState(PROTOTYPE_B_RUN_SEED).seed;
const storage = createR09Storage();
const repository = createWorldMemoryRepository(storage);

root.dataset.bootState = "loading-memory";

try {
  const [loaded, heroAssetRequest] = await Promise.all([
    loadWorldMemory(repository, worldSeed),
    loadR09HeroAsset(window.location.search),
  ]);
  root.dataset.memoryLoadSource = loaded.source;
  root.dataset.memoryPersistence = storage.persistence;
  root.dataset.heroAssetLoadStatus = heroAssetRequest.status;
  startPrototypeB(root, {
    experience: "r09",
    renderQuality: "pc-ultra",
    companionPreview: false,
    semiAutoCombat: true,
    heroAssetRequest,
    worldMemoryRuntime: {
      initialState: loaded.state,
      loadSource: loaded.source,
      onCommit: (state) => saveWorldMemory(repository, state),
    },
  });
  root.dataset.bootState = "ready";
  root.dataset.readyMs = String(
    Math.round(performance.now() - navigationStartedAt),
  );
} catch (error: unknown) {
  showBootFailure(root, error);
}

function createR09Storage(): StorageBackend {
  if (typeof indexedDB === "undefined") {
    return new MemoryStorageBackend();
  }

  return new ResilientStorageBackend(
    new IndexedDbStorageBackend(indexedDB, {
      databaseName: "fram-r09-player-local-v1",
      storeName: "world-memory",
    }),
  );
}

function showBootFailure(
  applicationRoot: HTMLElement,
  error: unknown,
): void {
  applicationRoot.replaceChildren();
  applicationRoot.className = "game-shell boot-failure-shell";
  applicationRoot.dataset.bootState = "failed";

  const panel = document.createElement("section");
  panel.className = "boot-failure";
  panel.setAttribute("role", "alert");
  const heading = document.createElement("h1");
  heading.textContent = "世界記憶を起動できませんでした";
  const body = document.createElement("p");
  body.textContent =
    "ページを再読み込みしても直らない場合は、保存を使わないR06を開いてください。";
  const fallback = document.createElement("a");
  fallback.href = `${import.meta.env.BASE_URL}r06/`;
  fallback.textContent = "R06を開く";
  panel.append(heading, body, fallback);
  applicationRoot.append(panel);
  console.error("F.R.A.M. R09 failed to start.", error);
}
