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
| `images/hero-bells-beach.mp4` | Optional | YouTube: `ze7-yqh-SMM` (Longboard Classic aerial) |
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

## Deploy

Host as static files on any provider (Netlify, Cloudflare Pages, S3, etc.) and point both domains at the site root.

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
└── readme.md
```