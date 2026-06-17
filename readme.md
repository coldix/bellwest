# bellwest.au

Premium domain-for-sale site and regional gateway for the **Bellarine Peninsula & South West Victoria**.

**Domains:** [bellwest.au](https://bellwest.au) + [bellwest.com.au](https://bellwest.au) — **$4,000 AUD ONO**

While the domain package is on the market, the site showcases local aerial content and offers **promo pages** for private sellers and Bellarine businesses.

## Live site

| Page | URL | Purpose |
|------|-----|---------|
| Home | [/](https://bellwest.au/) | Domain offer, hero video, promo banner, gallery, utility hub, FAQ |
| Promo | [/promo/](https://bellwest.au/promo/) | Promo pages & subdomains — Stripe checkout + sliding discount |
| Explore | [/explore.html](https://bellwest.au/explore.html) | Interactive map of the bellwest corridor |
| Barwon Heads | [/barwon-heads.html](https://bellwest.au/barwon-heads.html) | Bellarine showcase article |
| 360° tours | [/panorama.html](https://bellwest.au/panorama.html) | Kuula aerial panoramas |
| Potential uses | [/potential-uses.html](https://bellwest.au/potential-uses.html) | Four business opportunity pitches |

**Community:** [facebook.com/groups/bellwest](https://www.facebook.com/groups/bellwest)

## Project structure

```
bellwest/
├── index.html              # Homepage
├── explore.html
├── barwon-heads.html
├── panorama.html
├── potential-uses.html
├── promo/index.html        # Promo landing (subfolder → /promo/)
├── css/style.css
├── js/
│   ├── main.js             # Header, hero video, shared lightbox
│   ├── map.js              # Leaflet map
│   └── promo.js            # Pricing slider
├── images/
│   ├── gallery/            # Full-resolution originals
│   ├── thumbs/             # 640px thumbnails (display + click for full)
│   ├── branding/           # oze logo, unused logo variants
│   ├── hero-bells-beach-poster.jpg
│   └── logo-wave-road.svg
├── content/coota-scrape.json
├── deploy.sh
├── robots.txt
├── sitemap.xml
├── llms.txt
├── CHANGELOG.md
└── readme.md
```

**Root policy:** HTML pages and deploy/SEO files only at repo root. Images live under `images/`; promo page in `promo/`. No build step — static site.

**Images:** Pages load `images/thumbs/` for display (`object-fit: contain` — no cropping). Click any thumbnail to open the full `images/gallery/` file in a shared lightbox (`js/main.js`).

## Local preview

```bash
cd bellwest
python3 -m http.server 8080
```

Open http://localhost:8080 — promo at http://localhost:8080/promo/

### Regenerate thumbnails

```bash
for f in images/gallery/*.jpg; do
  sips -Z 640 "$f" --out "images/thumbs/$(basename "$f")"
done
```

## Deploy

### Manual (Mac)

Requires `~/.ssh/gha_hostinger` (`chmod 600`):

```bash
./deploy.sh
```

**Remote:** `/home/u566466219/domains/bellwest.au/public_html/`

### GitHub Actions

Push to `main` deploys via `.github/workflows/deploy.yml`. Secret: `HOSTINGER_SSH_KEY_B64`.

## Promo pricing

- Base rate: **$495 p.a.** — page, hosting & image placement included
- Photography billed separately by the photographer
- FSBO portal listings (realestate.com.au + domain.com.au): ~**$600 p.a.** extra
- Introductory sliding discount by signup month (Jul 2026 → Apr 2027+); coupon **BW-90** for 90% off July signups

## Stripe (promo checkout)

| Item | Value |
|------|-------|
| Product | `prod_UiiOowYQt2TkPl` |
| Coupon (90% off) | `BW-90` |
| Payment link | https://buy.stripe.com/3cIeVdcVMezo1st51f77O00 |
| Buy button ID | `buy_btn_1TjH5PDRtLu90m8j4O1g5xA5` |
| Publishable key | `pk_live_6TrCubeAphhHGIDlKHpcluuS` |

Embedded on `/promo/`. Email order remains as fallback.

## Contact

| Inquiry | Email |
|---------|-------|
| Domain purchase | [col@oze.com.au](mailto:col@oze.com.au?subject=bellwest.au%20domain%20inquiry) |
| Promo page | [col@oze.com.au](mailto:col@oze.com.au?subject=bellwest.au%20promo%20page%20inquiry) |

Operator: [oze.au](https://oze.au)

See [CHANGELOG.md](CHANGELOG.md) for version history.