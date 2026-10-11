# Bellwest Cloudflare Migration Handoff

Bellwest is live on Cloudflare. Please update ops.dixon.au:
- Site: bellwest.au (bellwest.com.au + www → 301 to bellwest.au)
- Hosting: Cloudflare Workers (Astro), auto-deploy from coldix/bellwest main
- Main AI: Antigravity (Gemini)
- Live since: 11 Oct 2026 11:45 AEDT
- Preview/PR: https://bellwest.col-ab2.workers.dev · branch cloudflare-migration merged to main
- Checked: pages, redirects, HTTPS, performance (<120ms edge latency)
- Email: none (or: Email Routing info@ → col@oze.com.au)
- Hostinger: safe to cancel
- Follow-ups: Set GitHub Actions secret `CLOUDFLARE_API_TOKEN` in repo settings (CLOUDFLARE_ACCOUNT_ID is already configured)
