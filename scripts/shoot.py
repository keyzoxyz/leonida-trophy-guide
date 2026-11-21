#!/usr/bin/env python3
"""Capture the four guide screenshots with Playwright and a local static server.

Serves app/ on 127.0.0.1:8099 in a background thread, then drives headless
Chromium at 1280x1080 and writes four PNGs into screenshots/. Any shot over
256 KiB is re-saved quantised to at most 256 colours.
"""

from __future__ import annotations

import http.server
import socket
import threading
from functools import partial
from pathlib import Path

from PIL import Image
from playwright.sync_api import BrowserContext, Page, sync_playwright

ROOT = Path(__file__).resolve().parent.parent
APP_DIR = ROOT / "app"
OUT_DIR = ROOT / "screenshots"

HOST = "127.0.0.1"
PORT = 8099
BASE_URL = f"http://{HOST}:{PORT}/"
VIEWPORT = {"width": 1280, "height": 1080}
MAX_BYTES = 256 * 1024
STORAGE_KEY = "gta6-trophy-progress-v1"


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    """Static handler that keeps the capture output clean."""

    def log_message(self, format: str, *args: object) -> None:  # noqa: A002
        pass


def start_server() -> http.server.ThreadingHTTPServer:
    handler = partial(QuietHandler, directory=str(APP_DIR))
    server = http.server.ThreadingHTTPServer((HOST, PORT), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()

    # Wait until the socket actually accepts connections before launching Chromium.
    for _ in range(100):
        try:
            with socket.create_connection((HOST, PORT), timeout=0.1):
                return server
        except OSError:
            threading.Event().wait(0.05)
    server.shutdown()
    raise RuntimeError(f"static server did not start on {BASE_URL}")


def open_page(context: BrowserContext) -> Page:
    page = context.new_page()
    page.goto(BASE_URL, wait_until="networkidle")
    page.wait_for_selector(".card")
    page.wait_for_function("document.fonts.status === 'loaded'")
    page.evaluate("window.scrollTo(0, 0)")
    return page


def capture(page: Page, filename: str) -> None:
    out = OUT_DIR / filename
    page.screenshot(path=str(out), type="png", animations="disabled", caret="hide")

    if out.stat().st_size > MAX_BYTES:
        with Image.open(out) as img:
            rgb = img.convert("RGB")
        # Quantise, stepping down further only if 256 colours still exceeds the cap.
        for colours in (256, 192, 128, 96, 64):
            rgb.quantize(colors=colours, method=Image.Quantize.MEDIANCUT).save(
                out, format="PNG", optimize=True
            )
            if out.stat().st_size <= MAX_BYTES:
                break

    size = out.stat().st_size
    if size > MAX_BYTES:
        raise RuntimeError(f"{filename} is {size} bytes, over the 262144-byte cap")
    print(f"{filename}: {size} bytes")


def shot_checklist(browser) -> None:
    """About a third of the trophy list marked earned."""
    context = browser.new_context(viewport=VIEWPORT)
    try:
        page = open_page(context)
        ids = page.eval_on_selector_all(".card", "els => els.map(el => el.dataset.id)")
        target = round(len(ids) / 3)
        earned_ids = ids[::3][:target]
        page.evaluate(
            "([key, ids]) => localStorage.setItem(key, JSON.stringify({earned: ids}))",
            [STORAGE_KEY, earned_ids],
        )
        page.reload(wait_until="networkidle")
        page.wait_for_selector(".card")
        page.wait_for_function(
            "(want) => document.querySelectorAll('.card__icon').length && "
            "document.querySelectorAll('.card__icon').length === "
            "document.querySelectorAll('.card').length && "
            "[...document.querySelectorAll('.card__icon')]"
            ".filter(el => el.textContent.trim() === '✓').length === want",
            arg=len(earned_ids),
        )
        count_text = page.inner_text("#earned-count")
        if count_text.split("/")[0].strip() != str(len(earned_ids)):
            raise RuntimeError(f"unexpected earned counter: {count_text!r}")
        page.evaluate("window.scrollTo(0, 0)")
        capture(page, "1-checklist.png")
    finally:
        context.close()


def shot_guide(browser) -> None:
    """A missable trophy's detail sheet, with steps and sources visible."""
    context = browser.new_context(viewport=VIEWPORT)
    try:
        page = open_page(context)
        page.click('.card[data-id="local-hero"] .card__title')
        page.wait_for_selector("#detail-sheet[open]")
        page.wait_for_selector("#detail-hint ol li")
        hint = page.inner_text("#detail-hint")
        if "Sources:" not in hint or "How to earn it:" not in hint:
            raise RuntimeError("detail sheet is missing steps or sources")
        if page.is_checked("#spoiler-toggle"):
            raise RuntimeError("spoiler toggle should be off for the detail sheet")
        capture(page, "2-guide.png")
    finally:
        context.close()


def shot_roadmap(browser) -> None:
    """Roadmap/list view with the missable-only filter applied."""
    context = browser.new_context(viewport=VIEWPORT)
    try:
        page = open_page(context)
        page.click('.chip-show[data-show="missable"]')
        page.wait_for_function(
            "() => document.querySelector('.chip-show[data-show=\"missable\"]')"
            ".getAttribute('aria-pressed') === 'true' && "
            "document.querySelectorAll('.card').length > 0 && "
            "document.querySelectorAll('.card__flag').length === "
            "document.querySelectorAll('.card').length"
        )
        page.evaluate("window.scrollTo(0, 0)")
        capture(page, "3-roadmap.png")
    finally:
        context.close()


def shot_spoiler(browser) -> None:
    """Spoiler-safe view: story filter on, story trophies masked."""
    context = browser.new_context(viewport=VIEWPORT)
    try:
        page = open_page(context)
        if page.is_checked("#spoiler-toggle"):
            page.click("#spoiler-toggle")
        page.click('.chip-kind[data-kind="story"]')
        page.wait_for_function(
            "() => document.querySelector('.chip-kind[data-kind=\"story\"]')"
            ".getAttribute('aria-pressed') === 'true' && "
            "document.querySelectorAll('.card').length > 0 && "
            "[...document.querySelectorAll('.card__title')]"
            ".every(el => el.textContent.trim() === 'Hidden story trophy')"
        )
        page.evaluate("window.scrollTo(0, 0)")
        capture(page, "4-spoiler.png")
    finally:
        context.close()


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    server = start_server()
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            try:
                shot_checklist(browser)
                shot_guide(browser)
                shot_roadmap(browser)
                shot_spoiler(browser)
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()


if __name__ == "__main__":
    main()