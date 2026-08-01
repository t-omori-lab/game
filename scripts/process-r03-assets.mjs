#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const scriptPath = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(scriptPath), '..');

const directionLayout = Object.freeze([
  { name: 'up', column: 0, row: 0, view: 'screen-up/back' },
  { name: 'right', column: 1, row: 0, view: 'screen-right' },
  { name: 'down', column: 0, row: 1, view: 'screen-down/front' },
  { name: 'left', column: 1, row: 1, view: 'screen-left' },
]);

const keySettings = Object.freeze({
  minimumRedBlue: 145,
  minimumMagentaPeak: 175,
  minimumGreenGap: 52,
  maximumRedBlueDifference: 105,
  connectivity: 4,
});

const spillSettings = Object.freeze({
  minimumRedBlue: 38,
  minimumMagentaPeak: 62,
  minimumGreenGap: 11,
  maximumRedBlueDifference: 118,
  erosionPasses: 3,
});

const actorPadding = 16;
const anomalyPadding = 24;
const hudMaskReference = Object.freeze({
  width: 1672,
  height: 941,
  diamonds: Object.freeze([
    { name: 'status', centerX: 82, centerY: 85, radiusX: 43, radiusY: 43 },
    { name: 'skill-up', centerX: 148, centerY: 732, radiusX: 51, radiusY: 51 },
    { name: 'skill-left', centerX: 90, centerY: 790, radiusX: 51, radiusY: 51 },
    { name: 'skill-right', centerX: 207, centerY: 790, radiusX: 51, radiusY: 51 },
    { name: 'skill-down', centerX: 148, centerY: 850, radiusX: 51, radiusY: 51 },
  ]),
});

const hudLayoutTargets = Object.freeze({
  topLeftWidth: 295,
  bottomLeftWidth: 184,
  splitYRatio: 0.5,
});

const inputs = Object.freeze({
  hero: 'work/concept_c_r03/generated/hero-four-direction-v1.png',
  companion: 'work/concept_c_r03/generated/companion-four-direction-v1.png',
  anomaly: 'work/concept_c_r03/generated/anomaly-raw-v1.png',
  hud: 'work/concept_c_r03/generated/hud-overlay-raw-v1.png',
});

const outputPaths = Object.freeze({
  hero: 'src/r03/assets/hero',
  companion: 'src/r03/assets/companion',
  anomaly: 'src/r03/assets/anomaly.png',
  hud: 'src/r03/assets/hud-overlay.png',
  provenance: 'src/r03/assets/ASSET_PROVENANCE.json',
});

function loadSharp() {
  const candidates = [
    'sharp',
    path.join(
      homedir(),
      '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp',
    ),
  ];

  const errors = [];
  for (const candidate of candidates) {
    if (path.isAbsolute(candidate) && !existsSync(candidate)) continue;
    try {
      return require(candidate);
    } catch (error) {
      errors.push(`${candidate}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  throw new Error(
    `Unable to load the bundled sharp dependency. Tried:\n${errors.join('\n')}`,
  );
}

const sharp = loadSharp();

function absolute(relativePath) {
  return path.join(projectRoot, relativePath);
}

async function sha256File(filePath) {
  const bytes = await readFile(filePath);
  return createHash('sha256').update(bytes).digest('hex');
}

async function decodeRgba(filePath) {
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (info.channels !== 4) {
    throw new Error(`Expected RGBA input for ${filePath}, received ${info.channels} channels.`);
  }

  return {
    data,
    width: info.width,
    height: info.height,
    channels: info.channels,
  };
}

function isLooseMagenta(red, green, blue) {
  const redBlueFloor = Math.min(red, blue);
  const magentaPeak = Math.max(red, blue);
  return (
    redBlueFloor >= keySettings.minimumRedBlue &&
    magentaPeak >= keySettings.minimumMagentaPeak &&
    redBlueFloor - green >= keySettings.minimumGreenGap &&
    Math.abs(red - blue) <= keySettings.maximumRedBlueDifference
  );
}

function isCoreMagenta(red, green, blue, alpha) {
  return (
    alpha >= 192 &&
    red >= 175 &&
    blue >= 145 &&
    Math.min(red, blue) - green >= 48
  );
}

function isMagentaSpill(red, green, blue) {
  const redBlueFloor = Math.min(red, blue);
  const magentaPeak = Math.max(red, blue);
  return (
    redBlueFloor >= spillSettings.minimumRedBlue &&
    magentaPeak >= spillSettings.minimumMagentaPeak &&
    redBlueFloor - green >= spillSettings.minimumGreenGap &&
    Math.abs(red - blue) <= spillSettings.maximumRedBlueDifference
  );
}

function removeEdgeConnectedMagenta(image) {
  const { data, width, height } = image;
  const pixelCount = width * height;
  const candidate = new Uint8Array(pixelCount);
  const connected = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);

  for (let pixel = 0; pixel < pixelCount; pixel += 1) {
    const offset = pixel * 4;
    if (isLooseMagenta(data[offset], data[offset + 1], data[offset + 2])) {
      candidate[pixel] = 1;
    }
  }

  let queueHead = 0;
  let queueTail = 0;
  const enqueue = (pixel) => {
    if (!candidate[pixel] || connected[pixel]) return;
    connected[pixel] = 1;
    queue[queueTail] = pixel;
    queueTail += 1;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (queueHead < queueTail) {
    const pixel = queue[queueHead];
    queueHead += 1;
    const x = pixel % width;
    const y = Math.floor(pixel / width);

    for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
      const nextY = y + offsetY;
      if (nextY < 0 || nextY >= height) continue;
      for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
        if (Math.abs(offsetX) + Math.abs(offsetY) !== 1) continue;
        const nextX = x + offsetX;
        if (nextX < 0 || nextX >= width) continue;
        enqueue(nextY * width + nextX);
      }
    }
  }

  let removedPixelCount = 0;
  for (let pixel = 0; pixel < pixelCount; pixel += 1) {
    if (!connected[pixel]) continue;
    const offset = pixel * 4;
    data[offset] = 0;
    data[offset + 1] = 0;
    data[offset + 2] = 0;
    data[offset + 3] = 0;
    removedPixelCount += 1;
  }

  return { ...image, removedPixelCount };
}

function hasTransparentNeighbor(image, x, y) {
  for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
    const nextY = y + offsetY;
    if (nextY < 0 || nextY >= image.height) continue;
    for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
      if (offsetX === 0 && offsetY === 0) continue;
      const nextX = x + offsetX;
      if (nextX < 0 || nextX >= image.width) continue;
      if (image.data[(nextY * image.width + nextX) * 4 + 3] === 0) return true;
    }
  }
  return false;
}

function clearPixel(data, pixel) {
  const offset = pixel * 4;
  data[offset] = 0;
  data[offset + 1] = 0;
  data[offset + 2] = 0;
  data[offset + 3] = 0;
}

function removeAllMagenta(image) {
  const pixelCount = image.width * image.height;
  let removedMagentaPixelCount = 0;
  for (let pixel = 0; pixel < pixelCount; pixel += 1) {
    const offset = pixel * 4;
    if (!isLooseMagenta(image.data[offset], image.data[offset + 1], image.data[offset + 2])) {
      continue;
    }
    clearPixel(image.data, pixel);
    removedMagentaPixelCount += 1;
  }

  return {
    ...image,
    removedMagentaPixelCount,
    removedBoundarySpillPixelCount: 0,
  };
}

function removeBoundaryMagentaSpill(image) {
  let removedBoundarySpillPixelCount = 0;
  for (let pass = 0; pass < spillSettings.erosionPasses; pass += 1) {
    const marked = [];
    for (let y = 0; y < image.height; y += 1) {
      for (let x = 0; x < image.width; x += 1) {
        const pixel = y * image.width + x;
        const offset = pixel * 4;
        if (image.data[offset + 3] === 0) continue;
        if (!isMagentaSpill(image.data[offset], image.data[offset + 1], image.data[offset + 2])) {
          continue;
        }
        if (hasTransparentNeighbor(image, x, y)) marked.push(pixel);
      }
    }
    if (marked.length === 0) break;
    for (const pixel of marked) clearPixel(image.data, pixel);
    removedBoundarySpillPixelCount += marked.length;
  }

  return removedBoundarySpillPixelCount;
}

function removeAllMagentaAndBoundarySpill(image) {
  const keyed = removeAllMagenta(image);
  keyed.removedBoundarySpillPixelCount = removeBoundaryMagentaSpill(keyed);
  return {
    ...keyed,
  };
}

function residualMagentaStats(image, ignoredMask = null) {
  let opaquePixelCount = 0;
  let opaqueAlphaMass = 0;
  let magentaPixelCount = 0;
  let magentaAlphaMass = 0;
  let boundarySpillPixelCount = 0;

  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      const pixel = y * image.width + x;
      if (ignoredMask?.[pixel]) continue;
      const offset = pixel * 4;
      const alpha = image.data[offset + 3];
      if (alpha === 0) continue;
      opaquePixelCount += 1;
      opaqueAlphaMass += alpha;
      if (isLooseMagenta(image.data[offset], image.data[offset + 1], image.data[offset + 2])) {
        magentaPixelCount += 1;
        magentaAlphaMass += alpha;
      }
      if (
        isMagentaSpill(image.data[offset], image.data[offset + 1], image.data[offset + 2]) &&
        hasTransparentNeighbor(image, x, y)
      ) {
        boundarySpillPixelCount += 1;
      }
    }
  }

  return {
    opaquePixelCount,
    magentaPixelCount,
    pixelRate: Number((magentaPixelCount / Math.max(1, opaquePixelCount)).toFixed(8)),
    alphaWeightedRate: Number((magentaAlphaMass / Math.max(1, opaqueAlphaMass)).toFixed(8)),
    boundarySpillPixelCount,
  };
}

function extractRegion(image, left, top, width, height) {
  if (
    left < 0 ||
    top < 0 ||
    left + width > image.width ||
    top + height > image.height
  ) {
    throw new Error('Requested region is outside the source image.');
  }

  const data = Buffer.alloc(width * height * 4);
  const sourceStride = image.width * 4;
  const targetStride = width * 4;
  for (let row = 0; row < height; row += 1) {
    const sourceStart = (top + row) * sourceStride + left * 4;
    image.data.copy(data, row * targetStride, sourceStart, sourceStart + targetStride);
  }

  return { data, width, height, channels: 4 };
}

function alphaBounds(image) {
  let minX = image.width;
  let minY = image.height;
  let maxX = -1;
  let maxY = -1;
  let opaquePixelCount = 0;

  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      const alpha = image.data[(y * image.width + x) * 4 + 3];
      if (alpha === 0) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      opaquePixelCount += 1;
    }
  }

  if (maxX < minX || maxY < minY) {
    throw new Error('No non-transparent content remained after chroma removal.');
  }

  return {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
    right: maxX,
    bottom: maxY,
    opaquePixelCount,
  };
}

function opaqueBorderPixelCount(image) {
  let count = 0;
  const countPixel = (x, y) => {
    if (image.data[(y * image.width + x) * 4 + 3] > 0) count += 1;
  };
  for (let x = 0; x < image.width; x += 1) {
    countPixel(x, 0);
    countPixel(x, image.height - 1);
  }
  for (let y = 1; y < image.height - 1; y += 1) {
    countPixel(0, y);
    countPixel(image.width - 1, y);
  }
  return count;
}

function assertTransparentBorder(image, label) {
  const opaquePixels = opaqueBorderPixelCount(image);
  if (opaquePixels > 0) {
    throw new Error(`${label} validation failed: ${opaquePixels} opaque border pixels remain.`);
  }
  return opaquePixels;
}

function cropToBounds(image, bounds) {
  return extractRegion(image, bounds.left, bounds.top, bounds.width, bounds.height);
}

function roundUp(value, multiple) {
  return Math.ceil(value / multiple) * multiple;
}

function placeAtFootAnchor(crop, canvasWidth, canvasHeight, padding) {
  const left = Math.floor((canvasWidth - crop.width) / 2);
  const top = canvasHeight - padding - crop.height;
  if (left < 0 || top < 0) {
    throw new Error('Normalized canvas is smaller than an extracted sprite.');
  }

  const data = Buffer.alloc(canvasWidth * canvasHeight * 4);
  const cropStride = crop.width * 4;
  const canvasStride = canvasWidth * 4;
  for (let row = 0; row < crop.height; row += 1) {
    const targetStart = (top + row) * canvasStride + left * 4;
    crop.data.copy(data, targetStart, row * cropStride, (row + 1) * cropStride);
  }

  return {
    data,
    width: canvasWidth,
    height: canvasHeight,
    channels: 4,
    placement: {
      left,
      top,
      width: crop.width,
      height: crop.height,
      contentBottom: top + crop.height - 1,
    },
  };
}

async function writePng(image, filePath) {
  await sharp(image.data, {
    raw: {
      width: image.width,
      height: image.height,
      channels: 4,
    },
  })
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
    .toFile(filePath);
}

async function inputRecord(relativePath) {
  const filePath = absolute(relativePath);
  const metadata = await sharp(filePath).metadata();
  return {
    path: relativePath,
    sha256: await sha256File(filePath),
    dimensions: { width: metadata.width, height: metadata.height },
  };
}

async function processActorAtlas(kind) {
  const sourceRelativePath = inputs[kind];
  const outputRelativeDirectory = outputPaths[kind];
  const source = await decodeRgba(absolute(sourceRelativePath));
  if (source.width % 2 !== 0 || source.height % 2 !== 0) {
    throw new Error(`${kind} atlas dimensions must be divisible by two.`);
  }

  const quadrantWidth = source.width / 2;
  const quadrantHeight = source.height / 2;
  const sprites = [];

  for (const direction of directionLayout) {
    const region = extractRegion(
      source,
      direction.column * quadrantWidth,
      direction.row * quadrantHeight,
      quadrantWidth,
      quadrantHeight,
    );
    const keyed = removeAllMagentaAndBoundarySpill(region);
    const bounds = alphaBounds(keyed);
    sprites.push({
      direction,
      crop: cropToBounds(keyed, bounds),
      sourceBounds: bounds,
      removedMagentaPixelCount: keyed.removedMagentaPixelCount,
      removedBoundarySpillPixelCount: keyed.removedBoundarySpillPixelCount,
    });
  }

  const canvasWidth = roundUp(
    Math.max(...sprites.map(({ crop }) => crop.width)) + actorPadding * 2,
    4,
  );
  const canvasHeight = roundUp(
    Math.max(...sprites.map(({ crop }) => crop.height)) + actorPadding * 2,
    4,
  );
  const outputDirectory = absolute(outputRelativeDirectory);
  await mkdir(outputDirectory, { recursive: true });

  const outputSprites = {};
  for (const sprite of sprites) {
    const normalized = placeAtFootAnchor(
      sprite.crop,
      canvasWidth,
      canvasHeight,
      actorPadding,
    );
    const outputRelativePath = path.posix.join(
      outputRelativeDirectory,
      `${sprite.direction.name}.png`,
    );
    const outputFilePath = absolute(outputRelativePath);
    await writePng(normalized, outputFilePath);
    const written = await decodeRgba(outputFilePath);
    const writtenBounds = alphaBounds(written);
    const opaqueBorderPixels = assertTransparentBorder(
      written,
      `${kind}/${sprite.direction.name}`,
    );
    const residualMagenta = residualMagentaStats(written);
    if (residualMagenta.magentaPixelCount > 0) {
      throw new Error(
        `${kind}/${sprite.direction.name} validation failed: ` +
          `${residualMagenta.magentaPixelCount} loose-magenta pixels remain.`,
      );
    }

    outputSprites[sprite.direction.name] = {
      path: outputRelativePath,
      view: sprite.direction.view,
      sha256: await sha256File(outputFilePath),
      sourceAlphaBounds: sprite.sourceBounds,
      outputAlphaBounds: writtenBounds,
      opaqueBorderPixels,
      removedMagentaPixels: sprite.removedMagentaPixelCount,
      removedBoundarySpillPixels: sprite.removedBoundarySpillPixelCount,
      residualMagenta,
    };
  }

  const baselines = Object.values(outputSprites).map(
    ({ outputAlphaBounds }) => outputAlphaBounds.bottom,
  );
  if (!baselines.every((baseline) => baseline === baselines[0])) {
    throw new Error(`${kind} foot baselines are inconsistent.`);
  }

  return {
    source: await inputRecord(sourceRelativePath),
    directionOrder: directionLayout.map(({ name, view }) => ({ name, view })),
    quadrantDimensions: { width: quadrantWidth, height: quadrantHeight },
    canvas: { width: canvasWidth, height: canvasHeight },
    footAnchor: {
      pixel: { x: Math.floor(canvasWidth / 2), y: baselines[0] },
      normalized: {
        x: 0.5,
        y: Number((baselines[0] / canvasHeight).toFixed(6)),
      },
    },
    sprites: outputSprites,
  };
}

function retainedMagentaStats(image) {
  let pixelCount = 0;
  let minX = image.width;
  let minY = image.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      const offset = (y * image.width + x) * 4;
      if (
        !isCoreMagenta(
          image.data[offset],
          image.data[offset + 1],
          image.data[offset + 2],
          image.data[offset + 3],
        )
      ) {
        continue;
      }
      pixelCount += 1;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  return {
    pixelCount,
    bounds:
      pixelCount > 0
        ? {
            left: minX,
            top: minY,
            width: maxX - minX + 1,
            height: maxY - minY + 1,
          }
        : null,
  };
}

async function processAnomaly() {
  const source = await decodeRgba(absolute(inputs.anomaly));
  const keyed = removeEdgeConnectedMagenta(source);
  const sourceBounds = alphaBounds(keyed);
  const crop = cropToBounds(keyed, sourceBounds);
  const canvasWidth = roundUp(crop.width + anomalyPadding * 2, 4);
  const canvasHeight = roundUp(crop.height + anomalyPadding * 2, 4);
  const normalized = placeAtFootAnchor(crop, canvasWidth, canvasHeight, anomalyPadding);
  const outputFilePath = absolute(outputPaths.anomaly);
  await mkdir(path.dirname(outputFilePath), { recursive: true });
  await writePng(normalized, outputFilePath);

  const written = await decodeRgba(outputFilePath);
  const opaqueBorderPixels = assertTransparentBorder(written, 'anomaly');
  const retainedMagenta = retainedMagentaStats(written);
  const residualMagenta = residualMagentaStats(written);
  if (retainedMagenta.pixelCount < 100) {
    throw new Error('Anomaly validation failed: the enclosed magenta core was not preserved.');
  }

  return {
    source: await inputRecord(inputs.anomaly),
    output: {
      path: outputPaths.anomaly,
      sha256: await sha256File(outputFilePath),
      canvas: { width: canvasWidth, height: canvasHeight },
      alphaBounds: alphaBounds(written),
      opaqueBorderPixels,
      removedEdgeMagentaPixels: keyed.removedPixelCount,
      retainedOpaqueMagenta: retainedMagenta,
      residualMagenta,
    },
  };
}

function opaquePixelsInRegion(image, left, top, width, height) {
  let count = 0;
  const right = Math.min(image.width, left + width);
  const bottom = Math.min(image.height, top + height);
  for (let y = Math.max(0, top); y < bottom; y += 1) {
    for (let x = Math.max(0, left); x < right; x += 1) {
      if (image.data[(y * image.width + x) * 4 + 3] > 0) count += 1;
    }
  }
  return count;
}

function retainedHudColorStats(image) {
  const counts = { purple: 0, red: 0, blueCyan: 0, yellow: 0 };
  for (let pixel = 0; pixel < image.width * image.height; pixel += 1) {
    const offset = pixel * 4;
    const red = image.data[offset];
    const green = image.data[offset + 1];
    const blue = image.data[offset + 2];
    const alpha = image.data[offset + 3];
    if (alpha < 128) continue;

    if (red >= 95 && blue >= 105 && green + 24 < Math.min(red, blue)) {
      counts.purple += 1;
    }
    if (red >= 145 && red >= green + 42 && red >= blue + 28) {
      counts.red += 1;
    }
    if (blue >= 130 && green >= 85 && blue >= red + 28) {
      counts.blueCyan += 1;
    }
    if (red >= 150 && green >= 105 && blue <= 125 && red >= blue + 45) {
      counts.yellow += 1;
    }
  }
  return counts;
}

function restoreHudProtectedDiamonds(source, keyed) {
  const scaleX = source.width / hudMaskReference.width;
  const scaleY = source.height / hudMaskReference.height;
  let restoredPixelCount = 0;
  const probes = [];
  const mask = new Uint8Array(source.width * source.height);

  for (const diamond of hudMaskReference.diamonds) {
    const centerX = diamond.centerX * scaleX;
    const centerY = diamond.centerY * scaleY;
    const radiusX = diamond.radiusX * scaleX;
    const radiusY = diamond.radiusY * scaleY;
    const minX = Math.max(0, Math.floor(centerX - radiusX));
    const maxX = Math.min(source.width - 1, Math.ceil(centerX + radiusX));
    const minY = Math.max(0, Math.floor(centerY - radiusY));
    const maxY = Math.min(source.height - 1, Math.ceil(centerY + radiusY));

    for (let y = minY; y <= maxY; y += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        const diamondDistance =
          Math.abs(x - centerX) / radiusX + Math.abs(y - centerY) / radiusY;
        if (diamondDistance > 1) continue;
        const offset = (y * source.width + x) * 4;
        mask[y * source.width + x] = 1;
        if (keyed.data[offset + 3] === 0 && source.data[offset + 3] > 0) {
          restoredPixelCount += 1;
        }
        source.data.copy(keyed.data, offset, offset, offset + 4);
      }
    }

    probes.push({
      name: diamond.name,
      x: Math.round(centerX),
      y: Math.round(centerY),
      radiusX,
      radiusY,
    });
  }

  return { restoredPixelCount, probes, mask };
}

function alphaBoundsInRegion(image, left, top, width, height) {
  const localBounds = alphaBounds(extractRegion(image, left, top, width, height));
  return {
    ...localBounds,
    left: localBounds.left + left,
    top: localBounds.top + top,
    right: localBounds.right + left,
    bottom: localBounds.bottom + top,
  };
}

async function resizeRgba(image, targetWidth) {
  const targetHeight = Math.max(1, Math.round((image.height * targetWidth) / image.width));
  const { data, info } = await sharp(image.data, {
    raw: { width: image.width, height: image.height, channels: 4 },
  })
    .resize(targetWidth, targetHeight, {
      fit: 'fill',
      kernel: sharp.kernel.lanczos3,
    })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: 4 };
}

function copyImageToCanvas(canvas, image, left, top) {
  if (left < 0 || top < 0 || left + image.width > canvas.width || top + image.height > canvas.height) {
    throw new Error('HUD cluster placement falls outside the full-frame canvas.');
  }
  const sourceStride = image.width * 4;
  const targetStride = canvas.width * 4;
  for (let row = 0; row < image.height; row += 1) {
    const targetStart = (top + row) * targetStride + left * 4;
    image.data.copy(canvas.data, targetStart, row * sourceStride, (row + 1) * sourceStride);
  }
}

function transformMaskRegion(
  sourceMask,
  sourceWidth,
  sourceBounds,
  targetMask,
  targetWidth,
  placement,
) {
  for (let targetY = 0; targetY < placement.height; targetY += 1) {
    const sourceY =
      sourceBounds.top +
      Math.min(
        sourceBounds.height - 1,
        Math.floor(((targetY + 0.5) * sourceBounds.height) / placement.height),
      );
    for (let targetX = 0; targetX < placement.width; targetX += 1) {
      const sourceX =
        sourceBounds.left +
        Math.min(
          sourceBounds.width - 1,
          Math.floor(((targetX + 0.5) * sourceBounds.width) / placement.width),
        );
      if (!sourceMask[sourceY * sourceWidth + sourceX]) continue;
      const outputX = placement.left + targetX;
      const outputY = placement.top + targetY;
      targetMask[outputY * targetWidth + outputX] = 1;
    }
  }
}

function transformProbe(probe, sourceBounds, placement) {
  const scaleX = placement.width / sourceBounds.width;
  const scaleY = placement.height / sourceBounds.height;
  return {
    name: probe.name,
    x:
      placement.left +
      Math.min(
        placement.width - 1,
        Math.max(
          0,
          Math.round(((probe.x - sourceBounds.left) * placement.width) / sourceBounds.width),
        ),
      ),
    y:
      placement.top +
      Math.min(
        placement.height - 1,
        Math.max(
          0,
          Math.round(((probe.y - sourceBounds.top) * placement.height) / sourceBounds.height),
        ),
      ),
    radiusX: probe.radiusX * scaleX,
    radiusY: probe.radiusY * scaleY,
  };
}

function clearLooseMagentaOutsideMask(image, protectedMask) {
  let removedPixelCount = 0;
  for (let pixel = 0; pixel < image.width * image.height; pixel += 1) {
    if (protectedMask[pixel]) continue;
    const offset = pixel * 4;
    if (image.data[offset + 3] === 0) continue;
    if (!isLooseMagenta(image.data[offset], image.data[offset + 1], image.data[offset + 2])) {
      continue;
    }
    clearPixel(image.data, pixel);
    removedPixelCount += 1;
  }
  return removedPixelCount;
}

function isHudNeonMagenta(red, green, blue) {
  const redBlueFloor = Math.min(red, blue);
  return (
    redBlueFloor >= 105 &&
    Math.max(red, blue) >= 145 &&
    redBlueFloor - green >= 72 &&
    green <= 135 &&
    Math.abs(red - blue) <= 112
  );
}

function styleHudDiamonds(image, diamonds) {
  const stats = {
    translucentFacePixels: 0,
    maximumFaceAlpha: 0,
    paleOutlinePixels: 0,
    amberOutlinePixels: 0,
    topEmblemPixelsDesaturated: 0,
  };
  const faceAlpha = Math.round(255 * 0.22);

  for (const diamond of diamonds) {
    const minX = Math.max(0, Math.floor(diamond.x - diamond.radiusX - 1));
    const maxX = Math.min(image.width - 1, Math.ceil(diamond.x + diamond.radiusX + 1));
    const minY = Math.max(0, Math.floor(diamond.y - diamond.radiusY - 1));
    const maxY = Math.min(image.height - 1, Math.ceil(diamond.y + diamond.radiusY + 1));

    for (let y = minY; y <= maxY; y += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        const distance =
          Math.abs(x - diamond.x) / diamond.radiusX +
          Math.abs(y - diamond.y) / diamond.radiusY;
        if (distance > 1) continue;

        const offset = (y * image.width + x) * 4;
        const alpha = image.data[offset + 3];
        const neonFace = isHudNeonMagenta(
          image.data[offset],
          image.data[offset + 1],
          image.data[offset + 2],
        );
        if (neonFace) {
          image.data[offset] = 24;
          image.data[offset + 1] = 36;
          image.data[offset + 2] = 38;
          image.data[offset + 3] = Math.min(alpha, faceAlpha);
          stats.translucentFacePixels += 1;
          stats.maximumFaceAlpha = Math.max(stats.maximumFaceAlpha, image.data[offset + 3]);
        } else if (diamond.name === 'status' && alpha > 0) {
          const brightness = Math.max(
            image.data[offset],
            image.data[offset + 1],
            image.data[offset + 2],
          );
          if (brightness >= 120) {
            const line = Math.min(226, Math.max(164, brightness));
            image.data[offset] = line - 8;
            image.data[offset + 1] = line;
            image.data[offset + 2] = line - 1;
            stats.topEmblemPixelsDesaturated += 1;
          }
        }

        if (distance < 0.91) continue;
        if (diamond.name === 'skill-down') {
          image.data[offset] = 226;
          image.data[offset + 1] = 174;
          image.data[offset + 2] = 72;
          image.data[offset + 3] = Math.max(image.data[offset + 3], 224);
          stats.amberOutlinePixels += 1;
        } else {
          image.data[offset] = 172;
          image.data[offset + 1] = 194;
          image.data[offset + 2] = 191;
          image.data[offset + 3] = Math.max(image.data[offset + 3], 208);
          stats.paleOutlinePixels += 1;
        }
      }
    }
  }

  if (stats.maximumFaceAlpha > Math.round(255 * 0.25)) {
    throw new Error('HUD diamond face alpha exceeds 25%.');
  }
  return stats;
}

async function resizeHudClusters(image, protectedMask, probes) {
  const splitY = Math.floor(image.height * hudLayoutTargets.splitYRatio);
  const sourceClusters = [
    {
      name: 'topLeft',
      bounds: alphaBoundsInRegion(image, 0, 0, image.width, splitY),
      targetWidth: hudLayoutTargets.topLeftWidth,
      verticalAnchor: 'top',
    },
    {
      name: 'bottomLeft',
      bounds: alphaBoundsInRegion(image, 0, splitY, image.width, image.height - splitY),
      targetWidth: hudLayoutTargets.bottomLeftWidth,
      verticalAnchor: 'bottom',
    },
  ];

  const output = {
    data: Buffer.alloc(image.width * image.height * 4),
    width: image.width,
    height: image.height,
    channels: 4,
  };
  const outputMask = new Uint8Array(image.width * image.height);
  const outputProbes = [];
  const layout = {};

  for (const cluster of sourceClusters) {
    const crop = cropToBounds(image, cluster.bounds);
    const resized = await resizeRgba(crop, cluster.targetWidth);
    const placement = {
      left: cluster.bounds.left,
      top:
        cluster.verticalAnchor === 'top'
          ? cluster.bounds.top
          : cluster.bounds.bottom - resized.height + 1,
      width: resized.width,
      height: resized.height,
    };
    copyImageToCanvas(output, resized, placement.left, placement.top);
    transformMaskRegion(
      protectedMask,
      image.width,
      cluster.bounds,
      outputMask,
      output.width,
      placement,
    );

    const clusterProbes = probes.filter((probe) =>
      cluster.name === 'topLeft' ? probe.y < splitY : probe.y >= splitY,
    );
    outputProbes.push(
      ...clusterProbes.map((probe) => transformProbe(probe, cluster.bounds, placement)),
    );

    layout[cluster.name] = {
      sourceBounds: cluster.bounds,
      outputPlacement: placement,
      scale: Number((resized.width / cluster.bounds.width).toFixed(8)),
      preservedAnchor:
        cluster.verticalAnchor === 'top'
          ? { left: cluster.bounds.left, top: cluster.bounds.top }
          : { left: cluster.bounds.left, bottom: cluster.bounds.bottom },
    };
  }

  const removedPostResizeMagentaPixels = clearLooseMagentaOutsideMask(output, outputMask);
  const style = styleHudDiamonds(output, outputProbes);

  const topOutputBounds = alphaBoundsInRegion(output, 0, 0, output.width, splitY);
  const bottomOutputBounds = alphaBoundsInRegion(
    output,
    0,
    splitY,
    output.width,
    output.height - splitY,
  );
  if (topOutputBounds.width !== hudLayoutTargets.topLeftWidth) {
    throw new Error(`HUD top-left width is ${topOutputBounds.width}, expected 295.`);
  }
  if (bottomOutputBounds.width !== hudLayoutTargets.bottomLeftWidth) {
    throw new Error(`HUD bottom-left width is ${bottomOutputBounds.width}, expected 184.`);
  }
  if (
    topOutputBounds.left !== layout.topLeft.preservedAnchor.left ||
    topOutputBounds.top !== layout.topLeft.preservedAnchor.top
  ) {
    throw new Error('HUD top-left anchor moved during resize.');
  }
  if (
    bottomOutputBounds.left !== layout.bottomLeft.preservedAnchor.left ||
    bottomOutputBounds.bottom !== layout.bottomLeft.preservedAnchor.bottom
  ) {
    throw new Error('HUD bottom-left anchor moved during resize.');
  }

  layout.topLeft.outputAlphaBounds = topOutputBounds;
  layout.bottomLeft.outputAlphaBounds = bottomOutputBounds;
  return {
    image: output,
    protectedMask: outputMask,
    probes: outputProbes,
    layout,
    removedPostResizeMagentaPixels,
    style,
  };
}

async function processHud() {
  const source = await decodeRgba(absolute(inputs.hud));
  const original = { ...source, data: Buffer.from(source.data) };
  const keyed = removeAllMagenta(source);
  const protectedDiamondResult = restoreHudProtectedDiamonds(original, keyed);
  const { mask: protectedDiamondMask, ...protectedDiamonds } = protectedDiamondResult;
  const resizedHud = await resizeHudClusters(
    keyed,
    protectedDiamondMask,
    protectedDiamonds.probes,
  );
  const outputFilePath = absolute(outputPaths.hud);
  await mkdir(path.dirname(outputFilePath), { recursive: true });
  await writePng(resizedHud.image, outputFilePath);

  const written = await decodeRgba(outputFilePath);
  if (written.width !== source.width || written.height !== source.height) {
    throw new Error('HUD validation failed: output dimensions changed.');
  }
  const opaqueBorderPixels = assertTransparentBorder(written, 'hud');

  const topLeftOpaquePixels = opaquePixelsInRegion(
    written,
    0,
    0,
    Math.ceil(written.width * 0.3),
    Math.ceil(written.height * 0.25),
  );
  const bottomLeftOpaquePixels = opaquePixelsInRegion(
    written,
    0,
    Math.floor(written.height * 0.62),
    Math.ceil(written.width * 0.3),
    Math.ceil(written.height * 0.38),
  );
  if (topLeftOpaquePixels < 100 || bottomLeftOpaquePixels < 100) {
    throw new Error('HUD validation failed: an expected control cluster was removed.');
  }

  const retainedColors = retainedHudColorStats(written);
  if (
    retainedColors.red === 0 ||
    retainedColors.blueCyan === 0 ||
    retainedColors.yellow === 0
  ) {
    throw new Error('HUD validation failed: one or more protected color families were removed.');
  }
  for (const probe of resizedHud.probes) {
    const alpha = written.data[(probe.y * written.width + probe.x) * 4 + 3];
    if (alpha === 0) {
      throw new Error(`HUD validation failed: ${probe.name} interior was removed.`);
    }
  }
  const residualMagenta = {
    total: residualMagentaStats(written),
    outsideProtectedDiamonds: residualMagentaStats(written, resizedHud.protectedMask),
  };
  if (residualMagenta.outsideProtectedDiamonds.magentaPixelCount > 0) {
    throw new Error(
      'HUD validation failed: loose-magenta pixels remain outside protected controls.',
    );
  }

  return {
    source: await inputRecord(inputs.hud),
    output: {
      path: outputPaths.hud,
      sha256: await sha256File(outputFilePath),
      canvas: { width: written.width, height: written.height },
      alphaBounds: alphaBounds(written),
      opaqueBorderPixels,
      removedMagentaPixels: keyed.removedMagentaPixelCount,
      removedBoundarySpillPixels: keyed.removedBoundarySpillPixelCount,
      retainedColors,
      retainedClusters: { topLeftOpaquePixels, bottomLeftOpaquePixels },
      protectedDiamonds,
      layout: resizedHud.layout,
      removedPostResizeMagentaPixels: resizedHud.removedPostResizeMagentaPixels,
      style: resizedHud.style,
      residualMagenta,
    },
  };
}

function summarizeActor(name, result) {
  return {
    asset: name,
    canvas: result.canvas,
    footAnchor: result.footAnchor,
    outputs: Object.fromEntries(
      Object.entries(result.sprites).map(([direction, sprite]) => [
        direction,
        {
          path: sprite.path,
          sha256: sprite.sha256,
          residualMagenta: sprite.residualMagenta,
        },
      ]),
    ),
  };
}

async function main() {
  const [hero, companion, anomaly, hud] = await Promise.all([
    processActorAtlas('hero'),
    processActorAtlas('companion'),
    processAnomaly(),
    processHud(),
  ]);

  const provenance = {
    schemaVersion: 1,
    processor: {
      path: path.relative(projectRoot, scriptPath),
      sha256: await sha256File(scriptPath),
      algorithms: {
        actor: 'global-magenta-key-with-boundary-spill-erosion-v1',
        hud: 'global-magenta-key-protected-diamond-restyle-and-layout-v1',
        anomaly: 'edge-connected-magenta-4-neighbor-v1',
      },
      sharpVersion: sharp.versions.sharp,
      libvipsVersion: sharp.versions.vips,
    },
    settings: {
      chromaKey: keySettings,
      boundarySpill: spillSettings,
      actorPadding,
      anomalyPadding,
      hudMaskReference,
      hudLayoutTargets,
    },
    assets: { hero, companion, anomaly, hud },
  };

  const provenancePath = absolute(outputPaths.provenance);
  await writeFile(provenancePath, `${JSON.stringify(provenance, null, 2)}\n`, 'utf8');

  const summary = {
    hero: summarizeActor('hero', hero),
    companion: summarizeActor('companion', companion),
    anomaly: {
      asset: 'anomaly',
      canvas: anomaly.output.canvas,
      retainedOpaqueMagentaPixels: anomaly.output.retainedOpaqueMagenta.pixelCount,
      residualMagenta: anomaly.output.residualMagenta,
      output: { path: anomaly.output.path, sha256: anomaly.output.sha256 },
    },
    hud: {
      asset: 'hud',
      canvas: hud.output.canvas,
      layout: hud.output.layout,
      style: hud.output.style,
      retainedColors: hud.output.retainedColors,
      residualMagenta: hud.output.residualMagenta,
      output: { path: hud.output.path, sha256: hud.output.sha256 },
    },
    provenance: {
      path: outputPaths.provenance,
      sha256: await sha256File(provenancePath),
    },
  };
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});
