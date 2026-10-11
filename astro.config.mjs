import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bellwest.au',
  output: 'static',
  build: {
    format: 'directory',
  },
  redirects: {
    '/explore.html': '/region/explore',
    '/barwon-heads.html': '/region/barwon-heads',
    '/potential-uses.html': '/invest/',
    '/panorama.html': '/region/explore#tours',
    '/region/panorama.html': '/region/explore#tours',
    '/region/explore.html': '/region/explore',
    '/region/barwon-heads.html': '/region/barwon-heads',
  },
});
