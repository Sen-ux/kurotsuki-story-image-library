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
- **48 character biographies** — 42 illustrated characters plus 6 members of the Crimson Wardens and Order of Nine Seals without supplied portraits
- All **six factions**, their leaders, philosophies, relations and named members
- **12 creature dossiers** and species categories (Demons, Aberrations, Revenants, Cursed, Eldritch, Unknown, Yokai & Spirits)
- Three independent divine-beast legendary hunters (Raiju, Kitsune, Qilin)
- Seven locations, a chronicle timeline, eight world mysteries and seven character attributes
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

The user-provided ZIP did not contain portraits for the three Crimson Wardens or the three Order of Nine Seals members. The website displays text-only bios for these six rather than using unrelated artwork. Sora Mikuni has only one verified neutral portrait; duplicate images that were actually Yae Tsuchigumo were excluded.

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
