# Kurotsuki Academy — Story Image Library

A brand-new static site with **42 character folders**, original PNG expressions, a searchable gallery, and direct image URLs for testing in OOC.AI.

## What is included

- 41 characters × 6 uploaded expressions = **246 original, unmodified expression PNGs**.
- Sora Mikuni: **1 correct neutral PNG** added from the earlier Kurotsuki portrait. The six `sora-mikuni` images in the supplied ZIP were exact byte-for-byte duplicates of Yae Tsuchigumo and have been **excluded**, not mislabeled.
- Six expression types: `happy`, `blushing`, `questioning`, `enthusiastic`, `displeased`, `playful`.
- `suspicious` maps to **questioning**; `upset` maps to **displeased** in the prompt, without making fake new images.
- `tsuyukomi-shizuka` from the ZIP has been corrected to public folder `tsukuyomi-shizuka` to match the headmaster's proper name.
- No actual neutral expressions supplied for the other 41 characters. Their cards start on `happy` in the gallery; the OOC prompt does not invent neutral images.
- No Crimson Wardens or Order of Nine Seals portraits in this uploaded ZIP.

## Publish as a completely NEW GitHub repository

Suggested GitHub account: `Sen-ux` (currently connected in ChatGPT). New repository name: `kurotsuki-story-image-library`.

### Option A — GitHub Desktop (easy for 247 PNGs)

1. Go to https://github.com/new and create a **Public** repository called `kurotsuki-story-image-library`. You can leave *Add README* off.
2. Download the finished ZIP and extract it onto your computer. You should see `index.html`, `data.js`, `manifest.json`, `characters/`, `thumbnails/`, etc at the **root**.
3. Install/open https://desktop.github.com/ and sign in. Choose **File → Clone repository** and select your newly created repository.
4. Copy the **contents** of the extracted folder into the cloned repository's folder (not the ZIP itself, and not an extra wrapping folder).
5. GitHub Desktop → review Changes → enter a summary such as `Add complete Kurotsuki image archive` → **Commit to main** → **Push origin**.
6. On GitHub, open that repository → **Settings → Pages** → **Source: Deploy from a branch** → **Branch: main**, **Folder: /(root)** → **Save**.
7. Once the deployment completes, visit `https://Sen-ux.github.io/kurotsuki-story-image-library/` to confirm. Then try a direct `.png` link in a private browser window.

**Why GitHub Desktop?** GitHub's website upload interface accepts a maximum of 100 files at once; this project contains more, so using Desktop is easier. All files are individually well under the 25 MiB browser limit.

### Option B — optional automated publication on your PC

With Git and GitHub CLI (`gh`) installed and authenticated, run `publish-new-repo.sh` or `Publish-New-Kurotsuki-Repo.ps1` from the extracted site folder. These scripts create **only the new** `Sen-ux/kurotsuki-story-image-library` repository, refuse to overwrite an existing repository, and push the code/files. You must still enable Pages in Settings manually. You can inspect the plain-text scripts before running them.

## Directory layout

```
index.html
manifest.json
data.js
characters/
  maribel/
    happy.png
    blushing.png
    questioning.png
    enthusiastic.png
    displeased.png
    playful.png
  mr-hollow/
    ...
  sora-mikuni/
    neutral.png        # ONLY confirmed Sora portrait
thumbnails/
OOC_PROMPT_TEMPLATE.txt
OOC_TEST_LINKS.txt
```

## OOC.AI integration

Native OOC.AI Media scene images and external Markdown images are **different mechanisms**. The website does NOT automatically connect to OOC.AI merely because it is published.

1. First test a direct PNG URL in an incognito browser: `https://Sen-ux.github.io/kurotsuki-story-image-library/characters/maribel/happy.png`.
2. If that works, test this line in an OOC.AI Prologue or chat preview:

   `![Maribel Happy](https://Sen-ux.github.io/kurotsuki-story-image-library/characters/maribel/happy.png)`

3. If it renders, add the tested `OOC_PROMPT_TEMPLATE.txt` guidelines to your story in a suitable custom-instructions field (subject to character limits).
4. If it doesn't render, use OOC.AI's official Media upload and `Copy Code` support for important scenes; external GitHub storage alone cannot bypass that platform limitation.

All GitHub Pages content is publicly accessible to people with the direct URL.

## Updating emotions

Drop a new `.png` into a matching `characters/{id}/` folder and edit `manifest.json` and `data.js` to register it, then push. Or rerun the site-generation script with an updated input ZIP.
