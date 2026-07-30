export type PrototypeBLayout = {
  readonly stage: HTMLElement;
  readonly worldMount: HTMLElement;
  readonly statusLive: HTMLElement;
  readonly titleOverlay: HTMLElement;
  readonly startButton: HTMLButtonElement;
  readonly muteButton: HTMLButtonElement;
  readonly zoneLabel: HTMLElement;
  readonly objectiveText: HTMLElement;
  readonly healthFill: HTMLElement;
  readonly healthText: HTMLElement;
  readonly weaponName: HTMLElement;
  readonly weaponDetail: HTMLElement;
  readonly relicName: HTMLElement;
  readonly itemCount: HTMLElement;
  readonly targetPanel: HTMLElement;
  readonly targetName: HTMLElement;
  readonly targetFill: HTMLElement;
  readonly contextPrompt: HTMLElement;
  readonly toast: HTMLElement;
  readonly dossier: HTMLElement;
  readonly dossierTitle: HTMLElement;
  readonly dossierBody: HTMLElement;
  readonly outcomePanel: HTMLElement;
  readonly outcomeBackButton: HTMLButtonElement;
  readonly resultPanel: HTMLElement;
  readonly resultTitle: HTMLElement;
  readonly resultBody: HTMLElement;
  readonly restartButton: HTMLButtonElement;
  readonly performance: HTMLElement;
  readonly orientationNotice: HTMLElement;
};

export function createPrototypeBLayout(root: HTMLElement): PrototypeBLayout {
  root.replaceChildren();
  root.className = "game-shell prototype-b-shell";
  root.innerHTML = `
    <section
      class="relic-stage"
      data-testid="game-stage"
      role="application"
      tabindex="-1"
      aria-label="辺境遺物録。左手で移動し、右手で攻撃、防御、遺物、道具を操作します。"
    >
      <div class="relic-world" data-testid="game-world" aria-hidden="true"></div>
      <div class="relic-screen-fx" aria-hidden="true"></div>

      <header class="relic-hud">
        <div class="relic-hud__identity">
          <span class="relic-kicker">RELIC FRONTIER / B-02</span>
          <strong data-ui="zone">辺境観測所</strong>
          <span class="relic-signal"><i></i> LINK LOCAL</span>
        </div>
        <div class="relic-hud__mission">
          <span>FIELD CONTRACT</span>
          <strong data-ui="objective">町の依頼板を調べる</strong>
        </div>
        <div class="relic-hud__vitals">
          <div class="relic-health">
            <span>BODY</span>
            <div class="relic-health__track"><i data-ui="health-fill"></i></div>
            <b data-ui="health-text">100 / 100</b>
          </div>
          <button class="relic-audio" data-ui="mute" type="button" aria-pressed="false">
            <span aria-hidden="true">◖))</span> SOUND
          </button>
        </div>
      </header>

      <div class="relic-target" data-ui="target" aria-hidden="true">
        <span>NEAREST HOSTILE / <b data-ui="target-name">未分類異形</b></span>
        <i><em data-ui="target-fill"></em></i>
      </div>

      <aside class="relic-loadout" aria-label="装備">
        <button class="relic-loadout__weapon" data-control="switch-weapon" type="button">
          <span>PRIMARY / TAP TO SWAP</span>
          <strong data-ui="weapon-name">測量刃</strong>
          <small data-ui="weapon-detail">速い・前方短距離</small>
        </button>
        <div class="relic-loadout__item">
          <span>UNCLASSIFIED RELIC</span>
          <strong data-ui="relic-name">斥力環 R-17</strong>
          <small>仮説：周囲の慣性だけを遅延させる</small>
        </div>
        <div class="relic-loadout__stock">
          <span>縫合剤</span>
          <b data-ui="item-count">× 1</b>
        </div>
      </aside>

      <div class="relic-context" data-ui="context-prompt" aria-hidden="true">
        <span>E</span><strong>調べる</strong>
      </div>

      <div class="relic-controls" aria-label="操作">
        <div class="relic-joystick" data-control="move" aria-label="移動">
          <span class="relic-joystick__axis" aria-hidden="true"></span>
          <i data-control="move-knob" aria-hidden="true"></i>
          <small>MOVE</small>
        </div>
        <div class="relic-actions">
          <button class="relic-action relic-action--item" data-control="item" type="button">
            <span>道具</span><small>R</small>
          </button>
          <button class="relic-action relic-action--relic" data-control="relic" type="button">
            <span>遺物</span><small>Q</small>
          </button>
          <button class="relic-action relic-action--guard" data-control="guard" type="button">
            <span>防御/回避</span><small>HOLD / MOVE</small>
          </button>
          <button class="relic-action relic-action--attack" data-control="attack" type="button">
            <span>攻撃</span><small>SPACE</small>
          </button>
          <button class="relic-action relic-action--interact" data-control="interact" type="button">
            <span>調査</span><small>E</small>
          </button>
        </div>
      </div>

      <div class="relic-toast" data-ui="toast" role="status" aria-live="polite"></div>

      <article class="relic-dossier" data-ui="dossier" aria-hidden="true">
        <span class="relic-kicker">FIELD CATALOG / UNVERIFIED</span>
        <strong data-ui="dossier-title">未分類遺物</strong>
        <p data-ui="dossier-body"></p>
      </article>

      <section
        class="relic-outcome"
        data-ui="outcome"
        role="dialog"
        aria-modal="true"
        aria-labelledby="relic-outcome-title"
        aria-hidden="true"
        inert
      >
        <div>
          <span class="relic-kicker">CONTACT PROTOCOL</span>
          <h2 id="relic-outcome-title">反響体へ、どう応答する？</h2>
          <p>観測所は結論を指定していない。あなたの履歴だけが残る。</p>
        </div>
        <button data-control="outcome-destroy" type="button">
          <span>07</span><strong>破壊する</strong><small>危険源を断つ</small>
        </button>
        <button data-control="outcome-calm" type="button">
          <span>08</span><strong>鎮静する</strong><small>信号を弱める</small>
        </button>
        <button data-control="outcome-connect" type="button">
          <span>09</span><strong>接続する</strong><small>記録を受け取る</small>
        </button>
        <button class="relic-outcome__back" data-ui="outcome-back" type="button">
          <strong>いったん探索へ戻る</strong><small>必要な遺物を街道で探せる</small>
        </button>
      </section>

      <section class="relic-result" data-ui="result" aria-hidden="true" inert>
        <span class="relic-kicker">CONTRACT CLOSED / HISTORY WRITTEN</span>
        <h2 data-ui="result-title">帰還記録</h2>
        <p data-ui="result-body"></p>
        <button data-ui="restart" type="button">別の履歴を試す</button>
      </section>

      <section class="relic-title" data-ui="title">
        <div class="relic-title__index">
          <span>観測番号</span><b>B-02</b><small>LOCAL / OFFLINE</small>
        </div>
        <div class="relic-title__copy">
          <span class="relic-kicker">A SMALL FREE-WORLD ACTION RPG</span>
          <h1>辺境<br /><em>遺物録</em></h1>
          <p>
            誰も英雄を待っていない辺境。<br />
            依頼を選び、装備を拾い、廃屋から届く声に応答する。
          </p>
          <button data-ui="start" data-testid="start-game" type="button">
            <span>調査を開始</span><small>ENTER / TOUCH</small>
          </button>
        </div>
        <dl class="relic-title__catalog">
          <div><dt>効果</dt><dd>周囲の運動を一瞬だけ押し戻す</dd></div>
          <div><dt>原理</dt><dd>局所慣性の位相差。現時点では仮説</dd></div>
          <div><dt>副作用</dt><dd>使用者の金属製品が北を向く</dd></div>
          <div><dt>所感</dt><dd>「方位磁針には使えそうだ」</dd></div>
        </dl>
      </section>

      <div class="relic-performance" data-ui="performance" aria-hidden="true">-- FPS</div>
    </section>

    <p class="sr-only" data-testid="game-status" data-ui="status-live" aria-live="polite">
      辺境遺物録。開始待ち。
    </p>

    <div class="orientation-notice relic-orientation" data-ui="orientation" aria-hidden="true">
      <span class="orientation-notice__mark">↻</span>
      <span class="orientation-notice__eyebrow">RELIC FRONTIER / B-02</span>
      <strong>端末を横向きに</strong>
      <small>辺境の地図と両手の操作盤をひらく</small>
    </div>
  `;

  return {
    stage: requireElement(root, ".relic-stage"),
    worldMount: requireElement(root, ".relic-world"),
    statusLive: requireElement(root, '[data-ui="status-live"]'),
    titleOverlay: requireElement(root, '[data-ui="title"]'),
    startButton: requireButton(root, '[data-ui="start"]'),
    muteButton: requireButton(root, '[data-ui="mute"]'),
    zoneLabel: requireElement(root, '[data-ui="zone"]'),
    objectiveText: requireElement(root, '[data-ui="objective"]'),
    healthFill: requireElement(root, '[data-ui="health-fill"]'),
    healthText: requireElement(root, '[data-ui="health-text"]'),
    weaponName: requireElement(root, '[data-ui="weapon-name"]'),
    weaponDetail: requireElement(root, '[data-ui="weapon-detail"]'),
    relicName: requireElement(root, '[data-ui="relic-name"]'),
    itemCount: requireElement(root, '[data-ui="item-count"]'),
    targetPanel: requireElement(root, '[data-ui="target"]'),
    targetName: requireElement(root, '[data-ui="target-name"]'),
    targetFill: requireElement(root, '[data-ui="target-fill"]'),
    contextPrompt: requireElement(root, '[data-ui="context-prompt"]'),
    toast: requireElement(root, '[data-ui="toast"]'),
    dossier: requireElement(root, '[data-ui="dossier"]'),
    dossierTitle: requireElement(root, '[data-ui="dossier-title"]'),
    dossierBody: requireElement(root, '[data-ui="dossier-body"]'),
    outcomePanel: requireElement(root, '[data-ui="outcome"]'),
    outcomeBackButton: requireButton(root, '[data-ui="outcome-back"]'),
    resultPanel: requireElement(root, '[data-ui="result"]'),
    resultTitle: requireElement(root, '[data-ui="result-title"]'),
    resultBody: requireElement(root, '[data-ui="result-body"]'),
    restartButton: requireButton(root, '[data-ui="restart"]'),
    performance: requireElement(root, '[data-ui="performance"]'),
    orientationNotice: requireElement(root, '[data-ui="orientation"]'),
  };
}

function requireElement(root: HTMLElement, selector: string): HTMLElement {
  const element = root.querySelector<HTMLElement>(selector);

  if (element === null) {
    throw new Error(`Prototype B layout element is missing: ${selector}`);
  }

  return element;
}

function requireButton(root: HTMLElement, selector: string): HTMLButtonElement {
  const element = root.querySelector<HTMLButtonElement>(selector);

  if (element === null) {
    throw new Error(`Prototype B layout button is missing: ${selector}`);
  }

  return element;
}
