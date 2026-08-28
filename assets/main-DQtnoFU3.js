/* empty css               */import{c as O}from"./storageBackend-C_GXSix6.js";import{R as G,p as z,q,r as $,t as C,u as Q,g as D,P as x,v as V,w as j,x as K,y as v,z as E,s as J,A as X}from"./index-BcHpSTKs.js";import{a as ee,c as te,l as se,s as ae}from"./loadR09HeroAsset-De3nsalV.js";const A=1,p=2,f="fram.character.f01.gameplay-bridge-v1",oe=[.85,1,1.15],N=.75,T=1.25,h=.05,ie="mobile-safe",re=["version","playerName","characterId","createdAt"],le=["version","quality","cameraZoom"],H=["version","quality"],F={"canopy-relay":"樹冠中継所","flooded-archive":"沈水資料庫"},ne={"pathfinder-array":"経路観測列","relic-overdrive":"遺物過励器"},I={version:p,quality:"pc-ultra",cameraZoom:1};function ce(t,e=new Date){return{version:A,playerName:Z(t),characterId:f,createdAt:e.toISOString()}}function de(t){if(!R(t,re)||t.version!==A||t.characterId!==f||typeof t.playerName!="string"||typeof t.createdAt!="string")return null;try{const e=Z(t.playerName),a=t.createdAt;return ye(a)?{version:A,playerName:e,characterId:f,createdAt:a}:null}catch{return null}}function ue(t){if(R(t,H)&&t.version===1){const s=t.quality,o=s==="compatibility"?ie:s;return $(o)?{version:p,quality:o,cameraZoom:1}:null}if(!R(t,le)||t.version!==p)return null;const e=t.quality;if(!$(e))return null;const a=t.cameraZoom;return _(a)?{version:p,quality:e,cameraZoom:a}:null}function me(t){try{return de(JSON.parse(t))}catch{return null}}function he(t){try{const e=JSON.parse(t),a=ue(e);return a===null?null:{settings:a,migratedFrom:R(e,H)&&e.version===1?e.quality==="compatibility"?"compatibility":"settings-v1":null}}catch{return null}}function _(t){return typeof t=="number"&&Number.isFinite(t)&&t>=N&&t<=T}function pe(t){const e=Math.min(T,Math.max(N,Number.isFinite(t)?t:1));return Math.round(e*100)/100}function fe(t){const e=G[t.buildcraft.equippedBuildId],a=z(t.buildcraft),s=q(t.worldMemory),o=t.worldMemory.installedModule?.moduleId??null,i=t.worldMemory.claimedBaseSiteId;return{identity:{playerName:t.profile.playerName,characterLabel:"F-01",characterId:f},vitals:{hp:t.worldState.player.hp,maxHp:t.worldState.player.maxHp,healingItems:t.worldState.player.healingItems},equipment:{buildId:e.id,buildName:e.name,level:a.level,weaponLabel:e.weaponId==="blade"?"測量刃":"杭打機",salvage:t.buildcraft.salvage},relic:{label:"斥力環 R-17",damage:t.worldState.player.relicDamage,range:t.worldState.player.relicRange,resourceName:e.resource.name,resource:t.buildcraft.resource,resourceMaximum:a.resourceMaximum,cooldownTicks:t.worldState.player.relicCooldownTicks,cooldownMaximumTicks:t.worldState.player.relicCooldownMaxTicks},world:{expeditionCount:t.worldMemory.expeditionHistory.length,discoveredSiteLabels:t.worldMemory.discoveredSites.map(r=>F[r.siteId]),recoveredAvailable:t.worldMemory.recoveredItems.filter(r=>r.status==="available").length,recoveredConsumed:t.worldMemory.recoveredItems.filter(r=>r.status==="consumed").length,baseLabel:i===null?"未確保":F[i],moduleLabel:o===null?"未設置":ne[o],effectLines:[s.routeOverlay?"経路オーバーレイ 有効":"経路オーバーレイ 無効",`探索速度 ×${s.explorationSpeedMultiplier.toFixed(2)}`,s.relicAura?"遺物オーラ 有効":"遺物オーラ 無効",`大技再使用 ×${s.relicCooldownMultiplier.toFixed(2)}`]}}}function Z(t){const e=t.trim().replace(/\s+/gu," "),a=Array.from(e).length;if(a<1||a>24||/[\u0000-\u001f\u007f]/u.test(e))throw new TypeError("Player name must be 1-24 visible characters.");return e}function R(t,e){if(typeof t!="object"||t===null||Array.isArray(t))return!1;const a=Object.keys(t).sort();return a.length===e.length&&[...e].sort().every((s,o)=>a[o]===s)}function ye(t){const e=Date.parse(t);return Number.isFinite(e)&&new Date(e).toISOString()===t}const B=["account","save","core-data","visual-pack","playable"];class Y extends Error{constructor(e,a,s){super(a,s),this.phase=e,this.name="ProductShellLoadError"}phase}async function ge(t,e=()=>{}){for(const n of B)e({phase:n,state:"pending",detail:"待機中"});const a=await g("account",t.loadAccount,e),s=await g("save",t.loadSave,e),o=await g("core-data",()=>t.loadCoreData(s.value),e),i=await g("visual-pack",t.loadVisualPack,e),r={local:a.value,memory:s.value,core:o.value,heroAssetRequest:i.value};return await g("playable",()=>t.verifyPlayable(r),e),r}async function g(t,e,a){a({phase:t,state:"active",detail:"読み込み中"});try{const s=await e();return a({phase:t,state:s.fallback===!0?"fallback":"complete",detail:s.detail}),s}catch(s){const o=s instanceof Error?s.message:"不明な読み込み失敗";throw a({phase:t,state:"failed",detail:o}),new Y(t,`${t} phase failed: ${o}`,{cause:s})}}const k="fram-product-shell.profile-v1",M="fram-product-shell.settings-v1";class be{constructor(e){this.storage=e}storage;async load(){const[e,a]=await Promise.all([this.storage.get(k),this.storage.get(M)]),s=e===null?null:me(e),o=a===null?null:he(a),i=o?.settings??I;return o!==null&&o.migratedFrom!==null&&await this.storage.set(M,JSON.stringify(i)),{profile:s,profileSource:e===null?"empty":s===null?"invalid-fallback":"loaded",settings:i,settingsSource:a===null?"empty":o===null?"invalid-fallback":o.migratedFrom!==null?"migrated":"loaded"}}async saveProfile(e){await this.storage.set(k,JSON.stringify(e))}async saveSettings(e){await this.storage.set(M,JSON.stringify(e))}}function ve(t){const e=t.navigator;return{coarsePointer:typeof t.matchMedia=="function"&&t.matchMedia("(pointer: coarse)").matches,touchPoints:S(t.navigator.maxTouchPoints)??0,viewportWidth:t.innerWidth,viewportHeight:t.innerHeight,hardwareConcurrency:S(t.navigator.hardwareConcurrency),deviceMemoryGb:S(e.deviceMemory),devicePixelRatio:Math.max(1,S(t.devicePixelRatio)??1)}}function Ee(t){if(!t.recommendationEnabled||t.settingsSource!=="empty")return t.settings;const e=Math.min(t.signals.viewportWidth,t.signals.viewportHeight);if(!(t.signals.touchPoints>0&&(t.signals.coarsePointer||e<=600)))return t.settings;const s=t.signals.deviceMemoryGb!==void 0&&t.signals.deviceMemoryGb<=4||t.signals.hardwareConcurrency!==void 0&&t.signals.hardwareConcurrency<=4,o=(t.signals.hardwareConcurrency??0)>=6&&(t.signals.deviceMemoryGb===void 0||t.signals.deviceMemoryGb>=6)&&t.signals.devicePixelRatio>=2&&e>=380,i=(t.signals.hardwareConcurrency??0)>=5&&(t.signals.deviceMemoryGb===void 0||t.signals.deviceMemoryGb>=4)&&t.signals.devicePixelRatio>=1.5;return{...t.settings,quality:!s&&(o||i)?"mobile-high":"mobile-safe"}}function S(t){return typeof t=="number"&&Number.isFinite(t)?t:void 0}const Se="fram-product-shell-local-v1",Re="fram-r09-player-local-v1",Le="world-memory",U={account:"LOCAL PROFILE",save:"WORLD MEMORY","core-data":"R10 CORE DATA","visual-pack":"F-01 VISUAL PACK",playable:"PLAYABLE LINK"};class we{constructor(e,a=window.location.search){this.root=e,this.search=a,window.addEventListener(C,this.runtimeQualityHandler)}root;search;screen="loading";context=null;localRepository=null;worldRepository=null;profilePersistence="memory";worldPersistence="memory";application=null;runtimeZoomCleanup=[];sessionWorld=null;sessionMemory=null;sessionBuildcraft=null;loadUpdates=new Map;failedPhase=null;injectedFailures=new Set;runtimeQualityHandler=e=>{const a=Q(e);a===null||this.screen!=="game"||this.applyRuntimeQuality(a.quality)};async boot(){this.screen="loading",this.failedPhase=null,this.context=null,this.sessionWorld=null,this.sessionMemory=null,this.sessionBuildcraft=null,this.loadUpdates.clear(),this.syncRootDataset(),this.renderLoading();const e=D(x).seed;try{this.context=await ge({loadAccount:async()=>{this.failInjectedPhase("account");const a=await O({databaseName:Se,storeName:"product-shell"});this.profilePersistence=a.backend.persistence,this.localRepository=new be(a.backend);const s=await this.localRepository.load(),o=this.useFirstUseDeviceRecommendation(),i=Ee({settings:s.settings,settingsSource:s.settingsSource,recommendationEnabled:o,signals:ve(window)});s.settingsSource==="empty"&&o&&await this.localRepository.saveSettings(i);const r=s.settingsSource==="empty"&&o?{...s,settings:i,settingsSource:"loaded"}:s,n=a.persistence==="memory"||r.profileSource==="invalid-fallback"||s.settingsSource==="invalid-fallback";return{value:r,fallback:n,detail:n?"保存できない場合はこのtab内で継続":r.profile===null?"初回profileの作成待ち":`${r.profile.playerName} / local profile`}},loadSave:async()=>{this.failInjectedPhase("save");const a=await O({databaseName:Re,storeName:Le});this.worldPersistence=a.backend.persistence,this.worldRepository=te(a.backend);const s=await se(this.worldRepository,e),o=a.persistence==="memory"||s.source==="corrupt-fallback"||s.source==="seed-mismatch-fallback";return{value:s,fallback:o,detail:`${s.source} / ${s.state.expeditionHistory.length} expedition`}},loadCoreData:async a=>{this.failInjectedPhase("core-data");const s=V(),o=q(a.state);return{value:{worldState:j(D(x),s,o.relicCooldownMultiplier),buildcraft:s},detail:`${s.equippedBuildId} / WorldMemory v${a.state.version}`}},loadVisualPack:async()=>{this.failInjectedPhase("visual-pack");const a=await ee(this.search);return{value:a,fallback:a.status!=="loaded",detail:a.status==="loaded"?"canonical F-01 loaded":`${a.status} / built-in actor fallback`}},verifyPlayable:async a=>{if(this.failInjectedPhase("playable"),a.memory.state.version!==1||a.core.buildcraft.schemaVersion!==1||a.core.worldState.saveVersion!==1)throw new Error("対応していないlocal state versionです。");return{value:!0,detail:"R09 memory → R10 playable link ready"}}},a=>{this.loadUpdates.set(a.phase,a),this.renderLoading()}),this.screen="title",this.syncRootDataset(),this.renderTitle()}catch(a){this.failedPhase=a instanceof Y?a.phase:null,this.screen="error",this.syncRootDataset(),this.renderError(a)}}destroy(){window.removeEventListener(C,this.runtimeQualityHandler),this.clearRuntimeZoomControls(),this.application?.destroy(),this.application=null}renderLoading(){this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--loading" aria-labelledby="shell-loading-title">
        ${this.brandRail("BOOT / LOCAL PRODUCT CELL")}
        <div class="shell-loading-card">
          <span class="shell-kicker">F.R.A.M. / SYSTEM LINK</span>
          <h1 id="shell-loading-title">Loading the next expedition.</h1>
          <p>profile、R09 world memory、R10 rules、F-01 packを別々に確認します。</p>
          <ol class="shell-load-list">
            ${B.map((e,a)=>{const s=this.loadUpdates.get(e)??{state:"pending",detail:"待機中"};return`
                <li data-load-phase="${e}" data-load-state="${s.state}">
                  <b>${String(a+1).padStart(2,"0")}</b>
                  <span><strong>${U[e]}</strong><small>${u(s.detail)}</small></span>
                  <i>${$e(s.state)}</i>
                </li>
              `}).join("")}
          </ol>
        </div>
      </section>
    `}renderTitle(e=""){const s=this.requireContext().local.profile,o=this.currentMemory(),i=o.expeditionHistory.length>0,r=this.useFirstUseDeviceRecommendation();this.screen="title",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
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
            <p>${Me(o)}</p>
            <div><i data-state="${this.worldPersistence}"></i>${this.worldPersistence==="indexeddb"?"IndexedDB / local authority":"Memory fallback / this tab only"}</div>
          </section>
          <nav class="shell-primary-actions" aria-label="Product Shell menu">
            ${s===null?`
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
                <span>04 / LOCAL</span><strong>Settings</strong><small>${r?"初回端末推奨 / 手動上書き保存":"手動renderer profile / auto未使用"}</small>
              </button>
            `}
          </nav>
        </div>
        <footer class="shell-profile-strip">
          <span>LOCAL PROFILE</span>
          <strong>${s===null?"NOT SET":u(s.playerName)}</strong>
          <small>${s===null?"Google accountは未接続":`F-01 / ${f}`}</small>
          ${s===null?"":'<button type="button" data-action="profile">EDIT NAME</button>'}
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
    `,this.bind("back",()=>this.renderTitle());const a=this.root.querySelector('[data-form="profile"]');a?.addEventListener("submit",s=>{s.preventDefault(),this.saveProfile(new FormData(a))})}async saveProfile(e){const a=this.root.querySelector("[data-error]");try{const s=e.get("playerName");if(typeof s!="string")throw new TypeError("名前を入力してください。");const o=ce(s),i=this.localRepository;if(i===null)throw new Error("Local profile repository is unavailable.");await i.saveProfile(o);const r=this.requireContext();this.context={...r,local:{...r.local,profile:o,profileSource:"loaded"}},this.renderTitle("ローカルprofileを保存しました。")}catch(s){a!==null&&(a.textContent=s instanceof Error?s.message:"profileを保存できませんでした。")}}renderSettings(){const e=this.requireContext().local.settings,a=this.useFirstUseDeviceRecommendation(),s=K.map(c=>{const l=v(c),m=l.post.enabled?[l.post.hdr?"HDR":"SDR",l.post.finish.enabled?"Voxel Finish":null,l.post.gtao?"GTAO":null,l.post.bloom?"Bloom":null,l.antialiasing.postSmaa?"SMAA":null].filter(L=>L!==null).join(" + ")||"post direct":"postなし / direct",d=l.resolution.strategy==="fixed-height"?`${l.resolution.fixedHeight}px fixed-height / DPR ${E(l,!0)}`:`viewport ${l.resolution.renderScale}× / DPR cap ${E(l,!0)}`,y=`${l.performance.frameRateIntentHz} FPS INTENT`;return`
        <label class="shell-quality-option" data-quality-profile="${c}">
          <input type="radio" name="quality" value="${c}" ${e.quality===c?"checked":""} />
          <span><strong>${l.label}</strong><small>${u(l.shortDescription)}</small><small>${d} · ${m} · shadow ${l.shadows.mapSize} · surface ${l.effects.surfaceDetail.mode}/${l.effects.surfaceDetail.maximumResolution}px · miniature ${l.post.finish.miniatureDepth.strength} · effects ${l.effects.budget}</small></span>
          <b>${y}</b>
        </label>
      `}).join(""),o=oe.map(c=>`<span>${c.toFixed(2)}×</span>`).join("");this.screen="settings",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--form" aria-labelledby="settings-title">
        ${this.brandRail("SETTINGS / MANUAL BOUNDARY")}
        <form class="shell-form" data-form="settings">
          <span class="shell-kicker">RENDER QUALITY / SAVED LOCALLY</span>
          <h1 id="settings-title">Choose the renderer you want now.</h1>
          <p>${a?"初回は端末向けの推奨値を設定します。ここで選んだprofileは保存され、次回以降も最優先されます。":"四つとも実在する手動profileです。自動選択は未実装です。"}</p>
          ${s}
          <fieldset class="shell-zoom-settings">
            <legend>CAMERA ZOOM / MANUAL</legend>
            <p>品質tierとは独立。プレイ中もホイール、−／＋ボタン、キーで連続的に変更し、即座に保存します。</p>
            <label class="shell-zoom-range">
              <span><strong>WIDE</strong><output data-zoom-output>${e.cameraZoom.toFixed(2)}×</output><strong>CLOSE</strong></span>
              <input type="range" name="cameraZoom" min="${N}" max="${T}" step="${h}" value="${e.cameraZoom}" />
              <small>${o}</small>
            </label>
          </fieldset>
          <aside class="shell-auto-note"><span>${a?"FIRST-USE DEFAULT":"AUTO QUALITY"}</span><strong>${a?"DEVICE RECOMMENDATION":"NOT IMPLEMENTED"}</strong><p>${a?"初回だけ端末情報から推奨します。実行中の自動切替はせず、手動設定を常に優先します。":"端末自動判定、hidden benchmark、実行中の自動縮退は行いません。"}</p></aside>
          <div class="shell-form-actions">
            <button type="button" data-action="back">Back</button>
            <button type="submit">Save settings</button>
          </div>
        </form>
      </section>
    `,this.bind("back",()=>this.renderTitle());const i=this.root.querySelector('[data-form="settings"]'),r=i?.elements.namedItem("cameraZoom"),n=i?.querySelector("[data-zoom-output]");r instanceof HTMLInputElement&&n instanceof HTMLOutputElement&&r.addEventListener("input",()=>{n.value=`${Number(r.value).toFixed(2)}×`}),i?.addEventListener("submit",c=>{c.preventDefault(),this.saveSettings(new FormData(i))})}async saveSettings(e){const a=e.get("quality");if(!$(a))return;const s=e.get("cameraZoom"),o=typeof s=="string"?Number(s):Number.NaN;if(!_(o))return;const i={version:p,quality:a,cameraZoom:o},r=this.localRepository;if(r===null)throw new Error("Local settings repository is unavailable.");await r.saveSettings(i);const n=this.requireContext();this.context={...n,local:{...n.local,settings:i,settingsSource:"loaded"}},this.renderTitle(`${v(a).label} / camera ${o.toFixed(2)}×を手動設定として保存しました。`)}renderStatus(){const e=this.requireContext(),a=e.local.profile;if(a===null){this.renderProfile();return}const s=fe({profile:a,worldMemory:this.currentMemory(),worldState:this.sessionWorld??e.core.worldState,buildcraft:this.sessionBuildcraft??e.core.buildcraft}),o=v(e.local.settings.quality),i=e.local.settings.cameraZoom,r=o.presentation.cameraViewHeight/i,n=this.useFirstUseDeviceRecommendation();this.screen="status",this.syncRootDataset(),this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--status" aria-labelledby="status-title">
        ${this.brandRail("STATUS / REAL STATE")}
        <header class="shell-status-head">
          <div><span class="shell-kicker">F.R.A.M. INSTANCE / ${u(s.identity.playerName)}</span><h1 id="status-title">F-01 field status.</h1></div>
          <button type="button" data-action="back">Back to Title</button>
        </header>
        <div class="shell-status-grid">
          <article class="shell-status-card shell-status-card--vitals">
            <span>IDENTITY / BODY</span>
            <strong>${u(s.identity.playerName)} <i>F-01</i></strong>
            <div class="shell-hp"><b style="width:${Math.round(s.vitals.hp/s.vitals.maxHp*100)}%"></b></div>
            <p>HP ${s.vitals.hp} / ${s.vitals.maxHp} · 縫合剤 ${s.vitals.healingItems}</p>
            <small>${s.identity.characterId}</small>
          </article>
          <article class="shell-status-card">
            <span>EQUIPMENT / R10 LIVE</span>
            <strong>${u(s.equipment.buildName)}</strong>
            <dl><div><dt>LEVEL</dt><dd>${s.equipment.level}</dd></div><div><dt>WEAPON</dt><dd>${s.equipment.weaponLabel}</dd></div><div><dt>SALVAGE</dt><dd>${s.equipment.salvage}</dd></div></dl>
            <small>current expedition/session state</small>
          </article>
          <article class="shell-status-card">
            <span>MANUAL RELIC / RESOURCE</span>
            <strong>${s.relic.label}</strong>
            <dl><div><dt>DAMAGE</dt><dd>${s.relic.damage}</dd></div><div><dt>RANGE</dt><dd>${s.relic.range}</dd></div><div><dt>${s.relic.resourceName}</dt><dd>${s.relic.resource} / ${s.relic.resourceMaximum}</dd></div></dl>
            <small>cooldown ${s.relic.cooldownTicks} / ${s.relic.cooldownMaximumTicks} ticks</small>
          </article>
          <article class="shell-status-card shell-status-card--world">
            <span>WORLD MEMORY / R09 PERSISTENT</span>
            <strong>${s.world.expeditionCount} EXPEDITIONS</strong>
            <dl><div><dt>SITES</dt><dd>${s.world.discoveredSiteLabels.join(" / ")||"未発見"}</dd></div><div><dt>BASE</dt><dd>${s.world.baseLabel}</dd></div><div><dt>MODULE</dt><dd>${s.world.moduleLabel}</dd></div><div><dt>RECOVERED</dt><dd>${s.world.recoveredAvailable} available / ${s.world.recoveredConsumed} consumed</dd></div></dl>
            <ul>${s.world.effectLines.map(c=>`<li>${u(c)}</li>`).join("")}</ul>
          </article>
          <article class="shell-status-card shell-status-card--quality">
            <span>RENDER QUALITY / MANUAL</span>
            <strong>${o.label}</strong>
            <dl><div><dt>FRAME INTENT</dt><dd>${o.performance.frameRateIntentHz} FPS</dd></div><div><dt>RESOLUTION</dt><dd>${o.resolution.strategy} / ${o.resolution.renderScale}× / DPR cap ${E(o,!0)}</dd></div><div><dt>CAMERA</dt><dd>${i.toFixed(2)}× / effective ${r.toFixed(1)} view-height</dd></div><div><dt>POST</dt><dd>${o.post.hdr?"HDR":"SDR"} / ${o.post.finish.look} / bloom ${o.post.bloomStrength} / miniature ${o.post.finish.miniatureDepth.strength}</dd></div><div><dt>SHADOW</dt><dd>${o.shadows.mapSize} / ${o.shadows.filter} r${o.shadows.radius}</dd></div><div><dt>SURFACE</dt><dd>${o.effects.surfaceDetail.mode} / ${o.effects.surfaceDetail.maximumResolution}px / N ${o.effects.surfaceDetail.normalStrength} / reflection ${o.effects.surfaceDetail.reflectionCoverage}</dd></div><div><dt>ATMOSPHERE</dt><dd>fog ${o.effects.atmosphere.fogNearMultiplier}/${o.effects.atmosphere.fogFarMultiplier} / sun ${o.effects.atmosphere.sunIntensityMultiplier}× / shafts ${o.effects.atmosphere.lightShaftCount}</dd></div><div><dt>EFFECTS</dt><dd>${o.effects.budget} / practical ${o.effects.practicalLightCount} / attack echo ${o.effects.attackEchoes}</dd></div></dl>
            <small>${n?"初回端末推奨 / manual override saved":"自動選択は未実装 / selected locally"}</small>
          </article>
        </div>
      </section>
    `,this.bind("back",()=>this.renderTitle())}launchGame(e){const a=this.requireContext();if(a.local.profile===null){this.renderProfile();return}this.application?.destroy(),this.clearRuntimeZoomControls();const s=document.createElement("div");s.className="product-shell-game-mount",s.dataset.launchMode=e;const o=document.createElement("button");o.type="button",o.className="product-shell-return",o.dataset.action="return-shell",o.innerHTML="<span>RETURN</span><strong>Product Shell</strong>",o.addEventListener("click",()=>this.returnFromGame());const i=v(a.local.settings.quality),r=a.local.settings.cameraZoom,n=document.createElement("aside"),c=this.useFirstUseDeviceRecommendation();n.className="product-shell-quality-badge",n.dataset.qualityBadge=i.id,n.innerHTML=`
      <span>${c?"ACTIVE PROFILE / FIRST-USE DEFAULT OR MANUAL":"MANUAL PROFILE / AUTO NOT IMPLEMENTED"}</span>
      <strong>${i.label}</strong>
      <small>${i.performance.frameRateIntentHz} FPS INTENT · ZOOM ${r.toFixed(2)}× · ${i.resolution.renderScale}× · DPR ${E(i,!0)} · ${i.post.hdr?"HDR":"SDR"} · FINISH ${i.post.finish.voxelClarity}/${i.post.finish.voxelEdge} · MINI ${i.post.finish.miniatureDepth.strength} · TEX ${i.effects.surfaceDetail.mode} · SUN ${i.effects.atmosphere.sunIntensityMultiplier}× · BLOOM ${i.post.bloomStrength} · ECHO ${i.effects.attackEchoes} · FX ${i.effects.budget.toUpperCase()}</small>
    `;const l=document.createElement("aside");l.className="product-shell-camera-zoom",l.setAttribute("aria-label","プレイ中のカメラズーム"),l.innerHTML=`
      <button type="button" data-camera-zoom="out" aria-label="カメラを引く">−</button>
      <output data-runtime-zoom>${r.toFixed(2)}×</output>
      <button type="button" data-camera-zoom="in" aria-label="カメラを寄せる">＋</button>
      <small>WHEEL / − +</small>
    `,this.root.className="product-shell-host is-game",this.root.replaceChildren(s,o,n,l),this.screen="game",this.syncRootDataset(e);const m=this.worldRepository;if(m===null)throw new Error("World memory repository is unavailable.");this.application=J(s,{experience:"r10",renderQuality:a.local.settings.quality,cameraZoomMultiplier:r,companionPreview:!1,semiAutoCombat:!0,heroAssetRequest:a.heroAssetRequest,worldMemoryRuntime:{initialState:this.currentMemory(),loadSource:a.memory.source,onCommit:async d=>{await ae(m,d),this.sessionMemory=d}}}),this.application.start(),s.classList.add("product-shell-game-mount"),s.dataset.productShellLinked="true",this.bindRuntimeZoomControls(s,l,n)}returnFromGame(){const e=this.application;e!==null&&(this.sessionWorld=e.getState(),this.sessionMemory=e.getWorldMemory()??this.sessionMemory,this.sessionBuildcraft=e.getBuildcraftState()??this.sessionBuildcraft,e.destroy()),this.clearRuntimeZoomControls(),this.application=null,this.renderTitle("遠征からshellへ戻りました。Statusは現在のlive stateを表示します。")}renderError(e){const a=e instanceof Error?e.message:"Product Shellを起動できませんでした。";this.root.className="product-shell-host",this.root.innerHTML=`
      <section class="product-shell product-shell--error" aria-labelledby="shell-error-title">
        ${this.brandRail("LOAD FAILURE / RECOVERABLE")}
        <div class="shell-error-card" role="alert">
          <span class="shell-kicker">${this.failedPhase===null?"UNKNOWN PHASE":U[this.failedPhase]}</span>
          <h1 id="shell-error-title">The link stopped before play.</h1>
          <p>${u(a)}</p>
          <div class="shell-error-actions">
            <button type="button" data-action="retry">Retry load</button>
            <a href="/game/r09/">Open archived R09</a>
          </div>
          <small>Retryはprofile、save、core、visualの同じ実operationを再実行します。</small>
        </div>
      </section>
    `,this.bind("retry",()=>{this.boot()})}bind(e,a){this.root.querySelector(`[data-action="${e}"]`)?.addEventListener("click",a)}bindRuntimeZoomControls(e,a,s){const o=d=>{const y=this.application;if(y===null)return;const L=y.getCameraZoomMultiplier(),b=y.setCameraZoomMultiplier(pe(L+d)),P=a.querySelector("[data-runtime-zoom]");P!==null&&(P.value=`${b.toFixed(2)}×`),a.dataset.cameraZoom=String(b);const w=s.querySelector("small");w!==null&&(w.textContent=w.textContent?.replace(/ZOOM\s+\d+(?:\.\d+)?×/,`ZOOM ${b.toFixed(2)}×`)??""),this.persistRuntimeZoom(b)},i=a.querySelector('[data-camera-zoom="out"]'),r=a.querySelector('[data-camera-zoom="in"]'),n=()=>o(-h),c=()=>o(h),l=d=>{d.preventDefault(),o(d.deltaY<0?h:-h)},m=d=>{["Equal","NumpadAdd","BracketRight"].includes(d.code)?(d.preventDefault(),o(h)):["Minus","NumpadSubtract","BracketLeft"].includes(d.code)&&(d.preventDefault(),o(-h))};i?.addEventListener("click",n),r?.addEventListener("click",c),e.addEventListener("wheel",l,{passive:!1}),window.addEventListener("keydown",m),this.runtimeZoomCleanup.push(()=>i?.removeEventListener("click",n),()=>r?.removeEventListener("click",c),()=>e.removeEventListener("wheel",l),()=>window.removeEventListener("keydown",m))}persistRuntimeZoom(e){const a=this.context,s=this.localRepository;if(a===null||s===null)return;const o={...a.local.settings,cameraZoom:e};this.context={...a,local:{...a.local,settings:o,settingsSource:"loaded"}},this.syncRootDataset(),s.saveSettings(o)}async applyRuntimeQuality(e){const a=this.context,s=this.localRepository;if(a===null||s===null||this.screen!=="game")return;const o={...a.local.settings,version:p,quality:e};await s.saveSettings(o),this.context={...a,local:{...a.local,settings:o,settingsSource:"loaded"}};const i=this.root.dataset.expeditionMode==="continue"?"continue":"new-expedition";this.launchGame(i)}clearRuntimeZoomControls(){for(const e of this.runtimeZoomCleanup.splice(0))e()}currentMemory(){return this.sessionMemory??this.requireContext().memory.state}requireContext(){if(this.context===null)throw new Error("Product Shell context is not ready.");return this.context}useFirstUseDeviceRecommendation(){return X(window.location.search,window.location.pathname)}failInjectedPhase(e){if(new URLSearchParams(this.search).get("shellFail")===e&&!this.injectedFailures.has(e))throw this.injectedFailures.add(e),new Error(`Injected ${e} failure for retry verification.`)}syncRootDataset(e){this.root.dataset.productShellState=this.screen,this.root.dataset.productShellPlayerName=this.context?.local.profile?.playerName??"",this.root.dataset.profileStatus=this.context?.local.profile===null?"missing":this.context?.local.profile===void 0?"loading":"ready",this.root.dataset.memoryLoadSource=this.context?.memory.source??"loading",this.root.dataset.profilePersistence=this.profilePersistence,this.root.dataset.worldPersistence=this.worldPersistence,this.root.dataset.manualQuality=this.context?.local.settings.quality??I.quality,this.root.dataset.cameraZoom=String(this.context?.local.settings.cameraZoom??I.cameraZoom),this.root.dataset.loadFailedPhase=this.failedPhase??"none",e!==void 0&&(this.root.dataset.expeditionMode=e)}brandRail(e){return`
      <aside class="shell-brand-rail" aria-hidden="true">
        <b>F.</b><span>${u(e)}</span><i></i><small>F.R.A.M. MODULE ↔ R10 BUILDCRAFT</small>
      </aside>
    `}}function Me(t){if(t.expeditionHistory.length===0)return"まだ世界にはあなたの帰還記録がない。最初の遠征から始められます。";const e=t.installedModule?.moduleId;return`${t.discoveredSites.length} site発見 · ${t.recoveredItems.length}回収 · ${e===void 0?"module未設置":e}`}function $e(t){switch(t){case"complete":return"READY";case"fallback":return"FALLBACK";case"failed":return"FAILED";case"active":return"LOADING";default:return"PENDING"}}function u(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const W=document.querySelector("#app");if(W===null)throw new Error("F.R.A.M. Product Shell root was not found.");const Ae=new we(W);Ae.boot();
