// bellwest.au — main.js (header, hero video, shared lightbox)

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

  function initLightbox() {
    let lb = document.getElementById("lightbox");
    let lbImg = document.getElementById("lightbox-img");

    if (!lb) {
      lb = document.createElement("div");
      lb.id = "lightbox";
      lb.className = "lightbox";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-modal", "true");
      lb.setAttribute("aria-label", "Enlarged image");
      lb.innerHTML =
        '<div class="lightbox-content">' +
        '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
        '<img id="lightbox-img" src="" alt="">' +
        "</div>";
      lb.setAttribute("aria-hidden", "true");
      document.body.appendChild(lb);
      lbImg = document.getElementById("lightbox-img");
    }

    const closeBtn = lb.querySelector(".lightbox-close");

    function openLightbox(fullSrc, alt) {
      lbImg.src = fullSrc;
      lbImg.alt = alt || "Enlarged image";
      lb.classList.add("active");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lb.classList.remove("active");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lbImg.removeAttribute("src");
    }

    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLightbox();
    });

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lb.classList.contains("active")) closeLightbox();
    });

    document.querySelectorAll("[data-full]").forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const img = trigger.querySelector("img");
        const full = trigger.getAttribute("data-full");
        if (!full) return;
        openLightbox(full, img ? img.alt : "");
      });
    });

    window.openLightbox = function (imgEl) {
      if (!imgEl) return;
      const full = imgEl.getAttribute("data-full") || imgEl.src;
      openLightbox(full, imgEl.alt);
    };

    window.closeLightbox = closeLightbox;
  }

  initLightbox();
})();