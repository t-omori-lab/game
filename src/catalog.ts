import "./catalog.css";
import {
  PROTOTYPE_RELEASES,
  createReleaseHref,
  resolvePrototypeAlias,
} from "./prototypeRoutes";

const root = document.querySelector<HTMLElement>("#app");

if (root === null) {
  throw new Error("Prototype catalog root was not found.");
}

const aliasedRelease = resolvePrototypeAlias(window.location.search);
const prototypeParameter = new URLSearchParams(window.location.search).get(
  "prototype",
);

if (aliasedRelease !== null) {
  window.location.replace(
    createReleaseHref(
      aliasedRelease,
      import.meta.env.BASE_URL,
      window.location.search,
    ),
  );
} else if (prototypeParameter === "0.1") {
  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  window.location.replace(`${baseUrl}r01/${window.location.search}`);
} else {
  renderCatalog(root);
  registerServiceWorker();
}

function renderCatalog(applicationRoot: HTMLElement): void {
  applicationRoot.className = "prototype-catalog";
  applicationRoot.dataset.releaseCount = String(PROTOTYPE_RELEASES.length);

  const releaseMarkup = PROTOTYPE_RELEASES.map((release, index) => {
    const isLatest = release.status === "latest";
    const status = isLatest ? "LATEST / PLAYABLE" : "ARCHIVE / PLAYABLE";
    const linkLabel = isLatest ? "最新試作を起動" : "保存版を起動";

    return `
      <article class="release-card ${isLatest ? "release-card--latest" : ""}" data-release="${release.id}">
        <div class="release-card__visual" aria-hidden="true">
          <span class="release-card__index">0${index + 1}</span>
        </div>
        <div class="release-card__body">
          <div class="release-card__meta">
            <span>${release.id.toUpperCase()}</span>
            <span>${status}</span>
          </div>
          <h2>${release.title}</h2>
          <p>${release.summary}</p>
          <a class="release-card__link" href="${createReleaseHref(release.id, import.meta.env.BASE_URL)}">
            <span>${linkLabel}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `;
  }).join("");

  applicationRoot.innerHTML = `
    <div class="catalog-noise" aria-hidden="true"></div>
    <header class="catalog-header">
      <div>
        <span class="catalog-kicker">RELIC FRONTIER / PROTOTYPE ARCHIVE</span>
        <h1>辺境遺物録</h1>
      </div>
      <p>AI-native game world laboratory<br><span>最新試作から順に公開しています。</span></p>
    </header>
    <main class="catalog-main" data-testid="prototype-catalog">
      <section class="catalog-intro" aria-labelledby="catalog-heading">
        <div>
          <span class="catalog-intro__number">${String(PROTOTYPE_RELEASES.length).padStart(2, "0")}</span>
          <span>PLAYABLE<br>REVISIONS</span>
        </div>
        <p id="catalog-heading">過去の感触を失わず、世界の法則と表現を一段ずつ積み上げるための公開記録。</p>
      </section>
      <section class="release-list" aria-label="公開プロトタイプ一覧">
        ${releaseMarkup}
      </section>
    </main>
    <footer class="catalog-footer">
      <span>FIXED CAMERA · AI-NATIVE WORLD · 2.5D HYBRID</span>
      <span>© T-OMORI-LAB</span>
    </footer>
  `;
}

function registerServiceWorker(): void {
  if (!("serviceWorker" in navigator) || !import.meta.env.PROD) {
    return;
  }

  window.addEventListener("load", () => {
    void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
  });
}
