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


# Raw GitHub uploads sometimes land at repository root rather than in
# bestiary/, dossiers/, or previews/. Match known named academy artwork,
# preserve every original in a source-art folder, and generate both versions
# required by the public site's existing dossier and bestiary image paths.
CHARACTER_IDS = """
haru-amagiri reina-onikawa bai-suiren koharu-minase toma-karasuba sora-mikuni
emiko-shigure yae-tsuchigumo jin-seo fuyuka-yukishiro masato-igarashi
rin-kurogane ayame-byakuren kazuma-shido liang-shuren chiyo-komori
goro-akatsuki yuzuriha-sazanami han-haejin akane-tsurugi reiha-kiyomizu
dr-meilin-zhao yasuhide-momose eri-hanabusa maribel mr-hollow tsukuyomi-shizuka
aoi-mitsurugi brother-daichi-morisada hoshi-kaimon kasumi-nagi kohana-menreika
kurogane-rei lady-utsugi-saigetsu longqi-seiran lord-enji-kurobane natsume-kohana
shirakawa-kage shizuru-nuehara sumi-arata tatsuya-kagetsu yoru-shinkai
""".split()
CHARACTER_BY_TOKEN = {re.sub(r"[^a-z0-9]", "", item): item for item in CHARACTER_IDS}
SOURCE_ART = ROOT / "assets" / "source-art"

def ingest_root_pngs():
    from PIL import Image, ImageOps
    processed = 0
    unmatched = []
    for original in sorted(ROOT.glob("*.png")):
        basename = re.sub(r"^[0-9]{2}_", "", original.stem)
        token = re.sub(r"[^a-z0-9]", "", basename.lower())
        character_id = CHARACTER_BY_TOKEN.get(token)
        if original.name == "Kurotsuki Academy Headmaster Dossier.png":
            character_id = "tsukuyomi-shizuka"
        if character_id:
            destinations = [(ROOT / "assets" / "dossiers" / f"{character_id}.webp", None),
                            (ROOT / "assets" / "previews" / f"{character_id}.webp", (1100, 734))]
            original_folder = SOURCE_ART / "dossiers"
        elif original.name.lower().startswith("chatgpt image"):
            unmatched.append(original.name)
            continue
        else:
            # The named remaining PNGs are the bestiary illustrations:
            # Orihime, Hyakume-inu, and the ranked species sheets.
            grade_suffix = re.sub(r"_rank_(?:s|a|b|c)(?:plus|minus)?$", "", basename, flags=re.I)
            beast_slug = name_slug(grade_suffix)
            destinations = [(ROOT / "assets" / "bestiary" / f"{beast_slug}.webp", None)]
            original_folder = SOURCE_ART / "bestiary"
        with Image.open(original) as raw:
            image = ImageOps.exif_transpose(raw).convert("RGB")
            for dest, dimensions in destinations:
                dest.parent.mkdir(parents=True, exist_ok=True)
                artwork = image.copy()
                if dimensions:
                    artwork.thumbnail(dimensions, Image.Resampling.LANCZOS)
                artwork.save(dest, "WEBP", quality=90 if not dimensions else 85, method=6)
                print("Prepared", dest.relative_to(ROOT))
        original_folder.mkdir(parents=True, exist_ok=True)
        preserved = original_folder / original.name
        if preserved.exists():
            print("Original already archived:", preserved.relative_to(ROOT))
            original.unlink()
        else:
            original.rename(preserved)
            print("Preserved original", preserved.relative_to(ROOT))
        processed += 1
    if unmatched:
        print("Unlabelled uploads kept at root for manual character identification:", len(unmatched))
        for name in unmatched:
            print("Needs character name:", name)
    return processed


def reconcile_archived_artwork():
    """Repair files classified before numbered-character filenames were recognised."""
    from PIL import Image, ImageOps
    originals = SOURCE_ART / "bestiary"
    if not originals.is_dir():
        return 0
    corrected = 0
    for saved in sorted(originals.glob("*.png")):
        # Historical imports used numbered filenames verbatim, e.g. 01_HaruAmagiri.
        original_key = name_slug(saved.stem)
        old_webp = ROOT / "assets" / "bestiary" / f"{original_key}.webp"
        basename = re.sub(r"^[0-9]{2}_", "", saved.stem)
        token = re.sub(r"[^a-z0-9]", "", basename.lower())
        character_id = CHARACTER_BY_TOKEN.get(token)
        if character_id:
            full = ROOT / "assets" / "dossiers" / f"{character_id}.webp"
            small = ROOT / "assets" / "previews" / f"{character_id}.webp"
            full.parent.mkdir(parents=True, exist_ok=True)
            small.parent.mkdir(parents=True, exist_ok=True)
            with Image.open(saved) as raw:
                art = ImageOps.exif_transpose(raw).convert("RGB")
                art.save(full, "WEBP", quality=90, method=6)
                preview = art.copy()
                preview.thumbnail((1100, 734), Image.Resampling.LANCZOS)
                preview.save(small, "WEBP", quality=85, method=6)
            moved = SOURCE_ART / "dossiers" / saved.name
            moved.parent.mkdir(parents=True, exist_ok=True)
            if moved.exists():
                saved.unlink()
            else:
                saved.rename(moved)
            if old_webp.exists():
                old_webp.unlink()
            print("Reassigned named portrait to dossiers:", character_id)
            corrected += 1
        else:
            without_grade = re.sub(r"_rank_(?:s|a|b|c)(?:plus|minus)?$", "", basename, flags=re.I)
            proper_webp = ROOT / "assets" / "bestiary" / f"{name_slug(without_grade)}.webp"
            if old_webp.exists() and old_webp != proper_webp:
                if proper_webp.exists():
                    old_webp.unlink()
                else:
                    old_webp.rename(proper_webp)
                print("Corrected bestiary artwork name:", proper_webp.name)
                corrected += 1
    return corrected


def clean_chatgpt_filename_uploads():
    """Delete only leftover generic root-level ChatGPT Image PNGs.

    The named original character and bestiary artwork stored beneath assets/
    is never targeted by this function.
    """
    removed = 0
    for candidate in ROOT.glob("ChatGPT Image *.png"):
        if candidate.is_file():
            candidate.unlink()
            print("Removed unassigned generic upload:", candidate.name)
            removed += 1
    return removed

if __name__ == "__main__":
    count = move_root_folders() + ingest_root_pngs() + reconcile_archived_artwork()
    removed = clean_chatgpt_filename_uploads()
    indexed = index_bestiary()
    print(f"Done. Processed {count} uploaded file(s), deleted {removed} generic files; {indexed} bestiary image(s) indexed.")
