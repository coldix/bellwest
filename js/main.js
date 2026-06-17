// bellwest.au — main.js (header, hero video) — v1.6.0 | 2026-06-17

(function () {
  const header = document.querySelector(".site-header");
  const heroMedia = document.querySelector(".hero-media");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (heroMedia && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const youtubeId = heroMedia.dataset.youtubeId;
    if (!youtubeId) return;

    const iframe = document.createElement("iframe");
    iframe.className = "hero-youtube";
    iframe.src = [
      "https://www.youtube.com/embed/",
      youtubeId,
      "?autoplay=1&mute=1&loop=1&playlist=",
      youtubeId,
      "&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3",
    ].join("");
    iframe.title = heroMedia.dataset.youtubeTitle || "Hero background video";
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("tabindex", "-1");
    heroMedia.insertBefore(iframe, heroMedia.firstChild);
  }

})();