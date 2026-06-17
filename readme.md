# bellwest

Premium, visual-first "For Sale" site for **bellwest.au** and **bellwest.com.au** — $4,000 ONO.

Static HTML/CSS site with two pages:

- `index.html` — hero landing, domain offer, local utility hub (SEO/AI-friendly)
- `potential-uses.html` — four business opportunity pitches

## Assets to add

Drop your media into `images/`:

| File | Purpose |
|------|---------|
| `hero-bells-beach.mp4` | Hero background video (360° drone or coastal footage) |
| `hero-bells-beach-poster.jpg` | Video poster / fallback still |
| `logo-wave-road.svg` | Replace placeholder with your "Wave and the Road" logo |

Until video is added, the hero shows a coastal gradient fallback.

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