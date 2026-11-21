#!/usr/bin/env python3
"""Capture the four screenshots that ship with the Leonida Trophy Guide.

The app is static files, so this only has to: serve app/ over loopback on 127.0.0.1:8099, open it in
headless Chromium through Playwright, and capture four 1280x1080 PNGs into screenshots/. Every shot
gets a fresh browser context, so one shot's localStorage progress never leaks into the next.

    python3 scripts/shoot.py

The quartet:
    1-checklist.png   a clean run with about a third of the trophies marked earned
    2-guide.png       a missable trophy's detail sheet, steps and sources visible
    3-roadmap.png     the missable-only filter engaged
    4-spoiler.png     spoiler-safe mode with the story filter engaged

Each PNG must stay under 256 KiB for the bounty gate; larger frames are quantised to a palette before
saving.
"""

from __future__ import annotations

import contextlib
import http.server
import json
import threading
from functools import partial
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
APP_DIR = ROOT / "app"
SHOT_DIR = ROOT / "screenshots"
HOST = "127.0.0.1"
PORT = 8099
URL = f"http://{HOST}:{PORT}/index.html"
VIEWPORT = {"width": 1280, "height": 1080}
STORAGE_KEY = "leonida-trophy-guide:v1"
MAX_BYTES = 256 * 1024
QUANTISE_AT = int(MAX_BYTES * 0.97)  # stay under the gate with headroom


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler with the per-request stderr noise removed."""

    def log_message(self, format, *args):  # noqa: A002 — base signature
        pass


@contextlib.contextmanager
def served_app():
    """Serve app/ on the loopback address for the duration of the block."""
    handler = partial(QuietHandler, directory=str(APP_DIR))
    server = http.server.ThreadingHTTPServer((HOST, PORT), handler)
    worker = threading.Thread(target=server.serve_forever, daemon=True)
    worker.start()
    try:
        yield
    finally:
        server.shutdown()
        server.server_close()
        worker.join(timeout=5)


def set_progress(page, earned_ids, spoiler_safe=True):
    """Seed localStorage, then reload so the app boots with the given state."""
    payload = {
        "game": "Grand Theft Auto VI",
        "platform": "PlayStation 5",
        "verifiedAt": "2026-11-21",
        "earned": sorted(earned_ids),
        "spoilerSafe": spoiler_safe,
    }
    page.evaluate(
        "([key, value]) => { localStorage.setItem(key, value); }",
        [STORAGE_KEY, json.dumps(payload)],
    )
    page.reload(wait_until="load")
    page.wait_for_selector(".tcard", state="visible")


def quantise(path: Path) -> None:
    """Shrink an over-budget PNG by palette-quantising it, colours capped downward as needed."""
    with Image.open(path) as im:
        rgb = im.convert("RGB")
        colors = 256
        while colors >= 16:
            pal = rgb.quantize(colors=colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
            pal.save(path, format="PNG", optimize=True)
            if path.stat().st_size < QUANTISE_AT:
                print(f"  {path.name}: quantised to {colors} colours -> {path.stat().st_size} bytes")
                return
            colors //= 2
        raise RuntimeError(f"{path.name} still exceeds budget after quantising")


def save_shot(page, name, browser):
    """Capture the viewport as a PNG; quantise if the gate would reject it."""
    path = SHOT_DIR / name
    page.screenshot(path=str(path), type="png")
    size = path.stat().st_size
    if size > QUANTISE_AT:
        print(f"  {name}: {size} bytes over budget, quantising")
        quantise(path)
    else:
        print(f"  {name}: {size} bytes")
    return path


def main() -> None:
    SHOT_DIR.mkdir(parents=True, exist_ok=True)
    with served_app(), sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1 — checklist: the early-story block earned, about a third of the list.
        with browser.new_context(viewport=VIEWPORT, device_scale_factor=1) as ctx:
            page = ctx.new_page()
            page.goto(URL, wait_until="load")
            set_progress(page, list(range(2, 20)))  # eighteen trophies: chapters + first activities
            save_shot(page, "1-checklist.png", browser)

        # 2 — guide: Baited My Tackle, a missable strand, with its sheet open.
        with browser.new_context(viewport=VIEWPORT, device_scale_factor=1) as ctx:
            page = ctx.new_page()
            page.goto(URL, wait_until="load")
            page.wait_for_selector(".tcard", state="visible")
            page.click('[data-open="20"]')
            page.wait_for_selector("#sheet .panel", state="visible")
            save_shot(page, "2-guide.png", browser)

        # 3 — roadmap: missable-only filter engaged.
        with browser.new_context(viewport=VIEWPORT, device_scale_factor=1) as ctx:
            page = ctx.new_page()
            page.goto(URL, wait_until="load")
            page.wait_for_selector(".tcard", state="visible")
            page.click('#show-bar [data-show="missable"]')
            page.wait_for_selector('.tcard .miss-flag', state="visible")
            save_shot(page, "3-roadmap.png", browser)

        # 4 — spoiler: spoiler-safe ON (default) with the story filter engaged.
        with browser.new_context(viewport=VIEWPORT, device_scale_factor=1) as ctx:
            page = ctx.new_page()
            page.goto(URL, wait_until="load")
            page.wait_for_selector(".tcard", state="visible")
            page.click('#kind-bar [data-kind="story"]')
            page.wait_for_selector(".tcard.is-masked", state="visible")
            save_shot(page, "4-spoiler.png", browser)

        browser.close()
    print(f"screenshots written to {SHOT_DIR}")


if __name__ == "__main__":
    main()
