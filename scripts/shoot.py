#!/usr/bin/env python3
"""Capture the four screenshots that ship with the Leonida Ledger trophy guide.

The page is static, so this only has to: serve app/ over loopback on
127.0.0.1:8099, drive headless Chromium through Playwright's sync API, and write
four 1280x1080 PNGs into screenshots/. Every shot gets a fresh browser context,
so progress seeded for the checklist never leaks into the other three.

    python3 scripts/shoot.py

The quartet:
    1-checklist.png   about a third of the trophies marked earned
    2-guide.png       a missable trophy's detail sheet, steps and sources visible
    3-roadmap.png     the missable-only filter engaged
    4-spoiler.png     spoiler-safe view (spoilers off) with the story filter on

Each PNG must stay under 256 KiB for the bounty gate; oversized frames are
palette-quantised to 256 colours (and further down only if still over budget).
Every file written has its final byte size printed.
"""

from __future__ import annotations

import contextlib
import http.server
import json
import threading
from functools import partial
from pathlib import Path

from PIL import Image
from playwright.sync_api import Page, ViewportSize, sync_playwright

ROOT = Path(__file__).resolve().parent.parent
APP_DIR = ROOT / "app"
SHOT_DIR = ROOT / "screenshots"
HOST = "127.0.0.1"
PORT = 8099
URL = f"http://{HOST}:{PORT}/index.html"
VIEWPORT: ViewportSize = {"width": 1280, "height": 1080}
STORAGE_KEY = "leonida-ledger.progress.v1"
MAX_BYTES = 256 * 1024
# Quantise a little before the hard gate so the saved file clears it comfortably.
QUANTISE_AT = int(MAX_BYTES * 0.97)

# 18 of 55 trophies: the opening story block plus the activities that unlock
# alongside it. Roughly a third of the list, and a believable playthrough state.
EARNED_IDS = list(range(2, 20))

# A missable side trophy, so its sheet can show steps and sources without the
# story-spoiler mask (story trophies stay masked while spoiler mode is off).
GUIDE_TROPHY_ID = 20
GUIDE_TROPHY_NAME = "Baited My Tackle"


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler with the per-request stderr noise removed."""

    def log_message(self, format, *args):  # noqa: A002 - base signature
        pass


@contextlib.contextmanager
def served_app():
    """Serve app/ on 127.0.0.1:8099 for the duration of the block."""
    handler = partial(QuietHandler, directory=str(APP_DIR))
    try:
        server = http.server.ThreadingHTTPServer((HOST, PORT), handler)
    except OSError as exc:
        raise SystemExit(f"cannot serve app/ on {HOST}:{PORT}: {exc}") from exc
    server.daemon_threads = True
    worker = threading.Thread(target=server.serve_forever, daemon=True)
    worker.start()
    try:
        yield
    finally:
        server.shutdown()
        server.server_close()
        worker.join(timeout=5)


def wait_ready(page: Page) -> None:
    """Wait until app.js has rendered the trophy list."""
    try:
        page.wait_for_function(
            "() => document.querySelectorAll('.trophy-card').length > 0",
            timeout=20_000,
        )
        page.wait_for_function(
            "() => document.getElementById('trophy-list')?.getAttribute('aria-busy') === 'false'",
            timeout=20_000,
        )
    except Exception as exc:  # Playwright's TimeoutError, kept dependency-free
        raise RuntimeError(
            "app.js never rendered the trophy list; check the browser console for script errors"
        ) from exc
    page.evaluate("() => document.fonts.ready")


def open_page(context) -> Page:
    page = context.new_page()
    page.goto(URL, wait_until="load")
    wait_ready(page)
    return page


def seed_progress(page: Page, earned_ids: list[int]) -> None:
    """Write progress into localStorage, then reload so the app boots with it."""
    page.evaluate(
        "([key, value]) => localStorage.setItem(key, value)",
        [STORAGE_KEY, json.dumps({"earned": sorted(earned_ids)})],
    )
    page.reload(wait_until="load")
    wait_ready(page)


def quantise(path: Path) -> None:
    """Palette-quantise an over-budget PNG until it clears the gate."""
    with Image.open(path) as image:
        rgb = image.convert("RGB")
        colours = 256
        while colours >= 16:
            palette = rgb.quantize(
                colors=colours,
                method=Image.Quantize.MEDIANCUT,
                dither=Image.Dither.FLOYDSTEINBERG,
            )
            palette.save(path, format="PNG", optimize=True)
            if path.stat().st_size < QUANTISE_AT:
                print(f"  quantised {path.name} to {colours} colours")
                return
            colours //= 2
    raise RuntimeError(f"{path.name} still exceeds the {MAX_BYTES}-byte budget")


def save_shot(page: Page, name: str) -> Path:
    """Capture the 1280x1080 viewport as a PNG, then report its final size."""
    path = SHOT_DIR / name
    page.screenshot(
        path=str(path),
        type="png",
        animations="disabled",
        caret="hide",
    )
    size = path.stat().st_size
    if size >= QUANTISE_AT:
        quantise(path)
        size = path.stat().st_size
        if size >= MAX_BYTES:
            raise RuntimeError(f"{path.name} is {size} bytes, over the {MAX_BYTES}-byte gate")
    with Image.open(path) as image:
        width, height = image.size
    if (width, height) != (VIEWPORT["width"], VIEWPORT["height"]):
        raise RuntimeError(f"{path.name} is {width}x{height}, expected 1280x1080")
    print(f"{path} — {size} bytes ({width}x{height})")
    return path


def main() -> None:
    SHOT_DIR.mkdir(parents=True, exist_ok=True)

    with served_app(), sync_playwright() as play:
        browser = play.chromium.launch(headless=True)
        try:
            # 1 — checklist: 18 of 55 earned, progress card and cards in view.
            with browser.new_context(viewport=VIEWPORT, device_scale_factor=1) as context:
                page = open_page(context)
                seed_progress(page, EARNED_IDS)
                earned = page.locator(".trophy-card.is-earned").count()
                total = page.locator(".trophy-card").count()
                print(f"  checklist: {earned} of {total} trophies marked earned")
                page.evaluate("() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })")
                save_shot(page, "1-checklist.png")

            # 2 — guide: a missable trophy's sheet, open on steps and sources.
            with browser.new_context(viewport=VIEWPORT, device_scale_factor=1) as context:
                page = open_page(context)
                page.locator(f'.trophy-card[data-id="{GUIDE_TROPHY_ID}"]').click()
                page.wait_for_selector("#detail-sheet[open]", state="visible")
                page.wait_for_selector("#detail-steps section.detail-block", state="visible")
                detail = page.inner_text("#detail-content")
                for heading in ("Steps", "Sources"):
                    if heading not in detail:
                        raise RuntimeError(f"detail sheet for {GUIDE_TROPHY_NAME} has no {heading} block")
                page.wait_for_timeout(350)  # let the sheet-in animation settle
                save_shot(page, "2-guide.png")

            # 3 — roadmap: the missable-only filter engaged.
            with browser.new_context(viewport=VIEWPORT, device_scale_factor=1) as context:
                page = open_page(context)
                page.locator('#show-chips [data-show="missable"]').click()
                page.wait_for_selector(".trophy-card .trophy-flag", state="visible")
                page.wait_for_timeout(150)
                count = page.locator(".trophy-card").count()
                print(f"  missable filter: {count} trophies listed")
                page.evaluate("() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })")
                save_shot(page, "3-roadmap.png")

            # 4 — spoiler: story filter on, spoiler mode off, names masked.
            with browser.new_context(viewport=VIEWPORT, device_scale_factor=1) as context:
                page = open_page(context)
                toggle = page.locator("#spoiler-toggle")
                if toggle.is_checked():
                    toggle.uncheck()
                page.locator('#kind-chips [data-kind="story"]').click()
                page.wait_for_selector(".trophy-card.is-masked", state="visible")
                masked = page.locator(".trophy-card.is-masked").count()
                print(f"  spoiler-safe story view: {masked} masked trophies")
                page.evaluate("() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })")
                save_shot(page, "4-spoiler.png")
        finally:
            browser.close()

    print(f"screenshots written to {SHOT_DIR}")


if __name__ == "__main__":
    main()