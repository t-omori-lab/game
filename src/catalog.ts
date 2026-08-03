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

const RETIRED_CATALOG_CACHE_PREFIXES = [
  "fram-catalog-",
  "relic-frontier-shell-",
  "small-persistent-world-shell-",
] as const;

if (root === null) {
  throw new Error("Prototype catalog root was not found.");
}

void retireCatalogServiceWorker();

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
  void enhanceCatalog(root);
}

async function enhanceCatalog(applicationRoot: HTMLElement): Promise<void> {
  try {
    await import("./catalog.css");
    renderCatalog(applicationRoot);
    registerDeferredImages(applicationRoot);
  } catch (error: unknown) {
    // The static first view remains fully usable when enhancement fails.
    console.error("F.R.A.M. catalog enhancement failed.", error);
  }
}

function renderCatalog(applicationRoot: HTMLElement): void {
  const latestRelease = PROTOTYPE_RELEASES.find(
    (release) => release.status === "latest",
  ) ?? PROTOTYPE_RELEASES[0];
  const firstEpoch = TECHNICAL_EPOCHS[0];
  if (latestRelease === undefined || firstEpoch === undefined) {
    throw new Error("F.R.A.M. catalog requires a playable build and a technical epoch.");
  }

  applicationRoot.className = "prototype-catalog";
  applicationRoot.dataset.releaseCount = String(PROTOTYPE_RELEASES.length);
  applicationRoot.dataset.epochCount = String(TECHNICAL_EPOCHS.length);

  const latestHref = createReleaseHref(latestRelease.id, import.meta.env.BASE_URL);
  const heroImage = `${import.meta.env.BASE_URL}catalog/r06-hero.jpg`;

  const releaseMarkup = PROTOTYPE_RELEASES.map((release, index) => {
    const isLatest = release.status === "latest";
    const status = isLatest ? "LATEST / PLAYABLE" : "ARCHIVE / PLAYABLE";
    const linkLabel = isLatest ? "この版を遊ぶ" : "保存版を遊ぶ";
    const thumbnail = `${import.meta.env.BASE_URL}catalog/${release.id}.jpg`;

    return `
      <article class="release-card ${isLatest ? "release-card--latest" : ""}" data-release="${release.id}">
        <div class="release-card__visual">
          <img
            data-deferred-src="${thumbnail}"
            alt="${release.title} のプレイ画面"
            width="720"
            height="405"
            loading="lazy"
            decoding="async"
          />
          <span class="release-card__index">${String(index + 1).padStart(2, "0")}</span>
          <span class="release-card__status">${status}</span>
        </div>
        <div class="release-card__body">
          <span class="release-card__id">${release.id.toUpperCase()}</span>
          <h3>${release.title}</h3>
          <p>${release.summary}</p>
          <a class="text-link" href="${createReleaseHref(release.id, import.meta.env.BASE_URL)}">
            <span>${linkLabel}</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `;
  }).join("");

  const epochMarkup = TECHNICAL_EPOCHS.map((epoch) => {
    const thumbnail = `${import.meta.env.BASE_URL}catalog/${epoch.id}.jpg`;
    return `
      <article class="epoch-card" data-epoch="${epoch.id}">
        <div class="epoch-card__visual">
          <img
            data-deferred-src="${thumbnail}"
            alt="${epoch.title} のリアルタイム3D画面"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
          />
          <span>TECHNICAL EPOCH 01</span>
        </div>
        <div class="epoch-card__body">
          <div class="epoch-card__meta"><span>${epoch.eyebrow}</span><span>${epoch.review}</span></div>
          <h3>${epoch.title}</h3>
          <p>生成したキャラクターシートから、動かせる高密度ボクセルモデルを再構築。画像からゲーム内資産へつなぐ工程を、そのまま操作できます。</p>
          <a class="text-link text-link--gold" href="${createTechnicalEpochHref(epoch, import.meta.env.BASE_URL)}">
            <span>F-01を操作する</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `;
  }).join("");

  applicationRoot.innerHTML = `
    <div class="catalog-atmosphere" aria-hidden="true"></div>
    <header class="catalog-hero" data-testid="catalog-hero">
      <div class="catalog-hero__copy">
        <span class="catalog-eyebrow">AI-NATIVE GAME DEVELOPMENT PROJECT</span>
        <p class="catalog-genre">AIとつくる、世界記憶型・放浪RPG</p>
        <h1>F.R.A.M.</h1>
        <p class="catalog-fullname">FRONTIER RELICS ARCHIVE MODULE <span>/ 辺境遺物記録モジュール</span></p>
        <p class="catalog-lede">自然に侵食された都市を放浪し、遺物を回収し、世界の記憶を持ち帰る。人類が減っても、旅と生活を諦めない者たちのRPGです。</p>
        <div class="catalog-actions">
          <a class="catalog-button catalog-button--primary" href="${latestHref}"><span>最新版を遊ぶ</span><small>${latestRelease.id.toUpperCase()} / BROWSER PLAY</small></a>
          <a class="catalog-button catalog-button--secondary" href="#experiments"><span>AI開発実験を見る</span><small>CHARACTER FORGE F-01</small></a>
        </div>
        <ul class="catalog-pillars" aria-label="ゲームの特徴">
          <li><b>01</b><span>FREE ROAMING<br>自由な放浪</span></li>
          <li><b>02</b><span>WORLD MEMORY<br>世界に残る記憶</span></li>
          <li><b>03</b><span>RELIC BUILDS<br>遺物と装備構築</span></li>
        </ul>
      </div>
      <figure class="catalog-hero__visual">
        <img src="${heroImage}" alt="自然に侵食された都市を探索するF.R.A.M. R06のゲーム画面" width="720" height="405" fetchpriority="high" decoding="async" />
        <figcaption><span><i></i> LATEST PLAYABLE / ${latestRelease.id.toUpperCase()}</span><b>現在のゲーム画面</b></figcaption>
        <a href="${latestHref}" aria-label="最新版${latestRelease.id.toUpperCase()}を起動する"><span>PLAY</span><b>▶</b></a>
      </figure>
    </header>

    <main class="catalog-main" data-testid="prototype-catalog">
      <section class="research-statement" aria-labelledby="research-heading">
        <span class="section-index">00 / AI-NATIVE</span>
        <div>
          <h2 id="research-heading">ゲームをつくる。<br><em>ゲームを生成する仕組み</em>もつくる。</h2>
          <p>F.R.A.M.は、世界、人物、遺物、物語を共通の法則から生成し、遊べる形へ組み上げる開発研究です。AIの案をそのまま並べるのではなく、人の試遊と判断でゲームへ鍛え直します。</p>
        </div>
        <a href="#experiments">HOW WE BUILD <span>↓</span></a>
      </section>

      <section class="release-section" id="playable" aria-labelledby="release-heading">
        <div class="collection-heading">
          <div><span>PLAYABLE BUILDS / 公開試作</span><h2 id="release-heading">F.R.A.M.を遊ぶ</h2></div>
          <p>各版は、その時点の操作、戦闘、画面表現を残したプレイアブル版です。最新版と過去版を、ブラウザですぐ比較できます。</p>
        </div>
        <div class="release-list" aria-label="公開プロトタイプ一覧">${releaseMarkup}</div>
      </section>

      <section class="epoch-section" id="experiments" aria-labelledby="epoch-heading">
        <div class="collection-heading collection-heading--epoch">
          <div><span>TECHNICAL EPOCHS / 技術エポック</span><h2 id="epoch-heading">遊べるAI開発実験</h2></div>
          <p>キャラクター、描画、生成工程の作り方が変わった時だけ記録します。技術資料ではなく、実際に触れて確かめられる実験です。</p>
        </div>
        <div class="epoch-list">${epochMarkup}</div>
      </section>
    </main>

    <footer class="catalog-footer">
      <span>F.R.A.M. / FRONTIER RELICS ARCHIVE MODULE</span>
      <span>OVERGROWN CITY · RELIC HUNTING · WORLD MEMORY</span>
      <span>© T-OMORI-LAB</span>
    </footer>
  `;
}

function registerDeferredImages(applicationRoot: ParentNode): void {
  const images = Array.from(
    applicationRoot.querySelectorAll<HTMLImageElement>("img[data-deferred-src]"),
  );
  const load = (image: HTMLImageElement): void => {
    const source = image.dataset.deferredSrc;
    if (source === undefined) return;
    image.addEventListener("load", () => image.classList.add("is-loaded"), { once: true });
    image.src = source;
    image.removeAttribute("data-deferred-src");
  };

  if (!("IntersectionObserver" in window)) {
    images.forEach(load);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const image = entry.target as HTMLImageElement;
        observer.unobserve(image);
        load(image);
      }
    },
    { rootMargin: "220px 0px", threshold: 0.01 },
  );
  images.forEach((image) => observer.observe(image));
}

async function retireCatalogServiceWorker(): Promise<void> {
  if (!import.meta.env.PROD) return;

  try {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.getRegistration(
        import.meta.env.BASE_URL,
      );
      await registration?.unregister();
    }

    if ("caches" in window) {
      const cacheNames = await window.caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => (
            RETIRED_CATALOG_CACHE_PREFIXES.some((prefix) => name.startsWith(prefix))
          ))
          .map((name) => window.caches.delete(name)),
      );
    }
  } catch (error: unknown) {
    console.warn("F.R.A.M. catalog cache retirement failed.", error);
  }
}
