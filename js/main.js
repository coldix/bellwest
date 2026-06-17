// bellwest — minimal site JS
// Version: 1.2.0 | 2026-06-17
// Update notes: Promo inquiry form mailto handler.

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

  const promoForm = document.getElementById("promo-inquiry-form");
  if (promoForm) {
    promoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!promoForm.checkValidity()) {
        promoForm.reportValidity();
        return;
      }

      const name = document.getElementById("promo-name").value.trim();
      const email = document.getElementById("promo-email").value.trim();
      const phone = document.getElementById("promo-phone").value.trim();
      const address = document.getElementById("promo-address").value.trim();

      const body = [
        "Promo page inquiry from bellwest.au/promo",
        "",
        "Name: " + name,
        "Email: " + email,
        "Phone: " + phone,
        "Property/Business address: " + address,
      ].join("\n");

      const mailto = [
        "mailto:col@oze.com.au",
        "?subject=",
        encodeURIComponent("bellwest.au promo page — " + name),
        "&body=",
        encodeURIComponent(body),
      ].join("");

      window.location.href = mailto;
    });
  }
})();