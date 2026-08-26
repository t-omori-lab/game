/* empty css               */import{c as O}from"./storageBackend-C_GXSix6.js";import{R as z,p as G,q,r as M,t as D,u as Q,g as C,P as x,v as V,w as j,x as K,y as v,z as E,s as J,A as X}from"./index-DZwMCyNZ.js";import{a as ee,c as te,l as se,s as oe}from"./loadR09HeroAsset-B9d65UuX.js";const A=1,p=2,f="fram.character.f01.gameplay-bridge-v1",ae=[.85,1,1.15],N=.75,T=1.25,h=.05,re="mobile-safe",le=["version","playerName","characterId","createdAt"],ie=["version","quality","cameraZoom"],H=["version","quality"],F={"canopy-relay":"樹冠中継所","flooded-archive":"沈水資料庫"},ne={"pathfinder-array":"経路観測列","relic-overdrive":"遺物過励器"},I={version:p,quality:"pc-ultra",cameraZoom:1};function ce(o,e=new Date){return{version:A,playerName:Z(o),characterId:f,createdAt:e.toISOString()}}function de(o){if(!S(o,le)||o.version!==A||o.characterId!==f||typeof o.playerName!="string"||typeof o.createdAt!="string")return null;try{const e=Z(o.playerName),s=o.createdAt;return ye(s)?{version:A,playerName:e,characterId:f,createdAt:s}:null}catch{return null}}function ue(o){if(S(o,H)&&o.version===1){const t=o.quality,a=t==="compatibility"?re:t;return M(a)?{version:p,quality:a,cameraZoom:1}:null}if(!S(o,ie)||o.version!==p)return null;const e=o.quality;if(!M(e))return null;const s=o.cameraZoom;return _(s)?{version:p,quality:e,cameraZoom:s}:null}function me(o){try{return de(JSON.parse(o))}catch{return null}}function he(o){try{const e=JSON.parse(o),s=ue(e);return s===null?null:{settings:s,migratedFrom:S(e,H)&&e.version===1?e.quality==="compatibility"?"compatibility":"settings-v1":null}}catch{return null}}function _(o){return typeof o=="number"&&Number.isFinite(o)&&o>=N&&o<=T}function pe(o){const e=Math.min(T,Math.max(N,Number.isFinite(o)?o:1));return Math.round(e*100)/100}function fe(o){const e=z[o.buildcraft.equippedBuildId],s=G(o.buildcraft),t=q(o.worldMemory),a=o.worldMemory.installedModule?.moduleId??null,r=o.worldMemory.claimedBaseSiteId;return{identity:{playerName:o.profile.playerName,characterLabel:"F-01",characterId:f},vitals:{hp:o.worldState.player.hp,maxHp:o.worldState.player.maxHp,healingItems:o.worldState.player.healingItems},equipment:{buildId:e.id,buildName:e.name,level:s.level,weaponLabel:e.weaponId==="blade"?"測量刃":"杭打機",salvage:o.buildcraft.salvage},relic:{label:"斥力環 R-17",damage:o.worldState.player.relicDamage,range:o.worldState.player.relicRange,resourceName:e.resource.name,resource:o.buildcraft.resource,resourceMaximum:s.resourceMaximum,cooldownTicks:o.worldState.player.relicCooldownTicks,cooldownMaximumTicks:o.worldState.player.relicCooldownMaxTicks},world:{expeditionCount:o.worldMemory.expeditionHistory.length,discoveredSiteLabels:o.worldMemory.discoveredSites.map(l=>F[l.siteId]),recoveredAvailable:o.worldMemory.recoveredItems.filter(l=>l.status==="available").length,recoveredConsumed:o.worldMemory.recoveredItems.filter(l=>l.status==="consumed").length,baseLabel:r===null?"未確保":F[r],moduleLabel:a===null?"未設置":ne[a],effectLines:[t.routeOverlay?"経路オーバーレイ 有効":"経路オーバーレイ 無効",`探索速度 ×${t.explorationSpeedMultiplier.toFixed(2)}`,t.relicAura?"遺物オーラ 有効":"遺物オーラ 無効",`大技再使用 ×${t.relicCooldownMultiplier.toFixed(2)}`]}}}function Z(o){const e=o.trim().replace(/\s+/gu," "),s=Array.from(e).length;if(s<1||s>24||/[\u0000-\u001f\u007f]/u.test(e))throw new TypeError("Player name must be 1-24 visible characters.");return e}function S(o,e){if(typeof o!="object"||o===null||Array.isArray(o))return!1;const s=Object.keys(o).sort();return s.length===e.length&&[...e].sort().every((t,a)=>s[a]===t)}function ye(o){const e=Date.parse(o);return Number.isFinite(e)&&new Date(e).toISOString()===o}const B=["account","save","core-data","visual-pack","playable"];class Y extends Error{constructor(e,s,t){super(s,t),this.phase=e,this.name="ProductShellLoadError"}phase}async function ge(o,e=()=>{}){for(const n of B)e({phase:n,state:"pending",detail:"待機中"});const s=await g("account",o.loadAccount,e),t=await g("save",o.loadSave,e),a=await g("core-data",()=>o.loadCoreData(t.value),e),r=await g("visual-pack",o.loadVisualPack,e),l={local:s.value,memory:t.value,core:a.value,heroAssetRequest:r.value};return await g("playable",()=>o.verifyPlayable(l),e),l}async function g(o,e,s){s({phase:o,state:"active",detail:"読み込み中"});try{const t=await e();return s({phase:o,state:t.fallback===!0?"fallback":"complete",detail:t.detail}),t}catch(t){const a=t instanceof Error?t.message:"不明な読み込み失敗";throw s({phase:o,state:"failed",detail:a}),new Y(o,`${o} phase failed: ${a}`,{cause:t})}}const k="fram-product-shell.profile-v1",w="fram-product-shell.settings-v1";class be{constructor(e){this.storage=e}storage;async load(){const[e,s]=await Promise.all([this.storage.get(k),this.storage.get(w)]),t=e===null?null:me(e),a=s===null?null:he(s),r=a?.settings??I;return a!==null&&a.migratedFrom!==null&&await this.storage.set(w,JSON.stringify(r)),{profile:t,profileSource:e===null?"empty":t===null?"invalid-fallback":"loaded",settings:r,settingsSource:s===null?"empty":a===null?"invalid-fallback":a.migratedFrom!==null?"migrated":"loaded"}}async saveProfile(e){await this.storage.set(k,JSON.stringify(e))}async saveSettings(e){await this.storage.set(w,JSON.stringify(e))}}function ve(o){const e=o.navigator;return{coarsePointer:typeof o.matchMedia=="function"&&o.matchMedia("(pointer: coarse)").matches,touchPoints:$(o.navigator.maxTouchPoints)??0,viewportWidth:o.innerWidth,viewportHeight:o.innerHeight,hardwareConcurrency:$(o.navigator.hardwareConcurrency),deviceMemoryGb:$(e.deviceMemory)}}function Ee(o){if(!o.recommendationEnabled||o.settingsSource!=="empty")return o.settings;const e=Math.min(o.signals.viewportWidth,o.signals.viewportHeight);if(!(o.signals.touchPoints>0&&(o.signals.coarsePointer||e<=600)))return o.settings;const t=o.signals.deviceMemoryGb!==void 0&&o.signals.deviceMemoryGb<=4||o.signals.hardwareConcurrency!==void 0&&o.signals.hardwareConcurrency<=4;return{...o.settings,quality:t?"mobile-safe":"mobile-high"}}function $(o){return typeof o=="number"&&Number.isFinite(o)?o:void 0}const Se="fram-product-shell-local-v1",Re="fram-r09-player-local-v1",Le="world-memory",U={account:"LOCAL PROFILE",save:"WORLD MEMORY","core-data":"R10 CORE DATA","visual-pack":"F-01 VISUAL PACK",playable:"PLAYABLE LINK"};class we{constructor(e,s=window.location.search){this.root=e,this.search=s,window.addEventListener(D,this.runtimeQualityHandler)}root;search;screen="loading";context=null;localRepository=null;worldRepository=null;profilePersistence="memory";worldPersistence="memory";application=null;runtimeZoomCleanup=[];sessionWorld=null;sessionMemory=null;sessionBuildcraft=null;loadUpdates=new Map;failedPhase=null;injectedFailures=new Set;runtimeQualityHandler=e=>{const s=Q(e);s===null||this.screen!=="game"||this.applyRuntimeQuality(s.quality)};async boot(){this.screen="loading",this.failedPhase=null,this.context=null,this.sessionWorld=null,this.sessionMemory=null,this.sessionBuildcraft=null,this.loadUpdates.clear(),this.syncRootDataset(),this.renderLoading();const e=C(x).seed;try{this.context=await ge({loadAccount:async()=>{this.failInjectedPhase("account");const s=await O({databaseName:Se,storeName:"product-shell"});this.profilePersistence=s.backend.persistence,this.localRepository=new be(s.backend);const t=await this.localRepository.load(),a=this.useFirstUseDeviceRecommendation(),r=Ee({settings:t.settings,settingsSource:t.settingsSource,recommendationEnabled:a,signals:ve(window)});t.settingsSource==="empty"&&a&&await this.localRepository.saveSettings(r);const l=t.settingsSource==="empty"&&a?{...t,settings:r,settingsSource:"loaded"}:t,n=s.persistence==="memory"||l.profileSource==="invalid-fallback"||t.settingsSource==="invalid-fallback";return{value:l,fallback:n,detail:n?"保存できない場合はこのtab内で継続":l.profile===null?"初回profileの作成待ち":`${l.profile.playerName} / local profile`}},loadSave:async()=>{this.failInjectedPhase("save");const s=await O({databaseName:Re,storeName:Le});this.worldPersistence=s.backend.persistence,this.worldRepository=te(s.backend);const t=await se(this.worldRepository,e),a=s.persistence==="memory"||t.source==="corrupt-fallback"||t.source==="seed-mismatch-fallback";return{value:t,fallback:a,detail:`${t.source} / ${t.state.expeditionHistory.length} expedition`}},loadCoreData:async s=>{this.failInjectedPhase("core-data");const t=V(),a=q(s.state);return{value:{worldState:j(C(x),t,a.relicCooldownMultiplier),buildcraft:t},detail:`${t.equippedBuildId} / WorldMemory v${s.state.version}`}},loadVisualPack:async()=>{this.failInjectedPhase("visual-pack");const s=await ee(this.search);return{value:s,fallback:s.status!=="loaded",detail:s.status==="loaded"?"canonical F-01 loaded":`${s.status} / built-in actor fallback`}},verifyPlayable:async s=>{if(this.failInjectedPhase("playable"),s.memory.state.version!==1||s.core.buildcraft.schemaVersion!==1||s.core.worldState.saveVersion!==1)throw new Error("対応していないlocal state versionです。");return{value:!0,detail:"R09 memory → R10 playable link ready"}}},s=>{this.loadUpdates.set(s.phase,s),this.renderLoading()}),this.screen="title",this.syncRootDataset(),this.renderTitle()}catch(s){this.failedPhase=s instanceof Y?s.phase:null,this.screen="error",this.syncRootDataset(),this.renderError(s)}}destroy(){window.removeEventListener(D,this.runtimeQualityHandler),this.clearRuntimeZoomControls(),this.application?.destroy(),this.application=null}renderLoading(){this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--loading" aria-labelledby="shell-loading-title">
        ${this.brandRail("BOOT / LOCAL PRODUCT CELL")}
        <div class="shell-loading-card">
          <span class="shell-kicker">F.R.A.M. / SYSTEM LINK</span>
          <h1 id="shell-loading-title">Loading the next expedition.</h1>
          <p>profile、R09 world memory、R10 rules、F-01 packを別々に確認します。</p>
          <ol class="shell-load-list">
            ${B.map((e,s)=>{const t=this.loadUpdates.get(e)??{state:"pending",detail:"待機中"};return`
                <li data-load-phase="${e}" data-load-state="${t.state}">
                  <b>${String(s+1).padStart(2,"0")}</b>
                  <span><strong>${U[e]}</strong><small>${u(t.detail)}</small></span>
                  <i>${Me(t.state)}</i>
                </li>
              `}).join("")}
          </ol>
        </div>
      </section>
    `}renderTitle(e=""){const t=this.requireContext().local.profile,a=this.currentMemory(),r=a.expeditionHistory.length>0,l=this.useFirstUseDeviceRecommendation();this.screen="title",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
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
            <strong>${String(a.expeditionHistory.length).padStart(2,"0")} EXPEDITIONS</strong>
            <p>${$e(a)}</p>
            <div><i data-state="${this.worldPersistence}"></i>${this.worldPersistence==="indexeddb"?"IndexedDB / local authority":"Memory fallback / this tab only"}</div>
          </section>
          <nav class="shell-primary-actions" aria-label="Product Shell menu">
            ${t===null?`
              <button type="button" class="shell-action shell-action--primary" data-action="profile">
                <span>01 / FIRST USE</span><strong>Local profileを作る</strong><small>player nameとF-01 identityを分けて保存</small>
              </button>
            `:`
              <button type="button" class="shell-action shell-action--primary" data-action="continue" ${r?"":"disabled"}>
                <span>01 / CONTINUE</span><strong>Continue</strong><small>${r?`遠征 ${a.expeditionHistory.length+1} へ`:"まだ帰還記録はありません"}</small>
              </button>
              <button type="button" class="shell-action" data-action="new-expedition">
                <span>02 / NEW RUN</span><strong>New Expedition</strong><small>world memoryを保ったまま現在遠征を新規化</small>
              </button>
              <button type="button" class="shell-action" data-action="status">
                <span>03 / LIVE DATA</span><strong>Status</strong><small>HP、装備、遺物、module効果</small>
              </button>
              <button type="button" class="shell-action" data-action="settings">
                <span>04 / LOCAL</span><strong>Settings</strong><small>${l?"初回端末推奨 / 手動上書き保存":"手動renderer profile / auto未使用"}</small>
              </button>
            `}
          </nav>
        </div>
        <footer class="shell-profile-strip">
          <span>LOCAL PROFILE</span>
          <strong>${t===null?"NOT SET":u(t.playerName)}</strong>
          <small>${t===null?"Google accountは未接続":`F-01 / ${f}`}</small>
          ${t===null?"":'<button type="button" data-action="profile">EDIT NAME</button>'}
        </footer>
        ${e===""?"":`<p class="shell-message" role="status">${u(e)}</p>`}
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
            <input name="playerName" type="text" minlength="1" maxlength="24" autocomplete="nickname" aria-label="PLAYER NAME" value="${e===null?"":u(e.playerName)}" required autofocus />
          </label>
          <dl class="shell-identity-lock">
            <div><dt>ACCOUNT</dt><dd>Local device / offline</dd></div>
            <div><dt>CHARACTER</dt><dd>F-01</dd></div>
            <div><dt>ASSET ID</dt><dd>${f}</dd></div>
          </dl>
          <p class="shell-form-error" data-error role="alert"></p>
          <div class="shell-form-actions">
            <button type="button" data-action="back">Back</button>
            <button type="submit" aria-label="Save profile">この名前で始める</button>
          </div>
        </form>
      </section>
    `,this.bind("back",()=>this.renderTitle());const s=this.root.querySelector('[data-form="profile"]');s?.addEventListener("submit",t=>{t.preventDefault(),this.saveProfile(new FormData(s))})}async saveProfile(e){const s=this.root.querySelector("[data-error]");try{const t=e.get("playerName");if(typeof t!="string")throw new TypeError("名前を入力してください。");const a=ce(t),r=this.localRepository;if(r===null)throw new Error("Local profile repository is unavailable.");await r.saveProfile(a);const l=this.requireContext();this.context={...l,local:{...l.local,profile:a,profileSource:"loaded"}},this.renderTitle("ローカルprofileを保存しました。")}catch(t){s!==null&&(s.textContent=t instanceof Error?t.message:"profileを保存できませんでした。")}}renderSettings(){const e=this.requireContext().local.settings,s=this.useFirstUseDeviceRecommendation(),t=K.map(c=>{const i=v(c),m=i.post.enabled?[i.post.hdr?"HDR":"SDR",i.post.finish.enabled?"Voxel Finish":null,i.post.gtao?"GTAO":null,i.post.bloom?"Bloom":null,i.antialiasing.postSmaa?"SMAA":null].filter(R=>R!==null).join(" + ")||"post direct":"postなし / direct",d=i.resolution.strategy==="fixed-height"?`${i.resolution.fixedHeight}px fixed-height / DPR ${E(i,!0)}`:`viewport ${i.resolution.renderScale}× / DPR cap ${E(i,!0)}`,y=`${i.performance.frameRateIntentHz} FPS INTENT`;return`
        <label class="shell-quality-option" data-quality-profile="${c}">
          <input type="radio" name="quality" value="${c}" ${e.quality===c?"checked":""} />
          <span><strong>${i.label}</strong><small>${u(i.shortDescription)}</small><small>${d} · ${m} · shadow ${i.shadows.mapSize} · surface ${i.effects.surfaceDetail.mode}/${i.effects.surfaceDetail.maximumResolution}px · miniature ${i.post.finish.miniatureDepth.strength} · effects ${i.effects.budget}</small></span>
          <b>${y}</b>
        </label>
      `}).join(""),a=ae.map(c=>`<span>${c.toFixed(2)}×</span>`).join("");this.screen="settings",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--form" aria-labelledby="settings-title">
        ${this.brandRail("SETTINGS / MANUAL BOUNDARY")}
        <form class="shell-form" data-form="settings">
          <span class="shell-kicker">RENDER QUALITY / SAVED LOCALLY</span>
          <h1 id="settings-title">Choose the renderer you want now.</h1>
          <p>${s?"初回は端末向けの推奨値を設定します。ここで選んだprofileは保存され、次回以降も最優先されます。":"四つとも実在する手動profileです。自動選択は未実装です。"}</p>
          ${t}
          <fieldset class="shell-zoom-settings">
            <legend>CAMERA ZOOM / MANUAL</legend>
            <p>品質tierとは独立。プレイ中もホイール、−／＋ボタン、キーで連続的に変更し、即座に保存します。</p>
            <label class="shell-zoom-range">
              <span><strong>WIDE</strong><output data-zoom-output>${e.cameraZoom.toFixed(2)}×</output><strong>CLOSE</strong></span>
              <input type="range" name="cameraZoom" min="${N}" max="${T}" step="${h}" value="${e.cameraZoom}" />
              <small>${a}</small>
            </label>
          </fieldset>
          <aside class="shell-auto-note"><span>${s?"FIRST-USE DEFAULT":"AUTO QUALITY"}</span><strong>${s?"DEVICE RECOMMENDATION":"NOT IMPLEMENTED"}</strong><p>${s?"初回だけ端末情報から推奨します。実行中の自動切替はせず、手動設定を常に優先します。":"端末自動判定、hidden benchmark、実行中の自動縮退は行いません。"}</p></aside>
          <div class="shell-form-actions">
            <button type="button" data-action="back">Back</button>
            <button type="submit">Save settings</button>
          </div>
        </form>
      </section>
    `,this.bind("back",()=>this.renderTitle());const r=this.root.querySelector('[data-form="settings"]'),l=r?.elements.namedItem("cameraZoom"),n=r?.querySelector("[data-zoom-output]");l instanceof HTMLInputElement&&n instanceof HTMLOutputElement&&l.addEventListener("input",()=>{n.value=`${Number(l.value).toFixed(2)}×`}),r?.addEventListener("submit",c=>{c.preventDefault(),this.saveSettings(new FormData(r))})}async saveSettings(e){const s=e.get("quality");if(!M(s))return;const t=e.get("cameraZoom"),a=typeof t=="string"?Number(t):Number.NaN;if(!_(a))return;const r={version:p,quality:s,cameraZoom:a},l=this.localRepository;if(l===null)throw new Error("Local settings repository is unavailable.");await l.saveSettings(r);const n=this.requireContext();this.context={...n,local:{...n.local,settings:r,settingsSource:"loaded"}},this.renderTitle(`${v(s).label} / camera ${a.toFixed(2)}×を手動設定として保存しました。`)}renderStatus(){const e=this.requireContext(),s=e.local.profile;if(s===null){this.renderProfile();return}const t=fe({profile:s,worldMemory:this.currentMemory(),worldState:this.sessionWorld??e.core.worldState,buildcraft:this.sessionBuildcraft??e.core.buildcraft}),a=v(e.local.settings.quality),r=e.local.settings.cameraZoom,l=a.presentation.cameraViewHeight/r,n=this.useFirstUseDeviceRecommendation();this.screen="status",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--status" aria-labelledby="status-title">
        ${this.brandRail("STATUS / REAL STATE")}
        <header class="shell-status-head">
          <div><span class="shell-kicker">F.R.A.M. INSTANCE / ${u(t.identity.playerName)}</span><h1 id="status-title">F-01 field status.</h1></div>
          <button type="button" data-action="back">Back to Title</button>
        </header>
        <div class="shell-status-grid">
          <article class="shell-status-card shell-status-card--vitals">
            <span>IDENTITY / BODY</span>
            <strong>${u(t.identity.playerName)} <i>F-01</i></strong>
            <div class="shell-hp"><b style="width:${Math.round(t.vitals.hp/t.vitals.maxHp*100)}%"></b></div>
            <p>HP ${t.vitals.hp} / ${t.vitals.maxHp} · 縫合剤 ${t.vitals.healingItems}</p>
            <small>${t.identity.characterId}</small>
          </article>
          <article class="shell-status-card">
            <span>EQUIPMENT / R10 LIVE</span>
            <strong>${u(t.equipment.buildName)}</strong>
            <dl><div><dt>LEVEL</dt><dd>${t.equipment.level}</dd></div><div><dt>WEAPON</dt><dd>${t.equipment.weaponLabel}</dd></div><div><dt>SALVAGE</dt><dd>${t.equipment.salvage}</dd></div></dl>
            <small>current expedition/session state</small>
          </article>
          <article class="shell-status-card">
            <span>MANUAL RELIC / RESOURCE</span>
            <strong>${t.relic.label}</strong>
            <dl><div><dt>DAMAGE</dt><dd>${t.relic.damage}</dd></div><div><dt>RANGE</dt><dd>${t.relic.range}</dd></div><div><dt>${t.relic.resourceName}</dt><dd>${t.relic.resource} / ${t.relic.resourceMaximum}</dd></div></dl>
            <small>cooldown ${t.relic.cooldownTicks} / ${t.relic.cooldownMaximumTicks} ticks</small>
          </article>
          <article class="shell-status-card shell-status-card--world">
            <span>WORLD MEMORY / R09 PERSISTENT</span>
            <strong>${t.world.expeditionCount} EXPEDITIONS</strong>
            <dl><div><dt>SITES</dt><dd>${t.world.discoveredSiteLabels.join(" / ")||"未発見"}</dd></div><div><dt>BASE</dt><dd>${t.world.baseLabel}</dd></div><div><dt>MODULE</dt><dd>${t.world.moduleLabel}</dd></div><div><dt>RECOVERED</dt><dd>${t.world.recoveredAvailable} available / ${t.world.recoveredConsumed} consumed</dd></div></dl>
            <ul>${t.world.effectLines.map(c=>`<li>${u(c)}</li>`).join("")}</ul>
          </article>
          <article class="shell-status-card shell-status-card--quality">
            <span>RENDER QUALITY / MANUAL</span>
            <strong>${a.label}</strong>
            <dl><div><dt>FRAME INTENT</dt><dd>${a.performance.frameRateIntentHz} FPS</dd></div><div><dt>RESOLUTION</dt><dd>${a.resolution.strategy} / ${a.resolution.renderScale}× / DPR cap ${E(a,!0)}</dd></div><div><dt>CAMERA</dt><dd>${r.toFixed(2)}× / effective ${l.toFixed(1)} view-height</dd></div><div><dt>POST</dt><dd>${a.post.hdr?"HDR":"SDR"} / ${a.post.finish.look} / bloom ${a.post.bloomStrength} / miniature ${a.post.finish.miniatureDepth.strength}</dd></div><div><dt>SHADOW</dt><dd>${a.shadows.mapSize} / ${a.shadows.filter} r${a.shadows.radius}</dd></div><div><dt>SURFACE</dt><dd>${a.effects.surfaceDetail.mode} / ${a.effects.surfaceDetail.maximumResolution}px / N ${a.effects.surfaceDetail.normalStrength} / reflection ${a.effects.surfaceDetail.reflectionCoverage}</dd></div><div><dt>ATMOSPHERE</dt><dd>fog ${a.effects.atmosphere.fogNearMultiplier}/${a.effects.atmosphere.fogFarMultiplier} / sun ${a.effects.atmosphere.sunIntensityMultiplier}× / shafts ${a.effects.atmosphere.lightShaftCount}</dd></div><div><dt>EFFECTS</dt><dd>${a.effects.budget} / practical ${a.effects.practicalLightCount} / attack echo ${a.effects.attackEchoes}</dd></div></dl>
            <small>${n?"初回端末推奨 / manual override saved":"自動選択は未実装 / selected locally"}</small>
          </article>
        </div>
      </section>
    `,this.bind("back",()=>this.renderTitle())}launchGame(e){const s=this.requireContext();if(s.local.profile===null){this.renderProfile();return}this.application?.destroy(),this.clearRuntimeZoomControls();const t=document.createElement("div");t.className="product-shell-game-mount",t.dataset.launchMode=e;const a=document.createElement("button");a.type="button",a.className="product-shell-return",a.dataset.action="return-shell",a.innerHTML="<span>RETURN</span><strong>Product Shell</strong>",a.addEventListener("click",()=>this.returnFromGame());const r=v(s.local.settings.quality),l=s.local.settings.cameraZoom,n=document.createElement("aside"),c=this.useFirstUseDeviceRecommendation();n.className="product-shell-quality-badge",n.dataset.qualityBadge=r.id,n.innerHTML=`
      <span>${c?"ACTIVE PROFILE / FIRST-USE DEFAULT OR MANUAL":"MANUAL PROFILE / AUTO NOT IMPLEMENTED"}</span>
      <strong>${r.label}</strong>
      <small>${r.performance.frameRateIntentHz} FPS INTENT · ZOOM ${l.toFixed(2)}× · ${r.resolution.renderScale}× · DPR ${E(r,!0)} · ${r.post.hdr?"HDR":"SDR"} · FINISH ${r.post.finish.voxelClarity}/${r.post.finish.voxelEdge} · MINI ${r.post.finish.miniatureDepth.strength} · TEX ${r.effects.surfaceDetail.mode} · SUN ${r.effects.atmosphere.sunIntensityMultiplier}× · BLOOM ${r.post.bloomStrength} · ECHO ${r.effects.attackEchoes} · FX ${r.effects.budget.toUpperCase()}</small>
    `;const i=document.createElement("aside");i.className="product-shell-camera-zoom",i.setAttribute("aria-label","プレイ中のカメラズーム"),i.innerHTML=`
      <button type="button" data-camera-zoom="out" aria-label="カメラを引く">−</button>
      <output data-runtime-zoom>${l.toFixed(2)}×</output>
      <button type="button" data-camera-zoom="in" aria-label="カメラを寄せる">＋</button>
      <small>WHEEL / − +</small>
    `,this.root.className="product-shell-host is-game",this.root.replaceChildren(t,a,n,i),this.screen="game",this.syncRootDataset(e);const m=this.worldRepository;if(m===null)throw new Error("World memory repository is unavailable.");this.application=J(t,{experience:"r10",renderQuality:s.local.settings.quality,cameraZoomMultiplier:l,companionPreview:!1,semiAutoCombat:!0,heroAssetRequest:s.heroAssetRequest,worldMemoryRuntime:{initialState:this.currentMemory(),loadSource:s.memory.source,onCommit:async d=>{await oe(m,d),this.sessionMemory=d}}}),this.application.start(),t.classList.add("product-shell-game-mount"),t.dataset.productShellLinked="true",this.bindRuntimeZoomControls(t,i,n)}returnFromGame(){const e=this.application;e!==null&&(this.sessionWorld=e.getState(),this.sessionMemory=e.getWorldMemory()??this.sessionMemory,this.sessionBuildcraft=e.getBuildcraftState()??this.sessionBuildcraft,e.destroy()),this.clearRuntimeZoomControls(),this.application=null,this.renderTitle("遠征からshellへ戻りました。Statusは現在のlive stateを表示します。")}renderError(e){const s=e instanceof Error?e.message:"Product Shellを起動できませんでした。";this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--error" aria-labelledby="shell-error-title">
        ${this.brandRail("LOAD FAILURE / RECOVERABLE")}
        <div class="shell-error-card" role="alert">
          <span class="shell-kicker">${this.failedPhase===null?"UNKNOWN PHASE":U[this.failedPhase]}</span>
          <h1 id="shell-error-title">The link stopped before play.</h1>
          <p>${u(s)}</p>
          <div class="shell-error-actions">
            <button type="button" data-action="retry">Retry load</button>
            <a href="/game/r09/">Open archived R09</a>
          </div>
          <small>Retryはprofile、save、core、visualの同じ実operationを再実行します。</small>
        </div>
      </section>
    `,this.bind("retry",()=>{this.boot()})}bind(e,s){this.root.querySelector(`[data-action="${e}"]`)?.addEventListener("click",s)}bindRuntimeZoomControls(e,s,t){const a=d=>{const y=this.application;if(y===null)return;const R=y.getCameraZoomMultiplier(),b=y.setCameraZoomMultiplier(pe(R+d)),P=s.querySelector("[data-runtime-zoom]");P!==null&&(P.value=`${b.toFixed(2)}×`),s.dataset.cameraZoom=String(b);const L=t.querySelector("small");L!==null&&(L.textContent=L.textContent?.replace(/ZOOM\s+\d+(?:\.\d+)?×/,`ZOOM ${b.toFixed(2)}×`)??""),this.persistRuntimeZoom(b)},r=s.querySelector('[data-camera-zoom="out"]'),l=s.querySelector('[data-camera-zoom="in"]'),n=()=>a(-h),c=()=>a(h),i=d=>{d.preventDefault(),a(d.deltaY<0?h:-h)},m=d=>{["Equal","NumpadAdd","BracketRight"].includes(d.code)?(d.preventDefault(),a(h)):["Minus","NumpadSubtract","BracketLeft"].includes(d.code)&&(d.preventDefault(),a(-h))};r?.addEventListener("click",n),l?.addEventListener("click",c),e.addEventListener("wheel",i,{passive:!1}),window.addEventListener("keydown",m),this.runtimeZoomCleanup.push(()=>r?.removeEventListener("click",n),()=>l?.removeEventListener("click",c),()=>e.removeEventListener("wheel",i),()=>window.removeEventListener("keydown",m))}persistRuntimeZoom(e){const s=this.context,t=this.localRepository;if(s===null||t===null)return;const a={...s.local.settings,cameraZoom:e};this.context={...s,local:{...s.local,settings:a,settingsSource:"loaded"}},this.syncRootDataset(),t.saveSettings(a)}async applyRuntimeQuality(e){const s=this.context,t=this.localRepository;if(s===null||t===null||this.screen!=="game")return;const a={...s.local.settings,version:p,quality:e};await t.saveSettings(a),this.context={...s,local:{...s.local,settings:a,settingsSource:"loaded"}};const r=this.root.dataset.expeditionMode==="continue"?"continue":"new-expedition";this.launchGame(r)}clearRuntimeZoomControls(){for(const e of this.runtimeZoomCleanup.splice(0))e()}currentMemory(){return this.sessionMemory??this.requireContext().memory.state}requireContext(){if(this.context===null)throw new Error("Product Shell context is not ready.");return this.context}useFirstUseDeviceRecommendation(){return X(window.location.search,window.location.pathname)}failInjectedPhase(e){if(new URLSearchParams(this.search).get("shellFail")===e&&!this.injectedFailures.has(e))throw this.injectedFailures.add(e),new Error(`Injected ${e} failure for retry verification.`)}syncRootDataset(e){this.root.dataset.productShellState=this.screen,this.root.dataset.productShellPlayerName=this.context?.local.profile?.playerName??"",this.root.dataset.profileStatus=this.context?.local.profile===null?"missing":this.context?.local.profile===void 0?"loading":"ready",this.root.dataset.memoryLoadSource=this.context?.memory.source??"loading",this.root.dataset.profilePersistence=this.profilePersistence,this.root.dataset.worldPersistence=this.worldPersistence,this.root.dataset.manualQuality=this.context?.local.settings.quality??I.quality,this.root.dataset.cameraZoom=String(this.context?.local.settings.cameraZoom??I.cameraZoom),this.root.dataset.loadFailedPhase=this.failedPhase??"none",e!==void 0&&(this.root.dataset.expeditionMode=e)}brandRail(e){return`
      <aside class="shell-brand-rail" aria-hidden="true">
        <b>F.</b><span>${u(e)}</span><i></i><small>F.R.A.M. MODULE ↔ R10 BUILDCRAFT</small>
      </aside>
    `}}function $e(o){if(o.expeditionHistory.length===0)return"まだ世界にはあなたの帰還記録がない。最初の遠征から始められます。";const e=o.installedModule?.moduleId;return`${o.discoveredSites.length} site発見 · ${o.recoveredItems.length}回収 · ${e===void 0?"module未設置":e}`}function Me(o){switch(o){case"complete":return"READY";case"fallback":return"FALLBACK";case"failed":return"FAILED";case"active":return"LOADING";default:return"PENDING"}}function u(o){return o.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const W=document.querySelector("#app");if(W===null)throw new Error("F.R.A.M. Product Shell root was not found.");const Ae=new we(W);Ae.boot();
