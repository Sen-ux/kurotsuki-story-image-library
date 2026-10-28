#!/usr/bin/env python3
"""Move uploaded Kurotsuki artwork folders into assets/ and index every bestiary image.

Safe to run repeatedly. Operates only on four named root-level upload folders.
Does not change the existing characters/ expression library or site's design files.
"""
from pathlib import Path
from urllib.parse import quote
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
KINDS = ("bestiary", "dossiers", "previews", "scenery")
EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"}
OUTPUT = ROOT / "assets" / "bestiary" / "catalogue.json"

def name_slug(value):
    stem = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return stem or "image-" + hashlib.sha256(value.encode("utf-8")).hexdigest()[:10]

def same_file(one, two):
    if one.stat().st_size != two.stat().st_size:
        return False
    def digest(path):
        h = hashlib.sha256()
        with path.open("rb") as f:
            for block in iter(lambda: f.read(1024 * 1024), b""):
                h.update(block)
        return h.digest()
    return digest(one) == digest(two)

def move_root_folders():
    changes = 0
    for kind in KINDS:
        source = ROOT / kind
        target = ROOT / "assets" / kind
        if not source.is_dir():
            continue
        for original in sorted(source.rglob("*")):
            if not original.is_file():
                continue
            dest = target / original.relative_to(source)
            dest.parent.mkdir(parents=True, exist_ok=True)
            if dest.exists():
                if same_file(original, dest):
                    original.unlink()
                    changes += 1
                    print("Removed identical duplicate:", original.relative_to(ROOT))
                    continue
                suffix = 2
                candidate = dest
                while candidate.exists():
                    candidate = dest.with_name(f"{dest.stem}-upload-{suffix}{dest.suffix}")
                    suffix += 1
                dest = candidate
            original.rename(dest)
            changes += 1
            print("Moved", original.relative_to(ROOT), "=>", dest.relative_to(ROOT))
        for subdir in sorted((p for p in source.rglob("*") if p.is_dir()), reverse=True):
            if not any(subdir.iterdir()):
                subdir.rmdir()
        if not any(source.iterdir()):
            source.rmdir()
    return changes

def index_bestiary():
    directory = ROOT / "assets" / "bestiary"
    directory.mkdir(parents=True, exist_ok=True)
    files = sorted((p for p in directory.rglob("*") if p.is_file() and p.suffix.lower() in EXTENSIONS), key=lambda x: str(x).casefold())
    entries = []
    used = set()
    for file in files:
        rel = file.relative_to(ROOT).as_posix()
        id_value = name_slug(file.stem)
        if id_value in used:
            id_value += "-" + hashlib.sha256(rel.encode("utf-8")).hexdigest()[:7]
        used.add(id_value)
        label = file.stem.replace("_", " ").replace("-", " ").strip()
        entries.append({"id": id_value, "name": label.title() if label else "Unknown Specimen", "path": quote(rel, safe="/")})
    content = json.dumps({"version": 1, "images": entries}, ensure_ascii=False, indent=2) + "\n"
    previous = OUTPUT.read_text(encoding="utf-8") if OUTPUT.exists() else None
    if previous != content:
        OUTPUT.write_text(content, encoding="utf-8")
        print("Updated bestiary catalogue:", len(entries), "image(s)")
    else:
        print("Bestiary catalogue already current:", len(entries), "image(s)")
    return len(entries)

if __name__ == "__main__":
    count = move_root_folders()
    indexed = index_bestiary()
    print(f"Done. Processed {count} uploaded file(s); {indexed} bestiary image(s) indexed.")
