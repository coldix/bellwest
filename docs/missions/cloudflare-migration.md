# Antigravity mission: move bellwest.au from Hostinger to Cloudflare

Run on: Mac Studio (Antigravity, signed in to GitHub as coldix, wrangler logged in to the Cloudflare account that will hold bellwest.au).
Repo: https://github.com/coldix/bellwest
Live now: https://bellwest.au (Hostinger, `platform: hostinger`, www → www.bellwest.au.cdn.hstgr.net)

## Goal
Serve bellwest.au (and www, plus bellwest.com.au as a redirect) from Cloudflare with no visible change to the site, no lost SEO, and auto-deploy from GitHub `main`. Then retire the Hostinger deploy path.

## What the repo is (checked 11 Oct 2026)
- Plain static HTML/CSS/JS, NOT Astro. Pages: `/`, `/region/explore.html`, `/region/barwon-heads.html`, `/invest/`, `/promo/`. Images ~2 MB. No PHP, no server forms (promo form uses `mailto:col@oze.com.au`).
- `.htaccess` holds 5 x 301 redirects and blocks `*.md *.sh *.yml .gitignore` from the web.
- `deploy.sh` + `.github/workflows/deploy.yml` rsync to Hostinger over SSH (secret `HOSTINGER_SSH_KEY_B64`).
- `*.mp4` is gitignored: the hero video may only exist on the Hostinger server. CHECK THIS FIRST.

## Decision: do NOT convert to Astro
Keep it static. Deploy as a Cloudflare Worker with static assets (preferred, matches other Oze sites) or Pages if simpler. Astro rewrite is out of scope; flag it as a later option only.

## Colin does (before / during)
1. Add bellwest.au (and bellwest.com.au) as zones in Cloudflare (Free plan). Let Cloudflare import existing DNS.
2. Tell Antigravity "zones added" and the account name.
3. When Antigravity says "ready for NS", change nameservers at the registrar to the two Cloudflare NS shown for each zone.
4. After it's live and checked for a week: cancel/delete the Hostinger hosting for bellwest (only after step 9 below passes).

## Antigravity does
1. Clone repo, branch `cloudflare-migration`.
2. Find every asset the pages reference (`grep -rhoE 'src="[^"]+"|href="[^"]+"'`) and confirm it exists in the repo. For anything missing (esp. `*.mp4` hero video, poster), download it from the live Hostinger site with curl before NS changes. Videos: if over 25 MiB per file, put them in R2 (or Cloudflare Stream) and update the URL; otherwise commit or store as an asset. Report what was missing.
3. Move redirects from `.htaccess` to `_redirects`:
   ```
   /explore.html          /region/explore.html        301
   /barwon-heads.html     /region/barwon-heads.html   301
   /potential-uses.html   /invest/                    301
   /panorama.html         /region/explore.html#tours  301
   /region/panorama.html  /region/explore.html#tours  301
   ```
4. Keep dev files off the web: publish only a `public/` folder (or use `.assetsignore`) so `readme.md`, `CHANGELOG.md`, `deploy.sh`, `.github`, `.htaccess`, `content/coota-scrape.json` (if not used by pages) are NOT served. Keep `robots.txt`, `sitemap.xml`, `llms.txt`.
5. Add `wrangler.jsonc` (Worker name `bellwest`, assets dir, `html_handling: auto-trailing-slash`, `not_found_handling: 404-page` with a simple `404.html`). Add `_headers` with long cache for `/images/*` `/css/*` `/js/*` (keep the existing `?v=` cache-busting).
6. Replace the GitHub Action with a Cloudflare deploy (Workers Builds connected to the repo, or a `wrangler deploy` action using `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` secrets). Delete `deploy.sh` and the Hostinger rsync workflow, and update `readme.md` (Hosting, Caching, Deploy sections). Bump CHANGELOG.
7. Deploy to the `*.workers.dev` URL first. Check every page, every redirect, map (Leaflet), Kuula 360 embeds, hero video, theme toggle, promo slider, 404, and that `/readme.md` and `/deploy.sh` return 404. Send Colin the workers.dev link and say "ready for NS".
8. DNS (in Cloudflare, before Colin flips NS): remove imported Hostinger A/AAAA/CNAME for `@` and `www`. Attach custom domains `bellwest.au` and `www.bellwest.au` to the Worker (www → 301 to apex via a redirect rule). For bellwest.com.au: redirect rule `*bellwest.com.au/*` → `https://bellwest.au/${2}` 301 (proxied dummy record is fine).
   EMAIL: both zones have Hostinger MX (`mx1/mx2.hostinger.com`) and SPF. Ask Colin whether any @bellwest.au mailbox is used. If no: remove MX/SPF and add Cloudflare Email Routing to forward e.g. `info@bellwest.au` → col@oze.com.au. If yes: keep MX/SPF untouched. Keep the `google-site-verification` TXT either way.
9. After Colin changes NS: wait for zone Active, confirm SSL (Full/strict not needed for Workers), `curl -I https://bellwest.au` shows `server: cloudflare`, www and bellwest.com.au redirect, redirects 301 correctly. Re-submit `sitemap.xml` in Google Search Console if it's connected.
10. Open a PR, merge after the checks pass, confirm the GitHub-triggered deploy works with a trivial change.
11. Update ops.dixon.au for Bellwest: hosting = Cloudflare Workers, repo = coldix/bellwest, main AI = Antigravity/Gemini, check method + date, note "Hostinger can be cancelled after 1 week live". Add bellwest.com.au as redirect-only if it's listed as a domain.

## Guardrails
- Do not touch the registrar; Colin changes NS.
- Do not delete anything on Hostinger. Colin does that after a week.
- No secrets in the repo. Remove the Hostinger IP/user from `deploy.sh`/workflow when deleting them.
- Do not change site copy, design or the $4,000 ONO offer.
- Stop and ask Colin if: video files are missing from both repo and server, email is in use, or anything costs money.

## Done when
- bellwest.au, www.bellwest.au, bellwest.com.au all serve/redirect via Cloudflare with valid HTTPS.
- Push to `main` auto-deploys to Cloudflare.
- Old URLs 301 correctly; dev files not served.
- ops.dixon.au updated.
- Report back to Colin: live link, PR link, what was missing/fixed, email decision, and "safe to cancel Hostinger on <date>".
