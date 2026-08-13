const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/catalog-CrdLgpcO.css"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";import{_ as A}from"./preload-helper-BUwAYG9H.js";import{a as b,c,P as l}from"./prototypeRoutes-By-iSCxB.js";const g=[{id:"f01",eyebrow:"CHARACTER FORGE / 2026-08-02",title:"F-01 / Image-to-3D Character Forge",summary:"一枚絵だった主人公を、どの方向から見ても崩れずに動く高密度ボクセルモデルへ。髪、衣装、装備を組み替えられる制作法の最初の形です。",review:"USER REVIEW · APPROX. 70%",path:"forge/f01/"}];function w(e,a){return`${a.endsWith("/")?a:`${a}/`}${e.path}`}const h=document.querySelector("#app"),$=["fram-catalog-","relic-frontier-shell-","small-persistent-world-shell-"];if(h===null)throw new Error("Prototype catalog root was not found.");I();const m=b(window.location.search),R=new URLSearchParams(window.location.search).get("prototype");if(m!==null)window.location.replace(c(m,"/game/",window.location.search));else if(R==="0.1"){const e="/game/".endsWith("/")?"/game/":"/game//";window.location.replace(`${e}r01/${window.location.search}`)}else L(h),y(h);function f(){const e=l.find(a=>a.status==="latest")??l[0];if(e===void 0)throw new Error("F.R.A.M. catalog requires a playable build.");return e}function L(e){const a=f(),r=c(a.id,"/game/");e.querySelector(".catalog-static__actions a:first-child")?.setAttribute("href",r);const i=e.querySelector(".catalog-static figure img");i!==null&&(i.src=`/game/catalog/${a.id}.jpg`,i.alt=`${a.title} の実画面`);const s=e.querySelector(".catalog-static figcaption");s!==null&&(s.textContent=`LATEST PLAYABLE / ${a.id.toUpperCase()} — 現在のゲーム画面`)}async function y(e){try{await A(()=>Promise.resolve({}),__vite__mapDeps([0])),C(e),_(e)}catch(a){console.error("F.R.A.M. catalog enhancement failed.",a)}}function C(e){const a=f(),r=g[0];if(a===void 0||r===void 0)throw new Error("F.R.A.M. catalog requires a playable build and a technical epoch.");e.className="prototype-catalog",e.dataset.releaseCount=String(l.length),e.dataset.epochCount=String(g.length);const i=c(a.id,"/game/"),s=`/game/catalog/${a.id}.jpg`,n=l.map((t,d)=>{const p=t.status==="latest",u=p?"LATEST / PLAYABLE":"ARCHIVE / PLAYABLE",E=p?"この版を遊ぶ":"保存版を遊ぶ",v=`/game/catalog/${t.id}.jpg`;return`
      <article class="release-card ${p?"release-card--latest":""}" data-release="${t.id}">
        <div class="release-card__visual">
          <img
            data-deferred-src="${v}"
            alt="${t.title} のプレイ画面"
            width="720"
            height="405"
            loading="lazy"
            decoding="async"
          />
          <span class="release-card__index">${String(d+1).padStart(2,"0")}</span>
          <span class="release-card__status">${u}</span>
        </div>
        <div class="release-card__body">
          <span class="release-card__id">${t.id.toUpperCase()}</span>
          <h3>${t.title}</h3>
          <p>${t.summary}</p>
          <a class="text-link" href="${c(t.id,"/game/")}">
            <span>${E}</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `}).join(""),o=g.map(t=>{const d=`/game/catalog/${t.id}.jpg`;return`
      <article class="epoch-card" data-epoch="${t.id}">
        <div class="epoch-card__visual">
          <img
            data-deferred-src="${d}"
            alt="${t.title} のリアルタイム3D画面"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
          />
          <span>TECHNICAL EPOCH 01</span>
        </div>
        <div class="epoch-card__body">
          <div class="epoch-card__meta"><span>${t.eyebrow}</span><span>${t.review}</span></div>
          <h3>${t.title}</h3>
          <p>生成したキャラクターシートから、動かせる高密度ボクセルモデルを再構築。画像からゲーム内資産へつなぐ工程を、そのまま操作できます。</p>
          <a class="text-link text-link--gold" href="${w(t,"/game/")}">
            <span>F-01を操作する</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `}).join("");e.innerHTML=`
    <div class="catalog-atmosphere" aria-hidden="true"></div>
    <header class="catalog-hero" data-testid="catalog-hero">
      <div class="catalog-hero__copy">
        <span class="catalog-eyebrow">AI-NATIVE GAME DEVELOPMENT PROJECT</span>
        <p class="catalog-genre">AIとつくる、世界記憶型・放浪RPG</p>
        <h1 class="catalog-public-title">廃都渡りのフラム</h1>
        <p class="catalog-fullname">F.R.A.M. / FRONTIER RELICS ARCHIVE MODULE <span>/ 辺境遺物記録モジュール / フラム</span></p>
        <p class="catalog-lede">自然に侵食された都市を放浪し、遺物を回収し、世界の記憶を持ち帰る。水や機械を動かし、食や祭りを受け継ぐ人々と出会う、旅と生活のRPGです。</p>
        <div class="catalog-actions">
          <a class="catalog-button catalog-button--primary" href="${i}"><span>最新版を遊ぶ</span><small>${a.id.toUpperCase()} / BROWSER PLAY</small></a>
          <a class="catalog-button catalog-button--secondary" href="#experiments"><span>AI開発実験を見る</span><small>CHARACTER FORGE F-01</small></a>
        </div>
        <ul class="catalog-pillars" aria-label="ゲームの特徴">
          <li><b>01</b><span>FREE ROAMING<br>自由な放浪</span></li>
          <li><b>02</b><span>WORLD MEMORY<br>世界に残る記憶</span></li>
          <li><b>03</b><span>RELIC BUILDS<br>遺物と装備構築</span></li>
        </ul>
      </div>
      <figure class="catalog-hero__visual">
        <img src="${s}" alt="${a.title} の実画面" width="720" height="405" fetchpriority="high" decoding="async" />
        <figcaption><span><i></i> LATEST PLAYABLE / ${a.id.toUpperCase()}</span><b>現在のゲーム画面</b></figcaption>
        <a href="${i}" aria-label="最新版${a.id.toUpperCase()}を起動する"><span>PLAY</span><b>▶</b></a>
      </figure>
    </header>

    <main class="catalog-main" data-testid="prototype-catalog">
      <section class="research-statement" aria-labelledby="research-heading">
        <span class="section-index">00 / AI-NATIVE</span>
        <div>
          <h2 id="research-heading">ゲームをつくる。<br><em>ゲームを生成する仕組み</em>もつくる。</h2>
          <p>『廃都渡りのフラム』は、世界、人物、遺物、物語を共通の法則から生成し、遊べる形へ組み上げる開発研究です。AIの案をそのまま並べるのではなく、人の試遊と判断でゲームへ鍛え直します。</p>
        </div>
        <a href="#experiments">HOW WE BUILD <span>↓</span></a>
      </section>

      <section class="release-section" id="playable" aria-labelledby="release-heading">
        <div class="collection-heading">
          <div><span>PLAYABLE BUILDS / 公開試作</span><h2 id="release-heading">廃都渡りのフラムを遊ぶ</h2></div>
          <p>各版は、その時点の操作、戦闘、画面表現を残したプレイアブル版です。最新版と過去版を、ブラウザですぐ比較できます。</p>
        </div>
        <div class="release-list" aria-label="公開プロトタイプ一覧">${n}</div>
      </section>

      <section class="epoch-section" id="experiments" aria-labelledby="epoch-heading">
        <div class="collection-heading collection-heading--epoch">
          <div><span>TECHNICAL EPOCHS / 技術エポック</span><h2 id="epoch-heading">遊べるAI開発実験</h2></div>
          <p>キャラクター、描画、生成工程の作り方が変わった時だけ記録します。技術資料ではなく、実際に触れて確かめられる実験です。</p>
        </div>
        <div class="epoch-list">${o}</div>
      </section>
    </main>

    <footer class="catalog-footer">
      <span>廃都渡りのフラム / F.R.A.M. MODULE</span>
      <span>OVERGROWN CITY · RELIC HUNTING · WORLD MEMORY</span>
      <span>© T-OMORI-LAB</span>
    </footer>
  `}function _(e){const a=Array.from(e.querySelectorAll("img[data-deferred-src]")),r=s=>{const n=s.dataset.deferredSrc;n!==void 0&&(s.addEventListener("load",()=>s.classList.add("is-loaded"),{once:!0}),s.src=n,s.removeAttribute("data-deferred-src"))};if(!("IntersectionObserver"in window)){a.forEach(r);return}const i=new IntersectionObserver(s=>{for(const n of s){if(!n.isIntersecting)continue;const o=n.target;i.unobserve(o),r(o)}},{rootMargin:"220px 0px",threshold:.01});a.forEach(s=>i.observe(s))}async function I(){try{if("serviceWorker"in navigator&&await(await navigator.serviceWorker.getRegistration("/game/"))?.unregister(),"caches"in window){const e=await window.caches.keys();await Promise.all(e.filter(a=>$.some(r=>a.startsWith(r))).map(a=>window.caches.delete(a)))}}catch(e){console.warn("F.R.A.M. catalog cache retirement failed.",e)}}
