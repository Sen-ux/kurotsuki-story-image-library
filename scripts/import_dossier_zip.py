#!/usr/bin/env python3
"""Safely import the prepared Kurotsuki dossier ZIP uploaded to GitHub."""
from pathlib import Path
from zipfile import ZipFile, BadZipFile
import shutil
import re

ROOT = Path(__file__).resolve().parents[1]
MAX_ARCHIVE = 70 * 1024 * 1024
MAX_EXTRACTED = 240 * 1024 * 1024
MAX_MEMBER = 18 * 1024 * 1024
ALLOWED = re.compile(r"^assets/(dossiers|previews)/([a-z0-9-]+)\.webp$")
archives = sorted([*ROOT.glob("*.zip"), *(ROOT / "uploads").glob("*.zip")]) if (ROOT / "uploads").exists() else sorted(ROOT.glob("*.zip"))

for archive in archives:
    if archive.stat().st_size > MAX_ARCHIVE:
        print("Skipping oversized archive:", archive.name)
        continue
    try:
        with ZipFile(archive) as pack:
            all_files = [member for member in pack.infolist() if not member.is_dir()]
            mapped = [(member, ALLOWED.fullmatch(member.filename.replace("\\", "/"))) for member in all_files]
            image_files = [(member, match) for member, match in mapped if match is not None]
            unrelated = [member.filename for member, match in mapped if match is None and member.filename not in {"DOSSIER_UPLOAD_README.txt", "DOSSIER_MAP.json"}]
            if not image_files or unrelated:
                print("Not a recognised Kurotsuki dossier ZIP; leaving untouched:", archive.name, unrelated[:3])
                continue
            if sum(m.file_size for m, _ in image_files) > MAX_EXTRACTED or any(m.file_size > MAX_MEMBER for m,_ in image_files):
                print("Refusing oversized contents:", archive.name)
                continue
            for member, match in image_files:
                target = ROOT / member.filename
                target.parent.mkdir(parents=True, exist_ok=True)
                with pack.open(member) as source, target.open("wb") as output:
                    shutil.copyfileobj(source, output)
                print("Imported", target.relative_to(ROOT))
        archive.unlink()
        print("Imported and removed", archive.name)
    except (BadZipFile, OSError, ValueError) as exc:
        print("Failed to process", archive.name, exc)
