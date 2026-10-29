# Antigravity mission: bellwest.au → Astro on Cloudflare

Version 2 · 11 Oct 2026
Run on: Mac Studio (Antigravity, GitHub as coldix, wrangler logged in to Colin's Cloudflare account)
Repo: https://github.com/coldix/bellwest · Live now: https://bellwest.au (Hostinger)

## The goal
Rebuild bellwest.au as an Astro site on Cloudflare, make it better than it is now, and auto-deploy from `main`. Hostinger goes away afterwards.

You have room to improve it. Use your judgement on layout, typography, motion, imagery and page structure. Make it faster, cleaner and more convincing. These things must survive:
- What it's for: a premium domain-for-sale site (bellwest.au + bellwest.com.au, **$4,000 AUD ONO**) that also works as a gateway to the Bellarine Peninsula and South West Victoria.
- The content: Home, Explore (map + 360° Kuula tours), Invest, Advertise/Promo, the Barwon Heads article, FAQ, the oze.au footer credit, and the Facebook group link.
- The contact paths: the promo order and enquiry flows can stay `mailto:col@oze.com.au` unless you find something better and free.
- SEO: titles, descriptions, JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt`, and 301s from the old URLs.

## What's there now
- Plain static HTML/CSS/JS (not Astro). Pages: `/`, `/region/explore.html`, `/region/barwon-heads.html`, `/invest/`, `/promo/`. Leaflet map, Kuula embeds, light/dark theme toggle, promo price slider.
- `.htaccess` has the 301s: `/explore.html`, `/barwon-heads.html` → `/region/…`; `/potential-uses.html` → `/invest/`; `/panorama.html`, `/region/panorama.html` → `/region/explore.html#tours`.
- `deploy.sh` and `.github/workflows/deploy.yml` rsync to Hostinger. Both go.

## How to build it
- Astro, static output, deployed as a Cloudflare Worker with static assets (Pages is fine if it's simpler). Push to `main` deploys (Workers Builds or a `wrangler deploy` Action using repo secrets). No secrets in the repo.
- **Videos:** don't host mp4s. Use YouTube links or lightweight YouTube embeds (lite/facade, poster image until clicked). Ask Colin for the YouTube URLs if you can't find them. A still poster image is fine for the hero.
- Keep the old URLs working, either as real Astro routes or as `_redirects` 301s.
- Only the built site is served. Readme, changelog and docs aren't public.
- Hit good Lighthouse scores on mobile, and keep it accessible.
- Update `readme.md` and `CHANGELOG.md`. Remove the Hostinger deploy files and the server IP/user.

## Who does what
**Colin:**
1. Adds bellwest.au and bellwest.com.au to Cloudflare (Free plan).
2. Changes the nameservers at the registrar when you say ready. Downtime during the switch is fine, and there's no important email on these domains.
3. Cancels Hostinger once it's live.

**Antigravity:**
1. Build on a branch and deploy to the `*.workers.dev` preview. Send Colin the preview link.
2. Once Colin is happy, attach `bellwest.au` as the Worker custom domain. Redirect `www.bellwest.au` and `bellwest.com.au` (all paths) to `https://bellwest.au` with a 301.
3. DNS cleanup in Cloudflare: remove the Hostinger A/CNAME/MX/SPF records. Keep the `google-site-verification` TXT. Optional: Cloudflare Email Routing `info@bellwest.au` → col@oze.com.au.
4. After NS is active, check HTTPS, the redirects and every page. Merge to `main` and confirm auto-deploy works.

## Guardrails
- Don't touch the registrar or delete anything on Hostinger. Those are Colin's jobs.
- Don't spend money. Ask Colin first if anything isn't free.
- Don't change the $4,000 ONO offer or the domain-sale terms.

## When it's live: tell the Chief of Staff (Grok Bot)
Grok Bot keeps ops.dixon.au up to date. Don't edit ops yourself. Send it this handoff as a chat message: ask Colin to paste it into his Grok Bot chat, which is better than email. Also commit it as `docs/missions/cloudflare-migration-done.md`.

```
Bellwest is live on Cloudflare. Please update ops.dixon.au:
- Site: bellwest.au (bellwest.com.au + www → 301 to bellwest.au)
- Hosting: Cloudflare Workers (Astro), auto-deploy from coldix/bellwest main
- Main AI: Antigravity (Gemini)
- Live since: <date AEDT>
- Preview/PR: <links>
- Checked: pages, redirects, HTTPS, Lighthouse <scores>
- Email: none (or: Email Routing info@ → col@oze.com.au)
- Hostinger: safe to cancel
- Follow-ups: <anything open>
```

## Done when
bellwest.au serves the new Astro site over HTTPS from Cloudflare. www and .com.au redirect. Old URLs 301. Pushing to `main` deploys. Hostinger deploy files are gone. The handoff above has gone to Grok Bot.

## End-of-job summary report (required)

Every AI (Codex, Claude, Antigravity, ChatGPT, Grok Bot) must end its PR body and its final reply with this block, exactly as laid out, so the jobs.oze.au dashboard can read it. One field per line, keep the labels as written, fill every line. Use "not shown" when the tool does not show a value. Dates are dd/mm/yyyy, times are AEDT (Melbourne).

```
## Job report
- Repo: coldix/<repo>
- Website: <live or preview URL, or none>
- AI: <agent, e.g. Antigravity>
- Model: <model and effort as shown in the tool, e.g. Gemini 3 Pro High>
- Started: dd/mm/yyyy HH:MM AEDT
- Ended: dd/mm/yyyy HH:MM AEDT
- Time taken: <minutes>
- Usage: <tokens, credits or requests if the tool shows them, else not shown>
- PR: <url>
- Status: <merged/open/blocked>
- Summary: <1 to 3 lines>
```

Full rule: https://github.com/coldix/jobs/blob/main/AGENTS-REPORTING.md
