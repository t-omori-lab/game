const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/catalog-oM4iiSgg.css"])))=>i.map(i=>d[i]);
import{_ as y}from"./preload-helper-CeUGa9z8.js";import{a as L,c as n,P as p,V as m}from"./prototypeRoutes-CToJXwVI.js";const g=[{id:"f01",eyebrow:"CHARACTER FORGE / 2026-08-02",title:"F-01 / Image-to-3D Character Forge",summary:"一枚絵だった主人公を、どの方向から見ても崩れずに動く高密度ボクセルモデルへ。髪、衣装、装備を組み替えられる制作法の最初の形です。",review:"USER REVIEW · APPROX. 70%",path:"forge/f01/"}];function R(s,e){return`${e.endsWith("/")?e:`${e}/`}${s.path}`}const u=[{id:"waf-01",eyebrow:"WORLD ASSET FORGE / 2026-08-14",title:"WAF-01 / 雨水管制塔の生成パイプライン",summary:"建物の意味と配置を保ったまま、BlenderとGeometry Nodesから視覚・衝突・遮蔽用の出力を組み立てる制作事例です。採択済み実画面のみを記録し、runtimeは未統合・未公開のまま保持します。",status:"not-playable",path:"experiments/waf-01/",candidateCommit:"9fb4eed4e55067813c4aa164622a0cb1c7fe1e94",metrics:"830,684 bytes · 3,454 triangles · 7 draws · 5 materials · 512px atlas"}];function C(s,e){return`${e.endsWith("/")?e:`${e}/`}${s.path}`}const v=document.querySelector("#app"),w=["fram-catalog-","relic-frontier-shell-","small-persistent-world-shell-"];if(v===null)throw new Error("Prototype catalog root was not found.");O();const E=L(window.location.search);E!==null?window.location.replace(n(E,"/game/",window.location.search)):(P(v),T(v));function f(){const s=p.find(e=>e.status==="latest")??p[0];if(s===void 0)throw new Error("F.R.A.M. catalog requires a playable build.");return s}function P(s){const e=f(),i=n(e.id,"/game/");s.querySelector(".catalog-static__actions a:first-child")?.setAttribute("href",i);const r=s.querySelector(".catalog-static figure img");r!==null&&(r.src=`/game/catalog/${e.id}.jpg`,r.alt=`${e.title} の実画面`);const t=s.querySelector(".catalog-static figcaption");t!==null&&(t.textContent=`LATEST PLAYABLE / ${e.id.toUpperCase()} — 現在のゲーム画面`)}async function T(s){try{await y(()=>Promise.resolve({}),__vite__mapDeps([0])),S(s),I(s)}catch(e){console.error("F.R.A.M. catalog enhancement failed.",e)}}function S(s){const e=f(),i=g[0];if(e===void 0||i===void 0)throw new Error("F.R.A.M. catalog requires a playable build and a technical epoch.");s.className="prototype-catalog",s.dataset.releaseCount=String(p.length),s.dataset.visualArchiveCount=String(m.length),s.dataset.epochCount=String(g.length),s.dataset.pipelineCaseCount=String(u.length);const r=n(e.id,"/game/"),t=`/game/catalog/${e.id}.jpg`,c=p.map((a,l)=>{const o=a.status==="latest",h=o?"LATEST / PLAYABLE":"ARCHIVE / PLAYABLE",A=`/game/catalog/${a.id}.jpg`;return`
      <article class="release-card ${o?"release-card--latest":""}" data-release="${a.id}">
        <div class="release-card__visual">
          <img
            data-deferred-src="${A}"
            alt="${a.title} のプレイ画面"
            width="720"
            height="405"
            loading="lazy"
            decoding="async"
          />
          <span class="release-card__index">${String(l+1).padStart(2,"0")}</span>
          <span class="release-card__status">${h}</span>
        </div>
        <div class="release-card__body">
          <span class="release-card__id">${a.id.toUpperCase()}</span>
          <h3>${a.title}</h3>
          <p class="release-card__summary">${a.summary}</p>
          <div class="release-card__changes">
            <span>この版で試したこと</span>
            <ul>${a.changes.map(b=>`<li>${b}</li>`).join("")}</ul>
          </div>
          <p class="release-card__playable"><span>遊べる内容</span>${a.playable}</p>
          <a class="release-card__action" href="${n(a.id,"/game/")}">${a.id.toUpperCase()}を遊ぶ</a>
        </div>
      </article>
    `}).join(""),d=m.map((a,l)=>{const o=`/game/catalog/${a.id}.jpg`;return`
      <article class="release-card release-card--visual-archive" data-visual-archive="${a.id}">
        <div class="release-card__visual">
          <img
            data-deferred-src="${o}"
            alt="${a.id.toUpperCase()}の人物表現を確認するゲーム画面"
            width="720"
            height="405"
            loading="lazy"
            decoding="async"
          />
          <span class="release-card__index">${String(l+1).padStart(2,"0")}</span>
          <span class="release-card__status">CHARACTER STUDY</span>
        </div>
        <div class="release-card__body">
          <span class="release-card__id">${a.id.toUpperCase()}</span>
          <h3>${a.title}</h3>
          <p class="release-card__summary">${a.summary}</p>
          <div class="release-card__changes">
            <span>この版で試したこと</span>
            <ul>${a.changes.map(h=>`<li>${h}</li>`).join("")}</ul>
          </div>
          <a class="release-card__action release-card__action--archive" href="${n(a.id,"/game/")}">${a.linkLabel}</a>
        </div>
      </article>
    `}).join(""),$=g.map(a=>{const l=`/game/catalog/${a.id}.jpg`;return`
      <article class="epoch-card" data-epoch="${a.id}">
        <div class="epoch-card__visual">
          <img
            data-deferred-src="${l}"
            alt="${a.title} のリアルタイム3D画面"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
          />
          <span>TECHNICAL EPOCH 01</span>
        </div>
        <div class="epoch-card__body">
          <div class="epoch-card__meta"><span>${a.eyebrow}</span><span>${a.review}</span></div>
          <h3>${a.title}</h3>
          <p>${a.summary}</p>
          <a class="text-link text-link--gold" href="${R(a,"/game/")}">
            <span>F-01を操作する</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `}).join(""),_=u.map(a=>{const l=`/game/catalog/${a.id}.jpg`;return`
      <article class="epoch-card pipeline-case-card" data-pipeline-case="${a.id}">
        <div class="epoch-card__visual">
          <img
            data-deferred-src="${l}"
            alt="${a.title} の採択済み実画面"
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
          />
          <span>PIPELINE CASE / NOT PLAYABLE</span>
        </div>
        <div class="epoch-card__body">
          <div class="epoch-card__meta"><span>${a.eyebrow}</span><span>RUNTIME UNMERGED / UNPUBLISHED</span></div>
          <h3>${a.title}</h3>
          <p>${a.summary}</p>
          <p class="pipeline-case-card__metrics">${a.metrics}</p>
          <a class="text-link text-link--gold" href="${C(a,"/game/")}">
            <span>生成事例を見る</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `}).join("");s.innerHTML=`
    <div class="catalog-atmosphere" aria-hidden="true"></div>
    <header class="catalog-hero" data-testid="catalog-hero">
      <div class="catalog-hero__copy">
        <span class="catalog-eyebrow">AI-AGENT GAME DEVELOPMENT PROJECT</span>
        <p class="catalog-genre">遺物を集め、装備を組み替え、廃都を歩くアクションRPG。</p>
        <h1 class="catalog-public-title">F.R.A.M.</h1>
        <p class="catalog-fullname">F.R.A.M. / FRONTIER RELICS ARCHIVE MODULE</p>
        <p class="catalog-lede">自然に侵食された旧世界を探索し、敵と戦い、遺物を持ち帰る。遠征で得たものと選択が、次の旅と世界に残る。</p>
        <div class="catalog-actions">
          <a class="catalog-button catalog-button--primary" href="${r}"><span>${e.id.toUpperCase()}を遊ぶ</span><small>BROWSER PLAY</small></a>
          <a class="catalog-button catalog-button--secondary" href="#experiments"><span>開発の試作を見る</span><small>CHARACTER / WORLD GENERATION</small></a>
        </div>
        <ul class="catalog-pillars" aria-label="ゲームの特徴">
          <li><b>01</b><span>探索と放浪<br>自然に侵食された旧世界を歩く</span></li>
          <li><b>02</b><span>遺物と装備<br>回収した遺物で戦い方を組み替える</span></li>
          <li><b>03</b><span>遠征の結果<br>持ち帰ったものと選択が次の旅に残る</span></li>
        </ul>
      </div>
      <figure class="catalog-hero__visual">
        <img src="${t}" alt="${e.title} の実画面" width="720" height="405" fetchpriority="high" decoding="async" />
        <figcaption><span><i></i> LATEST PLAYABLE / ${e.id.toUpperCase()}</span><b>現在のゲーム画面</b></figcaption>
        <a href="${r}" aria-label="${e.id.toUpperCase()}を起動する"><span>${e.id.toUpperCase()}を遊ぶ</span></a>
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

      <section class="visual-archive-section" id="visual-archive" aria-labelledby="visual-archive-heading">
        <div class="collection-heading collection-heading--archive">
          <div><span>VISUAL DEVELOPMENT ARCHIVE / CHARACTER</span><h2 id="visual-archive-heading">人物表現の試作を比べる</h2></div>
          <p>R07とR08は、主人公を遠くから見ても表情と装備が読める存在にするまでの、比較用アーカイブです。</p>
        </div>
        <div class="release-list" aria-label="人物表現の比較アーカイブ">${d}</div>
      </section>

      <section class="epoch-section" id="experiments" aria-labelledby="epoch-heading">
        <div class="collection-heading collection-heading--epoch">
          <div><span>AI DEVELOPMENT EXPERIMENTS</span><h2 id="epoch-heading">AI開発の試作</h2></div>
          <p>実際に操作できる試作と、まだゲーム本体へ入っていない生成パイプラインの事例を分けて記録しています。</p>
        </div>
        <div class="experiment-group" aria-labelledby="playable-epoch-heading">
          <h3 id="playable-epoch-heading">PLAYABLE TECHNICAL EPOCH</h3>
          <div class="epoch-list">${$}</div>
        </div>
        <div class="experiment-group" aria-labelledby="pipeline-case-heading">
          <h3 id="pipeline-case-heading">PIPELINE CASES / NOT PLAYABLE</h3>
          <div class="epoch-list">${_}</div>
        </div>
      </section>
    </main>

    <footer class="catalog-footer">
      <span>F.R.A.M. / DEVELOPMENT PROTOTYPE</span>
      <span>EXPLORE · FIGHT · RETURN</span>
      <span>© T-OMORI-LAB</span>
    </footer>
  `}function I(s){const e=Array.from(s.querySelectorAll("img[data-deferred-src]")),i=t=>{const c=t.dataset.deferredSrc;c!==void 0&&(t.addEventListener("load",()=>t.classList.add("is-loaded"),{once:!0}),t.src=c,t.removeAttribute("data-deferred-src"))};if(!("IntersectionObserver"in window)){e.forEach(i);return}const r=new IntersectionObserver(t=>{for(const c of t){if(!c.isIntersecting)continue;const d=c.target;r.unobserve(d),i(d)}},{rootMargin:"220px 0px",threshold:.01});e.forEach(t=>r.observe(t))}async function O(){try{if("serviceWorker"in navigator&&await(await navigator.serviceWorker.getRegistration("/game/"))?.unregister(),"caches"in window){const s=await window.caches.keys();await Promise.all(s.filter(e=>w.some(i=>e.startsWith(i))).map(e=>window.caches.delete(e)))}}catch(s){console.warn("F.R.A.M. catalog cache retirement failed.",s)}}
