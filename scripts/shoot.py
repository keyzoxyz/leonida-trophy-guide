#!/usr/bin/env python3
"""Capture the four screenshots that ship beside the Leonida Trophy Guide.

The app is plain static files, so this script only has to serve app/ over loopback on
127.0.0.1:8099, let headless Chromium open it through Playwright, and save four 1280x1080
PNGs into screenshots/. Every shot gets a fresh browser context, so one shot's ticks never
leak into the next, and every shot is checked for size before the script exits.

Run from anywhere:  python3 scripts/shoot.py
"""

from __future__ import annotations

import contextlib
import http.server
import struct
import threading
from functools import partial
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
APP_DIR = ROOT / "app"
SHOT_DIR = ROOT / "screenshots"
HOST = "127.0.0.1"
PORT = 8099
VIEWPORT = {"width": 1280, "height": 1080}
MIN_BYTES = 40 * 1024
MAX_BYTES = 256 * 1024


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler without the request chatter on stderr."""

    def log_message(self, format, *args):  # noqa: A002 - signature copied from the base class
        pass


@contextlib.contextmanager
def served_app():
    """Serve app/ on loopback for the duration of the block."""
    handler = partial(QuietHandler, directory=str(APP_DIR))
    server = http.server.ThreadingHTTPServer((HOST, PORT), handler)
    worker = threading.Thread(target=server.serve_forever, daemon=True)
    worker.start()
    try:
        yield f"http://{HOST}:{PORT}/index.html"
    finally:
        server.shutdown()
        server.server_close()
        worker.join(timeout=5)


def open_page(browser, url):
    """A clean context per shot: no saved progress, no spoiler flag, no stale scroll."""
    context = browser.new_context(viewport=VIEWPORT, device_scale_factor=1)
    page = context.new_page()
    page.goto(url, wait_until="load")
    page.wait_for_selector(".tcard", state="visible")
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(150)
    return context, page


def settle(page, ms=250):
    """Give the render a beat to paint after a click rebuilds the list."""
    page.wait_for_timeout(ms)


def tighten(path: Path) -> None:
    """Keep a shot under the 256 KiB hand-in cap.

    A flat dark UI survives an adaptive 256-colour palette with no visible damage, and the
    palette keeps text edges that a JPEG re-encode would smear, so quantising is the fallback
    rather than a lossy format change. Most shots land under the cap untouched.
    """
    if path.stat().st_size <= MAX_BYTES:
        return
    from PIL import Image

    with Image.open(path) as image:
        image.load()
        reduced = image.convert("RGB").quantize(
            colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG
        )
        reduced.save(path, format="PNG", optimize=True)


def capture(page, name: str) -> Path:
    target = SHOT_DIR / name
    page.screenshot(path=str(target), type="png", full_page=False)
    tighten(target)
    return target


def shoot_checklist(browser, url):
    """A third of the list ticked, with the earned rows left in frame so the bar reads 18/55."""
    context, page = open_page(browser, url)
    try:
        for _ in range(18):
            page.locator(".tcheck").first.click()
            page.wait_for_timeout(40)
        # "Earned only" hides everything else; clear flags keeps the ticked cards visible.
        page.locator('.flag-chip[data-flag="clear"]').click()
        page.evaluate("window.scrollTo(0, 0)")
        settle(page)
        return capture(page, "1-checklist.png")
    finally:
        context.close()


def shoot_guide(browser, url):
    """A missable side-strand trophy with its guide, steps and sources open on the sheet."""
    context, page = open_page(browser, url)
    try:
        page.locator('.tcard[data-id="20"] .tname').click()
        page.wait_for_selector("#detailSheet:not([hidden])")
        page.wait_for_selector(".dsteps li")
        page.wait_for_selector(".dsources span")
        settle(page)
        return capture(page, "2-guide.png")
    finally:
        context.close()


def shoot_roadmap(browser, url):
    """Missable-only filter on: the callout, the stages and the short list of traps."""
    context, page = open_page(browser, url)
    try:
        page.locator('.flag-chip[data-flag="missable"]').click()
        page.evaluate("window.scrollTo(0, 0)")
        settle(page)
        return capture(page, "3-roadmap.png")
    finally:
        context.close()


def shoot_spoiler(browser, url):
    """Spoiler-safe mode with the Story filter: names and guides withheld until earned."""
    context, page = open_page(browser, url)
    try:
        page.locator("#spoilerBtn").click()
        page.locator('.kind-chip[data-kind="story"]').click()
        page.evaluate("window.scrollTo(0, 0)")
        settle(page)
        return capture(page, "4-spoiler.png")
    finally:
        context.close()


def png_size(path: Path):
    """Width and height straight out of the IHDR chunk, no image library needed."""
    with path.open("rb") as handle:
        header = handle.read(24)
    if header[:8] != b"\x89PNG\r\n\x1a\n":
        raise SystemExit(f"{path} is not a PNG")
    return struct.unpack(">II", header[16:24])


def main():
    SHOT_DIR.mkdir(parents=True, exist_ok=True)

    with served_app() as url, sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        try:
            written = [
                shoot_checklist(browser, url),
                shoot_guide(browser, url),
                shoot_roadmap(browser, url),
                shoot_spoiler(browser, url),
            ]
        finally:
            browser.close()

    for path in written:
        width, height = png_size(path)
        size = path.stat().st_size
        print(f"{path.name}\t{width}x{height}\t{size} bytes")
        if (width, height) != (VIEWPORT["width"], VIEWPORT["height"]):
            raise SystemExit(f"{path.name}: expected 1280x1080, got {width}x{height}")
        if not MIN_BYTES <= size <= MAX_BYTES:
            raise SystemExit(f"{path.name}: {size} bytes outside the 40-256 KiB hand-in window")


if __name__ == "__main__":
    main()