# bellwest

Premium, visual-first "For Sale" site for **bellwest.au** and **bellwest.com.au** — $4,000 ONO.

Static HTML/CSS site with two pages:

- `index.html` — hero landing, domain offer, local utility hub (SEO/AI-friendly)
- `potential-uses.html` — four business opportunity pitches

## Assets

| File | Status | Source |
|------|--------|--------|
| `images/hero-bells-beach-poster.jpg` | ✅ Downloaded | [coota.au — Bells Longboard Classic](https://coota.au/bells-beach-longboard-classic-an-aerial-odyssey/) |
| `images/gallery/*` | ✅ 5 images | coota.au Bells Beach & Torquay posts |
| Hero video | ✅ YouTube embed | `ze7-yqh-SMM` — Bells Longboard Classic aerial (no local file needed) |
| `images/logo-wave-road.svg` | Placeholder | Replace with your "Wave and the Road" logo |

Scraped content manifest: `content/coota-scrape.json`

### Source articles (coota.au)

- [Bells Beach Longboard Classic — An Aerial Odyssey](https://coota.au/bells-beach-longboard-classic-an-aerial-odyssey/) — video `youtu.be/ze7-yqh-SMM`
- [Bells Beach May 2022](https://coota.au/bells-beach-may-22/) — video `youtube.com/watch?v=qetk6XZeyow`
- [Torquay May 2023](https://coota.au/torquay-may-2023/) — video `youtu.be/YnTzUuwMe8I`

## Local preview

```bash
cd bellwest
python3 -m http.server 8080
```

Open http://localhost:8080

## Deploy (GitHub → Hostinger)

Auto-deploys on every push to `main` via `.github/workflows/deploy.yml` (same SSH rsync pattern as ozol.au).

**Remote path:** `/home/u566466219/domains/bellwest.au/public_html/`

### One-time GitHub setup

1. Open **coldix/bellwest** → **Settings** → **Secrets and variables** → **Actions**
2. Add repository secret **`HOSTINGER_SSH_KEY_B64`** — same base64-encoded SSH private key used by ozol.au / ozol.org (or set it as an org secret on `coldix`)
3. Push to `main`, or run **Actions** → **Deploy to Hostinger** → **Run workflow**

### DNS

- **bellwest.au** → Hostinger (propagation may take up to 24–48 hours)
- **bellwest.com.au** → same site (addon domain) or redirect to `https://bellwest.au/`

Hero video streams from YouTube — no video file upload required.

## Contact

Inquiries: [col@oze.com.au](mailto:col@oze.com.au?subject=bellwest.au%20domain%20inquiry)

## Structure

```
bellwest/
├── index.html
├── potential-uses.html
├── css/style.css
├── js/main.js
├── images/
├── robots.txt
├── sitemap.xml
├── llms.txt
├── CHANGELOG.md
└── readme.md
```

## SEO & AI Visibility (v1.1.0+)

This site is optimized for both traditional search engines and AI/LLM systems (ChatGPT, Claude, Perplexity, Google AI Overviews, etc.).

### Key files added in 1.1.0 (2026-06-17 16:55 AEST)
- `robots.txt` — Crawler directives
- `sitemap.xml` — Structured sitemap with images
- `llms.txt` — Clean, citable facts and page overview for AI models
- Enhanced homepage FAQ + rich JSON-LD (WebSite + Product + FAQPage)

See [CHANGELOG.md](CHANGELOG.md) for full version history and update notes.

All versioned files include AEST timestamps.

## Local preview
