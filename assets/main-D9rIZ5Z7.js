/* empty css               */import{c as q}from"./storageBackend-C_GXSix6.js";import{p as A,R as J,q as X,r as V,t as I,D as O,u as tt,g as x,P as D,v as et,w as at,x as R,y as st,z as ot,A as w,B as it,E as rt,G as lt,H as nt,I as k,J as F,s as ct,K as dt,L as _,M as ut,N as ht}from"./index-WmeKSdIj.js";import{a as mt,c as pt,l as yt,s as ft}from"./loadR09HeroAsset-D2T7hOSy.js";const U="fram:commercial-menu:apply-runtime-quality",gt=s=>{if(!(s instanceof CustomEvent))return null;const e=s.detail;return e===null||typeof e!="object"||!A(e.quality)||e.restart!==!0?null:{quality:e.quality,restart:!0}},T=1,p=2,y="fram.character.f01.gameplay-bridge-v1",vt=[.85,1,1.15],C=.75,$=1.25,m=.05,Et="mobile-safe",St=["version","playerName","characterId","createdAt"],bt=["version","quality","cameraZoom"],Y=["version","quality"],H={"canopy-relay":"樹冠中継所","flooded-archive":"沈水資料庫"},Rt={"pathfinder-array":"経路観測列","relic-overdrive":"遺物過励器"},M={version:p,quality:"pc-ultra",cameraZoom:1};function wt(s,e=new Date){return{version:T,playerName:G(s),characterId:y,createdAt:e.toISOString()}}function Pt(s){if(!E(s,St)||s.version!==T||s.characterId!==y||typeof s.playerName!="string"||typeof s.createdAt!="string")return null;try{const e=G(s.playerName),t=s.createdAt;return $t(t)?{version:T,playerName:e,characterId:y,createdAt:t}:null}catch{return null}}function Lt(s){if(E(s,Y)&&s.version===1){const a=s.quality,o=a==="compatibility"?Et:a;return A(o)?{version:p,quality:o,cameraZoom:1}:null}if(!E(s,bt)||s.version!==p)return null;const e=s.quality;if(!A(e))return null;const t=s.cameraZoom;return Q(t)?{version:p,quality:e,cameraZoom:t}:null}function At(s){try{return Pt(JSON.parse(s))}catch{return null}}function Tt(s){try{const e=JSON.parse(s),t=Lt(e);return t===null?null:{settings:t,migratedFrom:E(e,Y)&&e.version===1?e.quality==="compatibility"?"compatibility":"settings-v1":null}}catch{return null}}function Q(s){return typeof s=="number"&&Number.isFinite(s)&&s>=C&&s<=$}function Mt(s){const e=Math.min($,Math.max(C,Number.isFinite(s)?s:1));return Math.round(e*100)/100}function Ct(s){const e=J[s.buildcraft.equippedBuildId],t=X(s.buildcraft),a=V(s.worldMemory),o=s.worldMemory.installedModule?.moduleId??null,i=s.worldMemory.claimedBaseSiteId;return{identity:{playerName:s.profile.playerName,characterLabel:"F-01",characterId:y},vitals:{hp:s.worldState.player.hp,maxHp:s.worldState.player.maxHp,healingItems:s.worldState.player.healingItems},equipment:{buildId:e.id,buildName:e.name,level:t.level,weaponLabel:e.weaponId==="blade"?"測量刃":"杭打機",salvage:s.buildcraft.salvage},relic:{label:"斥力環 R-17",damage:s.worldState.player.relicDamage,range:s.worldState.player.relicRange,resourceName:e.resource.name,resource:s.buildcraft.resource,resourceMaximum:t.resourceMaximum,cooldownTicks:s.worldState.player.relicCooldownTicks,cooldownMaximumTicks:s.worldState.player.relicCooldownMaxTicks},world:{expeditionCount:s.worldMemory.expeditionHistory.length,discoveredSiteLabels:s.worldMemory.discoveredSites.map(r=>H[r.siteId]),recoveredAvailable:s.worldMemory.recoveredItems.filter(r=>r.status==="available").length,recoveredConsumed:s.worldMemory.recoveredItems.filter(r=>r.status==="consumed").length,baseLabel:i===null?"未確保":H[i],moduleLabel:o===null?"未設置":Rt[o],effectLines:[a.routeOverlay?"経路オーバーレイ 有効":"経路オーバーレイ 無効",`探索速度 ×${a.explorationSpeedMultiplier.toFixed(2)}`,a.relicAura?"遺物オーラ 有効":"遺物オーラ 無効",`大技再使用 ×${a.relicCooldownMultiplier.toFixed(2)}`]}}}function G(s){const e=s.trim().replace(/\s+/gu," "),t=Array.from(e).length;if(t<1||t>24||/[\u0000-\u001f\u007f]/u.test(e))throw new TypeError("Player name must be 1-24 visible characters.");return e}function E(s,e){if(typeof s!="object"||s===null||Array.isArray(s))return!1;const t=Object.keys(s).sort();return t.length===e.length&&[...e].sort().every((a,o)=>t[o]===a)}function $t(s){const e=Date.parse(s);return Number.isFinite(e)&&new Date(e).toISOString()===s}const W=["account","save","core-data","visual-pack","playable"];class z extends Error{constructor(e,t,a){super(t,a),this.phase=e,this.name="ProductShellLoadError"}phase}async function Nt(s,e=()=>{}){for(const n of W)e({phase:n,state:"pending",detail:"待機中"});const t=await f("account",s.loadAccount,e),a=await f("save",s.loadSave,e),o=await f("core-data",()=>s.loadCoreData(a.value),e),i=await f("visual-pack",s.loadVisualPack,e),r={local:t.value,memory:a.value,core:o.value,heroAssetRequest:i.value};return await f("playable",()=>s.verifyPlayable(r),e),r}async function f(s,e,t){t({phase:s,state:"active",detail:"読み込み中"});try{const a=await e();return t({phase:s,state:a.fallback===!0?"fallback":"complete",detail:a.detail}),a}catch(a){const o=a instanceof Error?a.message:"不明な読み込み失敗";throw t({phase:s,state:"failed",detail:o}),new z(s,`${s} phase failed: ${o}`,{cause:a})}}const B="fram-product-shell.profile-v1",P="fram-product-shell.settings-v1";class qt{constructor(e){this.storage=e}storage;async load(){const[e,t]=await Promise.all([this.storage.get(B),this.storage.get(P)]),a=e===null?null:At(e),o=t===null?null:Tt(t),i=o?.settings??M;return o!==null&&o.migratedFrom!==null&&await this.storage.set(P,JSON.stringify(i)),{profile:a,profileSource:e===null?"empty":a===null?"invalid-fallback":"loaded",settings:i,settingsSource:t===null?"empty":o===null?"invalid-fallback":o.migratedFrom!==null?"migrated":"loaded"}}async saveProfile(e){await this.storage.set(B,JSON.stringify(e))}async saveSettings(e){await this.storage.set(P,JSON.stringify(e))}}const It="fram-product-shell-local-v1",Ot="fram-r09-player-local-v1",xt="world-memory",Z={account:"LOCAL PROFILE",save:"WORLD MEMORY","core-data":"R10 CORE DATA","visual-pack":"F-01 VISUAL PACK",playable:"PLAYABLE LINK"};class Dt{constructor(e,t=window.location.search){this.root=e,this.search=t,window.addEventListener(U,this.runtimeQualityHandler),window.addEventListener(I,this.presentationPreferencesHandler)}root;search;screen="loading";context=null;localRepository=null;worldRepository=null;profilePersistence="memory";worldPersistence="memory";application=null;runtimeZoomCleanup=[];sessionWorld=null;sessionMemory=null;sessionBuildcraft=null;loadUpdates=new Map;failedPhase=null;injectedFailures=new Set;qualitySelectionProvenance="route-default";presentationPreferences=O;runtimeQualityHandler=e=>{const t=gt(e);t===null||this.screen!=="game"||this.applyRuntimeQuality(t.quality)};presentationPreferencesHandler=e=>{const t=tt(e);t===null||this.screen!=="game"||this.applyPresentationPreferences(t)};async boot(){this.screen="loading",this.failedPhase=null,this.context=null,this.sessionWorld=null,this.sessionMemory=null,this.sessionBuildcraft=null,this.qualitySelectionProvenance="route-default",this.presentationPreferences=O,this.loadUpdates.clear(),this.syncRootDataset(),this.renderLoading();const e=x(D).seed;try{this.context=await Nt({loadAccount:async()=>{this.failInjectedPhase("account");const t=await q({databaseName:It,storeName:"product-shell"});this.profilePersistence=t.backend.persistence,this.localRepository=new qt(t.backend);const a=await this.localRepository.load(),o=this.useFirstUseDeviceRecommendation(),i=R(window),r=st({settings:a.settings,settingsSource:a.settingsSource,recommendationEnabled:o,signals:i}),n=this.readPresentationPreferences();this.presentationPreferences=n??ot(a.settings,a.settingsSource);const c=n===null&&a.settingsSource==="empty"?r.settings.quality:w(this.presentationPreferences.quality,i);this.qualitySelectionProvenance=this.presentationPreferences.quality==="auto"?"route-default":"saved-manual";const l={...a,settings:{...r.settings,quality:c}},d=t.persistence==="memory"||l.profileSource==="invalid-fallback"||a.settingsSource==="invalid-fallback";return{value:l,fallback:d,detail:d?"保存できない場合はこのtab内で継続":l.profile===null?"初回profileの作成待ち":`${l.profile.playerName} / local profile`}},loadSave:async()=>{this.failInjectedPhase("save");const t=await q({databaseName:Ot,storeName:xt});this.worldPersistence=t.backend.persistence,this.worldRepository=pt(t.backend);const a=await yt(this.worldRepository,e),o=t.persistence==="memory"||a.source==="corrupt-fallback"||a.source==="seed-mismatch-fallback";return{value:a,fallback:o,detail:`${a.source} / ${a.state.expeditionHistory.length} expedition`}},loadCoreData:async t=>{this.failInjectedPhase("core-data");const a=et(),o=V(t.state);return{value:{worldState:at(x(D),a,o.relicCooldownMultiplier),buildcraft:a},detail:`${a.equippedBuildId} / WorldMemory v${t.state.version}`}},loadVisualPack:async()=>{this.failInjectedPhase("visual-pack");const t=await mt(this.search);return{value:t,fallback:t.status!=="loaded",detail:t.status==="loaded"?"canonical F-01 loaded":`${t.status} / built-in actor fallback`}},verifyPlayable:async t=>{if(this.failInjectedPhase("playable"),t.memory.state.version!==1||t.core.buildcraft.schemaVersion!==1||t.core.worldState.saveVersion!==1)throw new Error("対応していないlocal state versionです。");return{value:!0,detail:"R09 memory → R10 playable link ready"}}},t=>{this.loadUpdates.set(t.phase,t),this.renderLoading()}),this.screen="title",this.syncRootDataset(),this.renderTitle()}catch(t){this.failedPhase=t instanceof z?t.phase:null,this.screen="error",this.syncRootDataset(),this.renderError(t)}}destroy(){window.removeEventListener(U,this.runtimeQualityHandler),window.removeEventListener(I,this.presentationPreferencesHandler),this.clearRuntimeZoomControls(),this.application?.destroy(),this.application=null}renderLoading(){this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--loading" aria-labelledby="shell-loading-title">
        ${this.brandRail("BOOT / LOCAL PRODUCT CELL")}
        <div class="shell-loading-card">
          <span class="shell-kicker">F.R.A.M. / SYSTEM LINK</span>
          <h1 id="shell-loading-title">Loading the next expedition.</h1>
          <p>profile、R09 world memory、R10 rules、F-01 packを別々に確認します。</p>
          <ol class="shell-load-list">
            ${W.map((e,t)=>{const a=this.loadUpdates.get(e)??{state:"pending",detail:"待機中"};return`
                <li data-load-phase="${e}" data-load-state="${a.state}">
                  <b>${String(t+1).padStart(2,"0")}</b>
                  <span><strong>${Z[e]}</strong><small>${h(a.detail)}</small></span>
                  <i>${Ft(a.state)}</i>
                </li>
              `}).join("")}
          </ol>
        </div>
      </section>
    `}renderTitle(e=""){const a=this.requireContext().local.profile,o=this.currentMemory(),i=o.expeditionHistory.length>0;this.screen="title",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--title" aria-labelledby="shell-title">
        ${this.brandRail("LOCAL / OFFLINE AUTHORITY")}
        <header class="shell-title-copy">
          <span class="shell-kicker">F.R.A.M. / FRONTIER RELICS ARCHIVE MODULE / 辺境遺物記録モジュール</span>
          <h1 id="shell-title" style="font-size:clamp(34px,7vw,96px);line-height:.9">F.R.A.M.</h1>
          <p>水と機械が動き、人の暮らしが続く廃都を渡る。<br />記録に残るのは、選んだ場所と、持ち帰った理由だ。</p>
        </header>
        <div class="shell-title-grid">
          <section class="shell-world-card" aria-label="現在のworld memory">
            <span>CURRENT WORLD / R09 MEMORY</span>
            <strong>${String(o.expeditionHistory.length).padStart(2,"0")} EXPEDITIONS</strong>
            <p>${kt(o)}</p>
            <div><i data-state="${this.worldPersistence}"></i>${this.worldPersistence==="indexeddb"?"IndexedDB / local authority":"Memory fallback / this tab only"}</div>
          </section>
          <nav class="shell-primary-actions" aria-label="Product Shell menu">
            ${a===null?`
              <button type="button" class="shell-action shell-action--primary" data-action="profile">
                <span>01 / FIRST USE</span><strong>Local profileを作る</strong><small>player nameとF-01 identityを分けて保存</small>
              </button>
            `:`
              <button type="button" class="shell-action shell-action--primary" data-action="continue" ${i?"":"disabled"}>
                <span>01 / CONTINUE</span><strong>Continue</strong><small>${i?`遠征 ${o.expeditionHistory.length+1} へ`:"まだ帰還記録はありません"}</small>
              </button>
              <button type="button" class="shell-action" data-action="new-expedition">
                <span>02 / NEW RUN</span><strong>New Expedition</strong><small>world memoryを保ったまま現在遠征を新規化</small>
              </button>
              <button type="button" class="shell-action" data-action="status">
                <span>03 / LIVE DATA</span><strong>Status</strong><small>HP、装備、遺物、module効果</small>
              </button>
              <button type="button" class="shell-action" data-action="settings">
                <span>04 / LOCAL</span><strong>Settings</strong><small>品質とFPS目標を独立設定</small>
              </button>
            `}
          </nav>
        </div>
        <footer class="shell-profile-strip">
          <span>LOCAL PROFILE</span>
          <strong>${a===null?"NOT SET":h(a.playerName)}</strong>
          <small>${a===null?"Google accountは未接続":`F-01 / ${y}`}</small>
          ${a===null?"":'<button type="button" data-action="profile">EDIT NAME</button>'}
        </footer>
        ${e===""?"":`<p class="shell-message" role="status">${h(e)}</p>`}
      </section>
    `,this.bind("profile",()=>this.renderProfile()),this.bind("continue",()=>this.launchGame("continue")),this.bind("new-expedition",()=>this.launchGame("new-expedition")),this.bind("status",()=>this.renderStatus()),this.bind("settings",()=>this.renderSettings())}renderProfile(){const e=this.requireContext().local.profile;this.screen="profile",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--form" aria-labelledby="profile-title">
        ${this.brandRail("PROFILE / LOCAL DEVICE")}
        <form class="shell-form" data-form="profile">
          <span class="shell-kicker">FIRST USE / PLAYER NAME</span>
          <h1 id="profile-title">名前を入力してください</h1>
          <p>この名前はゲーム中の主人公HUDと記録に表示されます。主人公の識別名 <b>F-01</b> は変わりません。</p>
          <label>
            <span>名前</span>
            <input name="playerName" type="text" minlength="1" maxlength="24" autocomplete="nickname" aria-label="PLAYER NAME" value="${e===null?"":h(e.playerName)}" required autofocus />
          </label>
          <dl class="shell-identity-lock">
            <div><dt>ACCOUNT</dt><dd>Local device / offline</dd></div>
            <div><dt>CHARACTER</dt><dd>F-01</dd></div>
            <div><dt>ASSET ID</dt><dd>${y}</dd></div>
          </dl>
          <p class="shell-form-error" data-error role="alert"></p>
          <div class="shell-form-actions">
            <button type="button" data-action="back">Back</button>
            <button type="submit" aria-label="Save profile">この名前で始める</button>
          </div>
        </form>
      </section>
    `,this.bind("back",()=>this.renderTitle());const t=this.root.querySelector('[data-form="profile"]');t?.addEventListener("submit",a=>{a.preventDefault(),this.saveProfile(new FormData(t))})}async saveProfile(e){const t=this.root.querySelector("[data-error]");try{const a=e.get("playerName");if(typeof a!="string")throw new TypeError("名前を入力してください。");const o=wt(a),i=this.localRepository;if(i===null)throw new Error("Local profile repository is unavailable.");await i.saveProfile(o);const r=this.requireContext();this.context={...r,local:{...r.local,profile:o,profileSource:"loaded"}},this.renderTitle("ローカルprofileを保存しました。")}catch(a){t!==null&&(t.textContent=a instanceof Error?a.message:"profileを保存できませんでした。")}}renderSettings(){const e=this.requireContext().local.settings,t=this.useFirstUseDeviceRecommendation(),a=it.map(l=>{const d=v(l);return`
        <label class="shell-quality-option" data-player-quality="${l}">
          <input type="radio" name="playerQuality" value="${l}" ${this.presentationPreferences.quality===l?"checked":""} />
          <span><strong>${d.label}</strong><small>${d.description}</small></span>
          <b>${d.cost}</b>
        </label>
      `}).join(""),o=rt.map(l=>`
      <label class="shell-frame-target-option">
        <input type="radio" name="frameRateTarget" value="${l}" ${this.presentationPreferences.frameRateTarget===l?"checked":""} />
        <span>${l==="auto"?"自動":`${l} FPS`}</span>
      </label>
    `).join(""),i=vt.map(l=>`<span>${l.toFixed(2)}×</span>`).join("");this.screen="settings",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--form" aria-labelledby="settings-title">
        ${this.brandRail("SETTINGS / MANUAL BOUNDARY")}
        <form class="shell-form" data-form="settings">
          <span class="shell-kicker">VISUAL WORKLOAD / SAVED LOCALLY</span>
          <h1 id="settings-title">表示品質とFPS目標</h1>
          <p>どの端末でもPC Ultraで定めた明るさ・色・照明・質感を保ちます。品質は描画負荷だけを選び、FPS目標とは独立して保存されます。</p>
          ${a}
          <fieldset class="shell-frame-target-settings">
            <legend>FPS TARGET / SCHEDULING</legend>
            <p>ブラウザへ要求する処理上限です。ゲーム中に表示するFPSは、この選択値ではなく実際の計測値です。</p>
            <div>${o}</div>
          </fieldset>
          <fieldset class="shell-zoom-settings">
            <legend>CAMERA ZOOM / MANUAL</legend>
            <p>品質tierとは独立。プレイ中もホイール、−／＋ボタン、キーで連続的に変更し、即座に保存します。</p>
            <label class="shell-zoom-range">
              <span><strong>WIDE</strong><output data-zoom-output>${e.cameraZoom.toFixed(2)}×</output><strong>CLOSE</strong></span>
              <input type="range" name="cameraZoom" min="${C}" max="${$}" step="${m}" value="${e.cameraZoom}" />
              <small>${i}</small>
            </label>
          </fieldset>
          <aside class="shell-auto-note"><span>AUTO QUALITY</span><strong>${t?"DEVICE RECOMMENDATION":"ROUTE DEFAULT"}</strong><p>自動は端末能力から負荷だけを選びます。高画質／軽量の手動選択は次回以降も優先され、色設計は変わりません。</p></aside>
          <div class="shell-form-actions">
            <button type="button" data-action="back">Back</button>
            <button type="submit">Save settings</button>
          </div>
        </form>
      </section>
    `,this.bind("back",()=>this.renderTitle());const r=this.root.querySelector('[data-form="settings"]'),n=r?.elements.namedItem("cameraZoom"),c=r?.querySelector("[data-zoom-output]");n instanceof HTMLInputElement&&c instanceof HTMLOutputElement&&n.addEventListener("input",()=>{c.value=`${Number(n.value).toFixed(2)}×`}),r?.addEventListener("submit",l=>{l.preventDefault(),this.saveSettings(new FormData(r))})}async saveSettings(e){const t=e.get("playerQuality");if(!lt(t))return;const a=e.get("frameRateTarget"),o=a==="auto"?"auto":Number(a);if(!nt(o))return;const i=w(t,R(window)),r=e.get("cameraZoom"),n=typeof r=="string"?Number(r):Number.NaN;if(!Q(n))return;const c={version:p,quality:i,cameraZoom:n},l=this.localRepository;if(l===null)throw new Error("Local settings repository is unavailable.");await l.saveSettings(c),this.presentationPreferences={quality:t,frameRateTarget:o},this.writePresentationPreferences(this.presentationPreferences);const d=this.requireContext();this.context={...d,local:{...d.local,settings:c,settingsSource:"loaded"}},this.qualitySelectionProvenance=t==="auto"?"route-default":"saved-manual",this.renderTitle(`${v(t).label} / ${L(o)} / camera ${n.toFixed(2)}×を保存しました。`)}renderStatus(){const e=this.requireContext(),t=e.local.profile;if(t===null){this.renderProfile();return}const a=Ct({profile:t,worldMemory:this.currentMemory(),worldState:this.sessionWorld??e.core.worldState,buildcraft:this.sessionBuildcraft??e.core.buildcraft}),o=k(e.local.settings.quality),i=e.local.settings.cameraZoom,r=o.presentation.cameraViewHeight/i,n=this.useFirstUseDeviceRecommendation();this.screen="status",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--status" aria-labelledby="status-title">
        ${this.brandRail("STATUS / REAL STATE")}
        <header class="shell-status-head">
          <div><span class="shell-kicker">F.R.A.M. INSTANCE / ${h(a.identity.playerName)}</span><h1 id="status-title">F-01 field status.</h1></div>
          <button type="button" data-action="back">Back to Title</button>
        </header>
        <div class="shell-status-grid">
          <article class="shell-status-card shell-status-card--vitals">
            <span>IDENTITY / BODY</span>
            <strong>${h(a.identity.playerName)} <i>F-01</i></strong>
            <div class="shell-hp"><b style="width:${Math.round(a.vitals.hp/a.vitals.maxHp*100)}%"></b></div>
            <p>HP ${a.vitals.hp} / ${a.vitals.maxHp} · 縫合剤 ${a.vitals.healingItems}</p>
            <small>${a.identity.characterId}</small>
          </article>
          <article class="shell-status-card">
            <span>EQUIPMENT / R10 LIVE</span>
            <strong>${h(a.equipment.buildName)}</strong>
            <dl><div><dt>LEVEL</dt><dd>${a.equipment.level}</dd></div><div><dt>WEAPON</dt><dd>${a.equipment.weaponLabel}</dd></div><div><dt>SALVAGE</dt><dd>${a.equipment.salvage}</dd></div></dl>
            <small>current expedition/session state</small>
          </article>
          <article class="shell-status-card">
            <span>MANUAL RELIC / RESOURCE</span>
            <strong>${a.relic.label}</strong>
            <dl><div><dt>DAMAGE</dt><dd>${a.relic.damage}</dd></div><div><dt>RANGE</dt><dd>${a.relic.range}</dd></div><div><dt>${a.relic.resourceName}</dt><dd>${a.relic.resource} / ${a.relic.resourceMaximum}</dd></div></dl>
            <small>cooldown ${a.relic.cooldownTicks} / ${a.relic.cooldownMaximumTicks} ticks</small>
          </article>
          <article class="shell-status-card shell-status-card--world">
            <span>WORLD MEMORY / R09 PERSISTENT</span>
            <strong>${a.world.expeditionCount} EXPEDITIONS</strong>
            <dl><div><dt>SITES</dt><dd>${a.world.discoveredSiteLabels.join(" / ")||"未発見"}</dd></div><div><dt>BASE</dt><dd>${a.world.baseLabel}</dd></div><div><dt>MODULE</dt><dd>${a.world.moduleLabel}</dd></div><div><dt>RECOVERED</dt><dd>${a.world.recoveredAvailable} available / ${a.world.recoveredConsumed} consumed</dd></div></dl>
            <ul>${a.world.effectLines.map(c=>`<li>${h(c)}</li>`).join("")}</ul>
          </article>
          <article class="shell-status-card shell-status-card--quality">
            <span>DEVICE-NEUTRAL QUALITY</span>
            <strong>${v(this.presentationPreferences.quality).label}</strong>
            <dl><div><dt>FRAME TARGET</dt><dd>${L(this.presentationPreferences.frameRateTarget)}</dd></div><div><dt>RESOLUTION</dt><dd>${o.resolution.strategy} / ${o.resolution.renderScale}× / DPR cap ${F(o,!0)}</dd></div><div><dt>CAMERA</dt><dd>${i.toFixed(2)}× / effective ${r.toFixed(1)} view-height</dd></div><div><dt>MASTER</dt><dd>${o.post.finish.look} / exposure ${o.post.finish.exposure} / saturation ${o.post.finish.saturation}</dd></div><div><dt>COST</dt><dd>${o.effects.budget} / shadow ${o.shadows.mapSize} / particles ${o.effects.particleFraction}</dd></div></dl>
            <small>${n?"自動は端末負荷だけを選択":"route default / manual override saved"}</small>
          </article>
        </div>
      </section>
    `,this.bind("back",()=>this.renderTitle())}launchGame(e){const t=this.requireContext();if(t.local.profile===null){this.renderProfile();return}this.application?.destroy(),this.clearRuntimeZoomControls();const a=document.createElement("div");a.className="product-shell-game-mount",a.dataset.launchMode=e;const o=document.createElement("button");o.type="button",o.className="product-shell-return",o.dataset.action="return-shell",o.innerHTML="<span>RETURN</span><strong>Product Shell</strong>",o.addEventListener("click",()=>this.returnFromGame());const i=k(t.local.settings.quality),r=t.local.settings.cameraZoom,n=document.createElement("aside");n.className="product-shell-quality-badge",n.dataset.qualityBadge=i.id,n.innerHTML=`
      <span>DEVICE-NEUTRAL VISUAL MASTER / COST ONLY</span>
      <strong>${v(this.presentationPreferences.quality).label}</strong>
      <small>${L(this.presentationPreferences.frameRateTarget)} · ZOOM ${r.toFixed(2)}× · ${i.resolution.renderScale}× · DPR ${F(i,!0)} · MASTER ${i.post.finish.look} · FX ${i.effects.budget.toUpperCase()}</small>
    `;const c=document.createElement("aside");c.className="product-shell-camera-zoom",c.setAttribute("aria-label","プレイ中のカメラズーム"),c.innerHTML=`
      <button type="button" data-camera-zoom="out" aria-label="カメラを引く">−</button>
      <output data-runtime-zoom>${r.toFixed(2)}×</output>
      <button type="button" data-camera-zoom="in" aria-label="カメラを寄せる">＋</button>
      <small>WHEEL / − +</small>
    `,this.root.className="product-shell-host is-game",this.root.replaceChildren(a,o,n,c),this.screen="game",this.syncRootDataset(e);const l=()=>{this.syncRuntimeQualityDiagnostics(a)};a.addEventListener("fram:runtime-quality-diagnostics",l),this.runtimeZoomCleanup.push(()=>a.removeEventListener("fram:runtime-quality-diagnostics",l));const d=this.worldRepository;if(d===null)throw new Error("World memory repository is unavailable.");this.application=ct(a,{experience:"r10",renderQuality:t.local.settings.quality,cameraZoomMultiplier:r,frameRateTarget:dt(this.presentationPreferences.frameRateTarget),fullQualitySampling:this.presentationPreferences.quality==="high",companionPreview:!1,semiAutoCombat:!0,heroAssetRequest:t.heroAssetRequest,worldMemoryRuntime:{initialState:this.currentMemory(),loadSource:t.memory.source,onCommit:async u=>{await ft(d,u),this.sessionMemory=u}}}),this.application.start(),a.classList.add("product-shell-game-mount"),a.dataset.productShellLinked="true",this.syncRuntimeQualityDiagnostics(a),window.requestAnimationFrame(()=>this.syncRuntimeQualityDiagnostics(a)),this.bindRuntimeZoomControls(a,c,n)}returnFromGame(){const e=this.application;e!==null&&(this.sessionWorld=e.getState(),this.sessionMemory=e.getWorldMemory()??this.sessionMemory,this.sessionBuildcraft=e.getBuildcraftState()??this.sessionBuildcraft,e.destroy()),this.clearRuntimeZoomControls(),this.application=null,this.renderTitle("遠征からshellへ戻りました。Statusは現在のlive stateを表示します。")}renderError(e){const t=e instanceof Error?e.message:"Product Shellを起動できませんでした。";this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--error" aria-labelledby="shell-error-title">
        ${this.brandRail("LOAD FAILURE / RECOVERABLE")}
        <div class="shell-error-card" role="alert">
          <span class="shell-kicker">${this.failedPhase===null?"UNKNOWN PHASE":Z[this.failedPhase]}</span>
          <h1 id="shell-error-title">The link stopped before play.</h1>
          <p>${h(t)}</p>
          <div class="shell-error-actions">
            <button type="button" data-action="retry">Retry load</button>
            <a href="/game/r09/">Open archived R09</a>
          </div>
          <small>Retryはprofile、save、core、visualの同じ実operationを再実行します。</small>
        </div>
      </section>
    `,this.bind("retry",()=>{this.boot()})}bind(e,t){this.root.querySelector(`[data-action="${e}"]`)?.addEventListener("click",t)}bindRuntimeZoomControls(e,t,a){const o=u=>{const S=this.application;if(S===null)return;const K=S.getCameraZoomMultiplier(),g=S.setCameraZoomMultiplier(Mt(K+u)),N=t.querySelector("[data-runtime-zoom]");N!==null&&(N.value=`${g.toFixed(2)}×`),t.dataset.cameraZoom=String(g);const b=a.querySelector("small");b!==null&&(b.textContent=b.textContent?.replace(/ZOOM\s+\d+(?:\.\d+)?×/,`ZOOM ${g.toFixed(2)}×`)??""),this.persistRuntimeZoom(g)},i=t.querySelector('[data-camera-zoom="out"]'),r=t.querySelector('[data-camera-zoom="in"]'),n=()=>o(-m),c=()=>o(m),l=u=>{u.preventDefault(),o(u.deltaY<0?m:-m)},d=u=>{["Equal","NumpadAdd","BracketRight"].includes(u.code)?(u.preventDefault(),o(m)):["Minus","NumpadSubtract","BracketLeft"].includes(u.code)&&(u.preventDefault(),o(-m))};i?.addEventListener("click",n),r?.addEventListener("click",c),e.addEventListener("wheel",l,{passive:!1}),window.addEventListener("keydown",d),this.runtimeZoomCleanup.push(()=>i?.removeEventListener("click",n),()=>r?.removeEventListener("click",c),()=>e.removeEventListener("wheel",l),()=>window.removeEventListener("keydown",d))}persistRuntimeZoom(e){const t=this.context,a=this.localRepository;if(t===null||a===null)return;const o={...t.local.settings,cameraZoom:e};this.context={...t,local:{...t.local,settings:o,settingsSource:"loaded"}},this.syncRootDataset(),a.saveSettings(o)}async applyRuntimeQuality(e){const t=this.context,a=this.localRepository;if(t===null||a===null||this.screen!=="game")return;const o={...t.local.settings,version:p,quality:e};await a.saveSettings(o),this.presentationPreferences={...this.presentationPreferences,quality:e==="mobile-safe"?"lightweight":"high"},this.writePresentationPreferences(this.presentationPreferences),this.context={...t,local:{...t.local,settings:o,settingsSource:"loaded"}};const i=this.root.dataset.expeditionMode==="continue"?"continue":"new-expedition";this.launchGame(i)}async applyPresentationPreferences(e){const t=this.context,a=this.localRepository;if(t===null||a===null||this.screen!=="game")return;const o=w(e.quality,R(window)),i={...t.local.settings,version:p,quality:o};await a.saveSettings(i),this.presentationPreferences=e,this.writePresentationPreferences(e),this.context={...t,local:{...t.local,settings:i,settingsSource:"loaded"}},this.qualitySelectionProvenance=e.quality==="auto"?"route-default":"saved-manual";const r=this.root.dataset.expeditionMode==="continue"?"continue":"new-expedition";this.launchGame(r)}clearRuntimeZoomControls(){for(const e of this.runtimeZoomCleanup.splice(0))e()}readPresentationPreferences(){try{const e=window.localStorage.getItem(_);return e===null?null:ut(e)}catch{return null}}writePresentationPreferences(e){try{window.localStorage.setItem(_,JSON.stringify(e))}catch{}}currentMemory(){return this.sessionMemory??this.requireContext().memory.state}requireContext(){if(this.context===null)throw new Error("Product Shell context is not ready.");return this.context}useFirstUseDeviceRecommendation(){return ht(window.location.search,window.location.pathname)}failInjectedPhase(e){if(new URLSearchParams(this.search).get("shellFail")===e&&!this.injectedFailures.has(e))throw this.injectedFailures.add(e),new Error(`Injected ${e} failure for retry verification.`)}syncRootDataset(e){this.root.dataset.productShellState=this.screen,this.root.dataset.productShellPlayerName=this.context?.local.profile?.playerName??"",this.root.dataset.profileStatus=this.context?.local.profile===null?"missing":this.context?.local.profile===void 0?"loading":"ready",this.root.dataset.memoryLoadSource=this.context?.memory.source??"loading",this.root.dataset.profilePersistence=this.profilePersistence,this.root.dataset.worldPersistence=this.worldPersistence,this.root.dataset.manualQuality=this.context?.local.settings.quality??M.quality,this.root.dataset.qualitySelectionProvenance=this.qualitySelectionProvenance,this.root.dataset.playerQuality=this.presentationPreferences.quality,this.root.dataset.frameRateTarget=String(this.presentationPreferences.frameRateTarget),this.root.dataset.qualityCssViewport=`${window.innerWidth}x${window.innerHeight}`,this.root.dataset.qualityDevicePixelRatio=String(window.devicePixelRatio||1),this.root.dataset.cameraZoom=String(this.context?.local.settings.cameraZoom??M.cameraZoom),this.root.dataset.loadFailedPhase=this.failedPhase??"none",e!==void 0&&(this.root.dataset.expeditionMode=e)}syncRuntimeQualityDiagnostics(e){const t=e.querySelector("canvas[data-quality-profile]");t!==null&&(this.root.dataset.qualityBackingBuffer=t.dataset.internalResolution??`${t.width}x${t.height}`,this.root.dataset.qualityActualCanvasBacking=t.dataset.qualityActualCanvasBacking??`${t.width}x${t.height}`,this.root.dataset.qualityActualDrawingBuffer=t.dataset.qualityActualDrawingBuffer??"unknown",this.root.dataset.qualityActualPostprocessTargets=t.dataset.qualityActualPostprocessTargets??"null",this.root.dataset.qualityEffectiveDpr=t.dataset.effectivePixelRatio??"unknown",this.root.dataset.qualityRenderScale=t.dataset.qualityRenderScale??"unknown",this.root.dataset.qualityCanvasCss=t.dataset.qualityCanvasCssRect??`${Math.round(t.clientWidth)}x${Math.round(t.clientHeight)}`,this.root.dataset.qualityLayoutViewport=t.dataset.qualityLayoutViewport??"unknown",this.root.dataset.qualityVisualViewport=t.dataset.qualityVisualViewport??"unavailable",this.root.dataset.qualityViewportOrientation=t.dataset.qualityViewportOrientation??"unknown",this.root.dataset.qualityViewportSyncSequence=t.dataset.qualityViewportSyncSequence??"0",this.root.dataset.qualityViewportSyncReason=t.dataset.qualityViewportSyncReason??"unknown",this.root.dataset.qualityViewportSample=t.dataset.qualityViewportSample??"{}",this.root.dataset.qualityDeviceClass=t.dataset.runtimePresentationDeviceClass??"unknown",this.root.dataset.qualityBrowserDprCap=t.dataset.qualityDprCap??"unknown",this.root.dataset.qualityCombatTextTexture=t.dataset.firstStageCombatTextTexture??"pending-first-hit",this.root.dataset.qualityCombatTextSampling=t.dataset.firstStageCombatTextSampling??"pending-first-hit")}brandRail(e){return`
      <aside class="shell-brand-rail" aria-hidden="true">
        <b>F.</b><span>${h(e)}</span><i></i><small>F.R.A.M. MODULE ↔ R10 BUILDCRAFT</small>
      </aside>
    `}}function kt(s){if(s.expeditionHistory.length===0)return"まだ世界にはあなたの帰還記録がない。最初の遠征から始められます。";const e=s.installedModule?.moduleId;return`${s.discoveredSites.length} site発見 · ${s.recoveredItems.length}回収 · ${e===void 0?"module未設置":e}`}function Ft(s){switch(s){case"complete":return"READY";case"fallback":return"FALLBACK";case"failed":return"FAILED";case"active":return"LOADING";default:return"PENDING"}}function v(s){switch(s){case"auto":return{label:"自動（推奨）",description:"端末能力に合わせて描画負荷だけを選びます。",cost:"AUTO COST"};case"high":return{label:"高画質",description:"PC Ultra基準のサンプリング密度を優先します。",cost:"HIGH SAMPLE"};case"lightweight":return{label:"軽量",description:"色・照明・質感を保ち、解像度と効果数を抑えます。",cost:"LOWER COST"}}}function L(s){return s==="auto"?"自動":`${s} FPS TARGET`}function h(s){return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const j=document.querySelector("#app");if(j===null)throw new Error("F.R.A.M. Product Shell root was not found.");const _t=new Dt(j);_t.boot();
