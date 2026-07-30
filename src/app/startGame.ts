import Phaser from "phaser";
import { FieldNotebookScene } from "../render/FieldNotebookScene";
import { CSS_PALETTE } from "../render/palette";

const LOGICAL_WIDTH = 960;
const LOGICAL_HEIGHT = 540;
const activeGames = new WeakMap<HTMLElement, Phaser.Game>();

export function startGame(root: HTMLElement): Phaser.Game {
  const previousGame = activeGames.get(root);
  if (previousGame !== undefined) {
    previousGame.destroy(true);
  }

  root.replaceChildren();
  root.classList.add("game-shell");

  const stage = document.createElement("div");
  stage.className = "game-stage";
  stage.dataset.testid = "game-stage";
  stage.setAttribute("role", "application");
  stage.setAttribute(
    "aria-label",
    "境界調査録。左側をドラッグして移動、右側の印を押して能動スキルを使います。",
  );

  const status = document.createElement("p");
  status.className = "sr-only";
  status.dataset.testid = "game-status";
  status.setAttribute("aria-live", "polite");
  status.textContent = "境界調査録。開始待ち。";

  const orientationNotice = document.createElement("div");
  orientationNotice.className = "orientation-notice";
  orientationNotice.dataset.testid = "orientation-notice";
  orientationNotice.setAttribute("aria-hidden", "true");
  orientationNotice.innerHTML = [
    '<span class="orientation-notice__mark">↻</span>',
    '<span class="orientation-notice__eyebrow">FIELD NOTE / 01</span>',
    "<strong>端末を横向きに</strong>",
    "<small>地図をひらいて、境界調査を始める</small>",
  ].join("");

  root.append(stage, status, orientationNotice);

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: LOGICAL_WIDTH,
    height: LOGICAL_HEIGHT,
    parent: stage,
    backgroundColor: CSS_PALETTE.ink,
    banner: {
      hidePhaser: true,
    },
    input: {
      activePointers: 3,
    },
    render: {
      antialias: true,
      pixelArt: false,
      roundPixels: false,
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: LOGICAL_WIDTH,
      height: LOGICAL_HEIGHT,
    },
    scene: [FieldNotebookScene],
    callbacks: {
      postBoot: (bootedGame) => {
        bootedGame.canvas.dataset.testid = "game-canvas";
        bootedGame.canvas.setAttribute("aria-label", "境界調査録 ゲーム画面");
        bootedGame.canvas.setAttribute("role", "img");

        bootedGame.events.on("fieldnote:status", (message: string) => {
          status.textContent = message;
        });
      },
    },
  });

  activeGames.set(root, game);
  return game;
}
