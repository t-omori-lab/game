import "../styles.css";
import { startPrototypeB } from "../prototypeB/app";

const root = document.querySelector<HTMLElement>("#app");

if (root === null) {
  throw new Error("F.R.A.M. R06 application root was not found.");
}

const navigationStartedAt = performance.now();

registerR06ServiceWorker();

// Yield one task so the browser can present the static boot shell before
// WebGL, post-processing and the high-density voxel scene initialize. A timer
// is used instead of requestAnimationFrame so background tabs still boot.
window.setTimeout(() => {
  root.dataset.bootState = "initializing";

  try {
    startPrototypeB(root, {
      experience: "r06",
      renderQuality: "pc-ultra",
      companionPreview: false,
      semiAutoCombat: true,
    });
    root.dataset.bootState = "ready";
    root.dataset.readyMs = String(
      Math.round(performance.now() - navigationStartedAt),
    );
  } catch (error: unknown) {
    showBootFailure(root, error);
  }
}, 0);

function registerR06ServiceWorker(): void {
  if (!("serviceWorker" in navigator) || !import.meta.env.PROD) return;

  window.addEventListener("load", () => {
    void navigator.serviceWorker.register(
      `${import.meta.env.BASE_URL}r06/sw.js`,
      { scope: `${import.meta.env.BASE_URL}r06/` },
    );
  });
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

  const kicker = document.createElement("span");
  kicker.textContent = "F.R.A.M. R06 / STARTUP ERROR";

  const heading = document.createElement("h1");
  heading.textContent = "描画装置を起動できませんでした";

  const body = document.createElement("p");
  body.textContent =
    "この試作にはWebGL対応ブラウザが必要です。ページを再読み込みしても直らない場合は、比較用の旧試作を開けます。";

  const legacyLink = document.createElement("a");
  legacyLink.href = `${import.meta.env.BASE_URL}r01/`;
  legacyLink.textContent = "旧試作 R01 を開く";

  panel.append(kicker, heading, body, legacyLink);
  applicationRoot.append(panel);
  console.error("F.R.A.M. R06 failed to start.", error);
}
