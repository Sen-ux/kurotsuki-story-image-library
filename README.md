# Kurotsuki Academy — Character Expression Library

**Repository:** https://github.com/Sen-ux/kurotsuki-story-image-library

This repository is already created and contains the uploaded Kurotsuki Academy image gallery.

- **42 character folders**
- **247 individual PNG portraits** with 42 WebP gallery thumbnails
- **0 missing image files** in `manifest.json` (checked against the GitHub repository)
- **Sora Mikuni:** one confirmed neutral portrait. The original expression PNGs assigned to Sora were actually duplicates of Yae Tsuchigumo, so those were not reused.
- Other character expressions: `happy`, `blushing`, `questioning`, `enthusiastic`, `displeased`, `playful`. Most character folders do not have `neutral.png`.

## View the gallery (GitHub Pages)

1. Open **Settings → Pages** on this repository: https://github.com/Sen-ux/kurotsuki-story-image-library/settings/pages
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Choose **main** as branch and **/(root)** as folder, then save.
4. Check Pages for the deployment status and published URL.

**Expected gallery address (only when Pages is enabled and deployed):**
https://Sen-ux.github.io/kurotsuki-story-image-library/

The gallery uses `index.html` and `data.js` and runs as a static website. It has search, group filters, per-character emotion selectors and buttons for copying direct image links. `manifest.json` is the machine-readable map of characters and file paths.

## Use the PNGs immediately—even without GitHub Pages

Because the repository is **public**, each committed file also has a stable GitHub raw URL. Example:

https://raw.githubusercontent.com/Sen-ux/kurotsuki-story-image-library/main/characters/maribel/happy.png

Markdown image test for OOC.AI:

```markdown
![Maribel — happy](https://raw.githubusercontent.com/Sen-ux/kurotsuki-story-image-library/main/characters/maribel/happy.png)
```

You can replace `maribel/happy.png` with a character ID / emotion filename in `manifest.json`. Note that raw GitHub image URLs work as ordinary public file links, but **OOC.AI may or may not render externally hosted Markdown images**. Test in the story's actual Prologue/Chat Preview. External hosting does not automatically register or bypass OOC.AI's native 50-image Media limit.

Once Pages is active, you may instead use:
https://Sen-ux.github.io/kurotsuki-story-image-library/characters/maribel/happy.png

## Expression selection rules for OOC.AI

See [OOC_PROMPT_TEMPLATE.txt](./OOC_PROMPT_TEMPLATE.txt) for a character-folder map and proposed image-selection guidance. Show only one portrait for an NPC who is actually present, and only for meaningful introductions or emotional changes. Do not link images for absent characters or invent missing emotion files.

Filename aliases for storytelling purposes:
- `suspicious` → `questioning.png`
- `upset` → `displeased.png`

These are aliases, not extra files.

## Maintenance

To add a new expression:
1. Commit `characters/<character-id>/<emotion>.png`.
2. Add that path to the character's `available` object in **both** `manifest.json` and `data.js`.
3. If desired, replace `thumbnails/<character-id>.webp` with a new preview.
4. Commit and push on `main`; GitHub Pages will rebuild automatically if configured to deploy from the branch.

The repository is a **public gallery**—do not upload private or sensitive pictures. The website itself does not automatically sync portraits with OOC.AI.

### Quick test files

See [OOC_TEST_LINKS.txt](./OOC_TEST_LINKS.txt) for copy-and-paste URLs.
