# bellwest.au

Premium domain-for-sale site and regional gateway for the **Bellarine Peninsula & South West Victoria**.

**Domains:** [bellwest.au](https://bellwest.au) + [bellwest.com.au](https://bellwest.au) — **$4,000 AUD ONO**

While the domain package is on the market, the site also showcases local aerial content and offers **promo pages** for private sellers and Bellarine businesses.

## Tech Stack & Architecture

- **Framework:** [Astro](https://astro.build) (Static output)
- **Edge Platform:** [Cloudflare Workers](https://developers.cloudflare.com/workers/) with Static Assets
- **Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) on push to `main`
- **Video:** Lightweight YouTube facade (poster image with on-demand video player)
- **Interactive:**
  - Leaflet / OpenStreetMap for the regional corridor map
  - Kuula 360° aerial virtual tours
  - Promo pricing timeline slider with live savings & Stripe checkout
  - Lightbox image preview modal for aerial photography
  - House promotions via oze ad network (`https://ads.oze.net.au/`)

## Design System (v4.0)

Two-theme design system — **Coastal Editorial** (light) and **Aurora Glass** (dark) — toggled in the header navigation:
- **Aurora Glass (dark)** is the default; returning visitors' choices persist in `localStorage` (`bw-theme`).
- Zero flash on load via inline script before first paint.
- Fraunces serif display typography paired with Source Sans 3 body.
- 3D card tilt & smooth scroll reveal (respects `prefers-reduced-motion`).

## Pages & Structure

| Page | URL | Purpose |
|------|-----|---------|
| Home | [/](https://bellwest.au/) | Domain offer ($4k ONO), hero imagery, promo banner, aerial gallery, utility hub, FAQ |
| Explore | [/region/explore](https://bellwest.au/region/explore) | Interactive map, featured locations & 360° Kuula aerial tours |
| Invest | [/invest/](https://bellwest.au/invest/) | Four business opportunity pitches |
| Advertise | [/promo/](https://bellwest.au/promo/) | Promo pages & subdomains from $49.50/year (sliding annual discount) |
| Barwon Heads | [/region/barwon-heads](https://bellwest.au/region/barwon-heads) | Bellarine showcase article |

**Community:** [facebook.com/groups/bellwest](https://www.facebook.com/groups/bellwest)

### Redirects (301 Permanent)

Legacy URLs return 301 redirects handled at the Cloudflare edge:

| Old URL | Destination |
|---------|-------------|
| `/explore.html` | `/region/explore` |
| `/barwon-heads.html` | `/region/barwon-heads` |
| `/potential-uses.html` | `/invest/` |
| `/panorama.html`, `/region/panorama.html` | `/region/explore#tours` |
| `/region/explore.html` | `/region/explore` |
| `/region/barwon-heads.html` | `/region/barwon-heads` |
| `bellwest.com.au/*`, `www.bellwest.au/*` | `https://bellwest.au/*` |

## Project Structure

```
bellwest/
├── astro.config.mjs        # Astro configuration & static build settings
├── wrangler.jsonc          # Cloudflare Worker & static assets configuration
├── worker.js               # Edge worker router for redirects & asset delivery
├── package.json
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── YouTubeFacade.astro
│   │   ├── Lightbox.astro
│   │   ├── AdnetBand.astro
│   │   ├── ExploreMap.astro
│   │   ├── KuulaTour.astro
│   │   └── PricingCalculator.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   ├── invest/index.astro
│   │   ├── promo/index.astro
│   │   └── region/
│   │       ├── explore.astro
│   │       └── barwon-heads.astro
│   └── styles/
│       ├── global.css
│       └── adnet.css
├── public/
│   ├── images/
│   │   ├── gallery/
│   │   ├── branding/
│   │   ├── hero-bells-beach-poster.jpg
│   │   └── logo-wave-road.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── llms.txt
│   ├── _redirects
│   └── _headers
├── docs/
│   └── missions/
├── CHANGELOG.md
└── readme.md
```

## Local Development

```bash
# Install dependencies
npm install

# Start local Astro dev server
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview
```

## Deployment

Deployments to Cloudflare Workers are automated via GitHub Actions on every push to `main`.

Manual deploy via Wrangler:
```bash
npm run build
npx wrangler deploy
```

Preview URL: https://bellwest.col-ab2.workers.dev

## Panoramic wall art (OzeArt)

The home page has a **Panoramic wall art** section (`#wall-art` in `src/pages/index.astro`), placed after "Why this region sells itself" and before the "Bellarine & South West resources" hub. It uses the existing Bells Beach 3:1 panorama (`/images/gallery/bells-longboard-pano.jpg`) and links to [art.oze.au](https://art.oze.au). The footer Pages list also links to art.oze.au.

- Prices: 90 × 30 cm $395 · 120 × 40 cm $495 · 150 × 50 cm $595 (canvas, walnut shadow frame).
- **Spring special (temporary):** 10% off plus free postage anywhere in Australia. Remove or update the `.wall-art-offer` line when the promotion ends.
- Styles: `/* Panoramic wall art */` block at the end of `src/styles/global.css`.

## Contact

- **Domain Purchase:** [col@oze.com.au](mailto:col@oze.com.au?subject=bellwest.au%20domain%20inquiry)
- **Promo Page / Subdomain:** [col@oze.com.au](mailto:col@oze.com.au?subject=bellwest.au%20promo%20page%20inquiry)
- **Operator:** [oze.au](https://oze.au)