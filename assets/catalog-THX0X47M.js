const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/catalog-ChRXeOCq.css"])))=>i.map(i=>d[i]);
import{_ as $}from"./preload-helper-CeUGa9z8.js";import{a as y,c as o,P as d}from"./prototypeRoutes-BoUhkcGG.js";const h=[{id:"f01",eyebrow:"CHARACTER FORGE / 2026-08-02",title:"F-01 / Image-to-3D Character Forge",summary:"一枚絵だった主人公を、どの方向から見ても崩れずに動く高密度ボクセルモデルへ。髪、衣装、装備を組み替えられる制作法の最初の形です。",review:"USER REVIEW · APPROX. 70%",path:"forge/f01/"}];function L(e,a){return`${a.endsWith("/")?a:`${a}/`}${e.path}`}const m=[{id:"waf-01",eyebrow:"WORLD ASSET FORGE / 2026-08-14",title:"WAF-01 / 雨水管制塔の生成パイプライン",summary:"建物の意味と配置を保ったまま、BlenderとGeometry Nodesから視覚・衝突・遮蔽用の出力を組み立てる制作事例です。採択済み実画面のみを記録し、runtimeは未統合・未公開のまま保持します。",status:"not-playable",path:"experiments/waf-01/",candidateCommit:"9fb4eed4e55067813c4aa164622a0cb1c7fe1e94",metrics:"830,684 bytes · 3,454 triangles · 7 draws · 5 materials · 512px atlas"}];function R(e,a){return`${a.endsWith("/")?a:`${a}/`}${e.path}`}const g=document.querySelector("#app"),_=["fram-catalog-","relic-frontier-shell-","small-persistent-world-shell-"];if(g===null)throw new Error("Prototype catalog root was not found.");O();const E=y(window.location.search);E!==null?window.location.replace(o(E,"/game/",window.location.search)):(w(g),I(g));function u(){const e=d.find(a=>a.status==="latest")??d[0];if(e===void 0)throw new Error("F.R.A.M. catalog requires a playable build.");return e}function w(e){const a=u(),i=o(a.id,"/game/");e.querySelector(".catalog-static__actions a:first-child")?.setAttribute("href",i);const r=e.querySelector(".catalog-static figure img");r!==null&&(r.src=`/game/catalog/${a.id}.jpg`,r.alt=`${a.title} の実画面`);const s=e.querySelector(".catalog-static figcaption");s!==null&&(s.textContent=`LATEST PLAYABLE / ${a.id.toUpperCase()} — 現在のゲーム画面`)}async function I(e){try{await $(()=>Promise.resolve({}),__vite__mapDeps([0])),C(e),P(e)}catch(a){console.error("F.R.A.M. catalog enhancement failed.",a)}}function C(e){const a=u(),i=h[0];if(a===void 0||i===void 0)throw new Error("F.R.A.M. catalog requires a playable build and a technical epoch.");e.className="prototype-catalog",e.dataset.releaseCount=String(d.length),e.dataset.epochCount=String(h.length),e.dataset.pipelineCaseCount=String(m.length);const r=o(a.id,"/game/"),s=`/game/catalog/${a.id}.jpg`,n=d.map((t,c)=>{const p=t.status==="latest",v=p?"LATEST / PLAYABLE":"ARCHIVE / PLAYABLE",A=p?"この版を遊ぶ":"保存版を遊ぶ",b=`/game/catalog/${t.id}.jpg`;return`
      <article class="release-card ${p?"release-card--latest":""}" data-release="${t.id}">
        <div class="release-card__visual">
          <img
            data-deferred-src="${b}"
            alt="${t.title} のプレイ画面"
            width="720"
            height="405"
            loading="lazy"
            decoding="async"
          />
          <span class="release-card__index">${String(c+1).padStart(2,"0")}</span>
          <span class="release-card__status">${v}</span>
        </div>
        <div class="release-card__body">
          <span class="release-card__id">${t.id.toUpperCase()}</span>
          <h3>${t.title}</h3>
          <p>${t.summary}</p>
          <a class="text-link" href="${o(t.id,"/game/")}">
            <span>${A}</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `}).join(""),l=h.map(t=>{const c=`/game/catalog/${t.id}.jpg`;return`
      <article class="epoch-card" data-epoch="${t.id}">
        <div class="epoch-card__visual">
          <img
            data-deferred-src="${c}"
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
          <p>${t.summary}</p>
          <a class="text-link text-link--gold" href="${L(t,"/game/")}">
            <span>F-01を操作する</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `}).join(""),f=m.map(t=>{const c=`/game/catalog/${t.id}.jpg`;return`
      <article class="epoch-card pipeline-case-card" data-pipeline-case="${t.id}">
        <div class="epoch-card__visual">
          <img
            data-deferred-src="${c}"
            alt="${t.title} の採択済み実画面"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
          />
          <span>PIPELINE CASE / NOT PLAYABLE</span>
        </div>
        <div class="epoch-card__body">
          <div class="epoch-card__meta"><span>${t.eyebrow}</span><span>RUNTIME UNMERGED / UNPUBLISHED</span></div>
          <h3>${t.title}</h3>
          <p>${t.summary}</p>
          <p class="pipeline-case-card__metrics">${t.metrics}</p>
          <a class="text-link text-link--gold" href="${R(t,"/game/")}">
            <span>生成事例を見る</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `}).join("");e.innerHTML=`
    <div class="catalog-atmosphere" aria-hidden="true"></div>
    <header class="catalog-hero" data-testid="catalog-hero">
      <div class="catalog-hero__copy">
        <span class="catalog-eyebrow">AI-NATIVE GAME DEVELOPMENT PROJECT</span>
        <p class="catalog-genre">AIとつくる、世界記憶型・放浪ハクスラ</p>
        <h1 class="catalog-public-title">F.R.A.M.</h1>
        <p class="catalog-fullname">F.R.A.M. / FRONTIER RELICS ARCHIVE MODULE <span>/ 辺境遺物記録モジュール</span></p>
        <p class="catalog-lede">自然に侵食された旧世界を放浪し、遺物を回収して装備と遠征を組み替える。帰還や選択の結果が次の旅と世界に残る、世界記憶型のアクションRPG。</p>
        <div class="catalog-actions">
          <a class="catalog-button catalog-button--primary" href="${r}"><span>最新版を遊ぶ</span><small>${a.id.toUpperCase()} / BROWSER PLAY</small></a>
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
        <a href="${r}" aria-label="最新版${a.id.toUpperCase()}を起動する"><span>PLAY</span><b>▶</b></a>
      </figure>
    </header>

    <main class="catalog-main" data-testid="prototype-catalog">
      <section class="research-statement" aria-labelledby="research-heading">
        <span class="section-index">00 / AI-NATIVE</span>
        <div>
          <h2 id="research-heading">ゲームをつくる。<br><em>ゲームを生成する仕組み</em>もつくる。</h2>
          <p>『F.R.A.M.』は、世界、人物、遺物、物語を共通の法則から生成し、遊べる形へ組み上げる開発研究です。AIの案をそのまま並べるのではなく、人の試遊と判断でゲームへ鍛え直します。</p>
        </div>
        <a href="#experiments">HOW WE BUILD <span>↓</span></a>
      </section>

      <section class="release-section" id="playable" aria-labelledby="release-heading">
        <div class="collection-heading">
          <div><span>PLAYABLE BUILDS / 公開試作</span><h2 id="release-heading">F.R.A.M.を遊ぶ</h2></div>
          <p>各版は、その時点の操作、戦闘、画面表現を残したプレイアブル版です。最新版と過去版を、ブラウザですぐ比較できます。</p>
        </div>
        <div class="release-list" aria-label="公開プロトタイプ一覧">${n}</div>
      </section>

      <section class="epoch-section" id="experiments" aria-labelledby="epoch-heading">
        <div class="collection-heading collection-heading--epoch">
          <div><span>TECHNICAL EPOCHS / 技術エポック</span><h2 id="epoch-heading">遊べるAI開発実験</h2></div>
          <p>操作できる技術実験と、まだruntimeへ統合していない生成パイプライン事例を明確に分けて記録します。</p>
        </div>
        <div class="experiment-group" aria-labelledby="playable-epoch-heading">
          <h3 id="playable-epoch-heading">PLAYABLE TECHNICAL EPOCH</h3>
          <div class="epoch-list">${l}</div>
        </div>
        <div class="experiment-group" aria-labelledby="pipeline-case-heading">
          <h3 id="pipeline-case-heading">PIPELINE CASES / NOT PLAYABLE</h3>
          <div class="epoch-list">${f}</div>
        </div>
      </section>
    </main>

    <footer class="catalog-footer">
      <span>F.R.A.M. / DEVELOPMENT PROTOTYPE</span>
      <span>OVERGROWN CITY · RELIC HUNTING · WORLD MEMORY</span>
      <span>© T-OMORI-LAB</span>
    </footer>
  `}function P(e){const a=Array.from(e.querySelectorAll("img[data-deferred-src]")),i=s=>{const n=s.dataset.deferredSrc;n!==void 0&&(s.addEventListener("load",()=>s.classList.add("is-loaded"),{once:!0}),s.src=n,s.removeAttribute("data-deferred-src"))};if(!("IntersectionObserver"in window)){a.forEach(i);return}const r=new IntersectionObserver(s=>{for(const n of s){if(!n.isIntersecting)continue;const l=n.target;r.unobserve(l),i(l)}},{rootMargin:"220px 0px",threshold:.01});a.forEach(s=>r.observe(s))}async function O(){try{if("serviceWorker"in navigator&&await(await navigator.serviceWorker.getRegistration("/game/"))?.unregister(),"caches"in window){const e=await window.caches.keys();await Promise.all(e.filter(a=>_.some(i=>a.startsWith(i))).map(a=>window.caches.delete(a)))}}catch(e){console.warn("F.R.A.M. catalog cache retirement failed.",e)}}
