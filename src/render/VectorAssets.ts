import Phaser from "phaser";
import { PALETTE } from "./palette";

export const FIELD_TEXTURE = "fieldnote-field-v1";
export const PLAYER_TEXTURE = "fieldnote-traveler-v1";
export const ENEMY_TEXTURES = [
  "fieldnote-anomaly-ring-v1",
  "fieldnote-anomaly-kite-v1",
  "fieldnote-anomaly-shard-v1",
] as const;
export const BOSS_TEXTURE = "fieldnote-anomaly-boss-v1";

const TEXTURE_SIZE = 64;

export function createVectorAssets(scene: Phaser.Scene): void {
  if (!scene.textures.exists(FIELD_TEXTURE)) {
    createFieldTexture(scene);
  }

  if (!scene.textures.exists(PLAYER_TEXTURE)) {
    createPlayerTexture(scene);
  }

  if (!scene.textures.exists(ENEMY_TEXTURES[0])) {
    createEnemyTextures(scene);
  }
}

export function enemyTextureFor(kind: string, boss: boolean): string {
  if (boss) {
    return BOSS_TEXTURE;
  }

  if (kind === "wisp") {
    return ENEMY_TEXTURES[0];
  }
  if (kind === "skitter") {
    return ENEMY_TEXTURES[1];
  }
  if (kind === "brute") {
    return ENEMY_TEXTURES[2];
  }

  let hash = 0;
  for (let index = 0; index < kind.length; index += 1) {
    hash = (hash * 31 + kind.charCodeAt(index)) >>> 0;
  }

  return ENEMY_TEXTURES[hash % ENEMY_TEXTURES.length] ?? ENEMY_TEXTURES[0];
}

function createFieldTexture(scene: Phaser.Scene): void {
  const graphics = scene.add.graphics();
  graphics.setVisible(false);
  graphics.fillStyle(PALETTE.ground, 1);
  graphics.fillRect(0, 0, 960, 540);

  drawSurveyGrid(graphics);
  drawContourCluster(graphics, 146, 176, 1.04, -0.18);
  drawContourCluster(graphics, 758, 342, 1.3, 0.13);
  drawContourCluster(graphics, 514, 218, 0.64, -0.08);
  drawRoutes(graphics);
  drawMapFrame(graphics);

  graphics.generateTexture(FIELD_TEXTURE, 960, 540);
  graphics.destroy();
}

function drawSurveyGrid(graphics: Phaser.GameObjects.Graphics): void {
  graphics.lineStyle(1, PALETTE.paper, 0.035);
  for (let x = 30; x <= 930; x += 60) {
    graphics.lineBetween(x, 28, x, 512);
  }
  for (let y = 30; y <= 510; y += 60) {
    graphics.lineBetween(28, y, 932, y);
  }

  graphics.lineStyle(2, PALETTE.cyan, 0.12);
  for (let x = 60; x <= 900; x += 120) {
    graphics.lineBetween(x, 24, x, 32);
    graphics.lineBetween(x, 508, x, 516);
  }
  for (let y = 60; y <= 480; y += 120) {
    graphics.lineBetween(24, y, 32, y);
    graphics.lineBetween(928, y, 936, y);
  }
}

function drawContourCluster(
  graphics: Phaser.GameObjects.Graphics,
  centerX: number,
  centerY: number,
  scale: number,
  lean: number,
): void {
  const pointCount = 46;

  for (let ring = 0; ring < 6; ring += 1) {
    const points: Phaser.Math.Vector2[] = [];
    const baseRadius = (27 + ring * 22) * scale;

    for (let index = 0; index < pointCount; index += 1) {
      const angle = (index / pointCount) * Math.PI * 2;
      const wobble =
        Math.sin(angle * 3 + ring * 0.8) * 5 +
        Math.cos(angle * 5 - ring * 0.45) * 2.5;
      const radius = baseRadius + wobble * scale;
      points.push(
        new Phaser.Math.Vector2(
          centerX + Math.cos(angle) * radius + Math.sin(angle) * radius * lean,
          centerY + Math.sin(angle) * radius * 0.56,
        ),
      );
    }

    graphics.lineStyle(
      ring === 3 ? 2 : 1,
      ring === 3 ? PALETTE.cyan : PALETTE.paper,
      ring === 3 ? 0.11 : 0.075,
    );
    graphics.strokePoints(points, true, true);
  }
}

function drawRoutes(graphics: Phaser.GameObjects.Graphics): void {
  const primaryRoute = [
    new Phaser.Math.Vector2(-20, 435),
    new Phaser.Math.Vector2(90, 408),
    new Phaser.Math.Vector2(205, 420),
    new Phaser.Math.Vector2(326, 350),
    new Phaser.Math.Vector2(442, 374),
    new Phaser.Math.Vector2(562, 299),
    new Phaser.Math.Vector2(690, 312),
    new Phaser.Math.Vector2(812, 237),
    new Phaser.Math.Vector2(980, 258),
  ];

  graphics.lineStyle(16, PALETTE.ink, 0.44);
  graphics.strokePoints(primaryRoute);
  graphics.lineStyle(3, PALETTE.paper, 0.14);
  graphics.strokePoints(primaryRoute);
  graphics.lineStyle(1, PALETTE.vermilion, 0.2);
  graphics.strokePoints(
    primaryRoute.map((point, index) => new Phaser.Math.Vector2(point.x, point.y - 7 + (index % 2) * 2)),
  );

  const surveyCut = [
    new Phaser.Math.Vector2(280, -10),
    new Phaser.Math.Vector2(308, 93),
    new Phaser.Math.Vector2(382, 164),
    new Phaser.Math.Vector2(421, 272),
    new Phaser.Math.Vector2(497, 344),
    new Phaser.Math.Vector2(522, 560),
  ];
  graphics.lineStyle(2, PALETTE.cyan, 0.12);
  graphics.strokePoints(surveyCut);

  graphics.fillStyle(PALETTE.vermilion, 0.3);
  for (const [x, y] of [
    [326, 350],
    [562, 299],
    [812, 237],
  ] as const) {
    graphics.fillTriangle(x, y - 7, x + 7, y + 6, x - 7, y + 6);
  }
}

function drawMapFrame(graphics: Phaser.GameObjects.Graphics): void {
  graphics.lineStyle(2, PALETTE.paper, 0.18);
  graphics.strokeRect(20, 20, 920, 500);
  graphics.lineStyle(5, PALETTE.ink, 0.54);
  graphics.strokeRect(12, 12, 936, 516);

  graphics.fillStyle(PALETTE.paper, 0.08);
  graphics.fillRect(32, 37, 102, 22);
  graphics.fillStyle(PALETTE.vermilion, 0.72);
  graphics.fillRect(32, 37, 7, 22);

  graphics.lineStyle(2, PALETTE.cyan, 0.22);
  graphics.lineBetween(820, 76, 910, 76);
  graphics.lineBetween(865, 31, 865, 121);
  graphics.strokeCircle(865, 76, 26);
}

function createPlayerTexture(scene: Phaser.Scene): void {
  const graphics = scene.add.graphics();
  graphics.setVisible(false);

  graphics.fillStyle(PALETTE.ink, 1);
  graphics.fillCircle(32, 32, 24);
  graphics.lineStyle(3, PALETTE.paper, 1);
  graphics.strokeCircle(32, 32, 20);
  graphics.fillStyle(PALETTE.paper, 1);
  graphics.fillTriangle(33, 10, 48, 40, 32, 34);
  graphics.fillTriangle(31, 10, 16, 40, 32, 34);
  graphics.fillStyle(PALETTE.vermilion, 1);
  graphics.fillCircle(32, 31, 6);
  graphics.lineStyle(2, PALETTE.cyan, 1);
  graphics.lineBetween(32, 14, 32, 4);

  graphics.generateTexture(PLAYER_TEXTURE, TEXTURE_SIZE, TEXTURE_SIZE);
  graphics.destroy();
}

function createEnemyTextures(scene: Phaser.Scene): void {
  const graphics = scene.add.graphics();
  graphics.setVisible(false);

  graphics.fillStyle(PALETTE.ink, 1);
  graphics.fillCircle(32, 32, 25);
  graphics.lineStyle(4, PALETTE.cyan, 1);
  graphics.strokeCircle(32, 32, 18);
  graphics.lineStyle(3, PALETTE.paper, 1);
  graphics.strokeCircle(32, 32, 7);
  graphics.fillStyle(PALETTE.vermilion, 1);
  graphics.fillCircle(32, 32, 3);
  graphics.generateTexture(ENEMY_TEXTURES[0], TEXTURE_SIZE, TEXTURE_SIZE);

  graphics.clear();
  graphics.fillStyle(PALETTE.ink, 1);
  graphics.fillPoints([
    new Phaser.Math.Vector2(32, 4),
    new Phaser.Math.Vector2(58, 32),
    new Phaser.Math.Vector2(32, 60),
    new Phaser.Math.Vector2(6, 32),
  ], true);
  graphics.lineStyle(4, PALETTE.vermilion, 1);
  graphics.strokePoints([
    new Phaser.Math.Vector2(32, 7),
    new Phaser.Math.Vector2(55, 32),
    new Phaser.Math.Vector2(32, 57),
    new Phaser.Math.Vector2(9, 32),
  ], true, true);
  graphics.fillStyle(PALETTE.paper, 1);
  graphics.fillTriangle(32, 15, 47, 40, 32, 34);
  graphics.generateTexture(ENEMY_TEXTURES[1], TEXTURE_SIZE, TEXTURE_SIZE);

  graphics.clear();
  const shardPoints = [
    new Phaser.Math.Vector2(12, 14),
    new Phaser.Math.Vector2(42, 8),
    new Phaser.Math.Vector2(57, 27),
    new Phaser.Math.Vector2(48, 55),
    new Phaser.Math.Vector2(19, 59),
    new Phaser.Math.Vector2(6, 35),
  ];
  graphics.fillStyle(PALETTE.ink, 1);
  graphics.fillPoints(shardPoints, true);
  graphics.lineStyle(4, PALETTE.paper, 1);
  graphics.strokePoints(shardPoints, true, true);
  graphics.lineStyle(3, PALETTE.cyan, 1);
  graphics.lineBetween(17, 44, 45, 20);
  graphics.lineBetween(18, 23, 43, 43);
  graphics.generateTexture(ENEMY_TEXTURES[2], TEXTURE_SIZE, TEXTURE_SIZE);

  graphics.clear();
  const bossPoints: Phaser.Math.Vector2[] = [];
  for (let index = 0; index < 16; index += 1) {
    const angle = (index / 16) * Math.PI * 2 - Math.PI / 2;
    const radius = index % 2 === 0 ? 29 : 20;
    bossPoints.push(
      new Phaser.Math.Vector2(
        32 + Math.cos(angle) * radius,
        32 + Math.sin(angle) * radius,
      ),
    );
  }
  graphics.fillStyle(PALETTE.ink, 1);
  graphics.fillPoints(bossPoints, true);
  graphics.lineStyle(4, PALETTE.vermilion, 1);
  graphics.strokePoints(bossPoints, true, true);
  graphics.lineStyle(3, PALETTE.paper, 1);
  graphics.strokeCircle(32, 32, 12);
  graphics.fillStyle(PALETTE.cyan, 1);
  graphics.fillCircle(32, 32, 5);
  graphics.generateTexture(BOSS_TEXTURE, TEXTURE_SIZE, TEXTURE_SIZE);
  graphics.destroy();
}
