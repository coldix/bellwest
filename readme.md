# bellwest.au

Premium domain-for-sale site and regional gateway for the **Bellarine Peninsula & South West Victoria**.

**Domains:** [bellwest.au](https://bellwest.au) + [bellwest.com.au](https://bellwest.au) — **$4,000 AUD ONO**

While the domain package is on the market, the site also showcases local aerial content and offers **promo pages** for private sellers and Bellarine businesses.

## Live site

| Page | URL | Purpose |
|------|-----|---------|
| Home | [/](https://bellwest.au/) | Domain offer, hero video, promo banner, gallery, utility hub, FAQ |
| Promo | [/promo/](https://bellwest.au/promo/) | Monetisation — promo pages & subdomains from $49.50/mo (sliding discount) |
| Explore | [/explore.html](https://bellwest.au/explore.html) | Interactive map of the bellwest corridor |
| Barwon Heads | [/barwon-heads.html](https://bellwest.au/barwon-heads.html) | Bellarine showcase article |
| 360° tours | [/panorama.html](https://bellwest.au/panorama.html) | Kuula aerial panoramas (Barwon Heads, Torquay, Bells) |
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
├── promo/
│   └── index.html          # Promo landing page
├── css/style.css           # Shared styles (v1.6+)
├── js/
│   ├── main.js             # Header scroll, hero YouTube
│   ├── map.js              # Leaflet map (explore page)
│   └── promo.js            # Pricing slider, columns, form
├── images/
│   ├── gallery/            # Aerial photography
│   ├── hero-bells-beach-poster.jpg
│   └── logo-wave-road.svg
├── content/coota-scrape.json
├── deploy.sh               # Manual rsync deploy
├── .github/workflows/deploy.yml
├── robots.txt
├── sitemap.xml
├── llms.txt                # AI/LLM citation guide
├── CHANGELOG.md
└── readme.md
```

## Local preview

```bash
cd bellwest
python3 -m http.server 8080
```

Open http://localhost:8080 — promo page at http://localhost:8080/promo/

## Deploy

### Manual (Mac)

Requires `~/.ssh/gha_hostinger` (Hostinger deploy key, `chmod 600`):

```bash
./deploy.sh
```

**Remote path:** `/home/u566466219/domains/bellwest.au/public_html/`

### GitHub Actions

Pushes to `main` auto-deploy via `.github/workflows/deploy.yml`.

**One-time setup:** Add repository secret `HOSTINGER_SSH_KEY_B64` (base64-encoded private key, same as ozol-au). Or run **Actions → Deploy to Hostinger → Run workflow** after the secret is set.

### DNS

- **bellwest.au** → Hostinger
- **bellwest.com.au** → same site or redirect to `https://bellwest.au/`

Hero video streams from YouTube (`ze7-yqh-SMM`) — no local video file required.

## Assets & sources

| Asset | Source |
|-------|--------|
| Gallery images | [coota.au](https://coota.au) — Bells Beach, Torquay, Barwon Heads posts |
| Hero video | YouTube `ze7-yqh-SMM` — Bells Longboard Classic aerial |
| 360° embeds | [Kuula](https://kuula.co) — Barwon Heads, Torquay, Bells collections |
| Map | [Leaflet](https://leafletjs.com) + OpenStreetMap |

Scraped content manifest: `content/coota-scrape.json`

## Contact

| Inquiry | Email |
|---------|-------|
| Domain purchase | [col@oze.com.au](mailto:col@oze.com.au?subject=bellwest.au%20domain%20inquiry) |
| Promo page / subdomain | [col@oze.com.au](mailto:col@oze.com.au?subject=bellwest.au%20promo%20page%20inquiry) |

Operator: [oze.au](https://oze.au)

## SEO & AI visibility

- `robots.txt` — crawler directives + sitemap link
- `sitemap.xml` — all public pages including `/promo/`
- `llms.txt` — structured facts for LLM citation
- Homepage JSON-LD: WebSite, Product, FAQPage
- Semantic HTML, minimal JS, static hosting

See [CHANGELOG.md](CHANGELOG.md) for version history.