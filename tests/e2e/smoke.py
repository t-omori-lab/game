#!/usr/bin/env python3
"""Mobile-landscape startup smoke test for an already-running game server."""

from __future__ import annotations

import os
import sys
from pathlib import Path
from typing import TYPE_CHECKING
from urllib.parse import urlparse

if TYPE_CHECKING:
    from playwright.sync_api import ConsoleMessage, Page, Playwright

try:
    from playwright.sync_api import sync_playwright
except ModuleNotFoundError as import_error:
    PLAYWRIGHT_IMPORT_ERROR: ModuleNotFoundError | None = import_error
else:
    PLAYWRIGHT_IMPORT_ERROR = None


VIEWPORT_WIDTH = 874
VIEWPORT_HEIGHT = 402
DEFAULT_URL = "http://127.0.0.1:4173"
DEFAULT_SCREENSHOT = "/tmp/game-smoke.png"


def main() -> int:
    target_url = os.environ.get("GAME_SMOKE_URL", DEFAULT_URL)
    screenshot_path = Path(
        os.environ.get("GAME_SMOKE_SCREENSHOT", DEFAULT_SCREENSHOT)
    ).expanduser()

    if not is_http_url(target_url):
        print("GAME_SMOKE_URL must be an http or https URL.", file=sys.stderr)
        return 2

    if PLAYWRIGHT_IMPORT_ERROR is not None:
        print(
            "Python Playwright is required to run this smoke test "
            "(python3 -m pip install playwright; playwright install chromium).",
            file=sys.stderr,
        )
        return 2

    screenshot_path.parent.mkdir(parents=True, exist_ok=True)

    try:
        with sync_playwright() as playwright:
            run_smoke(playwright, target_url, screenshot_path)
    except Exception as error:
        print(f"Smoke test failed: {error}", file=sys.stderr)
        return 1

    print(f"Smoke test passed. Screenshot: {screenshot_path}")
    return 0


def run_smoke(
    playwright: Playwright,
    target_url: str,
    screenshot_path: Path,
) -> None:
    browser = playwright.chromium.launch()
    context = browser.new_context(
        viewport={"width": VIEWPORT_WIDTH, "height": VIEWPORT_HEIGHT},
        screen={"width": VIEWPORT_WIDTH, "height": VIEWPORT_HEIGHT},
        device_scale_factor=3,
        has_touch=True,
        is_mobile=True,
        locale="ja-JP",
        color_scheme="dark",
    )
    page = context.new_page()
    console_errors: list[str] = []
    page_errors: list[str] = []

    page.on("console", lambda message: record_console_error(message, console_errors))
    page.on("pageerror", lambda error: page_errors.append(str(error)))

    try:
        response = page.goto(
            target_url,
            wait_until="domcontentloaded",
            timeout=30_000,
        )

        if response is None or not response.ok:
            status = "no response" if response is None else str(response.status)
            raise AssertionError(f"Startup request failed ({status}).")

        assert_mobile_landscape(page)
        assert_startup_controls(page)
        page.wait_for_timeout(750)
        page.screenshot(path=str(screenshot_path), full_page=True)

        errors = [*console_errors, *page_errors]
        if errors:
            details = "\n".join(f"- {message}" for message in errors)
            raise AssertionError(f"Browser errors were reported:\n{details}")
    finally:
        context.close()
        browser.close()


def assert_mobile_landscape(page: Page) -> None:
    dimensions = page.evaluate(
        """() => ({
            width: window.innerWidth,
            height: window.innerHeight,
            coarsePointer: window.matchMedia("(pointer: coarse)").matches
        })"""
    )

    if dimensions["width"] != VIEWPORT_WIDTH or dimensions["height"] != VIEWPORT_HEIGHT:
        raise AssertionError(f"Unexpected viewport dimensions: {dimensions}")
    if dimensions["width"] <= dimensions["height"]:
        raise AssertionError("The smoke viewport is not landscape.")
    if not dimensions["coarsePointer"]:
        raise AssertionError("The smoke context does not expose touch-like input.")


def assert_startup_controls(page: Page) -> None:
    stage = page.locator('[data-testid="game-stage"]')
    canvas = page.locator('canvas[data-testid="game-canvas"]')
    status = page.locator('[data-testid="game-status"]')
    orientation_notice = page.locator('[data-testid="orientation-notice"]')

    stage.wait_for(state="visible", timeout=15_000)
    canvas.wait_for(state="visible", timeout=15_000)

    if status.count() != 1:
        raise AssertionError("Accessible game status is missing.")
    if orientation_notice.count() != 1:
        raise AssertionError("Orientation notice is missing.")
    if orientation_notice.is_visible():
        raise AssertionError("Landscape startup is incorrectly blocked by orientation UI.")

    canvas_box = canvas.bounding_box()
    if canvas_box is None:
        raise AssertionError("Game canvas has no visible bounds.")
    if canvas_box["width"] < 640 or canvas_box["height"] < 350:
        raise AssertionError(f"Game canvas is too small for key controls: {canvas_box}")

    accessible_name = canvas.get_attribute("aria-label") or ""
    if "ゲーム画面" not in accessible_name:
        raise AssertionError("Game canvas has no descriptive accessible label.")

    status_text = status.inner_text().strip()
    if "開始待ち" not in status_text or "開始札" not in status_text:
        raise AssertionError(
            f"Game status does not describe the visible start control: {status_text!r}"
        )

    # The primary start control is rendered inside Phaser's canvas near (480, 414)
    # in the 960x540 logical scene. Clicking by normalized position keeps the smoke
    # check independent from the CSS scaling used on the reference phone.
    canvas.click(position={
        "x": canvas_box["width"] * 0.5,
        "y": canvas_box["height"] * (414 / 540),
    })
    page.wait_for_function(
        """() => {
            const status = document.querySelector('[data-testid="game-status"]');
            return status?.textContent?.includes("遠征中") === true;
        }""",
        timeout=5_000,
    )
    active_status = status.inner_text().strip()
    if "移動" not in active_status or "脈動スキル" not in active_status:
        raise AssertionError(
            f"Game status does not describe the visible action controls: {active_status!r}"
        )


def record_console_error(
    message: ConsoleMessage,
    errors: list[str],
) -> None:
    if message.type == "error":
        errors.append(message.text)


def is_http_url(value: str) -> bool:
    parsed = urlparse(value)
    return (
        parsed.scheme in {"http", "https"}
        and bool(parsed.netloc)
        and parsed.username is None
        and parsed.password is None
    )


if __name__ == "__main__":
    raise SystemExit(main())
