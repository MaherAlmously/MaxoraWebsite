# Image sources

Every third-party image in this repository, with its origin and license. Add a row here
whenever you add an image — this file is the record that the site has the right to use them.

## Licensing

All third-party photography is from **[Pexels](https://www.pexels.com)** under the
**[Pexels License](https://www.pexels.com/license/)**:

- Free to use, including commercially.
- No attribution required (credited here anyway, because the photographers earned it).
- Modification and resizing permitted.
- Must not be resold unmodified, used as a trademark, or used to imply endorsement.

Images were chosen so that no third-party logo, app interface, or brand mark is the subject,
which keeps the "no implied endorsement" term comfortably satisfied.

## Package photography

Downloaded at `w=1600` via the Pexels CDN (`?auto=compress&cs=tinysrgb&w=1600`), then served
through `next/image`, which re-encodes to WebP at the width each layout actually needs — a
640px card image lands at roughly 15–30 KB.

AVIF is deliberately **not** enabled: `next@15.5.20` is affected by
[GHSA-2xp9-vwfh-vxw4](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4), an unauthenticated RCE
in the Image Optimization API reachable only when AVIF is on. Turn it on in `next.config.ts`
once Next is upgraded past 15.5.24.

| File | Used for | Source | Photographer | Dimensions | Size |
|---|---|---|---|---|---|
| `public/images/packages/website-informative.jpg` | Informative website package | [pexels.com/photo/450035](https://www.pexels.com/photo/computer-set-up-on-a-workspace-450035/) | Mateusz Dach | 1600×1067 | 141 KB |
| `public/images/packages/website-ecommerce.jpg` | Ecommerce website package | [pexels.com/photo/29205862](https://www.pexels.com/photo/online-shopping-with-credit-card-and-laptop-29205862/) | Sadi Hockmuller | 1600×1066 | 92 KB |
| `public/images/packages/app-launch.jpg` | Launch App package | [pexels.com/photo/3471423](https://www.pexels.com/photo/person-writing-on-white-paper-3471423/) | Fabian Wiktor | 1600×1201 | 235 KB |
| `public/images/packages/app-scale.jpg` | Scale App package | [pexels.com/photo/160107](https://www.pexels.com/photo/macbook-pro-160107/) | Negative Space | 1600×1067 | 109 KB |

All four retrieved 2026-11-24.

## Existing assets (not third-party stock)

| Path | Origin |
|---|---|
| `public/promos/black-friday-2026.png` | Maxora's own Black Friday flyer, supplied by the client |
| `public/logo-mark.png`, `public/maxora-logo.jpg` | Maxora brand marks |
| `public/clients/*` | Client logos, used with those clients' permission |
| `public/portfolio/*` | Screenshots of Maxora's own delivered work |
| `public/souqly-icon.png`, `public/app-store-icon.jpg`, `public/google-play-logo.jpg` | Souqly product assets and store badges |
| `public/images/services/*` | Pre-existing legacy `/store` catalog art |

> `public/images/services/*` predates this file and its provenance is not recorded. It is only
> used by the unlinked, `noindex` legacy `/store` catalog. Worth confirming before any of it is
> reused on an indexed page.
