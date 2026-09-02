(() => {
  "use strict";

  const base = "/game/";
  const latestHref = `${base}r15/`;
  const latestImage = `${base}catalog/r15.jpg`;
  const latestTitle = "B2-Oティルトシフト撮影版";
  const latestCard = `
    <article class="release-card release-card--latest" data-release="r15">
      <div class="release-card__visual">
        <img data-deferred-src="${latestImage}" alt="${latestTitle} の通常プレイ画面" width="1280" height="720" loading="lazy" decoding="async" />
        <span class="release-card__index">01</span>
        <span class="release-card__status">LATEST / PLAYABLE</span>
      </div>
      <div class="release-card__body">
        <span class="release-card__id">R15</span>
        <h3>${latestTitle}</h3>
        <p class="release-card__summary">物理iPhoneで採択されたB2-Oティルトシフト撮影を、雨庭区の通常遠征へ反映した版。</p>
        <div class="release-card__changes"><span>この版で試したこと</span><ul><li>通常プレイ画面で被写界深度と視線の誘導を確認</li><li>物理iPhone landscapeでの受容を確認</li><li>R14を残したままR15の撮影表現を公開</li></ul></div>
        <p class="release-card__playable"><span>遊べる内容</span>雨庭区を探索し、敵と戦い、遺物を回収して帰還する遠征。</p>
        <a class="release-card__action" href="${latestHref}">R15を遊ぶ</a>
      </div>
    </article>`;

  const patchStatic = () => {
    const root = document.querySelector("#app");
    if (root === null || root.classList.contains("prototype-catalog")) return;
    const action = root.querySelector(".catalog-static__actions a:first-child");
    const image = root.querySelector(".catalog-static figure img");
    const caption = root.querySelector(".catalog-static figcaption");
    if (action instanceof HTMLAnchorElement) action.href = latestHref;
    if (image instanceof HTMLImageElement) {
      image.src = latestImage;
      image.alt = `${latestTitle} の通常プレイ画面`;
      image.width = 1280;
      image.height = 720;
    }
    if (caption !== null) caption.textContent = "LATEST PLAYABLE / R15 — 現在のゲーム画面";
  };

  const patchLiveCatalog = () => {
    const root = document.querySelector("#app.prototype-catalog");
    const releaseList = root?.querySelector(".release-list");
    if (root === null || releaseList === null) return false;

    root.dataset.releaseCount = "16";
    const heroImage = root.querySelector(".catalog-hero__visual img");
    if (heroImage instanceof HTMLImageElement) {
      heroImage.src = latestImage;
      heroImage.alt = `${latestTitle} の通常プレイ画面`;
      heroImage.width = 1280;
      heroImage.height = 720;
    }
    root.querySelectorAll(".catalog-hero__visual a, .catalog-actions .catalog-button--primary").forEach((link) => {
      if (link instanceof HTMLAnchorElement) {
        link.href = latestHref;
        link.setAttribute("aria-label", "R15を起動する");
      }
      const label = link.querySelector("span");
      if (label !== null) label.textContent = "R15を遊ぶ";
    });
    const heroLabel = root.querySelector(".catalog-hero__visual figcaption span");
    if (heroLabel !== null) heroLabel.textContent = "LATEST PLAYABLE / R15";

    const r14 = releaseList.querySelector('[data-release="r14"]');
    if (releaseList.querySelector('[data-release="r15"]') === null) {
      r14?.insertAdjacentHTML("beforebegin", latestCard);
    }
    const r14Status = r14?.querySelector(".release-card__status");
    r14?.classList.remove("release-card--latest");
    if (r14Status !== null && r14Status !== undefined) r14Status.textContent = "ARCHIVE / PLAYABLE";

    releaseList.querySelectorAll(".release-card").forEach((card, index) => {
      const indexLabel = card.querySelector(".release-card__index");
      if (indexLabel !== null) indexLabel.textContent = String(index + 1).padStart(2, "0");
    });
    const r15Image = releaseList.querySelector('[data-release="r15"] img[data-deferred-src]');
    if (r15Image instanceof HTMLImageElement) {
      r15Image.src = latestImage;
      r15Image.removeAttribute("data-deferred-src");
      r15Image.classList.add("is-loaded");
    }
    return true;
  };

  patchStatic();
  if (!patchLiveCatalog()) {
    const observer = new MutationObserver(() => {
      patchStatic();
      if (patchLiveCatalog()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
