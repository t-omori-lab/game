import "./styles.css";
import { startPrototypeB } from "./prototypeB/app";

const root = document.querySelector<HTMLElement>("#app");

if (root === null) {
  throw new Error("Application root was not found.");
}

void boot(root).catch((error: unknown) => {
  showBootFailure(root, error);
});

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("./sw.js");
  });
}

async function boot(applicationRoot: HTMLElement): Promise<void> {
  const parameters = new URLSearchParams(window.location.search);

  if (parameters.get("prototype") === "0.1") {
    const { startGame } = await import("./app/startGame");
    startGame(applicationRoot);
    return;
  }

  if (parameters.get("prototype") === "north-star") {
    startPrototypeB(applicationRoot, {
      experience: "north-star",
      renderQuality: "pc-ultra",
      companionPreview: true,
      semiAutoCombat: true,
    });
    return;
  }

  startPrototypeB(applicationRoot);
}

function showBootFailure(
  applicationRoot: HTMLElement,
  error: unknown,
): void {
  applicationRoot.replaceChildren();
  applicationRoot.className = "game-shell boot-failure-shell";

  const panel = document.createElement("section");
  panel.className = "boot-failure";
  panel.setAttribute("role", "alert");

  const kicker = document.createElement("span");
  kicker.textContent = "RELIC FRONTIER / STARTUP ERROR";

  const heading = document.createElement("h1");
  heading.textContent = "描画装置を起動できませんでした";

  const body = document.createElement("p");
  body.textContent =
    "この試作にはWebGL対応ブラウザが必要です。ページを再読み込みしても直らない場合は、比較用の旧試作を開けます。";

  const legacyLink = document.createElement("a");
  legacyLink.href = "?prototype=0.1";
  legacyLink.textContent = "旧試作 0.1 を開く";

  panel.append(kicker, heading, body, legacyLink);
  applicationRoot.append(panel);
  console.error("Prototype B failed to start.", error);
}
