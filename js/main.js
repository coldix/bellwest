// bellwest — minimal site JS
// Version: v002

(function () {
  const header = document.querySelector(".site-header");
  const video = document.querySelector(".hero-video");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (video && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.play().catch(() => {
      /* autoplay blocked — poster/gradient remains visible */
    });
  }
})();