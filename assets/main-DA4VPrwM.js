/* empty css               */import{c as T}from"./storageBackend-C_GXSix6.js";import{R as Y,j as W,k,l as $,c as O,P,m as z,p as G,n as j,o as v,q as S,s as V}from"./index-Dec7MNkR.js";import{a as Q,c as K,l as J,s as X}from"./loadR09HeroAsset-sawwftSS.js";const w=1,g=2,p="fram.character.f01.gameplay-bridge-v1",tt=[.85,1,1.15],M=.75,I=1.25,h=.05,et="mobile-safe",st=["version","playerName","characterId","createdAt"],at=["version","quality","cameraZoom"],F=["version","quality"],C={"canopy-relay":"樹冠中継所","flooded-archive":"沈水資料庫"},ot={"pathfinder-array":"経路観測列","relic-overdrive":"遺物過励器"},A={version:g,quality:"pc-ultra",cameraZoom:1};function lt(a,t=new Date){return{version:w,playerName:_(a),characterId:p,createdAt:t.toISOString()}}function rt(a){if(!E(a,st)||a.version!==w||a.characterId!==p||typeof a.playerName!="string"||typeof a.createdAt!="string")return null;try{const t=_(a.playerName),s=a.createdAt;return mt(s)?{version:w,playerName:t,characterId:p,createdAt:s}:null}catch{return null}}function it(a){if(E(a,F)&&a.version===1){const e=a.quality,o=e==="compatibility"?et:e;return $(o)?{version:g,quality:o,cameraZoom:1}:null}if(!E(a,at)||a.version!==g)return null;const t=a.quality;if(!$(t))return null;const s=a.cameraZoom;return q(s)?{version:g,quality:t,cameraZoom:s}:null}function nt(a){try{return rt(JSON.parse(a))}catch{return null}}function ct(a){try{const t=JSON.parse(a),s=it(t);return s===null?null:{settings:s,migratedFrom:E(t,F)&&t.version===1?t.quality==="compatibility"?"compatibility":"settings-v1":null}}catch{return null}}function q(a){return typeof a=="number"&&Number.isFinite(a)&&a>=M&&a<=I}function dt(a){const t=Math.min(I,Math.max(M,Number.isFinite(a)?a:1));return Math.round(t*100)/100}function ut(a){const t=Y[a.buildcraft.equippedBuildId],s=W(a.buildcraft),e=k(a.worldMemory),o=a.worldMemory.installedModule?.moduleId??null,l=a.worldMemory.claimedBaseSiteId;return{identity:{playerName:a.profile.playerName,characterLabel:"F-01",characterId:p},vitals:{hp:a.worldState.player.hp,maxHp:a.worldState.player.maxHp,healingItems:a.worldState.player.healingItems},equipment:{buildId:t.id,buildName:t.name,level:s.level,weaponLabel:t.weaponId==="blade"?"測量刃":"杭打機",salvage:a.buildcraft.salvage},relic:{label:"斥力環 R-17",damage:a.worldState.player.relicDamage,range:a.worldState.player.relicRange,resourceName:t.resource.name,resource:a.buildcraft.resource,resourceMaximum:s.resourceMaximum,cooldownTicks:a.worldState.player.relicCooldownTicks,cooldownMaximumTicks:a.worldState.player.relicCooldownMaxTicks},world:{expeditionCount:a.worldMemory.expeditionHistory.length,discoveredSiteLabels:a.worldMemory.discoveredSites.map(i=>C[i.siteId]),recoveredAvailable:a.worldMemory.recoveredItems.filter(i=>i.status==="available").length,recoveredConsumed:a.worldMemory.recoveredItems.filter(i=>i.status==="consumed").length,baseLabel:l===null?"未確保":C[l],moduleLabel:o===null?"未設置":ot[o],effectLines:[e.routeOverlay?"経路オーバーレイ 有効":"経路オーバーレイ 無効",`探索速度 ×${e.explorationSpeedMultiplier.toFixed(2)}`,e.relicAura?"遺物オーラ 有効":"遺物オーラ 無効",`大技再使用 ×${e.relicCooldownMultiplier.toFixed(2)}`]}}}function _(a){const t=a.trim().replace(/\s+/gu," "),s=Array.from(t).length;if(s<1||s>24||/[\u0000-\u001f\u007f]/u.test(t))throw new TypeError("Player name must be 1-24 visible characters.");return t}function E(a,t){if(typeof a!="object"||a===null||Array.isArray(a))return!1;const s=Object.keys(a).sort();return s.length===t.length&&[...t].sort().every((e,o)=>s[o]===e)}function mt(a){const t=Date.parse(a);return Number.isFinite(t)&&new Date(t).toISOString()===a}const H=["account","save","core-data","visual-pack","playable"];class U extends Error{constructor(t,s,e){super(s,e),this.phase=t,this.name="ProductShellLoadError"}phase}async function ht(a,t=()=>{}){for(const n of H)t({phase:n,state:"pending",detail:"待機中"});const s=await y("account",a.loadAccount,t),e=await y("save",a.loadSave,t),o=await y("core-data",()=>a.loadCoreData(e.value),t),l=await y("visual-pack",a.loadVisualPack,t),i={local:s.value,memory:e.value,core:o.value,heroAssetRequest:l.value};return await y("playable",()=>a.verifyPlayable(i),t),i}async function y(a,t,s){s({phase:a,state:"active",detail:"読み込み中"});try{const e=await t();return s({phase:a,state:e.fallback===!0?"fallback":"complete",detail:e.detail}),e}catch(e){const o=e instanceof Error?e.message:"不明な読み込み失敗";throw s({phase:a,state:"failed",detail:o}),new U(a,`${a} phase failed: ${o}`,{cause:e})}}const D="fram-product-shell.profile-v1",L="fram-product-shell.settings-v1";class pt{constructor(t){this.storage=t}storage;async load(){const[t,s]=await Promise.all([this.storage.get(D),this.storage.get(L)]),e=t===null?null:nt(t),o=s===null?null:ct(s),l=o?.settings??A;return o!==null&&o.migratedFrom!==null&&await this.storage.set(L,JSON.stringify(l)),{profile:e,profileSource:t===null?"empty":e===null?"invalid-fallback":"loaded",settings:l,settingsSource:s===null?"empty":o===null?"invalid-fallback":o.migratedFrom!==null?"migrated":"loaded"}}async saveProfile(t){await this.storage.set(D,JSON.stringify(t))}async saveSettings(t){await this.storage.set(L,JSON.stringify(t))}}const ft="fram-product-shell-local-v1",yt="fram-r09-player-local-v1",gt="world-memory",x={account:"LOCAL PROFILE",save:"WORLD MEMORY","core-data":"R10 CORE DATA","visual-pack":"F-01 VISUAL PACK",playable:"PLAYABLE LINK"};class bt{constructor(t,s=window.location.search){this.root=t,this.search=s}root;search;screen="loading";context=null;localRepository=null;worldRepository=null;profilePersistence="memory";worldPersistence="memory";application=null;runtimeZoomCleanup=[];sessionWorld=null;sessionMemory=null;sessionBuildcraft=null;loadUpdates=new Map;failedPhase=null;injectedFailures=new Set;async boot(){this.screen="loading",this.failedPhase=null,this.context=null,this.sessionWorld=null,this.sessionMemory=null,this.sessionBuildcraft=null,this.loadUpdates.clear(),this.syncRootDataset(),this.renderLoading();const t=O(P).seed;try{this.context=await ht({loadAccount:async()=>{this.failInjectedPhase("account");const s=await T({databaseName:ft,storeName:"product-shell"});this.profilePersistence=s.backend.persistence,this.localRepository=new pt(s.backend);const e=await this.localRepository.load(),o=s.persistence==="memory"||e.profileSource==="invalid-fallback"||e.settingsSource==="invalid-fallback";return{value:e,fallback:o,detail:o?"保存できない場合はこのtab内で継続":e.profile===null?"初回profileの作成待ち":`${e.profile.playerName} / local profile`}},loadSave:async()=>{this.failInjectedPhase("save");const s=await T({databaseName:yt,storeName:gt});this.worldPersistence=s.backend.persistence,this.worldRepository=K(s.backend);const e=await J(this.worldRepository,t),o=s.persistence==="memory"||e.source==="corrupt-fallback"||e.source==="seed-mismatch-fallback";return{value:e,fallback:o,detail:`${e.source} / ${e.state.expeditionHistory.length} expedition`}},loadCoreData:async s=>{this.failInjectedPhase("core-data");const e=z(),o=k(s.state);return{value:{worldState:G(O(P),e,o.relicCooldownMultiplier),buildcraft:e},detail:`${e.equippedBuildId} / WorldMemory v${s.state.version}`}},loadVisualPack:async()=>{this.failInjectedPhase("visual-pack");const s=await Q(this.search);return{value:s,fallback:s.status!=="loaded",detail:s.status==="loaded"?"canonical F-01 loaded":`${s.status} / built-in actor fallback`}},verifyPlayable:async s=>{if(this.failInjectedPhase("playable"),s.memory.state.version!==1||s.core.buildcraft.schemaVersion!==1||s.core.worldState.saveVersion!==1)throw new Error("対応していないlocal state versionです。");return{value:!0,detail:"R09 memory → R10 playable link ready"}}},s=>{this.loadUpdates.set(s.phase,s),this.renderLoading()}),this.screen="title",this.syncRootDataset(),this.renderTitle()}catch(s){this.failedPhase=s instanceof U?s.phase:null,this.screen="error",this.syncRootDataset(),this.renderError(s)}}destroy(){this.clearRuntimeZoomControls(),this.application?.destroy(),this.application=null}renderLoading(){this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--loading" aria-labelledby="shell-loading-title">
        ${this.brandRail("BOOT / LOCAL PRODUCT CELL")}
        <div class="shell-loading-card">
          <span class="shell-kicker">F.R.A.M. / SYSTEM LINK</span>
          <h1 id="shell-loading-title">Loading the next expedition.</h1>
          <p>profile、R09 world memory、R10 rules、F-01 packを別々に確認します。</p>
          <ol class="shell-load-list">
            ${H.map((t,s)=>{const e=this.loadUpdates.get(t)??{state:"pending",detail:"待機中"};return`
                <li data-load-phase="${t}" data-load-state="${e.state}">
                  <b>${String(s+1).padStart(2,"0")}</b>
                  <span><strong>${x[t]}</strong><small>${d(e.detail)}</small></span>
                  <i>${St(e.state)}</i>
                </li>
              `}).join("")}
          </ol>
        </div>
      </section>
    `}renderTitle(t=""){const e=this.requireContext().local.profile,o=this.currentMemory(),l=o.expeditionHistory.length>0;this.screen="title",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--title" aria-labelledby="shell-title">
        ${this.brandRail("LOCAL / OFFLINE AUTHORITY")}
        <header class="shell-title-copy">
          <span class="shell-kicker">FRONTIER RELICS ARCHIVE MODULE</span>
          <h1 id="shell-title">F.R.A.M.</h1>
          <p>記録に残るのは、勝ったことだけではない。<br />選んだ場所と、持ち帰った理由だ。</p>
        </header>
        <div class="shell-title-grid">
          <section class="shell-world-card" aria-label="現在のworld memory">
            <span>CURRENT WORLD / R09 MEMORY</span>
            <strong>${String(o.expeditionHistory.length).padStart(2,"0")} EXPEDITIONS</strong>
            <p>${vt(o)}</p>
            <div><i data-state="${this.worldPersistence}"></i>${this.worldPersistence==="indexeddb"?"IndexedDB / local authority":"Memory fallback / this tab only"}</div>
          </section>
          <nav class="shell-primary-actions" aria-label="Product Shell menu">
            ${e===null?`
              <button type="button" class="shell-action shell-action--primary" data-action="profile">
                <span>01 / FIRST USE</span><strong>Local profileを作る</strong><small>player nameとF-01 identityを分けて保存</small>
              </button>
            `:`
              <button type="button" class="shell-action shell-action--primary" data-action="continue" ${l?"":"disabled"}>
                <span>01 / CONTINUE</span><strong>Continue</strong><small>${l?`遠征 ${o.expeditionHistory.length+1} へ`:"まだ帰還記録はありません"}</small>
              </button>
              <button type="button" class="shell-action" data-action="new-expedition">
                <span>02 / NEW RUN</span><strong>New Expedition</strong><small>world memoryを保ったまま現在遠征を新規化</small>
              </button>
              <button type="button" class="shell-action" data-action="status">
                <span>03 / LIVE DATA</span><strong>Status</strong><small>HP、装備、遺物、module効果</small>
              </button>
              <button type="button" class="shell-action" data-action="settings">
                <span>04 / LOCAL</span><strong>Settings</strong><small>手動renderer profile / auto未使用</small>
              </button>
            `}
          </nav>
        </div>
        <footer class="shell-profile-strip">
          <span>LOCAL PROFILE</span>
          <strong>${e===null?"NOT SET":d(e.playerName)}</strong>
          <small>${e===null?"Google accountは未接続":`F-01 / ${p}`}</small>
          ${e===null?"":'<button type="button" data-action="profile">EDIT NAME</button>'}
        </footer>
        ${t===""?"":`<p class="shell-message" role="status">${d(t)}</p>`}
      </section>
    `,this.bind("profile",()=>this.renderProfile()),this.bind("continue",()=>this.launchGame("continue")),this.bind("new-expedition",()=>this.launchGame("new-expedition")),this.bind("status",()=>this.renderStatus()),this.bind("settings",()=>this.renderSettings())}renderProfile(){const t=this.requireContext().local.profile;this.screen="profile",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--form" aria-labelledby="profile-title">
        ${this.brandRail("PROFILE / LOCAL DEVICE")}
        <form class="shell-form" data-form="profile">
          <span class="shell-kicker">FIRST USE / ONE LOCAL IDENTITY</span>
          <h1 id="profile-title">What should this world call you?</h1>
          <p>game内のplayer nameです。Google表示名と、character identity <b>F-01</b>は変更しません。</p>
          <label>
            <span>PLAYER NAME</span>
            <input name="playerName" type="text" minlength="1" maxlength="24" autocomplete="nickname" value="${t===null?"":d(t.playerName)}" required autofocus />
          </label>
          <dl class="shell-identity-lock">
            <div><dt>ACCOUNT</dt><dd>Local device / offline</dd></div>
            <div><dt>CHARACTER</dt><dd>F-01</dd></div>
            <div><dt>ASSET ID</dt><dd>${p}</dd></div>
          </dl>
          <p class="shell-form-error" data-error role="alert"></p>
          <div class="shell-form-actions">
            <button type="button" data-action="back">Back</button>
            <button type="submit">Save profile</button>
          </div>
        </form>
      </section>
    `,this.bind("back",()=>this.renderTitle());const s=this.root.querySelector('[data-form="profile"]');s?.addEventListener("submit",e=>{e.preventDefault(),this.saveProfile(new FormData(s))})}async saveProfile(t){const s=this.root.querySelector("[data-error]");try{const e=t.get("playerName");if(typeof e!="string")throw new TypeError("名前を入力してください。");const o=lt(e),l=this.localRepository;if(l===null)throw new Error("Local profile repository is unavailable.");await l.saveProfile(o);const i=this.requireContext();this.context={...i,local:{...i.local,profile:o,profileSource:"loaded"}},this.renderTitle("ローカルprofileを保存しました。")}catch(e){s!==null&&(s.textContent=e instanceof Error?e.message:"profileを保存できませんでした。")}}renderSettings(){const t=this.requireContext().local.settings,s=j.map(n=>{const r=v(n),u=r.post.enabled?[r.post.hdr?"HDR":"SDR",r.post.finish.enabled?"Voxel Finish":null,r.post.gtao?"GTAO":null,r.post.bloom?"Bloom":null,r.antialiasing.postSmaa?"SMAA":null].filter(f=>f!==null).join(" + ")||"post direct":"postなし / direct",m=r.resolution.strategy==="fixed-height"?`${r.resolution.fixedHeight}px fixed-height / DPR ${S(r,!0)}`:`viewport ${r.resolution.renderScale}× / DPR cap ${S(r,!0)}`,c=`${r.performance.frameRateIntentHz} FPS INTENT`;return`
        <label class="shell-quality-option" data-quality-profile="${n}">
          <input type="radio" name="quality" value="${n}" ${t.quality===n?"checked":""} />
          <span><strong>${r.label}</strong><small>${d(r.shortDescription)}</small><small>${m} · ${u} · shadow ${r.shadows.mapSize} · surface ${r.effects.surfaceDetail.mode}/${r.effects.surfaceDetail.maximumResolution}px · miniature ${r.post.finish.miniatureDepth.strength} · effects ${r.effects.budget}</small></span>
          <b>${c}</b>
        </label>
      `}).join(""),e=tt.map(n=>`<span>${n.toFixed(2)}×</span>`).join("");this.screen="settings",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--form" aria-labelledby="settings-title">
        ${this.brandRail("SETTINGS / MANUAL BOUNDARY")}
        <form class="shell-form" data-form="settings">
          <span class="shell-kicker">RENDER QUALITY / SAVED LOCALLY</span>
          <h1 id="settings-title">Choose the renderer you want now.</h1>
          <p>四つとも実在する手動profileです。自動選択は未実装です。</p>
          ${s}
          <fieldset class="shell-zoom-settings">
            <legend>CAMERA ZOOM / MANUAL</legend>
            <p>品質tierとは独立。プレイ中もホイール、−／＋ボタン、キーで連続的に変更し、即座に保存します。</p>
            <label class="shell-zoom-range">
              <span><strong>WIDE</strong><output data-zoom-output>${t.cameraZoom.toFixed(2)}×</output><strong>CLOSE</strong></span>
              <input type="range" name="cameraZoom" min="${M}" max="${I}" step="${h}" value="${t.cameraZoom}" />
              <small>${e}</small>
            </label>
          </fieldset>
          <aside class="shell-auto-note"><span>AUTO QUALITY</span><strong>NOT IMPLEMENTED</strong><p>端末自動判定、hidden benchmark、実行中の自動縮退は行いません。</p></aside>
          <div class="shell-form-actions">
            <button type="button" data-action="back">Back</button>
            <button type="submit">Save settings</button>
          </div>
        </form>
      </section>
    `,this.bind("back",()=>this.renderTitle());const o=this.root.querySelector('[data-form="settings"]'),l=o?.elements.namedItem("cameraZoom"),i=o?.querySelector("[data-zoom-output]");l instanceof HTMLInputElement&&i instanceof HTMLOutputElement&&l.addEventListener("input",()=>{i.value=`${Number(l.value).toFixed(2)}×`}),o?.addEventListener("submit",n=>{n.preventDefault(),this.saveSettings(new FormData(o))})}async saveSettings(t){const s=t.get("quality");if(!$(s))return;const e=t.get("cameraZoom"),o=typeof e=="string"?Number(e):Number.NaN;if(!q(o))return;const l={version:g,quality:s,cameraZoom:o},i=this.localRepository;if(i===null)throw new Error("Local settings repository is unavailable.");await i.saveSettings(l);const n=this.requireContext();this.context={...n,local:{...n.local,settings:l,settingsSource:"loaded"}},this.renderTitle(`${v(s).label} / camera ${o.toFixed(2)}×を保存しました。自動選択は未実装です。`)}renderStatus(){const t=this.requireContext(),s=t.local.profile;if(s===null){this.renderProfile();return}const e=ut({profile:s,worldMemory:this.currentMemory(),worldState:this.sessionWorld??t.core.worldState,buildcraft:this.sessionBuildcraft??t.core.buildcraft}),o=v(t.local.settings.quality),l=t.local.settings.cameraZoom,i=o.presentation.cameraViewHeight/l;this.screen="status",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--status" aria-labelledby="status-title">
        ${this.brandRail("STATUS / REAL STATE")}
        <header class="shell-status-head">
          <div><span class="shell-kicker">F.R.A.M. INSTANCE / ${d(e.identity.playerName)}</span><h1 id="status-title">F-01 field status.</h1></div>
          <button type="button" data-action="back">Back to Title</button>
        </header>
        <div class="shell-status-grid">
          <article class="shell-status-card shell-status-card--vitals">
            <span>IDENTITY / BODY</span>
            <strong>${d(e.identity.playerName)} <i>F-01</i></strong>
            <div class="shell-hp"><b style="width:${Math.round(e.vitals.hp/e.vitals.maxHp*100)}%"></b></div>
            <p>HP ${e.vitals.hp} / ${e.vitals.maxHp} · 縫合剤 ${e.vitals.healingItems}</p>
            <small>${e.identity.characterId}</small>
          </article>
          <article class="shell-status-card">
            <span>EQUIPMENT / R10 LIVE</span>
            <strong>${d(e.equipment.buildName)}</strong>
            <dl><div><dt>LEVEL</dt><dd>${e.equipment.level}</dd></div><div><dt>WEAPON</dt><dd>${e.equipment.weaponLabel}</dd></div><div><dt>SALVAGE</dt><dd>${e.equipment.salvage}</dd></div></dl>
            <small>current expedition/session state</small>
          </article>
          <article class="shell-status-card">
            <span>MANUAL RELIC / RESOURCE</span>
            <strong>${e.relic.label}</strong>
            <dl><div><dt>DAMAGE</dt><dd>${e.relic.damage}</dd></div><div><dt>RANGE</dt><dd>${e.relic.range}</dd></div><div><dt>${e.relic.resourceName}</dt><dd>${e.relic.resource} / ${e.relic.resourceMaximum}</dd></div></dl>
            <small>cooldown ${e.relic.cooldownTicks} / ${e.relic.cooldownMaximumTicks} ticks</small>
          </article>
          <article class="shell-status-card shell-status-card--world">
            <span>WORLD MEMORY / R09 PERSISTENT</span>
            <strong>${e.world.expeditionCount} EXPEDITIONS</strong>
            <dl><div><dt>SITES</dt><dd>${e.world.discoveredSiteLabels.join(" / ")||"未発見"}</dd></div><div><dt>BASE</dt><dd>${e.world.baseLabel}</dd></div><div><dt>MODULE</dt><dd>${e.world.moduleLabel}</dd></div><div><dt>RECOVERED</dt><dd>${e.world.recoveredAvailable} available / ${e.world.recoveredConsumed} consumed</dd></div></dl>
            <ul>${e.world.effectLines.map(n=>`<li>${d(n)}</li>`).join("")}</ul>
          </article>
          <article class="shell-status-card shell-status-card--quality">
            <span>RENDER QUALITY / MANUAL</span>
            <strong>${o.label}</strong>
            <dl><div><dt>FRAME INTENT</dt><dd>${o.performance.frameRateIntentHz} FPS</dd></div><div><dt>RESOLUTION</dt><dd>${o.resolution.strategy} / ${o.resolution.renderScale}× / DPR cap ${S(o,!0)}</dd></div><div><dt>CAMERA</dt><dd>${l.toFixed(2)}× / effective ${i.toFixed(1)} view-height</dd></div><div><dt>POST</dt><dd>${o.post.hdr?"HDR":"SDR"} / ${o.post.finish.look} / bloom ${o.post.bloomStrength} / miniature ${o.post.finish.miniatureDepth.strength}</dd></div><div><dt>SHADOW</dt><dd>${o.shadows.mapSize} / ${o.shadows.filter} r${o.shadows.radius}</dd></div><div><dt>SURFACE</dt><dd>${o.effects.surfaceDetail.mode} / ${o.effects.surfaceDetail.maximumResolution}px / N ${o.effects.surfaceDetail.normalStrength} / reflection ${o.effects.surfaceDetail.reflectionCoverage}</dd></div><div><dt>ATMOSPHERE</dt><dd>fog ${o.effects.atmosphere.fogNearMultiplier}/${o.effects.atmosphere.fogFarMultiplier} / sun ${o.effects.atmosphere.sunIntensityMultiplier}× / shafts ${o.effects.atmosphere.lightShaftCount}</dd></div><div><dt>EFFECTS</dt><dd>${o.effects.budget} / practical ${o.effects.practicalLightCount} / attack echo ${o.effects.attackEchoes}</dd></div></dl>
            <small>自動選択は未実装 / selected locally</small>
          </article>
        </div>
      </section>
    `,this.bind("back",()=>this.renderTitle())}launchGame(t){const s=this.requireContext();if(s.local.profile===null){this.renderProfile();return}this.application?.destroy(),this.clearRuntimeZoomControls();const e=document.createElement("div");e.className="product-shell-game-mount",e.dataset.launchMode=t;const o=document.createElement("button");o.type="button",o.className="product-shell-return",o.dataset.action="return-shell",o.innerHTML="<span>RETURN</span><strong>Product Shell</strong>",o.addEventListener("click",()=>this.returnFromGame());const l=v(s.local.settings.quality),i=s.local.settings.cameraZoom,n=document.createElement("aside");n.className="product-shell-quality-badge",n.dataset.qualityBadge=l.id,n.innerHTML=`
      <span>MANUAL PROFILE / AUTO NOT IMPLEMENTED</span>
      <strong>${l.label}</strong>
      <small>${l.performance.frameRateIntentHz} FPS INTENT · ZOOM ${i.toFixed(2)}× · ${l.resolution.renderScale}× · DPR ${S(l,!0)} · ${l.post.hdr?"HDR":"SDR"} · FINISH ${l.post.finish.voxelClarity}/${l.post.finish.voxelEdge} · MINI ${l.post.finish.miniatureDepth.strength} · TEX ${l.effects.surfaceDetail.mode} · SUN ${l.effects.atmosphere.sunIntensityMultiplier}× · BLOOM ${l.post.bloomStrength} · ECHO ${l.effects.attackEchoes} · FX ${l.effects.budget.toUpperCase()}</small>
    `;const r=document.createElement("aside");r.className="product-shell-camera-zoom",r.setAttribute("aria-label","プレイ中のカメラズーム"),r.innerHTML=`
      <button type="button" data-camera-zoom="out" aria-label="カメラを引く">−</button>
      <output data-runtime-zoom>${i.toFixed(2)}×</output>
      <button type="button" data-camera-zoom="in" aria-label="カメラを寄せる">＋</button>
      <small>WHEEL / − +</small>
    `,this.root.className="product-shell-host is-game",this.root.replaceChildren(e,o,n,r),this.screen="game",this.syncRootDataset(t);const u=this.worldRepository;if(u===null)throw new Error("World memory repository is unavailable.");this.application=V(e,{experience:"r10",renderQuality:s.local.settings.quality,cameraZoomMultiplier:i,companionPreview:!1,semiAutoCombat:!0,heroAssetRequest:s.heroAssetRequest,worldMemoryRuntime:{initialState:this.currentMemory(),loadSource:s.memory.source,onCommit:async m=>{await X(u,m),this.sessionMemory=m}}}),this.application.start(),e.classList.add("product-shell-game-mount"),e.dataset.productShellLinked="true",this.bindRuntimeZoomControls(e,r,n)}returnFromGame(){const t=this.application;t!==null&&(this.sessionWorld=t.getState(),this.sessionMemory=t.getWorldMemory()??this.sessionMemory,this.sessionBuildcraft=t.getBuildcraftState()??this.sessionBuildcraft,t.destroy()),this.clearRuntimeZoomControls(),this.application=null,this.renderTitle("遠征からshellへ戻りました。Statusは現在のlive stateを表示します。")}renderError(t){const s=t instanceof Error?t.message:"Product Shellを起動できませんでした。";this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--error" aria-labelledby="shell-error-title">
        ${this.brandRail("LOAD FAILURE / RECOVERABLE")}
        <div class="shell-error-card" role="alert">
          <span class="shell-kicker">${this.failedPhase===null?"UNKNOWN PHASE":x[this.failedPhase]}</span>
          <h1 id="shell-error-title">The link stopped before play.</h1>
          <p>${d(s)}</p>
          <div class="shell-error-actions">
            <button type="button" data-action="retry">Retry load</button>
            <a href="/game/r09/">Open archived R09</a>
          </div>
          <small>Retryはprofile、save、core、visualの同じ実operationを再実行します。</small>
        </div>
      </section>
    `,this.bind("retry",()=>{this.boot()})}bind(t,s){this.root.querySelector(`[data-action="${t}"]`)?.addEventListener("click",s)}bindRuntimeZoomControls(t,s,e){const o=c=>{const f=this.application;if(f===null)return;const B=f.getCameraZoomMultiplier(),b=f.setCameraZoomMultiplier(dt(B+c)),N=s.querySelector("[data-runtime-zoom]");N!==null&&(N.value=`${b.toFixed(2)}×`),s.dataset.cameraZoom=String(b);const R=e.querySelector("small");R!==null&&(R.textContent=R.textContent?.replace(/ZOOM\s+\d+(?:\.\d+)?×/,`ZOOM ${b.toFixed(2)}×`)??""),this.persistRuntimeZoom(b)},l=s.querySelector('[data-camera-zoom="out"]'),i=s.querySelector('[data-camera-zoom="in"]'),n=()=>o(-h),r=()=>o(h),u=c=>{c.preventDefault(),o(c.deltaY<0?h:-h)},m=c=>{["Equal","NumpadAdd","BracketRight"].includes(c.code)?(c.preventDefault(),o(h)):["Minus","NumpadSubtract","BracketLeft"].includes(c.code)&&(c.preventDefault(),o(-h))};l?.addEventListener("click",n),i?.addEventListener("click",r),t.addEventListener("wheel",u,{passive:!1}),window.addEventListener("keydown",m),this.runtimeZoomCleanup.push(()=>l?.removeEventListener("click",n),()=>i?.removeEventListener("click",r),()=>t.removeEventListener("wheel",u),()=>window.removeEventListener("keydown",m))}persistRuntimeZoom(t){const s=this.context,e=this.localRepository;if(s===null||e===null)return;const o={...s.local.settings,cameraZoom:t};this.context={...s,local:{...s.local,settings:o,settingsSource:"loaded"}},this.syncRootDataset(),e.saveSettings(o)}clearRuntimeZoomControls(){for(const t of this.runtimeZoomCleanup.splice(0))t()}currentMemory(){return this.sessionMemory??this.requireContext().memory.state}requireContext(){if(this.context===null)throw new Error("Product Shell context is not ready.");return this.context}failInjectedPhase(t){if(new URLSearchParams(this.search).get("shellFail")===t&&!this.injectedFailures.has(t))throw this.injectedFailures.add(t),new Error(`Injected ${t} failure for retry verification.`)}syncRootDataset(t){this.root.dataset.productShellState=this.screen,this.root.dataset.profileStatus=this.context?.local.profile===null?"missing":this.context?.local.profile===void 0?"loading":"ready",this.root.dataset.memoryLoadSource=this.context?.memory.source??"loading",this.root.dataset.profilePersistence=this.profilePersistence,this.root.dataset.worldPersistence=this.worldPersistence,this.root.dataset.manualQuality=this.context?.local.settings.quality??A.quality,this.root.dataset.cameraZoom=String(this.context?.local.settings.cameraZoom??A.cameraZoom),this.root.dataset.loadFailedPhase=this.failedPhase??"none",t!==void 0&&(this.root.dataset.expeditionMode=t)}brandRail(t){return`
      <aside class="shell-brand-rail" aria-hidden="true">
        <b>F.</b><span>${d(t)}</span><i></i><small>R09 MEMORY ↔ R10 BUILDCRAFT</small>
      </aside>
    `}}function vt(a){if(a.expeditionHistory.length===0)return"まだ世界にはあなたの帰還記録がない。最初の遠征から始められます。";const t=a.installedModule?.moduleId;return`${a.discoveredSites.length} site発見 · ${a.recoveredItems.length}回収 · ${t===void 0?"module未設置":t}`}function St(a){switch(a){case"complete":return"READY";case"fallback":return"FALLBACK";case"failed":return"FAILED";case"active":return"LOADING";default:return"PENDING"}}function d(a){return a.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Z=document.querySelector("#app");if(Z===null)throw new Error("F.R.A.M. Product Shell root was not found.");const Et=new bt(Z);Et.boot();
