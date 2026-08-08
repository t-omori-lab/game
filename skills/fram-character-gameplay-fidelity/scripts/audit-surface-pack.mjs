#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "../../..");
const defaultPack = "src/characterForge/f01.surface-pack.json";
const neighborOffsets = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

function usage() {
  return `Usage: node audit-surface-pack.mjs [pack.json] [options]\n\nOptions:\n  --profile <gameplay-profile.json>\n  --expected-digest <sha256>\n  --expected-cells <count>\n  --expected-detached-ground-cells <count>\n  --ground-max-y <grid-y>                 default: 1\n  --component-max-cells <count>            default: 64\n`;
}

function parseArguments(argv) {
  const options = {};
  let packPath;
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") {
      process.stdout.write(usage());
      process.exit(0);
    }
    if (!argument.startsWith("--") && packPath === undefined) {
      packPath = argument;
      continue;
    }
    if (!argument.startsWith("--")) {
      throw new Error(`Unexpected positional argument: ${argument}`);
    }
    const key = argument.slice(2);
    const value = argv[index + 1];
    if (value === undefined || value.startsWith("--")) {
      throw new Error(`Missing value for ${argument}`);
    }
    options[key] = value;
    index += 1;
  }
  return { packPath, options };
}

function readInteger(options, key, fallback) {
  const raw = options[key];
  if (raw === undefined) return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`--${key} must be a non-negative integer.`);
  }
  return value;
}

function cellKey(cell) {
  return `${cell.x},${cell.y},${cell.z}`;
}

function repositoryFile(rawPath, label) {
  const absolutePath = path.resolve(repositoryRoot, rawPath);
  const relativePath = path.relative(repositoryRoot, absolutePath);
  if (
    relativePath === "" ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(`${label} must live inside this repository.`);
  }
  return {
    absolutePath,
    relativePath: relativePath.split(path.sep).join("/"),
  };
}

function componentBounds(component) {
  const bounds = {
    min: { x: Infinity, y: Infinity, z: Infinity },
    max: { x: -Infinity, y: -Infinity, z: -Infinity },
  };
  for (const cell of component) {
    bounds.min.x = Math.min(bounds.min.x, cell.x);
    bounds.min.y = Math.min(bounds.min.y, cell.y);
    bounds.min.z = Math.min(bounds.min.z, cell.z);
    bounds.max.x = Math.max(bounds.max.x, cell.x);
    bounds.max.y = Math.max(bounds.max.y, cell.y);
    bounds.max.z = Math.max(bounds.max.z, cell.z);
  }
  return bounds;
}

function connectedComponents(cells) {
  const byPosition = new Map(cells.map((cell) => [cellKey(cell), cell]));
  const visited = new Set();
  const components = [];

  for (const initial of cells) {
    const initialKey = cellKey(initial);
    if (visited.has(initialKey)) continue;
    const pending = [initial];
    const component = [];
    visited.add(initialKey);
    while (pending.length > 0) {
      const cell = pending.pop();
      component.push(cell);
      for (const [dx, dy, dz] of neighborOffsets) {
        const key = `${cell.x + dx},${cell.y + dy},${cell.z + dz}`;
        const neighbor = byPosition.get(key);
        if (neighbor === undefined || visited.has(key)) continue;
        visited.add(key);
        pending.push(neighbor);
      }
    }
    components.push(component);
  }
  return components;
}

async function main() {
  const { packPath, options } = parseArguments(process.argv.slice(2));
  const profileFile = options.profile === undefined
    ? undefined
    : repositoryFile(options.profile, "The gameplay profile");
  const profile = profileFile === undefined
    ? undefined
    : JSON.parse(await readFile(profileFile.absolutePath, "utf8"));
  const selectedPackPath = packPath ?? profile?.sourcePack ?? defaultPack;
  const packFile = repositoryFile(selectedPackPath, "The audited pack");

  const pack = JSON.parse(await readFile(packFile.absolutePath, "utf8"));
  const encodedPayload = String(pack.cellsBase64 ?? "").replace(/\s/g, "");
  const payload = Buffer.from(encodedPayload, "base64");
  const normalizedInput = encodedPayload.replace(/=+$/, "");
  const normalizedDecoded = payload.toString("base64").replace(/=+$/, "");
  const base64RoundTripMatches = normalizedInput === normalizedDecoded;
  const stride = Number(pack.stride);
  const declaredCells = Number(pack.renderedSurfaceCells);
  const expectedBytes = stride * declaredCells;
  const lengthMatches =
    Number.isInteger(stride) &&
    stride >= 5 &&
    Number.isInteger(declaredCells) &&
    payload.length === expectedBytes;
  const computedDigest = createHash("sha256").update(payload).digest("hex");
  const expectedDigest =
    options["expected-digest"] ??
    profile?.sourcePayloadSha256 ??
    pack.payloadSha256;
  const digestMatches = computedDigest === expectedDigest;
  const expectedCells = readInteger(
    options,
    "expected-cells",
    profile?.sourceSurfaceCells ?? declaredCells,
  );
  const expectedGroundCells = readInteger(
    options,
    "expected-detached-ground-cells",
    profile?.topologyFilter?.excludedCells,
  );
  const groundMaxY = readInteger(
    options,
    "ground-max-y",
    profile?.topologyFilter?.maximumGridY ?? 1,
  );
  const componentMaxCells = readInteger(
    options,
    "component-max-cells",
    profile?.topologyFilter?.maximumComponentCells ?? 64,
  );

  const cells = [];
  const semanticErrors = [];
  if (lengthMatches) {
    for (let offset = 0; offset < payload.length; offset += stride) {
      const partIndex = payload[offset + 3];
      const paletteIndex = payload[offset + 4];
      const moduleIndex = stride >= 6 ? payload[offset + 5] : undefined;
      if (pack.partIds?.[partIndex] === undefined) {
        semanticErrors.push({ cell: offset / stride, field: "part", index: partIndex });
      }
      if (pack.paletteIds?.[paletteIndex] === undefined) {
        semanticErrors.push({ cell: offset / stride, field: "palette", index: paletteIndex });
      }
      if (stride >= 6 && pack.moduleIds?.[moduleIndex] === undefined) {
        semanticErrors.push({ cell: offset / stride, field: "module", index: moduleIndex });
      }
      cells.push({
        x: payload[offset],
        y: payload[offset + 1],
        z: payload[offset + 2],
      });
    }
  }

  const coordinateCounts = new Map();
  for (const cell of cells) {
    const key = cellKey(cell);
    coordinateCounts.set(key, (coordinateCounts.get(key) ?? 0) + 1);
  }
  const duplicateCoordinates = [...coordinateCounts.values()].reduce(
    (total, count) => total + Math.max(0, count - 1),
    0,
  );
  const components = duplicateCoordinates === 0 ? connectedComponents(cells) : [];
  const groundComponents = components.filter((component) => {
    const maximumY = Math.max(...component.map((cell) => cell.y));
    return maximumY <= groundMaxY && component.length <= componentMaxCells;
  });
  const detachedGroundCells = groundComponents.reduce(
    (total, component) => total + component.length,
    0,
  );
  const expectationsMatch =
    declaredCells === expectedCells &&
    (expectedGroundCells === undefined || detachedGroundCells === expectedGroundCells);
  const pass =
    base64RoundTripMatches &&
    lengthMatches &&
    digestMatches &&
    semanticErrors.length === 0 &&
    duplicateCoordinates === 0 &&
    expectationsMatch;

  const report = {
    gate: "fram-character-surface-pack-audit-v1",
    pass,
    pack: packFile.relativePath,
    profile: profileFile === undefined
      ? null
      : { path: profileFile.relativePath, id: profile.id ?? null },
    identity: {
      schemaVersion: pack.schemaVersion,
      compilerVersion: pack.compilerVersion,
      sourceId: pack.sourceId,
    },
    payload: {
      declaredCells,
      expectedCells,
      stride,
      bytes: payload.length,
      expectedBytes,
      declaredDigest: pack.payloadSha256,
      expectedDigest,
      computedDigest,
      base64RoundTripMatches,
      lengthMatches,
      digestMatches,
    },
    semantics: {
      partIds: pack.partIds?.length ?? 0,
      paletteIds: pack.paletteIds?.length ?? 0,
      moduleIds: pack.moduleIds?.length ?? 0,
      semanticErrors,
      duplicateCoordinates,
    },
    topology: {
      components: components.length,
      largestComponentCells: Math.max(0, ...components.map((component) => component.length)),
      groundRule: { maximumY: groundMaxY, maximumCells: componentMaxCells },
      detachedGroundComponents: groundComponents.map((component) => ({
        cells: component.length,
        bounds: componentBounds(component),
      })),
      detachedGroundCells,
      expectedDetachedGroundCells: expectedGroundCells ?? null,
    },
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!pass) process.exitCode = 1;
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
