import "./catalog.css";
import {
  PROTOTYPE_RELEASES,
  createReleaseHref,
  resolvePrototypeAlias,
} from "./prototypeRoutes";
import {
  TECHNICAL_EPOCHS,
  createTechnicalEpochHref,
} from "./technicalEpochs";

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
  applicationRoot.dataset.epochCount = String(TECHNICAL_EPOCHS.length);

  const epochMarkup = TECHNICAL_EPOCHS.map((epoch) => {
    const thumbnail = `${import.meta.env.BASE_URL}catalog/${epoch.id}.jpg`;

    return `
      <article class="epoch-card" data-epoch="${epoch.id}">
        <div class="epoch-card__visual">
          <img
            src="${thumbnail}"
            alt="${epoch.title} のリアルタイム3D画面"
            width="1280"
            height="720"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          <span>TECHNOLOGY EPOCH</span>
        </div>
        <div class="epoch-card__body">
          <div class="epoch-card__meta">
            <span>${epoch.eyebrow}</span>
            <span>${epoch.review}</span>
          </div>
          <h2>${epoch.title}</h2>
          <p>${epoch.summary}</p>
          <a class="epoch-card__link" href="${createTechnicalEpochHref(epoch, import.meta.env.BASE_URL)}">
            <span>F-01を詳しく見る</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `;
  }).join("");

  const releaseMarkup = PROTOTYPE_RELEASES.map((release, index) => {
    const isLatest = release.status === "latest";
    const status = isLatest ? "LATEST / PLAYABLE" : "ARCHIVE / PLAYABLE";
    const linkLabel = isLatest ? "最新試作を起動" : "保存版を起動";
    const thumbnail = `${import.meta.env.BASE_URL}catalog/${release.id}.jpg`;

    return `
      <article class="release-card ${isLatest ? "release-card--latest" : ""}" data-release="${release.id}">
        <div class="release-card__visual">
          <img
            src="${thumbnail}"
            alt="${release.title} のプレイ画面"
            width="720"
            height="405"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          />
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
        <span class="catalog-kicker">A JOURNEY THROUGH THE RECLAIMED WORLD / DEVELOPMENT ARCHIVE</span>
        <h1>F.R.A.M.</h1>
        <span class="catalog-subtitle">FRONTIER RELICS ARCHIVE MODULE · 辺境遺物記録モジュール</span>
      </div>
      <p>人が去った都市を歩き、遺物を拾い、世界の記憶を持ち帰る。<br><span>制作途中のF.R.A.M.を、遊べる形で残しています。</span></p>
    </header>
    <main class="catalog-main" data-testid="prototype-catalog">
      <section class="catalog-intro" aria-labelledby="catalog-heading">
        <div>
          <span class="catalog-intro__number">${String(PROTOTYPE_RELEASES.length).padStart(2, "0")}</span>
          <span>PLAYABLE<br>BUILDS</span>
        </div>
        <p id="catalog-heading">新しくなるたびに、失われる手触りもある。だから、これまでの試作をそのまま遊べる形で残しています。</p>
      </section>
      <div class="catalog-collections">
        <section class="epoch-section" aria-labelledby="epoch-heading">
          <div class="collection-heading">
            <div>
              <span>TECHNOLOGY EPOCHS</span>
              <h2 id="epoch-heading">開発の節目</h2>
            </div>
            <p>キャラクターや描画の作り方が大きく前進した節目です。本編とは分けて、技術そのものを見られるようにしています。</p>
          </div>
          <div class="epoch-list">${epochMarkup}</div>
        </section>
        <section class="release-section" aria-labelledby="release-heading">
          <div class="collection-heading collection-heading--releases">
            <div>
              <span>PLAYABLE BUILDS</span>
              <h2 id="release-heading">試作版を遊ぶ</h2>
            </div>
          </div>
          <div class="release-list" aria-label="公開プロトタイプ一覧">
            ${releaseMarkup}
          </div>
        </section>
      </div>
    </main>
    <footer class="catalog-footer">
      <span>OVERGROWN CITY · RELIC HUNTING · WORLD MEMORY</span>
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
