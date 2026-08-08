#!/usr/bin/env python3
"""Compile F-01R semantic source data into a module-indexed runtime surface pack."""

from __future__ import annotations

import argparse
import base64
import hashlib
import json
import math
from pathlib import Path
from typing import Any


COMPILER_VERSION = "fram-f01r-semantic-pack-v1"
PART_IDS = (
    "head",
    "torso",
    "left-arm",
    "right-arm",
    "left-leg",
    "right-leg",
    "equipment",
)
NEIGHBORS = ((1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0), (0, 0, 1), (0, 0, -1))


def canonical_json(value: Any) -> bytes:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")


def inside_ellipsoid(
    point: tuple[int, int, int],
    center: list[float],
    radii: list[float],
    tolerance: float = 1.0,
) -> bool:
    return sum(
        ((point[index] - center[index]) / radii[index]) ** 2
        for index in range(3)
    ) <= tolerance


def decode_base_pack(pack: dict[str, Any]) -> list[tuple[int, int, int, str, str]]:
    payload = base64.b64decode(pack["cellsBase64"])
    stride = pack["stride"]
    if stride != 5 or len(payload) % stride != 0:
        raise ValueError("F-01R body base must be a valid F-01 schema-v1 pack.")
    cells: list[tuple[int, int, int, str, str]] = []
    for offset in range(0, len(payload), stride):
        x, y, z, part_index, palette_index = payload[offset : offset + stride]
        cells.append(
            (
                x,
                y,
                z,
                pack["partIds"][part_index],
                pack["paletteIds"][palette_index],
            )
        )
    return cells


def head_palette(
    coordinate: tuple[int, int, int],
    module: str,
    center: list[float],
) -> str:
    x, y, z = coordinate
    if module == "head-core":
        return "skin-shadow" if abs(x - center[0]) >= 8 or y <= 64 else "skin"
    if y <= 64 or z <= center[2] - 5:
        return "hair-shadow"
    if z <= center[2] - 1 or abs(x - center[0]) >= 11:
        return "sage-gray"
    if (x + y + z) % 7 in (0, 1):
        return "warm-gray"
    return "ivory"


def build_semantic_head(source: dict[str, Any]) -> tuple[dict[tuple[int, int, int], tuple[str, str]], int]:
    modules = source["modules"]
    core = modules["head-core"]
    shell = modules["hair-shell"]
    width = source["grid"]["width"]
    height = source["grid"]["height"]
    depth = source["grid"]["depth"]
    occupied: dict[tuple[int, int, int], tuple[str, str]] = {}

    for y in range(height):
        for z in range(depth):
            for x in range(width):
                point = (x, y, z)
                if inside_ellipsoid(point, core["center"], core["radii"]):
                    occupied[point] = ("head-core", "skin")

    aperture = shell["faceAperture"]
    for y in range(height):
        for z in range(depth):
            for x in range(width):
                point = (x, y, z)
                if not inside_ellipsoid(point, shell["center"], shell["radii"]):
                    continue
                in_face_aperture = (
                    abs(x - shell["center"][0]) <= aperture["xRadius"]
                    and aperture["yMin"] <= y <= aperture["yMax"]
                    and z >= aperture["zMin"]
                )
                if in_face_aperture:
                    continue
                occupied[point] = ("hair-shell", "ivory")

    def add_volume(
        coordinate: tuple[int, int, int],
        module: str,
        palette: str = "ivory",
    ) -> None:
        x, y, z = coordinate
        if 0 <= x < width and 0 <= y < 256 and 0 <= z < depth:
            occupied[coordinate] = (module, palette)

    center_x = int(round(shell["center"][0]))
    fringe = modules["hair-fringe"]
    for strand in fringe["strands"]:
        for step in range(strand["length"]):
            progress = step / max(1, strand["length"] - 1)
            strand_x = center_x + strand["x"] + round(strand["lean"] * progress)
            strand_y = strand["topY"] - step
            for offset_x in range(-(strand["width"] // 2), strand["width"] - strand["width"] // 2):
                for offset_z in range(2):
                    add_volume(
                        (strand_x + offset_x, strand_y, fringe["frontZ"] + offset_z),
                        "hair-fringe",
                        "ivory" if step < strand["length"] * 0.68 else "warm-gray",
                    )

    for module_id in ("hair-side-lock-left", "hair-side-lock-right"):
        lock = modules[module_id]
        anchor_x = center_x + lock["anchor"][0]
        for step in range(lock["length"]):
            progress = step / max(1, lock["length"] - 1)
            outward = round(lock["outward"] * math.sin(progress * math.pi))
            direction = -1 if "left" in module_id else 1
            lock_x = anchor_x + direction * outward
            lock_y = lock["anchor"][1] - step
            lock_z = lock["anchor"][2] + round(progress * 1.5)
            for offset_x in range(-(lock["width"] // 2), lock["width"] - lock["width"] // 2):
                add_volume(
                    (lock_x + offset_x, lock_y, lock_z),
                    module_id,
                    "warm-gray" if step >= lock["length"] * 0.65 else "ivory",
                )

    for point in modules["hair-cowlick"]["points"]:
        for offset_x in (-1, 0, 1):
            add_volume(
                (center_x + point[0] + offset_x, point[1], point[2]),
                "hair-cowlick",
            )

    for path in modules["hair-lock-ridges"]["paths"]:
        for point_index, point in enumerate(path):
            next_point = path[min(point_index + 1, len(path) - 1)]
            steps = max(
                1,
                abs(next_point[0] - point[0]),
                abs(next_point[1] - point[1]),
                abs(next_point[2] - point[2]),
            )
            for step in range(steps + 1):
                amount = step / steps
                ridge_x = center_x + round(point[0] + (next_point[0] - point[0]) * amount)
                ridge_y = round(point[1] + (next_point[1] - point[1]) * amount)
                ridge_z = round(point[2] + (next_point[2] - point[2]) * amount)
                add_volume(
                    (ridge_x, ridge_y, ridge_z),
                    "hair-lock-ridges",
                    "warm-gray" if point_index >= len(path) - 2 else "ivory",
                )
                add_volume(
                    (ridge_x + (1 if point[0] >= 0 else -1), ridge_y, ridge_z),
                    "hair-lock-ridges",
                    "ivory",
                )

    surface: dict[tuple[int, int, int], tuple[str, str]] = {}
    for coordinate, (module, palette) in occupied.items():
        if not any(
            (coordinate[0] + dx, coordinate[1] + dy, coordinate[2] + dz) not in occupied
            for dx, dy, dz in NEIGHBORS
        ):
            continue
        resolved_module = module
        if (
            module == "head-core"
            and coordinate[2] >= core["center"][2]
            and 62 <= coordinate[1] <= 80
        ):
            resolved_module = "face-skin"
        surface[coordinate] = (
            resolved_module,
            head_palette(coordinate, module, shell["center"]),
        )

    def front_z(x: int, y: int) -> int:
        candidates = [
            z
            for (cell_x, cell_y, z), (module, _palette) in occupied.items()
            if cell_x == x and cell_y == y and module == "head-core"
        ]
        if not candidates:
            return int(round(core["center"][2] + core["radii"][2]))
        return max(candidates)

    def feature_cell(x: int, y: int, module: str, palette: str, depth_offset: int = 1) -> None:
        coordinate = (x, y, front_z(x, y) + depth_offset)
        surface[coordinate] = (module, palette)

    face = modules["face"]
    eye_centers = {
        "eye-left": source["landmarks"]["leftEye"],
        "eye-right": source["landmarks"]["rightEye"],
    }
    for module, landmark in eye_centers.items():
        eye_width, eye_height = face["eyeSize"]
        x_start = round(landmark[0] - (eye_width - 1) / 2)
        y_start = round(landmark[1] - (eye_height - 1) / 2)
        for y in range(y_start, y_start + eye_height):
            for x in range(x_start, x_start + eye_width):
                feature_cell(x, y, module, "near-black", face["featureDepth"])
        iris_width, iris_height = face["irisSize"]
        iris_x_start = round(landmark[0] - (iris_width - 1) / 2)
        iris_y_start = y_start + 1
        for y in range(iris_y_start, iris_y_start + iris_height):
            for x in range(iris_x_start, iris_x_start + iris_width):
                feature_cell(x, y, module, "eye-teal", face["featureDepth"] + 1)
        feature_cell(
            iris_x_start,
            iris_y_start + iris_height - 1,
            module,
            "eye-highlight",
            face["featureDepth"] + 2,
        )
        lid_y = y_start + eye_height
        for x in range(round(landmark[0] - 2), round(landmark[0] + 3)):
            feature_cell(x, lid_y, module, "near-black", face["featureDepth"] + 1)

    mouth = source["landmarks"]["mouth"]
    for x in range(round(mouth[0] - 0.5), round(mouth[0] + 1.5)):
        feature_cell(x, mouth[1], "mouth", "near-black", face["featureDepth"])

    for cheek_name in ("leftCheek", "rightCheek"):
        cheek = source["landmarks"][cheek_name]
        for x in (cheek[0], cheek[0] + (1 if cheek_name == "leftCheek" else -1)):
            feature_cell(x, cheek[1], "blush", "blush", face["featureDepth"])

    clip_x = center_x + 10
    for y in range(74, 78):
        for x in range(clip_x, clip_x + 2):
            z = max(
                [
                    cell_z
                    for (cell_x, cell_y, cell_z) in occupied
                    if cell_x == x and cell_y == y
                ]
                or [int(round(shell["center"][2] + shell["radii"][2]))]
            )
            surface[(x, y, z + 1)] = ("hair-clip", "cyan")

    return surface, len(occupied)


def build_pack(source: dict[str, Any], base_pack: dict[str, Any]) -> dict[str, Any]:
    palette_ids = [entry["id"] for entry in source["palette"]]
    module_ids = source["moduleOrder"]
    part_index = {part_id: index for index, part_id in enumerate(PART_IDS)}
    palette_index = {palette_id: index for index, palette_id in enumerate(palette_ids)}
    module_index = {module_id: index for index, module_id in enumerate(module_ids)}
    body_module = {
        "torso": "body-torso",
        "left-arm": "body-left-arm",
        "right-arm": "body-right-arm",
        "left-leg": "body-left-leg",
        "right-leg": "body-right-leg",
        "equipment": "body-equipment",
    }

    packed_cell_map: dict[tuple[int, int, int], tuple[int, int, int, str, str, str]] = {}
    for x, y, z, part, palette in decode_base_pack(base_pack):
        if part == "head":
            continue
        packed_cell_map[(x, y, z)] = (x, y, z, part, palette, body_module[part])

    collar = source["modules"]["neck-collar"]
    collar_volume = {
        (x, y, z)
        for y in range(source["grid"]["height"])
        for z in range(source["grid"]["depth"])
        for x in range(source["grid"]["width"])
        if inside_ellipsoid((x, y, z), collar["center"], collar["radii"])
    }
    for coordinate in collar_volume:
        if any(
            (coordinate[0] + dx, coordinate[1] + dy, coordinate[2] + dz) not in collar_volume
            for dx, dy, dz in NEIGHBORS
        ):
            x, y, z = coordinate
            packed_cell_map[coordinate] = (x, y, z, "torso", "near-black", "neck-collar")

    head_surface, head_source_cells = build_semantic_head(source)
    for (x, y, z), (module, palette) in head_surface.items():
        packed_cell_map[(x, y, z)] = (x, y, z, "head", palette, module)
    packed_cells = list(packed_cell_map.values())
    packed_cells.sort(key=lambda cell: (cell[1], cell[2], cell[0], cell[5], cell[4]))

    packed = bytearray()
    module_counts = {module_id: 0 for module_id in module_ids}
    for x, y, z, part, palette, module in packed_cells:
        if not all(0 <= value <= 255 for value in (x, y, z)):
            raise ValueError(f"F-01R cell is outside byte range: {(x, y, z)}")
        packed.extend(
            (
                x,
                y,
                z,
                part_index[part],
                palette_index[palette],
                module_index[module],
            )
        )
        module_counts[module] += 1

    return {
        "schemaVersion": 2,
        "compilerVersion": COMPILER_VERSION,
        "sourceId": source["id"],
        "sourceVoxels": len([cell for cell in packed_cells if cell[3] != "head"]) + head_source_cells,
        "renderedSurfaceCells": len(packed_cells),
        "stride": 6,
        "partIds": list(PART_IDS),
        "paletteIds": palette_ids,
        "moduleIds": module_ids,
        "moduleSurfaceCells": module_counts,
        "sourceSha256": hashlib.sha256(canonical_json(source)).hexdigest(),
        "bodyBasePayloadSha256": base_pack["payloadSha256"],
        "payloadSha256": hashlib.sha256(packed).hexdigest(),
        "cellsBase64": base64.b64encode(packed).decode("ascii"),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=Path("src/characterForge/f01r.source.json"))
    parser.add_argument("--base-pack", type=Path, default=Path("src/characterForge/f01.surface-pack.json"))
    parser.add_argument("--output", type=Path, default=Path("src/characterForge/f01r.surface-pack.json"))
    args = parser.parse_args()
    source = json.loads(args.source.read_text(encoding="utf-8"))
    base_pack = json.loads(args.base_pack.read_text(encoding="utf-8"))
    payload = build_pack(source, base_pack)
    args.output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {
                "sourceId": payload["sourceId"],
                "renderedSurfaceCells": payload["renderedSurfaceCells"],
                "modules": payload["moduleSurfaceCells"],
                "sourceSha256": payload["sourceSha256"],
                "payloadSha256": payload["payloadSha256"],
            },
            ensure_ascii=False,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
