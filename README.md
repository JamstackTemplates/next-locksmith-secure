# Brass Key Locksmiths (`next-locksmith-secure`)

Black-lacquer and engraved-brass Next.js static website for a 24/7 mobile locksmith and downtown key-cutting workshop counter. All names, phone numbers and addresses in this sample are fictitious.

Local development requires Node 24 or later and npm. To preview locally:

```sh
npm ci
npm run dev
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | 24/7 lockout hero with engraved vault-door art, service key tags, key-bitting response meter, pin-tumbler rekeying explainer, ID rule, workshop counter hours & map, and `Locksmith` JSON-LD |
| `/services/` | Starting prices in three layouts: Lockouts job sheet, Rekeying key-blank rack, and Security upgrades hardware display board, plus pricing & ID rules |
| `/response-times/` | Full-width day/night key-bitting response meter synced with an engraved neighbourhood directory table |
| `/contact/` | Prominent urgent lockout call panel, hosted Jamstacks support form when configured (or visible email fallback), message checklist, ID rule and counter hours |
| `/404.html` | "This key doesn't fit." page with wrong-key cutaway art and links to Home, Services and the 24/7 phone line |

## Make it yours

| File | Owns |
| --- | --- |
| `content/business.ts` | Business name, tagline, public email, 24/7 phone (`phone` & `phoneHref`), counter location, map query, seven-day counter `hours` and Contact checklist |
| `content/services.ts` | Lockout, rekeying and security-upgrade catalog (`id`, `category`, `name`, `summary`, `priceFrom`, `unit`, `typicalTime`, `available`, `note`) and `pricing` (`callOutFee`, `afterHoursSurcharge`, `currency`) |
| `content/response-zones.ts` | Portland service zones (`id`, `name`, `neighbourhoods`, `dayMinutes`, `nightMinutes`, single `featured` zone driving the call bar and hero nameplate) |
| `app/page.tsx`, `app/services/page.tsx`, `app/response-times/page.tsx`, `app/contact/page.tsx` | Page-specific headings, prose, steps and calls to action |
| `site.config.json` | Public name, description, hostname, `timeZone` (`America/Los_Angeles`) and Jamstacks form configuration |
| `app/tailwind.input.css` | Light/dark brass & lacquer palette tokens, pegboard/brushed-brass/knurl utilities, focus, reduced-motion and print rules |
| `components/call-bar.tsx`, `components/site-header.tsx`, `components/site-footer.tsx` | Sticky 24/7 call bar, header with wordmark/nav/theme toggle, and lacquer footer |
| `components/artwork/*`, `components/response-meter.tsx` | Inline SVG locksmith illustrations and data-driven key-bitting response meter |
| `lib/structured-data.ts` | `schema.org/Locksmith` JSON-LD derived from `business`, `responseZones` and `services` |
| `app/sitemap.ts` | Public routes (`/`, `/services/`, `/response-times/`, `/contact/`) |

### Frequent owner edits

- **Update arrival estimates:** edit `dayMinutes` / `nightMinutes` in `content/response-zones.ts`. Changing `downtown.dayMinutes.max` updates the sticky call bar, hero nameplate, key-bitting cut depth on Home and Response times, and the neighbourhood directory table.
- **Toggle service availability or prices:** edit `available` or `priceFrom` in `content/services.ts`. Setting `available: false` dims the service and shows `"Temporarily unavailable – call to ask"`; setting `true` removes the sticker.
- **Adjust workshop counter hours:** edit `hours` in `content/business.ts` (same-day `HH:MM` intervals; omit `opens`/`closes` for closed days). The phone line remains 24/7 static copy.
- **Change phone number:** update `phone` and `phoneHref` once in `content/business.ts`—reused by the call bar, hero, Services, Response times, Contact, footer, 404 and JSON-LD.

## Typography and licences

Self-hosted via npm (all **SIL Open Font License 1.1**):
- **Big Shoulders Display** (`@fontsource-variable/big-shoulders-display`) — uppercase fascia display headings
- **IBM Plex Sans** (`@fontsource/ibm-plex-sans`, weights 400/500/600) — body copy
- **IBM Plex Mono** (`@fontsource/ibm-plex-mono`, weight 500) — phone numbers, arrival minutes, prices and stamps

## Public configuration & Contact contract

`site.config.json` holds only public metadata (`name`, `description`, `domain`, `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`). When `jamstacks.siteId` (or `JAMSTACKS_SITE`) is set, `/contact/` alone renders `<jamstacks-support-form>` and loads `{cdnUrl}/sites/{siteId}/embed.js`. When unset, `/contact/` shows the email fallback with no host or script. The public email is always visible, and navigation to and from `/contact/` uses full-document loads via `SiteLink`.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Run `node --test jamstacks/config.test.mjs` separately when validating gallery publishing assets. Customer sites can delete `jamstacks/`, `plan/` and `.claude/skills/` after review.
