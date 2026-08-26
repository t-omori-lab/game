const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/catalog-oM4iiSgg.css"])))=>i.map(i=>d[i]);
import{_ as b}from"./preload-helper-CeUGa9z8.js";import{a as y,c as o,P as d}from"./prototypeRoutes-D9gehOQ0.js";const p=[{id:"f01",eyebrow:"CHARACTER FORGE / 2026-08-02",title:"F-01 / Image-to-3D Character Forge",summary:"一枚絵だった主人公を、どの方向から見ても崩れずに動く高密度ボクセルモデルへ。髪、衣装、装備を組み替えられる制作法の最初の形です。",review:"USER REVIEW · APPROX. 70%",path:"forge/f01/"}];function _(t,a){return`${a.endsWith("/")?a:`${a}/`}${t.path}`}const m=[{id:"waf-01",eyebrow:"WORLD ASSET FORGE / 2026-08-14",title:"WAF-01 / 雨水管制塔の生成パイプライン",summary:"建物の意味と配置を保ったまま、BlenderとGeometry Nodesから視覚・衝突・遮蔽用の出力を組み立てる制作事例です。採択済み実画面のみを記録し、runtimeは未統合・未公開のまま保持します。",status:"not-playable",path:"experiments/waf-01/",candidateCommit:"9fb4eed4e55067813c4aa164622a0cb1c7fe1e94",metrics:"830,684 bytes · 3,454 triangles · 7 draws · 5 materials · 512px atlas"}];function L(t,a){return`${a.endsWith("/")?a:`${a}/`}${t.path}`}const h=document.querySelector("#app"),w=["fram-catalog-","relic-frontier-shell-","small-persistent-world-shell-"];if(h===null)throw new Error("Prototype catalog root was not found.");I();const E=y(window.location.search);E!==null?window.location.replace(o(E,"/game/",window.location.search)):(R(h),P(h));function u(){const t=d.find(a=>a.status==="latest")??d[0];if(t===void 0)throw new Error("F.R.A.M. catalog requires a playable build.");return t}function R(t){const a=u(),i=o(a.id,"/game/");t.querySelector(".catalog-static__actions a:first-child")?.setAttribute("href",i);const r=t.querySelector(".catalog-static figure img");r!==null&&(r.src=`/game/catalog/${a.id}.jpg`,r.alt=`${a.title} の実画面`);const s=t.querySelector(".catalog-static figcaption");s!==null&&(s.textContent=`LATEST PLAYABLE / ${a.id.toUpperCase()} — 現在のゲーム画面`)}async function P(t){try{await b(()=>Promise.resolve({}),__vite__mapDeps([0])),T(t),C(t)}catch(a){console.error("F.R.A.M. catalog enhancement failed.",a)}}function T(t){const a=u(),i=p[0];if(a===void 0||i===void 0)throw new Error("F.R.A.M. catalog requires a playable build and a technical epoch.");t.className="prototype-catalog",t.dataset.releaseCount=String(d.length),t.dataset.epochCount=String(p.length),t.dataset.pipelineCaseCount=String(m.length);const r=o(a.id,"/game/"),s=`/game/catalog/${a.id}.jpg`,c=d.map((e,n)=>{const g=e.status==="latest",v=g?"LATEST / PLAYABLE":"ARCHIVE / PLAYABLE",A=`/game/catalog/${e.id}.jpg`;return`
      <article class="release-card ${g?"release-card--latest":""}" data-release="${e.id}">
        <div class="release-card__visual">
          <img
            data-deferred-src="${A}"
            alt="${e.title} のプレイ画面"
            width="720"
            height="405"
            loading="lazy"
            decoding="async"
          />
          <span class="release-card__index">${String(n+1).padStart(2,"0")}</span>
          <span class="release-card__status">${v}</span>
        </div>
        <div class="release-card__body">
          <span class="release-card__id">${e.id.toUpperCase()}</span>
          <h3>${e.title}</h3>
          <p class="release-card__summary">${e.summary}</p>
          <div class="release-card__changes">
            <span>この版で試したこと</span>
            <ul>${e.changes.map($=>`<li>${$}</li>`).join("")}</ul>
          </div>
          <p class="release-card__playable"><span>遊べる内容</span>${e.playable}</p>
          <a class="release-card__action" href="${o(e.id,"/game/")}">${e.id.toUpperCase()}を遊ぶ</a>
        </div>
      </article>
    `}).join(""),l=p.map(e=>{const n=`/game/catalog/${e.id}.jpg`;return`
      <article class="epoch-card" data-epoch="${e.id}">
        <div class="epoch-card__visual">
          <img
            data-deferred-src="${n}"
            alt="${e.title} のリアルタイム3D画面"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
          />
          <span>TECHNICAL EPOCH 01</span>
        </div>
        <div class="epoch-card__body">
          <div class="epoch-card__meta"><span>${e.eyebrow}</span><span>${e.review}</span></div>
          <h3>${e.title}</h3>
          <p>${e.summary}</p>
          <a class="text-link text-link--gold" href="${_(e,"/game/")}">
            <span>F-01を操作する</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `}).join(""),f=m.map(e=>{const n=`/game/catalog/${e.id}.jpg`;return`
      <article class="epoch-card pipeline-case-card" data-pipeline-case="${e.id}">
        <div class="epoch-card__visual">
          <img
            data-deferred-src="${n}"
            alt="${e.title} の採択済み実画面"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
          />
          <span>PIPELINE CASE / NOT PLAYABLE</span>
        </div>
        <div class="epoch-card__body">
          <div class="epoch-card__meta"><span>${e.eyebrow}</span><span>RUNTIME UNMERGED / UNPUBLISHED</span></div>
          <h3>${e.title}</h3>
          <p>${e.summary}</p>
          <p class="pipeline-case-card__metrics">${e.metrics}</p>
          <a class="text-link text-link--gold" href="${L(e,"/game/")}">
            <span>生成事例を見る</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `}).join("");t.innerHTML=`
    <div class="catalog-atmosphere" aria-hidden="true"></div>
    <header class="catalog-hero" data-testid="catalog-hero">
      <div class="catalog-hero__copy">
        <span class="catalog-eyebrow">AI-AGENT GAME DEVELOPMENT PROJECT</span>
        <p class="catalog-genre">遺物を集め、装備を組み替え、廃都を歩くアクションRPG。</p>
        <h1 class="catalog-public-title">F.R.A.M.</h1>
        <p class="catalog-fullname">F.R.A.M. / FRONTIER RELICS ARCHIVE MODULE</p>
        <p class="catalog-lede">自然に侵食された旧世界を探索し、敵と戦い、遺物を持ち帰る。遠征で得たものと選択が、次の旅と世界に残る。</p>
        <div class="catalog-actions">
          <a class="catalog-button catalog-button--primary" href="${r}"><span>${a.id.toUpperCase()}を遊ぶ</span><small>BROWSER PLAY</small></a>
          <a class="catalog-button catalog-button--secondary" href="#experiments"><span>開発の試作を見る</span><small>CHARACTER / WORLD GENERATION</small></a>
        </div>
        <ul class="catalog-pillars" aria-label="ゲームの特徴">
          <li><b>01</b><span>探索と放浪<br>自然に侵食された旧世界を歩く</span></li>
          <li><b>02</b><span>遺物と装備<br>回収した遺物で戦い方を組み替える</span></li>
          <li><b>03</b><span>遠征の結果<br>持ち帰ったものと選択が次の旅に残る</span></li>
        </ul>
      </div>
      <figure class="catalog-hero__visual">
        <img src="${s}" alt="${a.title} の実画面" width="720" height="405" fetchpriority="high" decoding="async" />
        <figcaption><span><i></i> LATEST PLAYABLE / ${a.id.toUpperCase()}</span><b>現在のゲーム画面</b></figcaption>
        <a href="${r}" aria-label="${a.id.toUpperCase()}を起動する"><span>${a.id.toUpperCase()}を遊ぶ</span></a>
      </figure>
    </header>

    <main class="catalog-main" data-testid="prototype-catalog">
      <section class="research-statement" aria-labelledby="research-heading">
        <span class="section-index">DEVELOPMENT NOTES</span>
        <div>
          <h2 id="research-heading">つくって、遊んで、<br><em>選び直す。</em></h2>
          <p>AIエージェントがつくった実装候補を、実際に遊べる形で確かめる。手応え、操作、景観、遊びの流れを見ながら、採用・修正・見送りを重ねて、F.R.A.M.を開発している。</p>
        </div>
        <a href="#experiments">開発の試作を見る <span>↓</span></a>
      </section>

      <section class="release-section" id="playable" aria-labelledby="release-heading">
        <div class="collection-heading">
          <div><span>PUBLIC BUILDS / 遊べるバージョン</span><h2 id="release-heading">公開版を遊ぶ</h2></div>
          <p>各Rは、その時点で遊べた試作を残したものです。最新版から過去版へ、何を試し、何を変えてきたかを比べられます。</p>
        </div>
        <div class="release-list" aria-label="公開プロトタイプ一覧">${c}</div>
      </section>

      <section class="epoch-section" id="experiments" aria-labelledby="epoch-heading">
        <div class="collection-heading collection-heading--epoch">
          <div><span>AI DEVELOPMENT EXPERIMENTS</span><h2 id="epoch-heading">AI開発の試作</h2></div>
          <p>実際に操作できる試作と、まだゲーム本体へ入っていない生成パイプラインの事例を分けて記録しています。</p>
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
      <span>EXPLORE · FIGHT · RETURN</span>
      <span>© T-OMORI-LAB</span>
    </footer>
  `}function C(t){const a=Array.from(t.querySelectorAll("img[data-deferred-src]")),i=s=>{const c=s.dataset.deferredSrc;c!==void 0&&(s.addEventListener("load",()=>s.classList.add("is-loaded"),{once:!0}),s.src=c,s.removeAttribute("data-deferred-src"))};if(!("IntersectionObserver"in window)){a.forEach(i);return}const r=new IntersectionObserver(s=>{for(const c of s){if(!c.isIntersecting)continue;const l=c.target;r.unobserve(l),i(l)}},{rootMargin:"220px 0px",threshold:.01});a.forEach(s=>r.observe(s))}async function I(){try{if("serviceWorker"in navigator&&await(await navigator.serviceWorker.getRegistration("/game/"))?.unregister(),"caches"in window){const t=await window.caches.keys();await Promise.all(t.filter(a=>w.some(i=>a.startsWith(i))).map(a=>window.caches.delete(a)))}}catch(t){console.warn("F.R.A.M. catalog cache retirement failed.",t)}}
