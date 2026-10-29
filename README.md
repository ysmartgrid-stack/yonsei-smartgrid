<p align="center"><img src="dist/assets/branding/lab-wordmark.png" alt="Yonsei University Smart Grid Laboratory" width="360"></p>

<p align="center">Power systems · Power electronics · Renewable energy · Intelligent grids</p>

<p align="center">
  <a href="https://ysmartgrid-stack.github.io/yonsei-smartgrid/">Website</a> ·
  <a href="https://ysmartgrid-stack.github.io/yonsei-smartgrid/#/research">Research</a> ·
  <a href="https://ysmartgrid-stack.github.io/yonsei-smartgrid/#/publications">Publications</a> ·
  <a href="https://ysmartgrid-stack.github.io/yonsei-smartgrid/#/team">Team</a> ·
  <a href="https://ysmartgrid-stack.github.io/yonsei-smartgrid/#/contact">Contact</a>
</p>

![Pages deployment](https://github.com/ysmartgrid-stack/yonsei-smartgrid/actions/workflows/deploy.yml/badge.svg)

![Website preview](docs/site-preview.png)

# Yonsei University Smart Grid Laboratory

The Smart Grid Laboratory at Yonsei University studies grid-forming converters,
HVDC and MVDC systems, advanced power system simulation, and AI for power systems.

This repository contains the reviewed static website and its GitHub Pages workflow.
The site uses English content and self-hosted Pretendard typography, with the original bilingual laboratory logo.

## Repository

| Path | Purpose |
| --- | --- |
| `dist/` | Published website, images, font, and introduction video |
| `.github/workflows/deploy.yml` | Validate and publish `dist/` from `main` |
| `scripts/check-site.cjs` | Check JavaScript and referenced local assets |
| `scripts/preview.cjs` | Local preview with video range support |
| `docs/maintenance.md` | Content updates and handover |
| `docs/deployment.md` | Pages setup and future custom-domain migration |

## Preview locally

With Node.js installed:

```sh
node scripts/preview.cjs
```

Open **http://127.0.0.1:4173/**. No framework installation or build step is required.

## Update the website

1. Prepare and review changes in the maintained local source workspace.
2. Copy the reviewed output into `dist/`, including updated assets.
3. Run `node scripts/sanitize-public.cjs`, then `node scripts/check-site.cjs`, and inspect desktop/mobile layouts.
4. Commit and push to `main`; GitHub Actions publishes only `dist/`.

`dist/data.js` is generated in the source workspace. Update its editorial source
there before regenerating it; direct edits can be overwritten by a later export.
Source workbooks, private working files, verification archives, and credentials
are not part of this public repository. See [Maintenance](docs/maintenance.md).

The professor's CV is available from the Team page.

## Deployment and domain

Pages address: **https://ysmartgrid-stack.github.io/yonsei-smartgrid/**

The university domain, **smartgrid.yonsei.ac.kr**, is managed separately.
Publishing here does not change university DNS or the existing hosting service.
See [Deployment](docs/deployment.md) before a future domain cutover.

## Credits and usage

- Logos, photographs, documents, and video retain their respective ownership.
- Pretendard Variable v1.3.9 uses the [SIL Open Font License 1.1](dist/assets/fonts/OFL.txt).
- Publication and patent titles retain source spelling. Project names are editorial English translations.
- No blanket license is granted for reuse of the repository's branding or media.

