#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import * as THREE from "three";

const [bodyPath, hairPath, outputPath] = process.argv.slice(2);
if (!bodyPath || !hairPath || !outputPath) {
  throw new Error(
    "Usage: generate-r05-voxel-avatar.mjs <female.gltf> <hair.gltf> <output.ts>",
  );
}

// Roughly ninety cells over the actor's full height. The screen therefore
// retains 1-2 px orthogonal steps at normal gameplay scale instead of
// collapsing back into a few large toy blocks.
const CELL = 0.0195;
const LOWER_BODY_TOP = 0.95;
const LOWER_BODY_SCALE = 0.82;
const UPPER_BODY_SHIFT = LOWER_BODY_TOP * (1 - LOWER_BODY_SCALE);
const PARTS = [
  "torso",
  "head",
  "leftUpperArm",
  "leftForearm",
  "leftHand",
  "rightUpperArm",
  "rightForearm",
  "rightHand",
  "leftThigh",
  "leftCalf",
  "leftFoot",
  "rightThigh",
  "rightCalf",
  "rightFoot",
  "equipment",
];
const ROLES = [
  "skin",
  "hair",
  "hairLight",
  "coat",
  "coatShadow",
  "under",
  "boot",
  "metal",
  "pack",
  "coral",
  "cyan",
  "eye",
  "mouth",
];

const COMPONENTS = {
  5120: { bytes: 1, read: "getInt8" },
  5121: { bytes: 1, read: "getUint8" },
  5122: { bytes: 2, read: "getInt16" },
  5123: { bytes: 2, read: "getUint16" },
  5125: { bytes: 4, read: "getUint32" },
  5126: { bytes: 4, read: "getFloat32" },
};
const WIDTHS = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };

function stylizedY(value) {
  return value <= LOWER_BODY_TOP
    ? value * LOWER_BODY_SCALE
    : value - UPPER_BODY_SHIFT;
}

async function loadDocument(gltfPath) {
  const document = JSON.parse(await fs.readFile(gltfPath, "utf8"));
  if (document.buffers?.length !== 1) {
    throw new Error("The R05 compiler currently expects one external glTF buffer.");
  }
  const binary = await fs.readFile(
    path.resolve(path.dirname(gltfPath), document.buffers[0].uri),
  );
  return { document, binary };
}

function readAccessor(source, accessorIndex) {
  const { document, binary } = source;
  const accessor = document.accessors[accessorIndex];
  const view = document.bufferViews[accessor.bufferView];
  const component = COMPONENTS[accessor.componentType];
  const width = WIDTHS[accessor.type];
  if (!component || !width) {
    throw new Error(`Unsupported accessor ${accessorIndex}.`);
  }
  const stride = view.byteStride ?? component.bytes * width;
  const start = (view.byteOffset ?? 0) + (accessor.byteOffset ?? 0);
  const data = new DataView(binary.buffer, binary.byteOffset, binary.byteLength);
  const output = new Array(accessor.count);
  for (let index = 0; index < accessor.count; index += 1) {
    const item = new Array(width);
    for (let channel = 0; channel < width; channel += 1) {
      item[channel] = data[component.read](
        start + index * stride + channel * component.bytes,
        true,
      );
    }
    output[index] = item;
  }
  return output;
}

function semanticPart(name) {
  if (/head|neck/i.test(name)) return "head";
  if (/clavicle|spine|pelvis|root/i.test(name)) return "torso";
  const left = /_l$/i.test(name);
  const right = /_r$/i.test(name);
  if (left || right) {
    const side = left ? "left" : "right";
    if (/upperarm/i.test(name)) return `${side}UpperArm`;
    if (/lowerarm/i.test(name)) return `${side}Forearm`;
    if (/hand|index|middle|ring|pinky|thumb/i.test(name)) return `${side}Hand`;
    if (/thigh/i.test(name)) return `${side}Thigh`;
    if (/calf/i.test(name)) return `${side}Calf`;
    if (/foot|ball/i.test(name)) return `${side}Foot`;
  }
  return "torso";
}

function roleForPart(part, y) {
  if (part === "head" || part.endsWith("Hand")) return "skin";
  if (part.endsWith("Foot")) return "boot";
  if (part.endsWith("Thigh") || part.endsWith("Calf")) return "under";
  if (part === "torso") return y < 0.83 ? "under" : "coatShadow";
  return "coat";
}

function dominantJoint(jointVertices, weightVertices, barycentric) {
  const totals = new Map();
  for (let vertex = 0; vertex < 3; vertex += 1) {
    for (let channel = 0; channel < 4; channel += 1) {
      const joint = jointVertices[vertex][channel];
      const weight = weightVertices[vertex][channel] * barycentric[vertex];
      totals.set(joint, (totals.get(joint) ?? 0) + weight);
    }
  }
  let selected = 0;
  let selectedWeight = -1;
  for (const [joint, weight] of totals) {
    if (weight > selectedWeight) {
      selected = joint;
      selectedWeight = weight;
    }
  }
  return selected;
}

function addRecord(records, part, role, position, priority = 1) {
  const gx = Math.round(position.x / CELL);
  const gy = Math.round(stylizedY(position.y) / CELL);
  const gz = Math.round(position.z / CELL);
  const key = `${part}:${gx}:${gy}:${gz}`;
  const existing = records.get(key);
  if (existing && existing.priority > priority) return;
  records.set(key, { part, role, gx, gy, gz, priority });
}

function sampleSkinnedSurface(source, records, forcedRole) {
  const { document } = source;
  const skin = document.skins[0];
  const mesh = document.meshes.reduce((selected, candidate) => {
    const selectedCount = Math.max(
      ...selected.primitives.map(
        (primitive) => document.accessors[primitive.attributes.POSITION].count,
      ),
    );
    const candidateCount = Math.max(
      ...candidate.primitives.map(
        (primitive) => document.accessors[primitive.attributes.POSITION].count,
      ),
    );
    return candidateCount > selectedCount ? candidate : selected;
  });
  for (const primitive of mesh.primitives) {
    const positions = readAccessor(source, primitive.attributes.POSITION);
    const joints = readAccessor(source, primitive.attributes.JOINTS_0);
    const weights = readAccessor(source, primitive.attributes.WEIGHTS_0);
    const indices = readAccessor(source, primitive.indices).map((item) => item[0]);
    for (let cursor = 0; cursor < indices.length; cursor += 3) {
      const vertexIds = [indices[cursor], indices[cursor + 1], indices[cursor + 2]];
      const points = vertexIds.map((index) => new THREE.Vector3(...positions[index]));
      const maximumEdge = Math.max(
        points[0].distanceTo(points[1]),
        points[1].distanceTo(points[2]),
        points[2].distanceTo(points[0]),
      );
      const steps = Math.max(1, Math.min(9, Math.ceil(maximumEdge / CELL)));
      for (let first = 0; first <= steps; first += 1) {
        for (let second = 0; second <= steps - first; second += 1) {
          const barycentric = [
            first / steps,
            second / steps,
            1 - (first + second) / steps,
          ];
          const position = new THREE.Vector3()
            .addScaledVector(points[0], barycentric[0])
            .addScaledVector(points[1], barycentric[1])
            .addScaledVector(points[2], barycentric[2]);
          const jointIndex = dominantJoint(
            vertexIds.map((index) => joints[index]),
            vertexIds.map((index) => weights[index]),
            barycentric,
          );
          const nodeIndex = skin.joints[jointIndex] ?? skin.joints[0];
          const part = forcedRole ? "head" : semanticPart(document.nodes[nodeIndex].name);
          addRecord(
            records,
            part,
            forcedRole ?? roleForPart(part, position.y),
            position,
            forcedRole ? 3 : 1,
          );
        }
      }
    }
  }
}

function addCoatAndEquipment(records) {
  // The coat is deliberately authored as fitted upper panels plus two
  // independent tails. A single closed box shell hid the female scaffold and
  // made the actor read as a broad armoured robot at gameplay scale.
  for (let y = 0.95; y <= 1.37; y += CELL) {
    const progress = (y - 0.95) / (1.37 - 0.95);
    const halfX = THREE.MathUtils.lerp(0.155, 0.205, progress);
    const halfZ = THREE.MathUtils.lerp(0.137, 0.158, progress);
    for (let x = -halfX; x <= halfX; x += CELL) {
      const side = halfX - Math.abs(x) < CELL * 0.78;
      const back = true;
      if (back) {
        addRecord(
          records,
          "equipment",
          x < -halfX + CELL * 1.1 ? "coatShadow" : "coat",
          new THREE.Vector3(x, y, -halfZ),
          6,
        );
      }
      if (side) {
        for (const z of [-halfZ + CELL, 0, halfZ - CELL]) {
          addRecord(
            records,
            "equipment",
            x < 0 ? "coatShadow" : "coat",
            new THREE.Vector3(x, y, z),
            6,
          );
        }
      }
    }

    // Narrow lapels preserve the A-line read from a front three-quarter view
    // without closing the jacket over the waist and legs.
    for (const side of [-1, 1]) {
      const lapelX = side * (0.055 + progress * 0.028);
      addRecord(
        records,
        "equipment",
        side < 0 ? "coatShadow" : "coat",
        new THREE.Vector3(lapelX, y, halfZ),
        7,
      );
    }
  }

  for (let y = 0.61; y <= 0.99; y += CELL) {
    const progress = (y - 0.61) / (0.99 - 0.61);
    const tailHalfWidth = THREE.MathUtils.lerp(0.115, 0.082, progress);
    const tailCenter = THREE.MathUtils.lerp(0.125, 0.087, progress);
    const backZ = THREE.MathUtils.lerp(-0.165, -0.14, progress);
    for (const side of [-1, 1]) {
      for (
        let x = side * tailCenter - tailHalfWidth;
        x <= side * tailCenter + tailHalfWidth;
        x += CELL
      ) {
        // Keep a visible split between the tails so both legs remain readable.
        if (Math.abs(x) < 0.033 + (1 - progress) * 0.016) continue;
        addRecord(
          records,
          "equipment",
          side < 0 ? "coatShadow" : "coat",
          new THREE.Vector3(x, y, backZ),
          7,
        );
        if (Math.abs(Math.abs(x) - (tailCenter + tailHalfWidth)) < CELL) {
          addRecord(
            records,
            "equipment",
            side < 0 ? "coatShadow" : "coat",
            new THREE.Vector3(x, y, backZ + CELL),
            7,
          );
        }
      }

      // Front tail: one-cell textile plane with an open central gap. The back
      // and front reads therefore share the same short split-coat silhouette.
      const frontCenter = side * THREE.MathUtils.lerp(0.105, 0.075, progress);
      const frontHalfWidth = THREE.MathUtils.lerp(0.078, 0.058, progress);
      for (
        let x = frontCenter - frontHalfWidth;
        x <= frontCenter + frontHalfWidth;
        x += CELL
      ) {
        if (Math.abs(x) < 0.038) continue;
        addRecord(
          records,
          "equipment",
          Math.abs(x) < 0.065 ? "coral" : side < 0 ? "coatShadow" : "coat",
          new THREE.Vector3(x, y, 0.145),
          7,
        );
      }
    }
  }

  const addBoxShell = (minimum, maximum, role, priority = 7) => {
    for (let x = minimum[0]; x <= maximum[0]; x += CELL) {
      for (let y = minimum[1]; y <= maximum[1]; y += CELL) {
        for (let z = minimum[2]; z <= maximum[2]; z += CELL) {
          const edge =
            x < minimum[0] + CELL || x > maximum[0] - CELL ||
            y < minimum[1] + CELL || y > maximum[1] - CELL ||
            z < minimum[2] + CELL || z > maximum[2] - CELL;
          if (edge) addRecord(records, "equipment", role, new THREE.Vector3(x, y, z), priority);
        }
      }
    }
  };
  // The archive module stays within the shoulder silhouette. It is a piece of
  // equipment on the girl, not the primary body volume.
  addBoxShell([-0.12, 1.035, -0.245], [0.12, 1.285, -0.175], "pack");
  addBoxShell([-0.086, 1.075, -0.268], [0.086, 1.245, -0.245], "metal", 8);

  // A single wind-swept coral field textile breaks the pale silhouette and
  // gives the compact actor a readable asymmetric gesture like Concept C.
  for (let index = 0; index < 20; index += 1) {
    const progress = index / 19;
    const y = THREE.MathUtils.lerp(1.35, 0.78, progress);
    const x = THREE.MathUtils.lerp(-0.09, -0.27, progress) +
      Math.sin(progress * Math.PI * 1.4) * 0.025;
    const z = THREE.MathUtils.lerp(-0.17, -0.11, progress);
    for (const width of [-CELL * 0.45, CELL * 0.45]) {
      addRecord(
        records,
        "equipment",
        "coral",
        new THREE.Vector3(x + width, y, z),
        9,
      );
    }
  }
  for (const [x, y] of [[-0.035, 1.19], [0.035, 1.19], [0, 1.135]]) {
    addRecord(records, "equipment", "cyan", new THREE.Vector3(x, y, -0.281), 10);
  }
}

function addHairSilhouette(records) {
  // Preserve the sampled hair as the anatomical base, then add a quantized bob
  // and two small buns so the silhouette remains feminine at normal camera
  // distance. These are still literal cells, never a smooth runtime shell.
  for (const side of [-1, 1]) {
    for (let index = 0; index < 11; index += 1) {
      const progress = index / 10;
      const x = side * THREE.MathUtils.lerp(0.13, 0.165, progress);
      const y = THREE.MathUtils.lerp(1.68, 1.43, progress);
      const z = THREE.MathUtils.lerp(0.015, -0.035, progress);
      addRecord(records, "head", index < 3 ? "hairLight" : "hair", new THREE.Vector3(x, y, z), 8);
      addRecord(records, "head", "hair", new THREE.Vector3(x - side * CELL, y, z - CELL), 8);
    }
  }

  for (const side of [-1, 1]) {
    const center = new THREE.Vector3(side * 0.145, 1.785, -0.025);
    for (let x = -0.057; x <= 0.057; x += CELL) {
      for (let y = -0.057; y <= 0.057; y += CELL) {
        for (let z = -0.057; z <= 0.057; z += CELL) {
          const distance = Math.hypot(x, y, z);
          if (distance > 0.064 || distance < 0.035) continue;
          addRecord(
            records,
            "head",
            y > 0.015 ? "hairLight" : "hair",
            center.clone().add(new THREE.Vector3(x, y, z)),
            9,
          );
        }
      }
    }
  }
}

function addFace(records) {
  for (const x of [-0.046, 0.046]) {
    addRecord(records, "head", "eye", new THREE.Vector3(x, 1.655, 0.158), 12);
    addRecord(records, "head", "cyan", new THREE.Vector3(x, 1.655, 0.181), 13);
  }
  addRecord(records, "head", "mouth", new THREE.Vector3(0, 1.595, 0.159), 12);
  addRecord(records, "head", "skin", new THREE.Vector3(0, 1.625, 0.177), 11);
  for (const x of [-0.074, 0.074]) {
    addRecord(records, "head", "coral", new THREE.Vector3(x, 1.613, 0.16), 12);
  }
  for (const x of [-0.069, -0.046, -0.023, 0, 0.023, 0.046, 0.069]) {
    const y = 1.735 - Math.abs(x) * 0.3;
    addRecord(records, "head", x === 0 ? "hairLight" : "hair", new THREE.Vector3(x, y, 0.145), 11);
  }
}

function bindPivots(source) {
  const { document } = source;
  const skin = document.skins[0];
  const matrices = readAccessor(source, skin.inverseBindMatrices);
  const byName = new Map();
  skin.joints.forEach((nodeIndex, jointIndex) => {
    const inverseBind = new THREE.Matrix4().fromArray(matrices[jointIndex]);
    const bind = inverseBind.invert();
    byName.set(document.nodes[nodeIndex].name, new THREE.Vector3().setFromMatrixPosition(bind));
  });
  const pivot = (name) => {
    const value = byName.get(name);
    if (!value) throw new Error(`Missing bind pivot ${name}.`);
    return [value.x, stylizedY(value.y), value.z];
  };
  return {
    torso: [0, 0, 0],
    head: pivot("neck_01"),
    leftUpperArm: pivot("upperarm_l"),
    leftForearm: pivot("lowerarm_l"),
    leftHand: pivot("hand_l"),
    rightUpperArm: pivot("upperarm_r"),
    rightForearm: pivot("lowerarm_r"),
    rightHand: pivot("hand_r"),
    leftThigh: pivot("thigh_l"),
    leftCalf: pivot("calf_l"),
    leftFoot: pivot("foot_l"),
    rightThigh: pivot("thigh_r"),
    rightCalf: pivot("calf_r"),
    rightFoot: pivot("foot_r"),
    equipment: [0, 0, 0],
  };
}

function encode(records, pivots) {
  const sorted = [...records.values()].sort((first, second) =>
    PARTS.indexOf(first.part) - PARTS.indexOf(second.part) ||
    ROLES.indexOf(first.role) - ROLES.indexOf(second.role) ||
    first.gy - second.gy || first.gx - second.gx || first.gz - second.gz,
  );
  const bytes = Buffer.alloc(sorted.length * 8);
  sorted.forEach((record, index) => {
    const offset = index * 8;
    const pivot = pivots[record.part];
    bytes.writeUInt8(PARTS.indexOf(record.part), offset);
    bytes.writeUInt8(ROLES.indexOf(record.role), offset + 1);
    bytes.writeInt16LE(Math.round((record.gx * CELL - pivot[0]) / CELL), offset + 2);
    bytes.writeInt16LE(Math.round((record.gy * CELL - pivot[1]) / CELL), offset + 4);
    bytes.writeInt16LE(Math.round((record.gz * CELL - pivot[2]) / CELL), offset + 6);
  });
  return { sorted, base64: bytes.toString("base64") };
}

const body = await loadDocument(bodyPath);
const hair = await loadDocument(hairPath);
const pivots = bindPivots(body);
const records = new Map();
sampleSkinnedSurface(body, records, null);
sampleSkinnedSurface(hair, records, "hair");
addCoatAndEquipment(records);
addHairSilhouette(records);
addFace(records);
const encoded = encode(records, pivots);
const output = `/**
 * Generated by tools/generate-r05-voxel-avatar.mjs from Quaternius Universal
 * Base Characters (Standard), CC0. The source mesh is used only as anatomical
 * and rig scaffolding; every visible runtime sample is rebuilt as a voxel cell.
 */
export const R05_VOXEL_CELL = ${CELL} as const;
export const R05_VOXEL_PARTS = ${JSON.stringify(PARTS)} as const;
export const R05_VOXEL_ROLES = ${JSON.stringify(ROLES)} as const;
export const R05_VOXEL_PIVOTS = ${JSON.stringify(pivots)} as const;
export const R05_VOXEL_COUNT = ${encoded.sorted.length} as const;
export const R05_VOXEL_DATA_BASE64 = "${encoded.base64}" as const;
`;
await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, output);
console.log(`Generated ${encoded.sorted.length} articulated voxel cells at ${outputPath}`);
