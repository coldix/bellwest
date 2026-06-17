# bellwest.au Changelog

All notable changes to the bellwest.au / bellwest.com.au domain for-sale site.

## [1.1.0] - 2026-06-17 16:55 AEST

**SEO & AI Visibility Maximization Release**

### Added
- `robots.txt` — Explicit allow for all crawlers + sitemap reference.
- `sitemap.xml` — XML sitemap including main pages and primary image for Google/Bing.
- `llms.txt` — Structured plain-text file at root for AI/LLM crawlers (per emerging llms.txt standard). Provides clean facts, page list, and guidance for better citation in generative answers.
- Visible FAQ section on homepage using semantic `<details>`/`<summary>` (excellent for featured snippets and AI extraction).
- Enhanced structured data (JSON-LD) on homepage:
  - WebSite schema
  - Improved Product + Offer
  - New FAQPage schema with 4 key questions
- Version stamps with AEST date/time on all key files.
- `CHANGELOG.md` for tracking updates.

### Changed
- `index.html` — Added version header, replaced schema block with richer @graph version, inserted FAQ section before footer.
- `potential-uses.html` — Added version header comment.
- `readme.md` — Added "SEO & AI Visibility" section and link to CHANGELOG. Updated structure note to include new root files.

### Notes
- All changes maintain static HTML purity (fast, crawlable, LLM-friendly).
- Designed to improve ranking in traditional search **and** being cited/summarized by AI tools.
- Deployment via existing GitHub → Hostinger flow (or direct Git in Hostinger panel).

## [1.0.0] - Earlier
- Initial site launch with two pages, hero visuals, pricing, and local hub.
