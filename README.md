# Kurotsuki Academy — The Black Moon Codex

A dark Eastern-fantasy horror world guide and companion character-expression archive.

## The website

**Main codex:** https://Sen-ux.github.io/kurotsuki-story-image-library/

**Expression gallery:** https://Sen-ux.github.io/kurotsuki-story-image-library/gallery.html

**Repository:** https://github.com/Sen-ux/kurotsuki-story-image-library

GitHub Pages must be enabled under **Settings → Pages → Deploy from a branch → main → /(root)** before the public website URLs will work. This repository contains a complete static site, but actual Pages deployment status is not confirmed by the editor.

## Codex contents

- Academy overview, Four Departments, and three starting modes
- Hunter grades and C–S supernatural threat classification
- **42 character biographies**, each with a corresponding illustrated dossier
- All **four remaining factions**, their leaders, philosophies, relations and named members
- **5 featured creature dossiers** and species categories (Demons, Aberrations, Revenants, Cursed, Eldritch, Unknown, Yokai & Spirits)
- Three independent divine-beast legendary hunters (Raiju, Kitsune, Qilin)
- Seven locations, a chronicle timeline, six world mysteries and seven character attributes
- The original **247 PNG expression images** and 42 WebP thumbnails, preserved in `characters/` and `thumbnails/`
- Searchable character cards, filters, linked dossier panels, a modal reference browser, and gallery expression selection

All added historical and behavioral lore is **draft expansion**, not a claim that previously unspecified details are already locked as canon. This distinction is visible on the website. The hunter grade ladder is explicitly marked as proposed. No bell symbolism was added.

## Editing lore

The text and structured lore live in **`codex-data.js`** as `window.KUROTSUKI_CODEX`. Its keys include:

- `world`, `departments`, `hunterGrades`, `threatGrades`
- `factions`, `species`, `bestiary`, `legends`
- `places`, `chronicles`, `myths`, `attributes`, `modes`
- `bios` (the dictionary keyed by each character's folder ID)
- `additionalCharacters` (text-only records for characters without uploaded images)

The landing page is **`index.html`**. `codex.html` is a second direct entry to the same codex. The original character archive is now **`gallery.html`**.

The character-image manifest remains `manifest.json`, with the gallery's rendering data in `data.js`. Don't remove or rename existing PNGs without updating those files.

### Add lore to a character

Edit the entry in `codex-data.js` under `bios`, for example `bios["maribel"]`, and change `role`, `lead`, `background`, `style`, and `hook`. Commit the edited file. No rebuilding or dependencies are required.

### Add a creature

Add another object with `id`, `name`, `grade`, `species`, `summary`, `behavior`, and `advice` to the `bestiary` array. For now, creature entries are text dossiers rather than artwork; they do not consume any OOC.AI Media slots.

### Missing portrait assets

Sora Mikuni has only one verified neutral expression portrait; duplicate images that were actually Yae Tsuchigumo were excluded.

## OOC.AI image integration

OOC.AI's official Media library and these external GitHub URLs are separate. The website does not automatically embed images in the story. External Markdown images should be tested in OOC.AI's chat preview before relying on them.

**Test URL:**
https://raw.githubusercontent.com/Sen-ux/kurotsuki-story-image-library/main/characters/maribel/happy.png

**Markdown test:**

```markdown
![Maribel Happy](https://raw.githubusercontent.com/Sen-ux/kurotsuki-story-image-library/main/characters/maribel/happy.png)
```

`OOC_PROMPT_TEMPLATE.txt` contains the additional expression-routing guidance and character folder patterns.

## Publishing

GitHub Pages: [Open repository settings](https://github.com/Sen-ux/kurotsuki-story-image-library/settings/pages) → deploy `main` branch from `/(root)`.

The website is a static site with no tracking, accounts, external libraries or build tooling.


## Illustrated parchment-and-ink redesign (October 2026)

The codex homepage (`index.html`) and direct codex entry (`codex.html`) now feature custom parchment textures, original vector ink-brush dividers and torii crest, seal-red accents, classical serif typography, full character opening dossiers and illustrated bestiary cards. The existing expression archive remains at `gallery.html` and its 247 PNG expression assets are unchanged.

**Artwork upload is a separate step.** The site's JavaScript points to `assets/dossiers/<character-id>.webp` (42 large dossier covers), `assets/previews/<character-id>.webp` (42 fast card previews), `assets/bestiary/<creature-id>.webp` (5 collage crops) and `assets/scenery/<scene-id>.webp` (3 opening illustrations). These are supplied in the separate `Kurotsuki_Illustrated_Dossier_Artwork_Ready.zip` pack and are **not in the repository until uploaded**. Until then, character cards fall back to previously committed expression thumbnails. Bestiary art stays hidden until present, and the hero retains a colour-gradient fallback.

To publish artwork, download/extract the supplied ZIP and run `powershell -ExecutionPolicy Bypass -File .\Upload-Kurotsuki-Artwork.ps1` in PowerShell (Git for Windows and GitHub authentication required). Or copy the `assets/` directory into your GitHub Desktop clone, commit, and push to `main`. The deployment does not overwrite your existing text/gallery files.


## Automatic full-dossier archive import

To add the prepared 27-portrait ZIP, upload it directly to the repository root (or an `uploads/` folder) without extracting it. The GitHub Actions workflow **Organize uploaded artwork** validates the ZIP, imports `assets/dossiers/*.webp` and `assets/previews/*.webp`, and removes the ZIP automatically in an Actions-authored commit. You do not need to extract or rename individual files. This runs automatically when a ZIP is committed to `main`; GitHub Actions must be permitted to write repository contents. You can view the run under **Actions**. All changes to the Crimson Wardens are removed from published faction content, faction-associated biographies, and the reader-facing guides.


## Corrected dossier thumbnails and smooth navigation (28 October 2026)

The character cards now display `assets/previews/<character-id>.webp` without cropping; if a preview is absent they try the corresponding `assets/dossiers/<character-id>.webp`. **Older expression thumbnails are no longer used as dossier covers.** The large dossiers use the full illustration, and clicking an illustration expands it. Category navigation now uses gentle smooth scrolling and ink-fade highlights instead of a blue-fire screen transition. Dossier-to-dossier navigation softly fades in the new page.

The verified `Kurotsuki_Dossiers_27_Ready_For_GitHub.zip` contains 27 full-size and 27 preview images, plus `DOSSIER_UPLOAD_README.txt` and `DOSSIER_MAP.json`. The repository's automatic artwork importer recognises and safely ignores these two metadata files. **Upload the ZIP directly into the repository root**, commit to `main`, and check that the `Organize uploaded artwork` GitHub Action succeeds; the workflow extracts the images and removes the ZIP from the repository. If the gallery still displays an 'Illustrated dossier pending' placeholder, the artwork has not been extracted successfully; review the workflow's run logs.

## Original background soundtrack

**Lanterns at Kurotsuki** is an original, livelier Japanese-inspired instrumental composed for the academy. A bright D–E–G–A–B pentatonic melody runs through synthetic koto and shamisen-style plucked strings, flute inspired by shinobue, and gentle matsuri-like taiko, hand-drum and wooden clapper patterns. It keeps a light supernatural atmosphere without the previous solemn drones or heavy cinematic texture. The timbres are synthesised approximations, not recordings of acoustic Japanese instruments; **no external music recording or sample is used**.

The finished audio is published at `assets/audio/veil-beneath-the-torii.mp3`. The floating soundtrack widget on both `index.html` and `gallery.html` offers **Play / Pause** and volume control. Playback is off by default; visitors must choose to play it. Pausing resumes from the same position, and the track loops automatically.

The original score is rendered by `scripts/generate_kurotsuki_theme.py` through the `Build original Kurotsuki soundtrack` GitHub Actions workflow. Editing the generator and pushing to `main` regenerates the MP3; it can also be run manually from the GitHub Actions tab. The browser player is implemented by `assets/audio/player.js` and `assets/audio/player.css`.
