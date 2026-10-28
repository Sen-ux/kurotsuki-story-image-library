#!/bin/sh
set -eu
cd "$(dirname "$0")"
REPO="Sen-ux/kurotsuki-story-image-library"
command -v git >/dev/null || { echo "Install Git first"; exit 1; }
command -v gh >/dev/null || { echo "Install GitHub CLI first: https://cli.github.com"; exit 1; }
gh auth status >/dev/null || { echo "Run gh auth login first"; exit 1; }
if gh repo view "$REPO" >/dev/null 2>&1; then echo "Repository exists; refusing to overwrite: $REPO"; exit 2; fi
if [ ! -d .git ]; then git init -b main; fi
git add .
git commit -m "Launch Kurotsuki Academy image archive"
gh repo create "$REPO" --public --source . --remote origin --push
echo "Created https://github.com/$REPO"
echo "Now enable GitHub Pages: Settings > Pages > Deploy from a branch > main > /(root)."
