import{r as p,c as n,P as r}from"./prototypeRoutes-VfY_VqqW.js";const o=document.querySelector("#app");if(o===null)throw new Error("Prototype catalog root was not found.");const t=p(window.location.search),g=new URLSearchParams(window.location.search).get("prototype");if(t!==null)window.location.replace(n(t,"/game/",window.location.search));else if(g==="0.1"){const e="/game/".endsWith("/")?"/game/":"/game//";window.location.replace(`${e}r01/${window.location.search}`)}else h(o),v();function h(e){e.className="prototype-catalog",e.dataset.releaseCount=String(r.length);const i=r.map((a,l)=>{const s=a.status==="latest",c=s?"LATEST / PLAYABLE":"ARCHIVE / PLAYABLE",d=s?"最新試作を起動":"保存版を起動";return`
      <article class="release-card ${s?"release-card--latest":""}" data-release="${a.id}">
        <div class="release-card__visual" aria-hidden="true">
          <span class="release-card__index">0${l+1}</span>
        </div>
        <div class="release-card__body">
          <div class="release-card__meta">
            <span>${a.id.toUpperCase()}</span>
            <span>${c}</span>
          </div>
          <h2>${a.title}</h2>
          <p>${a.summary}</p>
          <a class="release-card__link" href="${n(a.id,"/game/")}">
            <span>${d}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `}).join("");e.innerHTML=`
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
          <span class="catalog-intro__number">${String(r.length).padStart(2,"0")}</span>
          <span>PLAYABLE<br>REVISIONS</span>
        </div>
        <p id="catalog-heading">過去の感触を失わず、世界の法則と表現を一段ずつ積み上げるための公開記録。</p>
      </section>
      <section class="release-list" aria-label="公開プロトタイプ一覧">
        ${i}
      </section>
    </main>
    <footer class="catalog-footer">
      <span>FIXED CAMERA · AI-NATIVE WORLD · 2.5D HYBRID</span>
      <span>© T-OMORI-LAB</span>
    </footer>
  `}function v(){"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/game/sw.js")})}
