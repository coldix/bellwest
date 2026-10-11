export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    // Canonical redirect: redirect bellwest.com.au, www.bellwest.au, www.bellwest.com.au to https://bellwest.au
    if (host === 'bellwest.com.au' || host === 'www.bellwest.au' || host === 'www.bellwest.com.au') {
      url.hostname = 'bellwest.au';
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    // 301 redirects for legacy URLs
    if (url.pathname === '/explore.html') {
      url.pathname = '/region/explore';
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === '/barwon-heads.html') {
      url.pathname = '/region/barwon-heads';
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === '/potential-uses.html') {
      url.pathname = '/invest/';
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === '/panorama.html' || url.pathname === '/region/panorama.html') {
      return Response.redirect('https://bellwest.au/region/explore#tours', 301);
    }
    if (url.pathname === '/region/explore.html') {
      url.pathname = '/region/explore';
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === '/region/barwon-heads.html') {
      url.pathname = '/region/barwon-heads';
      return Response.redirect(url.toString(), 301);
    }

    // Serve static assets from Astro build
    return env.ASSETS.fetch(request);
  }
};
