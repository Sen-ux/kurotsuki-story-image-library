# Run from PowerShell on your own PC, after installing Git and GitHub CLI.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
$repo = 'Sen-ux/kurotsuki-story-image-library'
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'Install Git first.' }
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { throw 'Install GitHub CLI first (https://cli.github.com).' }
gh auth status
if ($LASTEXITCODE -ne 0) { throw 'Run gh auth login first.' }
gh repo view $repo 2>$null
if ($LASTEXITCODE -eq 0) { throw "Repository already exists; refusing to overwrite $repo" }
if (-not (Test-Path .git)) { git init -b main; if ($LASTEXITCODE -ne 0) { throw 'Git initialization failed.' } }
git add .
if ($LASTEXITCODE -ne 0) { throw 'Git add failed.' }
git commit -m 'Launch Kurotsuki Academy image archive'
if ($LASTEXITCODE -ne 0) { throw 'Git commit failed. Configure Git username/email if necessary.' }
gh repo create $repo --public --source . --remote origin --push
if ($LASTEXITCODE -ne 0) { throw 'GitHub publication failed.' }
Write-Host "Created: https://github.com/$repo"
Write-Host 'Enable GitHub Pages under Settings > Pages > Deploy from a branch > main > /(root).'
