#!/bin/bash
# Deploy bellwest.au to Hostinger via rsync over SSH.
# Requires: ~/.ssh/gha_hostinger (chmod 600)
set -e
cd "$(dirname "$0")"
rsync -av --progress \
  -e "ssh -i ~/.ssh/gha_hostinger -p 65002 -o IdentitiesOnly=yes" \
  --exclude='.git' --exclude='.github' --exclude='.DS_Store' \
  ./ u566466219@46.202.196.151:/home/u566466219/domains/bellwest.au/public_html/
echo "Done: https://bellwest.au/"