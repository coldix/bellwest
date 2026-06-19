#!/bin/bash
# Deploy bellwest.au to Hostinger via rsync over SSH.
# Requires: ~/.ssh/gha_hostinger (chmod 600)
#
# --delete mirrors the repo onto the server (removes files deleted locally).
# .well-known / cgi-bin are protected so --delete can't wipe server-managed
# paths (SSL renewal etc.) that aren't in the repo.
#
# NOTE: Hostinger's CDN (hcdn) caches css/js for 7 days. After changing a
# stylesheet or script, bump the ?v= query on its <link>/<script> in every
# HTML file (see readme → Caching) or the change won't appear for visitors.
set -e
cd "$(dirname "$0")"
rsync -av --progress --delete \
  -e "ssh -i ~/.ssh/gha_hostinger -p 65002 -o IdentitiesOnly=yes" \
  --exclude='.git' --exclude='.github' --exclude='.DS_Store' \
  --exclude='.well-known' --exclude='cgi-bin' \
  ./ u566466219@46.202.196.151:/home/u566466219/domains/bellwest.au/public_html/
echo "Done: https://bellwest.au/"
