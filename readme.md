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

## Deploy (Hostinger)

Site is configured for **bellwest.au** on Hostinger. Once DNS propagates:

1. Log in to Hostinger → **Websites** → **bellwest.au** → **File Manager**
2. Open `public_html/` and upload the full repo contents:
   - `index.html`, `potential-uses.html`
   - `css/`, `js/`, `images/`, `content/` (optional)
3. Ensure `index.html` sits directly in `public_html/` (not in a subfolder)
4. Point **bellwest.com.au** at the same Hostinger site (addon domain or redirect to bellwest.au)

DNS propagation can take up to 24–48 hours. The hero video streams from YouTube — no video file upload required.

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