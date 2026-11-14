#!/usr/bin/env python3
"""Validate the repository's Chrome extension manifests and local entry points."""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXTENSIONS = ROOT / "extensions"


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def check_relative_file(manifest: Path, relative: str, label: str) -> None:
    target = manifest.parent / relative
    if not target.is_file():
        fail(f"{manifest}: {label} points to missing file {relative!r}")


def main() -> int:
    manifests = sorted(EXTENSIONS.glob("*/manifest.json"))
    if not manifests:
        fail("no extension manifests found under extensions/")

    for manifest in manifests:
        try:
            data = json.loads(manifest.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            fail(f"{manifest}: invalid JSON ({error})")

        if data.get("manifest_version") != 3:
            fail(f"{manifest}: manifest_version must be 3")

        action = data.get("action", {})
        popup = action.get("default_popup")
        if popup:
            check_relative_file(manifest, popup, "default_popup")

        newtab = data.get("chrome_url_overrides", {}).get("newtab")
        if newtab:
            check_relative_file(manifest, newtab, "newtab override")

        action_icons = action.get("default_icon", {})
        if isinstance(action_icons, str):
            check_relative_file(manifest, action_icons, "action icon")
        else:
            for size, icon in action_icons.items():
                check_relative_file(manifest, icon, f"action icon {size}")

        icons = data.get("icons", {})
        if isinstance(icons, str):
            check_relative_file(manifest, icons, "icon")
        else:
            for size, icon in icons.items():
                check_relative_file(manifest, icon, f"icon {size}")

        for script in data.get("content_scripts", []):
            for relative in script.get("js", []):
                check_relative_file(manifest, relative, "content script")
            for relative in script.get("css", []):
                check_relative_file(manifest, relative, "content stylesheet")

        print(f"OK  {manifest.relative_to(ROOT)}  {data.get('name', '<unnamed>')} v{data.get('version', '?')}")

    print(f"Validated {len(manifests)} Manifest V3 extension(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
