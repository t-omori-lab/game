#!/usr/bin/env python3
"""Compile the F-01 build sheet into the compact runtime surface pack."""

from __future__ import annotations

import argparse
import base64
import hashlib
import json
import math
from pathlib import Path
from typing import Any

from PIL import Image


PART_IDS = (
    "head",
    "torso",
    "left-arm",
    "right-arm",
    "left-leg",
    "right-leg",
    "equipment",
)
COMPILER_VERSION = "fram-f01-surface-pack-v1"


def js_round(value: float) -> int:
    return math.floor(value + 0.5)


def color_distance(first: tuple[int, int, int], second: tuple[int, int, int]) -> float:
    return math.sqrt(sum((first[index] - second[index]) ** 2 for index in range(3)))


def saturation(color: tuple[int, int, int]) -> float:
    maximum = max(color)
    minimum = min(color)
    return 0 if maximum == 0 else (maximum - minimum) / maximum


def sample_pixel(
    pixels: Any,
    image_width: int,
    image_height: int,
    x: float,
    y: float,
) -> tuple[int, int, int]:
    safe_x = min(image_width - 1, max(0, js_round(x)))
    safe_y = min(image_height - 1, max(0, js_round(y)))
    value = pixels[safe_x, safe_y]
    return int(value[0]), int(value[1]), int(value[2])


def average_background(
    pixels: Any,
    image_width: int,
    image_height: int,
    crop: dict[str, int],
) -> tuple[int, int, int]:
    samples = (
        sample_pixel(pixels, image_width, image_height, crop["x"] + 5, crop["y"] + 5),
        sample_pixel(
            pixels,
            image_width,
            image_height,
            crop["x"] + crop["width"] - 5,
            crop["y"] + 5,
        ),
        sample_pixel(
            pixels,
            image_width,
            image_height,
            crop["x"] + 6,
            crop["y"] + crop["height"] * 0.42,
        ),
        sample_pixel(
            pixels,
            image_width,
            image_height,
            crop["x"] + crop["width"] - 6,
            crop["y"] + crop["height"] * 0.42,
        ),
    )
    return tuple(
        js_round(sum(sample[channel] for sample in samples) / len(samples))
        for channel in range(3)
    )


def create_projection(
    pixels: Any,
    image_width: int,
    image_height: int,
    crop: dict[str, int],
    target_width: int,
    target_height: int,
    source: dict[str, Any],
) -> dict[str, Any]:
    background = average_background(pixels, image_width, image_height, crop)
    mask = bytearray(target_width * target_height)
    colors: list[tuple[int, int, int] | None] = [None] * (target_width * target_height)
    threshold = source["segmentation"]["backgroundDistance"]
    radius = source["segmentation"]["sampleRadius"]
    offsets = ((0, 0), (-radius, 0), (radius, 0), (0, -radius), (0, radius))

    for y in range(target_height):
        for x in range(target_width):
            index = y * target_width + x
            image_x = crop["x"] + ((x + 0.5) / target_width) * crop["width"]
            image_y = (
                crop["y"]
                + crop["height"]
                - ((y + 0.5) / target_height) * crop["height"]
            )
            samples = [
                sample_pixel(
                    pixels,
                    image_width,
                    image_height,
                    image_x + offset_x * crop["width"] / target_width,
                    image_y + offset_y * crop["height"] / target_height,
                )
                for offset_x, offset_y in offsets
            ]
            foreground = [
                sample
                for sample in samples
                if color_distance(sample, background) >= threshold
                or (
                    saturation(sample) >= source["segmentation"]["saturationFloor"]
                    and color_distance(sample, background) >= threshold * 0.56
                )
            ]
            if len(foreground) < 2:
                continue
            mask[index] = 1
            colors[index] = tuple(
                js_round(sum(sample[channel] for sample in foreground) / len(foreground))
                for channel in range(3)
            )
    return {"width": target_width, "height": target_height, "mask": mask, "colors": colors}


def projection_mask(projection: dict[str, Any], axis: int, y: int) -> bool:
    return projection["mask"][y * projection["width"] + axis] == 1


def projection_color(
    projection: dict[str, Any], axis: int, y: int
) -> tuple[int, int, int] | None:
    return projection["colors"][y * projection["width"] + axis]


def range_at_y(first: dict[str, Any], second: dict[str, Any], y: int) -> tuple[int, int] | None:
    axes = [
        axis
        for axis in range(first["width"])
        if projection_mask(first, axis, y) or projection_mask(second, axis, y)
    ]
    return None if not axes else (min(axes), max(axes))


def inside_rounded_cross_section(
    x: int,
    z: int,
    x_range: tuple[int, int],
    z_range: tuple[int, int],
) -> bool:
    radius_x = max(1, (x_range[1] - x_range[0] + 1) / 2)
    radius_z = max(1, (z_range[1] - z_range[0] + 1) / 2)
    center_x = (x_range[0] + x_range[1]) / 2
    center_z = (z_range[0] + z_range[1]) / 2
    return ((x - center_x) / radius_x) ** 2 + ((z - center_z) / radius_z) ** 2 <= 1.08


def inside_humanoid_volumes(x: int, y: int, z: int, source: dict[str, Any]) -> bool:
    width = source["grid"]["width"]
    height = source["grid"]["height"]
    depth = source["grid"]["depth"]
    nx = (x - (width - 1) / 2) / width
    ny = y / (height - 1)
    nz = (z - (depth - 1) / 2) / depth
    ax = abs(nx)
    if ny >= source["rig"]["headStart"]:
        return True
    if ny >= 0.42:
        torso = ax <= 0.225 and -0.145 <= nz <= 0.16
        arm = 0.205 < ax <= 0.45 and abs(nz - 0.01) <= 0.105
        pack = ax <= 0.23 and -0.34 <= nz < -0.14
        return torso or arm or pack
    if ny >= 0.28:
        coat_and_hip = ax <= 0.285 and -0.16 <= nz <= 0.17
        arm_or_hand = 0.24 < ax <= 0.44 and abs(nz - 0.02) <= 0.1
        pack_and_textile = ax <= 0.21 and -0.35 <= nz < -0.15
        return coat_and_hip or arm_or_hand or pack_and_textile
    leg_center = -0.115 if nx < 0 else 0.115
    boot = ny <= 0.13
    leg_radius_x = 0.115 if boot else 0.082
    leg_radius_z = 0.17 if boot else 0.115
    leg_z_center = 0.035 if boot else 0
    leg = abs(nx - leg_center) <= leg_radius_x and abs(nz - leg_z_center) <= leg_radius_z
    textile = ny >= 0.12 and ax <= 0.13 and -0.31 <= nz <= -0.13
    return leg or textile


def palette_rgb(entry: dict[str, str]) -> tuple[int, int, int]:
    packed = int(entry["hex"][1:], 16)
    return (packed >> 16) & 255, (packed >> 8) & 255, packed & 255


def nearest_palette(color: tuple[int, int, int], palette: list[dict[str, str]]) -> int:
    return min(range(len(palette)), key=lambda index: color_distance(color, palette_rgb(palette[index])))


def classify_part(x: int, y: int, z: int, palette_id: str, source: dict[str, Any]) -> int:
    width = source["grid"]["width"]
    height = source["grid"]["height"]
    depth = source["grid"]["depth"]
    nx = (x - (width - 1) / 2) / width
    ny = y / (height - 1)
    nz = (z - (depth - 1) / 2) / depth
    if ny >= source["rig"]["headStart"]:
        return PART_IDS.index("head")
    if (
        nz <= source["rig"]["backEquipmentDepth"] and ny >= 0.26
    ) or (palette_id == "coral" and ny <= 0.5):
        return PART_IDS.index("equipment")
    if (
        0.36 <= ny <= source["rig"]["shoulderHeight"]
        and abs(nx) >= source["rig"]["armOuterStart"]
    ):
        return PART_IDS.index("left-arm" if nx < 0 else "right-arm")
    if ny <= source["rig"]["hipHeight"]:
        return PART_IDS.index("left-leg" if nx < 0 else "right-leg")
    return PART_IDS.index("torso")


def build_pack(source: dict[str, Any], image: Image.Image) -> tuple[bytes, int]:
    pixels = image.load()
    width = source["grid"]["width"]
    height = source["grid"]["height"]
    depth = source["grid"]["depth"]
    views = source["views"]
    projections = {
        "front": create_projection(pixels, image.width, image.height, views["front"], width, height, source),
        "back": create_projection(pixels, image.width, image.height, views["back"], width, height, source),
        "left": create_projection(pixels, image.width, image.height, views["left"], depth, height, source),
        "right": create_projection(pixels, image.width, image.height, views["right"], depth, height, source),
    }
    volume = bytearray(width * height * depth)

    def index_of(x: int, y: int, z: int) -> int:
        return y * width * depth + z * width + x

    def occupied(x: int, y: int, z: int) -> bool:
        return 0 <= x < width and 0 <= y < height and 0 <= z < depth and volume[index_of(x, y, z)] == 1

    solid_count = 0
    for y in range(height):
        x_range = range_at_y(projections["front"], projections["back"], y)
        z_range = range_at_y(projections["left"], projections["right"], y)
        if x_range is None or z_range is None:
            continue
        for x in range(x_range[0], x_range[1] + 1):
            if not projection_mask(projections["front"], x, y) and not projection_mask(projections["back"], x, y):
                continue
            for z in range(z_range[0], z_range[1] + 1):
                if (
                    (not projection_mask(projections["left"], z, y) and not projection_mask(projections["right"], z, y))
                    or not inside_rounded_cross_section(x, z, x_range, z_range)
                    or not inside_humanoid_volumes(x, y, z, source)
                ):
                    continue
                volume[index_of(x, y, z)] = 1
                solid_count += 1

    neighbors = ((1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0), (0, 0, 1), (0, 0, -1))
    palette = source["palette"]
    packed = bytearray()
    for y in range(height):
        for z in range(depth):
            for x in range(width):
                if not occupied(x, y, z):
                    continue
                if not any(not occupied(x + dx, y + dy, z + dz) for dx, dy, dz in neighbors):
                    continue
                normalized_y = y / (height - 1)
                candidates = (
                    (not occupied(x, y, z + 1), projection_color(projections["front"], x, y)),
                    (not occupied(x, y, z - 1), projection_color(projections["back"], x, y)),
                    (not occupied(x + 1, y, z), projection_color(projections["right"], z, y)),
                    (not occupied(x - 1, y, z), projection_color(projections["left"], z, y)),
                )
                color = None
                if normalized_y >= source["rig"]["headStart"] and z >= (depth - 1) / 2:
                    color = projection_color(projections["front"], x, y)
                if color is None:
                    color = next((candidate for exposed, candidate in candidates if exposed and candidate is not None), None)
                if color is None:
                    color = next((candidate for _, candidate in candidates if candidate is not None), (166, 168, 154))
                palette_index = nearest_palette(color, palette)
                if not occupied(x, y, z + 1):
                    normalized_x = abs((x - (width - 1) / 2) / width)
                    iris_band = 0.72 <= normalized_y <= 0.805 and 0.045 <= normalized_x <= 0.19
                    cool_dark = (
                        color[1] >= color[0] + 2
                        and color[2] >= color[0] + 2
                        and sum(color) / 3 <= 126
                    )
                    if iris_band and cool_dark:
                        palette_index = next(index for index, entry in enumerate(palette) if entry["id"] == "eye-teal")
                palette_id = palette[palette_index]["id"]
                part_index = classify_part(x, y, z, palette_id, source)
                packed.extend((x, y, z, part_index, palette_index))
    return bytes(packed), solid_count


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=Path("src/characterForge/f01.source.json"))
    parser.add_argument("--build-sheet", type=Path, default=Path("work/character_forge_f01/fram-f01-production-build-sheet.png"))
    parser.add_argument("--output", type=Path, default=Path("src/characterForge/f01.surface-pack.json"))
    parser.add_argument("--preview-output", type=Path, default=Path("public/forge/f01-build-sheet.jpg"))
    args = parser.parse_args()

    source = json.loads(args.source.read_text(encoding="utf-8"))
    image = Image.open(args.build_sheet).convert("RGB")
    packed, solid_count = build_pack(source, image)
    stride = 5
    if len(packed) % stride != 0:
        raise RuntimeError("Packed F-01 cell payload is misaligned.")
    payload = {
        "schemaVersion": 1,
        "compilerVersion": COMPILER_VERSION,
        "sourceId": source["id"],
        "sourceVoxels": solid_count,
        "renderedSurfaceCells": len(packed) // stride,
        "stride": stride,
        "partIds": list(PART_IDS),
        "paletteIds": [entry["id"] for entry in source["palette"]],
        "buildSheetSha256": hashlib.sha256(args.build_sheet.read_bytes()).hexdigest(),
        "payloadSha256": hashlib.sha256(packed).hexdigest(),
        "cellsBase64": base64.b64encode(packed).decode("ascii"),
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    preview = image.copy()
    preview.thumbnail((1152, 648), Image.Resampling.LANCZOS)
    args.preview_output.parent.mkdir(parents=True, exist_ok=True)
    preview.save(args.preview_output, "JPEG", quality=78, optimize=True, progressive=True)
    print(
        json.dumps(
            {
                "sourceVoxels": solid_count,
                "renderedSurfaceCells": len(packed) // stride,
                "payloadBytes": len(packed),
                "payloadSha256": payload["payloadSha256"],
                "preview": str(args.preview_output),
            },
            ensure_ascii=False,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
